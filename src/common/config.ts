/**
 * Checks if the environment variables are defined.
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

export const jwtConfig = {
  header: {
    typ: "JWT",
    alg: "HS256",
  },
  iss: "Bling Services GmbH",
  aud: "https://bling.de",
  exp: "2h",
};

export const twoFactorExpiration = 5 * 60 * 1000;
