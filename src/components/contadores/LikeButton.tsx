// src/components/LikeButton.tsx
import React from "react";
import { Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface LikeButtonProps {
  onLike: () => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ onLike }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onLike}
      startIcon={<ThumbUpIcon />}
    >
      Poner
    </Button>
  );
};

export default LikeButton;
