export function getRandomString(size = 16) {
    const CHARS = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    const result = [];
    for (let index = 0; index < size; index++) {
        result.push(CHARS[Math.floor(Math.random() * CHARS.length)]);
    }
    return result.join('');
}