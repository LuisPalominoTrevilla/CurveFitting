<template>
    <b-container class="options-panel">
        <b-row class="option-wrapper">
            <b-col>
                <h1 class="title">Ajuste de curva</h1>
                <b-form @submit="makeRegresion">
                    <b-card no-body>
                        <b-tabs pills card vertical>
                            <b-tab title="Polinomial `a_0+a_1x+...+a_nx^n`" @click="selectRegression(0)">
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
                                        `{{n}}`
                                    </b-form-checkbox>
                                </b-form-group>
                            </b-tab>
                            <b-tab title="Transcendental `1/x^n`" @click="selectRegression(1)">
                                <b-form-group>
                                    <label for="trasc">Exponente de `1/x^n`:</label>
                                    <b-input 
                                        id="trasc" 
                                        v-model="n"
                                        type="number"/>
                                </b-form-group>
                                <b-form-group 
                                    v-for="(n, index) in transLabels" 
                                    :key="index">
                                    <b-form-checkbox
                                        v-model="stdSelections[index]"
                                        :disabled="index == stdSelections.length-1">
                                        `{{n}}`
                                    </b-form-checkbox>
                                </b-form-group>
                            </b-tab>
                            <b-tab title="Exponencial `e^(kx)`" @click="selectRegression(2)">
                            Tab Contents 3
                            </b-tab>
                            <b-tab title="Logarítmica `log_bx`" @click="selectRegression(3)">
                                <b-form-group>
                                    <label for="log1-base">Base de `log_bx`:</label>
                                    <b-input 
                                        id="log1-base" 
                                        v-model="base"
                                        type="number"/>
                                </b-form-group>
                                <b-form-group 
                                    v-for="(n, index) in logLabels" 
                                    :key="index">
                                    <b-form-checkbox
                                        v-model="stdSelections[index]"
                                        :disabled="index == stdSelections.length-1">
                                        `{{n}}`
                                    </b-form-checkbox>
                                </b-form-group>
                            </b-tab>
                            <b-tab title="Logarítmica `lnx`" @click="selectRegression(4)">
                                <b-form-group 
                                    v-for="(n, index) in lnLabels" 
                                    :key="index">
                                    <b-form-checkbox
                                        v-model="stdSelections[index]"
                                        :disabled="index == stdSelections.length-1">
                                        `{{n}}`
                                    </b-form-checkbox>
                                </b-form-group>
                            </b-tab>
                            <b-tab title="Logarítmica `nlog_bn`" @click="selectRegression(5)">
                                <b-form-group>
                                    <label for="log2-base">Base de `nlog_bn`:</label>
                                    <b-input 
                                        id="log2-base" 
                                        v-model="base"
                                        type="number"/>
                                </b-form-group>
                                <b-form-group 
                                    v-for="(n, index) in nlogLabels" 
                                    :key="index">
                                    <b-form-checkbox
                                        v-model="stdSelections[index]"
                                        :disabled="index == stdSelections.length-1">
                                        `{{n}}`
                                    </b-form-checkbox>
                                </b-form-group>
                            </b-tab>
                            <b-tab title="Trigonométrica `sinx`" @click="selectRegression(6)">
                            Tab Contents 3
                            </b-tab>
                            <b-tab title="Trigonométrica `cosx`" @click="selectRegression(7)">
                            Tab Contents 3
                            </b-tab>
                            <b-tab title="Trigonométrica `sinx+cosx`" @click="selectRegression(8)">
                            Tab Contents 3
                            </b-tab>
                        </b-tabs>
                    </b-card>
                    <b-form-group class="text-right">
                        <b-button 
                            class="adjust-btn" 
                            type="submit"
                            :disabled="!btnActive || polOrder == 0">
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
            selected: null,
            polOrder: null,
            polLabels: [],
            polSelections: [],
            lnLabels: [],
            logLabels: [],
            nlogLabels: [],
            stdSelections: [],
            transLabels: [],
            base: 10,
            n: 1
            
        }
    },

    updated() {
        // eslint-disable-next-line
        if (MathJax) {
            // eslint-disable-next-line
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
    },

    beforeMount() {
        this.polOrder = 1;
        this.selected = tipo.Polinomial;
        // Initialize logarithmic options
        for (let i = 0; i < 2; i++) {
            this.stdSelections.push(true);
            this.lnLabels.push((i > 0)? `${this.letters[this.polOrder-i]}lnx`:this.letters[this.polOrder-i]);
            this.logLabels.push((i > 0)? `${this.letters[this.polOrder-i]}log_bx`:this.letters[this.polOrder-i]);
            this.nlogLabels.push((i > 0)? `${this.letters[this.polOrder-i]}nlog_bn`:this.letters[this.polOrder-i]);
            this.transLabels.push((i > 0)? `${this.letters[this.polOrder-i]}1/x^n`:this.letters[this.polOrder-i]);
        }
    },

    watch: {
        polOrder() {
            this.polLabels = [];
            this.polSelections = [];
            if (this.polOrder > 7) {
                this.polOrder = 7;
            }
            if (this.polOrder == 0) {
                return;
            }
            for (let i = 0; i <= this.polOrder; i++) {
                this.polSelections.push(true);
                this.polLabels.push((i > 0)? `${this.letters[this.polOrder-i]}x^${i}`:this.letters[this.polOrder-i]);
            }
        },

        base() {
            if (this.base > 20) {
                this.base = 20;
            }
        },

        n() {
            if (this.n > 20) {
                this.n = 20;
            }
        }
    },

    methods: {
        makeRegresion(e) {
            e.preventDefault();
            switch(this.selected) {
                case tipo.Polinomial:
                    this.$emit('newGraph', { enabled: this.polSelections.slice(0), type: this.selected });
                    break;
                case tipo.Trascendental:
                    this.$emit('newGraph', { enabled: this.stdSelections.slice(0), type: this.selected, n: this.n });
                    break;
                case tipo.Logaritmica:
                    if (this.base > 1) {
                        this.$emit('newGraph', { enabled: this.stdSelections.slice(0), type: this.selected, base: this.base });
                    }
                    break;
                case tipo.lnx:
                    this.$emit('newGraph', { enabled: this.stdSelections.slice(0), type: this.selected });
                    break;
                case tipo.NlogN:
                    if (this.base > 1) {
                        this.$emit('newGraph', { enabled: this.stdSelections.slice(0), type: this.selected, base: this.base });
                    }
                    break;

            }
        },

        selectRegression(num) {
            this.selected = num;
            this.base = 10;
            this.stdSelections = [];
            for (let i = 0; i < 2; i++) {
                this.stdSelections.push(true);
            }
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

    .adjust-btn.disabled:hover {
        background: #ffffff !important;
        color: rgb(8, 104, 72) !important;
    }
</style>