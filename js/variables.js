import { generaId } from "./funciones.js";

export let editando = {
  value: false,
}

// ObjetoCita
export  const citaObj = {
  id: generaId(),
  paciente: '',
  propietario: '',
  email: '',
  fecha: '',
  sintomas: ''
};