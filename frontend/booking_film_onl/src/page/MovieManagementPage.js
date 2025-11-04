import React, { useEffect, useState } from "react";
import { Container, Table, Button, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import MovieFormModal from "../components/MovieFormModal";

const MovieManagementPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // 🔹 Gọi API danh sách phim
    const fetchMovies = async () => {
        try {
            const res = await axios.get("http://localhost:1234/api/movies/infor");
            setMovies(res.data);
        } catch (err) {
            setError("Không thể tải danh sách phim!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    // 🔹 Xử lý thêm / sửa phim
    const handleSave = async (movieData) => {
        try {
            if (movieData.id) {
                // ✅ Có id → sửa phim
                await axios.put(`http://localhost:1234/api/movies/${movieData.id}`, movieData);
                alert("✅ Cập nhật phim thành công!");
            } else {
                // ✅ Không có id → thêm mới
                await axios.post("http://localhost:1234/api/movies", movieData);
                alert("✅ Thêm phim mới thành công!");
            }

            await fetchMovies();
            setShowModal(false);
            setSelectedMovie(null); // 🔹 reset sau khi lưu xong
        } catch (err) {
            console.error(err);
            alert("❌ Lưu phim thất bại!");
        }
    };

    // 🔹 Xóa phim
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa phim này?")) return;
        try {
            await axios.delete(`http://localhost:1234/api/movies/${id}`);
            fetchMovies();
        } catch {
            alert("❌ Xóa phim thất bại!");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center">🎬 Quản lý phim</h2>

            {loading && (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Đang tải phim...</p>
                </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <>
                    <div className="text-end mb-3">
                        <Button onClick={() => { setSelectedMovie(null); setShowModal(true); }}>
                            ➕ Thêm phim
                        </Button>
                    </div>

                    <Table bordered hover responsive>
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Ảnh</th>
                                <th>Tiêu đề</th>
                                <th>Thể loại</th>
                                <th>Thời lượng</th>
                                <th>Mô tả</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map((movie) => (
                                <tr key={movie.id}>
                                    <td>{movie.id}</td>
                                    <td>
                                        <img
                                            src={
                                                movie.image?.startsWith("http")
                                                    ? movie.image
                                                    : `/assets/${movie.image || "no-image.jpg"}`
                                            }
                                            alt={movie.title}
                                            style={{ width: "80px", height: "100px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>{movie.title}</td>
                                    <td>{movie.genres?.join(", ") || "—"}</td>
                                    <td>{movie.durationMin || "?"} phút</td>
                                    <td style={{ maxWidth: "200px" }}>{movie.description}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => {
                                                setSelectedMovie(movie);
                                                setShowModal(true);
                                            }}
                                        >
                                            ✏️ Sửa
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => handleDelete(movie.id)}
                                        >
                                            🗑️ Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}

            {/* 🔹 Modal Form */}
            <MovieFormModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSave={handleSave}
                movie={selectedMovie}
            />
        </Container>
    );
};

export default MovieManagementPage;
