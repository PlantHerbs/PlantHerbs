"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
// 👇️ format as "YYYY-MM-DD hh:mm:ss"
// You can tweak formatting easily
function formatDate(date) {
    return ([
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':'));
}
exports.formatDate = formatDate;
