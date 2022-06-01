import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { hideSignUpForm, createUser } = useUser();

  const navigate = useNavigate();

  const SignUpHandler = async (e: any) => {
    e.preventDefault();
    hideSignUpForm();
  };

  const signUp = async (e: any) => {
    e.preventDefault();
    createUser(email, password);
    navigate("/");
  };

  return (
    <div className="cart-container" style={{ minHeight: "calc(100vh - 9rem)" }}>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="on"
      >
        <div className="form-container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 style={{ margin: "1rem 0" }}>Skapa konto</h1>
            <TextField
              style={{ margin: "1rem 0" }}
              className="box-1-input"
              type="email"
              name="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <TextField
              style={{ margin: "1rem 0" }}
              name="password"
              label="Lösenord"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ width: "100%", background: "#333333", marginBottom: "1rem" }}
            onClick={signUp}
          >
            Skapa konto
          </Button>
        </div>

        <button
          onClick={SignUpHandler}
          style={{ background: "none", border: "none", paddingTop: "1rem" }}
        >
          <p>Har du inget konto? Registrera dig här.</p>
        </button>
      </Box>
    </div>
  );
}

export default SignUpForm;
