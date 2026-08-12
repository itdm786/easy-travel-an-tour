import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const ITERATIONS = 120_000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
  return `${ITERATIONS}:${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [iterationsValue, salt, originalHash] = storedHash.split(":");
  const iterations = Number(iterationsValue);

  if (!iterations || !salt || !originalHash) return false;

  const hash = pbkdf2Sync(password, salt, iterations, KEY_LENGTH, DIGEST).toString("hex");
  const first = Buffer.from(hash, "hex");
  const second = Buffer.from(originalHash, "hex");

  if (first.length !== second.length) return false;
  return timingSafeEqual(first, second);
}
