<template>
  <div class="newsletter-view">
    <TemplateOne :imgs="imgs" v-if="selectedTemplate.name === 'Template 1'"/>
    <TemplateTwo :imgs="imgs" v-if="selectedTemplate.name === 'Template 2'"/>
  </div>
</template>

<script>
import TemplateOne from "./templates/TemplateOne.vue";
import TemplateTwo from "./templates/TemplateTwo.vue";

export default {
  name: "NewsletterView",
  components: {
    TemplateOne,
    TemplateTwo
  },
  props: {
    selectedTemplate: Object,
    imgs: Array
  },
  methods: {
    sortImgs() {
      this.$emit("sortImgs");
    }
  }
};
</script>

<style lang="less">
.newsletter-view {
  html {
    overflow: hidden;
    margin: 100px 0;
  }

  table {
    margin: auto;
  }

  a {
    position: relative;
    display: block;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      right: 0;
      opacity: 0;
      box-shadow: inset 0 0 30px 0px #000;
      transition: all 0.5s;
    }

    &:hover {
      &::after {
        opacity: 0.5;
      }
    }
  }
}
</style>

