import methods from './methods';

const actions = {
    addImg({commit}, img) {
        commit("addImg", img);
    },
    setNewId({commit, state}) {
      commit('setNewId', state.id += 1);
    },
    setHeight({commit}, data) {
        commit("setImgHeight", data);
    },
    removeImg({commit}, index) {
        commit("removeImg", index);
    },
    removeImgById({state, commit}, {id, parentId}){
        if (parentId === -1) {
            const index = state.imgs.findIndex(x => x.id === id);
            commit("removeImg", index);
        } else {
            const parentIndex = state.imgs.findIndex(x => x.id === parentId);
            const childIndex = state.imgs[parentIndex].children.findIndex(y => y.id === id);
            commit('removeChildren', {parentIndex, childIndex});
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
        const currImg = state.imgs[index];
        const img = methods.copyObject(currImg, ['children']);
        if (currImg.children.length === 0) {
            img.top = 10;
            img.childId = 1;
        } else {
            img.top = currImg.children[currImg.children.length - 1].top + 10;
            console.log(currImg.children[currImg.children.length - 1].childId);
            img.childId = currImg.children[currImg.children.length - 1].childId + 1;
        }
        img.parent = currImg.id;
        img.id = state.id;
        img.name = methods.getNewName(img.name, `_${img.childId}`);

        dispatch('setNewId');
        commit('addImgChildren', {img, index});
    },
    removeChildren({commit}, payload) {
        commit('removeChildren', payload);
    },
    changeChildrenImgTop({commit}, payload){
        commit('changeChildrenImgTop', payload);
    }
};

export default actions;