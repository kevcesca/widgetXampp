import { EstadoCuenta } from '../estadosCuenta/estadoCuenta.js';

class CentroAtencionSears extends HTMLElement {
    constructor() {
        super();

        // Extraer los parámetros de la URL
        const params = new URLSearchParams(window.location.search);
        const cuenta = params.get('cuenta') || 'No especificada';
        const motivo = params.get('motivo') || 'No especificado';
        const nombreCliente = params.get('nombreCliente') || 'Cliente';
        const nombreAgente = params.get('nombreAgente') || 'Cliente';
        const telefono = params.get('telefono') || 'No especificado';

        // Creamos el Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Contenido HTML del Web Component con el sidebar incluido
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="robo.css">
        <div class="widget-layout">
            <!-- Contenido principal del Web Component -->
            <div id="main-content" class="neo-container container">
                <h5>Centro de Atención Telefónica SEARS.</h5>
                <p><span class="customer-info">Buenas Tardes, le atiende: <b>${nombreAgente}</b>.</span></p>
                <p>¿Tengo el gusto con el Sr./Sra. <b>${nombreCliente}</b>? ¿En qué puedo servirle?</p>

                <!-- Formulario de motivos -->
                <div class="formrow">
                    <div class="neo-form-group neo-col neo-col--6">
                        <label for="grupo">Grupo:</label>
                        <select id="grupo" class="neo-form-control">
                            <option>ACLARACIÓN</option>
                            <option>CAJEROS SEARS</option>
                            <option>LINEA DE CRÉDITO</option>
                            <option>SERVICIO</option>
                        </select>
                    </div>
                    <div class="neo-form-group neo-col neo-col--6">
                        <label for="servicio">Servicio:</label>
                        <select id="servicio" class="neo-form-control"></select>
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
                    <p>Esperamos tener el placer de atenderlo próximamente.<br>Le atendió <b>${nombreAgente}</b>.</p>
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
                <form id="form-estado-cuenta">
                    <div class="form-group">
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" class="form-control" value="${nombreCliente}">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cuenta">Número de Cuenta:</label>
                            <input type="text" id="cuenta" class="form-control" placeholder="Número de Cuenta">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="periodo-inicial">Periodo Inicial:</label>
                            <input type="date" id="periodo-inicial" class="form-control"> <!-- Date picker -->
                        </div>
                        <div class="form-group">
                            <label for="periodo-final">Periodo Final:</label>
                            <input type="date" id="periodo-final" class="form-control"> <!-- Date picker -->
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="forma-envio">Forma de Envío:</label>
                            <select id="forma-envio" class="form-control">
                                <option>Correo</option>
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
                    <span class="info-text">El Fax o Email llegará en un Periodo de 30 a 45 Minutos.</span>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="sidebar-container">
                <div class="sidebar-content">
                    <!-- Información básica -->
                    <div class="sidebar-header">
                        <h5>CEAT: SEARS ROBO📞</h5>
                        <p class="text-danger">MOTIVO: ${motivo} - ${telefono}</p>
                        <p>Cuenta: ${cuenta}</p>
                    </div>

                    <!-- Tarjeta e icono -->
                    <div class="sidebar-card">
                        <p>Tarjeta:</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" value="${params.get('tarjeta') || 'No especificada'}" aria-label="Tarjeta" disabled>
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
        `;

        // Seleccionar el formulario del estado de cuenta
        const estadoCuentaForm = this.shadowRoot.getElementById('form-estado-cuenta');

        // Inicializar la clase EstadoCuenta con el formulario
        new EstadoCuenta(estadoCuentaForm);

        // Inicializar lógica de los botones
        this.setupDropdownLogic();
        this.setupAddButton();
        this.setupEdoCuentaButton();
        this.setupTipsButton();

        // Agregar funcionalidad para el botón de Inicio
        const inicioBtn = this.shadowRoot.getElementById('btn-inicio');
        inicioBtn.addEventListener('click', () => {
            const currentUrl = window.location.href; // Obtener la URL actual
            window.location.href = currentUrl; // Recargar la página
        });
    }

    // Función para manejar el botón de Tips
    setupTipsButton() {
        const tipsBtn = this.shadowRoot.getElementById('btn-activar-nip');
        tipsBtn.addEventListener('click', () => {
            console.log('Botón de Tips presionado, enviando mensaje para hacer la transferencia.');
            window.parent.postMessage({ action: 'doSingleStepConference' }, '*');
        });
    }

    // Función para manejar el botón "Agregar"
    setupAddButton() {
        const addButton = this.shadowRoot.getElementById('agregar-btn');
        const grupoSelect = this.shadowRoot.getElementById('grupo');
        const servicioSelect = this.shadowRoot.getElementById('servicio');
        const motivosBody = this.shadowRoot.getElementById('motivos-body');
        const noInfoRow = this.shadowRoot.getElementById('no-info-row');

        addButton.addEventListener('click', () => {
            const grupo = grupoSelect.value;
            const codigoMotivo = servicioSelect.value;

            if (noInfoRow) {
                noInfoRow.remove();
            }

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
            <td>${grupo}</td>
            <td>${codigoMotivo}</td>
            <td><button class="btn btn-danger btn-sm eliminar-btn">Eliminar</button></td>
            `;
            motivosBody.appendChild(newRow);

            const eliminarBtn = newRow.querySelector('.eliminar-btn');
            eliminarBtn.addEventListener('click', () => {
                newRow.remove();

                if (motivosBody.children.length === 0) {
                    const emptyRow = document.createElement('tr');
                    emptyRow.id = 'no-info-row';
                    emptyRow.innerHTML = `<td colspan="3">Sin Información</td>`;
                    motivosBody.appendChild(emptyRow);
                }
            });

            // Enviar el motivo al widget principal
            window.parent.postMessage({ motivo: codigoMotivo }, "*");
        });
    }

    // Lógica del dropdown de servicios según el grupo
    setupDropdownLogic() {
        const servicios = {
            "ACLARACIÓN": [
                { nombre: "Bonificación de CXF", codigo: "00155" },
                { nombre: "Fraudes", codigo: "00158" },
                { nombre: "Cheques Devueltos", codigo: "00157" },
                { nombre: "Traspaso de Pago", codigo: "00160" },
                { nombre: "Pagos Internet", codigo: "00159" }
            ],
            "CAJEROS SEARS": [
                { nombre: "DUDAS Y/O COMENTARIOS", codigo: "00140" },
                { nombre: "EFECTIVO RETENIDO", codigo: "00152" },
                { nombre: "RECHAZO DE RETIRO", codigo: "00131" },
                { nombre: "TARJETA RETENIDA", codigo: "00177" }
            ],
            "LINEA DE CRÉDITO": [
                { nombre: "Consulta de Saldo", codigo: "00162" },
                { nombre: "Traspaso CR a Reserva", codigo: "00163" }
            ],
            "SERVICIO": [
                { nombre: "Transferencia a Aprobaciones", codigo: "00179" },
                { nombre: "Activación de NIP", codigo: "00183" },
                { nombre: "Cambios Demográficos", codigo: "00164" },
                { nombre: "Cancelación de Adicional", codigo: "00165" },
                { nombre: "Cancelación de Cuenta", codigo: "00166" },
                { nombre: "Carta Referencia", codigo: "00167" },
                { nombre: "Cliente RIP", codigo: "00168" },
                { nombre: "Directorio de tiendas", codigo: "00169" },
                { nombre: "Envío de Estados de Cuenta", codigo: "00170" },
                { nombre: "Envío de Placa", codigo: "00171" },
                { nombre: "Problemas Internet", codigo: "00172" },
                { nombre: "Queja de Servicio Tienda", codigo: "00173" },
                { nombre: "Registro de Adicional", codigo: "00174" },
                { nombre: "Reporte de Estados de Cuenta", codigo: "00175" },
                { nombre: "Status de Solicitud", codigo: "00176" },
                { nombre: "Tarjeta Robada", codigo: "00177" },
                { nombre: "Transferencia (Conmutador o algún Agente)", codigo: "00156" },
                { nombre: "Transferencia a Cobranza", codigo: "00180" },
                { nombre: "Transferencia a Promociones", codigo: "00181" },
                { nombre: "Transferencias a Seguros", codigo: "00178" },
                { nombre: "Viajes Sears", codigo: "00182" }
            ]
        };


        const grupoSelect = this.shadowRoot.getElementById("grupo");
        const servicioSelect = this.shadowRoot.getElementById("servicio");

        const updateServicios = () => {
            const selectedGrupo = grupoSelect.value;
            servicioSelect.innerHTML = "";

            // Llenar el dropdown de servicios
            servicios[selectedGrupo].forEach(servicio => {
                const option = document.createElement("option");
                option.text = servicio.nombre;
                option.value = servicio.codigo;
                servicioSelect.add(option);
            });
        };

        grupoSelect.addEventListener("change", updateServicios);
        updateServicios();
    }

    // Lógica para el botón "Estado de Cuenta"
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
    }
}

// Definir el nuevo custom element
customElements.define('centro-atencion-sears', CentroAtencionSears);
