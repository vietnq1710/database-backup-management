import * as crypto from 'crypto';
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;

function getMasterKey(): Buffer {
  const key = process.env.DB_CONFIG_MASTER_KEY;
  if (!key) {
    throw new Error('DB_CONFIG_MASTER_KEY chưa được config');
  }
  const buf = Buffer.from(key, 'base64');
  if (buf.length !== 32) {
    throw new Error('Master key phải là 32 bytes (256-bit)');
  }
  return buf;
}

export function encryptPassword(plainPassword: string): string {
  const key = getMasterKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainPassword, 'utf8'),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    iv.toString('base64'),
    authTag.toString('base64'),
    encrypted.toString('base64'),
  ].join(':');
}

export function decryptPassword(encrypted: string): string {
  const key = getMasterKey();
  const [ivB64, authTagB64, dataB64] = encrypted.split(':');

  const iv = Buffer.from(ivB64, 'base64');
  const authTag = Buffer.from(authTagB64, 'base64');
  const data = Buffer.from(dataB64, 'base64');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  return decrypted.toString('utf8');
}
