import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { initialCustomers } from "../../constants";

const ValidateIDProof: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [dob, setDob] = useState<string>("");
  const [aadhar, setAadhar] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [aadharError, setAadharError] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleValidate = () => {
    let valid = true;

    // Validate First Name
    if (!firstName) {
      setFirstNameError("First Name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // Validate Date of Birth
    if (!dob) {
      setDobError("Date of Birth is required");
      valid = false;
    } else {
      setDobError("");
    }

    // Validate Aadhar Number
    if (!/^\d{16}$/.test(aadhar)) {
      setAadharError("ID should be exactly 16 digits");
      valid = false;
    } else {
      setAadharError("");
    }

    if (!valid) {
      setSnackbarMsg("Please fill all fields correctly.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Format input dob to match the format in initialCustomers (dd-mm-yyyy)
    const formattedDob = formatDate(dob);

    // Check if customer exists based on first name and dob
    const matched = initialCustomers.some(
      (c) =>
        c.name.toLowerCase().startsWith(firstName.toLowerCase()) &&
        c.dob === formattedDob
    );

    if (matched) {
      setSnackbarMsg("Customer validation successful");
      setSnackbarSeverity("success");
    } else {
      setSnackbarMsg("Customer not found");
      setSnackbarSeverity("error");
    }

    setSnackbarOpen(true);
  };

  // Format input date from 'yyyy-mm-dd' to 'dd-mm-yyyy'
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <Paper sx={{ margin: 2, padding: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Typography
          variant="subtitle1"
          color="primary"
          align="left"
          sx={{ width: 300, mb: 2 }}
        >
          Validate ID Proof
        </Typography>

        <Box display="flex" flexDirection="column" width={300} gap={2}>
          {/* Aadhar Input */}
          <TextField
            fullWidth
            label="Aadhar *"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            size="small"
            error={Boolean(aadharError)}
            helperText={aadharError}
            onFocus={() => setAadharError("")}
          />

          {/* First Name Input */}
          <TextField
            fullWidth
            label="First Name *"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            size="small"
            error={Boolean(firstNameError)}
            helperText={firstNameError}
            onFocus={() => setFirstNameError("")}
          />

          {/* Date of Birth Picker (Normal HTML input) */}
          <TextField
            fullWidth
            label="Date of Birth *"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            size="small"
            error={Boolean(dobError)}
            helperText={dobError}
            InputLabelProps={{
              shrink: true,
            }}
            onFocus={() => setDobError("")}
          />

          {/* Validate Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#FFA500", color: "#fff", mt: 1 }}
            onClick={handleValidate}
          >
            VALIDATE
          </Button>
        </Box>

        {/* Snackbar for Feedback */}
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
      </Box>
    </Paper>
  );
};

export { ValidateIDProof };
