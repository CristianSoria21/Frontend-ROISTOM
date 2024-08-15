// src/components/DislikeButton.tsx
import React from "react";
import { Button } from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface DislikeButtonProps {
  onDislike: () => void;
}

const DislikeButton: React.FC<DislikeButtonProps> = ({ onDislike }) => {
  return (
    <Button
      variant="contained"
      color="error"
      onClick={onDislike}
      startIcon={<ThumbDownIcon />}
    >
      Quitar
    </Button>
  );
};

export default DislikeButton;
