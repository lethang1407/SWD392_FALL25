import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button, Modal } from 'react-bootstrap';
import { getMovieById } from '../api/movie-api';
import { getBookingByUserId, deleteBooking } from '../api/booking-api';
import Header from '../components/Header';
import PaymentQRCode from '../components/paymentQRCode';



export default function YourBooking() {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState({});
  const [showQR, setShowQR] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const name = localStorage.getItem('name');

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingData = await getBookingByUserId(id);
      setBookings(bookingData);

      const movieDetails = await Promise.all(
        bookingData.map(booking => getMovieById(booking.movieId))
      );
      const movieDetailsMap = movieDetails.reduce((acc, movie) => {
        acc[movie.id] = movie;
        return acc;
      }, {});
      setMovies(movieDetailsMap);
    };
    fetchBookings();
  }, [id, bookings]);

  const handleDelete = async (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to delete this booking?");
    if (confirmed) {
      const success = await deleteBooking(bookingId);
      if (success) {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        alert("Booking deleted successfully");
      } else {
        alert("Failed to delete booking. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h1 className="mb-4">Your Bookings</h1>
        <Row>
          {bookings.map((booking) => (
            <Col md={6} key={booking.id} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      {movies[booking.movieId] && (
                        <img
                          src={movies[booking.movieId].imageUrl}
                          alt={movies[booking.movieId].name}
                          className="img-fluid rounded booking-img"
                          style={{ height: "100%", objectFit: "cover" }}
                        />
                      )}
                    </Col>
                    <Col md={8}>
                      {movies[booking.movieId] && (
                        <>
                          <Card.Title className="h3">{movies[booking.movieId].name}</Card.Title>
                          <Card.Text className="h5">Directed by: {movies[booking.movieId].director}</Card.Text>
                          <Card.Text className="h5">Year: {movies[booking.movieId].year}</Card.Text>
                          <Card.Text className="h5">Genre: {movies[booking.movieId].genre}</Card.Text>
                        </>
                      )}
                      <ListGroup variant="flush" className="mt-3">
                        <ListGroup.Item><strong>Booking Date:</strong> {booking.bookingDate}</ListGroup.Item>
                        <ListGroup.Item><strong>Booking Time:</strong> {booking.bookingTime}</ListGroup.Item>
                        <ListGroup.Item><strong>Seats:</strong> {booking.seats}</ListGroup.Item>
                        <ListGroup.Item><strong>Amount:</strong> {booking.amount} VND</ListGroup.Item>
                      </ListGroup>

                      {booking.status === 0 && (<>
                        <Button variant="danger" className="mt-3" onClick={() => handleDelete(booking.id)}>
                          Delete
                        </Button>
                        <Button
                          variant="success"
                          className="mt-3 ms-2"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowQR(true);
                          }}
                        >
                          Pay Now
                        </Button>
                      </>)}
                      {booking.status === 1 && (<p className="text-bg-warning mt-2 text-center">Payment successful - In progress</p>)}
                      {booking.status === 2 && (<p className="text-bg-success mt-2 text-center">Payment Completed</p>)}


                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showQR} onHide={() => setShowQR(false)} centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body
          className="d-flex flex-column align-items-center justify-content-center text-center"
        >
          {selectedBooking && movies?.[selectedBooking.movieId] && (
            <div className="w-100 d-flex justify-content-center">
              <PaymentQRCode
                bookingId={selectedBooking.id}
                bankCode="MB"
                accountNumber="3390156868888"
                amount="100000"
                description={`${name} thanh toán vé ${movies[selectedBooking.movieId].name}`}
                accountName="Phan Công Hiếu"
              />
            </div>
          )}

        </Modal.Body>
      </Modal>

    </>
  );
}
