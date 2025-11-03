import React, { useState } from "react";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:1234/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
                credentials: "include", // 🔥 để lưu session cookie
            });

            if (response.ok) {
                alert("Đăng nhập thành công!");
                // 👉 Nếu cần lưu thông tin user
                // const user = await response.json();
                // localStorage.setItem("user", JSON.stringify(user));

                // 👉 Chuyển hướng sau đăng nhập (nếu có)
                window.location.href = "/home";
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Sai tài khoản hoặc mật khẩu!");
            }
        } catch (err) {
            setError("Không thể kết nối đến server!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Đăng nhập</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="username"
                    placeholder="Tên đăng nhập"
                    value={formData.username}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

                {error && <p style={styles.error}>{error}</p>}

                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </button>
            </form>
        </div>
    );
};

// 🎨 Style đơn giản
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f5f6fa",
    },
    title: {
        marginBottom: 20,
    },
    form: {
        display: "flex",
        flexDirection: "column",
        width: 300,
        background: "#fff",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    input: {
        marginBottom: 15,
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        border: "1px solid #ccc",
    },
    button: {
        padding: 10,
        background: "#007bff",
        color: "#fff",
        fontSize: 16,
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginBottom: 10,
        fontSize: 14,
    },
};

export default LoginPage;
