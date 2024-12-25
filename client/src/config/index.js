import {
  FaBook,
  FaQuestionCircle,
  FaFileAlt,
  FaChalkboardTeacher,
  FaLightbulb,
  FaUser,
  FaSignOutAlt,
  FaEnvelope,
  FaComment,
  FaExclamationTriangle,
} from "react-icons/fa";
import { IoSchool } from "react-icons/io5";

export const loginForm = [
  {
    type: "email",
    name: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
];

export const registerForm = [
  {
    type: "text",
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
  {
    type: "email",
    name: "email",
    label: "Email Address",
    placeholder: "Enter your valid email",
    required: true,
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter a strong password",
    required: true,
  },
  {
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your password",
    required: true,
  },
];

export const studentInfoForm = [
  {
    name: "mobile",
    label: "Mobile Number",
    placeholder: "Enter your mobile number here",
    componentType: "input",
    type: "number",
  },
  {
    name: "verification",
    label: "OTP Verification",
    placeholder: "Enter the OTP sent to your number",
    componentType: "input",
    type: "number",
  },
  {
    name: "dob",
    label: "Date Of Birth",
    placeholder: "Enter your DOB",
    componentType: "input",
    type: "date",
  },
  {
    name: "board",
    label: "Board of Education",
    placeholder: "Enter your board here",
    componentType: "input",
    type: "text",
  },
  {
    name: "class",
    label: "Class",
    placeholder: "Select your class",
    componentType: "select",
    options: ["9th", "10th", "11th", "12th"],
  },
  {
    name: "stream",
    label: "Stream",
    placeholder: "Select your stream",
    componentType: "select",
    options: ["Science", "Commerce"],
  },
  {
    name: "medium",
    label: "medium",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const forgotPasswordForm = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email address here",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "mobile",
    label: "Mobile",
    placeholder: "Enter your mobile number here",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "otp",
    label: "OTP",
    placeholder: "Enter the OTP sent to your email or mobile",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "newPassword",
    label: "New Password",
    placeholder: "Enter your new password",
    componentType: "input",
    type: "password",
    required: true,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter your new password",
    componentType: "input",
    type: "password",
    required: true,
  },
];

export const navigationLinksDesktop = [
  { label: "Courses", link: "/courses", icon: <FaBook /> },
  { label: "Quiz", link: "/quiz", icon: <FaQuestionCircle /> },
  { label: "Notes", link: "/notes", icon: <FaFileAlt /> },
  { label: "Tuitions", link: "/tuitions", icon: <FaChalkboardTeacher /> },
  { label: "Career Guidance", link: "/career-guidance", icon: <FaLightbulb /> },
];
export const navigationLinksMoreItems = [
  { label: "My Profile", link: "/profile", icon: <FaUser /> },
  { label: "Question Paper", link: "/question-paper", icon: <FaFileAlt /> },
  { label: "Scholarship", link: "/scholarship", icon: <IoSchool /> },
  { label: "Logout", link: "/logout", icon: <FaSignOutAlt /> },
];

export const navigationLinksMobile = [
  { label: "Courses", link: "/courses", icon: <FaBook /> },
  { label: "Quiz", link: "/quiz", icon: <FaQuestionCircle /> },
  { label: "Notes", link: "/notes", icon: <FaFileAlt /> },
  { label: "Tuitions", link: "/tuitions", icon: <FaChalkboardTeacher /> },
  { label: "Career Guidance", link: "/career-guidance", icon: <FaLightbulb /> },
  { label: "Scholarship", link: "/scholarship", icon: <IoSchool /> },
  { label: "Question Paper", link: "/question-paper", icon: <FaFileAlt /> },
  { label: "My Profile", link: "/profile", icon: <FaUser /> },
  { label: "Logout", link: "/logout", icon: <FaSignOutAlt /> },
];

// Notifications Example
export const notificationItems = [
  {
    title: "New Message",
    description: "This is a New Message from Shree Kalam Academy",
    icon: <FaEnvelope />,
    link: "/messages",
  },
  {
    title: "New Comment",
    description: "This is a New Comment from Shree Kalam Academy",
    icon: <FaComment />,
    link: "/comments",
  },
  {
    title: "Server Alert",
    description: "This is a Server Alert from Shree Kalam Academy",
    icon: <FaExclamationTriangle />,
    link: "/alerts",
  },
  {
    title: "Server Alert",
    description: "This is a Server Alert from Shree Kalam Academy",
    icon: <FaExclamationTriangle />,
    link: "/alerts",
  },
];

export const sliderImages = [
  {
    src: "https://plus.unsplash.com/premium_photo-1672256330854-98c717493128?q=80&w=2669&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 1",
    link: "/home",
  },
  {
    src: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 2",
    link: "/home",
  },
  {
    src: "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 3",
    link: "/home",
  },
  {
    src: "https://images.unsplash.com/photo-1601397922721-4326ae07bbc5?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 4",
    link: "/home",
  },
  {
    src: "https://images.unsplash.com/photo-1509869175650-a1d97972541a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 5",
    link: "/home",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1724800663657-3e57bf4f622c?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Image 6",
    link: "/home",
  },
];

// Course card configurations:
export const courses = [
  {
    thumbnail: "https://via.placeholder.com/300x180",
    title: "SSC MATHEMATICS 5100+ Questions",
    instructor: "By RAMO SIR",
    details: [
      "Statistics & Probability included",
      "11 Practice sets for SSC CGL Tier - II (On New Pattern)",
    ],
    notesType: "NOTES COMBO",
    validity: "Valid for 18 months",
    price: 499,
    originalPrice: 999,
    discount: "50% OFF TILL 31 DEC",
  },
  {
    thumbnail: "https://via.placeholder.com/300x180",
    title: "Logical Reasoning for Competitive Exams",
    instructor: "By Vikram Singh",
    details: [
      "500+ logical reasoning problems solved",
      "Shortcut techniques and tricks included",
    ],
    notesType: "VIDEO",
    validity: "Valid for 6 months",
    price: 299,
    originalPrice: 599,
    discount: "50% OFF TILL 31 DEC",
  },
  {
    thumbnail: "https://via.placeholder.com/300x180",
    title: "General Science for SSC",
    instructor: "By Shyam Sir",
    details: [
      "Physics, Chemistry, and Biology covered",
      "10 Practice Sets for SSC Exams",
    ],
    notesType: "NOTES COMBO",
    validity: "Valid for 12 months",
    price: 599,
    originalPrice: 1099,
    discount: "45% OFF TILL 31 DEC",
  },
  {
    thumbnail: "https://via.placeholder.com/300x180",
    title: "English Grammar Mastery",
    instructor: "By Anjali Mam",
    details: [
      "Comprehensive grammar topics covered",
      "Practice sets for error detection and corrections",
    ],
    notesType: "VIDEO + NOTES",
    validity: "Valid for 12 months",
    price: 399,
    originalPrice: 899,
    discount: "55% OFF TILL 31 DEC",
  },
  {
    thumbnail: "https://via.placeholder.com/300x180",
    title: "Logical Reasoning for Competitive Exams",
    instructor: "By Vikram Singh",
    details: [
      "500+ logical reasoning problems solved",
      "Shortcut techniques and tricks included",
    ],
    notesType: "VIDEO",
    validity: "Valid for 6 months",
    price: 299,
    originalPrice: 599,
    discount: "50% OFF TILL 31 DEC",
  },
  {
    thumbnail: "https://via.placeholder.com/300x180",
    title: "Computer Awareness for Banking Exams",
    instructor: "By Suresh Kumar",
    details: [
      "Covers computer basics, networking, and cybersecurity",
      "Practice sets based on latest banking exam patterns",
    ],
    notesType: "NOTES COMBO",
    validity: "Valid for 9 months",
    price: 499,
    originalPrice: 999,
    discount: "50% OFF TILL 31 DEC",
  },
  {
    thumbnail: "https://via.placeholder.com/300x180",
    title: "Logical Reasoning for Competitive Exams",
    instructor: "By Vikram Singh",
    details: [
      "500+ logical reasoning problems solved",
      "Shortcut techniques and tricks included",
    ],
    notesType: "VIDEO",
    validity: "Valid for 6 months",
    price: 299,
    originalPrice: 599,
    discount: "50% OFF TILL 31 DEC",
  },
];
