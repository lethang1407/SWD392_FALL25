import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

function CinemaManagementPage() {
    const [cinemas, setCinemas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingCinema, setEditingCinema] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        province: "",
    });

    // 🔹 Lấy danh sách rạp
    const fetchCinemas = async () => {
        try {
            const res = await axios.get("http://localhost:1234/api/cinemas");
            setCinemas(res.data);
        } catch (error) {
            console.error("Error fetching cinemas:", error);
        }
    };

    useEffect(() => {
        fetchCinemas();
    }, []);

    // 🔹 Mở modal thêm/sửa
    const handleShowModal = (cinema = null) => {
        if (cinema) {
            setEditingCinema(cinema);
            setFormData({
                name: cinema.name,
                province: cinema.province,
            });
        } else {
            setEditingCinema(null);
            setFormData({ name: "", province: "" });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    // 🔹 Thay đổi form input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Gửi form thêm/sửa
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCinema) {
                await axios.put(`http://localhost:1234/api/cinemas/${editingCinema.id}`, formData);
            } else {
                await axios.post("http://localhost:1234/api/cinemas", formData);
            }
            fetchCinemas();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving cinema:", error);
        }
    };

    // 🔹 Xóa rạp
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa rạp này không?")) {
            try {
                await axios.delete(`http://localhost:1234/api/cinemas/${id}`);
                fetchCinemas();
            } catch (error) {
                console.error("Error deleting cinema:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">🎬 Quản lý Rạp chiếu</h2>
            <div className="text-end mb-3">
                <Button variant="primary" onClick={() => handleShowModal()}>
                    ➕ Thêm Rạp
                </Button>
            </div>

            <Table bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Tên rạp</th>
                        <th>Thành phố</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {cinemas.map((cinema) => (
                        <tr key={cinema.id}>
                            <td>{cinema.id}</td>
                            <td>{cinema.name}</td>
                            <td>{cinema.province}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleShowModal(cinema)}
                                >
                                    ✏️ Sửa
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(cinema.id)}
                                >
                                    🗑️ Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal thêm/sửa */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingCinema ? "Cập nhật Rạp" : "Thêm Rạp mới"}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên rạp</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Thành phố</Form.Label>
                            <Form.Control
                                type="text"
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Hủy
                        </Button>
                        <Button variant="success" type="submit">
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default CinemaManagementPage;
