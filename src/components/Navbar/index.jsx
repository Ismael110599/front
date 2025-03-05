import React, { useContext } from "react";
import { AppBar, Toolbar, Button, Box, Container } from "@mui/material";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                color: "#FFFF",
                top: 0,
                width: "100%",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.0)",
                zIndex: 1201,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {/* Logo */}
                    <Box
                        component="img"
                        src="https://img.freepik.com/vector-premium/plantilla-logotipo-perro-guarderia-animales-tienda-mascotas-ilustracion-vectorial_279597-1068.jpg"
                        alt="Logo"
                        sx={{
                            height: 40,
                            borderRadius: "50%",
                            bgcolor: "#fff",
                            padding: "5px",
                        }}
                    />

                    {/* Menú de navegación */}
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Button href="/" sx={navButtonStyle}>Inicio</Button>
                        <Button href="/nosotros" sx={navButtonStyle}>Nosotros</Button>
                        <Button href="/servicio" sx={navButtonStyle}>Servicios</Button>
                        <Button href="/cuidadores" sx={navButtonStyle}>Cuidadores</Button>

                        {/* Opciones según rol */}
                        {user?.role === "admin" && (
                            <Button href="/admin" sx={navButtonStyle}>Panel Admin</Button>
                        )}
                        {user?.role === "caretaker" && (
                            <Button href="/mis-citas" sx={navButtonStyle}>Mis Citas</Button>
                        )}
                        {user?.role === "user" && (
                            <Button href="/mis-mascotas" sx={navButtonStyle}>Mis Mascotas</Button>
                        )}

                        {/* Botón de login/logout */}
                        {user ? (
                            <Button
                                sx={navButtonStyle}
                                onClick={() => {
                                    logout();
                                    navigate("/login");
                                }}
                            >
                                Cerrar Sesión
                            </Button>
                        ) : (
                            <Button href="/login" sx={navButtonStyle}>Inicia Sesión</Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

// Estilos reutilizables para los botones del Navbar
const navButtonStyle = {
    textTransform: "none",
    fontSize: "15px",
    color: "#000",
    transition: "0.3s",
    "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
};

export default Navbar;
