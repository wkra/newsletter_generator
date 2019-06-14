const getters = {
    imgs(state) {
        return state.imgs;
    },
    snack(state) {
        return state.snack;
    },
    templates(state){
        return state.templates;
    },
    selectedTemplateIndex(state){
        return state.selectedTemplateIndex;
    }
};

export default getters;
