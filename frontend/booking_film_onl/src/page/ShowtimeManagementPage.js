import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

function ShowtimeManagementPage() {
    const [showtimes, setShowtimes] = useState([]);
    const [movies, setMovies] = useState([]);
    const [auditoriums, setAuditoriums] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingShowtime, setEditingShowtime] = useState(null);
    const [formData, setFormData] = useState({
        movieId: "",
        auditoriumId: "",
        startAt: "",
        endAt: "",
        status: "AVAILABLE",
    });

    // ✅ Load dữ liệu từ API
    useEffect(() => {
        fetchShowtimes();
        fetchMovies();
        fetchAuditoriums();
    }, []);

    const fetchShowtimes = async () => {
        const res = await axios.get("http://localhost:1234/api/showtimes");
        setShowtimes(res.data);
    };

    const fetchMovies = async () => {
        const res = await axios.get("http://localhost:1234/api/movies/infor");
        setMovies(res.data);
    };

    const fetchAuditoriums = async () => {
        const res = await axios.get("http://localhost:1234/api/auditoriums");
        setAuditoriums(Array.isArray(res.data) ? res.data : []);
    };

    // ✅ Mở modal thêm/sửa suất chiếu
    const handleShowModal = (showtime = null) => {
        if (showtime) {
            const movie = movies.find((m) => m.title === showtime.movieTitle);
            const auditorium = auditoriums.find((a) => a.name === showtime.auditoriumName);

            setEditingShowtime(showtime);
            setFormData({
                movieId: movie ? movie.id : "",
                auditoriumId: auditorium ? auditorium.id : "",
                startAt: showtime.startAt,
                endAt: showtime.endAt,
                status: showtime.status,
            });
        } else {
            setEditingShowtime(null);
            setFormData({
                movieId: "",
                auditoriumId: "",
                startAt: "",
                endAt: "",
                status: "AVAILABLE",
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // ✅ Gửi dữ liệu tạo mới / cập nhật
    const handleSubmit = async () => {
        const payload = {
            movieId: Number(formData.movieId),
            auditoriumId: Number(formData.auditoriumId),
            startAt: formData.startAt,
            endAt: formData.endAt,
            status: formData.status,
        };

        if (editingShowtime) {
            await axios.put(`http://localhost:1234/api/showtimes/${editingShowtime.id}`, payload);
        } else {
            await axios.post("http://localhost:1234/api/showtimes", payload);
        }

        fetchShowtimes();
        handleCloseModal();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa suất chiếu này không?")) {
            await axios.delete(`http://localhost:1234/api/showtimes/${id}`);
            fetchShowtimes();
        }
    };

    return (
        <div>
            <div className="container mt-4">
                <h2 className="text-center mb-4">🎬 Quản lý Suất Chiếu</h2>
                <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
                    ➕ Thêm suất chiếu
                </Button>

                <Table bordered hover responsive>
                    <thead className="table-dark text-center">
                        <tr>
                            <th>ID</th>
                            <th>Phim</th>
                            <th>Phòng chiếu</th>
                            <th>Bắt đầu</th>
                            <th>Kết thúc</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {showtimes.length > 0 ? (
                            showtimes.map((st) => (
                                <tr key={st.id}>
                                    <td>{st.id}</td>
                                    <td>{st.movieTitle}</td>
                                    <td>{st.auditoriumName}</td>
                                    <td>{new Date(st.startAt).toLocaleString()}</td>
                                    <td>{new Date(st.endAt).toLocaleString()}</td>
                                    <td>{st.status}</td>
                                    <td>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleShowModal(st)}
                                        >
                                            ✏️ Sửa
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(st.id)}
                                        >
                                            🗑️ Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Không có dữ liệu suất chiếu.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Modal thêm/sửa */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingShowtime ? "✏️ Sửa suất chiếu" : "➕ Thêm suất chiếu"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Phim</Form.Label>
                            <Form.Select
                                name="movieId"
                                value={formData.movieId}
                                onChange={handleChange}
                            >
                                <option value="">-- Chọn phim --</option>
                                {movies.map((m) => (
                                    <option key={m.id} value={m.id}>
                                        {m.title}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Phòng chiếu</Form.Label>
                            <Form.Select
                                name="auditoriumId"
                                value={formData.auditoriumId}
                                onChange={handleChange}
                            >
                                <option value="">-- Chọn phòng --</option>
                                {auditoriums.map((a) => (
                                    <option key={a.id} value={a.id}>
                                        {a.name} ({a.cinemaName})
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Thời gian bắt đầu</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="startAt"
                                value={formData.startAt}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Thời gian kết thúc</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="endAt"
                                value={formData.endAt}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="AVAILABLE">AVAILABLE</option>
                                <option value="CANCELLED">CANCELLED</option>
                                <option value="SOLD_OUT">SOLD_OUT</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ShowtimeManagementPage;
