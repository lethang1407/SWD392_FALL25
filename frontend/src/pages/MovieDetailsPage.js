import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';
import { getMovieById } from '../api/movie-api';
import { createBooking } from '../api/booking-api';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [seats, setSeats] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [errors, setErrors] = useState({});
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await getMovieById(id);
      setMovie(movieData);
    };

    fetchMovie();
  }, [id]);

  const validateForm = () => {
    let newErrors = {};

    if (!seats || seats <= 0) newErrors.seats = "Number of seats must be greater than 0.";
    if (!bookingDate) newErrors.bookingDate = "Please select a booking date.";

    if (!bookingTime) {
      newErrors.bookingTime = "Please select a showtime.";
    } else {
      const [hours] = bookingTime.split(":").map(Number);
      if (hours < 8 || hours > 23) {
        newErrors.bookingTime = "Showtime must be between 08:00 and 23:00.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async () => {
    if (!validateForm()) return;

    const booking = {
      userId,
      movieId: id,
      bookingDate,
      bookingTime,
      seats,
      amount: seats * movie.price,
      status: 0
    };

    try {
      await createBooking(booking);
      alert(`You have successfully booked ${seats} seat(s) for ${movie.name} on ${bookingDate} at ${bookingTime}.`);
      navigate(`/your-booking/${userId}`);
    } catch (error) {
      console.error(error);
      alert('An error occurred while booking. Please try again.');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Container className="my-5">
        <Row>
          <Col md={4}>
            <img src={movie.imageUrl} alt={movie.name} className="img-fluid rounded" />
          </Col>
          <Col md={8}>
            <h1>{movie.name}</h1>
            <p>Directed by: {movie.director}</p>
            <p>Year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
            <p>Price: {movie.price} VND</p>
            <p>Show Time: {movie.showtime}</p>

            {userId ? (
              <Form className="mt-4">
                <Form.Group as={Row} controlId="formSeats">
                  <Form.Label column sm="2">Seats</Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      value={seats}
                      onChange={(e) => setSeats(parseInt(e.target.value, 10))}
                      min="1"
                      max="10"
                    />
                    {errors.seats && <Alert variant="danger">{errors.seats}</Alert>}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBookingDate">
                  <Form.Label column sm="2">Booking Date</Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={today}
                    />
                    {errors.bookingDate && <Alert variant="danger">{errors.bookingDate}</Alert>}
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formBookingTime">
                  <Form.Label column sm="2">Showtime</Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                    />
                    {errors.bookingTime && <Alert variant="danger">{errors.bookingTime}</Alert>}
                  </Col>
                </Form.Group>

                <Button variant="primary" onClick={handleBooking} className="mt-3">
                  Book Now
                </Button>
              </Form>
            ) : (
              <Button variant="primary" onClick={() => navigate("/login")}>
                Login to book
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
