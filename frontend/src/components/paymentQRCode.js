import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { getBookingById, updateBooking } from "../api/booking-api";
import { toast } from "react-toastify";

const PaymentQRCode = ({ bankCode, accountNumber, amount, description, accountName, bookingId, onPaymentSuccess }) => {
    const [currentBooking, setCurrentBooking] = useState({});

    useEffect(() => {
        const fetchBooking = async () => {
            if (!bookingId) return;

            try {
                const currentdata = await getBookingById(bookingId);

                if (currentdata) setCurrentBooking(currentdata);
            } catch (error) {
                toast.error("Error fetching booking details.");
                console.error("Error fetching booking:", error);
            }
        };

        fetchBooking();
    }, [bookingId, currentBooking]);

    const qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-print.jpg?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(accountName)}`;

    const handlePaymentSuccess = async () => {
        if (!bookingId) return;

        try {

            const updatedBooking = { ...currentBooking, status: 1 };

            await updateBooking(bookingId, updatedBooking);
            setCurrentBooking({ ...currentBooking, status: 1 })
            toast.success("Payment successful!");
            if (onPaymentSuccess) onPaymentSuccess();
        } catch (error) {
            toast.error("Failed to update payment status.");
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="text-center">
            <h3>Payment QR Code</h3>
            <img src={qrUrl} alt="QR Code" style={{ width: "80%" }} />
            {currentBooking.status !== 1 ? (
                <Button variant="success" className="mt-3" onClick={handlePaymentSuccess}>
                    Mark as Paid
                </Button>
            ) : (
                <p className="text-success mt-2">Payment completed</p>
            )}
        </div>
    );
};

export default PaymentQRCode;
