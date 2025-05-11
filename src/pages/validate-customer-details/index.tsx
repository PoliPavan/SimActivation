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

const ValidateCustomerDetails: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const validateName = (name: string) => {
    const trimmed = name.replace(/\s/g, "");
    return /^[A-Za-z\s]+$/.test(name) && trimmed.length <= 15;
  };

  const validateEmailFormat = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleValidate = () => {
    if (!validateName(firstName) || !validateName(lastName)) {
      setSnackbarMsg(
        "First and Last name should be maximum of 15 characters and contain only alphabets"
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (!validateEmailFormat(email)) {
      setSnackbarMsg("Invalid email details");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const matched = initialCustomers.some(
      (c) =>
        c.name.toLowerCase() === firstName.toLowerCase() &&
        c.email.toLowerCase() === email.toLowerCase()
    );

    if (!matched) {
      setSnackbarMsg("No customer found for the provided details");
      setSnackbarSeverity("error");
    } else {
      setSnackbarMsg("Customer validation successful");
      setSnackbarSeverity("success");
    }

    setSnackbarOpen(true);
  };

  return (
    <Paper sx={{ margin: 2, padding: 4 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        Validate Customer Details
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 4 }}
      >
        <TextField
          label="First Name"
          required
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ maxWidth: 300, mb: 2 }}
        />
        <TextField
          label="Last Name"
          required
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ maxWidth: 300, mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export { ValidateCustomerDetails };
