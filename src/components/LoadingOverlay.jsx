import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const FullscreenOverlayBox = styled(Box)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

const FlexColumnContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const LoadingOverlay = () => {
  return (
    <FullscreenOverlayBox>
      {/* <FlexColumnContainer sx={{ justifyContent: "center" }}> */}
        {/* <Typography
          sx={{ padding: "4px 8px ", width: "40px", height: "40px" }}
          variant="h3"
        >
          Loading...
        </Typography> */}
        <CircularProgress
          size={64}
          color="primary"
          // sx={{ marginLeft: "5rem", marginTop: "5rem" }}
        />
      {/* </FlexColumnContainer> */}
    </FullscreenOverlayBox>
  );
};
