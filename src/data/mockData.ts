import { Company, Application, EventType, User, Template, AuditLog } from "@/types";

export const mockUsers: User[] = [
  { id: "u1", name: "Ram Prasad Sharma", email: "ram@company.com", role: "user", companyId: "c1", status: "active" },
  { id: "u2", name: "Sita Devi Thapa", email: "sita@company.com", role: "user", companyId: "c2", status: "active" },
  { id: "s1", name: "Krishna Bahadur KC", email: "krishna@staff.gov", role: "staff", status: "active" },
  { id: "s2", name: "Laxmi Kumari Rai", email: "laxmi@staff.gov", role: "staff", status: "active" },
  { id: "a1", name: "Admin Officer", email: "admin@registry.gov", role: "admin", status: "active" },
];

export const mockEventTypes: EventType[] = [
  { id: "evt1", code: "ANNUAL_RETURN", name: "Annual Return Filing", nameNp: "वार्षिक विवरण", category: "annual", status: "active", requiredDocs: ["AGM Minutes", "Board Meeting Minutes", "Financial Statement", "Auditor Appointment"], fields: [
    { name: "agmDate", label: "AGM Date", type: "date", mandatory: true },
    { name: "boardMeetingDate", label: "Board Meeting Date", type: "date", mandatory: true },
    { name: "resolutionNumber", label: "Resolution Number", type: "text", mandatory: true },
    { name: "auditorName", label: "Auditor Name", type: "text", mandatory: true },
    { name: "totalShareCapital", label: "Total Share Capital", type: "number", mandatory: true },
    { name: "remarks", label: "Notes / Remarks", type: "textarea", mandatory: false },
  ]},
  { id: "evt2", code: "DIR_APPOINT", name: "Director Appointment", nameNp: "सञ्चालक नियुक्ति", category: "director", status: "active", requiredDocs: ["Board Resolution", "Citizenship Copy", "Consent Letter"], fields: [
    { name: "directorName", label: "Director Name", type: "text", mandatory: true },
    { name: "citizenshipNumber", label: "Citizenship Number", type: "text", mandatory: true },
    { name: "address", label: "Address", type: "text", mandatory: true },
    { name: "designation", label: "Designation", type: "select", mandatory: true, options: ["Director", "Managing Director", "Chairperson"] },
    { name: "appointmentDate", label: "Appointment Date", type: "date", mandatory: true },
    { name: "resolutionDate", label: "Resolution Date", type: "date", mandatory: true },
  ]},
  { id: "evt3", code: "CAPITAL_INCREASE", name: "Capital Increase", nameNp: "पूँजी वृद्धि", category: "capital", status: "active", requiredDocs: ["Board Resolution", "AGM Resolution", "Updated MOA"], fields: [
    { name: "previousCapital", label: "Previous Capital (NPR)", type: "number", mandatory: true },
    { name: "increasedAmount", label: "Increased Amount (NPR)", type: "number", mandatory: true },
    { name: "newCapital", label: "New Capital (NPR)", type: "number", mandatory: true },
    { name: "resolutionDate", label: "Resolution Date", type: "date", mandatory: true },
    { name: "effectiveDate", label: "Effective Date", type: "date", mandatory: true },
  ]},
  { id: "evt4", code: "SHARE_TRANSFER", name: "Share Transfer", nameNp: "शेयर हस्तान्तरण", category: "capital", status: "active", requiredDocs: ["Transfer Deed", "Board Approval", "Share Certificate"], fields: [
    { name: "transferorName", label: "Transferor Name", type: "text", mandatory: true },
    { name: "transfereeName", label: "Transferee Name", type: "text", mandatory: true },
    { name: "shareQuantity", label: "Share Quantity", type: "number", mandatory: true },
    { name: "transferDate", label: "Transfer Date", type: "date", mandatory: true },
  ]},
  { id: "evt5", code: "ADDRESS_CHANGE", name: "Address Change", nameNp: "ठेगाना परिवर्तन", category: "structural", status: "active", requiredDocs: ["Board Resolution", "New Address Proof"], fields: [
    { name: "previousAddress", label: "Previous Address", type: "text", mandatory: true },
    { name: "newAddress", label: "New Address", type: "text", mandatory: true },
    { name: "effectiveDate", label: "Effective Date", type: "date", mandatory: true },
    { name: "resolutionRef", label: "Resolution Reference", type: "text", mandatory: true },
  ]},
  { id: "evt6", code: "NAME_CHANGE", name: "Company Name Change", nameNp: "कम्पनी नाम परिवर्तन", category: "structural", status: "active", requiredDocs: ["Special Resolution", "Name Reservation Letter", "Updated MOA"], fields: [
    { name: "previousName", label: "Previous Name", type: "text", mandatory: true },
    { name: "newName", label: "New Name", type: "text", mandatory: true },
    { name: "effectiveDate", label: "Effective Date", type: "date", mandatory: true },
  ]},
  { id: "evt7", code: "DIR_RESIGN", name: "Director Resignation", nameNp: "सञ्चालक राजीनामा", category: "director", status: "active", requiredDocs: ["Resignation Letter", "Board Acceptance Resolution"], fields: [
    { name: "directorName", label: "Director Name", type: "text", mandatory: true },
    { name: "resignationDate", label: "Resignation Date", type: "date", mandatory: true },
    { name: "reason", label: "Reason", type: "textarea", mandatory: false },
  ]},
  { id: "evt8", code: "MOA_AMENDMENT", name: "MOA/AOA Amendment", nameNp: "प्रबन्धपत्र/नियमावली संशोधन", category: "structural", status: "active", requiredDocs: ["Special Resolution", "Amended MOA/AOA"], fields: [
    { name: "amendmentDescription", label: "Amendment Description", type: "textarea", mandatory: true },
    { name: "resolutionDate", label: "Resolution Date", type: "date", mandatory: true },
    { name: "effectiveDate", label: "Effective Date", type: "date", mandatory: true },
  ]},
];

export const mockCompanies: Company[] = [
  {
    id: "c1",
    registrationNumber: "REG-2075-00145",
    registrationDate: "2075-04-15",
    nameNp: "हिमालय ट्रेड लिमिटेड",
    nameEn: "Himalaya Trade Limited",
    type: "Private",
    industry: "Trading",
    pan: "301234567",
    status: "Active",
    fiscalYear: "Shrawan - Ashad",
    address: { province: "Bagmati", district: "Kathmandu", municipality: "KMC", ward: "10", tole: "New Baneshwor" },
    contact: "01-4567890",
    email: "info@himalayatrade.com",
    capital: { authorized: 10000000, issued: 5000000, paidUp: 5000000, faceValue: 100, totalShares: 50000, approvalDate: "2075-04-15", currency: "NPR" },
    directors: [
      { id: "d1", name: "Ram Prasad Sharma", address: "Kathmandu-10", citizenshipNo: "12-34-56789", designation: "Chairperson", appointmentDate: "2075-04-15", status: "Active" },
      { id: "d2", name: "Hari Bahadur Thapa", address: "Lalitpur-5", citizenshipNo: "23-45-67890", designation: "Director", appointmentDate: "2076-01-01", status: "Active" },
      { id: "d3", name: "Gita Kumari Shrestha", address: "Bhaktapur-3", citizenshipNo: "34-56-78901", designation: "Managing Director", appointmentDate: "2075-04-15", status: "Active" },
    ],
    shareholders: [
      { id: "sh1", name: "Ram Prasad Sharma", address: "Kathmandu-10", citizenshipNo: "12-34-56789", nationality: "Nepali", shareQty: 25000, shareAmount: 2500000, sharePercentage: 50, shareType: "Founder", dateOfEntry: "2075-04-15", status: "Active" },
      { id: "sh2", name: "Hari Bahadur Thapa", address: "Lalitpur-5", citizenshipNo: "23-45-67890", nationality: "Nepali", shareQty: 15000, shareAmount: 1500000, sharePercentage: 30, shareType: "Founder", dateOfEntry: "2075-04-15", status: "Active" },
      { id: "sh3", name: "Gita Kumari Shrestha", address: "Bhaktapur-3", citizenshipNo: "34-56-78901", nationality: "Nepali", shareQty: 10000, shareAmount: 1000000, sharePercentage: 20, shareType: "Ordinary", dateOfEntry: "2076-06-01", status: "Active" },
    ],
    branches: [
      { id: "b1", name: "Pokhara Branch", address: "Pokhara-8, Lakeside", establishedDate: "2077-01-15", status: "Active" },
    ],
  },
  {
    id: "c2",
    registrationNumber: "REG-2076-00289",
    registrationDate: "2076-08-20",
    nameNp: "एवरेष्ट सोलुसन प्रा.लि.",
    nameEn: "Everest Solutions Pvt. Ltd.",
    type: "Private",
    industry: "IT Services",
    pan: "402345678",
    status: "Active",
    fiscalYear: "Shrawan - Ashad",
    address: { province: "Bagmati", district: "Lalitpur", municipality: "Lalitpur Metro", ward: "3", tole: "Pulchowk" },
    contact: "01-5234567",
    email: "info@everestsolutions.com",
    capital: { authorized: 5000000, issued: 3000000, paidUp: 3000000, faceValue: 100, totalShares: 30000, approvalDate: "2076-08-20", currency: "NPR" },
    directors: [
      { id: "d4", name: "Sita Devi Thapa", address: "Lalitpur-3", citizenshipNo: "45-67-89012", designation: "Chairperson", appointmentDate: "2076-08-20", status: "Active" },
      { id: "d5", name: "Bikash Gurung", address: "Kathmandu-5", citizenshipNo: "56-78-90123", designation: "Director", appointmentDate: "2076-08-20", status: "Active" },
    ],
    shareholders: [
      { id: "sh4", name: "Sita Devi Thapa", address: "Lalitpur-3", citizenshipNo: "45-67-89012", nationality: "Nepali", shareQty: 18000, shareAmount: 1800000, sharePercentage: 60, shareType: "Founder", dateOfEntry: "2076-08-20", status: "Active" },
      { id: "sh5", name: "Bikash Gurung", address: "Kathmandu-5", citizenshipNo: "56-78-90123", nationality: "Nepali", shareQty: 12000, shareAmount: 1200000, sharePercentage: 40, shareType: "Founder", dateOfEntry: "2076-08-20", status: "Active" },
    ],
    branches: [],
  },
];

export const mockApplications: Application[] = [
  { id: "app1", applicationNumber: "APP-2081-0001", companyId: "c1", eventTypeId: "evt1", eventName: "Annual Return Filing", submissionDate: "2081-04-10", submittedBy: "u1", status: "approved", remarks: "All documents verified", version: 1, formData: { agmDate: "2081-03-15", boardMeetingDate: "2081-03-10", resolutionNumber: "RES-081-01", auditorName: "ABC Audit Firm", totalShareCapital: 5000000 }, documents: [
    { id: "doc1", name: "AGM Minutes", type: "Resolution", mandatory: true, status: "verified", uploadDate: "2081-04-10" },
    { id: "doc2", name: "Board Meeting Minutes", type: "Resolution", mandatory: true, status: "verified", uploadDate: "2081-04-10" },
    { id: "doc3", name: "Financial Statement", type: "Report", mandatory: true, status: "verified", uploadDate: "2081-04-10" },
  ], history: [
    { action: "Created", by: "Ram Prasad Sharma", date: "2081-04-10", remarks: "Draft created" },
    { action: "Submitted", by: "Ram Prasad Sharma", date: "2081-04-10", remarks: "Submitted for verification" },
    { action: "Under Verification", by: "Krishna Bahadur KC", date: "2081-04-11", remarks: "Reviewing documents" },
    { action: "Approved", by: "Krishna Bahadur KC", date: "2081-04-12", remarks: "All documents verified successfully" },
  ]},
  { id: "app2", applicationNumber: "APP-2081-0002", companyId: "c1", eventTypeId: "evt2", eventName: "Director Appointment", submissionDate: "2081-05-01", submittedBy: "u1", status: "submitted", remarks: "", version: 1, formData: { directorName: "Binod Kumar Jha", citizenshipNumber: "67-89-01234", address: "Kathmandu-7", designation: "Director", appointmentDate: "2081-04-25", resolutionDate: "2081-04-20" }, documents: [
    { id: "doc4", name: "Board Resolution", type: "Resolution", mandatory: true, status: "uploaded", uploadDate: "2081-05-01" },
    { id: "doc5", name: "Citizenship Copy", type: "Certificate", mandatory: true, status: "uploaded", uploadDate: "2081-05-01" },
  ], history: [
    { action: "Created", by: "Ram Prasad Sharma", date: "2081-05-01", remarks: "Draft created" },
    { action: "Submitted", by: "Ram Prasad Sharma", date: "2081-05-01", remarks: "Submitted for verification" },
  ]},
  { id: "app3", applicationNumber: "APP-2081-0003", companyId: "c2", eventTypeId: "evt3", eventName: "Capital Increase", submissionDate: "2081-05-05", submittedBy: "u2", status: "under_verification", remarks: "", version: 1, formData: { previousCapital: 3000000, increasedAmount: 2000000, newCapital: 5000000, resolutionDate: "2081-04-28", effectiveDate: "2081-05-15" }, documents: [
    { id: "doc6", name: "Board Resolution", type: "Resolution", mandatory: true, status: "uploaded", uploadDate: "2081-05-05" },
    { id: "doc7", name: "AGM Resolution", type: "Resolution", mandatory: true, status: "uploaded", uploadDate: "2081-05-05" },
  ], history: [
    { action: "Created", by: "Sita Devi Thapa", date: "2081-05-05", remarks: "Draft created" },
    { action: "Submitted", by: "Sita Devi Thapa", date: "2081-05-05", remarks: "Submitted for verification" },
    { action: "Under Verification", by: "Laxmi Kumari Rai", date: "2081-05-06", remarks: "Documents under review" },
  ]},
  { id: "app4", applicationNumber: "APP-2081-0004", companyId: "c1", eventTypeId: "evt4", eventName: "Share Transfer", submissionDate: "2081-05-10", submittedBy: "u1", status: "returned", remarks: "Transfer deed signature missing", version: 2, formData: { transferorName: "Hari Bahadur Thapa", transfereeName: "Binod Kumar Jha", shareQuantity: 5000, transferDate: "2081-05-08" }, documents: [
    { id: "doc8", name: "Transfer Deed", type: "Certificate", mandatory: true, status: "rejected", uploadDate: "2081-05-10" },
  ], history: [
    { action: "Created", by: "Ram Prasad Sharma", date: "2081-05-10", remarks: "Draft created" },
    { action: "Submitted", by: "Ram Prasad Sharma", date: "2081-05-10", remarks: "Submitted for verification" },
    { action: "Returned", by: "Krishna Bahadur KC", date: "2081-05-11", remarks: "Transfer deed signature missing" },
  ]},
  { id: "app5", applicationNumber: "APP-2081-0005", companyId: "c2", eventTypeId: "evt1", eventName: "Annual Return Filing", submissionDate: "2081-04-20", submittedBy: "u2", status: "draft", remarks: "", version: 1, formData: {}, documents: [], history: [
    { action: "Created", by: "Sita Devi Thapa", date: "2081-04-20", remarks: "Draft created" },
  ]},
];

export const mockTemplates: Template[] = [
  { id: "t1", code: "TPL-ANNUAL", name: "Annual Return Certificate", eventTypeId: "evt1", language: "English", format: "PDF", version: 2, createdBy: "a1", createdDate: "2080-01-01", status: "active", placeholders: ["company_name_eng", "company_name_nep", "registration_no", "agm_date", "board_meeting_date", "director_list", "auditor_name", "paid_up_capital", "resolution_no", "submission_date", "current_date"] },
  { id: "t2", code: "TPL-DIR-APPT", name: "Director Appointment Letter", eventTypeId: "evt2", language: "English", format: "PDF", version: 1, createdBy: "a1", createdDate: "2080-01-15", status: "active", placeholders: ["company_name_eng", "director_name", "citizenship_no", "designation", "appointment_date", "resolution_date"] },
  { id: "t3", code: "TPL-CAPITAL", name: "Capital Change Certificate", eventTypeId: "evt3", language: "Nepali", format: "PDF", version: 1, createdBy: "a1", createdDate: "2080-02-01", status: "active", placeholders: ["company_name_nep", "previous_capital", "new_capital", "resolution_date", "effective_date"] },
  { id: "t4", code: "TPL-SHARE-TR", name: "Share Transfer Certificate", eventTypeId: "evt4", language: "English", format: "DOCX", version: 1, createdBy: "a1", createdDate: "2080-03-01", status: "active", placeholders: ["company_name_eng", "transferor_name", "transferee_name", "share_quantity", "transfer_date"] },
  { id: "t5", code: "TPL-ANNUAL-NP", name: "वार्षिक प्रतिवेदन प्रमाणपत्र", eventTypeId: "evt1", language: "Nepali", format: "PDF", version: 1, createdBy: "a1", createdDate: "2080-04-01", status: "inactive", placeholders: ["company_name_nep", "registration_no", "agm_date", "director_list", "paid_up_capital"] },
];

export const mockAuditLogs: AuditLog[] = [
  { id: "al1", action: "Application Approved", userId: "s1", userName: "Krishna Bahadur KC", targetType: "application", targetId: "app1", timestamp: "2081-04-12 10:30:00", details: "Annual Return Filing approved" },
  { id: "al2", action: "Application Submitted", userId: "u1", userName: "Ram Prasad Sharma", targetType: "application", targetId: "app2", timestamp: "2081-05-01 09:15:00", details: "Director Appointment submitted" },
  { id: "al3", action: "Application Returned", userId: "s1", userName: "Krishna Bahadur KC", targetType: "application", targetId: "app4", timestamp: "2081-05-11 14:20:00", details: "Share Transfer returned - signature missing" },
  { id: "al4", action: "Template Updated", userId: "a1", userName: "Admin Officer", targetType: "template", targetId: "t1", timestamp: "2081-03-01 11:00:00", details: "Annual Return Certificate updated to version 2" },
  { id: "al5", action: "User Login", userId: "u2", userName: "Sita Devi Thapa", targetType: "system", targetId: "", timestamp: "2081-05-05 08:00:00", details: "User logged in" },
];
