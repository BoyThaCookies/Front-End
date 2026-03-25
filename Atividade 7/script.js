const img = document.getElementById("main");
const btn = document.getElementById("btn");

const estados = {
    normal: "b_so.png",
    comendo: "b_co.png",
    feliz: "b_fe.png",
    fome30: "b_fo.png",
    fome60: "b_de.png"
};

let contador = 0;
let intervalo = null;
let timeclick = null;
let timeout = null;

function initConta(){
    if(intervalo) clearInterval(intervalo);
    
    
    intervalo = setInterval(() => {
        contador++;


        console.log("Tempo: ",contador);

        if(contador == 30){
            img.scr = estados.fome30
        }
        if(contador == 60){
            img.scr = estados.fome60
        }
    }, 1000)};

function alimentar(){

    cria.src = estados.comendo 
    contador = 0;
    console.log("Comendo");

    if(time_click) clearInterval(time_click)

        time_click = setTimeout(() => {
            cria.src = estados.alimentado;
            time_out = setTimeout(() => {
            cria.src = estados.normal;
            },2000);
        },1000);

}