# URL Shortener – Features

## Core Features

### 1. URL Shortening

- Convert any valid long URL into a unique short URL.
- Automatically generate unique short IDs using NanoID.
- Validate input URLs to ensure they are properly formatted.

### 2. Redirect to Original URL

- Visiting a short URL redirects to the original long URL.
- Use Redis caching to speed up lookups and reduce database load.

### 3. User Authentication

- Users can register, log in, and manage their own links.
- Authentication handled via JWT tokens.
- Passwords stored securely using hashing.

### 4. Link Management

- View a list of all links created by the logged-in user.
- Delete links that are no longer needed.
- Each link is associated with the creator's account.

### 5. Basic Analytics

- Track the number of times each short URL is accessed.
- Log visitor metadata:
  - **IP address**
  - **User agent** (browser/device info)
- Provide a summary of click statistics per link.

---

## Optional / Nice-to-Have Features

### 6. Custom Short Codes

- Allow users to specify their own alias for a link instead of an auto-generated ID.

### 7. Expiration Dates

- Links can have a set expiry period after which they stop working.

### 8. Analytics Dashboard

- Frontend dashboard to visualize:
  - Click count over time
  - Visitor devices/browsers
  - Geographic distribution (IP-based)

### 9. Rate Limiting

- Prevent abuse of the API by limiting the number of link generations per user or per IP.
- Implement using Redis-based throttling.

### 10. QR Code Generation

- Automatically generate QR codes for each short link for easy sharing.

---

## Technical Highlights

- **Backend:** Express.js (TypeScript) + Prisma ORM
- **Database:** PostgreSQL for persistent storage
- **Cache:** Redis for quick URL resolution and rate limiting
- **Frontend:** React for link management dashboard
- **Auth:** JWT-based API authentication
- **Deployment:** Docker-ready configuration (optional)

---

## Deliverables

- Fully functional API with documentation (OpenAPI / Swagger optional).
- React frontend for managing links and viewing analytics.
- Unit tests and integration tests for critical features.
- Docker setup for running locally or deploying to cloud.

A simple url shortner that creates a unique short url for a long url
