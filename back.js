function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function calcularIMC() {
    let alturaUsuario = document.getElementById('altura_valor').value.trim();
    let pesoUsuario = document.getElementById('peso_valor').value.trim();
    
    alturaUsuario = parseFloat(alturaUsuario);
    pesoUsuario = parseFloat(pesoUsuario);

    let IMC = pesoUsuario / (alturaUsuario * alturaUsuario)

    asignarTextoElemento('#parrafoCalculo', `Su calculo del IMC es: ${IMC}`)
    
    return;
}
