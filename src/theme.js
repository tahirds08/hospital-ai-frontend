import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#4dd0e1",
            light: "#8ff1ff",
            dark: "#0097a7"
        },
        secondary: {
            main: "#8b5cf6",
            light: "#c4b5fd",
            dark: "#6d28d9"
        },
        success: {
            main: "#22c55e"
        },
        warning: {
            main: "#f59e0b"
        },
        error: {
            main: "#ef4444"
        },
        background: {
            default: "#06111f",
            paper: "#0c1728"
        },
        text: {
            primary: "#f8fafc",
            secondary: "#b8c7dd"
        }
    },
    shape: {
        borderRadius: 14
    },
    typography: {
        fontFamily: 'Inter, "Segoe UI", "Helvetica Neue", Arial, sans-serif',
        h1: {
            fontWeight: 800,
            letterSpacing: "-0.04em"
        },
        h2: {
            fontWeight: 800,
            letterSpacing: "-0.035em"
        },
        h3: {
            fontWeight: 750,
            letterSpacing: "-0.03em"
        },
        h4: {
            fontWeight: 750,
            letterSpacing: "-0.02em"
        },
        h5: {
            fontWeight: 700
        },
        h6: {
            fontWeight: 700
        },
        button: {
            fontWeight: 700,
            letterSpacing: "0.01em"
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#06111f",
                    backgroundImage: [
                        "radial-gradient(circle at top left, rgba(77, 208, 225, 0.18), transparent 30%)",
                        "radial-gradient(circle at top right, rgba(139, 92, 246, 0.16), transparent 26%)",
                        "radial-gradient(circle at bottom left, rgba(34, 197, 94, 0.12), transparent 24%)",
                        "linear-gradient(180deg, #06111f 0%, #081523 45%, #06111f 100%)"
                    ].join(", "),
                    backgroundAttachment: "fixed",
                    color: "#f8fafc"
                },
                "#root": {
                    minHeight: "100vh"
                },
                "::selection": {
                    backgroundColor: alpha("#4dd0e1", 0.35)
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        "linear-gradient(135deg, rgba(6, 17, 31, 0.92), rgba(9, 23, 38, 0.86))",
                    borderBottom: `1px solid ${alpha("#8bdcf5", 0.12)}`,
                    backdropFilter: "blur(18px)"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        "linear-gradient(180deg, rgba(12, 23, 40, 0.96), rgba(10, 19, 33, 0.92))",
                    border: `1px solid ${alpha("#8bdcf5", 0.12)}`,
                    boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)"
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        "linear-gradient(180deg, rgba(14, 26, 44, 0.98), rgba(10, 19, 33, 0.94))",
                    border: `1px solid ${alpha("#8bdcf5", 0.14)}`,
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.34)"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 999,
                    textTransform: "none",
                    paddingInline: 20
                },
                containedPrimary: {
                    backgroundImage:
                        "linear-gradient(135deg, #4dd0e1 0%, #38bdf8 42%, #8b5cf6 100%)",
                    boxShadow: "0 12px 28px rgba(77, 208, 225, 0.28)"
                },
                containedSecondary: {
                    backgroundImage:
                        "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)"
                },
                outlined: {
                    borderColor: alpha("#8bdcf5", 0.25)
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined"
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    backgroundColor: alpha("#081220", 0.7),
                    transition: "box-shadow 180ms ease, border-color 180ms ease",
                    "& fieldset": {
                        borderColor: alpha("#8bdcf5", 0.14)
                    },
                    "&:hover fieldset": {
                        borderColor: alpha("#4dd0e1", 0.42)
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#4dd0e1",
                        borderWidth: 2
                    }
                },
                input: {
                    paddingTop: 16,
                    paddingBottom: 16
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: alpha("#b8c7dd", 0.84)
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        "linear-gradient(180deg, rgba(9, 18, 32, 0.98), rgba(8, 15, 26, 0.96))"
                }
            }
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundImage:
                        "linear-gradient(135deg, rgba(77, 208, 225, 0.14), rgba(139, 92, 246, 0.14))"
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    color: "#e2e8f0",
                    fontWeight: 700,
                    borderBottomColor: alpha("#8bdcf5", 0.16)
                },
                body: {
                    borderBottomColor: alpha("#8bdcf5", 0.08)
                }
            }
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundImage:
                        "linear-gradient(180deg, rgba(12, 23, 40, 0.98), rgba(10, 18, 32, 0.96))"
                }
            }
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    borderRadius: 16
                }
            }
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 16
                }
            }
        }
    }
});

export default theme;