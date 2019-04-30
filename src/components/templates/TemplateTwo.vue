<template>
<html v-if="active">
  <head>
    <title>Template 2</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  </head>
  <body>
    <h1>Template 2 - TEST</h1>
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="text-align: center;">
          <span
            style="display:none!important;font-size:0;line-height:0;margin:0;max-height:0"
          >treść reklamowa</span>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center">
            <tr v-for="(img, index) in imgs" :key="index">
              <td width="600" :height="img.height">
                <a :href="img.url" target="_blank" style="outline: 0;">
                  <img
                    :src="img.src"
                    width="600"
                    :height="img.height"
                    border="0"
                    alt
                    style="display:block;"
                  >
                </a>
              </td>
            </tr>
          </table>
          <span
            style="display:none!important;font-size:0;line-height:0;margin:0;max-height:0"
          >treść reklamowa</span>
        </td>
      </tr>
    </table>
  </body>
</html>
</template>

<script>
export default {
  name: 'TemplateTwo',
  props: {
    imgs: Array,
    active: Boolean
  },
  data() {
    return {
      name: 'Template 2',
      description: 'description 0 width'
    };
  },
  created() {
    this.$emit('newTemplate', {
      templateHeader: this.templateHeader,
      name: this.name,
      description: this.description
    });
  }
};
</script>