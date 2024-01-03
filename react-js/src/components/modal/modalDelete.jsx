import React from "react";
import { Modal, Button, Typography } from "@mui/material";

const ConfirmDeleteModal = ({ open, onClose, onConfirm, userName }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <div className="fixed inset-5 flex items-center justify-center w-full">
                <div className="bg-white p-4 shadow-md rounded-md">
                    <Typography variant="h5" className="mb-2">
                        Confirm Deletion
                    </Typography>
                    <Typography variant="body2" className="mb-2">
                        Are you sure you want to delete the user{" "}
                        <strong className="text-blue-500">{userName}</strong>?
                    </Typography>
                    <div className="flex justify-end mt-2">
                        <Button onClick={onClose} color="info" className="mr-8">
                            Cancel
                        </Button>
                        <Button onClick={onConfirm} variant="contained" color="secondary" className="ml-8">
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
