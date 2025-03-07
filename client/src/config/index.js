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
  { label: "Courses", link: "/app/courses", icon: <FaBook /> },
  { label: "Quiz", link: "/app/quiz", icon: <FaQuestionCircle /> },
  { label: "Notes", link: "/app/notes", icon: <FaFileAlt /> },
  { label: "Tuitions", link: "/app/tuitions", icon: <FaChalkboardTeacher /> },
  {
    label: "Career Guidance",
    link: "/app/career-guidance",
    icon: <FaLightbulb />,
  },
];
export const navigationLinksMoreItems = [
  { label: "My Profile", link: "/app/profile", icon: <FaUser /> },
  { label: "Question Paper", link: "/app/question-paper", icon: <FaFileAlt /> },
  { label: "Scholarship", link: "/app/scholarship", icon: <IoSchool /> },
  { label: "Logout", link: "/app/logout", icon: <FaSignOutAlt /> },
];

export const navigationLinksMobile = [
  { label: "Courses", link: "/app/courses", icon: <FaBook /> },
  { label: "Quiz", link: "/app/quiz", icon: <FaQuestionCircle /> },
  { label: "Notes", link: "/app/notes", icon: <FaFileAlt /> },
  { label: "Tuitions", link: "/app/tuitions", icon: <FaChalkboardTeacher /> },
  {
    label: "Career Guidance",
    link: "/app/career-guidance",
    icon: <FaLightbulb />,
  },
  { label: "Scholarship", link: "/app/scholarship", icon: <IoSchool /> },
  { label: "Question Paper", link: "/app/question-paper", icon: <FaFileAlt /> },
  { label: "My Profile", link: "/app/profile", icon: <FaUser /> },
  { label: "Logout", link: "/app/logout", icon: <FaSignOutAlt /> },
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

// export const sliderImages = [
//   {
//     src: "https://images.hdqwalls.com/download/pixel-art-2-pic-1280x720.jpg",
//     alt: "Image 1",
//     link: "/coursedetail",
//   },
//   {
//     src: "https://th.bing.com/th/id/OIP.BivozdbfNtrq5pzGpmyAvgHaEK?rs=1&pid=ImgDetMain",
//     alt: "Image 2",
//     link: "/coursedetail",
//   },
//   {
//     src: "https://th.bing.com/th/id/OIP.RxYDgZrJHBxz2Uetp5e_BwHaEK?rs=1&pid=ImgDetMain",
//     alt: "Image 3",
//     link: "/coursedetail",
//   },
//   {
//     src: "https://images.wallpaperscraft.com/image/single/triangles_multicolored_pixels_122612_1280x720.jpg",
//     alt: "Image 4",
//     link: "/coursedetail",
//   },
//   {
//     src: "https://images.hdqwalls.com/download/8-bit-pixel-art-city-2o-1280x720.jpg",
//     alt: "Image 5",
//     link: "/coursedetail",
//   },
// ];

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

// CourseMaterial
export const courseMaterialConfig = [
  {
    notes: {
      name: "Course Notes",
      description:
        "Detailed notes covering entire course topics, including fundamental concepts, examples, and exercises. These notes are designed to provide an in-depth understanding of the chapter and include diagrams, key formulas, and real-world applications to enhance learning.",
      link: "https://example.com/notes/chapter1",
      image:
        "https://marketplace.canva.com/EAFh7bSCs1U/1/0/1131w/canva-brown-aesthetic-minimalist-note-book-cover-page-a4-document-yhk3SDUOdz8.jpg",
    },
    quizzes: {
      name: "Course Quizzes",
      description:
        "Test your knowledge of Chapter 1 with this comprehensive quiz. It features a variety of question formats, including multiple choice, true/false, and short answer, to ensure a thorough assessment of your understanding. The quiz also includes detailed explanations for each answer to help you learn and improve.",
      link: "https://example.com/quiz/chapter1",
      image:
        "https://quizquizquiz.com/wp-content/uploads/2022/09/Pub-Quiz-Book-cover-page-225x300.png", // Example image URL for quiz
    },
    instructor: {
      name: "Rahul Singh", // Example name, replace with actual name
      photo:
        "https://insidesources.com/wp-content/uploads/2020/03/bigstock-Portrait-Of-A-Young-Male-Teach-324671239-e1584700649236.jpg",
      bio: "Rahul Singh is a dedicated educator and a highly respected computer science professional. With over a decade of teaching experience, Rahul has helped thousands of students build strong foundations in programming, algorithms, and data structures. He specializes in making complex topics simple and accessible to learners of all levels. In addition to teaching, he has contributed to several open-source projects and regularly speaks at industry conferences. Rahul's teaching philosophy emphasizes hands-on learning and real-world problem solving, ensuring that students are well-equipped for their academic and professional journeys.",
      education: "PhD in Mathematics",
      role: "Maths Teacher",
      experience: "10+ years",
    },
    videos: [
      {
        title: "Introduction to Chapter 1",
        link: "https://example.com/videos/chapter1-intro",
        time: "1 hour",
      },
      {
        title: "Key Formulas and Applications",
        link: "https://example.com/videos/chapter1-formulas",
        time: "2 hour",
      },
      {
        title: "Problem Solving Techniques",
        link: "https://example.com/videos/chapter1-problems",
        time: "1 hour",
      },
    ],
    reviews: [
      {
        reviewerName: "John Doe",
        rating: 5,
        comment: "Excellent course! Highly recommend it.",
      },
      {
        reviewerName: "Jane Smith",
        rating: 4,
        comment: "Great content, but could use more examples.",
      },
      {
        reviewerName: "Harshika Gawade",
        rating: 5,
        comment: "Great content, but could use more examples.",
      },
    ],
  },
];

export const boards = [
  "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)",
  "International General Certificate of Secondary Education (IGCSE)",
  "Indian Certificate of Secondary Education (ICSE)",
  "Central Board of Secondary Education (CBSE)",
  "International Baccalaureate (IB)",
];

export const getClassOptions = (selectedBoard) => {
  switch (selectedBoard) {
    case "International General Certificate of Secondary Education (IGCSE)":
    case "International Baccalaureate (IB)":
      return ["7th", "8th", "9th", "10th", "11th", "12th"];
    case "Central Board of Secondary Education (CBSE)":
    case "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)":
      return ["9th", "10th", "11th", "12th"];
    case "Indian Certificate of Secondary Education (ICSE)":
      return ["8th", "9th", "10th", "11th", "12th"];
    default:
      return [];
  }
};
export const getSubjects = (selectedClass, selectedStream) => {
  if (parseInt(selectedClass) > 0 && parseInt(selectedClass) <= 10) {
    return ["English", "Maths", "History", "Geography", "Science"];
  } else if (selectedStream === "Commerce") {
    return ["Statistics", "English", "Maths"];
  } else if (selectedStream === "Science") {
    return ["Algebra", "Geometry", "Physics", "Chemistry", "Maths"];
  }
  return [];
};
export const subjects = ["Maths", "Chemistry", "Physics"];
export const streams = ["Commerce", "Science"];
export const category = ["One Shot", "Full Video"];
