import { createHash } from "crypto";

/**
 * Hashes a string with sha512
 *
 * @param string
 * @returns the hashed string
 */
export function hash(string: string, salt?: string): string {
  return createHash("sha512")
    .update(string + salt)
    .digest("hex");
}

/**
 * Extracts the JWT from the Authorization header
 *
 * @param string
 * @returns payload of the JWT
 */
export function extractBearerToken(bearerHeader: string | undefined): string | false {
  if (bearerHeader === undefined) return false;
  const splitHeader = bearerHeader.split(" ");
  if (splitHeader[0] !== "Bearer" || !splitHeader[1]) return false;
  return splitHeader[1];
}
