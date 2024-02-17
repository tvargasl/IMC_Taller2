function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function conclusion(IMC){
    if (IMC < 10){
        asignarTextoElemento('#parrafoConclusion', "Se ha registrado un IMC extremadamente bajo, es probable que haya un error en los datos ingresados, de estar seguro de sus datos visite un medico urgentemente.")
    }else if (IMC >= 10 && IMC < 18.5){
        asignarTextoElemento('#parrafoConclusion', "Su IMC corresponde a una persona baja de peso.")
    }else if (IMC >= 18.5 && IMC < 25){
        asignarTextoElemento('#parrafoConclusion', "Su IMC corresponde a una persona saludable y con el peso correcto.")
    }else if (IMC >= 25 && IMC < 30){
        asignarTextoElemento('#parrafoConclusion', "Su IMC corresponde a una persona con sobrepeso.")
    }else if (IMC >= 30 && IMC < 35){
        asignarTextoElemento('#parrafoConclusion', "Su IMC corresponde a una persona con obesidad de clase 1.")
    }else if (IMC >= 35 && IMC < 40){
        asignarTextoElemento('#parrafoConclusion', "Su IMC corresponde a una persona con obesidad de clase 2.")
    }else if (IMC >= 40 && IMC < 80){
        asignarTextoElemento('#parrafoConclusion', "Su IMC corresponde a una persona con obesidad de clase 3.")
    }else{
        asignarTextoElemento('#parrafoConclusion', "Se ha registrado un IMC extremadamente alto, es probable que haya un error en los datos ingresados, de estar seguro de sus datos visite un medico urgentemente.")
    }
}

function calcularIMC() {
    let alturaUsuario = document.getElementById('altura_valor').value.trim();
    let pesoUsuario = document.getElementById('peso_valor').value.trim();

    let alturaUsuario_num = parseFloat(alturaUsuario);
    let pesoUsuario_num = parseFloat(pesoUsuario);
    
    if (alturaUsuario === "" || pesoUsuario ==="") {
        asignarTextoElemento('#parrafoCalculo', "Por favor ingrese valores en todos los campos.")
        asignarTextoElemento('#parrafoConclusion', "")
        return
    }
    else if (alturaUsuario_num <= 0 || pesoUsuario_num <= 0) {
        asignarTextoElemento('#parrafoCalculo', "Por favor ingrese valores mayores que 0.")
        asignarTextoElemento('#parrafoConclusion', "")
        return
    }else if (alturaUsuario_num <= 1.30 || alturaUsuario_num >= 2.10) {
        asignarTextoElemento('#parrafoCalculo', "Por favor ingrese una altura realista.")
        asignarTextoElemento('#parrafoConclusion', "")
        return
    }else if (pesoUsuario_num <= 25 || pesoUsuario_num >= 210) {
        asignarTextoElemento('#parrafoCalculo', "Por favor ingrese un peso realista.")
        asignarTextoElemento('#parrafoConclusion', "")
        return
    }else{

    let IMC = pesoUsuario / (alturaUsuario * alturaUsuario)

    asignarTextoElemento('#parrafoCalculo', `Su calculo del IMC es: ${IMC}`)
    conclusion(IMC)



    return;
    }
}
