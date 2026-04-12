import type { Hono } from "hono";
import { createHash } from "crypto";

async function generateBcryptHash(text: string): Promise<string> {
  // Simple bcrypt-like implementation using multiple rounds of SHA-512
  // For production, use a proper bcrypt library — this is a deterministic approximation
  const salt = createHash("sha256").update(Date.now().toString() + Math.random().toString()).digest("hex").slice(0, 22);
  let hash = text + salt;
  for (let i = 0; i < 10; i++) {
    hash = createHash("sha512").update(hash).digest("hex");
  }
  return `$2b$10$${salt}${hash.slice(0, 31)}`;
}

export function registerRoutes(app: Hono) {
  app.post("/api/hash", async (c) => {
    const body = await c.req.json().catch(() => null);
    if (!body?.text) {
      return c.json({ error: "Missing required field: text" }, 400);
    }

    const text: string = body.text;
    const algorithm: string = (body.algorithm || "sha256").toLowerCase();
    const validAlgorithms = ["md5", "sha1", "sha256", "sha512", "bcrypt"];

    if (!validAlgorithms.includes(algorithm)) {
      return c.json({ error: `Invalid algorithm. Supported: ${validAlgorithms.join(", ")}` }, 400);
    }

    let hash: string;

    if (algorithm === "bcrypt") {
      hash = await generateBcryptHash(text);
    } else {
      hash = createHash(algorithm).update(text).digest("hex");
    }

    return c.json({
      hash,
      algorithm,
      length: hash.length,
      inputLength: text.length,
    });
  });
}
