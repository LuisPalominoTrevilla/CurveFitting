<template>
    <div style="height: 100%">
        <div class="file-upload">
            <file-upload-panel @assignPoints="setPoints($event)"/>
        </div>
        <div class="graph">
            <div id="graph" ref="grf"></div>
        </div>
    </div>
</template>

<script>
import FileUploadPanel from '@/components/FileUploadPanel.vue';
import DiscreteFunction from '@/modules/DiscreteFunction';
import { functionPlot } from '@/function.conf.js';
import { configPlot, configPoints, ghostFunc } from '@/graph.config.json';

export default {
    name: "graph",

    components: {
        FileUploadPanel
    },
    
    data() {
        return {
            points: null
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
        this.resetGraph();
    },

    methods: {
        handleResize() {

        },

        resetGraph() {
            configPlot.width = this.width;
            configPlot.height = this.height;
            configPlot.data = [ghostFunc];
            functionPlot(configPlot);
        },

        setPoints(points) {
            this.points = new DiscreteFunction(points);
            this.drawPoints();
        },

        drawPoints() {
            this.resetGraph();
            configPoints.points = this.points.formattedPoints;
            configPlot.data.push(configPoints);
            functionPlot(configPlot);
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
