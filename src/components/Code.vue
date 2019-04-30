<template>
  <v-container class="code-wrapper" grid-list-xl>
    <v-layout row wrap>
      <v-flex xs6 text-xs-left>
        <h2>Your index.html code:</h2>
      </v-flex>
      <v-flex xs6 text-xs-right>
        <v-btn @click="copyCode" class="white--text" color="red">
          <v-icon left>file_copy</v-icon>Copy
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <code>
          {{header}}
          {{code}}
        </code>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Code",
  props: {
    code: String,
    header: String
  },
  methods: {
    copyCode() {
      this.$emit("copyCode");
    }
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
</style>


