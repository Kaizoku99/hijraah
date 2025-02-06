import { createHash, randomBytes, createCipheriv, createDecipheriv, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // GCM recommended IV length
const SALT_LENGTH = 32;
const TAG_LENGTH = 16;
const KEY_LENGTH = 32;
const ITERATIONS = 100000;
const MEMORY_COST = 64 * 1024; // 64MB

// Promisify scrypt
const scryptAsync = promisify<string, Buffer, number, number, number, number, number, Buffer>(scrypt);

class EncryptionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EncryptionError';
  }
}

async function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
  try {
    // N = ITERATIONS, r = 8, p = 1
    return await scryptAsync(password, salt, KEY_LENGTH, ITERATIONS, 8, 1);
  } catch (error) {
    throw new EncryptionError('Key derivation failed');
  }
}

export async function encrypt(text: string, password: string): Promise<string> {
  try {
    if (!text || !password) {
      throw new EncryptionError('Text and password are required');
    }

    // Generate a random salt
    const salt = randomBytes(SALT_LENGTH);
    
    // Generate a random IV
    const iv = randomBytes(IV_LENGTH);
    
    // Derive key using password and salt
    const key = await deriveKey(password, salt);
    
    // Create cipher
    const cipher = createCipheriv(ALGORITHM, key, iv);
    
    // Encrypt the text
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ]);
    
    // Get the auth tag
    const tag = cipher.getAuthTag();
    
    // Combine all the parameters
    const result = Buffer.concat([
      salt,
      iv,
      tag,
      encrypted,
    ]);

    // Clear sensitive data from memory
    key.fill(0);
    
    return result.toString('base64');
  } catch (error) {
    if (error instanceof EncryptionError) throw error;
    throw new EncryptionError('Encryption failed');
  }
}

export async function decrypt(encryptedText: string, password: string): Promise<string> {
  try {
    if (!encryptedText || !password) {
      throw new EncryptionError('Encrypted text and password are required');
    }

    // Convert the combined buffer back from base64
    const buffer = Buffer.from(encryptedText, 'base64');
    
    if (buffer.length < SALT_LENGTH + IV_LENGTH + TAG_LENGTH) {
      throw new EncryptionError('Invalid encrypted data');
    }

    // Extract the parameters
    const salt = buffer.slice(0, SALT_LENGTH);
    const iv = buffer.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const tag = buffer.slice(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    const encrypted = buffer.slice(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
    
    // Derive the key
    const key = await deriveKey(password, salt);
    
    try {
      // Create decipher
      const decipher = createDecipheriv(ALGORITHM, key, iv);
      decipher.setAuthTag(tag);
      
      // Decrypt the text
      const result = decipher.update(encrypted, undefined, 'utf8') + decipher.final('utf8');

      // Clear sensitive data from memory
      key.fill(0);
      
      return result;
    } catch (error) {
      throw new EncryptionError('Decryption failed - invalid password or corrupted data');
    }
  } catch (error) {
    if (error instanceof EncryptionError) throw error;
    throw new EncryptionError('Decryption failed');
  }
}

export async function hashPassword(password: string): Promise<string> {
  try {
    if (!password) {
      throw new EncryptionError('Password is required');
    }

    const salt = randomBytes(SALT_LENGTH);
    const key = await deriveKey(password, salt);
    return `${salt.toString('base64')}:${key.toString('base64')}`;
  } catch (error) {
    if (error instanceof EncryptionError) throw error;
    throw new EncryptionError('Password hashing failed');
  }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    if (!password || !hashedPassword) {
      throw new EncryptionError('Password and hash are required');
    }

    const [saltBase64, keyBase64] = hashedPassword.split(':');
    if (!saltBase64 || !keyBase64) {
      throw new EncryptionError('Invalid hash format');
    }

    const salt = Buffer.from(saltBase64, 'base64');
    const storedKey = Buffer.from(keyBase64, 'base64');
    const newKey = await deriveKey(password, salt);

    return timingSafeEqual(newKey, storedKey);
  } catch (error) {
    if (error instanceof EncryptionError) throw error;
    throw new EncryptionError('Password verification failed');
  }
}

export function generateSecureToken(length = 32): string {
  try {
    if (length < 16) {
      throw new EncryptionError('Token length must be at least 16 bytes');
    }
    return randomBytes(length).toString('base64url');
  } catch (error) {
    if (error instanceof EncryptionError) throw error;
    throw new EncryptionError('Token generation failed');
  }
}

// Utility function to securely clear sensitive data
export function secureClear(data: Buffer | string): void {
  if (Buffer.isBuffer(data)) {
    data.fill(0);
  } else if (typeof data === 'string') {
    // Note: This is a best-effort approach as strings are immutable
    data = '\0'.repeat(data.length);
  }
} 