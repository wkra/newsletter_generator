const mutations = {
    addImg(state, img) {
        state.imgs.push(img)
    },
    addImgChildren(state, {img, index}) {
        state.imgs[index].children.push(img);
    },
    removeChild(state, {parentIndex, childIndex}) {
        state.imgs[parentIndex].children.splice(childIndex, 1);
    },
    changeChildrenImgTop(state, {parentIndex, childIndex, top}) {
        state.imgs[parentIndex].children[childIndex].top = top;
    },
    changeChildrenImgHeight(state, {parentIndex, childIndex, height}) {
        state.imgs[parentIndex].children[childIndex].height = height;
    },
    setImgHeight(state, {index, height}) {
        state.imgs[index].height = height;
    },
    setImgNaturalHeight(state, {index, height}) {
        state.imgs[index].naturalHeight = height;
    },
    removeImg(state, index) {
        state.imgs.splice(index, 1);
    },
    setImgs(state, imgs) {
        state.imgs = imgs;
    },
    moveImg(state, {currIndex, newIndex}) {
        const stateImgs = state.imgs;
        stateImgs.splice(newIndex, 0, stateImgs.splice(currIndex, 1)[0]);
    },
    showSnack(state) {
        const snack = state.snack;
        window.clearTimeout(snack.timer);
        snack.show = true;
        snack.timer = window.setTimeout(() => {
            snack.show = false;
        }, 3000);
    },
    closeSnack(state) {
        const snack = state.snack;

        window.clearTimeout(snack.timer);
        snack.show = false;
    },
    snackText(state, text) {
        state.snack.text = text;
    },
    snackColor(state, color) {
        state.snack.color = color;
    },
    changeSortDirection(state) {
        state.sortDirection = !state.sortDirection;
    },
    addTemplate(state, template) {
        const templates = state.templates;

        template.index = templates.length;
        templates.push(template);
    },
    setSelectedTemplateIndex(state, index) {
        state.selectedTemplateIndex = index;
    },
    setNewId(state, num) {
        state.id = num;
    }
};

export default mutations;