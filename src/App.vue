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
        ? ""
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
          url: "https://",
          alt: ""
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
    move({ currIndex, newIndex, name }) {
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
        text: `${name} moved`
      });
      this.updateCode();
    },
    getSnackColor(currIndex, newIndex) {
      return newIndex > currIndex ? "info" : "success";
    },
    changeImgsUrlInCode(code) {
      const reg = /src="blob([\s\S]*?)"/g,
        imgs = this.imgs,
        imgsLocation = this.selectedTemplate.imagesLocation
          ? this.selectedTemplate.imagesLocation
          : "";
      let imgIndex = -1,
        imgName = "";

      return code.replace(reg, () => {
        imgIndex++;
        imgName = imgs[imgIndex].name;
        return `src="${imgsLocation}${imgName}"`;
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
    addAdditionalStyles(code, additionalStyles) {
      const endHead = "</head>";
      return code.replace(endHead, `${additionalStyles}${endHead}`);
    },
    replacePx(code) {
      const reg = / 0px/g;
      return code.replace(reg, " 0");
    },
    correctImgPath(code){
      const reg = /src="\//g;
      return code.replace(reg, 'src="');
    },
    updateCode() {
      if (this.$refs.template && this.imgs.length) {
        const additionalStyles = this.selectedTemplate.additionalStyles;
        let currHtml = this.$refs.template.$el.children[0].outerHTML;
        if (additionalStyles) {
          currHtml = this.addAdditionalStyles(currHtml, additionalStyles);
        }
        currHtml = this.replacePx(currHtml);
        currHtml = this.changeImgsUrlInCode(currHtml);
        currHtml = this.correctImgPath(currHtml);
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

