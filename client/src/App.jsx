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
import CourseDetail from "./pages/CourseDetails";
import QuizAndNotesDetails from "./components/CourseInfo";
import AddCoursePage from "./pages/admin/AddCoursePage";
import Video from "./pages/Video";
import HomeAdmin from "./pages/admin/HomeAdmin";
import NotesAdminLayout from "./layouts/NotesAdminLayout";
import CourseAdminLayout from "./layouts/CourseAdminLayout";
import CourseAdminDashboard from "./pages/admin/CourseDashboard";
import MainLayout from "./layouts/MainLayout";
import TermsConditions from "./components/Terms&Conditions";
import NotFound from "./pages/NotFound";
import Unauth from "./pages/Unauth";
import AddNotesPage from "./pages/admin/AddNotesPage";
import UpdateNotesPage from "./pages/admin/UpdateNotesPage";
import Notes from "./pages/Notes";
import CircularProgress from "./ui/progressBar";
import Modal from "./components/Modal";
import DeleteNotesPage from "./pages/admin/DeleteNotesPage";
import NotesDashboard from "./pages/admin/NotesDashboard";
import EditNotesPage from "./pages/admin/EditNotesPage";
import PdfViewer from "./components/PdfViewer";
import NotesDetail from "./pages/NotesDetail";
import FeatureAdminLayout from "./layouts/FeatureAdminLayout";
import AddCarouselPage from "./pages/admin/AddCarouselPage";
import Quiz from "./pages/Quiz";
import UpdateCourse from "./pages/admin/UpdateCoursePage";
import DeleteCourse from "./pages/admin/DeleteCoursePage";
import UpdateCoursePage from "./pages/admin/UpdateCoursePage";
import EditCoursesPage from "./pages/admin/EditCoursesPage";
import AnimatedBook from "./components/BookLoader";
const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-body">
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

            <Route path="/app/pdfViewer" element={<PdfViewer />} />
            {/* Users pages after auth  */}
            <Route path="/app" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="courses" element={<Courses />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="notes" element={<Notes />} />
              <Route path="notes/:id" element={<NotesDetail />} />
              <Route
                path="coursedetail/:id"
                element={<CourseDetail />}
                caseSensitive
              />
            </Route>

            {/* Admin Pages */}
            <Route path="/admin" element={<HomeAdmin />} />
            {/* Course Management Section */}
            <Route path="/admin/course" element={<CourseAdminLayout />}>
              <Route index element={<CourseAdminDashboard />} />
              <Route path="create" element={<AddCoursePage />} />
              <Route path="update" element={<UpdateCoursePage />} />
              <Route path="edit/:id" element={<EditCoursesPage />} />
              <Route path="delete" element={<DeleteCourse />} />
              {/* <Route path="delete" element={<DeleteCourse />} /> */}
            </Route>
            <Route path="/admin/feature" element={<FeatureAdminLayout />}>
              <Route index element={<AddCarouselPage />} />
              {/* <Route path="create" element={<AddCoursePage />} /> */}
            </Route>

            {/* notes section of admin */}
            <Route path="/admin/notes" element={<NotesAdminLayout />}>
              <Route index element={<NotesDashboard />} />
              <Route path="create" element={<AddNotesPage />} />
              <Route path="update" element={<UpdateNotesPage />} />
              <Route path="edit/:id" element={<EditNotesPage />} />
              <Route path="delete" element={<DeleteNotesPage />} />
            </Route>

            <Route path="/unauth" element={<Unauth />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="*" element={<NotFound />} />

            {/* Route used for dedicated page of component testing */}
            <Route
              path="/testing"
              element={
               <AnimatedBook/>
              }
            />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
