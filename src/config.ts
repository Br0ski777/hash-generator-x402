import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "hash-generator",
  slug: "hash-generator",
  description: "Generate MD5, SHA1, SHA256, SHA512, and bcrypt hashes instantly. Returns hash string, algorithm, and length in one call.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/hash",
      price: "$0.001",
      description: "Generate a cryptographic hash from text",
      toolName: "crypto_generate_hash",
      toolDescription: `Use this when you need to generate a cryptographic hash of any text string. Returns the hash digest, algorithm used, and hash length in a single response.

1. hash -- the computed hash string (hex-encoded or bcrypt format)
2. algorithm -- which algorithm was used (md5, sha1, sha256, sha512, bcrypt)
3. length -- character length of the resulting hash

Example output: {"hash":"e3b0c44298fc1c149afbf4c8996fb924...","algorithm":"sha256","length":64}

Use this FOR data integrity checks, fingerprinting content, generating checksums before file transfers, or creating bcrypt hashes for password storage. Use this BEFORE storing user passwords (with bcrypt) or verifying file integrity.

Do NOT use for password strength checking -- use security_check_password instead. Do NOT use for data validation -- use data_validate_json instead. Do NOT use for encoding/decoding -- use utility_encode_base64 instead.`,
      inputSchema: {
        type: "object",
        properties: {
          text: { type: "string", description: "The text to hash" },
          algorithm: { type: "string", description: "Hash algorithm: md5, sha1, sha256, sha512, bcrypt (default: sha256)" },
        },
        required: ["text"],
      },
      outputSchema: {
        type: "object",
        properties: {
          hash: { type: "string", description: "Generated hash value (hex-encoded or bcrypt format)" },
          algorithm: { type: "string", description: "Algorithm used (md5, sha1, sha256, sha512, bcrypt)" },
          length: { type: "number", description: "Length of the hash string" },
          inputLength: { type: "number", description: "Length of the input text" },
        },
        required: ["hash", "algorithm", "length", "inputLength"],
      },
    },
  ],
};
