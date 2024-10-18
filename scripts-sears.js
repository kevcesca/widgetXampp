class scriptsSears extends HTMLElement {
    static _WIDGETNAME = 'scripts-sears';
    static _WIDGTEURL = 'https://icobranza.sears.com.mx/widgets/';

    constructor() {
        super();
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

        // Implementación del evento onMessageEvent
        this.api.onDataEvent('onMessageEvent', (data) => {
            console.log(`[${scriptsSears._WIDGETNAME}] Mensaje recibido desde el otro widget:`, data);
        });
    }

    handleSingleStepConference() {
        if (this.api && this.api.singleStepConference) {
            console.log("Ejecutando transferencia Single Step Conference...");
            this.api.singleStepTransferToService("10f0b960-6d64-49c7-a989-49f26164cb68")
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

        if (this.workRequestId == null) {
            console.log("El workRequestId es nulo");
        } else {
            _API.onDataEvent('onInteractionEvent', function (data) {
                if (data.state == "ALERTING" || data.state === "ACTIVE") {
                    console.log(`[${scriptsSears._WIDGETNAME}] onInteractionEvent`, data);

                    let cuenta = data.contactId || 'No especificada';
                    let motivo = data.intrinsics ? data.intrinsics.TOPIC_NAME : 'No especificado';
                    let nombre = data.intrinsics ? data.intrinsics.CALLER_NAME : 'Cliente';
                    let telefono = data.intrinsics ? data.intrinsics.CALLER_NUMBER : 'No especificado';

                    const iframe = $container.find('#SCRIPTS-IFRAME');
                    if (!iframe.length) {
                        console.error("No se encontró el iframe con el ID 'SCRIPTS-IFRAME'");
                        return;
                    }

                    const url = `https://icobranza.sears.com.mx/widgets/scripts-sears/index.html?cuenta=${encodeURIComponent(cuenta)}&tarjeta=987654321&motivo=${encodeURIComponent(motivo)}&nombre=${encodeURIComponent(nombre)}&telefono=${encodeURIComponent(telefono)}&queue=sears`;

                    iframe.attr('src', url);
                    console.log("URL generada para el iframe:", url);
                }
            });
        }
    }
}

customElements.define(scriptsSears._WIDGETNAME, scriptsSears);

