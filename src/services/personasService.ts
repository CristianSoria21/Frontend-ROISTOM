// src/services/personasService.ts
import api from "../api";
import { Persona } from "../types";

export const getPersonas = () => api.get<Persona[]>("/");
export const getPersona = (id: number) => api.get<Persona>(`/${id}`);
export const createPersona = (persona: Persona) => api.post("/", persona);
export const updatePersona = (id: number, persona: Persona) =>
  api.put(`/${id}`, persona);
export const partialUpdatePersona = (id: number, persona: Partial<Persona>) =>
  api.patch(`/${id}`, persona);
export const deletePersona = (id: number) => api.delete(`/${id}`);
