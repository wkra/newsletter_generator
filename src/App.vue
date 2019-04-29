<template>
  <div id="app" v-show="isVueInit" style="display: none">
    <v-app>
      <v-toolbar dark color="blue">
        <v-toolbar-title class="white--text">Newsletter Generator</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <v-btn @click="pickFile" color="info">
              <v-icon left>attach_file</v-icon>Upload Files
            </v-btn>
            <v-btn :disabled="imgs < 1" @click="copyCode" class="white--text" color="red">
              <v-icon left>file_copy</v-icon>Copy Code
            </v-btn>
            <input
              type="file"
              style="display: none"
              ref="image"
              accept="image/*"
              @change="onUpload"
              multiple
            >
          </v-flex>
        </v-container>
        <FilesTable :items="imgs" @removeFile="removeImg" @moveFile="move" @updateCode="updateCode"></FilesTable>
        <div class="text-xs-center pt-2">
          <v-btn :disabled="imgs.length < 2" color="green" class="white--text" @click="sortImgs">
            <v-icon left>cached</v-icon>
            Sort order {{sortDirection}}
          </v-btn>
        </div>
      </v-content>
      <v-content>
        <div class="newsletter-view" ref="template">
          <Nestle :imgs="imgs"/>
        </div>
      </v-content>
      <v-container class="code-wrapper" v-if="imgs.length" grid-list-xl>
        <v-layout row wrap>
          <v-flex xs6 text-xs-left>
            <h2>You newsletter Code:</h2>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn @click="copyCode" class="white--text" color="red">
              <v-icon left>file_copy</v-icon>Copy Code
            </v-btn>
          </v-flex>
          <v-flex xs12>
            <Code :code="finaleCode"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import Nestle from "./components/Nestle.vue";
import Code from "./components/Code.vue";
import FilesTable from "./components/FilesTable.vue";

export default {
  name: "app",
  components: {
    Nestle,
    Code,
    FilesTable
  },
  data: function() {
    return {
      isVueInit: true,
      imgs: [],
      sortDirection: "a-z",
      filesType: ["image/jpeg", "image/gif", "image/png"],
      code: "",
      header:
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">'
    };
  },
  computed: {
    showTemplate() {
      return this.imgs.length;
    },
    finaleCode() {
      const reg = /src="([\s\S]*?)"/g,
        imgIndex = 0;

      return this.code.replace(reg, () => {
        return 'src="' + this.imgs[imgIndex].name + '"';
      });
    }
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onUpload(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.getFilesAttributes(files);
      }
    },
    getFilesAttributes(files) {
      var img, file, i;

      for (i = 0; i < files.length; i++) {
        file = files[i];
        if (this.filesType.indexOf(file.type) > -1) {
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
    },
    compareName(a, b) {
      if (a.name < b.name) return this.sortDirection === "a-z" ? -1 : 1;
      if (a.name > b.name) return this.sortDirection === "a-z" ? 1 : -1;
      return 0;
    },
    changeSortDirection() {
      this.sortDirection = this.sortDirection
        .split("")
        .reverse()
        .join("");
    },
    move({ currIndex, newIndex }) {
      var arr = this.imgs;
      arr.splice(newIndex, 0, arr.splice(currIndex, 1)[0]);
    },
    updateCode() {
      if (this.$refs.template) {
        this.code = this.$refs.template.children[0].outerHTML;
      }
    },
    copyStringToClipboard(str) {
      const el = document.createElement("textarea");
      el.value = str;
      el.setAttribute("readonly", "");
      el.style = { position: "absolute", left: "-9999px" };
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
    copyCode() {
      this.copyStringToClipboard(this.finaleCode);
    }
  },
  updated() {
    this.updateCode();
  }
};
</script>

<style lang="less">
.code-wrapper {
  padding: 40px;
  background-color: #eff0f1;
}

code {
  font-size: 13px;
  font-family: monospace;
  background-color: #eff0f1;
  white-space: pre-line;
  box-shadow: none;
}

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
        opacity: .5;
      }
    }
  }
}
.flip-list-move {
  transition: transform 1s;
}
</style>
