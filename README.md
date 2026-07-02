# Hash Generator API

[![MCP Server](https://img.shields.io/badge/MCP-server-blue)](https://hash-generator.api.klymax402.com/mcp)
[![x402](https://img.shields.io/badge/payments-x402-6E56CF)](https://x402.org)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Cryptographic hash generator supporting MD5, SHA1, SHA256, SHA512, and bcrypt. Pay-per-call via [x402](https://x402.org) (USDC on Base L2) -- no API key, no signup, no rate-limit wall.

Part of the [klymax402](https://klymax402.com) marketplace -- 100 x402 micropayment APIs for AI agents, one wallet, USDC on Base.

## Quickstart -- MCP

Add to your MCP client config (Claude Desktop, Cursor, ElizaOS, etc.):

```json
{
  "mcpServers": {
    "hash-generator": {
      "url": "https://hash-generator.api.klymax402.com/mcp"
    }
  }
}
```

## Quickstart -- HTTP (x402)

```bash
curl -X POST "https://hash-generator.api.klymax402.com/api/hash" \
  -H "Content-Type: application/json" \
  -d '{"text":"..."}'
# -> 402 Payment Required, with an x402 payment challenge in the response body
```

Any x402-aware client ([`@x402/fetch`](https://www.npmjs.com/package/@x402/fetch), [`x402-agent-tools`](https://www.npmjs.com/package/x402-agent-tools), ATXP) handles the 402 -> sign -> retry cycle automatically.

## Tools

| Tool | Method | Path | Price | Description |
|---|---|---|---|---|
| `crypto_generate_hash` | POST | `/api/hash` | $0.001 | Generate a cryptographic hash from text |

### `crypto_generate_hash`

Use this when you need to generate a cryptographic hash of text. Supports md5, sha1, sha256, sha512, and bcrypt algorithms. Returns the hash string, algorithm used, and hash length. Do NOT use for password strength checking — use security_check_password. Do NOT use for data validation — use data_validate_json.

**Parameters**

| Name | Type | Required | Description |
|---|---|---|---|
| `text` | string | yes | The text to hash |
| `algorithm` | string | no | Hash algorithm: md5, sha1, sha256, sha512, bcrypt (default: sha256) |

## Example agent prompts

- "Generate a cryptographic hash of text"

## Payment

- Protocol: [x402](https://x402.org) -- HTTP-native pay-per-call, no signup, no API key
- Network: Base L2 (`eip155:8453`)
- Asset: USDC
- Facilitator: Coinbase CDP (primary), PayAI (fallback)

## Part of klymax402

100 x402 micropayment APIs for AI agents -- one wallet, USDC on Base, zero signup.

- Catalog: https://klymax402.com/llms.txt
- Full API reference: https://klymax402.com/llms-full.txt
- Live stats: https://klymax402.com/stats

## License

MIT
