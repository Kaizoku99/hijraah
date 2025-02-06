import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(
  process.env.ENCRYPTION_SECRET || 'default-secret-key-change-in-production'
);

export async function encrypt(payload: any): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey);
}

export async function decrypt<T>(token: string): Promise<T> {
  const { payload } = await jwtVerify(token, secretKey);
  return payload as T;
}

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.subtle
      .digest('SHA-256', new TextEncoder().encode(password))
      .then((buf) => {
        resolve(Array.prototype.map
          .call(new Uint8Array(buf), x => ('00' + x.toString(16)).slice(-2))
          .join(''));
      })
      .catch(reject);
  });
}