import {LETTER_CHARS, DIGIT_CHARS} from '../constants/settings';

function format(value) {
    return ('0' + value).slice(-2);
}

export function extractDateParts(date) {
    return [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
}

export function getRandomString(size = 16, allowDigits = false) {
    const CHAR_SET = LETTER_CHARS + (allowDigits ? DIGIT_CHARS : '');
    const result = [];
    for (let index = 0; index < size; index++) {
        result.push(CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)]);
    }
    return result.join('');
}

export function getFormattedDate(timestamp) {
    const [year, mon, day, hour, min] = extractDateParts(new Date(timestamp));
    return `${format(day)}.${format(mon + 1)}.${year} ${format(hour)}:${format(min)}`;
}

export function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function getFormattedPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
}