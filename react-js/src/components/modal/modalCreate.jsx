import React, { useState } from "react";
import { Modal, Button, Typography, TextField, Select, MenuItem, Box } from "@mui/material";

const CreateUserModal = ({ open, onClose, onConfirm, formData, handleChange, selectedValue }) => {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Username is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!/^\d+$/.test(formData.phone)) {
            newErrors.phone = "Phone must contain only numbers";
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
        }
        if (formData.password !== formData.confirmPass) {
            newErrors.confirmPass = "Passwords do not match";
        }
        if (!selectedValue) {
            newErrors.select = "Please select a value";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirm = () => {
        if (validateForm()) {
            onConfirm();
        }
    };

    return (
        <Modal open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3 }}>
                <div className="bg-white p-4 shadow-md rounded-md" style={{ width: '100%' }}>
                    <Typography variant="h5" className="mb-2">
                        Create a new user
                    </Typography>
                    <form>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.name}
                            onChange={handleChange("name")}
                            error={!!errors.name}
                            helperText={errors.name}
                            sx={{ width: "100%" }}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.email}
                            onChange={handleChange("email")}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{ width: "100%" }}
                        />
                        <TextField
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.phone}
                            onChange={handleChange("phone")}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            sx={{ width: "100%", marginBottom: 2 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.password}
                            onChange={handleChange("password")}
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={{ width: "100%" }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={formData.confirmPass}
                            onChange={handleChange("confirmPass")}
                            error={!!errors.confirmPass}
                            helperText={errors.confirmPass}
                            sx={{ width: "100%" }}
                        />
                        <TextField
                            select
                            label="Group"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={selectedValue}
                            onChange={handleChange("groupId")}
                            sx={{ width: "100%", marginBottom: 2 }}
                        >
                            <MenuItem value={1}>Developer</MenuItem>
                            <MenuItem value={2}>Tester</MenuItem>
                            <MenuItem value={3}>Leader (Manager)</MenuItem>
                        </TextField>
                    </form>
                    <div className="flex justify-end mt-2">
                        <Button onClick={onClose} color="info" className="mr-8">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm} variant="contained" color="secondary" className="ml-8">
                            Create User
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};

export default CreateUserModal;
