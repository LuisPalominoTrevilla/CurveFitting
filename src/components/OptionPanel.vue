<template>
    <b-container class="options-panel">
        <b-row class="option-wrapper">
            <b-col>
                <h1 class="title">Ajuste de curva</h1>
                <b-form @submit="makeRegresion">
                    <b-card no-body>
                        <b-tabs pills card vertical>
                            <b-tab title="Polinomial" @click="selectRegression(0)">
                                <b-form-group>
                                    <label for="pol-order">órden polinomio:</label>
                                    <b-input 
                                        id="pol-order" 
                                        v-model="polOrder"
                                        type="number"/>
                                </b-form-group>
                                <b-form-group 
                                    v-for="(n, index) in polLabels" 
                                    :key="index">
                                    <b-form-checkbox 
                                        v-model="polSelections[index]"
                                        :disabled="index == polSelections.length-1">
                                        {{n}}
                                    </b-form-checkbox>
                                </b-form-group>
                            </b-tab>
                            <b-tab title="Transcendental" @click="selectRegression(1)">

                            </b-tab>
                            <b-tab title="Logaritmica" @click="selectRegression(2)">
                            Tab Contents 3
                            </b-tab>
                            <b-tab title="Trigonometrica" @click="selectRegression(3)">
                            Tab Contents 3
                            </b-tab>
                        </b-tabs>
                    </b-card>
                    <b-form-group class="text-right">
                        <b-button 
                            class="adjust-btn" 
                            type="submit"
                            :disabled="!btnActive">
                                Ajustar
                            </b-button>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { tipo } from '@/constants.json';

export default {
    name: 'OptionsPanel',

    props: {
        btnActive: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            letters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            polOrder: null,
            polLabels: [],
            polSelections: [],
            selected: null,
            formula: "`x^2`"
        }
    },

    beforeMount() {
        this.polOrder = 1;
        this.selected = tipo.Polinomial;
    },

    watch: {
        polOrder() {
            this.polLabels = [];
            this.polSelections = [];
            if (this.polOrder > 7) {
                this.polOrder = 7;
            }
            for (let i = 0; i <= this.polOrder; i++) {
                this.polSelections.push(true);
                this.polLabels.push((i > 0)? `${this.letters[this.polOrder-i]}X^${i}`:this.letters[this.polOrder-i]);
            }
        }
    },

    methods: {
        makeRegresion(e) {
            e.preventDefault();
            this.$emit('graphPolinomial', { enabled: this.polSelections.slice(0), type: this.selected })
        },

        selectRegression(num) {
            this.selected = tipo[num];
        }
    }
}
</script>

<style lang="scss">
    .options-panel {
        background-color: rgb(24, 65, 65);
        height: 100%;
    }

    .title {
        text-align: center;
        color: #ffffff;
        font-size: 35px;
        margin-top: 20px;
        margin-bottom: 25px;
    }

    .card {
        height: 70%;
    }

    .option-wrapper {
        position: relative;
    }

    .nav-link.active {
        background-color: rgb(8, 104, 72) !important;
        color: #ffffff !important;
    }

    .nav-link {
        color: rgb(8, 104, 72) !important;
    }

    .adjust-btn {
        margin-top: 10px;
        background: #ffffff !important;
        color: rgb(8, 104, 72) !important;
    }

    .adjust-btn:hover {
        color: #ffffff !important;
        background: rgb(8, 104, 72) !important;
    }
</style>