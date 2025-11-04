import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true); // 🔹 để hiển thị spinner trong lúc kiểm tra session

    // ✅ Khi vừa vào trang Login → kiểm tra xem đã đăng nhập chưa
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get("http://localhost:1234/api/auth/current-user", {
                    withCredentials: true,
                });
                if (res.data.code === 200) {
                    const user = res.data.data;
                    // 🔹 Nếu đã có session → chuyển đến trang tương ứng
                    if (user.role === "ADMIN") {
                        navigate("/admin");
                    } else {
                        navigate("/home");
                    }
                }
            } catch (err) {
                console.log("Chưa đăng nhập, ở lại trang login.");
            } finally {
                setLoading(false);
            }
        };
        checkLoginStatus();
    }, [navigate]);

    // ✅ Xử lý đăng nhập
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:1234/api/auth/login",
                { username, password },
                { withCredentials: true }
            );

            if (response.data.code === 200) {
                const user = response.data.data;

                // ✅ Kiểm tra role thống nhất kiểu chữ
                if (user.role === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/home");
                }
            } else {
                setError(response.data.message || "Đăng nhập thất bại");
            }
        } catch (err) {
            setError("Sai tên đăng nhập hoặc mật khẩu");
        }
    };


    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center vh-100">
                <Spinner animation="border" />
                <p className="mt-2">Đang kiểm tra phiên đăng nhập...</p>
            </div>
        );
    }

    return (
        <>
            <NavbarComponent />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card className="shadow-lg p-4 rounded-4">
                            <h3 className="text-center mb-4 fw-bold">Đăng nhập</h3>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên đăng nhập</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button type="submit" variant="primary" className="w-100 rounded-3 fw-semibold">
                                    Đăng nhập
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default LoginPage;
