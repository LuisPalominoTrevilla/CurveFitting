<template>
    <div style="height: 100%">
        <div class="file-upload">
            <file-upload-panel/>
        </div>
        <div class="graph">
            <div id="graph" ref="grf"></div>
        </div>
    </div>
</template>

<script>
import FileUploadPanel from '@/components/FileUploadPanel.vue';
import { functionPlot } from '@/modules/function.conf.js';
import { configPlot } from '@/modules/constants.json';

export default {
    name: "graph",

    components: {
        FileUploadPanel
    },
    
    data() {
        return {

        }
    },

    computed: {
        width() {
            return this.$refs.grf.clientWidth;
        },

        height() {
            return this.$refs.grf.clientHeight;
        }
    },

    mounted() {
        configPlot.width = this.width;
        configPlot.height = this.height;
        functionPlot(configPlot)
    },

    methods: {
        handleResize() {
            console.log("Wadap");
        }
    }
}
</script>

<style lang="scss" scoped>
    .graph {
        height: 90%;
        min-height: 400px;
        padding: 50px 110px 80px 110px;
        position: relative;
        
        #graph {
            width: 100%;
            height: 100%;
            border: .3px solid rgb(235, 235, 235);
            box-shadow: -8px 10px 10px rgb(133, 133, 133);
        }
    }

    .file-upload {
        height: 10%;
    }
</style>
