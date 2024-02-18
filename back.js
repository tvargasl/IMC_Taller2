function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarCedula(cedula) {
    var cedulasConsultadas = JSON.parse(localStorage.getItem('cedulasConsultadas')) || [];
    if (!cedulasConsultadas.includes(cedula)) {
        // Si la cédula no está en la lista, la agregamos
        cedulasConsultadas.push(cedula);
        localStorage.setItem('cedulasConsultadas', JSON.stringify(cedulasConsultadas));
    }
    return cedulasConsultadas.includes(cedula);
}

function mostrarHistorialConsultas() {
    var consultasPrevias = JSON.parse(localStorage.getItem('consultas')) || [];

    var historialContainer = document.querySelector('.container_historial');
    var cedulaActual = document.getElementById('numero_cedula').value;
    
    historialContainer.innerHTML = `
        <h2>Historial del IMC</h2>
        <button class="volver-cedula" id="volverCedulaHistorial">Volver a la cédula</button>
    `;
    
    document.getElementById('volverCedulaHistorial').addEventListener('click', function(event) {
        event.preventDefault();
        // Limpiar el campo de número de cédula
        document.getElementById('numero_cedula').value = '';
    
        // Limpiar el campo de altura y peso del formulario de IMC
        document.getElementById('altura_valor').value = '';
        document.getElementById('peso_valor').value = '';
    
        // Limpiar los párrafos de resultado del cálculo de IMC y la conclusión
        asignarTextoElemento('#parrafoCalculo', '');
        asignarTextoElemento('#parrafoConclusion', '');
    
        // Ocultar los formularios de IMC y el historial de IMC
        document.querySelector('.container_formulario').style.display = 'none';
        document.querySelector('.container_historial').style.display = 'none';
        
        // Mostrar el formulario de cédula
        document.querySelector('.container_formulario_cedula').style.display = 'block';
    
        // Ocultar el botón "Guardar Consulta"
        document.getElementById('guardarConsulta').style.display = 'none';

        historialContainer.innerHTML = '';
    });

    document.querySelector('.container_historial').style.display = 'block';  

    consultasPrevias.forEach(function(consulta) {
        if (consulta.cedula === cedulaActual) {
            var consultaElement = document.createElement('div');
            consultaElement.textContent = 'Altura: ' + consulta.altura + 'm, Peso: ' + consulta.peso + 'kg, IMC: ' + consulta.IMC;
            historialContainer.appendChild(consultaElement);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    
    // Función para verificar si la cédula ya ha sido consultada antes
    document.getElementById('boton_verificar').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que se recargue la página al hacer clic

        var cedula = document.getElementById('numero_cedula').value;
        var cedulaConsultada = verificarCedula(cedula);

        if (cedulaConsultada) {
            // Si la cédula ya ha sido consultada antes, mostrar consultas anteriores
            document.querySelector('.container_formulario').style.display = 'block';
            document.querySelector('.container_formulario_cedula').style.display = 'none';
            mostrarHistorialConsultas();
            document.getElementById('volverCedulaHistorial').style.display = 'none';
        } else {
            // Si la cédula no ha sido consultada antes, mostrar formulario de IMC
            document.querySelector('.container_formulario').style.display = 'block';
            document.querySelector('.container_formulario_cedula').style.display = 'none';
        }
    });

    // Función para guardar la cédula consultada
    document.getElementById('guardarConsulta').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que se recargue la página al hacer clic

        var cedula = document.getElementById('numero_cedula').value;
        var cedulasConsultadas = JSON.parse(localStorage.getItem('cedulasConsultadas')) || [];
        cedulasConsultadas.push(cedula);
        localStorage.setItem('cedulasConsultadas', JSON.stringify(cedulasConsultadas));
        
        // Obtener los datos de la consulta
    var altura = document.getElementById('altura_valor').value.trim();
    var peso = document.getElementById('peso_valor').value.trim();
    var IMC = document.getElementById('parrafoCalculo').textContent.replace('Su calculo del IMC es: ', ''); // Obtener el IMC desde el párrafo

    // Guardar datos de la consulta en el almacenamiento local
    var consulta = {
        cedula: cedula,
        altura: altura,
        peso: peso,
        IMC: IMC
    };

    // Obtener las consultas previas del almacenamiento local o inicializar una lista vacía
    var consultasPrevias = JSON.parse(localStorage.getItem('consultas')) || [];

    // Agregar la nueva consulta a la lista
    consultasPrevias.push(consulta);

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem('consultas', JSON.stringify(consultasPrevias));

        // Mostrar consultas anteriores
        document.querySelector('.container_formulario').style.display = 'none';
        asignarTextoElemento('#parrafoCalculo', '');
        asignarTextoElemento('#parrafoConclusion', '');
        document.getElementById('guardarConsulta').style.display = 'none';
        mostrarHistorialConsultas();

        document.getElementById('volverCedulaHistorial').style.display = 'block';
    });

    // Manejo del evento de clic en el botón de volver a la cédula
    document.getElementById('volverCedulaFormulario').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que se recargue la página al hacer clic

        // Limpiar el campo de número de cédula
        document.getElementById('numero_cedula').value = '';
    
        // Limpiar el campo de altura y peso del formulario de IMC
        document.getElementById('altura_valor').value = '';
        document.getElementById('peso_valor').value = '';
    
        // Limpiar los párrafos de resultado del cálculo de IMC y la conclusión
        asignarTextoElemento('#parrafoCalculo', '');
        asignarTextoElemento('#parrafoConclusion', '');
    
        // Ocultar los formularios de IMC y el historial de IMC
        document.querySelector('.container_formulario').style.display = 'none';
        document.querySelector('.container_historial').style.display = 'none';
        
        // Mostrar el formulario de cédula
        document.querySelector('.container_formulario_cedula').style.display = 'block';
    
        // Ocultar el botón "Guardar Consulta"
        document.getElementById('guardarConsulta').style.display = 'none';

        historialContainer.innerHTML = '';
        });
    });

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
    let IMC_aprox = IMC.toFixed(2);

    asignarTextoElemento('#parrafoCalculo', `Su calculo del IMC es: ${IMC_aprox}`)
    conclusion(IMC_aprox)
    document.getElementById('guardarConsulta').style.display = 'block';

    return;
    }
}
