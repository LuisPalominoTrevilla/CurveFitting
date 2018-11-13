<template>
  <div id="app">
    <b-container fluid class="main-container">
      <b-row>
        <b-col md="8" class="graph-panel">
          <graph-layout
            @confirmPoints="confirmPoints()"
            ref="childGraph"/>
        </b-col>
        <b-col md="4" class="option-panel">
          <option-panel 
            @newGraph="newGraph($event)"
            :btnActive="hasPoints"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import GraphLayout from '@/components/GraphLayout.vue';
import OptionPanel from '@/components/OptionPanel.vue';

export default {
  name: 'app',

  components: {
    GraphLayout,
    OptionPanel
  },

  data() {
    return {
      hasPoints: false
    }
  },

  methods: {
    newGraph(options) {
      this.$refs.childGraph.newRegression(options);
    },

    confirmPoints() {
      this.hasPoints = true;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  position: relative;
  overflow-y: auto;
}
.main-container {
  height: 100%;

  .row {
    height: 100%;
  }

  .option-panel {
    padding: 0;
  }
}
</style>
