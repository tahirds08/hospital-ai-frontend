import api from "../services/api";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/auth.css";

import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogin(e) {
        e.preventDefault();

        setError("");

        setLoading(true);

        try {
            const response = await api.post("/login", {
                email: email.trim(),
                password
            });

            localStorage.setItem("token", response.data.access_token);
            navigate("/dashboard");
        }
        catch (err) {
            const detail = err.response?.data?.detail;
            if (Array.isArray(detail)) {
                setError(detail[0]?.msg || "Please check the form and try again.");
            }
            else if (detail) {
                setError(detail);
            }
            else {
                setError("We could not reach hospital services. Please wait a minute and try again.");
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                px: 2,
                background: "linear-gradient(180deg, #06111f 0%, #081523 100%)"
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        width: "100%",
                        p: { xs: 3, sm: 4 },
                        borderRadius: 4,
                        background:
                            "linear-gradient(180deg, rgba(12, 23, 40, 0.98), rgba(8, 15, 26, 0.94))",
                        border: "1px solid rgba(255,255,255,0.08)"
                    }}
                >
                    <Typography variant="overline" color="primary.light">
                        Sheikh Zaid Hospital
                    </Typography>

                    <Typography variant="h3" component="h1" sx={{ mt: 1 }}>
                        Sign In
                    </Typography>

                    <Typography color="text.secondary" sx={{ mt: 1.5, mb: 3 }}>
                        Use your account to continue.
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    {location.state?.message && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {location.state.message}
                        </Alert>
                    )}

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{ py: 1.7 }}
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </Box>

                    <Typography align="center" sx={{ mt: 3 }} color="text.secondary">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" style={{ color: "#8ff1ff", textDecoration: "none", fontWeight: 700 }}>
                            Register
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}

export default Login;
