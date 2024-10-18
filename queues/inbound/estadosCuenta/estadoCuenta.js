export class EstadoCuenta {
    constructor(form) {
        this.form = form;
        this.init();
    }

    init() {
        this.form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

            const cuenta = this.form.querySelector('#cuenta').value;
            const periodoInicial = new Date(this.form.querySelector('#periodo-inicial').value);
            const periodoFinal = new Date(this.form.querySelector('#periodo-final').value);
            const correo = this.form.querySelector('#correo').value;

            try {
                if (!cuenta || !correo) {
                    alert("Por favor, ingresa los datos requeridos.");
                    return;
                }

                // Validar que el rango de fechas no exceda los 4 meses
                const diferenciaMeses = this.calcularDiferenciaMeses(periodoInicial, periodoFinal);
                if (diferenciaMeses > 4) {
                    alert("El rango de fechas no puede ser mayor a 4 meses.");
                    return;
                }

                // Generar las solicitudes para cada mes en el rango
                for (let i = 0; i <= diferenciaMeses; i++) {
                    const fechaSolicitud = new Date(periodoInicial);
                    fechaSolicitud.setMonth(fechaSolicitud.getMonth() + i);
                    fechaSolicitud.setDate(15); // Establecer siempre el día 15 del mes

                    // Ejecutar el flujo completo para obtener el estado de cuenta
                    const resultado = await this.obtenerEstadoCuenta(cuenta, fechaSolicitud);
                    console.log(`Estado de cuenta para el mes ${fechaSolicitud.getMonth() + 1} obtenido:`, resultado);
                }

            } catch (error) {
                console.error("Error al obtener el estado de cuenta:", error);
            }
        });
    }

    // Calcular la diferencia en meses entre dos fechas
    calcularDiferenciaMeses(fechaInicial, fechaFinal) {
        const años = fechaFinal.getFullYear() - fechaInicial.getFullYear();
        const meses = fechaFinal.getMonth() - fechaInicial.getMonth();
        return años * 12 + meses;
    }

    async obtenerEstadoCuenta(cuenta, fecha) {
        try {
            console.log("Iniciando flujo para obtener estado de cuenta...");

            // Paso 1: Obtener el token
            const token = await this.solicitarToken();
            console.log("Token obtenido con éxito:", token);

            // Paso 2: Encriptar el PAN (cuenta)
            const panEncriptado = await this.encriptarPAN(token, cuenta);
            console.log("PAN encriptado con éxito:", panEncriptado);

            // Paso 3: Solicitar el estado de cuenta
            const estadoCuenta = await this.solicitarEstadoCuenta(token, panEncriptado, fecha);
            console.log("Estado de cuenta obtenido con éxito:", estadoCuenta);

            return estadoCuenta;
        } catch (error) {
            console.error("Error en el flujo para obtener el estado de cuenta:", error);
            throw error;
        }
    }

    async solicitarToken() {
        const tokenRequest = {
            nombreServicio: "consultToken",
            tipoCompania: "2",
            solicitadoPor: "5",
            fechaTransaccion: this.formatearFecha(new Date()),
            horaTransaccion: this.formatearHora(new Date()),
            ipOrigen: "10.115.29.6"
        };

        tokenRequest.authenticationCode = await this.generarAuthCode(tokenRequest);

        console.log("Solicitando token con los datos:", tokenRequest);

        try {
            const tokenResponse = await this.postURL("http://10.128.14.10:8080/SecureTockenAPI/TransactionGatewayAPI/SPB_SearsVisa/SecureTokenAPI/ConsultToken", tokenRequest);

            if (tokenResponse && tokenResponse.codigo === "00") {
                return tokenResponse.token;
            } else {
                throw new Error("Error al obtener el token.");
            }
        } catch (error) {
            console.error("Error en la solicitud del token:", error);
            throw error;
        }
    }

    async encriptarPAN(token, cuenta) {
        const encriptaRequest = {
            nombreServicio: "encriptaPan",
            tipoCompania: "2",
            token: token,
            pan: cuenta,
            tipoPan: "2",
            solicitadoPor: "5",
            fechaTransaccion: this.formatearFecha(new Date()),
            horaTransaccion: this.formatearHora(new Date()),
            ipOrigen: "10.115.29.6"
        };

        encriptaRequest.authenticationCode = await this.generarAuthCode(encriptaRequest);

        console.log("Encriptando PAN con los datos:", encriptaRequest);

        try {
            const encryPANResponse = await this.postURL("http://10.128.14.10:8080/EncryptPanAPI/TransactionGatewayAPI/SPB_SearsVisa/EncriptaPan", encriptaRequest);

            if (encryPANResponse && encryPANResponse.codigo === "00") {
                return encryPANResponse.panEncrypt;
            } else {
                throw new Error("Error al encriptar el PAN.");
            }
        } catch (error) {
            console.error("Error en la encriptación del PAN:", error);
            throw error;
        }
    }

    async solicitarEstadoCuenta(token, panEncriptado, fecha) {
        const estadoCuentaRequest = {
            nombreServicio: "envioCuentaEmail",
            tipoCompania: "2",
            token: token,
            pan: panEncriptado,
            tipoPan: "2",
            email: this.form.querySelector('#correo').value,
            numTelefono: "5519013832",
            solicitadoPor: "5",
            fechaEstadoCuenta: this.formatearFecha(fecha), // Utilizamos la fecha solicitada
            fechaTransaccion: this.formatearFecha(new Date()),
            horaTransaccion: this.formatearHora(new Date()),
            ipOrigen: "10.115.29.6"
        };

        estadoCuentaRequest.authenticationCode = await this.generarAuthCode(estadoCuentaRequest);

        console.log("Solicitando estado de cuenta con los datos:", estadoCuentaRequest);

        try {
            const response = await this.postURL("http://10.128.14.10:8080/spb-envio-cuenta-email/ServiciosSearsVisa/spb_services/EnvioCuentaEmail", estadoCuentaRequest);

            if (response && response.codigo === "00") {
                return response;
            } else {
                throw new Error("Error al solicitar el estado de cuenta.");
            }
        } catch (error) {
            console.error("Error en la solicitud del estado de cuenta:", error);
            throw error;
        }
    }

    formatearFecha(date) {
        const dia = String(date.getDate()).padStart(2, "0");
        const mes = String(date.getMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
        const anio = date.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }

    formatearHora(date) {
        const horas = String(date.getHours()).padStart(2, "0");
        const minutos = String(date.getMinutes()).padStart(2, "0");
        const segundos = String(date.getSeconds()).padStart(2, "0");
        return `${horas}:${minutos}:${segundos}`;
    }

    async generarAuthCode(params) {
        const cadena = [
            params.nombreServicio,
            params.tipoCompania,
            params.solicitadoPor,
            params.token || "",
            params.fechaTransaccion,
            params.horaTransaccion,
            params.ipOrigen
        ].join('');

        const encoder = new TextEncoder();
        const data = encoder.encode(cadena.trim());
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        return Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    async postURL(URL, objeto) {
        try {
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(objeto),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
            throw error;
        }
    }
}
