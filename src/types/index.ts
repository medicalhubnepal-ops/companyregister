export type UserRole = "user" | "staff" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  status: "active" | "inactive";
}

export interface Company {
  id: string;
  registrationNumber: string;
  registrationDate: string;
  nameNp: string;
  nameEn: string;
  type: string;
  industry: string;
  pan?: string;
  status: "Active" | "Inactive" | "Liquidated";
  fiscalYear: string;
  address: {
    province: string;
    district: string;
    municipality: string;
    ward: string;
    tole: string;
  };
  contact: string;
  email: string;
  website?: string;
  capital: CapitalStructure;
  directors: Director[];
  shareholders: Shareholder[];
  branches: Branch[];
}

export interface CapitalStructure {
  authorized: number;
  issued: number;
  paidUp: number;
  faceValue: number;
  totalShares: number;
  approvalDate: string;
  currency: string;
}

export interface Director {
  id: string;
  name: string;
  address: string;
  citizenshipNo: string;
  pan?: string;
  designation: string;
  appointmentDate: string;
  termExpiryDate?: string;
  status: "Active" | "Resigned" | "Removed";
}

export interface Shareholder {
  id: string;
  name: string;
  address: string;
  citizenshipNo: string;
  fatherName?: string;
  nationality: string;
  shareQty: number;
  shareAmount: number;
  sharePercentage: number;
  shareType: "Founder" | "Ordinary" | "Preference";
  dateOfEntry: string;
  status: "Active" | "Transferred" | "Removed";
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  establishedDate: string;
  status: "Active" | "Closed";
}

export interface EventField {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "textarea" | "select";
  mandatory: boolean;
  options?: string[];
}

export interface EventType {
  id: string;
  code: string;
  name: string;
  nameNp: string;
  category: string;
  status: "active" | "inactive";
  requiredDocs: string[];
  fields: EventField[];
}

export interface ApplicationDocument {
  id: string;
  name: string;
  type: string;
  mandatory: boolean;
  status: "uploaded" | "verified" | "rejected";
  uploadDate: string;
  filePath?: string;
}

export interface ApplicationHistory {
  action: string;
  by: string;
  date: string;
  remarks: string;
}

export type ApplicationStatus = "draft" | "submitted" | "under_verification" | "approved" | "rejected" | "returned";

export interface Application {
  id: string;
  applicationNumber: string;
  companyId: string;
  eventTypeId: string;
  eventName: string;
  submissionDate: string;
  submittedBy: string;
  status: ApplicationStatus;
  remarks: string;
  version: number;
  formData: Record<string, any>;
  documents: ApplicationDocument[];
  history: ApplicationHistory[];
}

export interface Template {
  id: string;
  code: string;
  name: string;
  eventTypeId: string;
  language: string;
  format: string;
  version: number;
  createdBy: string;
  createdDate: string;
  status: "active" | "inactive";
  placeholders: string[];
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  targetType: string;
  targetId: string;
  timestamp: string;
  details: string;
}
