<template>
    <b-container class="file-upload-wrapper">
        <b-row>
            <b-col>
                <b-form-file v-model="file" :state="Boolean(file)" placeholder="Selecciona un archivo .txt"></b-form-file>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: "FileUploadPanel",

    data() {
        return {
            file: null,
            reader: new FileReader()
        }
    },

    beforeMount() {
        this.reader.onload = this.readFile;
    },

    watch: {
        file() {
            if (this.file && this.file.type == 'text/plain') {
                this.reader.readAsText(this.file);
            }
        }
    },

    methods: {

        readFile(event) {
            let points = [];
            const res = event.target.result.split(/\r?\n/g);
            for (const r of res) {
                let point = r.split(/\s/g);
                if (point.length == 2) {
                    points.push(point.map(val => parseFloat(val)));
                }
            }
            this.$emit('assignPoints', points);
        }
    }
}
</script>

<style lang="scss" scoped>
    .file-upload-wrapper {
        padding-top: 30px;
    }
</style>
