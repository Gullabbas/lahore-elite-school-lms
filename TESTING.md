# Testing & Acceptance Checklist: Lahore Elite School LMS

## Automated & End-to-End Test Suite

### Running Acceptance Verification Scripts
```bash
# Seed fresh clean testing data
npm run prisma:seed

# Run Next.js Type Check and Build Test
npm run build
```

---

## Acceptance Test Matrix

| ID | Category | Workflow Description | Expected Result | Status |
|---|---|---|---|---|
| **AUTH-01** | Authentication | Admin logs in via `/login` with credentials `admin` / `admin123` | Redirects to `/admin` dashboard with full school metrics | Verified |
| **AUTH-02** | Authentication | Teacher logs in with `teacher1` / `teacher123` | Redirects to `/staff` portal; cannot access `/admin` | Verified |
| **AUTH-03** | Authentication | Student logs in with `les-001` / `student123` | Redirects to `/student` portal; sees only personal records | Verified |
| **STU-01** | Students | Search, filter by class/campus, pagination | Dynamic real-time filtered results | Verified |
| **STU-02** | Students | Download CSV template, import students, validate duplicates | Rejects invalid headers, imports valid records | Verified |
| **FEE-01** | Finance | Generate monthly fee vouchers for a class | Automatically computes tuition + charges - discount | Verified |
| **FEE-02** | Finance | Record partial cash/bank payment | Updates voucher balance and logs payment receipt | Verified |
| **FEE-03** | Finance | Sibling multi-voucher grouping (Family Voucher) | Prints combined family fee voucher | Verified |
| **FEE-04** | Finance | Fee Defaulter listing & WhatsApp reminder generation | Generates prefilled `wa.me` message with exact PKR balance | Verified |
| **PAY-01** | Payroll | Generate monthly staff payroll | Net Payable = Basic + Allowances - Deductions | Verified |
| **DOC-01** | Documents | Student ID Card generation with live preview & print | CR80 physical card dimensions (85.6mm x 54mm) | Verified |
| **DOC-02** | Documents | Printable dual-copy fee voucher (School + Student copy) | A4 print layout with subtle school crest watermark | Verified |
| **DOC-03** | Documents | Salary slip preview & print | A4 slip with breakdown and authorized signature areas | Verified |
| **ACAD-01**| Academics | Mark student & staff attendance | Prevents duplicate daily attendance, flags <65% | Verified |
| **ACAD-02**| Academics | Examination Question Paper generator | Computes total marks, formats A4 print sheet | Verified |
