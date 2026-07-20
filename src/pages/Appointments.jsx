import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

import {
    Alert,
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography,
    MenuItem
} from "@mui/material";

function Appointments() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });
    const [form, setForm] = useState({
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        notes: ""
    });

    useEffect(() => {
        async function loadDoctors() {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/doctors", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setDoctors(response.data);
            }
            catch {
                setSnack({ open: true, message: "Unable to load doctors.", severity: "error" });
            }
        }

        loadDoctors();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const response = await api.post("/appointments", form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSnack({ open: true, message: response.data.message, severity: "success" });
            setForm({
                doctor_id: "",
                appointment_date: "",
                appointment_time: "",
                notes: ""
            });
        }
        catch {
            setSnack({ open: true, message: "Unable to book appointment.", severity: "error" });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
                <Paper sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 5 }}>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                        <Typography variant="h4" fontWeight="bold">
                            Book Appointment
                        </Typography>
                        <Typography color="text.secondary">
                            Select a doctor and fill the time.
                        </Typography>
                    </Stack>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Doctor"
                                    value={form.doctor_id}
                                    onChange={(e) => setForm({ ...form, doctor_id: e.target.value })}
                                >
                                    <MenuItem value="">Select doctor</MenuItem>
                                    {doctors.map((doctor) => (
                                        <MenuItem key={doctor.id} value={doctor.id}>
                                            {doctor.name} - {doctor.specialization}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Date"
                                    type="date"
                                    InputLabelProps={{ shrink: true }}
                                    value={form.appointment_date}
                                    onChange={(e) => setForm({ ...form, appointment_date: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12} md={3}>
                                <TextField
                                    fullWidth
                                    label="Time"
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    value={form.appointment_time}
                                    onChange={(e) => setForm({ ...form, appointment_time: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Notes"
                                    value={form.notes}
                                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" disabled={loading}>
                                    {loading ? "Booking..." : "Book Appointment"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>

            <Snackbar open={snack.open} autoHideDuration={3500} onClose={() => setSnack({ ...snack, open: false })}>
                <Alert severity={snack.severity} variant="filled" onClose={() => setSnack({ ...snack, open: false })}>
                    {snack.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Appointments;