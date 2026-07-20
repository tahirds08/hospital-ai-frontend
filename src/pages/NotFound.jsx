import { Link } from "react-router-dom";

import {
    Box,
    Button,
    Container,
    Paper,
    Stack,
    Typography
} from "@mui/material";

function NotFound() {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
            <Paper
                sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: 6,
                    textAlign: "center",
                    background:
                        "linear-gradient(180deg, rgba(12, 23, 40, 0.98), rgba(8, 15, 26, 0.95))"
                }}
            >
                <Stack spacing={2} alignItems="center">
                    <Box
                        sx={{
                            width: 88,
                            height: 88,
                            borderRadius: 5,
                            display: "grid",
                            placeItems: "center",
                            background:
                                "linear-gradient(135deg, rgba(239, 68, 68, 0.16), rgba(139, 92, 246, 0.16))",
                            border: "1px solid rgba(255,255,255,0.08)"
                        }}
                    >
                        <Typography variant="h3" component="span">
                            404
                        </Typography>
                    </Box>

                    <Typography variant="h3" component="h1">
                        Page not found
                    </Typography>

                    <Typography color="text.secondary" sx={{ maxWidth: 520 }}>
                        The page you requested does not exist or has been moved.
                    </Typography>

                    <Button component={Link} to="/dashboard" variant="contained" sx={{ mt: 1 }}>
                        Return to Dashboard
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
}

export default NotFound;