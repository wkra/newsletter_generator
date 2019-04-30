<template>
  <div id="app">
    <v-app>
      <Toolbar/>
      <v-content>
        <HeaderTable
          v-if="templates.length"
          :imgsLength="imgs.length"
          :templates="templates"
          v-model="selectedTemplate"
          @onUpload="onUpload"
          @copyCode="copyCode"
          @initSnack="initSnack"
        />
        <FilesTable
          :items="imgs"
          @removeFile="removeImg"
          @moveFile="move"
          @updateCode="updateCode"
          @initSnack="initSnack"
        ></FilesTable>
        <FooterTable :disableBtn="imgs.length < 2" @sortImgs="sortImgs"/>
      </v-content>
      <v-container v-show="showTemplate">
        <NewsletterView
          ref="template"
          v-show="showTemplate"
          :imgs="imgs"
          :selectedTemplate="selectedTemplate"
          @newTemplate="newTemplate"
        />
      </v-container>
      <Code v-if="showTemplate" :code="code" :header="templateHeader" @copyCode="copyCode"/>
      <v-snackbar :timeout="3000" v-model="snack" :color="snackColor">
        {{ snackText }}
        <v-btn flat @click="snack = false">Close</v-btn>
      </v-snackbar>
    </v-app>
    <CopyTextarea v-if="initCopy" :text="code" v-model="initCopy"/>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import Code from "./components/Code.vue";
import HeaderTable from "./components/HeaderTable.vue";
import FilesTable from "./components/FilesTable.vue";
import FooterTable from "./components/FooterTable.vue";
import NewsletterView from "./components/NewsletterView.vue";
import CopyTextarea from "./components/CopyTextarea.vue";

export default {
  name: "app",
  components: {
    Toolbar,
    Code,
    HeaderTable,
    FilesTable,
    FooterTable,
    NewsletterView,
    CopyTextarea
  },
  data() {
    return {
      imgs: [],
      sortDirection: false,
      code: "",
      defaultTemplateheader:
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
      templates: [],
      selectedTemplate: {},
      initCopy: false,
      snack: false,
      snackText: "",
      snackColor: ""
    };
  },
  computed: {
    showTemplate() {
      return this.imgs.length;
    },
    templateHeader() {
      return typeof this.selectedTemplate.templateHeader === "undefined"
        ? this.defaultTemplateheader
        : this.selectedTemplate.templateHeader;
    }
  },
  methods: {
    onUpload(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.getFilesAttributes(files);
        this.initSnack({ color: "info", text: "Files uploaded." });
      }
    },
    getFilesAttributes(files) {
      let i, img;

      for (i = 0; i < files.length; i++) {
        img = new Image();
        img.src = window.URL.createObjectURL(files[i]);

        this.imgs.push({
          name: files[i].name,
          height: 0,
          src: img.src,
          url: "https://"
        });

        this.getFileHeight(img, this.imgs.length - 1);
      }
    },
    getFileHeight(img, index) {
      var self = this;
      img.onload = function() {
        self.imgs[index].height = img.naturalHeight;
      };
    },
    removeImg(index) {
      this.imgs.splice(index, 1);
      this.initSnack({ color: "error", text: "Image removed." });
    },
    sortImgs() {
      this.imgs.sort(this.compareName);
      this.changeSortDirection();
      this.updateCode();
      this.initSnack({ color: "success", text: "Images sorted." });
    },
    compareName(a, b) {
      if (a.name < b.name) return this.sortDirection ? -1 : 1;
      if (a.name > b.name) return this.sortDirection ? 1 : -1;
      return 0;
    },
    changeSortDirection() {
      this.sortDirection = !this.sortDirection;
    },
    move({ currIndex, newIndex }) {
      const arr = this.imgs;
      if (newIndex > arr.length - 1) {
        newIndex = 0;
      }
      if (newIndex < 0) {
        newIndex = arr.length - 1;
      }

      arr.splice(newIndex, 0, arr.splice(currIndex, 1)[0]);
      this.initSnack({
        color: this.getSnackColor(currIndex, newIndex),
        text: "Image moved."
      });
      this.updateCode();
    },
    getSnackColor(currIndex, newIndex) {
      return newIndex > currIndex ? "info" : "success";
    },
    changeImgsUrlInCode(code) {
      const reg = /src="([\s\S]*?)"/g,
        imgs = this.imgs;
      let imgIndex = -1;

      return code.replace(reg, () => {
        imgIndex++;
        return 'src="' + imgs[imgIndex].name + '"';
      });
    },
    changeFormatting(code) {
      const reg = />([\s\S]*?)</g,
        newLine = "\n";

      return code.replace(reg, (a, innerVal) => {
        return innerVal === ""
          ? ">" + newLine + "<"
          : ">" + newLine + innerVal + newLine + "<";
      });
    },
    updateCode() {
      if (this.$refs.template) {
        let currHtml = this.$refs.template.$el.children[0].outerHTML;
        currHtml = this.changeImgsUrlInCode(currHtml);
        currHtml = this.changeFormatting(currHtml);
        this.code = currHtml;
      }
    },
    copyCode() {
      this.initCopy = true;
      this.initSnack({ color: "error", text: "Copied to clipboard." });
    },
    newTemplate(template) {
      this.templates.push(template);
      if (this.templates.length === 1) {
        this.selectedTemplate = this.templates[0];
      }
    },
    initSnack({ color, text }) {
      this.snack = true;
      this.snackColor = color;
      this.snackText = text;
    }
  },
  updated() {
    this.updateCode();
  }
};
</script>

<style lang="less">
</style>
