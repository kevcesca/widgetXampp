class MedicallHomeWidget extends HTMLElement {
    constructor() {
        super();
        // Creamos el Shadow DOM para encapsular el contenido del widget
        this.attachShadow({ mode: 'open' });

        // HTML y estructura del widget
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="medicall-home-widget.css">
        <div class="widget-layout">
            <div class="neo-container container">
                <h5>SCRIPT CAMPAÑA MEDICALL HOME</h5>
                <p>Buenas Tardes, ¿me podría comunicar con el Sr./Srita. <b>DEVI ULLOA HERNANDEZ</b>?</p>
                <p>Mi nombre es <b>ABIGAIL NAJERA</b> y estoy llamando de Protección Personal Medicall Home.</p>

                <!-- Formulario -->
                <div class="formrow">
                    <div class="neo-form-group">
                        <label for="nombre-titular">Nombre Titular:</label>
                        <input type="text" id="nombre-titular" class="neo-form-control" value="DEVI">
                    </div>
                    <div class="neo-form-group">
                        <label for="paterno">Paterno:</label>
                        <input type="text" id="paterno" class="neo-form-control" value="ULLOA">
                    </div>
                    <div class="neo-form-group">
                        <label for="materno">Materno:</label>
                        <input type="text" id="materno" class="neo-form-control" value="HERNANDEZ">
                    </div>
                    <div class="neo-form-group">
                        <label for="no-cuenta">No. de Cuenta:</label>
                        <input type="text" id="no-cuenta" class="neo-form-control" value="107615554669">
                    </div>
                </div>

                <!-- Segunda fila -->
                <div class="formrow">
                    <div class="neo-form-group">
                        <label for="fecha-apertura">Fecha de Apertura:</label>
                        <input type="text" id="fecha-apertura" class="neo-form-control" value="2017-12-18">
                    </div>
                    <div class="neo-form-group">
                        <label for="fecha-corte">Fecha de Corte:</label>
                        <input type="text" id="fecha-corte" class="neo-form-control" value="04">
                    </div>
                    <div class="neo-form-group">
                        <label for="sexo">Sexo:</label>
                        <input type="text" id="sexo" class="neo-form-control" value="F">
                    </div>
                    <div class="neo-form-group">
                        <label for="rfc">RFC:</label>
                        <input type="text" id="rfc" class="neo-form-control" value="UOHD931227">
                    </div>
                </div>

                <!-- Botones de acción -->
                <div class="button-right">
                    <button class="btn neo-button btn-danger">Colgar</button>
                    <button class="btn neo-button btn-success">Finalizar</button>
                </div>
            </div>
        </div>
        `;
    }

    connectedCallback() {
        // Aquí podemos agregar lógica adicional si fuera necesario
    }
}

// Definir el nuevo custom element
customElements.define('medicall-home-widget', MedicallHomeWidget);
