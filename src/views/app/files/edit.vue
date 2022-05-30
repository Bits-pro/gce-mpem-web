<template>
  <div>
    <b-row>
      <b-colxx xxs="12">
        <piaf-breadcrumb :heading="$t('files.details')" />
        <div class="separator mb-5"></div>
      </b-colxx>
    </b-row>
    <b-row>
      <b-colxx md="4">
        <layout-grid></layout-grid>
      </b-colxx>
       <b-colxx md="8">
          <b-button variant="primary" class="mt-4" @click="showDocument">{{ $t('files.liste_pieces')}}</b-button>
          <b-button class="mt-4" @click="handleAnnoted" v-if="courrierDoc.nature != 'depart'">{{ $t('files.liste_annotees') }}</b-button><br/><br/>
          <iframe id="iframe" :src="`${courrierDoc.url}` " style="width: 100%;min-height: 80%; border: none;">
              Oops! internet error.
          </iframe>
          <!-- &output=embed -->
          <!-- <div style="float: right">
            <b-form-group label="Choisir l'option de signature" v-slot="{ ariaDescribedby }">
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="1">Signer</b-form-radio>
              <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="2">Upload file</b-form-radio>
            </b-form-group>
            <div v-if="selected=='1'">
              <vue-signature ref="signature" :sigOption="option" :w="'200px'" :h="'100px'" :disabled="disabled" :defaultUrl="courrierDoc.url"></vue-signature> 
            </div>
            <div v-if="selected=='2'">
              <b-form-file
                v-model="file"
                :state="Boolean(file)"
                :browse-text="$t('browse')"
                :placeholder="$t('files.choose')"
                drop-placeholder="Drop file here..."
              ></b-form-file>
            </div>
            <b-button @click="save">Signer</b-button>
            <b-button @click="clear">Clear</b-button>
            <b-button @click="undo">Undo</b-button>
          </div> -->
      </b-colxx>
    </b-row>

    <annoted-modal ref="annoted-modal"></annoted-modal>
    <document-list ref="document-list"></document-list>
  </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import show from './show'
import AnnotedModal from './partials/AnnotedModal'
import DocumentList from './partials/DocumentList'
import vueSignature from "vue-signature"
import pdf from "vue-pdf";
import 'pdfjs-dist/build/pdf.worker.entry.js'
import {
  Packer
} from "docx";
import firebase from "firebase";

export default {
    components: {
      "layout-grid": show,
      "annoted-modal": AnnotedModal,
      "document-list": DocumentList,
      "vue-signature": vueSignature,
      "pdf": pdf
    },
    computed: {
      ...mapGetters(["courrierDoc"])
    },
    data () {
      return {
        publicPath: process.env.BASE_URL,
        option:{
          penColor:"rgb(0, 0, 0)",
          backgroundColor:"rgb(255,255,255)"
        },
        disabled: false,
        selected: 1,
        currentPage: 1,
			  numPages: 1,
        file: null
      }
    },
    methods: {
      ...mapActions(["fetchEntities","signFile", "fetchCategories", "createDocument", "fetchCourrier", "fetchAnnotations", "fetchCourrierDocuments"]),
      handleAnnoted() {
        this.fetchAnnotations(this.courrierDoc.id);
        this.$refs['annoted-modal'].showModal();
      },
      toDataURL() {
        const dataURL = this.$refs.signaturePad.toDataURL()
        console.log(dataURL)
      },
      showDocument() {
        this.fetchCourrierDocuments(this.courrierDoc.id);
        this.$refs['document-list'].showModal();
      },
      print() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf ("MSIE ");
        var iframe = document.getElementById("iframe");

        if (msie > 0) {
            iframe.contentWindow.document.execCommand('print', false, null);
        } else {
            iframe.contentWindow.print();
        }
      },
      async save(){
        var _this = this;
        if(this.selected == '1') {
          var png = _this.$refs.signature.save();
          //let file = await this.dataURLtoFile(png, "test.png");
          let fileF = await this.convertURLtoFile(png, "signature.png");
          var formData = new FormData();
          formData.append("signature", fileF)
          formData.append("url", "https://bitspro.nyc3.digitaloceanspaces.com/courrier.pdf");
        } else {
          var formData = new FormData();
          formData.append("signature", this.file);
          formData.append("url", "https://bitspro.nyc3.digitaloceanspaces.com/courrier.pdf");
        }

        this.signFile(formData).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf'); //or any other extension
          document.body.appendChild(link);
          link.click();
          /*const storageRef=firebase.storage().ref(`courriers/filesname.pdf`).put(response.data);
          storageRef.on(`state_changed`,snapshot=>{this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;}, error=>{},()=>{
            this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
              console.log(url)
            });
          });*/
        })
      },
      clear(){
        var _this = this;
        _this.$refs.signature.clear();
      },
      undo(){
        var _this = this;
        _this.$refs.signature.undo();
      },
      dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
      },
      async convertURLtoFile (url) {
        const response = await fetch(url);
        const data = await response.blob();
        const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
        const metadata = { type: `image/jpeg` };
        return new File([data], filename, metadata);
      }
      /* fromDataURL(url){
        var _this = this;
        _this.$refs.signature.fromDataURL("data:image/png;base64,iVBORw0K...");
      }, */
    },
    created() {
      this.fetchCourrier({ id : this.$route.params.id}).then(() => {
        this.courrierDoc.url.promise.then(pdf => {
          this.numPages = pdf.numPages;
        });
      })
    }
};
</script>
