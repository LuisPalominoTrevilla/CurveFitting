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
import Interpreter from '@/modules/Interpreter';
import { functionPlot } from '@/function.conf.js';
import { configPlot, configPoints, configFunc, ghostFunc } from '@/graph.config.json';
import { tipo } from '@/constants.json';

export default {
    name: "graph",

    components: {
        FileUploadPanel
    },
    
    data() {
        return {
            points: null,
            graph: ''
        }
    },

    watch: {

        points() {
            this.$emit('confirmPoints');
            this.drawPoints();
        },

        graph() {
            if (this.graph) {
                this.drawGraph();
            }
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

        newRegression({ enabled, type, base, n }) {
            if (this.points) {
                const interpreter = new Interpreter(this.points);
                switch (type) {
                    case tipo.Polinomial:
                        this.graph = interpreter.createPolinomial(enabled.length-1, enabled);
                        break;
                    case tipo.Exponencial:
                        this.graph = interpreter.createExponential(enabled, n);
                        break;
                    case tipo.Trascendental:
                        this.graph = interpreter.createTrans(enabled, n);
                        break;
                    case tipo.Logaritmica:
                        this.graph = interpreter.createLogarithm(enabled, type, base);
                        break;
                    case tipo.lnx:
                        this.graph = interpreter.createLogarithm(enabled, type);
                        break;
                    case tipo.NlogN:
                        this.graph = interpreter.createLogarithm(enabled, type, base);
                        break;

                }
            }
        },

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
        },

        drawPoints() {
            this.resetGraph();
            configPoints.points = this.points.formattedPoints;
            configPlot.data.push(configPoints);
            this.redraw();
        },

        drawGraph() {
            configFunc.fn = this.graph;
            configPlot.data = [configFunc];
            configPlot.data.push(configPoints);
            this.redraw();
        },

        redraw() {
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
