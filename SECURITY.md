# Security & Access Control: Lahore Elite School LMS

## Authentication Architecture

- **Session Tokens:** Stateless, signed JSON Web Tokens (`HS256`) created via `jose` and stored in strictly protected `HttpOnly`, `SameSite=Lax`, `Secure` (in production) cookies (`les_session`).
- **Password Protection:** Cryptographically salted password hashing using `bcryptjs` with salt work factor 10. No plaintext passwords exist in databases, logs, or exports.
- **Server-Side Role Guarding:** Route handlers, Next.js Server Actions, and API routes enforce strict server-side authorization:
  - `ADMIN`: Unrestricted operational authority over school records, financial reconciliations, user accounts, and system settings.
  - `TEACHER`: Scoped exclusively to assigned classes, sections, and subjects (attendance marking, result entry, homework management, personal salary slip access).
  - `STUDENT`: Scoped strictly to their own admission record (personal attendance, timetable, fee vouchers, published examination marks, certificates).
- **Session Expiration:** Standard 7-day sliding expiration.
- **CSRF & Injection Mitigation:** Prisma ORM parameterization protects against SQL injection. Form mutations use server actions or validated API routes with Zod schemas.
- **Audit Logging:** Administrative updates to fees, student enrollments, attendance, and exam results record an immutable trace in the `AuditLog` table with action type, timestamp, and actor ID.

---

## Default Development Accounts

| Role | Username | Password | Notes |
|---|---|---|---|
| **Admin** | `admin` | `admin123` | Master school administrator account |
| **Teacher** | `teacher1` | `teacher123` | Senior Science Teacher (Farooq Ahmed) |
| **Teacher** | `teacher2` | `teacher123` | English Department Head (Sadia Khan) |
| **Student** | `les-001` | `student123` | Class 9 Student (Muhammad Ali Raza) |
| **Student** | `les-002` | `student123` | Class 5 Student (Ayesha Tariq) |
| **Student** | `les-003` | `student123` | Class 10 Student (Hamza Bilal) |
