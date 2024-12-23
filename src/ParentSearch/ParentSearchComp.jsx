import { useSelector } from "react-redux";
import React from "react";
import FilteredCards from "./FilteredCards";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
export default function ParentSearchComp() {
  const isSearching = useSelector(
    (state) => state.config.searchRoute.isSearching
  );

  return (
    <Box>
      {isSearching ? (
        <FilteredCards />
      ) : (
        <Typography>No search initiated.</Typography>
      )}
    </Box>
  );
}
