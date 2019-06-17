<template>
  <div id="app">
    <v-app>
      <Toolbar/>
      <v-content>
        <HeaderTable
          v-if="templates.length"
          :imgsLength="imgs.length"
          :templates="templates"
          @onUpload="onUpload"
          @copyCode="copyCode"
        />
        <FilesTable
          :items="tableItems"
          @updateCode="updateCode"
        ></FilesTable>
        <FooterTable :disableBtn="imgs.length < 2" @sortImgs="sortImgs"/>
      </v-content>
      <v-container v-show="showTemplate">
        <NewsletterView
          ref="template"
          v-show="showTemplate"
          :imgs="imgs"
          :selectedTemplate="selectedTemplate"
        />
      </v-container>
      <Code v-if="showTemplate" :code="code" :header="templateHeader" @copyCode="copyCode"/>
      <v-snackbar :value="snack.show" :color="snack.color">
        {{ snack.text }}
        <v-btn flat @click="closeSnack">Close</v-btn>
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
      code: "",
      initCopy: false,
    };
  },
  computed: {
    showTemplate() {
      return this.imgs.length > 0;
    },
    templateHeader() {
      return typeof this.selectedTemplate.templateHeader === "undefined"
        ? ""
        : this.selectedTemplate.templateHeader;
    },
    imgs() {
        return this.$store.getters.imgs;
    },
      id() {
          return this.$store.getters.id;
      },
    tableItems() {
      const items = [];

      this.imgs.forEach((el) => {
        items.push(el);

        if (el.children.length > 0) {
          el.children.forEach((childEl) => {
            items.push(childEl);
          })
        }
      });
      return items;
    },
    snack() {
      return this.$store.getters.snack;
    },
    templates(){
      return this.$store.getters.templates;
    },
    selectedTemplateIndex(){
      return this.$store.getters.selectedTemplateIndex;
    },
    selectedTemplate(){
      if (this.templates.length > 0) {
        return this.templates[this.selectedTemplateIndex];
      } else {
        return {};
      }
    }
  },
  methods: {
    onUpload(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.getFilesAttributes(files);
        this.$store.dispatch('setSnack', {text: "Files uploaded.", color: "info"});
      }
    },
    getFilesAttributes(files) {
      let i, img, imgData;

      for (i = 0; i < files.length; i++) {
        img = new Image();
        img.src = window.URL.createObjectURL(files[i]);

        imgData = this.getImg();
        imgData.name = files[i].name;
        imgData.src = img.src;
        imgData.id = this.id;

        this.$store.dispatch('setNewId');
        this.$store.dispatch('addImg', imgData);

        this.getFileHeight(img, this.imgs.length - 1);
      }
    },
    getImg() {
      return {
        name: '',
        height: 0,
        top: 0,
        src: '',
        url: "https://",
        alt: "",
        children: [],
        parent: -1
      }
    },
    getFileHeight(img, index) {
      img.onload = (() => {

        this.$store.dispatch('setHeight', {
          index: index,
          height: img.naturalHeight
        });
      }).bind(this);
    },
    sortImgs() {
      this.$store.dispatch('sortImgs');
      this.updateCode();
      this.$store.dispatch('setSnack', {text: "Images sorted.", color: "success"});
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
      this.$store.dispatch('setSnack', {text: "Copied to clipboard.", color: "error"});
    },
    closeSnack(){
      this.$store.dispatch('closeSnack');
    }
  },
  updated() {
    this.updateCode();
  }
};
</script>

