import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPersonas, deletePersona } from "../services/personasService";
import { Persona } from "../types";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPersona from "./AddPersona";
import LikeDislikeParent from "./contadores/LikeDislikeParent";

const PersonaList: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fechPersonas();
  }, []);

  const fechPersonas = async () => {
    const response = await getPersonas();
    setPersonas(response.data);
  };

  const handleDelete = async (id: number) => {
    await deletePersona(id);
    setPersonas(personas.filter((persona) => persona.id !== id));
  };

  const handleEdit = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <Stack sx={{ m: 2 }}>
      <Typography variant="h2" sx={{ pt: 1, m: 2 }}>
        Prueba técnica React
      </Typography>
      <Stack sx={{ p: "20px", alignItems: "center" }}>
        <LikeDislikeParent />
      </Stack>

      <AddPersona onAdd={fechPersonas} />
      <Typography variant="h4" sx={{ pt: 3, m: 2 }}>
        Lista de personas
      </Typography>

      <Grid container spacing={1}>
        {personas.map((persona) => (
          <Grid item sm={12} md={6} key={persona.id}>
            <Card>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#ecedef",
                }}
              >
                <Stack direction="column">
                  <Typography variant="h5">{persona.nombre}</Typography>
                  <Typography color="textSecondary">{persona.email}</Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6">Sexo: {persona.sexo}</Typography>
                    <Typography variant="h6">Edad: {persona.edad}</Typography>
                  </Stack>
                </Stack>
                <Stack direction="column" spacing={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(persona.id!)}
                    startIcon={<EditIcon />}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(persona.id!)}
                    startIcon={<DeleteIcon />}
                  >
                    Borrar
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default PersonaList;
