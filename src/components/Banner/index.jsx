import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate

const Banner = () => {
    const navigate = useNavigate(); // Usamos useNavigate para la navegación

    const handleClick = () => {
        navigate("/nosotros"); // Redirige a la ruta /nosotros
    };

    return (
        <Box
            sx={{
                width: "100%", 
                height: "100vh", 
                backgroundImage: `url("https://cepcan.com.ec/assets/images/hotel-guarderia-canina.jpg")`, 
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed", 
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 5%",
                color: "#fff",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    maxWidth: "50%",
                    position: "fixed",
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                    Pet Friend
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    Guardería para mascotas
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#D15623",
                        color: "#fff",
                        textTransform: "none",
                        fontSize: "16px",
                        padding: "10px 20px",
                        "&:hover": { backgroundColor: "#F2A76F" },
                    }}
                    onClick={handleClick} // Llamamos a handleClick al hacer clic
                >
                    Conócenos
                </Button>
            </Box>

            <Box sx={{ flex: 1 }}></Box>
        </Box>
    );
};

export default Banner;
