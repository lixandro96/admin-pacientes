import { datosCita } from "./funciones.js";
import {pacienteInput,propietarioInput,emailInput,fechaInput,sintomasInput,formulario} from './selectores.js'
import { guardarCita } from "./funciones.js";
//eventos
pacienteInput.addEventListener("change", datosCita);
propietarioInput.addEventListener("change", datosCita);
emailInput.addEventListener("change", datosCita);
fechaInput.addEventListener("change", datosCita);
sintomasInput.addEventListener("change", datosCita);
formulario.addEventListener("submit", guardarCita);



