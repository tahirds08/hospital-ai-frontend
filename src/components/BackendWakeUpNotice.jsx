import { useEffect, useRef, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const WAKE_UP_DELAY_MS = 2500;

function BackendWakeUpNotice() {
    const [showNotice, setShowNotice] = useState(false);
    const wakeUpTimer = useRef(null);

    useEffect(() => {
        function handleRequestState(event) {
            if (event.detail.pendingRequests > 0) {
                if (!wakeUpTimer.current) {
                    wakeUpTimer.current = window.setTimeout(() => {
                        setShowNotice(true);
                    }, WAKE_UP_DELAY_MS);
                }
                return;
            }

            window.clearTimeout(wakeUpTimer.current);
            wakeUpTimer.current = null;
            setShowNotice(false);
        }

        window.addEventListener("hospital-api-request-state", handleRequestState);
        return () => {
            window.removeEventListener("hospital-api-request-state", handleRequestState);
            window.clearTimeout(wakeUpTimer.current);
        };
    }, []);

    return (
        <Snackbar open={showNotice} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert severity="info" variant="filled" sx={{ alignItems: "center", color: "common.white" }}>
                Our secure services are waking up. This can take up to a minute—please wait.
            </Alert>
        </Snackbar>
    );
}

export default BackendWakeUpNotice;
