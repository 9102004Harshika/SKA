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
import AddQuotesPage from "./pages/admin/AddQuotesPage";
import Video from "./pages/Video";
import NotesAdminLayout from "./layouts/NotesAdminLayout";
import CourseAdminDashboard from "./pages/admin/CourseDashboard";
import MainLayout from "./layouts/MainLayout";

import NotFound from "./pages/NotFound";
import Unauth from "./pages/Unauth";
import AddNotes from "./pages/admin/notes/AddNotes";
import UpdateNotesPage from "./pages/admin/UpdateNotesPage";
import Notes from "./pages/Notes";
import Modal from "./components/Modal";
import DeleteNotesPage from "./pages/admin/DeleteNotesPage";
import EditNotesPage from "./pages/admin/EditNotesPage";
import PdfViewer from "./components/PdfViewer";
import NotesDetail from "./pages/NotesDetail";
import FeatureAdminLayout from "./layouts/FeatureAdminLayout";
import AddCarouselPage from "./pages/admin/AddCarouselPage";
import Quiz from "./pages/Quiz";
import UpdateCoursePage from "./pages/admin/UpdateCoursePage";
import DeleteCourse from "./pages/admin/DeleteCoursePage";
import EditCoursesPage from "./pages/admin/EditCoursesPage";
import AnimatedBook from "./components/BookLoader";
import ProtectedRoute from "./components/ProtectedRoute";
import InstructorPage from "./pages/admin/InstructorPage";
import InstructorDetails from "./pages/admin/InstructorDetails";
import InstructorAdminLayout from "./layouts/InstructorAdminLayout";
import AddInstructorPage from "./pages/admin/AddInstructorPage";
import RedirectToRole from "./components/RedirectToRole";
import WelcomeScreen from "./pages/WelcomeScreen";
import AdminLayout from "./layouts/AdminLayout";
import CourseDashboard from "./pages/admin/course/CourseDashboard";
import SalesDashboard from "./pages/admin/sales/SalesDashboard";
import QuizDashboard from "./pages/admin/quiz/QuizDashboard";
import AddQuiz from "./pages/admin/quiz/AddQuiz";
import Teachers from "./pages/admin/teachers/Teachers";
import { Settings } from "lucide-react";
import NotesDashboard from "./pages/admin/notes/NotesDashboard";
import QuizApp from "./pages/QuizApp";
import FAQ from "./pages/footer/FAQ";
import PrivacyPolicy from "./pages/footer/PrivacyPolicy";
import TermsAndConditions from "./pages/footer/TermsAndConditions";
import ContactUs from "./pages/footer/ContactUs";
import Developers from "./pages/footer/Developers";
import AboutUs from "./pages/footer/AboutUs";
import UpdateQuiz from "./pages/admin/quiz/UpdateQuiz";
import UpdateNotes from "./pages/admin/notes/UpdateNotes";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-body">
        <main className="flex-grow">
          <Toaster />
          <Routes>
            <Route path="/" element={<RedirectToRole />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />

            {/* Protected App Routes */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="videoPlayer" element={<Video />} />
              <Route path="courses" element={<Courses />} />
              <Route path="quiz" element={<Quiz />} />
              <Route path="notes" element={<Notes />} />
              <Route path="notes/:id" element={<NotesDetail />} />
              <Route path="coursedetail/:id" element={<CourseDetail />} />
              <Route path="quizapp" element={<QuizApp />} />

              <Route path="faq" element={<FAQ />} />
              <Route
                path="terms-and-conditions"
                element={<TermsAndConditions />}
              />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="developers" element={<Developers />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="about-us" element={<AboutUs />} />
            </Route>

            {/*Admin Routes here */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<SalesDashboard />} />
              <Route path="course" element={<CourseDashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="teachers" element={<Teachers />} />
              <Route path="quiz">
                <Route index element={<QuizDashboard />} />
                <Route path="add" element={<AddQuiz />} />
                <Route path="update/:id" element={<UpdateQuiz />} />

              </Route>
              <Route path="notes">
                <Route index element={<NotesDashboard />} />
                <Route path="add" element={<AddNotes />} />
                {/* <Route path="update/:id" element={<UpdateNotes />} /> */}



              </Route>

              {/* <Route path="instructor" element={<InstructorAdminLayout />}>
                <Route index element={<InstructorPage />} />
                <Route path=":id" element={<InstructorDetails />} />
                <Route path="add" element={<AddInstructorPage />} />
                <Route path="edit/:id" element={<EditCoursesPage />} />
                <Route path="delete" element={<DeleteCourse />} />
              </Route> */}

              {/* <Route path="feature" element={<FeatureAdminLayout />}>
                <Route index element={<AddCarouselPage />} />
                <Route path="quote" element={<AddQuotesPage />} />
              </Route> */}

              {/* <Route path="notes" element={<NotesAdminLayout />}>
                <Route index element={<NotesDashboard />} />
                <Route path="create" element={<AddNotesPage />} />
                <Route path="update" element={<UpdateNotesPage />} />
                <Route path="edit/:id" element={<EditNotesPage />} />
                <Route path="delete" element={<DeleteNotesPage />} />
              </Route> */}
            </Route>
             <Route path="test/:id" element={<UpdateNotes />} />
            <Route path="/pdfViewer" element={<PdfViewer />} />
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/unauth" element={<Unauth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
