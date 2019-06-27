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
                        @getFiles="getImgsFiles"
                />
                <FilesTable
                        :items="tableItems"
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
            <Code v-if="showTemplate"
                  :code="newsletterCode"
                  @copyCode="copyCode"/>
            <v-snackbar :value="snack.show" :color="snack.color">
                {{ snack.text }}
                <v-btn flat @click="closeSnack">Close</v-btn>
            </v-snackbar>
        </v-app>
        <CopyTextarea v-if="initCopy" :text="newsletterCode" v-model="initCopy"/>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import axios from 'axios';
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
                imgsFiles: []
            };
        },
        computed: {
            ...mapGetters([
                'imgs',
                'id',
                'snack',
                'templates',
                'selectedTemplateIndex'
            ]),
            showTemplate() {
                return this.imgs.length > 0;
            },
            templateHeader() {
                return typeof this.selectedTemplate.templateHeader === "undefined"
                    ? ""
                    : this.selectedTemplate.templateHeader;
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
            selectedTemplate() {
                if (this.templates.length > 0) {
                    return this.templates[this.selectedTemplateIndex];
                } else {
                    return {};
                }
            },
            selectedTemplateContent() {
                let content = '';
                if (this.selectedTemplate) {
                    const loopCode = this.selectedTemplate.code.loop;

                    this.tableItems.forEach((el) => {
                        let currLoop = loopCode;
                        currLoop = currLoop.replace(/%height%/gm, el.height);
                        currLoop = currLoop.replace(/%alt%/gm, el.alt);
                        currLoop = currLoop.replace(/%src%/gm, el.name);
                        currLoop = currLoop.replace(/%href%/gm, el.url);
                        content += currLoop;
                    })
                }
                return content
            },
            newsletterCode() {
                const template = this.selectedTemplate;
                if (template) {
                    return template.code.top + this.selectedTemplateContent + template.code.bottom;
                } else {
                    return ''
                }
            }
        },
        methods: {
            onUpload(e) {
                var files = e.target.files || e.dataTransfer.files;

                if (files.length) {
                    this.getFilesAttributes(files);

                    this.$store.dispatch('setSnack', {
                        text: "Files uploaded.",
                        color: "info"
                    });
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
                    imgData.file = files[i];

                    this.$store.dispatch('setNewId');
                    this.$store.dispatch('addImg', imgData);

                    this.getFileHeight(img, this.imgs.length - 1);
                }
            },
            getImgsFiles() {
                let postData = {
                    files: new FormData(),
                    imgsObj: this.imgs,
                    imagesLocation: this.selectedTemplate.imagesLocation,
                    additionalImgs: this.selectedTemplate.additionalImgs,
                    code: this.newsletterCode
                };

                this.imgs.forEach(function (img, i) {
                    postData.files.append('files[' + i + ']', img.file);
                });

                axios.post('#',
                    postData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(() => {
                    this.$store.dispatch('setSnack', {
                        text: "success",
                        color: "info"
                    });
                })
                .catch(() => {
                    this.$store.dispatch('setSnack', {
                        text: "failure",
                        color: "info"
                    });
                });
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
                        height: img.naturalHeight,
                        naturalHeight: img.naturalHeight
                    });
                }).bind(this);
            },
            sortImgs() {
                this.$store.dispatch('sortImgs');
                this.$store.dispatch('setSnack', {
                    text: "Images sorted.",
                    color: "success"
                });
            },
            copyCode() {
                this.initCopy = true;
                this.$store.dispatch('setSnack', {
                    text: "Copied to clipboard.",
                    color: "error"
                });
            },
            closeSnack() {
                this.$store.dispatch('closeSnack');
            }
        }
    };
</script>

