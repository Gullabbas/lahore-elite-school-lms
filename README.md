# Lahore Elite School — Website & Learning Management System (LMS)

A complete, modern, full-stack school web portal and integrated Learning Management System (LMS) built for **Lahore Elite School, Lahore, Pakistan**.

Developed with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Prisma ORM.

---

## 🏛️ School Campuses & Contact

- **Al-Nisa Campus:** 1-S 9/14 Zubaida Park, Multan Road, Lahore
- **Sabzazar Campus:** 280 B-Block, Sabzazar, Multan Road, Lahore
- **Mobile Hotline:** 0300-4279059
- **Timezone:** `Asia/Karachi`
- **Currency:** Pakistani Rupee (PKR ₨)
- **Technical Architect & Developer:** Muhammad Raza (+923341816004)

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js 18.17+ or 20+
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Database & Seed Demo Data
The project uses SQLite for zero-configuration instant local development (and provides a drop-in PostgreSQL schema `prisma/schema.postgresql.prisma` for production deployment).

```bash
# Push schema to local dev SQLite database
npx prisma db push

# Seed sample data (campuses, classes, teachers, students, vouchers, timetables, exams)
node scripts/seed.mjs
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 🔐 Default Demo Accounts

The database comes pre-seeded with test accounts for each role. You can log in at `/login` or click the quick demo buttons on the login screen:

| Portal | Role | Username | Password | Direct URL |
|---|---|---|---|---|
| **Admin Panel** | Administrator | `admin` | `admin123` | [http://localhost:3000/admin](http://localhost:3000/admin) |
| **Faculty Portal** | Teacher | `teacher1` | `teacher123` | [http://localhost:3000/staff](http://localhost:3000/staff) |
| **Student Desk** | Student / Parent | `les-001` | `student123` | [http://localhost:3000/student](http://localhost:3000/student) |

---

## 📋 Comprehensive Feature Overview

### 1. Branded Public Website
- **Modern Responsive Design:** School navy (`#091A4A`) and warm gold (`#FFD02F`) theme matching the official emblem.
- **Homepage:** Interactive hero image slider, educational philosophy, academic programs, statistics counters, chairman vision, campus locations with interactive Google maps embed, and call to action.
- **About Us (`/about`):** School background, leadership, core pillars, and facilities.
- **Admissions Suite (`/admission/*`):** Transparent fee structure table, admission process roadmap, evaluation test guide, uniform specifications, and general rules.
- **Academic Programs (`/programs/*`):** Pre-School (Playgroup, Nursery, Prep), Primary & Middle, and High School (Matriculation science & arts).
- **Gallery (`/gallery`):** Interactive filterable gallery with full-screen lightbox viewer.
- **Contact & Careers (`/contact/*`):** Campus contact info, online inquiry form, FAQs accordion, job application portal, franchise inquiry, and social channels.

### 2. Administrative Control Center (`/admin`)
- **Dashboard:** Real-time KPI summary (total students, active faculty, monthly fee collection, attendance rate) with interactive Recharts financial and attendance charts.
- **Student Information System (`/admin/students`):** Complete student database, filters by class/section/campus, full CRUD, CSV bulk import with column validation, and CSV export.
- **Student ID Card Studio (`/admin/id-cards`):** Automatic CR80 card generation (85.6mm × 53.98mm standard credit-card size) with barcode, photo, QR code, and 3 design themes (Classic Navy, Modern Gold, Minimalist).
- **Academic Dossiers (`/admin/documents`):** Comprehensive student records, fee status, and attendance summaries.
- **Fee Management (`/admin/fees`):** Monthly fee voucher generator, payment recording with receipt numbers, discount management, and balance tracking.
- **Dual-Copy Printable Fee Voucher (`/admin/fees/voucher/[id]`):** Official dual-copy A4 fee voucher (School Copy and Student Copy) with bank instructions, fee breakdown, and watermark.
- **Family Sibling Vouchers (`/admin/fees/family`):** Consolidated single vouchers for siblings with automatic discounts.
- **Fee Defaulters & Reminders (`/admin/fees/defaulters`):** Real-time tracking of unpaid fees with 1-click WhatsApp reminder links (`wa.me`) and clipboard message copying.
- **Financial Ledger (`/admin/finance`):** Income & expense accounting, categorised transaction entries, and cash flow summary.
- **Staff Payroll (`/admin/payroll`):** Monthly salary calculation, basic pay, allowances, deductions, and net payable.
- **Printable Salary Slips (`/admin/payroll/slip/[id]`):** Official A4 salary slip with school emblem, watermark, and signature blocks.
- **Faculty Registry (`/admin/teachers`):** Staff database, designations, departments, basic pay, and direct WhatsApp contact.
- **Daily Attendance (`/admin/attendance`):** Multi-student and staff attendance marker with duplicate entry safeguards and <65% attendance deficit warnings.
- **Class Timetable Scheduler (`/admin/timetable`):** Weekly schedule builder with teacher and room conflict detection.
- **Exam Question Paper Generator (`/admin/paper-generator`):** Multi-section exam paper builder with MCQs, short questions, and long essay questions, rendered in printable exam layout with instructions and marking schemes.
- **Exam Date Sheets (`/admin/date-sheets`):** Examination schedule manager and publishing toggle.
- **Certificates Studio (`/admin/certificates`):** Official certificate generator (Academic Excellence, Sports, Character, Service) with print-ready ornate borders.
- **Homework Coordinator (`/admin/assignments`):** Monitor homework assignments posted by teachers.
- **Announcements Broadcast (`/admin/announcements`):** Official circulars creator with target audience selection (All, Students, Teachers).
- **Admission Leads Management (`/admin/admissions`):** Online inquiry tracker with status changes (Pending, Reviewed, Accepted, Rejected), admin follow-up notes, and 1-click WhatsApp responses.
- **Content CMS (`/admin/content`):** Content manager for Chairman message, vision statement, FAQs, and event gallery.
- **Institution Settings (`/admin/settings`):** Campus addresses, phone numbers, academic sessions, and core parameters.
- **Executive Reports & Exports (`/admin/reports`):** In-depth reports (Student strength by class and campus, Fee recovery audit, Payroll outlay, Attendance compliance) with instant CSV downloads.
- **User Accounts RBAC (`/admin/accounts`):** System users manager, role assignment (ADMIN, TEACHER, STUDENT), and password reset functionality.
- **Developer Support (`/admin/support`):** Technical support contact and system engineering credit.

### 3. Teacher / Staff Portal (`/staff`)
- **Faculty Dashboard (`/staff`):** Overview of today's classes, pending tasks, recent announcements.
- **Teaching Timetable (`/staff/timetable`):** Personal weekly timetable with room numbers and period slots.
- **Class Attendance Register (`/staff/attendance`):** Mark attendance for assigned classes with present/absent/late status.
- **Homework & Tasks (`/staff/assignments`):** Post daily homework assignments with instructions and due dates.
- **Exam Marks Entry (`/staff/results`):** Enter student marks for published examination papers with automatic grade calculation.
- **Salary Slips Archive (`/staff/salary`):** View monthly salary slips with printable slip links.
- **Leave Requests (`/staff/leave`):** Submit sick, casual, or emergency leave requests and track administrative approval.
- **Support Desk (`/staff/support`):** Access developer and school support.

### 4. Student & Parent Portal (`/student`)
- **Student Dashboard (`/student`):** Student profile summary, attendance gauge, fee status pill, today's period schedule, active homework, and school notices.
- **Class Timetable (`/student/timetable`):** Full weekly timetable with print button.
- **Attendance Record (`/student/attendance`):** Detailed log with present/absent counts and mandatory <65% board examination deficit alert.
- **Homework & Tasks (`/student/assignments`):** Active assignments list with subject tags and due date alerts.
- **Exam Date Sheets (`/student/examinations`):** Official published date sheets with exam timings, syllabus instructions, and rules.
- **Terminal Report Card (`/student/results`):** Comprehensive academic progress report with subject-wise marks, percentage, grades, teacher remarks, cumulative aggregate, and printable layout.
- **Fee Vouchers & History (`/student/fees`):** Issued fee vouchers with payment receipts and direct link to printable dual-copy fee voucher.
- **Certificates & Honors (`/student/certificates`):** View and print official certificates of recognition and achievement.

---

## 🖨️ Document Printing & Dimensions

The application includes customized print stylesheets (`@media print`) configured in `src/app/globals.css`:

1. **Student ID Cards (`.id-card-print`):** Standard CR80 dimensions (85.6mm × 53.98mm) rendered at 300 DPI scale.
2. **Fee Vouchers:** Standard A4 portrait split horizontally into two mirrored copies: **School Copy** and **Student / Bank Copy**, complete with bank deposit instructions, student details, watermark, and perforation lines.
3. **Salary Slips & Report Cards:** Standard A4 portrait with official watermark, tabular breakdown, and formal signature lines for Principal, Examination Controller, and Class Teacher.
4. **Timetables & Date Sheets:** Clean, ink-efficient print layouts with automatic header inclusion and sidebar suppression (`.no-print`).

---

## 🛡️ Security & Authentication

- Passwords hashed using **bcryptjs** with 10 salt rounds.
- Sessions authenticated using signed **JSON Web Tokens (JWT)** via `jose` stored in HTTP-only cookies (`les_session`).
- Role-Based Access Control (RBAC) enforced in server-side queries and API routes (`ADMIN`, `TEACHER`, `STUDENT`).
- Complete separation of server credentials from client components.
- Zero mockups or placeholder stubs: all forms, filters, and reports persist and query the relational database.

---

## 👨‍💻 Engineering Credits & Support

- **System Architect & Full-Stack Developer:** Muhammad Raza
- **Direct Cell / WhatsApp:** [+923341816004](https://wa.me/923341816004)
- **Institution:** Lahore Elite School, Lahore, Pakistan
