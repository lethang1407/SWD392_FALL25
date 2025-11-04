import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const NavbarComponent = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // 🔹 Kiểm tra session mỗi khi load trang hoặc chuyển route
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const res = await axios.get("http://localhost:1234/api/auth/current-user", {
                    withCredentials: true,
                });
                if (res.data.code === 200) {
                    setUser(res.data.data);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            }
        };
        fetchCurrentUser();
    }, [location]);

    // 🔹 Xử lý logout
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:1234/api/auth/logout", {}, { withCredentials: true });
            setUser(null);
            navigate("/home");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    // 🔹 Kiểm tra nếu đang ở trang login
    const isLoginPage = location.pathname === "/login";

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/home")}
                >
                    🎟️ Booking Movie
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    {/* ❌ Nếu đang ở /login → không hiển thị phần Nav */}
                    {!isLoginPage && (
                        <Nav>
                            {user ? (
                                <>
                                    <Navbar.Text className="me-3 text-light">
                                        👋 Xin chào, <strong>{user.username}</strong>
                                    </Navbar.Text>

                                    {user.role === "ADMIN" && (
                                        <Button
                                            variant="outline-info"
                                            className="me-2"
                                            onClick={() => navigate("/admin")}
                                        >
                                            Trang quản trị
                                        </Button>
                                    )}

                                    <Button variant="outline-light" onClick={handleLogout}>
                                        Đăng xuất
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="outline-light"
                                    onClick={() => navigate("/login")}
                                >
                                    Đăng nhập
                                </Button>
                            )}
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;
