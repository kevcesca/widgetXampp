class CentroAtencionMixup extends HTMLElement {
    constructor() {
        super();

        // Creamos el Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Contenido HTML del Web Component con el sidebar incluido
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="mixup.css">
        <link rel="stylesheet" href="../css/neo/neon.css">
        <div class="widget-layout">
            <!-- Contenido principal del Web Component -->
            <div class="neo-container container">
                <h5>Centro de Atención Telefónica MIXUP.</h5>
                <p><span class="customer-info">Buenas Tardes, le atiende: <b>ABIGAIL NAJERA</b>.</span></p>
                <p>¿En qué puedo servirle?</p>

                <!-- Formulario de motivos -->
                <div class="formrow">
                    <div class="neo-form-group neo-col neo-col--6">
                        <label for="grupo">Grupo:</label>
                        <select id="grupo" class="neo-form-control">
                            <option>SERVICIO</option>
                            <option>ACLARACIÓN</option>
                            <option>CAJEROS MIXUP</option>
                            <option>LINEA DE CRÉDITO</option>
                        </select>
                    </div>
                    <div class="neo-form-group neo-col neo-col--6">
                        <label for="servicio">Servicio:</label>
                        <select id="servicio" class="neo-form-control">
                            <!-- Las opciones se llenarán dinámicamente con JavaScript -->
                        </select>
                    </div>
                    <button class="btn custom-primary">Agregar</button>
                </div>

                <!-- Tabla de Motivos de Contacto -->
                <label for="buscar-tienda">Motivos de Contacto:</label>
                <div class="motivos-contacto">
                    <table class="neo-table neo-table--hover table-stores">
                        <thead>
                            <tr>
                                <th>Grupo</th>
                                <th>Servicio</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="3">Sin Información</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Fila para finalizar la llamada -->
                <div class="button-right">
                    <p>Esperamos tener el placer de atenderlo próximamente.<br>Le atendió <b>ABIGAIL NAJERA</b> del Centro de Atención Telefónica MIXUP.</p>
                    <button class="btn custom-success">Finalizar</button>
                </div>

                <!-- Barra de búsqueda -->
                <div class="neo-form-group search-bar">
                    <label for="buscar-tienda">Buscar:</label>
                    <input type="text" id="buscar-tienda" class="neo-form-control" placeholder="Buscar tienda">
                </div>

                <!-- Tabla de tiendas -->
                <div class="neo-table-responsive">
                    <table class="neo-table neo-table--hover table-stores">
                        <thead>
                            <tr>
                                <th>Tienda</th>
                                <th>Ubicación</th>
                                <th>Gerencia</th>
                                <th>Conmutador</th>
                                <th>Fax</th>
                                <th>Zona</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Sin Información</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="sidebar-container">
                <div class="sidebar-content">
                    <!-- Información básica -->
                    <div class="sidebar-header">
                        <h5>CEAT: MIXUP 📞</h5>
                        <p class="text-danger">MOTIVO: SOLICITA AYUDA CLIENTE - 5521382726</p>
                        <p>Cuenta: 70-6925172225</p>
                    </div>
                    <!-- Tarjeta e icono -->
                    <div class="sidebar-card">
                        <p>Tarjeta:</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" value="706927761553" aria-label="Tarjeta" disabled>
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">💳</button>
                            </div>
                        </div>
                    </div>
                    <!-- Botones de acciones -->
                    <div class="sidebar-buttons">
                        <button class="btn btn-warning btn-block mb-2">🏠 Inicio</button>
                        <button class="btn btn-info btn-block mb-2">💡 Tips</button>
                        <button class="btn btn-danger btn-block mb-2">📊 Edo. Cuenta</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        // Llamamos a los métodos después de que el HTML ha sido renderizado
        this.setupDropdownLogic();
    }

    // Lógica para actualizar el dropdown de servicios
    setupDropdownLogic() {
        const servicios = {
            "SERVICIO": [
                "Transferencia a Aprobaciones", "Activación de NIP", "Cambios Demográficos", "Cancelación de Adicional",
                "Cancelación de Cuenta", "Carta Referencia", "Cliente RIP", "Directorio de tiendas",
                "Envío de Estados de Cuenta", "Envío de Placa", "Problemas Internet", "Queja de Servicio Tienda",
                "Reporte de Estados de Cuenta", "Solicitar Tarjeta", "Transferencias a Seguros"
            ],
            "ACLARACIÓN": ["Bonificación de CXF", "Fraudes", "Cheques Devueltos", "Traspaso de Pago", "Traspaso de Venta", "Pagos Internet"],
            "CAJEROS MIXUP": ["DUDAS Y/O COMENTARIOS", "EFECTIVO RETENIDO", "RECHAZO DE RETIRO", "TARJETA RETENIDA"],
            "LINEA DE CRÉDITO": ["Consulta de Saldo", "Traspaso CR a Reserva"]
        };

        const grupoSelect = this.shadowRoot.getElementById("grupo");
        const servicioSelect = this.shadowRoot.getElementById("servicio");

        const updateServicios = () => {
            const selectedGrupo = grupoSelect.value;
            servicioSelect.innerHTML = "";

            servicios[selectedGrupo].forEach(servicio => {
                const option = document.createElement("option");
                option.text = servicio;
                option.value = servicio;
                servicioSelect.add(option);
            });
        };

        grupoSelect.addEventListener("change", updateServicios);
        updateServicios();
    }
}

// Definir el nuevo custom element
customElements.define('centro-atencion-mixup', CentroAtencionMixup);
