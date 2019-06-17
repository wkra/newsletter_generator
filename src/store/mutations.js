const mutations = {
    addImg(state, img) {
        state.imgs.push(img)
    },
    addImgChildren(state, {img, index}) {
        state.imgs[index].children.push(img);
    },
    removeChildren(state, {parentIndex, childIndex}) {
        state.imgs[parentIndex].children.splice(childIndex, 1);
    },
    changeChildrenImgTop(state, {parentIndex, childIndex, top}) {
        state.imgs[parentIndex].children[childIndex].top = top;
    },
    setImgHeight(state, {index, height}) {
        state.imgs[index].height = height;
    },
    removeImg(state, index) {
        state.imgs.splice(index, 1);
    },
    setImgs(state, imgs) {
        state.imgs = imgs;
    },
    moveImg(state, {currIndex, newIndex}) {
        const arr = state.imgs;
        arr.splice(newIndex, 0, arr.splice(currIndex, 1)[0]);
    },
    showSnack(state) {
        window.clearTimeout(state.snack.timer);
        state.snack.show = true;
        state.snack.timer = window.setTimeout(() => {
            state.snack.show = false;
        }, 3000);
    },
    closeSnack(state) {
        window.clearTimeout(state.snack.timer);
        state.snack.show = false;
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
        template.index = state.templates.length;
        state.templates.push(template);
    },
    setSelectedTemplateIndex(state, index) {
        state.selectedTemplateIndex = index;
    },
    setNewId(state, num) {
        state.id = num;
    }
};

export default mutations;