import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, Paper, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Verificando token en localStorage:", token);
        if (token) {
            navigate("/perfil-cuidador");  // Ruta corregida
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                email: formData.email,
                password: formData.password,
            });
            console.log("Respuesta del servidor:", response.data);
            toast.success(response.data.message);

            const token = response.data?.data?.token;
            if (token) {
                localStorage.setItem("token", token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                console.log("Token guardado en localStorage:", localStorage.getItem("token"));

                navigate("/perfil-cuidador"); 
            } else {
                toast.error("No se recibió el token. Verifica la API.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            toast.error(error.response?.data?.message || "Error al iniciar sesión.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <Box
            sx={{
                backgroundColor: "white",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Container maxWidth="sm">
                <Box
                    component={Paper}
                    elevation={6}
                    sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: 400,
                        margin: "auto",
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                        Iniciar Sesión
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <TextField
                            label="Correo Electrónico"
                            type="email"
                            name="email"
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                        <TextField
                            label="Contraseña"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            fullWidth
                            margin="normal"
                            required
                            variant="outlined"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{
                                                color: "#1976d2",
                                                '&:hover': { color: "#1565c0" },
                                            }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                mt: 2,
                                backgroundColor: "#1976d2",
                                '&:hover': { backgroundColor: "#1565c0" },
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Iniciar Sesión"}
                        </Button>
                    </form>
                    <Typography
                        variant="body1"
                        sx={{
                            marginTop: "20px",
                            textAlign: "center",
                            color: "#000",
                        }}
                    >
                        ¿No tienes cuenta?{" "}
                        <span
                            onClick={() => navigate("/convertirse-en-cuidador")}
                            style={{
                                color: "blue",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            Regístrate
                        </span>
                    </Typography>
                </Box>
            </Container>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </Box>
    );
};

export default Login;
