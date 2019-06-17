const methods = {
    copyObject(src, excludedArr = []) {
        let target = {};
        for (let prop in src) {
            if (src.hasOwnProperty(prop) && excludedArr.indexOf(prop) === -1) {
                target[prop] = src[prop];
            }
        }
        return target;
    },
    getNewName(name, additionalName) {
        let nameSplitted = name.split('.');
        nameSplitted[nameSplitted.length - 2] += additionalName;

        return nameSplitted.join('.');
    }
};

export default methods;