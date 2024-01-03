import React, { useState } from "react";
import { Modal, Button, Typography, TextField, Select, MenuItem } from "@mui/material";

const UpdateUserModal = ({ open, onClose, onUpdate, userData, handleChange, selectedValue }) => {
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!userData?.name?.trim()) {
            newErrors.name = "Username is required";
        }
        if (!userData?.email?.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!userData?.phone?.trim()) {
            newErrors.phone = "Phone is required";
        } else if (!/^\d+$/.test(userData.phone)) {
            newErrors.phone = "Phone must contain only numbers";
        }
        if (!selectedValue) {
            newErrors.group = "Please select a value";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = () => {
        if (validateForm()) {
            onUpdate();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className="fixed inset-5 flex items-center justify-center w-full">
                <div className="bg-white p-4 shadow-md rounded-md">
                    <Typography variant="h5" className="mb-2">
                        Update user information
                    </Typography>
                    <form>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={userData?.name || ""}
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
                            value={userData?.email || ""}
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
                            value={userData?.phone || ""}
                            onChange={handleChange("phone")}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            sx={{ width: "100%" }}
                        />
                        <TextField
                            label="Group"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            sx={{ width: "100%" }}
                            select
                            value={userData?.groupId || ""}
                            onChange={handleChange("groupId")}
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
                        <Button onClick={handleUpdate} variant="contained" color="primary" className="ml-8">
                            Update User
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default UpdateUserModal;
