// selectores
const pacienteInput = document.querySelector('#paciente');
const propietarioInput = document.querySelector('#propietario');
const emailInput = document.querySelector('#email');
const fechaInput = document.querySelector('#fecha');
const sintomasInput = document.querySelector('#sintomas');
const formulario = document.querySelector('#formulario-cita');
const formularioSubmit = document.querySelector('#formulario-cita input[type="submit"]');
const contenedorCitas = document.querySelector('#citas');
let editando = false;

// ObjetoCita
const citaObj = {
  id: generaId(),
  paciente: '',
  propietario: '',
  email: '',
  fecha: '',
  sintomas: ''
};

//eventos
pacienteInput.addEventListener('change', datosCita);
propietarioInput.addEventListener('change', datosCita);
emailInput.addEventListener('change', datosCita);
fechaInput.addEventListener('change', datosCita);
sintomasInput.addEventListener('change', datosCita);
formulario.addEventListener('submit', guardarCita);

// clases
class Notificacion {
  constructor(texto, tipo) {
    this.texto = texto;
    this.tipo = tipo;
    this.mostrar();
  }
  
  mostrar() {
    const alerta = document.createElement('p');
    alerta.classList.add('alert','font-bold','text-white','text-center','text-sm','p-3','my-5','uppercase','w-full');
    alerta.textContent = this.texto;
    
    const alertaPrevia = document.querySelector('.alert');
    alertaPrevia?.remove();
    
    if(this.tipo === 'error') {
      alerta.classList.add('bg-red-500');
    }else{
      alerta.classList.add('bg-green-500');
    }
    
    formulario.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

class AdminCitas {
  constructor() {
    this.citas =  []
  }
  agregar(cita) {
    this.citas =[...this.citas, cita];
    this.mostrar();
  }
  cargarCitas() { 
    document.addEventListener('DOMContentLoaded', () =>{
      
      this.citas = JSON.parse(localStorage.getItem('citas')) || [];
      this.mostrar();
    });
  }
  mostrar() {
    
    // limpia el html
    while(contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
    
    // si no hay citas
    if(this.citas.length === 0){
      const p = document.createElement('p');
      p.classList.add('text-xl','mt-5','mb-10','text-center');
      p.innerHTML = 'No Hay Pacientes';
      contenedorCitas.appendChild(p);
      return;
    }
    // mueatra las citas
    this.citas.forEach(cita => {
      const{
        id,
        paciente,
        propietario,
        email,
        fecha,
        sintomas
      } = cita;
      
      const divCita = document.createElement('DIV');
      divCita.classList.add('mx-5','my-10','px-5','py-10','bg-white','rounded-xl','shadow-md');
      const nombrePaciente = document.createElement('P');
      nombrePaciente.classList.add('text-gray-700','font-normal','mb-3','normal-case');
      nombrePaciente.innerHTML = `<span class="font-bold uppercase">Nombre: </span> ${paciente}`;
      const nombrePropietario = document.createElement('P');
      nombrePropietario.classList.add('text-gray-700','font-normal','mb-3','normal-case');
      nombrePropietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${propietario}`;
      
      const emailPaciente = document.createElement('P');
      emailPaciente.classList.add('text-gray-700','font-normal','mb-3','normal-case');
      emailPaciente.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${email}`;
      
      const fechaAlta = document.createElement('P');
      fechaAlta.classList.add('text-gray-700','font-normal','mb-3','normal-case');
      fechaAlta.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${fecha}`;
      
      const sintomasPaciente = document.createElement('P');
      sintomasPaciente.classList.add('text-gray-700','font-normal','mb-3','normal-case');
      sintomasPaciente.innerHTML = `<span class="font-bold uppercase">Sintomas: </span> ${sintomas}`;
      const btnEditar = document.createElement('button');
      btnEditar.classList.add('py-2', 'px-10', 'bg-indigo-600', 'hover:bg-indigo-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
      btnEditar.innerHTML = 'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
      const clonCita =  structuredClone(cita);
      btnEditar.onclick = () => cargarEdicion(clonCita);
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('py-2', 'px-10', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'flex', 'items-center', 'gap-2');
      btnEliminar.innerHTML = 'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
      btnEliminar.onclick = () => this.eliminar(id);
      
      const contenedorBotonoes = document.createElement('DIV');
      contenedorBotonoes.classList.add('flex','justify-between','mt-10')
      contenedorBotonoes.appendChild(btnEditar)
      contenedorBotonoes.appendChild(btnEliminar)
      
      divCita.appendChild(nombrePaciente);
      divCita.appendChild(nombrePropietario);
      divCita.appendChild(emailPaciente);
      divCita.appendChild(fechaAlta);
      divCita.appendChild(sintomasPaciente);
      divCita.appendChild(contenedorBotonoes);
      contenedorCitas.appendChild(divCita);
    });
    citasStorage(this.citas) // guarda en localStorage
  }
  
  editar(citaActualizada) {
    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    this.mostrar();
  }

  eliminar(id) {
    this.citas = this.citas.filter(cita => cita.id !== id);
    this.mostrar();
    citasStorage(this.citas) // guarda en localStorage
  }
  
}

const citas = new AdminCitas();
citas.cargarCitas(); // carga las citas

function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

function guardarCita(e) {
  e.preventDefault();
  
  if(Object.values(citaObj).some(valor => valor.trim() === '')) {
   new Notificacion(
   'Todos los campos son obligatorios',
   'error'
   );
    return
  }

  if(editando){
    citas.editar({...citaObj}); // actualiza el objeto a la lista
    new Notificacion('Paciente Actualizado', 'success');
  }else{

    citas.agregar({...citaObj}); // agrega el objeto a la lista
    new Notificacion('Paciente Registrado', 'success');
  }

  formulario.reset(); // reinicia el formulario
  reiniciarObjetoCita() // reinicia el objeto
  formularioSubmit.value = 'Registrar Paciente';
  editando = false;
}

function reiniciarObjetoCita(){

  Object.assign(citaObj,{ // asigna los valores del objeto a los campos
    id: generaId(),
    paciente: '',
    propietario: '',
    email: '',
    fecha: '',
    sintomas: ''
  });
}

function generaId(){
  return Math.random().toString(36).substring(2, 15) + Date.now();
}

function cargarEdicion(cita){

  Object.assign(citaObj, cita); // asigna los valores del objeto a los campos
  pacienteInput.value = cita.paciente;
  propietarioInput.value = cita.propietario;
  emailInput.value = cita.email;
  fechaInput.value = cita.fecha;
  sintomasInput.value = cita.sintomas;
  editando = true;
  formularioSubmit.value = 'Guardar Cambios';
}


function citasStorage(citas){
  localStorage.setItem('citas', JSON.stringify(citas));
}