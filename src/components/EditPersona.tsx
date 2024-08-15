import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePersona } from "../services/personasService";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Stack,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useFetch } from "../hooks/useFetch";

const EditPersona: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: persona,
    loading,
    error,
  } = useFetch(`http://127.0.0.1:8000/api/personas/${id}`);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    edad: 0,
    sexo: "",
  });

  useEffect(() => {
    if (persona) {
      setFormData(persona);
    }
  }, [persona]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSexo = (e: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      sexo: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (persona?.id) {
      await updatePersona(persona.id, formData);
      navigate("/");
    }
  };


  

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Stack sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ m: 2 }}>
        Editar Persona
      </Typography>
      <form onSubmit={handleUpdate}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleFormChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Edad"
              name="edad"
              type="number"
              value={formData.edad}
              onChange={handleFormChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Sexo</InputLabel>
              <Select
                label="Sexo"
                name="sexo"
                value={formData.sexo}
                onChange={handleSexo}
              >
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="F">F</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success">
              Actualizar Persona
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate("/")}
              sx={{ marginLeft: 1 }}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
};

export default EditPersona;
