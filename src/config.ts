import type { ApiConfig } from "./shared";

export const API_CONFIG: ApiConfig = {
  name: "hash-generator",
  slug: "hash-generator",
  description: "Cryptographic hash generator supporting MD5, SHA1, SHA256, SHA512, and bcrypt.",
  version: "1.0.0",
  routes: [
    {
      method: "POST",
      path: "/api/hash",
      price: "$0.001",
      description: "Generate a cryptographic hash from text",
      toolName: "crypto_generate_hash",
      toolDescription: "Use this when you need to generate a cryptographic hash of text. Supports md5, sha1, sha256, sha512, and bcrypt algorithms. Returns the hash string, algorithm used, and hash length. Do NOT use for password strength checking — use security_check_password. Do NOT use for data validation — use data_validate_json.",
      inputSchema: {
        type: "object",
        properties: {
          text: { type: "string", description: "The text to hash" },
          algorithm: { type: "string", description: "Hash algorithm: md5, sha1, sha256, sha512, bcrypt (default: sha256)" },
        },
        required: ["text"],
      },
    },
  ],
};
