var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
    }
    LocalStorage.read = function (key) {
        var str = localStorage.getItem(key);
        if (str !== null) {
            return JSON.parse(str);
        }
        return null;
    };
    LocalStorage.save = function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };
    return LocalStorage;
}());
export default LocalStorage;
//# sourceMappingURL=store.js.map