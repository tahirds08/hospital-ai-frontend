import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography
} from "@mui/material";

function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function loadProfile() {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setProfile(response.data);
            }
            catch {
                setProfile(null);
            }
        }

        loadProfile();
    }, []);

    return (
        <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
            <Paper
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: 6,
                    textAlign: "center",
                    background:
                        "linear-gradient(180deg, rgba(12, 23, 40, 0.98), rgba(8, 15, 26, 0.95))"
                }}
            >
                <Stack spacing={2} alignItems="center">
                    <Box
                        sx={{
                            width: 72,
                            height: 72,
                            borderRadius: 4,
                            display: "grid",
                            placeItems: "center",
                            background:
                                "linear-gradient(135deg, rgba(77, 208, 225, 0.18), rgba(139, 92, 246, 0.22))",
                            border: "1px solid rgba(255,255,255,0.08)"
                        }}
                    >
                        <Typography variant="h4" component="span">
                            👤
                        </Typography>
                    </Box>

                    <Typography variant="h3" component="h1">
                        My Profile
                    </Typography>

                    <Typography color="text.secondary" sx={{ maxWidth: 540 }}>
                        View your account details.
                    </Typography>

                    <Stack spacing={1} sx={{ mt: 2 }}>
                        <Typography>
                            <b>Name:</b> {profile?.username || "Loading..."}
                        </Typography>
                        <Typography>
                            <b>Email:</b> {profile?.email || "Loading..."}
                        </Typography>
                        <Typography>
                            <b>User ID:</b> {profile?.id || "Loading..."}
                        </Typography>
                    </Stack>

                    <Button component={Link} to="/dashboard" variant="contained" sx={{ mt: 1 }}>
                        Go to Dashboard
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}

export default Profile;