import { formulario } from '../selectores.js';
export default class Notificacion {
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