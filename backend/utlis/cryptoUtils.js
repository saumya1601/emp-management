import crypto from 'crypto-js';

export const ENCRYPTION_SECRET = 'secretkey';


export const encryptObject = (object) => {
    if (!object) return '';
    const jsonString = JSON.stringify(object);
    return crypto.AES.encrypt(jsonString, ENCRYPTION_SECRET).toString();
};


export const decryptObject = (encryptedData) => {
    try {
        const bytes = crypto.AES.decrypt(encryptedData, ENCRYPTION_SECRET);
        const decryptedString = bytes.toString(crypto.enc.Utf8);
        return JSON.parse(decryptedString);
    } catch (error) {
        console.error('Error decrypting object:', error);
        return null;
    }
};