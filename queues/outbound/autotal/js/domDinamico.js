document.addEventListener('DOMContentLoaded', function () {
    // Main sections
    const mainContent = document.getElementById('mainContent');
    const titularForm = document.getElementById('titularForm');
    const cotizacionForm = document.getElementById('cotizacionForm');
    const propietarioForm = document.getElementById('propietarioForm');
    const vehiculoForm = document.getElementById('vehiculoForm');
    const finalizarForm = document.getElementById('finalizarForm');
    const noAceptaForm = document.getElementById('noAceptaForm');
    const agendarForm = document.getElementById('agendarForm');

    // Buttons and options
    const initialButtons = document.getElementById('initialButtons');
    const contactOptions = document.getElementById('contactOptions');
    const otraPersonaForm = document.getElementById('otraPersonaForm');
    const loConoceOptions = document.getElementById('loConoceOptions');
    const siConoceOptions = document.getElementById('siConoceOptions');
    const noConoceOptions = document.getElementById('noConoceOptions');
    const dejarRecadoMessage = document.getElementById('dejarRecadoMessage');
    const noContactOptions = document.getElementById('noContactOptions');
    const cotizacionButtons = document.getElementById('cotizacionButtons');
    const propietarioQuestion = document.getElementById('propietarioQuestion');

    // Buttons
    const contactBtn = document.getElementById('contactBtn');
    const noContactBtn = document.getElementById('noContactBtn');
    const otraPersonaBtn = document.getElementById('otraPersonaBtn');
    const noViveAhiBtn = document.getElementById('noViveAhiBtn');
    const siConoceBtn = document.getElementById('siConoceBtn');
    const dejarRecadoBtn = document.getElementById('dejarRecadoBtn');
    const titularBtn = document.getElementById('titularBtn');
    const noTiempoBtn = document.getElementById('noTiempoBtn');
    const cotizarBtnTitular = document.getElementById('cotizarBtnTitular');
    const noAceptaBtn = document.getElementById('noAceptaBtn');
    const solicitaProrrogaBtn = document.getElementById('solicitaProrrogaBtn');
    const aceptarBtn = document.getElementById('aceptarBtn');
    const siPropietarioBtn = document.getElementById('siPropietarioBtn');
    const noPropietarioBtn = document.getElementById('noPropietarioBtn');
    const finalizarNoAceptaBtn = document.getElementById('finalizarNoAceptaBtn');
    const finalizarBtn = document.getElementById('finalizarBtn');
    const aceptarAgendaBtn = document.getElementById('aceptarAgendaBtn');
    const finalizarAgendaBtn = document.getElementById('finalizarAgendaBtn');
    const noConoceBtn = document.getElementById('noConoceBtn');
    const finalizarNoConoceBtn = document.getElementById('finalizarNoConoceBtn');

    // Event Listeners
    contactBtn.addEventListener('click', function () {
        initialButtons.classList.add('d-none');
        contactOptions.classList.remove('d-none');
    });

    noContactBtn.addEventListener('click', function () {
        initialButtons.classList.add('d-none');
        noContactOptions.classList.remove('d-none');
    });

    otraPersonaBtn.addEventListener('click', function () {
        contactOptions.classList.add('d-none');
        otraPersonaForm.classList.remove('d-none');
    });

    noViveAhiBtn.addEventListener('click', function () {
        otraPersonaForm.classList.add('d-none');
        loConoceOptions.classList.remove('d-none');
    });

    siConoceBtn.addEventListener('click', function () {
        loConoceOptions.classList.add('d-none');
        siConoceOptions.classList.remove('d-none');
    });

    noConoceBtn.addEventListener('click', function () {
        loConoceOptions.classList.add('d-none');
        noConoceOptions.classList.remove('d-none');
    });

    finalizarNoConoceBtn.addEventListener('click', function () {
        alert('Formulario finalizado. Gracias por su tiempo.');
        resetForms();
    });

    dejarRecadoBtn.addEventListener('click', function () {
        siConoceOptions.classList.add('d-none');
        dejarRecadoMessage.classList.remove('d-none');
    });

    titularBtn.addEventListener('click', function () {
        mainContent.classList.add('d-none');
        titularForm.classList.remove('d-none');
    });

    noTiempoBtn.addEventListener('click', function () {
        mainContent.classList.add('d-none');
        contactOptions.classList.add('d-none');
        agendarForm.classList.remove('d-none');

        // Pre-fill some fields
        document.getElementById('clienteAgenda').value = document.getElementById('nombre').value + ' ' + document.getElementById('paterno').value + ' ' + document.getElementById('materno').value;
        document.getElementById('fechaAgenda').valueAsDate = new Date();
    });

    cotizarBtnTitular.addEventListener('click', function () {
        titularForm.classList.add('d-none');
        cotizacionForm.classList.remove('d-none');
    });

    noAceptaBtn.addEventListener('click', function () {
        cotizacionButtons.classList.add('d-none');
        noAceptaForm.classList.remove('d-none');
    });

    aceptarBtn.addEventListener('click', function () {
        cotizacionButtons.classList.add('d-none');
        propietarioQuestion.classList.remove('d-none');
    });

    siPropietarioBtn.addEventListener('click', function () {
        cotizacionForm.classList.add('d-none');
        finalizarForm.classList.remove('d-none');
    });

    noPropietarioBtn.addEventListener('click', function () {
        cotizacionForm.classList.add('d-none');
        noAceptaForm.classList.remove('d-none');
    });

    finalizarNoAceptaBtn.addEventListener('click', function () {
        alert('Formulario finalizado. Gracias por su tiempo.');
        resetForms();
    });

    finalizarBtn.addEventListener('click', function () {
        alert('Cotización finalizada. Gracias por su tiempo.');
        resetForms();
    });

    solicitaProrrogaBtn.addEventListener('click', function () {
        titularForm.classList.add('d-none');
        agendarForm.classList.remove('d-none');

        // Pre-fill some fields
        document.getElementById('clienteAgenda').value = document.getElementById('nombre').value + ' ' + document.getElementById('paterno').value + ' ' + document.getElementById('materno').value;
        document.getElementById('fechaAgenda').valueAsDate = new Date();
    });

    aceptarAgendaBtn.addEventListener('click', function () {
        // Here you would typically save the scheduling information
        alert('Agendación guardada. Nos pondremos en contacto en la fecha indicada.');
        resetForms();
    });

    finalizarAgendaBtn.addEventListener('click', function () {
        resetForms();
    });

    // Evento para regresar a la página inicial
    document.getElementById('inicio').addEventListener('click', function () {
        // Recargar la página manteniendo la URL y sus parámetros
        window.location.href = window.location.href;
    });

    function resetForms() {
        mainContent.classList.remove('d-none');
        titularForm.classList.add('d-none');
        cotizacionForm.classList.add('d-none');
        finalizarForm.classList.add('d-none');
        noAceptaForm.classList.add('d-none');
        initialButtons.classList.remove('d-none');
        contactOptions.classList.add('d-none');
        otraPersonaForm.classList.add('d-none');
        loConoceOptions.classList.add('d-none');
        siConoceOptions.classList.add('d-none');
        dejarRecadoMessage.classList.add('d-none');
        noContactOptions.classList.add('d-none');
        cotizacionButtons.classList.remove('d-none');
        propietarioQuestion.classList.add('d-none');
        agendarForm.classList.add('d-none');
        document.getElementById('agendarForm').reset();

        // ... (previous reset code remains unchanged)
        noConoceOptions.classList.add('d-none');
        // Reset the noConoceOptions fields
        document.getElementById('nombreAdicional').value = '';
        document.getElementById('paternoAdicional').value = '';
        document.getElementById('maternoAdicional').value = '';

        // Reset any form inputs if necessary
        document.querySelectorAll('form').forEach(form => form.reset());
    }
});