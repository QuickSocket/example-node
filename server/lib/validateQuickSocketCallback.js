const crypto = require("crypto");

const validateQuickSocketCallback = (
  requestBodyString,
  signatureString,
  publicKeyString
) => {
  const publicKeyParameters = {
    format: "jwk",
    key: {
      kty: "OKP",
      crv: "Ed25519",
      x: publicKeyString,
    },
  };

  const publicKey = crypto.createPublicKey(publicKeyParameters);
  const requestBody = Buffer.from(requestBodyString);
  const signature = Buffer.from(signatureString, "base64url");
  return crypto.verify(null, requestBody, publicKey, signature);
};

module.exports = validateQuickSocketCallback;
