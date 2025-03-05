import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Typography, Grid, Paper, Avatar, Box, Tabs, Tab, Divider, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [caregivers, setCaregivers] = useState([]);
  const [filteredCaregivers, setFilteredCaregivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('❌ No se encontró el token de autenticación');
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await Axios.get('http://localhost:8080/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
          
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error obteniendo perfil:", error);
        toast.error('❌ No se pudo obtener el perfil');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (!userData || userData.role !== 'user') return;

    const token = localStorage.getItem('token');
    const fetchCaregivers = async () => {
      try {
        const response = await Axios.get('http://localhost:8080/users/list', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Lista de usuarios:", response.data);
        const filtered = response.data.data.filter(user => user.role === 'caregiver');
        console.log("Cuidadores filtrados:", filtered);
        setCaregivers(filtered);
        setFilteredCaregivers(filtered);
      } catch (error) {
        console.error("Error obteniendo cuidadores:", error);
        toast.error('❌ No se pudo obtener la lista de cuidadores');
      }
    };

    fetchCaregivers();
  }, [userData]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = caregivers.filter(
      (caregiver) =>
        caregiver.name.toLowerCase().includes(value) ||
        caregiver.email.toLowerCase().includes(value)
    );

    setFilteredCaregivers(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('✅ Sesión cerrada correctamente');
    navigate('/login');
  };

  if (!userData) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5">Cargando perfil...</Typography>
      </Box>
    );
  }

  const { name, email, phone, address, role, pets } = userData;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
      <Grid container spacing={3} sx={{ maxWidth: 1200, width: '100%' }}>
        <Grid item xs={12} md={5}>
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 3, textAlign: 'center' }}>
            <Avatar alt={name} src="/placeholder.svg" sx={{ width: 120, height: 120, margin: '0 auto' }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 2 }}>{name}</Typography>
            <Typography variant="h6" color="textSecondary">{role === 'caregiver' ? 'Cuidador de Mascotas' : 'Usuario'}</Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Información de Contacto</Typography>
            <Typography>{phone}</Typography>
            <Typography>{email}</Typography>
            <Typography>{address}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 3 }}>
            <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} centered>
              <Tab label="Mascotas" />
              <Tab label="Información" />
              {role === 'user' && <Tab label="Cuidadores" />}
              <Tab label="Opciones" />
            </Tabs>

            <Box sx={{ padding: 3, minHeight: 150 }}>
              {selectedTab === 0 && pets && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Mascotas Registradas</Typography>
                  <Grid container spacing={2}>
                    {pets.map((pet, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper sx={{ padding: 3, textAlign: 'center', borderRadius: 2 }}>
                          <Typography variant="h6">{pet.name}</Typography>
                          <Typography>Tipo: {pet.type}</Typography>
                          <Typography>Edad: {pet.age} años</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {selectedTab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Información Personal</Typography>
                  <Typography>Nombre: {name}</Typography>
                  <Typography>Correo: {email}</Typography>
                  <Typography>Teléfono: {phone}</Typography>
                  <Typography>Dirección: {address}</Typography>
                </Box>
              )}

              {selectedTab === 2 && role === 'user' && (
                <Box>
                  <TextField fullWidth label="Buscar cuidador..." variant="outlined" value={searchTerm} onChange={handleSearch} sx={{ marginBottom: 2 }} />
                  <Grid container spacing={2}>
                    {filteredCaregivers.map((caregiver, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Paper sx={{ padding: 3, textAlign: 'center', borderRadius: 2 }}>
                          <Typography variant="h6">{caregiver.name}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default Profile;
