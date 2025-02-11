import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/LandingPage";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import Enrollment from "./pages/Enrollment";
import { Toaster } from "./components/Toaster";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Slider from "./ui/slider";
import CourseDetail from "./pages/CourseDetails";
import QuizAndNotesDetails from "./components/CourseInfo";
import AddCourseForm from "./pages/admin/AddCourseForm";
import Video from "./pages/Video";
import HomeAdmin from "./pages/admin/HomeAdmin";
import CoursesAdmin from "./components/CourseAdminSidebar";
import CourseAdminLayout from "./layouts/CourseAdminLayout";
import CourseAdminDashboard from "./pages/admin/CourseDashboard";
import AddCoursePage from "./pages/admin/AddCoursePage";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <Navbar /> */}
        <main className="flex-grow">
          {/* This ensures toasts are shown across all pages */}
          <Toaster />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/coursedetail" element={<CourseDetail />} />

            {/* Admin Pages */}
            <Route path="/admin" element={<HomeAdmin />} />
            {/* Course Management Section */}
            <Route path="/admin/course" element={<CourseAdminLayout />}>
              <Route index element={<CourseAdminDashboard />} />
              <Route path="create" element={<AddCoursePage />} />
              <Route path="update" element={<AddCourseForm />} />
              {/* <Route path="delete" element={<DeleteCourse />} /> */}
            </Route>

            {/* Route used for dedicated page of component testing */}
            <Route path="/testing" element={<Video />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
