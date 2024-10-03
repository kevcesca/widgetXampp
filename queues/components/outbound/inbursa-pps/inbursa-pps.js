class InbursaPPS extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="inbursa-pps.css">
            <div class="widget-layout">
                <!-- Mensaje superior -->
                <div class="message">
                    Buenas Tardes, me podría comunicar con el Sr./Srita. <b>OMAR ALEJANDRO BALLEZA GONZALEZ</b>.
                    Mi nombre es <b>ABIGAIL NAJERA</b> y estoy llamando de <b>SEARS</b>.
                </div>

                <!-- Fila 1 -->
                <div class="widget-row">
                    <div>
                        <label>Nombre Titular:</label>
                        <input type="text" value="OMAR ALEJANDRO">
                    </div>
                    <div>
                        <label>Paterno:</label>
                        <input type="text" value="BALLEZA">
                    </div>
                    <div>
                        <label>Materno:</label>
                        <input type="text" value="GONZALEZ">
                    </div>
                </div>

                <!-- Fila 2 -->
                <div class="widget-row">
                    <div>
                        <label>No. de Cuenta:</label>
                        <input type="text" value="31170564282">
                    </div>
                    <div>
                        <label>Fecha de Apertura:</label>
                        <input type="text" value="2022-11-28">
                    </div>
                    <div>
                        <label>Fecha de Corte:</label>
                        <input type="text" value="09">
                    </div>
                </div>

                <!-- Fila 3 -->
                <div class="widget-row">
                    <div>
                        <label>Emplex:</label>
                        <input type="text" value="BANREGIO">
                    </div>
                    <div>
                        <label>RFC:</label>
                        <input type="text" value="BAGG081231">
                    </div>
                    <div>
                        <label>Sexo:</label>
                        <input type="text" value="M">
                    </div>
                </div>

                <!-- Fila 4 -->
                <div class="widget-row">
                    <div>
                        <label>Dirección:</label>
                        <input type="text" value="OCTAVIO PAZ 124">
                    </div>
                    <div>
                        <label>Colonia:</label>
                        <input type="text" value="ASTURIAS">
                    </div>
                    <div>
                        <label>Ciudad:</label>
                        <input type="text" value="APODACA">
                    </div>
                </div>

                <!-- Fila 5 -->
                <div class="widget-row">
                    <div>
                        <label>CP:</label>
                        <input type="text" value="66620">
                    </div>
                    <div>
                        <label>Estado:</label>
                        <input type="text" value="NL">
                    </div>
                    <div>
                        <label>Tel. Casa:</label>
                        <input type="text" value="8124927363">
                    </div>
                </div>

                <!-- Fila 6 -->
                <div class="widget-row">
                    <div>
                        <label>Tel. Oficina:</label>
                        <input type="text" value="8180131432">
                    </div>
                    <div>
                        <label>Tel. Ref.:</label>
                        <input type="text" value="8111123509">
                    </div>
                    <div>
                        <label>Tel. Ref. 2:</label>
                        <input type="text" value="8117417277">
                    </div>
                </div>

                <!-- Fila de botones -->
                <div class="button-group">
                    <button class="btn btn-contact">Contacto</button>
                    <button class="btn btn-no-contact">No Contacto</button>
                </div>
            </div>
        `;
    }
}

customElements.define('inbursa-pps', InbursaPPS);
