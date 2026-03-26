import crypto from "crypto";
import { cookies } from "next/headers";

export interface User {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  email: string | null;
}

interface SessionPayload {
  user: User;
  accessToken: string;
  exp: number;
}

const SESSION_COOKIE = "docupilot_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecret(): Buffer {
  const secret = process.env.SESSION_SECRET || "docupilot-dev-secret-change-me";
  return crypto.createHash("sha256").update(secret).digest();
}

function encrypt(data: string): string {
  const key = getSecret();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

function decrypt(token: string): string {
  const key = getSecret();
  const buf = Buffer.from(token, "base64url");
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const encrypted = buf.subarray(28);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8");
}

export function createSessionToken(user: User, accessToken: string): string {
  const payload: SessionPayload = {
    user,
    accessToken,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };
  return encrypt(JSON.stringify(payload));
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const payload = JSON.parse(decrypt(token)) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE);
  if (!cookie?.value) return null;
  return verifySessionToken(cookie.value);
}

export async function getUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user ?? null;
}

export { SESSION_COOKIE, SESSION_MAX_AGE };
