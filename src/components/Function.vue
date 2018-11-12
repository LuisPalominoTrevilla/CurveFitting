<template>
    <div v-if="func != ''" class="function-wrapper">
        <span>{{func}}</span>
    </div>
</template>

<script>
import 'mathjax/MathJax';
export default {
    name: 'Function',

    props: {
        func: {
            type: String,
            default: ''
        }
    }
    
}
</script>

<style lang="scss">
    .function-wrapper {
        padding: 10px 20px 0 20px;
        min-height: 50px;
        position: absolute;
        top: 0;
        left: 20%;
        background-color: rgba(212, 202, 189, 0.507);
        cursor: pointer;

        span {
            font-size: 16px;
            font-weight: bold;
        }
    }
</style>
