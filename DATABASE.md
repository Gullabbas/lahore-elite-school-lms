# Database Documentation: Lahore Elite School LMS

## Overview

The Lahore Elite School LMS is built on a normalized relational architecture using **Prisma ORM**. It supports:
1. **Local Development:** SQLite (`prisma/schema.prisma` with `file:./dev.db`), requiring zero external database installations or cloud accounts.
2. **Production Deployment:** PostgreSQL (`prisma/schema.postgresql.prisma`), directly compatible with Supabase, Neon, Railway, AWS RDS, or Vercel Postgres.

---

## Core Relational Models

- **User:** Authentication credentials, roles (`ADMIN`, `TEACHER`, `STUDENT`), account status.
- **Campus:** Al-Nisa Campus, Sabzazar Campus.
- **AcademicSession:** Academic years (e.g., 2025-2026), active flags.
- **Class & Section:** Academic tiers (Playgroup to Class 10) and class sections.
- **Subject:** Subjects per class (English, Mathematics, Science, Urdu, Islamiat, etc.).
- **Student:** Admission records, monthly fees, concession percentages, B-Form numbers, guardian details.
- **Staff:** Teacher profiles, employee IDs, designations, basic salaries, assigned classes and subjects.
- **Attendance:** Daily attendance tracking for students and staff with statuses (`PRESENT`, `ABSENT`, `LATE`, `LEAVE`).
- **Timetable:** Class, subject, teacher, room, and weekday schedule slots.
- **FeeStructure & FeeVoucher:** Monthly voucher generation, individual line items, discounts, previous balances, paid receipts.
- **FamilyVoucher:** Multi-sibling bundled vouchers.
- **Payroll:** Monthly staff salary computation (`Basic + Allowances - Deductions = Net Payable`).
- **IncomeExpense:** Campus operational financials with income and expense tracking.
- **Examination & ExamSubject & ExamResult:** Mid-term, final-term exam schedules, marks entry, grades.
- **QuestionPaper:** Branded question paper builder (MCQs, short/long answers, true/false) with total marks calculation.
- **Certificate:** Academic achievement, character, participation, and completion certificates.
- **Announcement & Notification:** In-app messaging and targeted broadcast notices.
- **AuditLog:** Administrative traceability for financial, academic, and access mutations.

---

## Commands

```bash
# Push schema updates to local SQLite database:
npx prisma db push

# Generate Prisma Client:
npx prisma generate

# Seed sample institutional data:
npm run prisma:seed

# Inspect database visually with Prisma Studio:
npx prisma studio
```
