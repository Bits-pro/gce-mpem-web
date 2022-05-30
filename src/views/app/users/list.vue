<template>
    <b-card class="mb-4" :title="$t('users.list')">
      <b-table hover :items="data" :fields="fields">
          <template #cell(actions)="row">
            <b-button variant="success" size="sm" class="mr-2" @click="createDoc(row.item)" v-if="!row.item.is_admin">
                <i class="fa fa-plus"></i> {{ $t('templates.interime') }}
            </b-button>
            <b-button size="sm" class="mr-2" @click="createDoc(row.item)" v-if="row.item.is_admin">
                <i class="fa fa-plus"></i> {{ $t('templates.remove_interime') }}
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
            data: []
        }
    },
    computed: {
        ...mapGetters(['usersList']),
        fields () {
            return [
                { key: 'username', label: this.$t('templates.title'), sortable: false },
                { key: 'actions', label: this.$t('templates.actions'), sortable: false },
            ]
        }
    },
    methods: {
        ...mapActions(["getUsers", "getUserIterim", "createIterim"]),
        fetchList() {
            this.getUserIterim().then((r) => {
                let keys = JSON.parse(r.is_admin)
                let users = r.users.filter(word => word.fields.is_staff == true);
                this.data = users.map(function(value, index) {
                    return {
                        id: value.pk,
                        username: value.fields.username,
                        is_admin: keys[index]
                    }
                });
            })
        },
        createDoc(row) {
            console.log(row)
            let payload = {
                user: row.id
            }
            this.createIterim(payload).then(() => {
                this.fetchList()
            })
        },
    },
    mounted() {
        this.fetchList();
    }
}
</script>