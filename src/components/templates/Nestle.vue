<template>
  <div v-if="active">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="text-align: center;">
          <span
            style="display:none!important;font-size:0;line-height:0;margin:0;max-height:0"
          >treść reklamowa</span>
          <table width="600" border="0" cellpadding="0" cellspacing="0" align="center">
            <tr v-for="(img, index) in imgs" :key="index">
              <td width="600">
                <Additional
                :imgIndex="index"/>
                <a :href="img.url" target="_blank" style="outline: 0;">
                  <img
                    :src="img.src"
                    width="600"
                    :height="img.naturalHeight"
                    border="0"
                    :alt="img.alt"
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
  </div>
</template>

<script>
import Additional from ".././Additional.vue";

export default {
  name: "Nestle",
  components: {
    Additional
  },
  props: {
    imgs: Array,
    active: Boolean
  },
  data() {
    return {
      config: {
        templateHeader:  '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
        name: 'Nestle',
        description: 'Images 600px width, in the same folder as index.html.',
        imagesLocation: '',
        additionalImgs: '',
        code: {
          top: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
                <html>
                <head>
                <title>
                NDG
                </title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                </head>
                <body>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                <td align="center" style="text-align: center;">
                <span style="display: none !important; font-size: 0; line-height: 0; margin: 0; max-height: 0;">
                treść reklamowa
                </span>
                <table width="600" border="0" cellpadding="0" cellspacing="0" align="center">`,
          loop: `<tr><td width="600" height="%height%">
                <a href="%href%" target="_blank" style="outline: 0;">
                <img src="%src%" width="600" height="%height%" border="0" alt="%alt%" style="display: block;">
                </a>
                </td></tr>`,
          bottom: `</table>
                <span style="display: none !important; font-size: 0; line-height: 0; margin: 0; max-height: 0;">
                treść reklamowa
                </span>
                </td>
                </tr>
                </table>
                </body>
                </html>`
        }
      }
    };
  },
  created() {
    this.$store.dispatch('addTemplate', this.config);
  }
};
</script>