import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
    Stack
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InsightsIcon from "@mui/icons-material/Insights";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Dashboard() {

    return (
        <>
            <Navbar />

            <Container
                maxWidth="lg"
                sx={{ py: { xs: 3, md: 5 } }}
            >
                <Box
                    sx={{
                        mb: 4,
                        p: { xs: 3, md: 4 },
                        borderRadius: 4,
                        background:
                            "linear-gradient(135deg, rgba(77, 208, 225, 0.12), rgba(139, 92, 246, 0.12))",
                        border: "1px solid rgba(255,255,255,0.08)"
                    }}
                >
                    <Stack spacing={2}>
                        <Chip
                            icon={<LocalHospitalIcon />}
                            label="Hospital command center"
                            sx={{ alignSelf: "flex-start" }}
                        />

                        <Typography variant="h3" component="h1">
                            Hospital AI Dashboard
                        </Typography>

                        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 760 }}>
                            Quick access to chat, doctors, and appointment booking.
                        </Typography>
                    </Stack>
                </Box>

                <Card
                    sx={{
                        borderRadius: 4,
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.28)",
                        background:
                            "linear-gradient(180deg, rgba(14, 26, 44, 0.98), rgba(10, 19, 33, 0.95))"
                    }}
                >
                    <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        <Stack spacing={2}>
                            <Typography variant="h5" fontWeight="bold">
                                Working Area
                            </Typography>

                            <Typography color="text.secondary">
                                Use the practical modules below.
                            </Typography>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Button component={Link} to="/chat" variant="contained" endIcon={<ArrowForwardIcon />}>
                                    Open Chat
                                </Button>

                                <Button component={Link} to="/doctors" variant="outlined" startIcon={<MedicalServicesIcon />}>
                                    Doctors
                                </Button>

                                <Button component={Link} to="/appointments" variant="contained" color="secondary" startIcon={<EventAvailableIcon />}>
                                    Book Appointment
                                </Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>

            </Container>
        </>
    );

}

export default Dashboard;