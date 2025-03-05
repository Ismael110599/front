import React from "react";
import { Container, Grid, Typography, Box, Paper } from "@mui/material";

const ServicesSection = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh", 
        display: "flex", // Permite centrar el contenido
        alignItems: "center", // Centrado vertical
        justifyContent: "center", // Centrado horizontal
        backgroundImage: "url(https://th.bing.com/th/id/R.dcb68fe645c6bd3a4bf00e0955d3a38a?rik=kPe%2fZFe%2fuoIsnA&pid=ImgRaw&r=0)", // Fondo blanco
        padding: 4,
      }}
    >
      <Container>
        <Grid container spacing={0}>
          {/* Servicio: Guardería */}
          <Grid item xs={15} md={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                backgroundColor: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src="https://th.bing.com/th/id/OIP.8k0X5_MgkJEz0W5wV-6QkgHaFE?w=276&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                alt="Daycare"
                sx={{ width: "50%", objectFit: "cover" }}
              />
              <Box sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  GUARDERÍA
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  La guardería se proporciona durante el día, generalmente de 8 a 9
                  a.m. hasta las 3-5 de la tarde. La guardería cuesta desde 10 € al
                  día.
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Servicio: Paseo de Perros */}
          <Grid item xs={12} md={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Box sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  PASEO DE PERROS
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  ¿No puedes pasear a tu perro tan a menudo como te gustaría?
                  Ofrecemos paseos de 30 a 60 minutos para perros, así como servicios
                  de recogida y devolución en su hogar.
                </Typography>
              </Box>
              <Box
                component="img"
                src="https://walac.pe/wp-content/uploads/2018/07/mascotas.jpg"
                alt="Dog Walking"
                sx={{ width: "50%", objectFit: "cover" }}
              />
            </Paper>
          </Grid>

          {/* Servicio: Alojamiento */}
          <Grid item xs={12} md={12}>
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                flexDirection: "row",
                height: "100%",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src="https://th.bing.com/th/id/OIP.buG2dDoAkTqKIaNm-lxwvQHaEz?rs=1&pid=ImgDetMain"
                alt="Pet Boarding"
                sx={{ width: "50%", objectFit: "cover" }}
              />
              <Box sx={{ padding: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ALOJAMIENTO
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                  Cuidado de vacaciones o fines de semana, donde su perro es cuidado en una casa privada por el cuidador de mascotas de su elección. Precio por 24 horas de atención desde 15€ al día.
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection;
