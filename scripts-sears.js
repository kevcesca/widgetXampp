
[ //Array con las librerias del widget
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

    /**
     * connectedCallback is invoked each time the custom element is appended into a document-connected element
     */
    connectedCallback() {
        this.classList.add('neo-widget');
        this.classList.add(`widget--${scriptsSears._WIDGETNAME}`); //Asignamos la clase para encapsular los estilos
        this.style.overflowX = 'hidden';
        fetch(`${scriptsSears._WIDGTEURL}${scriptsSears._WIDGETNAME}/${scriptsSears._WIDGETNAME}.html`) //Obtenemos el template, puede estar aqui ya que el this se ejecutara en el promise
            .then(data => data.text())
            .then(html => {
                this.innerHTML += `<link rel="stylesheet" href="${scriptsSears._WIDGTEURL}${scriptsSears._WIDGETNAME}/${scriptsSears._WIDGETNAME}.css">`; //asignamos el css de nuestro widget
                this.innerHTML += html;
                this.initWidgetCode();
            });
        // Get parameters passed to the web component as attributes by context canvas.
        this.interactionId = this.getAttribute("interactionid");
        this.workRequestId = this.getAttribute("workrequestid");
        this.externalInteractionId = this.getAttribute("externalinteractionid");

        //Instancia del widget api en CCaaS
        if (this.workRequestId == null) { //si no existe el workRequestId es por que el widget de Home
            this.api = window.WS.widgetAPI();
        } else { //de lo contrario está en el layout de una interaccion
            this.api = window.WS.widgetAPI(this.interactionId);
        }
    }

    /**
     * Pon aqui el codigo de tu widget
     */
    initWidgetCode() {
        const $self = this; //$self será la referencia a la instancia del widget
        const _API = $self.api;
        const $container = $(this); //jQuery object del contenedor de la instancia de nuestro widget

        if (this.workRequestId == null) {

            console.log("RAY El workRequestId es nulo");

        } else {

        _API.onDataEvent('onInteractionEvent', function (data) {
            //console.log(`[${scriptsSears._WIDGETNAME}] onInteractionEvent`, data);

            if(data.state=="ALERTING"){
                console.log(`[${scriptsSears._WIDGETNAME}] onInteractionEvent`, data);    
            let phone = data.originatingAddress.replace('+', '');
            
            //Read P-Intrinsics from POM server
            let engagements = data.intrinsics.ENGAGEMENT_PARAMETERS;
            console.log(`[${scriptsSears._WIDGETNAME}] ENGAGEMENT CUENTA`, engagements);
            //console.log(`[${scriptsSears._WIDGETNAME}] ENGAGEMENT CUENTA`, engagements.CUENTA);
            //TOPIC_NAME; Si lee el QUEUE
            //ENGAGEMENT_PARAMETERS.CUENTA; Regresa undefined
            
            //Read agent Id
            let ClientDet = _API.getClientDetails();
            console.log(`[${scriptsSears._WIDGETNAME}] ClientDet`, ClientDet);
            let agentid =  ClientDet.agentId;
            let indAT = agentid.indexOf("@");
            let agentsub = agentid.substring(0, (indAT));
            
            //ACCESS API CONTEXT
            async function getToken(resptok){
            const options = {
                method: 'POST',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/x-www-form-urlencoded'
                },
                    body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: 'Client_CUWKGO',
                    client_secret: 'WxQVnLmMmNpIsqGnNPlZXq7FN03LmUBz'
                })
              };
              try{
              const response = await fetch('https://na.api.avayacloud.com/api/auth/v1/CUWKGO/protocol/openid-connect/token', options);
              const resptok = await response.json();
              console.log(resptok);
                return resptok;
             } catch (e) {
                return e;
              }
            }

            getToken().then(resptok => getEng(resptok.access_token)); 
            

            // API CUSTOMER JOURNEY GET ENGAGEMENT
            async function getEng(tokenr){
            const optAPI = {method: 'GET', headers: {accept: 'application/json', authorization: `Bearer ${tokenr}`, appkey: '3d5e4921f6cc44b594f5aa94930e346e' }};
            try{    
            const respAPI = await fetch(`https://na.api.avayacloud.com/api/journey/v1/accounts/CUWKGO/engagements/${data.workRequestId}`, optAPI);
            const respident = await respAPI.json();
            console.log(respident);
            console.log(respident.identifiers.cuenta);
            return respident;    
            
            } catch (e) {
                return e;
              }
            }

            
            $container.find('#SCRIPTS-IFRAME').attr('src', `https://127.0.0.1/widgets/scripts-sears/queues/index.html?cuenta=123456&tarjeta=987654321&motivo=Pago&nombre=Juan%20Perez&telefono=5512345678&queue=sears`);
            
                    }
           

        });
        //No hay evento de Contexto para llamadas de voz 
        //_API.onDataEvent('onContextDataEvent', function contD (data1) { 
        //    console.log(`[${scriptsSears._WIDGETNAME}] onContextDataEvent`, data1);
        //}); 
    } 
    }
}

// Define Web Component
customElements.define(scriptsSears._WIDGETNAME, scriptsSears);