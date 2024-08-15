import React, { useState } from "react";
import { createPersona, getPersonas } from "../services/personasService";
import { Persona } from "../types";
import {
  Button,
  TextField,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface AddPersonaProps {
  onAdd: () => void;
}

const AddPersona: React.FC<AddPersonaProps> = ({ onAdd }) => {
  const [formData, setFormData] = useState<Persona>({
    nombre: "",
    email: "",
    edad: 0,
    sexo: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emaillPersonas = await getPersonas();
    const emailExists = emaillPersonas.data.some(
      (persona) => persona.email === formData.email
    );

    if (emailExists) {
      setError("El correo ya está en uso. Por favor, usa uno diferente.");
      return;
    } else if (formData.edad <= 0) {
      setError("La edad debe ser mayor que 0 años");
      return;
    } else {
      setError("");
      await createPersona(formData);
      setFormData({
        nombre: "",
        email: "",
        edad: 0,
        sexo: "",
      });
    }

    if (onAdd) onAdd();
  };

  return (
    <div>
      <Typography variant="h4" sx={{ m: 2 }}>
        Agregar Persona
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              error={!!error && error.includes("correo")}
              helperText={error && error.includes("correo") ? error : ""}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Edad"
              name="edad"
              type="number"
              value={formData.edad}
              onChange={handleChange}
              fullWidth
              required
              error={!!error && error.includes("edad")}
              helperText={error && error.includes("edad") ? error : ""}
            />
          </Grid>
          <Grid item xs={2}>
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
          <Grid item xs={3}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPersona;
