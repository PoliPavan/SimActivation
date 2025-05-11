import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const ValidateSim: React.FC = () => {
  const [simNumber, setSimNumber] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");

  const [simNumberError, setSimNumberError] = useState("");
  const [serviceNumberError, setServiceNumberError] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleValidate = () => {
    let isValid = true;

    if (!/^\d{13}$/.test(simNumber)) {
      setSimNumberError("Sim Number must be exactly 13 digits");
      isValid = false;
    } else {
      setSimNumberError("");
    }

    if (!/^\d{10}$/.test(serviceNumber)) {
      setServiceNumberError("Service Number must be exactly 10 digits");
      isValid = false;
    } else {
      setServiceNumberError("");
    }

    if (isValid) {
      if (simNumber === "1111111111111" && serviceNumber === "1111111111") {
        setSnackbarMsg("Subscriber Identity Module already active");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMsg(
          "Invalid details, please check again Service and Sim Number"
        );
        setSnackbarSeverity("error");
      }
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Paper sx={{ margin: 2, padding: 4 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Validate Sim
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <TextField
          label="Sim Number"
          variant="outlined"
          fullWidth
          required
          value={simNumber}
          onChange={(e) => setSimNumber(e.target.value)}
          onFocus={() => setSimNumberError("")}
          error={Boolean(simNumberError)}
          helperText={simNumberError}
          sx={{ maxWidth: 300, mb: 2 }}
        />
        <TextField
          label="Service Number"
          variant="outlined"
          fullWidth
          required
          value={serviceNumber}
          onChange={(e) => setServiceNumber(e.target.value)}
          onFocus={() => setServiceNumberError("")}
          error={Boolean(serviceNumberError)}
          helperText={serviceNumberError}
          sx={{ maxWidth: 300, mb: 3 }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFA500",
            color: "white",
            width: "300px",
            "&:hover": { backgroundColor: "#ff9400" },
          }}
          onClick={handleValidate}
        >
          VALIDATE
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export { ValidateSim };
