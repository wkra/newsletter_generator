<template>
  <div class="newsletter-view">
    <Nestle :imgs="imgs" :active="selectedTemplate.name === 'Nestle'" @newTemplate="newTemplate"/>
    <Superpharm
      :imgs="imgs"
      :active="selectedTemplate.name === 'Superpharm'"
      @newTemplate="newTemplate"
    />
  </div>
</template>

<script>
import Nestle from "./templates/Nestle.vue";
import Superpharm from "./templates/Superpharm.vue";

export default {
  name: "NewsletterView",
  components: {
    Nestle,
    Superpharm
  },
  props: {
    selectedTemplate: Object,
    imgs: Array
  },
  methods: {
    newTemplate(template) {
      this.$emit("newTemplate", template);
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

    & * {
      position: relative;
    }
  }

  a {
    position: relative;
    display: block;
    cursor: pointer;

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

