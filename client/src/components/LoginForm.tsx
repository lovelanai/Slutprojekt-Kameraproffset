import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

  const LoginHandler = async (e: any) => {
    e.preventDefault();

    let result = await fetch("/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.ok) {
      result = await result.json();
      setPassword("");
      setEmail("");
      login();
      return alert("Du är inloggad");
    } else {
      console.log(email, password);
      return alert(
        "Du är redan inloggad eller angivit fel användarnamn / lösenord"
      );
    }
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ margin: "1rem 0" }}>Logga in</h1>
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
        </div>
        <Button
          type="submit"
          variant="contained"
          size="medium"
          sx={{ width: "100%" }}
          onClick={LoginHandler}
        >
          Bekräfta
        </Button>
      </Box>
    </div>
  );
}
