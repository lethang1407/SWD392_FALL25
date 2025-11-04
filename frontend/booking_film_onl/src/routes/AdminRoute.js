import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children, user }) {
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (user.role !== "ADMIN") {
        return <Navigate to="/home" replace />;
    }
    return children;
}

export default AdminRoute;
