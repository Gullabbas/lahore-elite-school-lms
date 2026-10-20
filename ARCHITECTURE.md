# Application Architecture: Lahore Elite School & LMS

## System Overview

Lahore Elite School LMS is a unified full-stack application built using Next.js 14 App Router, TypeScript, Tailwind CSS, and Prisma ORM. It combines:
1. A **Public Website** showcasing Lahore Elite School's educational philosophy, admissions, fee structure, academic programs, photo gallery, FAQs, and contact/job/franchise forms.
2. A **Comprehensive Admin Panel** for centralized institutional management: students, staff, academics, attendance, payroll, fee generation and collections, examination question paper generator, date sheets, ID cards, and school certificates.
3. A **Teacher / Staff Dashboard** providing educators with class schedules, student rosters, attendance marking, homework assignments, result submission, and personal salary records.
4. A **Student Portal** offering students their personal attendance summaries, class timetable, homework, published exam schedules, report cards, and fee vouchers.

```
+-----------------------------------------------------------------------------------+
|                            Public School Website                                  |
|   - Homepage (Hero Slider, Journey, Chairman Message, Milestones, Awards)         |
|   - Admission (Fee Structure, Process, Evaluation, Uniform, Rules)                |
|   - Programs (Pre-School, Primary & Middle, High School)                          |
|   - Gallery, FAQs, Contact, Jobs Application, Franchise Request                   |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
                         Branded Multi-Role Login Interface
                         [Admin]      [Teacher/Staff]      [Student]
                                         |
        +--------------------------------+-------------------------------+
        |                                |                               |
        v                                v                               v
+------------------+           +------------------+            +------------------+
|   Admin Portal   |           |  Staff Portal    |            |  Student Portal  |
| - Student CRUD   |           | - My Classes     |            | - My Profile     |
| - CSV Import/Exp |           | - Attendance     |            | - My Timetable   |
| - Fee Vouchers   |           | - Mark Results   |            | - My Attendance  |
| - Family Voucher |           | - Homework       |            | - My Homework    |
| - Defaulters     |           | - Salary Slips   |            | - Exam Results   |
| - Payroll & Slips|           | - Leave Requests |            | - Fee Vouchers   |
| - Exam Papers    |           +------------------+            | - Certificates   |
| - ID Card Print  |                                           +------------------+
| - Certificates   |
| - Settings & CMS |
+------------------+
        |                                |                               |
        +--------------------------------+-------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                             Shared Persistence Layer                              |
|   - Prisma ORM (Relational Models & Foreign Keys)                                 |
|   - SQLite (Local Dev Zero-Config) / PostgreSQL (Production)                      |
|   - Strict Server-Side Validation (Zod) & Auth Guard (JWT / Bcrypt)               |
+-----------------------------------------------------------------------------------+
```

## Directory Structure

```
├── prisma/
│   ├── schema.prisma             # SQLite schema for local dev
│   └── schema.postgresql.prisma  # PostgreSQL schema for production
├── public/
│   ├── images/
│   │   ├── brand/                # School logo, Chairman photo
│   │   ├── hero/                 # Campus & student slides
│   │   ├── gallery/              # Award ceremonies & school events
│   │   └── programs/             # Pre-school, primary, high school
├── src/
│   ├── app/                      # Next.js App Router routes & API endpoints
│   │   ├── (public)/             # Public pages (Home, About, Admission, Programs, etc.)
│   │   ├── admin/                # Admin Panel routes
│   │   ├── staff/                # Teacher / Staff Portal routes
│   │   ├── student/              # Student Portal routes
│   │   ├── api/                  # Server actions & protected API routes
│   │   └── login/                # Branded role-based login page
│   ├── components/
│   │   ├── ui/                   # Shared UI primitives (buttons, modals, cards, badges)
│   │   ├── layout/               # Header, Footer, AdminSidebar, StaffSidebar, StudentSidebar
│   │   ├── print/                # Printable templates (ID Cards, Fee Vouchers, Slips, etc.)
│   │   └── charts/               # Recharts wrappers for analytics
│   └── lib/
│       ├── prisma.ts             # Prisma client singleton
│       ├── auth.ts               # Session verification, role guards, token helpers
│       ├── utils.ts              # Formatting (PKR currency, Pakistani dates, phone sanitization)
│       └── validations.ts        # Zod validation schemas
```
