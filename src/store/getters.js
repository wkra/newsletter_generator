const getters = {
    imgs(state) {
        return state.imgs;
    },
    snack(state) {
        return state.snack;
    },
    templates(state) {
        return state.templates;
    },
    selectedTemplateIndex(state) {
        return state.selectedTemplateIndex;
    },
    id(state) {
        return state.id;
    },
    breakLineHeight(state){
        return state.breakLineHeight;
    }
};

export default getters;
