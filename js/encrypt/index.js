/*
    For encrypting client-side data. A good fit with the storage module.
*/

//recommended: https://www.npmjs.com/package/aes256
import aes256 from 'aes256';

const encryptKey = '<YOUR_ENCRYPT_KEY>'; // retrieve from env variables is advisable

export const encrypt = v => aes256.encrypt(encryptKey, JSON.stringify(v));

export const decrypt = v => JSON.parse(aes256.decrypt(encryptKey, v));

export default { encrypt, decrypt }