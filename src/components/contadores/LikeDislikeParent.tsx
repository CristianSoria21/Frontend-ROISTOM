import React from "react";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import CounterDisplay from "./CounterDisplay";
import useCount from "../../hooks/useCount";
import { Stack, Typography } from "@mui/material";

const LikeDislikeParent: React.FC = () => {
  const { count, increment, decrement } = useCount();

  return (
    <Stack>
      <Typography variant="h6" fontWeight={600}>
        Contador de Likes
      </Typography>
      <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
        <LikeButton onLike={increment} />
        <DislikeButton onDislike={decrement} />
        <CounterDisplay count={count} />
      </Stack>
    </Stack>
  );
};

export default LikeDislikeParent;
