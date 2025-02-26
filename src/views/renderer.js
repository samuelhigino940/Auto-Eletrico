/**
 * Processo de renderização
 * tela principal
 */

console.log("Processo de renderização")


//Envio de uma mensagem para o main abrir a janela cliente
function cliente(){
    //console.log("Texto do botão cliente")
    api.clientWindow()
}
//Envio de uma mensagem para o main abrir a janela OS
function os(){
   //console.log("Texto do botão OS")
     api.osWindow()
}