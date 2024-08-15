import { Stack } from "@mui/material";
import React from "react";
interface CounterDisplayProps {
  count: number;
}

const CounterDisplay: React.FC<CounterDisplayProps> = ({ count }) => {
  console.log(count);
  return (
    <Stack direction={"row"}>
      <h3>{count}</h3>
      <h3>: likes</h3>
    </Stack>
  );
};

export default CounterDisplay;
