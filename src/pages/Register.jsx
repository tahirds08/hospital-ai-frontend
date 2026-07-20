import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
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

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const updateField = (field) => (event) => {
        setForm((current) => ({ ...current, [field]: event.target.value }));
    };

    async function handleRegister(event) {
        event.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            await api.post("/register", {
                username: form.username.trim(),
                email: form.email.trim(),
                password: form.password
            });
            navigate("/", { state: { message: "Account created. Please sign in." } });
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
                setError("Unable to reach the server. Check that the backend is running.");
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
                    onSubmit={handleRegister}
                    sx={{
                        width: "100%",
                        p: { xs: 3, sm: 4 },
                        borderRadius: 4,
                        background: "linear-gradient(180deg, rgba(12, 23, 40, 0.98), rgba(8, 15, 26, 0.94))",
                        border: "1px solid rgba(255,255,255,0.08)"
                    }}
                >
                    <Typography variant="overline" color="primary.light">
                        Sheikh Zaid Hospital
                    </Typography>
                    <Typography variant="h3" component="h1" sx={{ mt: 1 }}>
                        Create account
                    </Typography>
                    <Typography color="text.secondary" sx={{ mt: 1.5, mb: 3 }}>
                        Create your account to access the hospital platform.
                    </Typography>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField label="Username" fullWidth required autoComplete="username" value={form.username} onChange={updateField("username")} />
                        <TextField label="Email" type="email" fullWidth required autoComplete="email" value={form.email} onChange={updateField("email")} />
                        <TextField label="Password" type="password" fullWidth required helperText="At least 8 characters" autoComplete="new-password" value={form.password} onChange={updateField("password")} />
                        <TextField label="Confirm password" type="password" fullWidth required autoComplete="new-password" value={form.confirmPassword} onChange={updateField("confirmPassword")} />
                        <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ py: 1.7 }}>
                            {loading ? "Creating account..." : "Create account"}
                        </Button>
                    </Box>

                    <Typography align="center" sx={{ mt: 3 }} color="text.secondary">
                        Already have an account?{" "}
                        <Link to="/" style={{ color: "#8ff1ff", textDecoration: "none", fontWeight: 700 }}>
                            Sign in
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}

export default Register;
