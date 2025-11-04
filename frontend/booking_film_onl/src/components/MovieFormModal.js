import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const MovieFormModal = ({ show, onHide, onSave, movie }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        durationMin: "",
        image: "",
        genreIds: [],
    });

    const [genres, setGenres] = useState([]);
    const [loadingGenres, setLoadingGenres] = useState(true);
    const [error, setError] = useState("");
    const [newGenreName, setNewGenreName] = useState("");

    // 🔹 Gọi API lấy danh sách thể loại
    const fetchGenres = async () => {
        try {
            const res = await axios.get("http://localhost:1234/api/genres");
            if (Array.isArray(res.data)) {
                setGenres(res.data);
            } else {
                throw new Error("API trả về không đúng định dạng mảng!");
            }
        } catch (err) {
            console.error("Không thể tải danh sách thể loại:", err);
            setError("Không thể tải danh sách thể loại!");
        } finally {
            setLoadingGenres(false);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    // 🔹 Nạp dữ liệu khi sửa
    useEffect(() => {
        if (movie) {
            setFormData({
                id: movie.id,
                title: movie.title || "",
                description: movie.description || "",
                durationMin: movie.durationMin || "",
                image: movie.image || "",
                genreIds: movie.genres?.map((g) => g.id) || [],
            });
        } else {
            setFormData({
                id: null, 
                title: "",
                description: "",
                durationMin: "",
                image: "",
                genreIds: [],
            });
        }
    }, [movie]);

    // 🔹 Xử lý input cơ bản
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 🔹 Xử lý chọn thể loại
    const handleGenreChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, (option) => Number(option.value));
        setFormData({ ...formData, genreIds: selected });
    };

    // 🔹 Thêm thể loại mới
    const handleAddGenre = async () => {
        if (!newGenreName.trim()) return;
        try {
            const res = await axios.post("http://localhost:1234/api/genres", { name: newGenreName.trim() });
            const newGenre = res.data;
            setGenres((prev) => [...prev, newGenre]);
            setFormData((prev) => ({
                ...prev,
                genreIds: [...prev.genreIds, newGenre.id],
            }));
            setNewGenreName("");
            alert("✅ Đã thêm thể loại mới!");
        } catch (err) {
            alert("❌ Không thể thêm thể loại mới!");
            console.error(err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{movie ? "✏️ Cập nhật phim" : "➕ Thêm phim mới"}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {loadingGenres ? (
                    <div className="text-center my-3">
                        <Spinner animation="border" />
                        <p>Đang tải thể loại...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Thời lượng (phút)</Form.Label>
                            <Form.Control
                                type="number"
                                name="durationMin"
                                value={formData.durationMin}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ảnh (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        {/* --- THỂ LOẠI --- */}
                        <Form.Group className="mb-3">
                            <Form.Label>Thể loại</Form.Label>
                            <Form.Select
                                multiple
                                value={formData.genreIds}
                                onChange={handleGenreChange}
                            >
                                {genres.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* --- THÊM THỂ LOẠI MỚI --- */}
                        <Form.Group className="mb-3">
                            <Form.Label>Thêm thể loại mới</Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên thể loại..."
                                    value={newGenreName}
                                    onChange={(e) => setNewGenreName(e.target.value)}
                                />
                                <Button variant="success" onClick={handleAddGenre}>
                                    ➕ Thêm
                                </Button>
                            </div>
                        </Form.Group>

                        <div className="text-end">
                            <Button variant="secondary" onClick={onHide} className="me-2">
                                Hủy
                            </Button>
                            <Button type="submit" variant="primary">
                                Lưu
                            </Button>
                        </div>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default MovieFormModal;
