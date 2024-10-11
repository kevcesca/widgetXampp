// Cargar las librerías necesarias
[
    'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',
].forEach(u => {
    var script = document.createElement("script");
    script.src = u;
    document.head.appendChild(script);
});

class scriptsSears extends HTMLElement {
    static _WIDGETNAME = 'scripts-sears';
    static _WIDGTEURL = `https://127.0.0.1/widgets/`;

    constructor() {
        super();
    }

    connectedCallback() {
        this.classList.add('neo-widget');
        this.classList.add(`widget--${scriptsSears._WIDGETNAME}`); // Asignamos la clase para encapsular los estilos
        this.style.overflowX = 'hidden';

        fetch(`${scriptsSears._WIDGTEURL}${scriptsSears._WIDGETNAME}/${scriptsSears._WIDGETNAME}.html`) // Obtenemos el template
            .then(data => data.text())
            .then(html => {
                this.innerHTML += `<link rel="stylesheet" href="${scriptsSears._WIDGTEURL}${scriptsSears._WIDGETNAME}/${scriptsSears._WIDGETNAME}.css">`; // Asignamos el CSS del widget
                this.innerHTML += html;
                this.initWidgetCode();
            });

        // Escuchar mensajes del iframe (postMessage)
        window.addEventListener('message', (event) => {
            if (event.data && event.data.motivo) {
                console.log(`[${scriptsSears._WIDGETNAME}] Motivo recibido desde el iframe:`, event.data.motivo);

                // Aquí llamamos a setDispositionCode con el código de motivo recibido
                this.api.setDispositionCode(event.data.motivo).then(() => {
                    console.log('Código de disposición asignado correctamente');
                }).catch((error) => {
                    console.error('Error al asignar el código de disposición:', error);
                });
            } else {
                console.log(`[${scriptsSears._WIDGETNAME}] Mensaje recibido sin motivo:`, event.data);
            }
        });

        this.interactionId = this.getAttribute("interactionid");
        this.workRequestId = this.getAttribute("workrequestid");
        this.api = this.workRequestId == null ? window.WS.widgetAPI() : window.WS.widgetAPI(this.interactionId);
    }
    
    // Código del widget
    initWidgetCode() {
        const $self = this; //$self será la referencia a la instancia del widget
        const _API = $self.api;
        const $container = $(this); // jQuery object del contenedor de la instancia de nuestro widget

        if (this.workRequestId == null) {
            console.log("El workRequestId es nulo");
        } else {
            _API.onDataEvent('onInteractionEvent', function (data) {
                if (data.state == "ALERTING" || data.state === "ACTIVE") {
                    console.log(`[${scriptsSears._WIDGETNAME}] onInteractionEvent`, data);

                    // Recuperar los valores del evento
                    let cuenta = data.contactId || 'No especificada';
                    let motivo = data.intrinsics ? data.intrinsics.TOPIC_NAME : 'No especificado';
                    let nombre = data.intrinsics ? data.intrinsics.CALLER_NAME : 'Cliente';
                    let telefono = data.intrinsics ? data.intrinsics.CALLER_NUMBER : 'No especificado';

                    // Asegurarnos de que el iframe tiene el ID correcto
                    const iframe = $container.find('#SCRIPTS-IFRAME');
                    if (!iframe.length) {
                        console.error("No se encontró el iframe con el ID 'SCRIPTS-IFRAME'");
                        return;
                    }

                    // Cargar el iframe con los parámetros correctos
                    const url = `https://127.0.0.1/widgets/scripts-sears/queues/index.html?cuenta=${encodeURIComponent(cuenta)}&tarjeta=987654321&motivo=${encodeURIComponent(motivo)}&nombre=${encodeURIComponent(nombre)}&telefono=${encodeURIComponent(telefono)}&queue=sears`;
                    
                    iframe.attr('src', url);
                    console.log("URL generada para el iframe:", url);
                }
            });
        }
    }
}

// Definir el nuevo elemento web (custom element)
customElements.define(scriptsSears._WIDGETNAME, scriptsSears);
