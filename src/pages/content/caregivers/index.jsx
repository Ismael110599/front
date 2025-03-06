import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Avatar, Grid, Chip, TextField } from "@mui/material";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Caregivers = () => {
    const [caregiversList, setCaregiversList] = useState([]);
    const [filteredCaregivers, setFilteredCaregivers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCaregivers = async () => {
            try {
                const response = await Axios.get("http://3.95.164.82:8080/users/list", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                // Filtrar solo los usuarios con rol 'user'
                const caregivers = response.data.data.filter(user => user.role === "caregiver");
                setCaregiversList(caregivers);
                setFilteredCaregivers(caregivers);
            } catch (error) {
                console.error("Error al obtener la lista de cuidadores:", error);
                toast.error("❌ No se pudo obtener la lista de cuidadores. Inténtalo más tarde.");
            }
        };

        fetchCaregivers();
    }, []);

    // Función para filtrar la lista según el término de búsqueda
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = caregiversList.filter(
            (caregiver) =>
                caregiver.name.toLowerCase().includes(value) ||
                caregiver.email.toLowerCase().includes(value)
        );

        setFilteredCaregivers(filtered);
    };

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                padding: "40px 20px",
                paddingBottom: "40px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#f7f7f7",
                flexGrow: 1,
                overflow: "auto", // Asegura que el contenido se ajuste correctamente
            }}
        >
            {/* Título */}
            <Typography variant="h4" fontWeight="bold" marginBottom={3}>
                Lista de Cuidadores
            </Typography>

            {/* Buscador */}
            <Box sx={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }}>
                <TextField
                    fullWidth
                    label="Buscar cuidador..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Box>

            {/* Lista de cuidadores */}
            <Grid
                container
                spacing={3}
                justifyContent="center"
                sx={{
                    width: "100%",
                    maxWidth: "100vh",
                    flexGrow: 1
                }}
            >
                {filteredCaregivers.length > 0 ? (
                    filteredCaregivers.map((caregiver, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{
                                borderRadius: "12px",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                                backgroundColor: "#fff",
                                padding: "15px",
                                display: "flex",
                                flexDirection: "column",
                                height: "auto" // Permite que cada tarjeta tenga la altura que necesita
                            }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                        <Avatar
                                            src={caregiver.profilePicture ? `${caregiver.profilePicture}` : "/placeholder.svg"}

                                            sx={{ width: 60, height: 60, marginRight: "15px" }} />
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold">{caregiver.name}</Typography>
                                            <Typography variant="body2" color="textSecondary">{caregiver.email}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">📍 Dirección: {caregiver.address || "No especificado"}</Typography>
                                    <Typography variant="body2" color="textSecondary">📞 Teléfono: {caregiver.phone || "No disponible"}</Typography>

                                    <Typography variant="subtitle1" fontWeight="bold" marginTop={2}>Mascotas que ha cuidado</Typography>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                        {caregiver.pets.length > 0 ? (
                                            caregiver.pets.map((pet, idx) => (
                                                <Chip key={idx} label={`${pet.name} - ${pet.type}`} sx={{ backgroundColor: "#e0e0e0" }} />
                                            ))
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">No tiene mascotas registradas</Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">No se encontraron cuidadores</Typography>
                )}
            </Grid>


            <ToastContainer />
        </Box>
    );
};

export default Caregivers;
