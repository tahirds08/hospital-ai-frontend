import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

import {
    Alert,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    Paper,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function Doctors() {
    const [doctors, setDoctors] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [form, setForm] = useState({
        name: "",
        specialization: "",
        timing: "",
        fee: ""
    });

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
            setErrorMessage("Unable to load doctors.");
        }
    }

    useEffect(() => {
        loadDoctors();
    }, []);

    async function saveDoctor(e) {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem("token");

            if (editingId) {
                await api.put(`/doctors/${editingId}`, form, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuccessMessage("Doctor updated successfully.");
            }
            else {
                await api.post("/doctors", form, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSuccessMessage("Doctor added successfully.");
            }

            setForm({
                name: "",
                specialization: "",
                timing: "",
                fee: ""
            });
            setEditingId(null);
            loadDoctors();
        }
        catch {
            setErrorMessage("Unable to save doctor.");
        }
        finally {
            setSaving(false);
        }
    }

    function editDoctor(doctor) {
        setEditingId(doctor.id);
        setForm({
            name: doctor.name,
            specialization: doctor.specialization,
            timing: doctor.timing,
            fee: doctor.fee
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function deleteDoctor(id) {
        setSelectedDoctorId(id);
        setOpenDialog(true);
    }

    async function confirmDelete() {
        try {
            const token = localStorage.getItem("token");
            await api.delete(`/doctors/${selectedDoctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSuccessMessage("Doctor deleted successfully.");
            loadDoctors();
        }
        catch {
            setErrorMessage("Unable to delete doctor.");
        }
        finally {
            setOpenDialog(false);
        }
    }

    return (
        <>
            <Navbar />

            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
                <Paper
                    elevation={4}
                    sx={{
                        p: { xs: 2.5, md: 4 },
                        borderRadius: 6,
                        overflow: "hidden",
                        background:
                            "linear-gradient(180deg, rgba(12, 23, 40, 0.98), rgba(8, 15, 26, 0.96))"
                    }}
                >
                    <Box
                        sx={{
                            mb: 4,
                            p: { xs: 2.5, md: 3 },
                            borderRadius: 4,
                            background:
                                "linear-gradient(135deg, rgba(77, 208, 225, 0.12), rgba(139, 92, 246, 0.12))",
                            border: "1px solid rgba(255,255,255,0.08)"
                        }}
                    >
                        <Stack spacing={1}>
                            <Typography variant="overline" color="primary.light">
                                Operations module
                            </Typography>

                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                Doctor Management
                            </Typography>

                            <Typography color="text.secondary">
                                Add, edit, and manage hospital doctors.
                            </Typography>
                        </Stack>
                    </Box>

                    <form onSubmit={saveDoctor}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Doctor Name"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Specialization"
                                    value={form.specialization}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            specialization: e.target.value
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Timing"
                                    value={form.timing}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            timing: e.target.value
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Consultation Fee"
                                    value={form.fee}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            fee: e.target.value
                                        })
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <LoadingButton
                                    loading={saving}
                                    loadingPosition="start"
                                    startIcon={<AddCircleIcon />}
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ mt: 1 }}
                                >
                                    {editingId ? "Update Doctor" : "Add Doctor"}
                                </LoadingButton>
                            </Grid>
                        </Grid>
                    </form>

                    <Typography
                        variant="h5"
                        sx={{
                            mt: 5,
                            mb: 2,
                            fontWeight: "bold"
                        }}
                    >
                        Doctors List
                    </Typography>

                    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 4, overflow: "hidden" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Specialization</b></TableCell>
                                    <TableCell><b>Timing</b></TableCell>
                                    <TableCell><b>Fee</b></TableCell>
                                    <TableCell align="center"><b>Actions</b></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {doctors.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No doctors available yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    doctors.map((doctor) => (
                                        <TableRow key={doctor.id} hover>
                                            <TableCell>{doctor.name}</TableCell>
                                            <TableCell>{doctor.specialization}</TableCell>
                                            <TableCell>{doctor.timing}</TableCell>
                                            <TableCell>Rs. {doctor.fee}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => editDoctor(doctor)}
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="error"
                                                    onClick={() => deleteDoctor(doctor.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>

            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage("")}
            >
                <Alert severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!errorMessage}
                autoHideDuration={3000}
                onClose={() => setErrorMessage("")}
            >
                <Alert severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    Delete Doctor
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this doctor?
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>
                        Cancel
                    </Button>

                    <Button color="error" onClick={confirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Doctors;
