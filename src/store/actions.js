import methods from './methods';

const actions = {
    addImg({commit}, img) {
        commit("addImg", img);
    },

    setNewId({commit, state}) {
        commit('setNewId', state.id += 1);
    },

    removeImg({commit}, index) {
        commit("removeImg", index);
    },

    removeImgById({state, commit, dispatch}, {id, parentId}) {
        const parentIndex = state.imgs.findIndex(x => x.id === parentId);

        if (parentId === -1) {
            commit("removeImg", parentIndex);
        } else {
            const parentImg = state.imgs[parentIndex],
                childIndex = parentImg.children.findIndex(y => y.id === id);

            dispatch('removeChild', {parentIndex, childIndex});
        }
    },

    sortImgs({commit, state}) {
        const imgs = state.imgs;
        const sortDirection = state.sortDirection;

        imgs.sort((a, b) => {
            if (a.name < b.name) {
                return sortDirection ? -1 : 1;
            }
            if (a.name > b.name) {
                return sortDirection ? 1 : -1;
            }
            return 0;
        });
        commit('setImgs', imgs);
        commit('changeSortDirection');
    },

    moveImg({commit}, {currIndex, newIndex}) {
        commit('moveImg', {currIndex, newIndex});
    },

    setSnack({commit, state, dispatch}, {text, color}) {
        if (state.snack.show) {
            commit('closeSnack');
            setTimeout(() => {
                dispatch('showSnack', {text, color});
            }, 300)
        } else {
            dispatch('showSnack', {text, color});
        }
    },

    showSnack({commit}, {text, color}) {
        commit('showSnack');
        commit('snackText', text);
        commit('snackColor', color);
    },

    closeSnack({commit},) {
        commit('closeSnack');
    },

    addTemplate({commit}, template) {
        commit('addTemplate', template);
    },

    setSelectedTemplateIndex({commit}, index) {
        commit('setSelectedTemplateIndex', index);
    },

    addImgChildren({commit, state, dispatch}, index) {
        const currImg = state.imgs[index],
            childrenLength = currImg.children.length,
            img = methods.copyObject(currImg, ['children']),
            lineHeight = state.breakLineHeight;

        if (childrenLength > 0 && (currImg.children[currImg.children.length - 1].top > currImg.naturalHeight - (lineHeight * 1.5))) {
            dispatch('showSnack', {
                text: 'You can not add another line. The lowest one is too low.',
                color: 'error'
            });
            return;
        }

        if (childrenLength === 0) {
            img.top = lineHeight;
            img.childId = 1;
            img.height = currImg.naturalHeight - lineHeight;

            commit("setImgHeight", {index, height: lineHeight});
        } else {
            img.top = currImg.children[currImg.children.length - 1].top + lineHeight;
            img.height = currImg.naturalHeight - img.top;
            img.childId = currImg.children[currImg.children.length - 1].childId + 1;

            commit('changeChildrenImgHeight', {
                parentIndex: index,
                childIndex: childrenLength - 1,
                height: lineHeight
            });
        }
        img.parent = currImg.id;
        img.id = state.id;
        img.name = methods.getNewName(img.name, `_${img.childId}`);

        dispatch('setNewId');
        commit('addImgChildren', {img, index});
    },

    removeChild({commit, state, dispatch}, {parentIndex, childIndex}) {
        const parentImg = state.imgs[parentIndex],
            removedHeight = parentImg.children[childIndex].height;

        commit('removeChild', {parentIndex, childIndex});

        dispatch('recalculateHeightWhenChildRemoved', {
            parentIndex,
            removedChildIndex: childIndex,
            removedHeight
        });
    },

    changeChildrenImgTop({commit, state}, {parentIndex, childIndex, top}) {
        const parentImg = state.imgs[parentIndex],
            childImg = parentImg.children[childIndex],
            heightDifference = top - childImg.top;

        commit('changeChildrenImgTop', {
            parentIndex,
            childIndex,
            top
        });

        commit('changeChildrenImgHeight', {
            parentIndex,
            childIndex,
            height: childImg.height - heightDifference
        });

        if (childIndex === 0) {
            commit('setImgHeight', {
                index: parentIndex,
                height: parentImg.height + heightDifference
            });
        } else {
            const previousChildImg = parentImg.children[childIndex - 1];

            commit('changeChildrenImgHeight', {
                parentIndex,
                childIndex: childIndex - 1,
                height: previousChildImg.height + heightDifference
            });
        }
    },

    recalculateHeightWhenChildRemoved({commit, state}, {parentIndex, removedChildIndex, removedHeight}) {
        const parentImg = state.imgs[parentIndex],
            childrenLength = parentImg.children.length,
            naturalHeight = parentImg.naturalHeight;

        if (childrenLength === 0) {
            commit('setImgHeight', {
                index: parentIndex,
                height: naturalHeight
            });
        } else {
            if (removedChildIndex === 0) {
                commit('setImgHeight', {
                    index: parentIndex,
                    height: parentImg.height + removedHeight
                });
            } else {
                const previousChildImg = parentImg.children[removedChildIndex - 1];

                commit('changeChildrenImgHeight', {
                    parentIndex,
                    childIndex: removedChildIndex - 1,
                    height: previousChildImg.height + removedHeight
                });
            }
        }
    }
};

export default actions;