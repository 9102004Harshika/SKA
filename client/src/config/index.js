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
  { label: "Courses", link: "/courses" },
  { label: "Quiz", link: "/quiz" },
  { label: "Notes", link: "/notes" },
  { label: "Tuitions", link: "/tuitions" },
  { label: "Career Guidance", link: "/career-guidance" },
];
export const navigationLinksMobile = [
  { label: "Courses", link: "/courses" },
  { label: "Quiz", link: "/quiz" },
  { label: "Notes", link: "/notes" },
  { label: "Tuitions", link: "/tuitions" },
  { label: "Career Guidance", link: "/career-guidance" },
  { label: "Scholarship", link: "/scholarship" },
  { label: "Question Paper", link: "/question-paper" },
];
