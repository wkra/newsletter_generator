<template>
  <v-container fluid>
    <v-layout row wrap align-center>
      <v-flex xs3>
        <v-select
          :value="selectedTemplateIndex"
          :hint="templates[selectedTemplateIndex].description"
          :items="templates"
          item-text="name"
          item-value="name"
          :label="templates[selectedTemplateIndex].name"
          persistent-hint
          return-object
          single-line
          @change="selectChange"
        ></v-select>
      </v-flex>
      <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
        <v-btn @click="pickFile" color="info">
          <v-icon left>attach_file</v-icon>Upload Files
        </v-btn>
        <v-btn :disabled="imgsLength < 1" @click="copyCode" class="white--text" color="red">
          <v-icon left>file_copy</v-icon>Copy Code
        </v-btn>
        <v-btn :disabled="imgsLength < 1" @click="getFiles" class="white--text" color="orange">
          <v-icon left>get_app</v-icon>Get files
        </v-btn>
        <input
          type="file"
          style="display: none"
          ref="uploadInput"
          accept="image/*"
          @change="onUpload"
          multiple
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

export default {
  name: "AboveTable",
  props: {
    imgsLength: Number,
    templates: Array
  },
  computed: {
    ...mapGetters([
      'selectedTemplateIndex'
    ])
  },
  methods: {
    pickFile() {
      this.$refs.uploadInput.click();
    },
    onUpload(e) {
      this.$emit("onUpload", e);
    },
    copyCode() {
      this.$emit("copyCode");
    },
    selectChange(e){
      this.$store.dispatch('setSelectedTemplateIndex', e.index);
      this.$store.dispatch('setSnack', {text: "Template Changed.", color: "info"});
    },
    getFiles(){
      this.$emit("getFiles");
    }
  }
};
</script>
