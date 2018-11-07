<template>
    <b-container class="file-upload-wrapper">
        <b-row>
            <b-col>
                <b-form-file v-model="file" :state="Boolean(file)" placeholder="Selecciona un archivo .txt"></b-form-file>
                <div class="mt-3">Archivo seleccionado: {{file && file.name}}</div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "FileUploadPanel",

    data() {
        return {
            file: null
        }
    },

    watch: {
        file() {
            console.log(this.file);
        }
    }
}
</script>

<style lang="scss" scoped>
    .file-upload-wrapper {
        padding-top: 30px;
    }
</style>
