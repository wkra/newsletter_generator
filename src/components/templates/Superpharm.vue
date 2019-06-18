<template >
  <div style="padding: 0; margin: 0" v-if="active">
    <table id="Tabela_sp" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="text-align:center;">
          <table
            id="Tabela_01"
            width="600"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="margin:0 auto;"
          >
            <tr>
              <td>
                <a
                  style="margin: 0; border: 0; outline: none"
                  target="_blank"
                  href="https://www.superpharm.pl/"
                >
                  <img
                    style="display:block;margin:0; border:0"
                    src="@/assets/newsletter-600px_01.png"
                    width="600"
                    alt
                  >
                </a>
              </td>
            </tr>
          </table>
          <table
            id="Tabela_02"
            width="600"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="margin:0 auto;"
          >
            <tr>
              <td width="142" height="46">
                <a
                  href="https://www.superpharm.pl/perfumeria.html?utm_source=spp&utm_medium=cpc&utm_campaign=f-25&utm_term=mail&utm_content=sklep"
                  target="_blank"
                  style="margin: 0; border: 0; outline: none"
                >
                  <img
                    src="@/assets/newsletter-600px_02.jpg"
                    width="141"
                    height="46"
                    border="0"
                    alt
                    style="display:block;margin:0; border:0"
                  >
                </a>
              </td>
              <td width="107" height="46">
                <a
                  href="https://www.superpharm.pl/makijaz.html?utm_source=spp&utm_medium=cpc&utm_campaign=f-25&utm_term=mail&utm_content=sklep"
                  target="_blank"
                  style="margin: 0; border: 0; outline: none"
                >
                  <img
                    src="@/assets/newsletter-600px_03.jpg"
                    width="107"
                    height="46"
                    border="0"
                    alt
                    style="display:block;margin:0; border:0"
                  >
                </a>
              </td>
              <td width="133" height="46">
                <a
                  href="https://www.superpharm.pl/pielegnacja.html?utm_source=spp&utm_medium=cpc&utm_campaign=f-25&utm_term=mail&utm_content=sklep"
                  target="_blank"
                  style="margin: 0; border: 0; outline: none"
                >
                  <img
                    src="@/assets/newsletter-600px_04.jpg"
                    width="133"
                    height="46"
                    border="0"
                    alt
                    style="display:block;margin:0; border:0"
                  >
                </a>
              </td>
              <td width="219" height="46">
                <a
                  href="https://www.superpharm.pl/dermokosmetyki.html?utm_source=spp&utm_medium=cpc&utm_campaign=f-25&utm_term=mail&utm_content=sklep"
                  target="_blank"
                  style="margin: 0; border: 0; outline: none"
                >
                  <img
                    src="@/assets/newsletter-600px_05.jpg"
                    width="219"
                    height="46"
                    border="0"
                    alt
                    style="display:block;margin:0; border:0"
                  >
                </a>
              </td>
            </tr>
          </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr v-for="(img, index) in imgs" :key="index">
              <td>
                <Additional :img="img"
                            :imgIndex="index"/>
                <a :href="img.url" target="_blank" style="outline: 0;">
                  <img
                    :src="img.src"
                    width="600"
                    :height="img.naturalHeight"
                    border="0"
                    style="display: block;line-height: 50%"
                    :alt="img.alt"
                  >
                </a>
              </td>
            </tr>
          </table>
          <table
            id="Tabela_06"
            width="600"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="margin:0 auto;"
          >
            <tr>
              <td width="129" height="100">
                <a
                  href="https://www.superpharm.pl/formy-platnosci"
                  target="_blank"
                  style="margin: 0; border: 0; outline: none"
                >
                  <img
                    src="@/assets/korzysci_01.jpg"
                    width="129"
                    height="100"
                    border="0"
                    alt
                    style="display:block;margin:0; border:0"
                  >
                </a>
              </td>
              <td width="112" height="100">
                <a
                  href="https://www.superpharm.pl/warunki-dostawy"
                  target="_blank"
                  style="margin: 0; border: 0; outline: none"
                >
                  <img
                    src="@/assets/korzysci_02.jpg"
                    width="112"
                    height="100"
                    border="0"
                    alt
                    style="display:block;margin:0; border:0"
                  >
                </a>
              </td>
              <td width="105" height="100">
                <a
                  href="https://www.superpharm.pl/zwroty-i-reklamacje"
                  target="_blank"
                  style="margin: 0; border: 0; outline: none"
                >
                  <img
                    src="@/assets/korzysci_03.jpg"
                    width="105"
                    height="100"
                    border="0"
                    alt
                    style="display:block;margin:0; border:0"
                  >
                </a>
              </td>
              <td width="123" height="100">
                <a
                  href="https://www.superpharm.pl/warunki-dostawy"
                  target="_blank"
                  style="margin: 0; border: 0; outline: none"
                >
                  <img
                    src="@/assets/korzysci_04.jpg"
                    width="123"
                    height="100"
                    border="0"
                    alt
                    style="display:block;margin:0; border:0"
                  >
                </a>
              </td>
              <td width="219" height="100">
                <a
                  href="https://www.superpharm.pl/warunki-dostawy"
                  target="_blank"
                  style="margin: 0; border: 0; outline: none"
                >
                  <img
                    src="@/assets/korzysci_05.jpg"
                    width="131"
                    height="100"
                    border="0"
                    alt
                    style="display:block;margin:0; border:0"
                  >
                </a>
              </td>
            </tr>
          </table>
          <table width="600" border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr>
              <td width="64" height="68">
                <a
                  style="margin: 0; border: 0; outline: none"
                  href="https://www.facebook.com/super.pharm/"
                  target="_blank"
                >
                  <img
                    style="display:block;margin:0; border:0"
                    src="@/assets/mailing-stopka_01.gif"
                    width="64"
                    height="68"
                    border="0"
                    alt
                  >
                </a>
              </td>
              <td width="43" height="68">
                <a
                  style="margin: 0; border: 0; outline: none"
                  href="https://www.youtube.com/user/SUPERPHARMPolska"
                  target="_blank"
                >
                  <img
                    style="display:block;margin:0; border:0"
                    src="@/assets/mailing-stopka_02.gif"
                    width="43"
                    height="68"
                    border="0"
                    alt
                  >
                </a>
              </td>
              <td width="45" height="68">
                <a
                  style="margin: 0; border: 0; outline: none"
                  href="https://twitter.com/superpharm_pl"
                  target="_blank"
                >
                  <img
                    style="display:block;margin:0; border:0"
                    src="@/assets/mailing-stopka_03.gif"
                    width="45"
                    height="68"
                    border="0"
                    alt
                  >
                </a>
              </td>
              <td width="44" height="68">
                <a
                  style="margin: 0; border: 0; outline: none"
                  href="https://www.instagram.com/superpharmpoland/"
                  target="_blank"
                >
                  <img
                    style="display:block;margin:0; border:0"
                    src="@/assets/mailing-stopka_04.gif"
                    width="44"
                    height="68"
                    border="0"
                    alt
                  >
                </a>
              </td>
              <td width="54" height="68">
                <a
                  style="margin: 0; border: 0; outline: none"
                  href="https://www.superpharm.pl/kontakt.html?___store=pl"
                  target="_blank"
                >
                  <img
                    style="display:block;margin:0; border:0"
                    src="@/assets/mailing-stopka_05.gif"
                    width="54"
                    height="68"
                    border="0"
                    alt
                  >
                </a>
              </td>
              <td width="160" height="68">
                <a style="margin: 0; border: 0; outline: none" href="https://www.superpharm.pl/" target="_blank">
                  <img
                    style="display:block;margin:0; border:0"
                    src="@/assets/mailing-stopka_06.gif"
                    width="160"
                    height="68"
                    border="0"
                    alt
                  >
                </a>
              </td>
              <td width="190" height="68">
                <a
                  style="margin: 0; border: 0; outline: none"
                  href="https://www.superpharm.pl/"
                  target="_blank"
                >
                  <img
                    style="display:block;margin:0; border:0"
                    src="@/assets/mailing-stopka_07.jpg"
                    width="190"
                    height="68"
                    border="0"
                    alt
                  >
                </a>
              </td>
            </tr>
            <tr>
              <td colspan="8" style="padding:30px 20px;text-align:justify;">
                <p style="color:#808080;font-size:10px;margin:0;line-height:16px;">
                  Ten newsletter jest
                  wysyłany do Ciebie zgodnie z regulaminem serwisu internetowego Super-Pharm. Informujemy
                  w nim o aktualnej ofercie Super-Pharm oraz o naszych akcjach promocyjnych. Mamy
                  nadzieję, że znajdziesz u nas wiele ofert odpowiadających na Twoje potrzeby. Jeśli
                  jednak chcesz zrezygnować z otrzymywania tych informacji wystarczy, że klikniesz w link:
                  zrezygnuj z subskrybcji:
                  <a
                    target="_blank"
                    style="color:#000;font-weight:bold;"
                    href="*|UNSUB|*"
                    title="zrezygnuj z subskrybcji"
                  >zrezygnuj z subskrybcji</a>
                </p>
                <p style="color:#808080;font-size:10px;margin:0;margin-top:30px;line-height:16px;">
                  Copyright
                  © 2019 Super-Pharm Poland Sp. z.o.o. Wszystkie prawa zastrzeżone.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import Additional from ".././Additional.vue";

export default {
  name: "Superpharm",
  components: {
    Additional
  },
  props: {
    imgs: Array,
    active: Boolean
  },
  data() {
    return {
      name: "Superpharm",
      description: 'images 600px width in folder "images/"',
      templateHeader: "",
      imagesLocation: "images/",
      code: {
        top: `<html>
          <head>
          <meta charset="utf-8">
          <style type="text/css">
          body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;}
          td img {display: block;}
          .ExternalClass {width:100%;}
          .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
          img {outline:none; text-decoration:none; -ms-interpolation-mode: bicubic;}
          a img {border:none;}
          .image_fix {display:block;}
          p {margin: 0 0;}
          table td {border-collapse: collapse;}
          table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
          </style>
          </head>
          <body style="padding: 0; margin: 0;">
          <table id="Tabela_sp" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
          <td align="center" style="text-align: center;">
          <table id="Tabela_01" width="600" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
          <td>
          <a target="_blank" href="https://www.superpharm.pl/" style="margin: 0; border: 0; outline: none;">
          <img src="images/newsletter-600px_01.png" width="600" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          </tr>
          </table>
          <table id="Tabela_02" width="600" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
          <td width="142" height="46">
          <a href="https://www.superpharm.pl/perfumeria.html?utm_source=spp&amp;utm_medium=cpc&amp;utm_campaign=f-25&amp;utm_term=mail&amp;utm_content=sklep" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="mages/newsletter-600px_02.jpg" width="141" height="46" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="107" height="46">
          <a href="https://www.superpharm.pl/makijaz.html?utm_source=spp&amp;utm_medium=cpc&amp;utm_campaign=f-25&amp;utm_term=mail&amp;utm_content=sklep" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/newsletter-600px_03.jpg" width="107" height="46" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="133" height="46">
          <a href="https://www.superpharm.pl/pielegnacja.html?utm_source=spp&amp;utm_medium=cpc&amp;utm_campaign=f-25&amp;utm_term=mail&amp;utm_content=sklep" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/newsletter-600px_04.jpg" width="133" height="46" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="219" height="46">
          <a href="https://www.superpharm.pl/dermokosmetyki.html?utm_source=spp&amp;utm_medium=cpc&amp;utm_campaign=f-25&amp;utm_term=mail&amp;utm_content=sklep" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="newsletter_generator/images/newsletter-600px_05.jpg" width="219" height="46" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          </tr>
          </table>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">`,
        loop: `<tr>
          <td>
          <a href="%href%" target="_blank" style="outline: 0;">
          <img src="images/%src%" width="600" height="%href%" border="0" alt="%alt%" style="display: block; line-height: 50%;">
          </a>
          </td>
          </tr>`,
        bottom: `</table>
          <table id="Tabela_06" width="600" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
          <td width="129" height="100">
          <a href="https://www.superpharm.pl/formy-platnosci" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/korzysci_01.jpg" width="129" height="100" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="112" height="100">
          <a href="https://www.superpharm.pl/warunki-dostawy" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/korzysci_02.jpg" width="112" height="100" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="105" height="100">
          <a href="https://www.superpharm.pl/zwroty-i-reklamacje" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/korzysci_03.jpg" width="105" height="100" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="123" height="100">
          <a href="https://www.superpharm.pl/warunki-dostawy" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/korzysci_04.jpg" width="123" height="100" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="219" height="100">
          <a href="https://www.superpharm.pl/warunki-dostawy" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/korzysci_05.jpg" width="131" height="100" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          </tr>
          </table>
          <table width="600" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
          <tr>
          <td width="64" height="68">
          <a href="https://www.facebook.com/super.pharm/" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/mailing-stopka_01.gif" width="64" height="68" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="43" height="68">
          <a href="https://www.youtube.com/user/SUPERPHARMPolska" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/mailing-stopka_02.gif" width="43" height="68" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="45" height="68">
          <a href="https://twitter.com/superpharm_pl" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/mailing-stopka_03.gif" width="45" height="68" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="44" height="68">
          <a href="https://www.instagram.com/superpharmpoland/" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/mailing-stopka_04.gif" width="44" height="68" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="54" height="68">
          <a href="https://www.superpharm.pl/kontakt.html?___store=pl" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/mailing-stopka_05.gif" width="54" height="68" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="160" height="68">
          <a href="https://www.superpharm.pl/" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/mailing-stopka_06.gif" width="160" height="68" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          <td width="190" height="68">
          <a href="https://www.superpharm.pl/" target="_blank" style="margin: 0; border: 0; outline: none;">
          <img src="images/mailing-stopka_07.jpg" width="190" height="68" border="0" alt="" style="display: block; margin: 0; border: 0;">
          </a>
          </td>
          </tr>
          <tr>
          <td colspan="8" style="padding: 30px 20px; text-align: justify;">
          <p style="color: rgb(128, 128, 128); font-size: 10px; margin: 0; line-height: 16px;">

          Ten newsletter jest
          wysyłany do Ciebie zgodnie z regulaminem serwisu internetowego Super-Pharm. Informujemy
          w nim o aktualnej ofercie Super-Pharm oraz o naszych akcjach promocyjnych. Mamy
          nadzieję, że znajdziesz u nas wiele ofert odpowiadających na Twoje potrzeby. Jeśli
          jednak chcesz zrezygnować z otrzymywania tych informacji wystarczy, że klikniesz w link:
          zrezygnuj z subskrybcji:

          <a target="_blank" href="*|UNSUB|*" title="zrezygnuj z subskrybcji" style="color: rgb(0, 0, 0); font-weight: bold;">
          zrezygnuj z subskrybcji
          </a>
          </p>
          <p style="color: rgb(128, 128, 128); font-size: 10px; margin: 30px 0 0; line-height: 16px;">

          Copyright
          © 2019 Super-Pharm Poland Sp. z.o.o. Wszystkie prawa zastrzeżone.

          </p>
          </td>
          </tr>
          </table>
          </td>
          </tr>
          </table>
          </body>
          </html>`
      }
    };
  },
  created() {
    this.$store.dispatch('addTemplate', {
      templateHeader: this.templateHeader,
      name: this.name,
      description: this.description,
      imagesLocation: this.imagesLocation,
      code: this.code
    });
  }
};
</script>