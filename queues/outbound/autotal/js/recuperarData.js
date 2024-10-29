// Listener para recibir datos desde el widget principal
window.addEventListener('message', (event) => {
    const allowedOrigin = 'https://na-01.workspaces.avayacloud.com'; // Asegúrate de que coincida con el origen correcto
    if (event.origin === allowedOrigin && event.data) {
        // Almacenamos los datos en window.formularioDatos y actualizamos el formulario
        window.formularioDatos = event.data;
        cargarDatosFormulario(); // Llamada a cargar los datos en el formulario
        console.log("Datos recibidos y cargados en el formulario:", window.formularioDatos);
    } else {
        console.warn("Origen no permitido o datos no válidos recibidos:", event.origin);
    }
});

// Función para cargar datos en el formulario
function cargarDatosFormulario() {
    if (window.formularioDatos) {
        const datos = window.formularioDatos;
        // Llenamos los campos del formulario
        document.getElementById('nombre').value = datos.nombreCliente || '';
        document.getElementById('paterno').value = datos.paterno || '';
        document.getElementById('materno').value = datos.materno || '';
        document.getElementById('cuenta').value = datos.cuenta || '';
        document.getElementById('apertura').value = datos.apertura || '';
        document.getElementById('corte').value = datos.corte || '';
        document.getElementById('empleo').value = datos.empleo || '';
        document.getElementById('rfc').value = datos.rfc || '';
        document.getElementById('sexo').value = datos.sexo || '';
        document.getElementById('direccion').value = datos.direccion || '';
        document.getElementById('colonia').value = datos.colonia || '';
        document.getElementById('ciudad').value = datos.ciudad || '';
        document.getElementById('estado').value = datos.estado || '';
        document.getElementById('cp').value = datos.cp || '';
        document.getElementById('tel-casa').value = datos.telefonoCasa || '';
        document.getElementById('tel-oficina').value = datos.telefonoOficina || '';
        document.getElementById('tel-celular').value = datos.telefonoCelular || '';
        document.getElementById('telefonoCasa').value = datos.telefonoCasa;
        document.getElementById('telefonoOficina').value = datos.telefonoOficina;
        document.getElementById('tel-o').value = datos.telefonoOtro || '';
        document.getElementById('nombre-adicional').value = datos.nombreAdicional || '';
        document.getElementById('paterno-adicional').value = datos.paternoAdicional || '';
        document.getElementById('materno-adicional').value = datos.maternoAdicional || '';

        // Actualizar todos los elementos con clase `nombreCliente`
        document.querySelectorAll('.nombreCliente').forEach(el => {
            el.textContent = datos.nombreCliente || 'Cliente';
        });
    }
}

// Función para obtener parámetros de URL
function obtenerParametroUrl(nombreParametro) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombreParametro);
}

// Cargar datos desde la URL o `window.formularioDatos`
window.onload = function () {
    const nombreAgente = obtenerParametroUrl('nombreAgente') || 'Nombre del Agente';
    document.getElementById('nombreAgente').textContent = nombreAgente;
    document.getElementById('nombreAgenteDespedida').textContent = nombreAgente;

    // Llamada para cargar el formulario usando `window.formularioDatos`, si está disponible
    cargarDatosFormulario();
};