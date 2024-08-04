import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Trainer_Picture from "../assets/Trainer Welcome Card Photo.png";
import 'typeface-roboto';
const StyledCard = styled(Card)(({ theme: { breakpoints, spacing } }) => ({
  maxWidth: 1000, width: '100%', margin: 'auto',
  // 16px
  borderRadius: spacing(2),
  marginTop: '50px',
  marginBottom: '20px',
  transition: "0.3s",
  boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
  position: "relative",
  overflow: "initial",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",

  background:
    "linear-gradient(34deg, #623AD6 0%, #9D9BE8 29%, #806BDF 92%)",

  [breakpoints.up("sm")]: {
    textAlign: "left",
    flexDirection: "row-reverse",
  },
}));

const CardMediaMedia = styled(CardMedia)(({ theme: { breakpoints } }) => ({
  flexShrink: 0,
  width: "55%",
  paddingTop: "30%",
  marginLeft: "auto",
  marginRight: "auto",
  overflow: "hidden",

  [breakpoints.up("sm")]: {
    marginRight: "initial",
  },
}));

const TypographyOverline = styled(Typography)(({}) => ({
  lineHeight: 2,
  color: "#ffffff",
  fontWeight: "bold",
  fontFamily: "Roboto",
  fontSize: "0.625rem",
  opacity: 0.9,
}));

const TypographyHeading = styled(Typography)(({}) => ({
  fontWeight: 700,
  color: "#ffffff",
  fontFamily: "Roboto",
  letterSpacing: 0.5,
}));


export function TrainerHomeCard(trainerId) {
  return (
    <StyledCard>
      <CardMediaMedia
        image={Trainer_Picture}
      />
      <CardContent>
        <TypographyOverline variant={"overline"}>
          Trainer ID: {trainerId.trainerId}
        </TypographyOverline>
        <TypographyHeading variant={"h3"} gutterBottom>
          Welcome Trainer
        </TypographyHeading>
      </CardContent>
    </StyledCard>
  );
}