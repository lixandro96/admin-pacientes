import AdminCitas from "./clases/AdminCitas.js";
import Notificacion from './clases/Notificacion.js';
import { citaObj, editando } from "./variables.js";
import { formulario,pacienteInput,propietarioInput,emailInput,fechaInput,sintomasInput,formularioSubmit } from "./selectores.js";

const citas = new AdminCitas();
citas.cargarCitas(); // carga las citas
export function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

export function guardarCita(e) {
  e.preventDefault();
  
  if(Object.values(citaObj).some(valor => valor.trim() === '')) {
   new Notificacion(
   'Todos los campos son obligatorios',
   'error'
   );
    return
  }

  if(editando.value){
    citas.editar({...citaObj}); // actualiza el objeto a la lista
    new Notificacion('Paciente Actualizado', 'success');
  }else{

    citas.agregar({...citaObj}); // agrega el objeto a la lista
    new Notificacion('Paciente Registrado', 'success');
  }

  formulario.reset(); // reinicia el formulario
  reiniciarObjetoCita() // reinicia el objeto
  formularioSubmit.value = 'Registrar Paciente';
  editando.value = false;
}

export function reiniciarObjetoCita(){

  Object.assign(citaObj,{ // asigna los valores del objeto a los campos
    id: generaId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
  });
}

export function generaId(){
  return Math.random().toString(36).substring(2, 15) + Date.now();
}

export function cargarEdicion(cita){

  Object.assign(citaObj, cita); // asigna los valores del objeto a los campos
  pacienteInput.value = cita.paciente;
  propietarioInput.value = cita.propietario;
  emailInput.value = cita.email;
  fechaInput.value = cita.fecha;
  sintomasInput.value = cita.sintomas;
  editando.value = true;
  formularioSubmit.value = 'Guardar Cambios';
}

export function citasStorage(citas){
  localStorage.setItem('citas', JSON.stringify(citas));
}