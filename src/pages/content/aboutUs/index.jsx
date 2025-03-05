import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const AboutUs = () => {
    return (
        <>
            <Box
                sx={{
                    width: "100%", // Asegura que ocupe todo el ancho
                    minHeight: "100vh", // Ocupa todo el alto del viewport
                    backgroundImage:
                        "url(https://th.bing.com/th/id/R.dcb68fe645c6bd3a4bf00e0955d3a38a?rik=kPe%2fZFe%2fuoIsnA&pid=ImgRaw&r=0)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                    display: "flex",
                    justifyContent: "center", // Centra el contenido horizontalmente
                    alignItems: "center", // Centra el contenido verticalmente
                    padding: "20px",
                    color: "#fff",
                }}
            >
                {/* Contenedor principal */}
                <Box
                    sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.0)", // Fondo translúcido
                        borderRadius: "50px",
                        padding: "40px",
                        maxWidth: "900px",
                        width: "100%",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Sombra para realce
                    }}
                >

                    {/* InfoBox estático */}
                    <Box
                        sx={{
                            backgroundColor: "#ffff", // Fondo blanco translúcido
                            borderRadius: "8px",
                            padding: "20px",
                            marginBottom: "20px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Sombra sutil
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ color: "#f00", marginBottom: "10px", textAlign: "center" }}
                        >
                            ¿Estás buscando cuidadores de perros mientras estás de vacaciones?
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#000", textAlign: "justify" }}>
                            Pet Friend conecta a dueños de perros con cuidadores confiables y cercanos que ofrecen atención personalizada,
                            como paseos, cuidado por horas o compañía diaria. Todos los cuidadores pasan un riguroso proceso de selección,
                            garantizando un servicio responsable y amoroso. La plataforma permite buscar según ubicación, disponibilidad y
                            opiniones de otros usuarios.
                        </Typography>
                    </Box>

                    {/* Contenedor de imágenes con Grid */}
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", // Cuadrícula adaptativa
                            gap: "20px", // Espacio entre imágenes
                            justifyContent: "center", // Centra el contenido
                        }}
                    >
                        <img
                            src="https://th.bing.com/th/id/OIP.5Eadm4ZD3doFoZFYKDjbtAHaE8?rs=1&pid=ImgDetMain"
                            alt="Cuidado de mascotas"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para las imágenes
                                objectFit: "cover", // Asegura que la imagen no se deforme
                            }}
                        />
                        <img
                            src="https://www.kissfm.es/wp-content/uploads/2019/10/GettyImages-942616500-1000x667.jpg"
                            alt="Cuidado de mascotas"
                            style={{
                                width: "100%",
                                height: "auto",
                                borderRadius: "8px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para las imágenes
                                objectFit: "cover", // Asegura que la imagen no se deforme
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AboutUs;
