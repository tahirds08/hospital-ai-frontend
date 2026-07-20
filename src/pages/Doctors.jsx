import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

import {
    Alert,
    Box,
    Container,
    Paper,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function loadDoctors() {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/doctors", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDoctors(response.data);
            }
            catch {
                setErrorMessage("Unable to load doctors.");
            }
        }

        loadDoctors();
    }, []);

    return (
        <>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                <Paper elevation={4} sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 6 }}>
                    <Box sx={{ mb: 4 }}>
                        <Stack spacing={1}>
                            <Typography variant="overline" color="primary.light">
                                Hospital directory
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                                Doctors
                            </Typography>
                            <Typography color="text.secondary">
                                This is the hospital-maintained doctor directory. Doctor details cannot be changed by users.
                            </Typography>
                        </Stack>
                    </Box>

                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 4, overflow: "hidden" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Specialization</b></TableCell>
                                    <TableCell><b>Timing</b></TableCell>
                                    <TableCell><b>Fee</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {doctors.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">No doctors available.</TableCell>
                                    </TableRow>
                                ) : doctors.map((doctor) => (
                                    <TableRow key={doctor.id} hover>
                                        <TableCell>{doctor.name}</TableCell>
                                        <TableCell>{doctor.specialization}</TableCell>
                                        <TableCell>{doctor.timing}</TableCell>
                                        <TableCell>Rs. {doctor.fee}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

            <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={() => setErrorMessage("")}>
                <Alert severity="error">{errorMessage}</Alert>
            </Snackbar>
        </>
    );
}

export default Doctors;
