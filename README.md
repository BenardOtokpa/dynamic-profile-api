# # 🐱 Dynamic Profile API (GET /me)

**Repository:** `dynamic-profile-api`  
**Stack:** `Node.js / Express`  
**Author:** Benard Otokpa  
**Email:** otokpaBenard@gmail.com

---

## Project Overview

This project implements a single RESTful endpoint:

The endpoint returns your profile information along with a **dynamic cat fact** fetched from the Cat Facts API (`https://catfact.ninja/fact`). The response **must** follow the exact structured JSON below.

---

## Required Response Format (exact)

```json
{
  "status": "success",
  "user": {
    "email": "benardotokpa@example.com",
    "name": "Benard Otokpa",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-16T12:34:56.789Z",
  "fact": "Cats sleep for 70% of their lives."
}

## Repository Contents
.
├─ server.js            # Express app (GET /me)
├─ package.json         # scripts & dependencies
├─ .env         # environment variable examples
├─ tests/
│   └─ me.test.js       # Jest + Supertest tests (mocks axios)
└─ README.md            # this file

## Installation & Local Run
Prerequisites

Node.js (v16+ recommended)

npm (or yarn)

Git

1. Clone repository
``` git clone https://github.com/<YOUR_USERNAME>/dynamic-profile-api.git
   cd dynamic-profile-api

- npm install
- npm run dev
By default the server runs at http://localhost:3000. Open: http://localhost:3000/me

- For test
- npm test
