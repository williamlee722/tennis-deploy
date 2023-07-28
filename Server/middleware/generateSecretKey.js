const crypto = require('crypto');

function generateSecretKey() {
    // 256 bits (32 bytes) key length
    const keyLength = 32;
    const randomBuffer = crypto.randomBytes(keyLength);
    const secretKey = randomBuffer.toString('hex');
    return secretKey;
}

console.log('Starting...');
const secretKey = generateSecretKey();
console.log('Generated Secret Key:', secretKey);