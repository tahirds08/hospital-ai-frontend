import { Link, useLocation, useNavigate } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Stack
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function Navbar() {

    const location = useLocation();

    const navigate = useNavigate();

    function logout() {

        localStorage.removeItem("token");

        navigate("/");

    }

    const navButtonStyle = (path) => ({
        color: "text.secondary",
        mx: 0.5,
        borderRadius: 999,
        px: 2,
        py: 1,
        minHeight: 42,
        background:
            location.pathname === path
                ? "linear-gradient(135deg, rgba(77, 208, 225, 0.16), rgba(139, 92, 246, 0.16))"
                : "transparent",
        border: `1px solid ${location.pathname === path ? "rgba(77, 208, 225, 0.24)" : "transparent"}`,
        color:
            location.pathname === path
                ? "common.white"
                : "text.secondary",
        textTransform: "none",
        fontWeight: location.pathname === path ? 700 : 500,
        transition: "all 160ms ease",
        "&:hover": {
            color: "common.white",
            backgroundColor: "rgba(77, 208, 225, 0.08)"
        }
    });

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                px: { xs: 0, md: 2 },
                py: 1
            }}
        >
            <Toolbar
                sx={{
                    minHeight: 76,
                    gap: 2,
                    flexWrap: "wrap"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        minWidth: 0
                    }}
                >
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: 3,
                            display: "grid",
                            placeItems: "center",
                            background:
                                "linear-gradient(135deg, rgba(77, 208, 225, 0.2), rgba(139, 92, 246, 0.24))",
                            border: "1px solid rgba(255,255,255,0.08)"
                        }}
                    >
                        <LocalHospitalIcon />
                    </Box>

                    <Box>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: "primary.light",
                                letterSpacing: "0.16em",
                                textTransform: "uppercase"
                            }}
                        >
                            Hospital AI
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Intelligent care operations platform
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                >
                    <Button
                        component={Link}
                        to="/dashboard"
                        startIcon={<DashboardIcon />}
                        sx={navButtonStyle("/dashboard")}
                    >
                        Dashboard
                    </Button>

                    <Button
                        component={Link}
                        to="/chat"
                        startIcon={<SmartToyIcon />}
                        sx={navButtonStyle("/chat")}
                    >
                        AI Chat
                    </Button>

                    <Button
                        component={Link}
                        to="/doctors"
                        startIcon={<MedicalServicesIcon />}
                        sx={navButtonStyle("/doctors")}
                    >
                        Doctors
                    </Button>

                    <Button
                        component={Link}
                        to="/appointments"
                        startIcon={<EventAvailableIcon />}
                        sx={navButtonStyle("/appointments")}
                    >
                        Book Appointment
                    </Button>
                </Stack>

                <Button
                    startIcon={<LogoutIcon />}
                    onClick={logout}
                    sx={{
                        ml: { xs: 0, md: 1 },
                        width: { xs: "100%", sm: "auto" },
                        borderRadius: 999,
                        border: "1px solid rgba(239, 68, 68, 0.24)",
                        color: "#fecaca",
                        backgroundColor: "rgba(239, 68, 68, 0.08)",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "rgba(239, 68, 68, 0.16)"
                        }
                    }}
                >
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );

}

export default Navbar;