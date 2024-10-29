document.addEventListener('DOMContentLoaded', function () {
    // Referencia al select de motivo de no aceptación
    const motivoNoAceptaSelect = document.getElementById('motivoNoAcepta');

    // Escuchar cambios en el select de motivo de no aceptación
    motivoNoAceptaSelect.addEventListener('change', function () {
        // Obtener el motivo seleccionado
        const motivoSeleccionado = motivoNoAceptaSelect.value;

        // Verificar que el motivo seleccionado sea válido (no sea el placeholder)
        if (motivoSeleccionado !== 'Seleccione una opción') {
            // Enviar el motivo seleccionado al widget principal usando postMessage
            window.parent.postMessage({ motivo: motivoSeleccionado }, '*'); // Cambia '*' por el origen correcto si es necesario
            console.log("Motivo de no aceptación enviado:", motivoSeleccionado);
        }
    });
});