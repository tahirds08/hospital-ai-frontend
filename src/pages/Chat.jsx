import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Avatar, Box, Chip, CircularProgress, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

import api from "../services/api";
import Navbar from "../components/Navbar";

function Chat() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "How can I help today?"
        }
    ]);
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function handleSend(e) {
        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        const userMessage = {
            sender: "user",
            text: message
        };

        setMessages((previousMessages) => [...previousMessages, userMessage]);
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            const response = await api.post(
                "/chat",
                { message },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    sender: "ai",
                    text: response.data.response
                }
            ]);
        }
        catch {
            setMessages((previousMessages) => [
                ...previousMessages,
                {
                    sender: "ai",
                    text: "Something went wrong."
                }
            ]);
        }
        finally {
            setLoading(false);
            setMessage("");
        }
    }

    return (
        <>
            <Navbar />

            <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
                <Paper
                    elevation={4}
                    sx={{
                        minHeight: { xs: "84vh", md: "86vh" },
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 4,
                        overflow: "hidden",
                        background:
                            "linear-gradient(180deg, rgba(12, 23, 40, 0.98), rgba(9, 18, 31, 0.96))"
                    }}
                >
                    <Box
                        sx={{
                            p: { xs: 2.5, md: 3.5 },
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                            background:
                                "linear-gradient(135deg, rgba(77, 208, 225, 0.10), rgba(139, 92, 246, 0.10))"
                        }}
                    >
                        <Stack spacing={1.2}>
                            <Chip label="AI assistant" sx={{ alignSelf: "flex-start" }} />
                            <Typography variant="h4" fontWeight="bold">
                                AI Chat
                            </Typography>
                            <Typography color="text.secondary">
                                Ask about doctors, timings, fees, or hospital services.
                            </Typography>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            p: { xs: 2.5, md: 3.5 },
                            background:
                                "radial-gradient(circle at top, rgba(77, 208, 225, 0.05), transparent 34%), linear-gradient(180deg, rgba(8, 15, 26, 0.95), rgba(6, 11, 20, 0.98))"
                        }}
                    >
                        {messages.map((msg, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                                    mb: 3,
                                    alignItems: "flex-end"
                                }}
                            >
                                {msg.sender === "ai" && (
                                    <Avatar
                                        sx={{
                                            bgcolor: "primary.main",
                                            color: "#06111f",
                                            mr: 2
                                        }}
                                    >
                                        <SmartToyIcon />
                                    </Avatar>
                                )}

                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        maxWidth: { xs: "92%", md: "72%" },
                                        borderRadius: 3,
                                        background:
                                            msg.sender === "user"
                                                ? "linear-gradient(135deg, #4dd0e1, #8b5cf6)"
                                                : "rgba(11, 23, 38, 0.96)",
                                        color: msg.sender === "user" ? "white" : "text.primary",
                                        border:
                                            msg.sender === "user"
                                                ? "none"
                                                : "1px solid rgba(255,255,255,0.08)"
                                    }}
                                >
                                    <ReactMarkdown
                                        components={{
                                            ul: ({ children }) => (
                                                <ul
                                                    style={{
                                                        paddingLeft: "24px",
                                                        marginTop: "10px",
                                                        marginBottom: "10px"
                                                    }}
                                                >
                                                    {children}
                                                </ul>
                                            ),
                                            ol: ({ children }) => (
                                                <ol
                                                    style={{
                                                        paddingLeft: "24px",
                                                        marginTop: "10px",
                                                        marginBottom: "10px"
                                                    }}
                                                >
                                                    {children}
                                                </ol>
                                            ),
                                            li: ({ children }) => (
                                                <li
                                                    style={{
                                                        marginBottom: "8px",
                                                        lineHeight: "1.7"
                                                    }}
                                                >
                                                    {children}
                                                </li>
                                            ),
                                            p: ({ children }) => (
                                                <p
                                                    style={{
                                                        margin: "8px 0",
                                                        lineHeight: "1.7"
                                                    }}
                                                >
                                                    {children}
                                                </p>
                                            )
                                        }}
                                    >
                                        {msg.text}
                                    </ReactMarkdown>
                                </Paper>

                                {msg.sender === "user" && (
                                    <Avatar
                                        sx={{
                                            bgcolor: "success.main",
                                            color: "#06111f",
                                            ml: 2
                                        }}
                                    >
                                        <PersonIcon />
                                    </Avatar>
                                )}
                            </Box>
                        ))}

                        {loading && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: "primary.main",
                                        color: "#06111f"
                                    }}
                                >
                                    <SmartToyIcon />
                                </Avatar>

                                <Paper
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        background:
                                            "linear-gradient(135deg, rgba(77, 208, 225, 0.08), rgba(139, 92, 246, 0.08))"
                                    }}
                                >
                                    <CircularProgress size={20} />
                                    <Typography sx={{ display: "inline", ml: 2 }}>
                                        AI is typing...
                                    </Typography>
                                </Paper>
                            </Box>
                        )}

                        <div ref={chatEndRef} />
                    </Box>

                    <Box
                        component="form"
                        onSubmit={handleSend}
                        sx={{
                            p: { xs: 2, md: 2.5 },
                            borderTop: "1px solid rgba(255,255,255,0.08)",
                            display: "flex",
                            gap: 2,
                            background:
                                "linear-gradient(180deg, rgba(8, 15, 26, 0.96), rgba(10, 18, 31, 0.98))"
                        }}
                    >
                        <TextField
                            fullWidth
                            placeholder="Ask about doctors, timings, fees..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            autoComplete="off"
                        />

                        <IconButton
                            color="primary"
                            type="submit"
                            disabled={loading || !message.trim()}
                            sx={{
                                width: 56,
                                height: 56,
                                bgcolor: "primary.main",
                                color: "#06111f",
                                "&:hover": {
                                    bgcolor: "primary.light"
                                },
                                "&:disabled": {
                                    bgcolor: "rgba(255,255,255,0.18)",
                                    color: "rgba(255,255,255,0.68)"
                                }
                            }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Paper>
            </Container>
        </>
    );
}

export default Chat;
