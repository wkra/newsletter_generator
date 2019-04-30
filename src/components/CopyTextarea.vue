<template>
  <textarea name="copy" v-model="text" ref="copyTexarea"></textarea>
</template>

<script>
export default {
  name: "CopyTextarea",
  props: {
    text: String
  },
  methods: {
    copyCode() {
      this.$refs.copyTexarea.select();
      document.execCommand("copy");
      this.$emit("input", false);
    }
  },
  mounted() {
    this.copyCode();
  }
};
</script>

<style lang="less" scoped>
textarea {
  display: block;
  position: absolute;
  left: -9999px;
}
</style>

