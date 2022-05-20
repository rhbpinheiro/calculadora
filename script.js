'use strict'
const display = document.querySelector('.display');
const numeros = document.querySelectorAll('[id*=numero]');
const operadores = document.querySelectorAll('[id*=operador]');
let novoNumero = true;
let operador ;
let numeroAnterior;
const teclas = document.querySelectorAll('button');

const operacaoPendente = () => operador !== undefined ;

const calcular = () => {
   if(operacaoPendente()){
      const numeroAtual = parseFloat(display.textContent.replace(',','.'));
      novoNumero = true;
      //Usando o eval substituir por todos esses ifs
      const resultado = eval(`${numeroAnterior} ${operador} ${numeroAtual}`)
      atualizarDisplay(resultado);
      
      /*
      if(operador === '+' ){
         atualizarDisplay(numeroAnterior + numeroAtual);
      }else  if(operador === '-' ){
         atualizarDisplay(numeroAnterior - numeroAtual);
      }else  if(operador === '*' ){
         atualizarDisplay(numeroAnterior * numeroAtual);
      }else  if(operador === '/' ){
         atualizarDisplay(numeroAnterior / numeroAtual);
      }*/
   }
 
}

const igual = () =>{
   calcular();
   operador = undefined;
}

const atualizarDisplay = (texto)=>{
   if(novoNumero){
      display.textContent = texto.toLocaleString('BR');
      novoNumero = false;
   }else{   
      display.textContent += texto.toLocaleString('BR');
   }   
}

function clicou (numeros) {
   atualizarDisplay(numeros);
}

function operacao(operadores){
   if(!novoNumero){
      calcular();
      novoNumero = true;
      operador = operadores;
      numeroAnterior = parseFloat(display.textContent.replace(',','.'));
      
   }   
}

const limparDisplay = () => display.textContent = '';

const limparCalculo = () =>{
   limparDisplay();
   operador = undefined;
   novoNumero = true;
   numeroAnterior = undefined;
}

const limparUltimoDig = () => {
   display.textContent = display.textContent.slice(0, -1);
}

 const inverterSinal = () => {
   novoNumero = true;
   atualizarDisplay(display.textContent * -1);
}

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;

const inserirDecimal = () => {
   if(!existeDecimal()){
      if(existeValor()){
         atualizarDisplay(',');
      }else{
         atualizarDisplay('0,');
      }
   }      
}
function teclado(evento){
   let tecla = evento.key;
   atualizarDisplay(tecla);
}

document.addEventListener('keydown', teclado);

