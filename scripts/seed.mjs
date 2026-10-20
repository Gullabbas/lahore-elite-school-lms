import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Lahore Elite School Database...");

  // 1. Clear existing records safely
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.feeVoucher.deleteMany();
  await prisma.familyVoucher.deleteMany();
  await prisma.feeStructure.deleteMany();
  await prisma.payroll.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.examResult.deleteMany();
  await prisma.examSubject.deleteMany();
  await prisma.examination.deleteMany();
  await prisma.questionPaper.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.homeworkAssignment.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.timetable.deleteMany();
  await prisma.student.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.section.deleteMany();
  await prisma.class.deleteMany();
  await prisma.academicSession.deleteMany();
  await prisma.incomeExpense.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.jobApplication.deleteMany();
  await prisma.jobListing.deleteMany();
  await prisma.franchiseInquiry.deleteMany();
  await prisma.contactInquiry.deleteMany();
  await prisma.admissionInquiry.deleteMany();
  await prisma.schoolSetting.deleteMany();
  await prisma.user.deleteMany();
  await prisma.campus.deleteMany();

  // 2. Campuses
  const alNisaCampus = await prisma.campus.create({
    data: {
      name: "Al-Nisa Campus",
      code: "AL_NISA",
      address: "1-S 9/14 Zubaida Park, Multan Road, Lahore",
      phone: "0300-4279059",
      email: "alnisa@lahoreeliteschool.edu.pk",
      isActive: true,
    },
  });

  const sabzazarCampus = await prisma.campus.create({
    data: {
      name: "Sabzazar Campus",
      code: "SABZAZAR",
      address: "280 B-Block, Sabzazar, Multan Road, Lahore",
      phone: "0300-4279059",
      email: "sabzazar@lahoreeliteschool.edu.pk",
      isActive: true,
    },
  });

  // 3. Academic Session
  const session2025 = await prisma.academicSession.create({
    data: {
      name: "2025-2026",
      startDate: new Date("2025-04-01"),
      endDate: new Date("2026-03-31"),
      isCurrent: true,
    },
  });

  // 4. Classes and Sections
  const classNames = [
    { name: "Playgroup", code: "PG", order: 0 },
    { name: "Nursery", code: "NUR", order: 1 },
    { name: "Prep", code: "PREP", order: 2 },
    { name: "Class 1", code: "C1", order: 3 },
    { name: "Class 2", code: "C2", order: 4 },
    { name: "Class 3", code: "C3", order: 5 },
    { name: "Class 4", code: "C4", order: 6 },
    { name: "Class 5", code: "C5", order: 7 },
    { name: "Class 6", code: "C6", order: 8 },
    { name: "Class 7", code: "C7", order: 9 },
    { name: "Class 8", code: "C8", order: 10 },
    { name: "Class 9", code: "C9", order: 11 },
    { name: "Class 10", code: "C10", order: 12 },
  ];

  const createdClasses = {};
  const createdSections = {};
  const createdSubjects = {};

  for (const c of classNames) {
    const cls = await prisma.class.create({
      data: {
        name: c.name,
        code: c.code,
        orderIndex: c.order,
        campusId: alNisaCampus.id,
      },
    });
    createdClasses[c.code] = cls;

    // Sections
    const secA = await prisma.section.create({
      data: { name: "Section A", classId: cls.id, capacity: 35, roomNumber: `Room-${100 + c.order}` },
    });
    const secB = await prisma.section.create({
      data: { name: "Section B", classId: cls.id, capacity: 35, roomNumber: `Room-${120 + c.order}` },
    });
    createdSections[c.code] = [secA, secB];

    // Subjects
    const subjects = ["English", "Mathematics", "Science", "Urdu", "Islamiat"];
    if (c.order >= 11) {
      subjects.push("Physics", "Chemistry", "Biology", "Computer Science");
    }
    createdSubjects[c.code] = [];
    for (const sub of subjects) {
      const subjectRecord = await prisma.subject.create({
        data: {
          name: sub,
          code: sub.substring(0, 3).toUpperCase(),
          classId: cls.id,
        },
      });
      createdSubjects[c.code].push(subjectRecord);
    }
  }

  // 5. Users and Passwords
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  const teacherPasswordHash = await bcrypt.hash("teacher123", 10);
  const studentPasswordHash = await bcrypt.hash("student123", 10);

  // Admin User
  const adminUser = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@lahoreeliteschool.edu.pk",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      name: "Chief Administrator",
      phone: "0300-4279059",
      campusId: alNisaCampus.id,
    },
  });

  // Staff / Teacher Users
  const teacher1User = await prisma.user.create({
    data: {
      username: "teacher1",
      email: "farooq.ahmed@lahoreeliteschool.edu.pk",
      passwordHash: teacherPasswordHash,
      role: "TEACHER",
      name: "Sir Farooq Ahmed",
      phone: "0321-4567891",
      campusId: alNisaCampus.id,
    },
  });

  const teacher1 = await prisma.staff.create({
    data: {
      employeeId: "LES-T-101",
      userId: teacher1User.id,
      fullName: "Farooq Ahmed",
      phone: "0321-4567891",
      whatsapp: "0321-4567891",
      email: "farooq.ahmed@lahoreeliteschool.edu.pk",
      designation: "Senior Science Teacher",
      department: "Academics",
      campusId: alNisaCampus.id,
      basicSalary: 45000,
      qualification: "M.Sc. Physics (Punjab University)",
      address: "Sabzazar Scheme, Multan Road, Lahore",
    },
  });

  const teacher2User = await prisma.user.create({
    data: {
      username: "teacher2",
      email: "sadia.khan@lahoreeliteschool.edu.pk",
      passwordHash: teacherPasswordHash,
      role: "TEACHER",
      name: "Ms. Sadia Khan",
      phone: "0333-7891234",
      campusId: alNisaCampus.id,
    },
  });

  const teacher2 = await prisma.staff.create({
    data: {
      employeeId: "LES-T-102",
      userId: teacher2User.id,
      fullName: "Sadia Khan",
      phone: "0333-7891234",
      whatsapp: "0333-7891234",
      email: "sadia.khan@lahoreeliteschool.edu.pk",
      designation: "English Department Head",
      department: "Academics",
      campusId: alNisaCampus.id,
      basicSalary: 42000,
      qualification: "M.A. English Linguistics",
      address: "Zubaida Park, Lahore",
    },
  });

  // 6. Students
  const studentData = [
    {
      admissionNo: "LES-2025-001",
      username: "les-001",
      fullName: "Muhammad Ali Raza",
      fatherName: "Tariq Mahmood Raza",
      gender: "Male",
      classCode: "C9",
      phone: "0300-1234567",
      monthlyFee: 6500,
      discount: 500,
      address: "House 42, Street 5, Sabzazar, Lahore",
      feeStatus: "CURRENT",
    },
    {
      admissionNo: "LES-2025-002",
      username: "les-002",
      fullName: "Ayesha Tariq",
      fatherName: "Tariq Mahmood Raza", // Sibling of Muhammad Ali Raza for Family Voucher!
      gender: "Female",
      classCode: "C5",
      phone: "0300-1234567",
      monthlyFee: 5500,
      discount: 1000, // Sibling discount
      address: "House 42, Street 5, Sabzazar, Lahore",
      feeStatus: "CURRENT",
    },
    {
      admissionNo: "LES-2025-003",
      username: "les-003",
      fullName: "Hamza Bilal",
      fatherName: "Bilal Ashraf",
      gender: "Male",
      classCode: "C10",
      phone: "0322-8765432",
      monthlyFee: 7000,
      discount: 0,
      address: "Near Zubaida Park, Multan Road, Lahore",
      feeStatus: "DEFAULTER",
    },
    {
      admissionNo: "LES-2025-004",
      username: "les-004",
      fullName: "Zainab Fatima",
      fatherName: "Muhammad Usman",
      gender: "Female",
      classCode: "C8",
      phone: "0345-6789012",
      monthlyFee: 6000,
      discount: 0,
      address: "Awan Town, Multan Road, Lahore",
      feeStatus: "OVERDUE",
    },
  ];

  const createdStudents = [];

  for (const s of studentData) {
    const sUser = await prisma.user.create({
      data: {
        username: s.username,
        email: `${s.username}@student.lahoreeliteschool.edu.pk`,
        passwordHash: studentPasswordHash,
        role: "STUDENT",
        name: s.fullName,
        phone: s.phone,
        campusId: alNisaCampus.id,
      },
    });

    const targetClass = createdClasses[s.classCode];
    const targetSection = createdSections[s.classCode][0];

    const studentRecord = await prisma.student.create({
      data: {
        admissionNo: s.admissionNo,
        userId: sUser.id,
        fullName: s.fullName,
        fatherName: s.fatherName,
        guardianRelation: "Father",
        dob: new Date("2010-06-15"),
        gender: s.gender,
        phone: s.phone,
        whatsapp: s.phone,
        email: sUser.email,
        campusId: alNisaCampus.id,
        academicSessionId: session2025.id,
        classId: targetClass.id,
        sectionId: targetSection.id,
        address: s.address,
        monthlyTuitionFee: s.monthlyFee,
        discountAmount: s.discount,
        feeStatus: s.feeStatus,
        enrollmentStatus: "ACTIVE",
        bFormNo: "35201-1234567-1",
      },
    });
    createdStudents.push(studentRecord);
  }

  // 7. Fee Vouchers & Payments
  // Voucher 1: Ali Raza - Paid
  const v1 = await prisma.feeVoucher.create({
    data: {
      voucherNo: "VOU-202510-001",
      studentId: createdStudents[0].id,
      academicSessionId: session2025.id,
      feeMonth: "October 2025",
      issueDate: new Date("2025-10-01"),
      dueDate: new Date("2025-10-15"),
      tuitionFee: 6500,
      otherCharges: 500,
      discount: 500,
      previousBalance: 0,
      totalAmount: 6500,
      paidAmount: 6500,
      balance: 0,
      status: "PAID",
    },
  });

  await prisma.payment.create({
    data: {
      receiptNo: "REC-2025-001",
      voucherId: v1.id,
      studentId: createdStudents[0].id,
      amount: 6500,
      paymentDate: new Date("2025-10-10"),
      paymentMethod: "CASH",
      receivedBy: "Accounts Officer",
      notes: "Full payment received on time",
    },
  });

  // Voucher 2: Ayesha Tariq - Sibling voucher (Part of Family Voucher)
  const v2 = await prisma.feeVoucher.create({
    data: {
      voucherNo: "VOU-202510-002",
      studentId: createdStudents[1].id,
      academicSessionId: session2025.id,
      feeMonth: "October 2025",
      issueDate: new Date("2025-10-01"),
      dueDate: new Date("2025-10-15"),
      tuitionFee: 5500,
      otherCharges: 300,
      discount: 1000,
      previousBalance: 0,
      totalAmount: 4800,
      paidAmount: 4800,
      balance: 0,
      status: "PAID",
    },
  });

  await prisma.payment.create({
    data: {
      receiptNo: "REC-2025-002",
      voucherId: v2.id,
      studentId: createdStudents[1].id,
      amount: 4800,
      paymentDate: new Date("2025-10-12"),
      paymentMethod: "BANK_TRANSFER",
      referenceNo: "HBL-782193",
      receivedBy: "Accounts Officer",
    },
  });

  // Family Voucher bundling Ali Raza and Ayesha Tariq
  await prisma.familyVoucher.create({
    data: {
      voucherNo: "FAM-202510-001",
      guardianName: "Tariq Mahmood Raza",
      guardianPhone: "0300-1234567",
      totalAmount: 11300,
      paidAmount: 11300,
      balance: 0,
      status: "PAID",
      issueDate: new Date("2025-10-01"),
      dueDate: new Date("2025-10-15"),
      notes: "Combined sibling fee voucher for Ali & Ayesha",
      vouchers: {
        connect: [{ id: v1.id }, { id: v2.id }],
      },
    },
  });

  // Voucher 3: Hamza Bilal - Overdue Defaulter
  await prisma.feeVoucher.create({
    data: {
      voucherNo: "VOU-202510-003",
      studentId: createdStudents[2].id,
      academicSessionId: session2025.id,
      feeMonth: "October 2025",
      issueDate: new Date("2025-10-01"),
      dueDate: new Date("2025-10-10"),
      tuitionFee: 7000,
      otherCharges: 500,
      discount: 0,
      previousBalance: 7500, // September overdue
      totalAmount: 15000,
      paidAmount: 0,
      balance: 15000,
      status: "UNPAID",
      notes: "Fee reminder sent via WhatsApp",
    },
  });

  // Voucher 4: Zainab Fatima - Partial Payment
  const v4 = await prisma.feeVoucher.create({
    data: {
      voucherNo: "VOU-202510-004",
      studentId: createdStudents[3].id,
      academicSessionId: session2025.id,
      feeMonth: "October 2025",
      issueDate: new Date("2025-10-01"),
      dueDate: new Date("2025-10-15"),
      tuitionFee: 6000,
      otherCharges: 400,
      discount: 0,
      previousBalance: 0,
      totalAmount: 6400,
      paidAmount: 3000,
      balance: 3400,
      status: "PARTIAL",
    },
  });

  await prisma.payment.create({
    data: {
      receiptNo: "REC-2025-003",
      voucherId: v4.id,
      studentId: createdStudents[3].id,
      amount: 3000,
      paymentDate: new Date("2025-10-14"),
      paymentMethod: "CASH",
      receivedBy: "Accounts Officer",
      notes: "Partial payment; balance promised by end of month",
    },
  });

  // 8. Staff Payroll
  await prisma.payroll.create({
    data: {
      payrollMonth: "October",
      payrollYear: 2025,
      staffId: teacher1.id,
      basicSalary: 45000,
      allowances: 5000, // Science Lab allowance
      deductions: 1000, // Tax
      netPayable: 49000,
      status: "PAID",
      paymentDate: new Date("2025-10-05"),
      paymentMethod: "Direct Bank Transfer",
      paymentRef: "SAL-OCT-01",
    },
  });

  await prisma.payroll.create({
    data: {
      payrollMonth: "October",
      payrollYear: 2025,
      staffId: teacher2.id,
      basicSalary: 42000,
      allowances: 3000,
      deductions: 800,
      netPayable: 44200,
      status: "PAID",
      paymentDate: new Date("2025-10-05"),
      paymentMethod: "Direct Bank Transfer",
      paymentRef: "SAL-OCT-02",
    },
  });

  // 9. Attendance
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Student Attendance
  await prisma.attendance.create({
    data: {
      date: today,
      entityType: "STUDENT",
      studentId: createdStudents[0].id,
      status: "PRESENT",
      campusId: alNisaCampus.id,
      classId: createdClasses["C9"].id,
      sectionId: createdSections["C9"][0].id,
    },
  });

  await prisma.attendance.create({
    data: {
      date: today,
      entityType: "STUDENT",
      studentId: createdStudents[1].id,
      status: "PRESENT",
      campusId: alNisaCampus.id,
      classId: createdClasses["C5"].id,
      sectionId: createdSections["C5"][0].id,
    },
  });

  await prisma.attendance.create({
    data: {
      date: today,
      entityType: "STUDENT",
      studentId: createdStudents[2].id,
      status: "ABSENT",
      notes: "Uninformed absence",
      campusId: alNisaCampus.id,
      classId: createdClasses["C10"].id,
      sectionId: createdSections["C10"][0].id,
    },
  });

  // Staff Attendance
  await prisma.attendance.create({
    data: {
      date: today,
      entityType: "STAFF",
      staffId: teacher1.id,
      status: "PRESENT",
      campusId: alNisaCampus.id,
    },
  });

  await prisma.attendance.create({
    data: {
      date: today,
      entityType: "STAFF",
      staffId: teacher2.id,
      status: "PRESENT",
      campusId: alNisaCampus.id,
    },
  });

  // 10. Timetable
  const c9 = createdClasses["C9"];
  const c9SecA = createdSections["C9"][0];
  const englishSub = createdSubjects["C9"].find((s) => s.name === "English");
  const physicsSub = createdSubjects["C9"].find((s) => s.name === "Physics") || createdSubjects["C9"][1];

  await prisma.timetable.create({
    data: {
      academicSessionId: session2025.id,
      campusId: alNisaCampus.id,
      classId: c9.id,
      sectionId: c9SecA.id,
      subjectId: englishSub.id,
      staffId: teacher2.id,
      dayOfWeek: "Monday",
      startTime: "08:30 AM",
      endTime: "09:15 AM",
      room: "Room 101",
    },
  });

  await prisma.timetable.create({
    data: {
      academicSessionId: session2025.id,
      campusId: alNisaCampus.id,
      classId: c9.id,
      sectionId: c9SecA.id,
      subjectId: physicsSub.id,
      staffId: teacher1.id,
      dayOfWeek: "Monday",
      startTime: "09:15 AM",
      endTime: "10:00 AM",
      room: "Science Lab",
    },
  });

  // 11. Examinations & Results
  const midTermExam = await prisma.examination.create({
    data: {
      academicSessionId: session2025.id,
      name: "Mid-Term Examinations 2025",
      term: "Mid Term",
      startDate: new Date("2025-11-10"),
      endDate: new Date("2025-11-20"),
      isPublished: true,
    },
  });

  const examSubEnglish = await prisma.examSubject.create({
    data: {
      examId: midTermExam.id,
      classId: c9.id,
      subjectId: englishSub.id,
      examDate: new Date("2025-11-10"),
      startTime: "09:00 AM",
      endTime: "12:00 PM",
      totalMarks: 100,
      passingMarks: 40,
      roomNo: "Hall A",
    },
  });

  await prisma.examResult.create({
    data: {
      examSubjectId: examSubEnglish.id,
      studentId: createdStudents[0].id,
      marksObtained: 88,
      totalMarks: 100,
      grade: "A+",
      remarks: "Outstanding comprehension and essay writing skills",
      status: "PUBLISHED",
    },
  });

  // 12. Question Paper Generator Sample
  await prisma.questionPaper.create({
    data: {
      title: "English Mid Term Examination 2025",
      examType: "Mid Term",
      classId: c9.id,
      subjectId: englishSub.id,
      duration: "2 Hours 30 Minutes",
      totalMarks: 75,
      instructions: "Attempt all questions. Write legibly and present your answers systematically.",
      status: "PUBLISHED",
      questionsJson: JSON.stringify([
        {
          id: 1,
          type: "MCQ",
          question: "Choose the correct synonym of 'Eloquent':",
          options: ["Fluent", "Silent", "Harsh", "Hesitant"],
          marks: 5,
        },
        {
          id: 2,
          type: "Short",
          question: "Explain the central theme of the poem 'Daffodils' by William Wordsworth.",
          marks: 10,
        },
        {
          id: 3,
          type: "Long",
          question: "Write an essay of 250 words on 'The Role of Modern Science in Quality School Education'.",
          marks: 20,
        },
        {
          id: 4,
          type: "TrueFalse",
          question: "An adjective describes an action in a sentence. (True / False)",
          marks: 5,
        },
      ]),
    },
  });

  // 13. Income & Expenses
  await prisma.incomeExpense.create({
    data: {
      type: "INCOME",
      category: "FEES",
      description: "Monthly School Tuition Fees Collection - October 2025",
      amount: 14300,
      date: new Date("2025-10-15"),
      campusId: alNisaCampus.id,
      recordedBy: "Accounts Officer",
    },
  });

  await prisma.incomeExpense.create({
    data: {
      type: "EXPENSE",
      category: "SALARY",
      description: "Staff Salaries Disbursement - October 2025",
      amount: 93200,
      date: new Date("2025-10-05"),
      campusId: alNisaCampus.id,
      payeeOrPayer: "Staff Accounts",
      recordedBy: "Accounts Officer",
    },
  });

  await prisma.incomeExpense.create({
    data: {
      type: "EXPENSE",
      category: "UTILITIES",
      description: "Electricity & Generator Fuel Bill",
      amount: 28500,
      date: new Date("2025-10-18"),
      campusId: alNisaCampus.id,
      payeeOrPayer: "LESCO / Vendor",
      recordedBy: "Campus Supervisor",
    },
  });

  // 14. Certificates
  await prisma.certificate.create({
    data: {
      certificateNo: "LES-CERT-2025-001",
      recipientType: "STUDENT",
      studentId: createdStudents[0].id,
      recipientName: "Muhammad Ali Raza",
      templateType: "ACADEMIC_EXCELLENCE",
      title: "Certificate of Academic Excellence",
      description: "Awarded for securing 1st Position in Class 9 Mid-Term Examinations with distinction in English and Sciences.",
      issueDate: new Date("2025-10-20"),
      signatory: "Principal & Chairman, Lahore Elite School",
      status: "ISSUED",
    },
  });

  // 15. Announcements
  await prisma.announcement.create({
    data: {
      title: "Mid-Term Examination Schedule Announced",
      message: "The Mid-Term Examinations for classes 1 through 10 commence on November 10, 2025. Please collect your date sheet and clear pending vouchers.",
      targetRole: "ALL",
      campusId: alNisaCampus.id,
      isPublished: true,
      publishDate: new Date(),
    },
  });

  await prisma.announcement.create({
    data: {
      title: "Annual Sports Gala & Parent Teacher Meeting",
      message: "Parent-Teacher Meeting is scheduled for Saturday, 25th October 2025 from 9:00 AM to 1:00 PM. Parents are encouraged to review student progress portfolios.",
      targetRole: "ALL",
      isPublished: true,
      publishDate: new Date(),
    },
  });

  // 16. FAQs
  const faqs = [
    {
      category: "Admissions",
      question: "What is the admission procedure at Lahore Elite School?",
      answer: "Parents can submit an admission inquiry online or visit either Al-Nisa or Sabzazar Campus. An entry evaluation interview is scheduled, followed by verification of B-Form and birth certificate.",
      orderIndex: 1,
    },
    {
      category: "Fee Payments",
      question: "When are monthly fee vouchers due?",
      answer: "Fee vouchers are generated on the 1st of each calendar month and are due by the 10th. Payments can be deposited directly via cash at the campus accounts desk or through online bank transfer.",
      orderIndex: 2,
    },
    {
      category: "Uniform",
      question: "Where can school uniforms be purchased?",
      answer: "Authorized uniform sets with the Lahore Elite School crest and tie can be procured from designated school uniform vendors on Multan Road, Lahore.",
      orderIndex: 3,
    },
    {
      category: "Academic",
      question: "What curriculum does Lahore Elite School follow?",
      answer: "We follow an enriched curriculum integrating national standards with contemporary English medium pedagogy, computer literacy, and STEM labs.",
      orderIndex: 4,
    },
  ];

  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }

  // 17. Gallery Items
  const galleryItems = [
    {
      title: "Annual Award Ceremony 2025",
      description: "Celebrating academic toppers, student council achievers, and debate winners at Lahore Elite School.",
      category: "Awards",
      imageUrl: "/images/gallery/award-ceremony.png",
      eventDate: "March 2025",
      orderIndex: 1,
    },
    {
      title: "Classroom Learning & Robotics",
      description: "Hands-on science experiments and interactive digital learning sessions.",
      category: "Classroom",
      imageUrl: "/images/gallery/Lahore Elite School Reffference Images (1).jpeg",
      eventDate: "September 2025",
      orderIndex: 2,
    },
    {
      title: "Junior Section Sports Day",
      description: "Physical fitness activities and team building sports on campus ground.",
      category: "Sports",
      imageUrl: "/images/gallery/Lahore Elite School Reffference Images (2).jpeg",
      eventDate: "October 2025",
      orderIndex: 3,
    },
  ];

  for (const g of galleryItems) {
    await prisma.galleryItem.create({ data: g });
  }

  // 18. School Settings
  const settings = [
    { key: "school_name", value: "Lahore Elite School", category: "BRAND" },
    { key: "phone_primary", value: "0300-4279059", category: "CONTACT" },
    { key: "alnisa_address", value: "1-S 9/14 Zubaida Park, Multan Road, Lahore", category: "CONTACT" },
    { key: "sabzazar_address", value: "280 B-Block, Sabzazar, Multan Road, Lahore", category: "CONTACT" },
    { key: "developer_name", value: "Muhammad Raza", category: "DEVELOPER" },
    { key: "developer_phone", value: "+923341816004", category: "DEVELOPER" },
    { key: "developer_email", value: "raza.developer@lahoreeliteschool.edu.pk", category: "DEVELOPER" },
    {
      key: "chairman_message",
      value: "At Lahore Elite School, we cultivate disciplined minds, character, moral integrity, and modern educational excellence. We take pride in guiding each student to realise their fullest potential.",
      category: "BRAND",
    },
  ];

  for (const s of settings) {
    await prisma.schoolSetting.create({ data: s });
  }

  console.log("Seeding complete! Database successfully populated with realistic Pakistani school data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
