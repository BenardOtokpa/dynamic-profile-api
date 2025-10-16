# 🐱 Dynamic Profile API — GET /me

**Repository:** `dynamic-profile-api`  
**Stack:** `Node.js / Express`  
**Author:** **Benard Otokpa**  
**Email:** [otokpabenard@gmail.com]

---

## 📘 Project Overview

This project implements a simple **RESTful API** endpoint that dynamically returns your profile information **and** a random **cat fact** fetched from the [Cat Facts API](https://catfact.ninja/fact).

The `/me` endpoint responds with structured JSON containing:
- User details (email, name, stack)
- A random cat fact
- The current UTC timestamp (ISO 8601 format)

---

## 🧩 Response Format (Exact JSON Structure)

```json
{
  "status": "success",
  "user": {
    "email": "otokpabenard@gmail.com",
    "name": "Benard Otokpa",
    "stack": "Node.js/Express"
  }, 
  "timestamp": "2025-10-16T12:34:56.789Z",
  "fact": "Cats sleep for 70% of their lives."
}
```

---

## 🗂️ Repository Structure

```
├── server.js           # Express app (GET /me)
├── package.json        # Scripts & dependencies
├── .env                # Environment variable example
├── tests/
│   └── me.test.js      # Jest + Supertest tests (mocks axios)
└── README.md           # This file
```

---

## ⚙️ Installation & Local Setup

### Prerequisites
- **Node.js** (v16+ recommended)  
- **npm** (or yarn)  
- **Git**

### Clone the Repository
```bash
git clone https://github.com/<YOUR_USERNAME>/dynamic-profile-api.git
cd dynamic-profile-api
```

### Install Dependencies
```bash
npm install
```

### Run the Server
```bash
npm run dev
```
By default, the server runs at:  
👉 [http://localhost:3000]

Access your endpoint here:  
👉 [http://localhost:3000/me]

---

## 🧪 Running Tests

If tests are included (e.g., with Jest & Supertest):
```bash
npm test
```

---

## 🌐 API Endpoint Summary

| Method | Endpoint | Description |
|:--------|:----------|:-------------|
| **GET** | `/me` | Returns profile info + random cat fact |

---

## 🧱 Tech Stack

- **Node.js** — JavaScript runtime  
- **Express.js** — Web application framework  
- **Axios** — HTTP client for fetching cat facts  
- **Jest / Supertest**  — For testing

---

## 📝 Notes

- Each `/me` request fetches a **new** cat fact dynamically.  
- Timestamp reflects **current UTC time** on every request.  
- If the Cat Facts API fails, a graceful fallback message is returned.  
- Hosted via **Railway**.

---

⭐ **Author:** [Benard Otokpa]  
📅 **Date:** October 2025  
