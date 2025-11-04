import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Gọi API lấy danh sách phim
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:1234/api/movies/infor");
        if (!response.ok) {
          throw new Error("Không thể tải danh sách phim!");
        }
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      {/* 🔹 Navbar */}
      <NavbarComponent />

      {/* 🔹 Nội dung trang */}
      <Container className="mt-4">
        <h2 className="text-center mb-4">🎬 Danh sách phim đang chiếu</h2>

        {loading && (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Đang tải phim...</p>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <Row>
          {!loading &&
            !error &&
            movies.map((movie) => (
              <Col key={movie.id} sm={6} md={4} lg={3} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={movie.image || "https://via.placeholder.com/300x400?text=No+Image"}
                    alt={movie.title}
                    style={{ height: "380px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text style={{ minHeight: "60px" }}>
                      {movie.description || "Không có mô tả cho phim này."}
                    </Card.Text>
                    <Card.Text>
                      ⏱ <strong>{movie.durationMin || "?"} phút</strong>
                    </Card.Text>
                    <Button variant="primary" className="w-100">
                      Đặt vé
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
