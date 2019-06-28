<template>
    <div class="additional__wrapper" @mousedown="imgClick">
        <v-btn :class="{'additional__btn--in-active': active}" outline small fab class="additional__btn"
               @click="addBreak" color="black">
            <v-icon>add_circle_outline</v-icon>
        </v-btn>
        <div class="additional__breaks" v-if="breaks.length">
            <div class="additional__break"
                 v-for="(breakLine, index) in breaks"
                 :key="index"
                 :style="{top: `${breakLine.top}px`}"
                 @mousedown="startMove($event, index)">
                <div class="additional__hr" :style="{height: `${breakLineHeight}px`}"
                     :class="{active: currIndex === index && active }">
                    <v-btn outline small fab class="additional__hr-remove" @click="removeLine($event, index)">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "Additional",
        data() {
            return {
                mousePosition: 0,
                currIndex: 0,
                active: false
            }
        },
        props: {
            imgIndex: Number
        },
        computed: {
            ...mapGetters([
                'imgs',
                'breakLineHeight'
            ]),
            img (){
                return this.imgs[this.imgIndex];
            },
            breaks(){
                return this.imgs[this.imgIndex].children;
            }
        },
        methods: {
            addBreak() {
                this.$store.dispatch('addImgChildren', this.imgIndex);
            },
            startMove(e, i) {
                if (e.which === 1) {
                    e.preventDefault();
                    this.mousePosition = e.y;
                    this.currIndex = i;
                    this.active = true;
                    document.addEventListener('mousemove', this.moveLine);
                    document.addEventListener("mouseup", this.stopMove);
                }
            },

            moveLine(e) {
                e.preventDefault();
                const currY = e.y;
                const currTop = this.breaks[this.currIndex].top;
                let newTop = currTop - (this.mousePosition - currY);
                newTop = this.validateVal(newTop);
                this.$store.dispatch('changeChildrenImgTop', {parentIndex: this.imgIndex, childIndex: this.currIndex, top: newTop});
                this.mousePosition = currY;
            },

            validateVal(val) {
                // check top of image
                if (val < this.breakLineHeight) {
                    return this.breakLineHeight;
                }

                // check bottom of image
                const maxImgHeight = this.img.naturalHeight - this.breakLineHeight;

                if (val > maxImgHeight) {
                    return maxImgHeight;
                }

                if (this.breaks.length > 1) {
                    // check break line before
                    if (this.currIndex > 0) {
                        const maxTopVal = this.breaks[this.currIndex - 1].top + this.breakLineHeight;

                        if (val < maxTopVal) {
                            return maxTopVal;
                        }
                    }

                    // check break line after
                    if (this.currIndex <= this.breaks.length - 2){
                        const maxBottomVal = this.breaks[this.currIndex + 1].top - this.breakLineHeight;

                        if (val > maxBottomVal) {
                            return maxBottomVal;
                        }
                    }
                }

                return val;
            },

            stopMove(e) {
                e.preventDefault();
                this.active = false;
                document.removeEventListener('mouseup', this.stopMove);
                document.removeEventListener('mousemove', this.moveLine);
            },

            removeLine(e, i) {
                e.preventDefault();
                this.$store.dispatch('removeChild', {
                    parentIndex: this.imgIndex,
                    childIndex: i
                });
            },
            imgClick(e) {
                if (e.target.className === 'additional__wrapper') {
                    const top = e.layerY,
                        currImg = this.img,
                        urlReg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
                    let url;

                    if (currImg.children.length === 0) {
                        url = currImg.url;
                    } else {
                        currImg.children.some((el, index, arr) => {
                            if (index === 0 && top < el.top) {
                                url = currImg.url;
                                return true;
                            }
                            if (index === arr.length -1 || top > el.top && top < arr[index + 1].top) {
                                url = el.url;
                                return true;
                            }
                        })
                    }
                    if (urlReg.test(url)) {
                        window.open(url);
                    } else {
                        this.$store.dispatch('setSnack', {
                            text: `"${url}" url has the wrong format. Please correct and try again. `,
                            color: "error"
                        });
                    }
                }
            }
        }
    };
</script>

<style lang="less">
    .additional {
        &__btn {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 20;
            opacity: 0;
            transition: all 0.5s;

            &--in-active {
                opacity: 0 !important;
            }
        }

        &__wrapper {
            .newsletter-view & {
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 10;
            }

            &::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                right: 0;
                opacity: 0;
                box-shadow: inset 0 0 30px 0 #000;
                transition: all 0.5s;
            }

            &:hover {
                .additional {
                    &__btn {
                        opacity: 1;
                        box-shadow: 0 0 10px #000;
                        background-color: #f5f5f5;
                    }
                }

                &::after {
                    opacity: 0.5;
                }
            }
        }

        &__breaks {
            width: 100%;
            height: 100%;
        }

        &__break {
            height: 12px;
            width: 100%;
            z-index: 15;
        }

        &__hr {
            border: 0;

            &::before {
                content: '';
                background-color: #000;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                hegith: 2px;
            }

            &::after {
                content: '';
                background-color: #000;
                box-shadow: 0 0 0 #000;
                height: 2px;
                width: 100%;
                position: absolute;
                left: 0;
                top: 0;
                transform: translateY(-50%);
                transition: box-shadow .3s;
            }

            &.active {
                &::after {
                    box-shadow: 0 0 6px #000;
                }

            }

            &:hover {
                &:not(.active) {
                    .additional {
                        &__hr-remove {
                            opacity: .8;
                        }
                    }
                }
            }
        }

        &__hr-remove {
            opacity: 0;
            right: 15px;
        }

        &__btn,
        &__breaks,
        &__break,
        &__hr-remove {
            .additional__wrapper & {
                position: absolute;
            }
        }
    }
</style>
