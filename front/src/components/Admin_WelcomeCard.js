import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Admin_Picture from "../assets/flat-design-illustration-customer-support.png";
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
    "linear-gradient(34deg, #1976D2 0%, #7FB8F0 29%, #559CE2 92%)",

  [breakpoints.up("sm")]: {
    textAlign: "left",
    flexDirection: "row-reverse",
  },
}));

const CardMediaMedia = styled(CardMedia)(({ theme: { breakpoints } }) => ({
  flexShrink: 0,
  width: "50%",
  paddingTop: "30%",
  marginLeft: "auto",
  marginRight: "auto",
  overflow: "visible",

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


export function AdminHomeCard(adminId) {
    console.log(adminId);
  return (
    <StyledCard>
      <CardMediaMedia
        image={Admin_Picture}
      />
      <CardContent>
        <TypographyOverline variant={"overline"}>
          Admin ID: {adminId.adminId}
        </TypographyOverline>
        <TypographyHeading variant={"h3"} gutterBottom>
          Welcome Admin
        </TypographyHeading>
      </CardContent>
    </StyledCard>
  );
}