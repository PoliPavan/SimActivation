import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { initialCustomers, type Customer } from "../../constants";

const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [errors, setErrors] = useState({
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleEditClick = (index: number) => {
    const selected = customers[index];
    setEditingIndex(index);
    setFormData({
      address: selected.address || "",
      city: selected.city || "",
      pincode: selected.pincode || "",
      state: selected.state || "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIndex(null);
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {
      address: "",
      city: "",
      pincode: "",
      state: "",
    };

    // Validate address (max 25 characters)
    if (!formData.address || formData.address.length > 25) {
      newErrors.address = "Address should be a maximum of 25 characters.";
      isValid = false;
    }

    // Validate pincode (6 digits)
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode should be a 6-digit number.";
      isValid = false;
    }

    // Validate city (no special characters except space)
    if (!formData.city || /[^a-zA-Z0-9\s]/.test(formData.city)) {
      newErrors.city =
        "City should not contain special characters except space.";
      isValid = false;
    }

    // Validate state (no special characters except space)
    if (!formData.state || /[^a-zA-Z0-9\s]/.test(formData.state)) {
      newErrors.state =
        "State should not contain special characters except space.";
      isValid = false;
    }

    setErrors(newErrors); // Update the errors state
    return isValid;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      if (editingIndex !== null) {
        const updated = [...customers];
        updated[editingIndex] = {
          ...updated[editingIndex],
          ...formData,
        };
        setCustomers(updated);
      }
      handleClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFocus = (field: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <Paper sx={{ margin: 2, padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Customers
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FFA500" }}>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.dob}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditClick(index)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={customers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </TableContainer>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose} sx={{ minWidth: "300px" }}>
        <DialogTitle>Update Customer Address</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
            minWidth: "400px",
          }}
        >
          <TextField
            label="Address *"
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            error={Boolean(errors.address)}
            helperText={errors.address}
            onFocus={() => handleFocus("address")}
            sx={{ minWidth: "300px", marginTop: "10px" }}
          />
          <TextField
            label="City *"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            error={Boolean(errors.city)}
            helperText={errors.city}
            onFocus={() => handleFocus("city")}
            sx={{ minWidth: "300px" }}
          />
          <TextField
            label="Pincode *"
            value={formData.pincode}
            onChange={(e) => handleChange("pincode", e.target.value)}
            error={Boolean(errors.pincode)}
            helperText={errors.pincode}
            onFocus={() => handleFocus("pincode")}
            sx={{ minWidth: "300px" }}
          />
          <TextField
            label="State *"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            error={Boolean(errors.state)}
            helperText={errors.state}
            onFocus={() => handleFocus("state")}
            sx={{ minWidth: "300px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export { CustomerTable };
