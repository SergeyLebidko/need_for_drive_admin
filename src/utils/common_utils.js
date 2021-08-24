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

export function getRandomString(size = 16) {
    const CHARS = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    const result = [];
    for (let index = 0; index < size; index++) {
        result.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }
    return result.join('');
}

export function getFormattedDate(timestamp) {
    const [year, mon, day, hour, min] = extractDateParts(new Date(timestamp));
    return `${format(day)}.${format(mon)}.${year} ${format(hour)}:${format(min)}`;
}

export function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function getFormattedPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
}