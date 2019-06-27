<template>
  <div class="text-xs-center pt-2">
    <v-btn :disabled="disableBtn" color="green" class="white--text" @click="sortImgs">
      <v-icon left>cached</v-icon>Sort order
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "UnderTable",
  props: {
    disableBtn: Boolean
  },
  methods: {
    sortImgs() {
      this.$emit("sortImgs");
    }
  }
};
</script>
