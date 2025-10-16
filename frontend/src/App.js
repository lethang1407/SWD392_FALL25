import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import YourBooking from "./pages/YourBooking";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import BookingDashboard from "./pages/BookingDashboard";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetailsPage />} />
        <Route path="/your-booking/:id" element={<YourBooking />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<UserDashboard />} />
        <Route path="/dashboard/booking" element={<BookingDashboard />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
