class CentroAtencionSears extends HTMLElement {
    constructor() {
        super();

        // Extraer los parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        const cuenta = params.get('cuenta') || 'No especificada';
        const tarjeta = params.get('tarjeta') || 'No especificada';
        const motivo = params.get('motivo') || 'No especificado';
        const nombre = params.get('nombre') || 'Cliente';
        const telefono = params.get('telefono') || 'No especificado';

        // Creamos el Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Contenido HTML del Web Component
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="robo.css">
        <link rel="stylesheet" href="../css/neo/neon.css">
        <div class="widget-layout">
            <!-- Contenido principal del Web Component -->
            <div id="main-content" class="neo-container container">
                <h5>Centro de Atención Telefónica SEARS.</h5>
                <p><span class="customer-info">Buenas Tardes, le atiende: <b>ABIGAIL NAJERA</b>.</span></p>
                <p>¿Tengo el gusto con el Sr./Sra. <b>${nombre}</b>? ¿En qué puedo servirle?</p>

                <!-- Formulario de motivos -->
                <div class="formrow">
                    <div class="neo-form-group neo-col neo-col--6">
                        <label for="grupo">Grupo:</label>
                        <select id="grupo" class="neo-form-control">
                            <option>SERVICIO</option>
                            <option>ACLARACIÓN</option>
                            <option>LINEA DE CRÉDITO</option>
                            <option>CAJEROS SANBORNS</option>
                        </select>
                    </div>
                    <div class="neo-form-group neo-col neo-col--6">
                        <label for="servicio">Servicio:</label>
                        <select id="servicio" class="neo-form-control">
                            <option>Transferencia a Aprobaciones</option>
                            <option>Activación de NIP</option>
                            <option>Cambios Demográficos</option>
                            <option>Cancelación de Adicional</option>
                            <option>Cancelación de Cuenta</option>
                            <option>Carta Referencia</option>
                            <option>Cliente RIP</option>
                            <option>Directorio de tiendas</option>
                            <option>Envío de Estados de Cuenta</option>
                            <option>Envío de Placa</option>
                            <option>Problemas Internet</option>
                            <option>Queja de Servicio Tienda</option>
                            <option>Registro de Adicional</option>
                            <option>Reporte de Estados de Cuenta</option>
                            <option>Status de Solicitud</option>
                            <option>Tarjeta Robada</option>
                            <option>Transferencia a Cobranza</option>
                            <option>Transferencia a Promociones</option>
                            <option>Transferencias a Seguros</option>
                        </select>
                    </div>
                    <button id="agregar-btn" class="btn custom-primary">Agregar</button>
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
                        <tbody id="motivos-body">
                            <tr id="no-info-row">
                                <td colspan="3">Sin Información</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Fila para finalizar la llamada -->
                <div class="button-right">
                    <p>Esperamos tener el placer de atenderlo próximamente.<br>Le atendió <b>ABIGAIL NAJERA</b> del Centro de Atención Telefónica SEARS.</p>
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
                                <td>101 INSURGENTES</td>
                                <td>CC Plaza Insurgentes San Luis Potosí No. 214, Col. Roma, Del. Cuauhtémoc, CDMX</td>
                                <td>52303940</td>
                                <td>52303900</td>
                                <td>55741780</td>
                                <td>METRO</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Formulario de Estado de Cuenta (inicialmente oculto) -->
            <div id="estado-cuenta-form" class="estado-cuenta-form" style="display: none;">
                <h2>Envío de Estado de Cuenta</h2>
                <form>
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" class="form-control" value="${this.nombre || ''}">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="tipo-cuenta">Tipo de Cuenta:</label>
                            <select id="tipo-cuenta" class="form-control">
                                <option>Publica</option>
                                <!-- Agregar más opciones si es necesario -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="periodo-inicial">Periodo Inicial:</label>
                            <select id="periodo-inicial" class="form-control">
                                <option>02-2024</option>
                                <!-- Agregar más opciones si es necesario -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="periodo-final">Periodo Final:</label>
                            <select id="periodo-final" class="form-control">
                                <option>02-2024</option>
                                <!-- Agregar más opciones si es necesario -->
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="forma-envio">Forma de Envío:</label>
                            <select id="forma-envio" class="form-control">
                                <option>Correo</option>
                                <!-- Agregar más opciones si es necesario -->
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="correo">Correo:</label>
                            <div class="input-group">
                                <input type="email" id="correo" class="form-control">
                                <div class="input-group-append">
                                    <button type="button" class="btn-refresh">↻</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn-enviar">Enviar</button>
                </form>
                <div class="info-container">
                    <span class="info-text">Favor de solicitar el No. de Fax o la Dirección de Email.</span>
                    <span class="info-text">Para enviar un Fax el Cliente debe dejar su Fax en Automático.</span>
                    <span class="info-text">El Fax o Email llegará en un Periodo de de 30 a 45 Minutos.</span>
                </div>
                
            </div>

            <!-- Sidebar -->
            <div class="sidebar-container">
                <div class="sidebar-content">
                    <!-- Información básica -->
                    <div class="sidebar-header">
                        <h5>CEAT: ROBO SEARS 📞</h5>
                        <p class="text-danger">MOTIVO: ${motivo} - ${telefono}</p>
                        <p>Cuenta: ${cuenta}</p>
                    </div>
                    <!-- Tarjeta e icono -->
                    <div class="sidebar-card">
                        <p>Tarjeta:</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" value="${tarjeta}" aria-label="Tarjeta" disabled>
                            <div class="input-group-append">
                                <button class="btn btn-primary" type="button">💳</button>
                            </div>
                        </div>
                    </div>
                    <!-- Botones de acciones -->
                    <div class="sidebar-buttons">
                        <button id="btn-inicio" class="btn btn-warning btn-block mb-2">🏠 Inicio</button>
                        <button id="btn-tips" class="btn btn-info btn-block mb-2">💡 Tips</button>
                        <button id="btn-edo-cuenta" class="btn btn-danger btn-block mb-2">📊 Edo. Cuenta</button>
                    </div>
                </div>
            </div>
        </div>
        `;

        // Llamamos a los métodos después de que el HTML ha sido renderizado
        this.setupDropdownLogic();
        this.setupAddButton();
        this.setupEdoCuentaButton();
    }

    // Función para manejar la lógica del botón "Agregar"
    setupAddButton() {
        const addButton = this.shadowRoot.getElementById('agregar-btn');
        const grupoSelect = this.shadowRoot.getElementById('grupo');
        const servicioSelect = this.shadowRoot.getElementById('servicio');
        const motivosBody = this.shadowRoot.getElementById('motivos-body');
        const noInfoRow = this.shadowRoot.getElementById('no-info-row');

        addButton.addEventListener('click', () => {
            const grupo = grupoSelect.value;
            const servicio = servicioSelect.value;

            // Eliminar la fila "Sin Información" si es necesario
            if (noInfoRow) {
                noInfoRow.remove();
            }

            // Crear una nueva fila en la tabla
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${grupo}</td>
                <td>${servicio}</td>
                <td><button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button></td>
            `;

            // Añadir la nueva fila a la tabla de motivos
            motivosBody.appendChild(newRow);

            // Agregar funcionalidad al botón "Eliminar"
            const eliminarBtn = newRow.querySelector('.eliminar-btn');
            eliminarBtn.addEventListener('click', () => {
                newRow.remove();

                // Si no hay más filas en la tabla, mostrar el mensaje "Sin Información"
                if (motivosBody.children.length === 0) {
                    const emptyRow = document.createElement('tr');
                    emptyRow.id = 'no-info-row';
                    emptyRow.innerHTML = `<td colspan="3">Sin Información</td>`;
                    motivosBody.appendChild(emptyRow);
                }
            });
        });
    }

    // Lógica para actualizar el dropdown de servicios
    setupDropdownLogic() {
        const servicios = {
            "ACLARACIÓN": ["Bonificación de CXF", "Fraudes", "Cheques Devueltos", "Traspaso de Pago", "Traspaso de Venta", "Pagos Internet"],
            "CAJEROS SANBORNS": ["DUDAS Y/O COMENTARIOS", "EFECTIVO RETENIDO", "RECHAZO DE RETIRO", "TARJETA RETENIDA"],
            "LINEA DE CRÉDITO": ["Consulta de Saldo", "Traspaso CR a Reserva"],
            "SERVICIO": [
                "Transferencia a Aprobaciones", "Activación de NIP", "Cambios Demográficos", "Cancelación de Adicional",
                "Cancelación de Cuenta", "Carta Referencia", "Cliente RIP", "Directorio de tiendas",
                "Envío de Estados de Cuenta", "Envío de Placa", "Problemas Internet", "Queja de Servicio Tienda",
                "Registro de Adicional", "Reporte de Estados de Cuenta", "Status de Solicitud", "Tarjeta Robada",
                "Transferencia (Conmutador o algún Agente)", "Transferencia a Cobranza", "Transferencia a Promociones",
                "Transferencias a Seguros", "Viajes Sears"
            ]
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

    setupEdoCuentaButton() {
        const edoCuentaBtn = this.shadowRoot.getElementById('btn-edo-cuenta');
        const mainContent = this.shadowRoot.getElementById('main-content');
        const estadoCuentaForm = this.shadowRoot.getElementById('estado-cuenta-form');

        edoCuentaBtn.addEventListener('click', () => {
            if (mainContent.style.display !== 'none') {
                mainContent.style.display = 'none';
                estadoCuentaForm.style.display = 'block';
            } else {
                mainContent.style.display = 'block';
                estadoCuentaForm.style.display = 'none';
            }
        });
    };
}

// Definir el nuevo custom element
customElements.define('centro-atencion-sears', CentroAtencionSears);
