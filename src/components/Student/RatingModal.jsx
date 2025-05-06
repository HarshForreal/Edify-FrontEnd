import React, { useState } from "react";
import { Button } from "../ui";

const RatingModal = ({ courseId, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    // Call the onSubmit function passed from parent (which sends review data)
    onSubmit(rating, comment);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Rate this Course</h2>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${
                rating >= star ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
          className="w-full p-2 border rounded-md"
        />
        <div className="mt-4 flex justify-between">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
