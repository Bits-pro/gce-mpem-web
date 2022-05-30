<template>
    <b-modal ref="my-modal" hide-footer :title="$t('labels.action')">
        <div class="d-block">
            <b-form  @submit.prevent="submitModal">
                <b-colxx sm="12" md="12">
                    <b-form-group :label="$t('labels.title')">
                        <b-form-input v-model="gridForm.title" aria-describedby="input-1-live-num"/>
                    </b-form-group>
                </b-colxx>
                <b-colxx sm="12" md="12">
                    <b-form-group :label="$t('labels.color')">
                        <b-form-select 
                            v-model="gridForm.color"
                            :options="colorOptions" plain />
                    </b-form-group>
                </b-colxx>
            </b-form>
        </div>
        <b-button class="mt-3" variant="outline-danger" @click="hideModal">{{ $t('labels.cancel')}}</b-button>
        <b-button class="mt-2" variant="primary" @click="submitModal">{{ $t('labels.create') }}</b-button>
    </b-modal>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";

export default {
    data() {
        return {
            gridForm: {
                title: '',
                color: ''
            },
            colorOptions: ['primary', 'secondary', 'info'],
        };
    },
    methods: {
        ...mapActions(["createLabel", "getLabels"]),
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        submitModal() {
            this.createLabel(this.gridForm).then(r => {
                this.getLabels()
                this.hideModal()
            })
        },
    }
  }
</script>