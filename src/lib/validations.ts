import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, "Username, Admission No or Email is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"]),
});

export const ContactInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  phone: z.string().min(10, "Please enter a valid Pakistani contact number"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const AdmissionInquirySchema = z.object({
  studentName: z.string().min(2, "Student name is required"),
  fatherName: z.string().min(2, "Father/Guardian name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  requestedClass: z.string().min(1, "Please select a class"),
  campusName: z.string().min(1, "Please select a campus"),
  previousSchool: z.string().optional(),
  message: z.string().optional(),
});

export const JobApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  position: z.string().min(2, "Position applied for is required"),
  experience: z.string().min(1, "Experience is required"),
  qualification: z.string().min(2, "Qualification is required"),
  coverLetter: z.string().min(10, "Please provide a short introduction"),
});

export const FranchiseInquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid contact number is required"),
  email: z.string().email().optional().or(z.literal("")),
  city: z.string().min(2, "City is required"),
  proposedLocation: z.string().min(3, "Proposed location is required"),
  background: z.string().min(2, "Professional background is required"),
  experience: z.string().min(2, "Educational experience is required"),
  proposedFacilities: z.string().min(2, "Proposed facilities are required"),
  estimatedInvestment: z.string().min(2, "Estimated investment is required"),
  preferredLevels: z.string().min(2, "Preferred academic levels are required"),
  message: z.string().optional(),
});

export const StudentFormSchema = z.object({
  admissionNo: z.string().min(3, "Admission number is required"),
  fullName: z.string().min(2, "Full name is required"),
  fatherName: z.string().min(2, "Father's name is required"),
  guardianRelation: z.string().default("Father"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["Male", "Female"]),
  phone: z.string().min(10, "Valid phone number is required"),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  campusId: z.string().min(1, "Campus is required"),
  classId: z.string().min(1, "Class is required"),
  sectionId: z.string().min(1, "Section is required"),
  academicSessionId: z.string().min(1, "Academic Session is required"),
  address: z.string().min(3, "Address is required"),
  monthlyTuitionFee: z.coerce.number().min(0, "Fee cannot be negative"),
  discountAmount: z.coerce.number().min(0).default(0),
  bFormNo: z.string().optional(),
  emergencyContact: z.string().optional(),
});

export const StaffFormSchema = z.object({
  employeeId: z.string().min(2, "Employee ID is required"),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  designation: z.string().min(2, "Designation is required"),
  department: z.string().min(2, "Department is required"),
  campusId: z.string().min(1, "Campus is required"),
  basicSalary: z.coerce.number().min(0, "Basic salary cannot be negative"),
  qualification: z.string().optional(),
  address: z.string().optional(),
});

export const FeeVoucherGenerateSchema = z.object({
  classId: z.string().optional(),
  studentId: z.string().optional(),
  academicSessionId: z.string().min(1, "Academic session is required"),
  feeMonth: z.string().min(1, "Fee month is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

export const PaymentRecordSchema = z.object({
  voucherId: z.string().min(1, "Voucher is required"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "CHEQUE", "ONLINE"]),
  referenceNo: z.string().optional(),
  receivedBy: z.string().optional(),
  notes: z.string().optional(),
});
