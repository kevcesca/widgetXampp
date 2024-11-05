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

                // Extraer solo el mes y año del periodo inicial y final
                const mesInicial = periodoInicial.getUTCMonth(); // 0-11
                const añoInicial = periodoInicial.getUTCFullYear();
                const mesFinal = periodoFinal.getUTCMonth();
                const añoFinal = periodoFinal.getUTCFullYear();

                // Calcular la diferencia en meses entre el periodo inicial y final
                const diferenciaMeses = this.calcularDiferenciaMeses(añoInicial, mesInicial, añoFinal, mesFinal);
                if (diferenciaMeses > 3) {
                    alert("El rango de fechas debe ser entre 1 y máximo 4 meses.");
                    return;
                }

                // Paso 1: Obtener el token y encriptar el PAN solo una vez
                const token = await this.solicitarToken();
                const panEncriptado = await this.encriptarPAN(token, cuenta);

                // Generar el arreglo de fechas para el día 15 de cada mes en el rango
                let mesActual = mesInicial;
                let añoActual = añoInicial;
                const fechasEstadoCuenta = [];

                for (let i = 0; i <= diferenciaMeses; i++) {
                    const fechaSolicitud = new Date(Date.UTC(añoActual, mesActual, 15)); // Día 15 en UTC
                    fechasEstadoCuenta.push(this.formatearFecha(fechaSolicitud));

                    mesActual++;
                    if (mesActual > 11) { // Si el mes supera diciembre, reiniciar a enero y aumentar el año
                        mesActual = 0;
                        añoActual++;
                    }
                }

                // Realizar una solicitud con todas las fechas en el arreglo
                const resultado = await this.solicitarEstadoCuenta(token, panEncriptado, fechasEstadoCuenta);
                console.log("Estados de cuenta enviados:", resultado);

            } catch (error) {
                alert("Error al obtener el estado de cuenta: " + error.message);
            }
        });
    }

    // Calcular la diferencia en meses entre dos fechas (usando año y mes)
    calcularDiferenciaMeses(añoInicial, mesInicial, añoFinal, mesFinal) {
        const años = añoFinal - añoInicial;
        const meses = mesFinal - mesInicial;
        return años * 12 + meses;
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

        try {
            const tokenResponse = await this.postURL("https://searsvisadesa.sears.com.mx:8443/SecureTockenAPI/TransactionGatewayAPI/SPB_SearsVisa/SecureTokenAPI/ConsultToken", tokenRequest);

            if (tokenResponse && tokenResponse.codigo === "00") {
                return tokenResponse.token;
            } else {
                throw new Error("Error al obtener el token.");
            }
        } catch (error) {
            alert("Error en la solicitud del token: " + error.message);
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

        try {
            const encryPANResponse = await this.postURL("https://searsvisadesa.sears.com.mx:8443/EncryptPanAPI/TransactionGatewayAPI/SPB_SearsVisa/EncriptaPan", encriptaRequest);

            if (encryPANResponse && encryPANResponse.codigo === "00") {
                return encryPANResponse.panEncrypt;
            } else {
                throw new Error("Error al encriptar el PAN.");
            }
        } catch (error) {
            alert("Error en la encriptación del PAN: " + error.message);
            throw error;
        }
    }

    async solicitarEstadoCuenta(token, panEncriptado, fechasEstadoCuenta) {
        const params = new URLSearchParams(window.location.search);
        const telefono = params.get('telefono') || 'No especificado';
        
        const estadoCuentaRequest = {
            nombreServicio: "envioCuentaEmail",
            tipoCompania: "2",
            token: token,
            pan: panEncriptado,
            tipoPan: "2",
            email: this.form.querySelector('#correo').value,
            numTelefono: telefono,
            solicitadoPor: "5",
            fechasEstadoCuenta: fechasEstadoCuenta, // Arreglo de fechas
            fechaTransaccion: this.formatearFecha(new Date()),
            horaTransaccion: this.formatearHora(new Date()),
            ipOrigen: "10.115.29.6"
        };

        estadoCuentaRequest.authenticationCode = await this.generarAuthCode(estadoCuentaRequest);

        try {
            const response = await this.postURL("https://searsvisadesa.sears.com.mx:8443/spb-envio-cuenta-email/ServiciosSearsVisa/spb_services/EnviosCuentasEmail", estadoCuentaRequest);

            if (response.codigo === "00") {
                alert("Estados de cuenta enviados correctamente");
                return response;
            } else {
                throw new Error("Error al solicitar los estados de cuenta.");
            }
        } catch (error) {
            alert("Error en la solicitud de estados de cuenta: " + error.message);
            throw error;
        }
    }

    formatearFecha(date) {
        const dia = String(date.getUTCDate()).padStart(2, "0"); // Usar UTC
        const mes = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses empiezan en 0
        const anio = date.getUTCFullYear();
        return `${dia}/${mes}/${anio}`;
    }

    formatearHora(date) {
        const horas = String(date.getUTCHours()).padStart(2, "0");
        const minutos = String(date.getUTCMinutes()).padStart(2, "0");
        const segundos = String(date.getUTCSeconds()).padStart(2, "0");
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
            alert("Error en la solicitud POST: " + error.message);
            throw error;
        }
    }
}
