import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
import AdminPage from "./page/AdminPage";
import AdminRoute from "./routes/AdminRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:1234/api/auth/current-user", {
          withCredentials: true,
        });
        if (res.data.code === 200) {
          setUser(res.data.data);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <p>Đang kiểm tra đăng nhập...</p>;

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage user={user} />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminPage user={user} />
            </AdminRoute>
          }
        />

        <Route path="*" element={<HomePage user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
