class scriptsSears extends HTMLElement {
    static _WIDGETNAME = 'scripts-sears';

    static _WIDGTEURL = 'https://127.0.0.1/widgets/';

    constructor() {
        super();
        // Variables para almacenar los datos de las funciones
        this.dataFromMessageEvent = {};
        this.dataFromInteractionEvent = {};
    }

    connectedCallback() {
        this.classList.add('neo-widget');
        this.classList.add(`widget--${scriptsSears._WIDGETNAME}`);
        this.style.overflowX = 'hidden';

        fetch(`${scriptsSears._WIDGTEURL}${scriptsSears._WIDGETNAME}/${scriptsSears._WIDGETNAME}.html`)
            .then(data => data.text())
            .then(html => {
                this.innerHTML += `<link rel="stylesheet" href="${scriptsSears._WIDGTEURL}${scriptsSears._WIDGETNAME}/${scriptsSears._WIDGETNAME}.css">`;
                this.innerHTML += html;
                this.initWidgetCode();
            });

        // Escuchar mensajes del iframe
        window.addEventListener('message', (event) => {
            if (event.data && event.data.motivo) {
                console.log(`[${scriptsSears._WIDGETNAME}] Motivo recibido desde el iframe:`, event.data.motivo);
                this.api.setDispositionCode(event.data.motivo)
                    .then(() => console.log('Código de disposición asignado correctamente'))
                    .catch(error => console.error('Error al asignar el código de disposición:', error));
            }

            // Manejar la transferencia Single Step Conference
            if (event.data && event.data.action === 'doSingleStepConference') {
                this.handleSingleStepConference();
            }
        });

        this.interactionId = this.getAttribute("interactionid");
        this.workRequestId = this.getAttribute("workrequestid");
        this.api = this.workRequestId == null ? window.WS.widgetAPI() : window.WS.widgetAPI(this.interactionId);

    }

    handleSingleStepConference() {
        if (this.api && this.api.singleStepConference) {
            console.log("Ejecutando transferencia Single Step Conference...");
            this.api.singleStepTransferToService("be372bd5-1719-4836-a0ac-e4a9c6f59c2b")
                .then(() => console.log("Transferencia Single Step Conference realizada con éxito."))
                .catch(error => console.error("Error en la transferencia:", error));
        } else {
            console.error("API no está disponible o el método singleStepConference no está definido.");
        }
    }

    initWidgetCode() {
        const $self = this;
        const _API = $self.api;
        const $container = $(this);

        // Aquí mantienes el evento 'onInteractionEvent'
        _API.onDataEvent('onInteractionEvent', (data) => {
            if (data.state == "ALERTING" || data.state === "ACTIVE") {
                console.log(`[${scriptsSears._WIDGETNAME}] onInteractionEvent`, data);

                // Obtenemos los datos desde 'data.intrinsics'
                const queue = data.intrinsics ? data.intrinsics.TOPIC_NAME : 'No especificado';
                const telefono = data.intrinsics ? data.intrinsics.CALLER_NUMBER : 'No especificado';
                const nombreAgente = _API.getClientDetails().displayName;

                // Guardamos los datos de 'onInteractionEvent' en la clase
                this.dataFromInteractionEvent = {
                    queue: queue,
                    telefono: telefono,
                    nombreAgente: nombreAgente
                };

                console.log('Datos guardados desde onInteractionEvent:', this.dataFromInteractionEvent);

                // Intentamos generar la URL del iframe
                this.generateIframeUrl($container);
            }
        });

        // Evento 'onMessageEvent'
        this.api.onDataEvent('onMessageEvent', (data) => {
            console.log(`[${scriptsSears._WIDGETNAME}] Mensaje recibido desde otro widget:`, data);

            if (data && data.cuenta && data.tarjeta && data.nombre && data.motivo) {
                // Guardamos los datos recibidos en 'onMessageEvent'
                this.dataFromMessageEvent = {
                    cuenta: data.cuenta,
                    tarjeta: data.tarjeta,
                    nombreCliente: data.nombre,
                    motivo: data.motivo
                };

                console.log('Datos guardados desde onMessageEvent:', this.dataFromMessageEvent);

                // Intentamos generar la URL del iframe
                this.generateIframeUrl($container);
            } else {
                console.warn('Mensaje recibido pero faltan algunos parámetros esperados:', data);
            }
        });
    }

    // Función para generar la URL y actualizar el iframe, sustituyendo valores faltantes por "Nulo"
    generateIframeUrl($container) {
        const cuenta = this.dataFromMessageEvent.cuenta || 'Nulo';
        const tarjeta = this.dataFromMessageEvent.tarjeta || 'Nulo';
        const nombreCliente = this.dataFromMessageEvent.nombreCliente || 'Nulo';
        const motivo = this.dataFromMessageEvent.motivo || 'Nulo';

        const queue = this.dataFromInteractionEvent.queue || 'Nulo';
        const telefono = this.dataFromInteractionEvent.telefono || 'Nulo';
        const nombreAgente = this.dataFromInteractionEvent.nombreAgente || 'Nulo';



        // Generamos la URL con los valores, usando "Nulo" en los valores que no estén disponibles
        const url = `https://127.0.0.1/widgets/scripts-sears/index.html?cuenta=${encodeURIComponent(cuenta)}&tarjeta=${encodeURIComponent(tarjeta)}&motivo=${encodeURIComponent(motivo)}&telefono=${encodeURIComponent(telefono)}&queue=${encodeURIComponent(queue)}&nombreCliente=${encodeURIComponent(nombreCliente)}&nombreAgente=${encodeURIComponent(nombreAgente)}`;

        const iframe = $container.find('#SCRIPTS-IFRAME');
        if (iframe.length) {
            iframe.attr('src', url);
            console.log('URL generada para el iframe:', url);
            console.log(nombreAgente)
        } else {
            console.error("No se encontró el iframe con el ID 'SCRIPTS-IFRAME'");
        }
    }
}

customElements.define(scriptsSears._WIDGETNAME, scriptsSears);