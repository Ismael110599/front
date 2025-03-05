// Footer.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparente con ligera opacidad
                backdropFilter: "blur(10px)", // Efecto de desenfoque tipo "cristal"
                color: "#000",
                padding: "5px 0",
                position: "fixed", 
                bottom: 0,
                width: "100%",
            }}
        >
            <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                <Typography variant="body2" align="center" sx={{ marginBottom: "10px" }}>
                    &copy; {new Date().getFullYear()} UIDE. Todos los derechos reservados.
                </Typography>


                <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <Link href="https://www.facebook.com" target="_blank" sx={{ color: "#000" }}>
                        <Facebook />
                    </Link>
                    <Link href="https://www.instagram.com" target="_blank" sx={{ color: "#000" }}>
                        <Instagram />
                    </Link>
                    <Link href="https://www.twitter.com" target="_blank" sx={{ color: "#000" }}>
                        <Twitter />
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
