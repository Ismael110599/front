import React from "react";
import { Box, Typography } from "@mui/material";

const InfoBox = ({ title, description, backgroundColor, titleColor, descriptionColor }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                maxWidth: "50%",
                position: "absolute",
                top: "50%", // Centra verticalmente
                left: "0", // Alinea al lado izquierdo
                transform: "translateY(-50%)", // Ajusta para centrar exactamente
                padding: "20px", // Espaciado interno
                backgroundColor: backgroundColor || "rgba(255, 255, 255, 0.8)", // Fondo semitransparente
                borderRadius: "8px", // Bordes redondeados
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Sombra para destacar
            }}
        >
            {title && (
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: titleColor || "#f00" }}>
                    {title}
                </Typography>
            )}
            <Typography variant="body2" sx={{ mb: 3, color: descriptionColor || "#000" }}>
                {description}
            </Typography>
        </Box>
    );
};

export default InfoBox;
