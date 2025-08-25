# URL Shortener – Requirements

## 1. Functional Requirements

### Core Features

- **Shorten URL**
  - Accept a long URL and return a unique shortened URL.
- **Redirect to original URL**
  - Accessing the shortened URL should redirect to the original long URL.
- **Per-user links (authentication)**
  - Users can register, log in, and manage their own shortened URLs.
- **Basic analytics per link**
  - Track number of clicks.
  - Store IP address and user agent for each visit.

---

## 2. API Requirements

### Public Endpoints

- `POST /api/shorten` → Create a shortened link.
- `GET /:shortId` → Redirect to the original URL.

### User Endpoints (Protected)

- `GET /api/links` → List all shortened URLs for the authenticated user.
- `DELETE /api/links/:id` → Delete a shortened link.
- `GET /api/links/:id/stats` → Retrieve click analytics for a link.

---

## 3. Non-Functional Requirements

- **Tech Stack:**

  - Backend: Node.js (Express) + TypeScript
  - Database: PostgreSQL with Prisma ORM
  - Caching: Redis for fast URL lookups

- **Security:**

  - Validate all input URLs.
  - Use JWT for API authentication.

- **Performance:**

  - Cache URL redirects using Redis to reduce database hits.

- **Error Handling:**

  - Return consistent JSON responses with proper HTTP status codes.

- **Scalability:**
  - Design for future features like custom short IDs, rate limiting, or QR code generation.

---

## 4. Optional Features (Nice to Have)

- **Custom short codes** → Users can define their own alias.
- **Expiration dates** → Links can auto-expire after a set period.
- **Analytics dashboard** → Visual charts for click data.
- **Rate limiting** → Prevent abuse using Redis-based throttling.

---

## 5. Deliverables

- **Backend API** with documentation.
- **Frontend React app** for user management and link analytics.
