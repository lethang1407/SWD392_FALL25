import React, { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import MovieManagement from "./MovieManagementPage";
import CinemaManagementPage from "./CinemaManagementPage"
import ShowtimeManagementPage from "./ShowtimeManagementPage"
import { Button, Container, Row, Col, Card } from "react-bootstrap";

function AdminPage() {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div>
            <NavbarComponent />
            <Container fluid className="mt-4">
                <Row>
                    {/* --- Sidebar --- */}
                    <Col md={3} lg={2} className="bg-light border-end min-vh-100 p-3">
                        <h5 className="text-center mb-4">⚙️ Quản trị viên</h5>
                        <div className="d-grid gap-2">
                            <Button
                                variant={activeTab === "dashboard" ? "primary" : "outline-primary"}
                                onClick={() => setActiveTab("dashboard")}
                            >
                                Trang chính
                            </Button>
                            <Button
                                variant={activeTab === "movie" ? "primary" : "outline-primary"}
                                onClick={() => setActiveTab("movie")}
                            >
                                🎬 Quản lý phim
                            </Button>
                            <Button
                                variant={activeTab === "cinema" ? "primary" : "outline-primary"}
                                onClick={() => setActiveTab("cinema")}
                            >
                                🏢 Quản lý rạp
                            </Button>
                            <Button
                                variant={activeTab === "showtime" ? "primary" : "outline-primary"}
                                onClick={() => setActiveTab("showtime")}
                            >
                                🕒 Quản lý suất chiếu
                            </Button>
                            <Button
                                variant={activeTab === "seat" ? "primary" : "outline-primary"}
                                onClick={() => setActiveTab("seat")}
                            >
                                💺 Quản lý ghế
                            </Button>
                        </div>
                    </Col>

                    {/* --- Nội dung chính --- */}
                    <Col md={9} lg={10} className="p-4">
                        {activeTab === "dashboard" && (
                            <Card className="p-4 text-center">
                                <h3>Chào mừng đến trang quản trị 🎉</h3>
                                <p>Chọn một mục trong menu bên trái để quản lý hệ thống.</p>
                            </Card>
                        )}

                        {activeTab === "movie" && <MovieManagement />}

                        {activeTab === "cinema" && <CinemaManagementPage />}

                        {activeTab === "showtime" && <ShowtimeManagementPage />}

                        {activeTab === "seat" && (
                            <Card className="p-4 text-center">
                                <h4>💺 Quản lý ghế (đang phát triển)</h4>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default AdminPage;
