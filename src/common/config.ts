/**
 * Checks the environment variables for the required values and returns an object containing the password salt and JWT secret.
 * @returns An object containing the password salt and JWT secret if the required environment variables are set, otherwise null.
 */
function checkEnv() {
  const passwordSalt = process.env.PASSWORD_SALT;
  const jwtSecret = process.env.JWT_SECRET;
  if (!passwordSalt || !jwtSecret) {
    return null;
  }

  return {
    passwordSalt,
    jwtSecret,
  };
}

export const config = checkEnv();

/** The configuration for the JSON Web Token. */
export const jwtConfig = {
  header: {
    typ: "JWT",
    alg: "HS256",
  },
  iss: "Bling Services GmbH",
  aud: "https://bling.de",
  exp: "2h",
};

/** 5 Min Expiration time on two factor code */
export const twoFactorExpiration = 5 * 60 * 1000;
