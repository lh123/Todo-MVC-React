export default function uuid() {
    var uuid = "";
    for (var i = 0; i < 32; i++) {
        var random = Math.floor(Math.random() * 16);
        if (i % 8 === 0 && i !== 0) {
            uuid += "-";
        }
        uuid += random < 16 ? ("0" + random.toString(16)) : random.toString(16);
    }
    return uuid;
}
//# sourceMappingURL=uuid.js.map