import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import PrivateRoute from "./components/Routing/PrivateRoute";
import Header from "./components/GeneralScreens/Header";
import Footer from "./components/GeneralScreens/Footer";
import ScrollToTop from "./components/UI/ScrollToTop";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import SolutionsPage from "./pages/SolutionsPage";
import PortfolioPage from "./pages/PortfolioPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogPage from "./pages/BlogPage";
import MyStoriesPage from "./pages/MyStoriesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LegalPage from "./pages/LegalPage";

import LoginScreen from "./components/AuthScreens/LoginScreen";
import RegisterScreen from "./components/AuthScreens/RegisterScreen";
import ForgotPasswordScreen from "./components/AuthScreens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/AuthScreens/ResetPasswordScreen";

import AddStory from "./components/StoryScreens/AddStory";
import DetailStory from "./components/StoryScreens/DetailStory";
import EditStory from "./components/StoryScreens/EditStory";
import Profile from "./components/ProfileScreens/Profile";
import EditProfile from "./components/ProfileScreens/EditProfile";
import ChangePassword from "./components/ProfileScreens/ChangePassword";
import ReadListPage from "./components/ProfileScreens/ReadListPage";
import NotFound from "./components/GeneralScreens/NotFound";

const LayoutsWithHeader = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const App = () => (
  <Router>
    <ScrollToTop />
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutsWithHeader />}>
          {/* Agency & Publication Routes */}
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="portfolio/:slug" element={<ProjectDetailPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<DetailStory />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<LegalPage type="privacy" />} />
          <Route path="terms" element={<LegalPage type="terms" />} />

          {/* Preserved Story & User Routes */}
          <Route path="story/:slug" element={<DetailStory />} />

          <Route element={<PrivateRoute />}>
            <Route path="my-stories" element={<MyStoriesPage />} />
            <Route path="addstory" element={<AddStory />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit_profile" element={<EditProfile />} />
            <Route path="change_Password" element={<ChangePassword />} />
            <Route path="change_password" element={<ChangePassword />} />
            <Route path="story/:slug/like" element={<DetailStory />} />
            <Route path="story/:slug/edit" element={<EditStory />} />
            <Route path="story/:slug/delete" element={<DetailStory />} />
            <Route path="story/:slug/addComment" element={<DetailStory />} />
            <Route path="readList" element={<ReadListPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Standalone Auth Routes */}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
        <Route path="/resetpassword" element={<ResetPasswordScreen />} />
      </Routes>
    </div>
  </Router>
);

export default App;
