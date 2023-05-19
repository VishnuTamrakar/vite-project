import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

const FirstPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phoneNumber || !email) {
      alert(
        "indicating that they must enter their details before accessing the page."
      );
      return;
    }
    // Save user details in local storage
    const userDetails = {
      name,
      phoneNumber,
      email,
    };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    // Redirect to the second page
    userDetails ? navigate("/second") : navigate("/");
  };

  return (
    <>
      <Box sx={{ maxWidth: 400, margin: "0 auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          User Information
        </Typography>
        <form>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            type="email"
            required
          />

          <Button variant="contained" onClick={handleFormSubmit} fullWidth>
            Submit
          </Button>
        </form>
      </Box>
    </>
  );
};

export default FirstPage;
