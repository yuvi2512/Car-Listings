import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { TextField, Button, Container, Card,CardHeader,Divider } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (login(username, password)) {
      router.push("/dashboard");
      toast.success("Login successful");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <Card sx={{ padding: 4, margin: 10 }} elevation={5}>
      <Container maxWidth="sm" >
        <CardHeader title="Admin Login"  />
        <Divider sx={{ mb: 2 }} />
        <TextField
          label="Username"
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleLogin}>
          Login
        </Button>
      </Container>
    </Card>
  );
}
