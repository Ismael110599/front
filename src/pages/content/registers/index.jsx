import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem"; // Importamos para el Select
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:8080/auth/register";

const Register = () => {
    const navigate = useNavigate(); 

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(""); 
    const [pets, setPets] = useState([{ name: "", type: "", age: "" }]);

    const handleAddPet = () => {
        setPets([...pets, { name: "", type: "", age: "" }]);
    };

    const handlePetChange = (index, field, value) => {
        const updatedPets = [...pets];
        updatedPets[index][field] = value;
        setPets(updatedPets);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        console.log("🔹 Rol seleccionado:", e.target.value); // 🔍 Verificación
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !phone || !address || !password || !confirmPassword) {
            toast.warn("⚠️ Todos los campos son obligatorios.", { position: "top-right", autoClose: 3000 });
            return;
        }

        if (password !== confirmPassword) {
            toast.error("❌ Las contraseñas no coinciden.", { position: "top-right", autoClose: 3000 });
            return;
        }

        const userData = {
            name,
            phone,
            email,
            address,
            password,
            role, 
            pets: pets.filter((pet) => pet.name && pet.type && pet.age),
        };

        console.log("🛠 Enviando al backend:", userData); // 🔍 Verificación antes del envío

        try {
            const response = await Axios.post(API_URL, userData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 201) {
                toast.success("✅ Registro exitoso", { position: "top-right", autoClose: 3000 });
                setTimeout(() => navigate("/login"), 3000);
            } else {
                toast.error("❌ Error al registrar.", { position: "top-right", autoClose: 3000 });
            }
        } catch (error) {
            toast.error(`❌ Error en el registro: ${error.response?.data?.message || "Intenta nuevamente"}`, {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "#f3f4f6",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px",
            }}
        >
            <Typography variant="h2" sx={{ marginBottom: "30px", fontWeight: "bold", color: "#000" }}>
                Registro de Usuario
            </Typography>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "800px",
                    backgroundColor: "#ffffff",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                        <TextField label="Nombre Completo" value={name} onChange={(e) => setName(e.target.value)} fullWidth variant="outlined" />
                        <TextField label="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth variant="outlined" />
                        <TextField label="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth variant="outlined" />
                        <TextField label="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth variant="outlined" />
                    </Box>

                    {/* Selección de Rol */}
                    <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: "20px" }}>
                        <TextField
                            select
                            label="Rol"
                            value={role}
                            onChange={handleRoleChange} // Usamos la función corregida
                            variant="outlined"
                            sx={{ minWidth: "200px", width: "auto", backgroundColor: "#f9fafb", borderRadius: "5px" }}
                        >
                            <MenuItem value="user">Usuario</MenuItem>
                            <MenuItem value="caregiver">Cuidador</MenuItem>
                        </TextField>
                    </Box>

                    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                        <TextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth variant="outlined" />
                        <TextField label="Confirmar Contraseña" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} fullWidth variant="outlined" />
                    </Box>

                    <Typography variant="h5" sx={{ marginTop: "30px", color: "#4A90E2" }}>
                        Mascotas
                    </Typography>

                    {pets.map((pet, index) => (
                        <Box key={index} sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "15px" }}>
                            <TextField label="Nombre" value={pet.name} onChange={(e) => handlePetChange(index, "name", e.target.value)} fullWidth variant="outlined" />
                            <TextField label="Tipo" value={pet.type} onChange={(e) => handlePetChange(index, "type", e.target.value)} fullWidth variant="outlined" />
                            <TextField label="Edad" type="number" value={pet.age} onChange={(e) => handlePetChange(index, "age", e.target.value)} fullWidth variant="outlined" />
                        </Box>
                    ))}

                    <Button fullWidth color="secondary" onClick={handleAddPet} sx={{ marginTop: "15px", backgroundColor: "transparent", color: "#000" }}>
                        Agregar Mascota
                    </Button>

                    <Button fullWidth type="submit" sx={{ marginTop: "30px", backgroundColor: "#4A90E2", color: "#fff", "&:hover": { backgroundColor: "#357ABD" } }}>
                        Registrarse
                    </Button>
                </form>

                <Typography variant="body1" sx={{ marginTop: "25px", textAlign: "center", color: "#333" }}>
                    ¿Ya tienes cuenta?{" "}
                    <span onClick={() => navigate("/login")} style={{ color: "#4A90E2", textDecoration: "underline", cursor: "pointer" }}>
                        Inicia sesión
                    </span>
                </Typography>
            </Box>

            <ToastContainer />
        </Box>
    );
};

export default Register;