import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
} from "../components/ui/index";
import { Trash } from "lucide-react";

const AlertModal = ({ isOpen, onClose, onConfirm }) => {
  const [enteredCourseName, setEnteredCourseName] = useState("");

  const handleConfirm = () => {
    if (enteredCourseName === "Confirm") {
      onConfirm();
      onClose();
    } else {
      alert("Please Enter Confirm");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>

        <p className="text-sm mb-4 text-gray-600">
          Are you sure you want to delete the session? To confirm, please type
          the name of the course.
        </p>

        <input
          type="text"
          value={enteredCourseName}
          onChange={(e) => setEnteredCourseName(e.target.value)}
          placeholder="Are you sure ? Please Enter Confirm"
          className="w-full border p-2 mb-4 rounded-md"
        />

        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="destructive"
            className="ml-2"
          >
            <Trash size={16} className="mr-2" />
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
