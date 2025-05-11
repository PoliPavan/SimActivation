import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { initialCustomers } from "../../constants";

const ValidateCustomer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

  const [emailError, setEmailError] = useState("");
  const [dobError, setDobError] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const handleValidate = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!dob) {
      setDobError("Please select a valid date of birth");
      valid = false;
    } else {
      setDobError("");
    }

    if (!valid) {
      setSnackbarMsg("Invalid details, please check again");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const formattedDob = formatDate(dob);
    const matched = initialCustomers.some(
      (c) =>
        c.email.toLowerCase() === email.toLowerCase() && c.dob === formattedDob
    );

    if (matched) {
      setSnackbarMsg("Customer validation successful");
      setSnackbarSeverity("success");
    } else {
      setSnackbarMsg("Invalid Customer, This Customer does not exist");
      setSnackbarSeverity("error");
    }

    setSnackbarOpen(true);
  };

  return (
    <Paper sx={{ margin: 2, padding: 4 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Validate Customer
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailError("")}
          error={Boolean(emailError)}
          helperText={emailError}
          sx={{ maxWidth: 300, mb: 2 }}
        />

        <TextField
          label="Date of Birth"
          type="date"
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          onFocus={() => setDobError("")}
          error={Boolean(dobError)}
          helperText={dobError}
          sx={{ maxWidth: 300, mb: 3 }}
        />

        <Button
          variant="contained"
          onClick={handleValidate}
          sx={{
            backgroundColor: "#FFA500",
            color: "#fff",
            width: "300px",
            "&:hover": { backgroundColor: "#ff9400" },
          }}
        >
          VALIDATE
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
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

export { ValidateCustomer };
