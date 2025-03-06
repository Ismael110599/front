import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { Button, Typography, Grid, Paper, Avatar, Box, Tabs, Tab, Divider, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { debounce } from 'lodash';

// Función para formatear la fecha como YYYY-MM-DD
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Meses empiezan en 0
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [caregivers, setCaregivers] = useState([]);
  const [filteredCaregivers, setFilteredCaregivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", pets: [] });
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [openNotifyDialog, setOpenNotifyDialog] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [notifyData, setNotifyData] = useState({
    startDate: formatDate(new Date()), // Fecha actual
    endDate: formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // Una semana después
    petDetails: "",
  });
  const navigate = useNavigate();

  const redirectToLogin = () => {
    toast.error('❌ No se encontró el token de autenticación');
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      redirectToLogin();
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await Axios.get('http://localhost:8080/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data.data);
        setFormData({
          name: response.data.data.name || "",
          phone: response.data.data.phone || "",
          address: response.data.data.address || "",
          pets: response.data.data.pets || [],
        });
      } catch (error) {
        console.error("Error obteniendo perfil:", error);
        toast.error('❌ No se pudo obtener el perfil');
        redirectToLogin();
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!userData || userData.role !== 'user') return;

    const token = localStorage.getItem('token');
    const fetchCaregivers = async () => {
      try {
        const response = await Axios.get('http://localhost:8080/users/list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const filtered = response.data.data.filter(user => user.role === 'caregiver');
        setCaregivers(filtered);
        setFilteredCaregivers(filtered);
      } catch (error) {
        console.error("Error obteniendo cuidadores:", error);
        toast.error('❌ No se pudo obtener la lista de cuidadores');
      }
    };

    fetchCaregivers();
  }, [userData]);

  const filterCaregivers = useCallback(
    debounce((value) => {
      const filtered = caregivers.filter(
        (caregiver) =>
          caregiver.name.toLowerCase().includes(value.toLowerCase()) ||
          caregiver.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCaregivers(filtered);
    }, 300),
    [caregivers]
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    filterCaregivers(value);
  };

  const handleLogout = () => setOpenLogoutDialog(true);

  const confirmLogout = () => {
    localStorage.removeItem('token');
    toast.success('✅ Sesión cerrada correctamente');
    navigate('/login');
    setOpenLogoutDialog(false);
  };

  const cancelLogout = () => setOpenLogoutDialog(false);

  const handleEditProfile = () => setEditMode(true);

  const handleSaveProfile = async () => {
    const token = localStorage.getItem('token');
    const invalidPet = formData.pets.find(
      (pet) => !pet.name || !pet.type || pet.age === '' || isNaN(pet.age)
    );
    if (invalidPet) {
      toast.error('❌ Todas las mascotas deben tener nombre, tipo y edad (numérica)');
      return;
    }

    try {
      const response = await Axios.put('http://localhost:8080/users/update', {
        ...formData,
        pets: formData.pets.map(pet => ({
          name: pet.name,
          type: pet.type,
          age: Number(pet.age),
        })),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data.data);
      toast.success('✅ Perfil actualizado correctamente');
      setEditMode(false);
    } catch (error) {
      console.error('Error actualizando el perfil:', error);
      toast.error('❌ No se pudo actualizar el perfil');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddPet = () => {
    const newPet = { name: '', type: '', age: '' };
    setFormData({ ...formData, pets: [...formData.pets, newPet] });
  };

  const handlePetChange = (index, field, value) => {
    setFormData(prevState => {
      const pets = [...prevState.pets];
      pets[index] = { ...pets[index], [field]: field === 'age' ? value : value };
      return { ...prevState, pets };
    });
  };

  const handleRemovePet = (index) => {
    setFormData(prevState => ({
      ...prevState,
      pets: prevState.pets.filter((_, i) => i !== index),
    }));
  };

  const handleOpenNotifyDialog = (caregiver) => {
    setSelectedCaregiver(caregiver);
    setOpenNotifyDialog(true);
  };

  const handleCloseNotifyDialog = () => {
    setOpenNotifyDialog(false);
    setNotifyData({
      startDate: formatDate(new Date()), // Reinicia a la fecha actual
      endDate: formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // Una semana después
      petDetails: "",
    });
    setSelectedCaregiver(null);
  };

  const handleNotifyChange = (e) => {
    const { name, value } = e.target;
    setNotifyData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSendNotification = async () => {
    const token = localStorage.getItem('token');
    if (!notifyData.startDate || !notifyData.endDate || !notifyData.petDetails) {
      toast.error('❌ Por favor completa todos los campos.');
      return;
    }

    const notificationPayload = {
      caretakerName: selectedCaregiver.name,
      startDate: notifyData.startDate,
      endDate: notifyData.endDate,
      petDetails: notifyData.petDetails,
      ownerName: userData.name,
      ownerAddress: userData.address,
      ownerPhone: userData.phone,
    };

    try {
      await Axios.post('http://localhost:8080/notifications/notify', notificationPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`✅ Notificación enviada a ${selectedCaregiver.name}.`);
      handleCloseNotifyDialog();
    } catch (error) {
      console.error('Error enviando notificación:', error);
      toast.error('❌ No se pudo enviar la notificación.');
    }
  };

  if (!userData) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5">Cargando perfil...</Typography>
      </Box>
    );
  }

  const { name, email, phone, address, role } = userData;

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
            {!editMode && <Button variant="outlined" sx={{ marginTop: 2 }} onClick={handleEditProfile}>Editar Perfil</Button>}
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper elevation={10} sx={{ padding: 4, borderRadius: 3 }}>
            <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} centered>
              {role === 'user' && <Tab label="Mascotas" />}
              <Tab label="Información" />
              {role === 'user' && <Tab label="Cuidadores" />}
            </Tabs>

            <Box sx={{ padding: 3, minHeight: 150 }}>
              {role === 'user' && selectedTab === 0 && (
                // Sección de mascotas (sin cambios)
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Mascotas
                  </Typography>
                  {formData.pets.length === 0 && (
                    <Typography color="textSecondary">Aún no tienes mascotas registradas.</Typography>
                  )}
                  {formData.pets.map((pet, index) => (
                    <Box key={index} sx={{ marginBottom: 2 }}>
                      <TextField
                        fullWidth
                        label="Nombre de la mascota"
                        variant="outlined"
                        value={pet.name}
                        onChange={(e) => handlePetChange(index, 'name', e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
                      />
                      <TextField
                        fullWidth
                        label="Tipo"
                        variant="outlined"
                        value={pet.type}
                        onChange={(e) => handlePetChange(index, 'type', e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
                      />
                      <TextField
                        fullWidth
                        label="Edad"
                        variant="outlined"
                        type="number"
                        value={pet.age}
                        onChange={(e) => handlePetChange(index, 'age', e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
                      />
                      {editMode && (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemovePet(index)}
                        >
                          Eliminar
                        </Button>
                      )}
                    </Box>
                  ))}
                  {editMode && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                      <Button variant="contained" onClick={handleAddPet}>
                        Agregar Mascota
                      </Button>
                    </Box>
                  )}
                </Box>
              )}

              {(role === 'user' ? selectedTab === 1 : selectedTab === 0) && (
                editMode ? (
                  // Sección de edición de información (sin cambios)
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                      Editar Información Personal
                    </Typography>
                    <TextField
                      fullWidth
                      label="Nombre"
                      variant="outlined"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Teléfono"
                      variant="outlined"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <TextField
                      fullWidth
                      label="Dirección"
                      variant="outlined"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      sx={{ marginBottom: 2 }}
                    />
                    <Box sx={{ marginTop: 2 }}>
                      <Button variant="contained" onClick={handleSaveProfile} sx={{ marginRight: 2 }}>
                        Guardar Cambios
                      </Button>
                      <Button variant="outlined" onClick={() => {
                        setEditMode(false);
                        setFormData({
                          name: userData.name || "",
                          phone: userData.phone || "",
                          address: userData.address || "",
                          pets: userData.pets || [],
                        });
                      }}>
                        Cancelar
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                      Información Personal
                    </Typography>
                    <Typography><strong>Nombre:</strong> {name}</Typography>
                    <Typography><strong>Teléfono:</strong> {phone}</Typography>
                    <Typography><strong>Dirección:</strong> {address}</Typography>
                  </Box>
                )
              )}

              {role === 'user' && selectedTab === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                    Cuidadores Disponibles
                  </Typography>
                  <TextField
                    fullWidth
                    label="Buscar cuidador por nombre o email"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ marginBottom: 2 }}
                  />
                  {filteredCaregivers.length === 0 ? (
                    <Typography>No se encontraron cuidadores.</Typography>
                  ) : (
                    filteredCaregivers.map((caregiver) => (
                      <Box key={caregiver.email} sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography>{caregiver.name}</Typography>
                          <Typography color="textSecondary">{caregiver.email}</Typography>
                        </Box>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenNotifyDialog(caregiver)}
                        >
                          Notificar
                        </Button>
                      </Box>
                    ))
                  )}
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ position: 'fixed', top: 20, right: 20 }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Box>

      {/* Diálogo de cerrar sesión */}
      <Dialog open={openLogoutDialog} onClose={cancelLogout}>
        <DialogTitle>{"¿Cerrar sesión?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas cerrar tu sesión? Tendrás que iniciar sesión nuevamente para acceder a tu perfil.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout} color="primary">Cancelar</Button>
          <Button onClick={confirmLogout} color="error" autoFocus>Cerrar sesión</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de notificación */}
      <Dialog open={openNotifyDialog} onClose={handleCloseNotifyDialog}>
        <DialogTitle>{`Notificar a ${selectedCaregiver?.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Completa los detalles para notificar al cuidador sobre el cuidado de tu mascota.
          </DialogContentText>
          <TextField
            fullWidth
            label="Fecha de inicio"
            type="date"
            variant="outlined"
            name="startDate"
            value={notifyData.startDate}
            onChange={handleNotifyChange}
            sx={{ marginTop: 2 }}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Fecha de fin"
            type="date"
            variant="outlined"
            name="endDate"
            value={notifyData.endDate}
            onChange={handleNotifyChange}
            sx={{ marginTop: 2 }}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            fullWidth
            label="Detalles de la mascota"
            variant="outlined"
            name="petDetails"
            value={notifyData.petDetails}
            onChange={handleNotifyChange}
            multiline
            rows={3}
            sx={{ marginTop: 2 }}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotifyDialog} color="primary">Cancelar</Button>
          <Button onClick={handleSendNotification} color="primary">Enviar</Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </Box>
  );
};

export default Profile;