const actions = {
    addImg({commit}, img) {
        commit("addImg", img);
    },
    setHeight({commit}, data) {
        commit("setImgHeight", data);
    },
    removeImg({commit}, index) {
        commit("removeImg", index);
    },
    sortImgs({commit, state}) {
        let imgs = state.imgs;
        imgs.sort((a, b) => {
            if (a.name < b.name) {
                return state.sortDirection ? -1 : 1;
            }
            if (a.name > b.name) {
                return state.sortDirection ? 1 : -1;
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
    }
};

export default actions;