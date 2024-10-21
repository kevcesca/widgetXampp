## Versión: 0.7.0


### Cambios en la versión 0.7.0

#### Inbound:
- **Obtención del token para solicitudes a la API**: Ahora se obtiene el token necesario para las solicitudes, mejorando la seguridad y autenticación de las llamadas a la API.
- **Encriptación del PAN**: El PAN se encripta para asegurar la protección de los datos sensibles durante su transmisión y almacenamiento.
- **Estados de cuenta**: Se ha agregado la funcionalidad para enviar estados de cuenta de hasta **4 meses** de antigüedad de manera satisfactoria.
- **Cambio en el flujo de dispositions**: El flujo para establecer los dispositions se ha modificado para que ahora se envíen al presionar el botón de finalizar, mejorando la usabilidad y precisión del proceso.

#### Outbound:
- **Vistas faltantes en la campaña de promociones**: Se agregaron las vistas que faltaban para la campaña de promociones, completando la interfaz.
- **Redirecciones al inicio de cada campaña**: Se han agregado redirecciones automáticas al inicio de cada campaña para mejorar la navegación y usabilidad.


### Cambios en la versión 0.6.0

#### Inbound:
- **Obtención de datos a través de AXP**: Se extraen datos de la llamada automáticamente a través de la integración con AXP.
- **Nueva vista para generar estados de cuenta**: Se agrega la funcionalidad que permite generar estados de cuenta desde la vista de inbound.
- **Botón de inicio mejorado**: El botón de inicio ahora regresa al inicio de la respectiva campaña, facilitando la navegación.
- **Mejoras en la experiencia de usuario**: Se han optimizado varios aspectos visuales y de interacción para ofrecer una mejor experiencia de usuario.

#### Outbound:
- **Actualización de nombres de campañas**: Se han actualizado los nombres de las campañas en la barra lateral (aún hardcodeados).
- **Botón de inicio**: Similar a inbound, el botón de inicio regresa a la pantalla principal de la campaña actual.
- **Eliminación del botón de agenda**: Se ha eliminado el botón de agenda de la barra lateral, simplificando la interfaz.
- **Eliminación de botones para realizar llamadas**: Se han eliminado los botones relacionados con la realización de llamadas desde la barra lateral.
- **Actualización de información de precios**: Se han realizado ajustes en la presentación y manejo de la información de precios en las campañas.
- **Simplificación de opciones del propietario**: Ahora solo se muestra la opción para el titular, eliminando las opciones relacionadas con el propietario.
- **Campaña Autotal**: Ya no se solicitan datos del vehículo ni del propietario, simplificando el proceso en esta campaña.


### Cambios en la versión 0.5.0

- **Nuevas vistas**: Se agregan las vistas para la **generación de estados de cuenta** en las campañas inbound.
- **Mejoras en estilos**: Se optimizan los estilos visuales de todas las campañas inbound para mejorar la presentación y la experiencia de usuario.
- **Ajuste en tablas**: Se iguala el funcionamiento y comportamiento de las tablas en las campañas **Bienestar** e **Inbursa PPS**, unificando la estructura para consistencia en todas las campañas.


### Próximos pasos

- Conexión con APIs para la generación dinámica de estados de cuenta y manejo de datos en llamadas.
  

### Instalación

1. Clonar el repositorio:
    ```bash
    git clone https://github.com/kevcesca/paginaWidgets.git
    ```

2. Abrir el archivo `index.html` para visualizar el front-end en desarrollo.

### Uso

De momento, el proyecto ofrece una interfaz de usuario estática para visualizar las campañas inbound y la generación de estados de cuenta. Las funcionalidades aún están en desarrollo y se espera implementar la conexión con APIs en las próximas versiones.


_Proyecto en desarrollo._
