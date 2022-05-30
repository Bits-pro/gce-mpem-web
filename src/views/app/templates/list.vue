<template>
    <b-card class="mb-4" :title="$t('templates.list')">
      <div style="float:right">
        <router-link :to="`/app/templates/add`" class="icon-menu-item">
          <b-button
            type="submit"
            variant="primary"
            class="mt-4 btn-lg"
          >{{ $t('pages.add-new') }}</b-button>
        </router-link>

      </div>
      <b-table hover :items="templates" :fields="fields">
          <template #cell(actions)="row">
            <b-button size="sm" class="mr-2" @click="createDoc(row.item)">
                <i class="far fa-file-word"></i> {{ $t('templates.generate') }}
            </b-button>
        </template>
      </b-table>
    </b-card>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import Vuetable from 'vuetable-2/src/components/Vuetable'
import {
    WidthType, BorderStyle, Document, Paragraph, Packer, TextRun
} from "docx";
import { saveAs } from "file-saver";

export default {
    components: {
      Vuetable, Paragraph, Packer, TextRun, saveAs, BorderStyle, WidthType
    },
    data () {
        return {
            currentPage: 1,
            perPage: 5,
            totalRows: 0,
            firstname: "Jhon",
            lastname: "Doe",
            message: "I just created a document using Vue.js 😲",
        }
    },
    computed: {
        ...mapGetters(['templates']),
        fields () {
            return [
                { key: 'title', label: this.$t('templates.title'), sortable: false },
                { key: 'actions', label: this.$t('templates.actions'), sortable: false },
            ]
        }
    },
    methods: {
        ...mapActions(["fetchTemplates"]),
        fetchList() {
            this.fetchTemplates()
        },
        createDoc(row) {
            console.log(row)
            // Create a new Document an save it in a variable
            //let doc = new docx.Document();
            //doc.addParagraph(new Paragraph(`State Map`).heading1().thematicBreak().center());
            // To export into a .docx file
            const doc = new Document({
                sections: [{
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Objet : ",
                                    bold: true,
                                    break: 8,
                                }),
                                new TextRun({
                                    text: `${row.title}`,
                                    bold: true,
                                }),
                            ],
                        }),
                        new Paragraph({
                            style:"padding-top: 500px",
                            children: [
                                new TextRun({
                                    break: 2,
                                    text: row.content,
                                }),
                            ],
                        }),

                        new Paragraph({
                            style:"padding-top: 500px",
                            children: [
                                new TextRun({
                                    break: 5,
                                    text: "Ampliations :",
                                }),
                            ],
                        }),
                    ],
                }],
            });

            Packer.toBlob(doc).then(blob => {
                saveAs(blob, "document.docx");
            });
        },
    },
    mounted() {
        this.fetchList();
    }
}
</script>