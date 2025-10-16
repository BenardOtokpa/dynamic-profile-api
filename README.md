# Dynamic Profile API (GET /me)

Simple Node.js + Express service that responds to `GET /me` with profile information plus a dynamic cat fact fetched from `https://catfact.ninja/fact`.

## Response format (exact)
```json
{
  "status": "success",
  "user": {
    "email": "<your email>",
    "name": "<your full name>",
    "stack": "Node.js/Express"
  },
  "timestamp": "<current UTC time in ISO 8601 format>",
  "fact": "<random cat fact from Cat Facts API>"
}
