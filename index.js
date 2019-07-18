// Lambda Function code for Alexa.
// Paste this into your index.js file. 

const Alexa = require("ask-sdk");
const https = require("https");



const invocationName = "orizaba pueblo mágico";

// Session Attributes 
//   Alexa will track attributes for you, by default only during the lifespan of your session.
//   The history[] array will track previous request(s), used for contextual Help/Yes/No handling.
//   Set up DynamoDB persistence to have the skill save and reload these attributes between skill sessions.

const ubi = 'Se ubica en la zona centro de la Región de las Altas Montañas del Estado de Veracruz, a dos horas tanto del Puerto de Veracruz como de la ciudad de Puebla, que más quieres saber acerca de orizaba?';
const cli = 'temperatura promedio anual de 21,5 grados; que sube hasta 22 grados entre mayo y junio, y baja a 16 ó 17 grados en la temporada invernal. Los veranos son lluviosos. los momentos de máximo calor rara vez superan los 28 grados, mientras que los fríos extremos son de 10 ó 11 grados, que más quieres saber acerca de orizaba?';
const atr = 'Museo del arte del estado, Palacio municipal, Paseo del río de orizaba, teleférico, Palacio de hierro, poliforum mier y pesado, Expo Parque de los Dinosaurios, Parque nacional 500 escalones, ecoparque cerro del borrego, que más quieres saber acerca de orizaba?';
const gas = 'Puedes comer diferentes cosas entre las que se encuentran los tradicionales pambazos, chileatole verde de chito o rojo de camarón, empanadas, garnachas, memelas, picadas, tortas de pierna, tesmole de barbacoa entre otros, que más quieres saber acerca de orizaba?';
const mus = 'Originalmente fue el Oratorio de San Felipe Neri para después pasar a ser albergue de soldados, hospicio, hospital y finalmente convertirse en el museo. Cuenta con más de 600 obras de arte. La colección más reconocida es la de Diego Rivera y las obras representantes de la plástica veracruzana, que más quieres saber acerca de orizaba?';
const pal = 'Construcción neoclásica de principios del siglo 20, declarado Patrimonio Nacional. Alberga en su interior un mural de José Clemente Orozco, que más quieres saber acerca de orizaba?';
const rio = 'Este paseo cruza la ciudad de norte a sur, recorriendo una distancia de casi 5 kilómetros sobre la rivera del río Orizaba. Durante el recorrido observarán puentes, arboledas, juegos infantiles y asadores, pero lo que más llama la atención de este lugar turístico es la reserva animal, que más quieres saber acerca de orizaba?';
const tel = 'Las salidas son desde la Plaza Pichucalco hasta la cima del Cerro del Borrego, logrando alcanzar una altura de 320 metros sobre el nivel de la Ciudad; considerado uno de los teleféricos más altos del país.La duración estimada del recorrido es de 4 a 6 minutos, que más quieres saber acerca de orizaba?';
const hie = 'Se le conoce así porque está hecho en acero, pero el edificio ya es un ícono de la ciudad. Lo trajeron en partes desde Bélgica y se armó en el centro de la ciudad. Ahora alberga la oficina de turismo, 4 museos: el de la cerveza, del fútbol, el geográfico y el que relata la historia del Valle de Orizaba, además no te pierdas una visita a su cafetería: el Gran Café de Orizaba, que más quieres saber acerca de orizaba?';
const mie = 'Belleza arquitectónica fue declarado Monumento Artístico Nacional.  considerado como único en el Estado de Veracruz por su dimensión y su forma, semejante a un Castillo estilo ecléctico. Adentro puede encontrar el Museo Francisco Gabilondo Soler Cri-Cri, el Museo del Traje y el Museo de Orizaba ayer y hoy, con sala de presidentes y sala de las casitas. Además, dentro de sus instalaciones este lugar turístico posee sala de eventos, biblioteca digital, zona de restaurantes y espaciosos jardines, que más quieres saber acerca de orizaba?';
const din = 'Parque temático con un recorrido en las cuales se encuentran esculturas gigantes de dinosaurios y algunas de plantas prehistóricas.  Cuenta también con un área infantil y una cascada artificial, que más quieres saber acerca de orizaba?';
const cer = 'Parque temático en la cima del cerro del borrego, cuenta con dos museos, uno de ellos te explica la batalla que aquí libró el ejército mexicano con los franceses y el otro, es el museo Geográfico de Orizaba, que más quieres saber acerca de orizaba?';
const par = 'Dentro del Parque Nacional se ubica la Cascada del Elefante, aunque su altura es de solo 20 metros, sin duda te regalará un hermoso paisaje. Para una mejor la vista y poder apreciar su forma, es necesario bajar los 500 escalones desde donde tendrás una vista panorámica de 180 grados hacia el cañón y la cascada, que más quieres saber acerca de orizaba?';


function getMemoryAttributes() {   const memoryAttributes = {
       "history":[],


       "launchCount":0,
       "lastUseTimestamp":0,

       "lastSpeechOutput":{},
       // "nextIntent":[]

       // "favoriteColor":"",
       // "name":"",
       // "namePronounce":"",
       // "email":"",
       // "mobileNumber":"",
       // "city":"",
       // "state":"",
       // "postcode":"",
       // "birthday":"",
       // "bookmark":0,
       // "wishlist":[],
   };
   return memoryAttributes;
};

const maxHistorySize = 20; // remember only latest 20 intents 


// 1. Intent Handlers =============================================

const AMAZON_CancelIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Entendido, hablamos más tarde! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_HelpIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let history = sessionAttributes['history'];
        let intents = getCustomIntents();
        let sampleIntent = randomElement(intents);
        

        let say = 'Solicitaste ayuda, Puedes preguntarme acerca de la gastronomía local, puntos de interés como el palacio de hierro o teleférico o inclusive donde se encuentra, que mas puedo hacer por ti? '; 
        
        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const AMAZON_StopIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();


        let say = 'Okay, hablamos despues! ';

        return responseBuilder
            .speak(say)
            .withShouldEndSession(true)
            .getResponse();
    },
};

const AMAZON_NavigateHomeIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.NavigateHomeIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Hello from AMAZON.NavigateHomeIntent. ';


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

//8183197500 fiesta inn la fe
//270*3

const DidNotUnderstandIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'DidNotUnderstandIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = 'Disculpa no entendi lo que me quieres decir';


        return responseBuilder
            .speak(say)
            .reprompt(say)
            .getResponse();
    },
};

const WhereIsItIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'WhereIsItIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = ubi;


        return responseBuilder
            .speak(say)
            .reprompt( say)
            .getResponse();
    },
};

const HowIsWeatherIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'HowIsWeatherIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = cli;


        return responseBuilder
            .speak(say)
            .reprompt(say)
            .getResponse();
    },
};

const ActivitiesIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'ActivitiesIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = '';

        let slotValues = getSlotValues(request.intent.slots); 
        console.log('ubicacion',slotValues.locations.resolved);
        
        console.log(slotValues.locations)
        switch (slotValues.locations.resolved){
            case 'Museo del arte del estado':
                say = atr;
                break;
            case 'Palacio municipal':
                say = pal;
                break;
            case 'Paseo del río de Orizaba':
                say = rio;
                break;
            case 'Teleférico':
                say = tel;
                break;
            case 'Palacio de Hierro':
                say = hie;
                break;
            case 'Poliforum mier y pesado':
                say = mie;
                break;
            case 'Expo Parque de los Dinosaurios':
                say = din;
                break;
            case 'Parque nacional 500 escalones':
                say = par;
                break;
            case 'Ecoparque cerro del borrego':
                say = cer;
                break;
            default:
                say = 'Disculpa ese lugar no se encuentra en orizaba';
                break;
        };

        return responseBuilder
            .speak(say)
            .reprompt(say)
            .getResponse();
    },
};

const FoodIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'FoodIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = gas;


        return responseBuilder
            .speak(say)
            .reprompt(say)
            .getResponse();
    },
};

const aboutIntent_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'aboutIntent' ;
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        let say = atr;


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            .getResponse();
    },
};

const LaunchRequest_Handler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        let say = 'Bienvenido a ' +  invocationName + ' ! Guia basica de atractivos turisticos, que deseas saber de orizaba?';

        let skillTitle = capitalize(invocationName);


        return responseBuilder
            .speak(say)
            .reprompt('try again, ' + say)
            // .withStandardCard('Welcome!', 
            //   'Hello!\nThis is a card for your skill, ' + skillTitle,
            //   welcomeCardImg.smallImageUrl, welcomeCardImg.largeImageUrl)
            .getResponse();
    },
};

const SessionEndedHandler =  {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler =  {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        // console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);

        return handlerInput.responseBuilder
            .speak(`Sorry, your skill got this error.  ${error.message} `)
            .reprompt(`Sorry, your skill got this error.  ${error.message} `)
            .getResponse();
    }
};


// 2. Constants ===========================================================================

    // Here you can define static data, to be used elsewhere in your code.  For example: 
    //    const myString = "Hello World";
    //    const myArray  = [ "orange", "grape", "strawberry" ];
    //    const myObject = { "city": "Boston",  "state":"Massachusetts" };

const APP_ID = undefined;  // TODO replace with your Skill ID (OPTIONAL).

// 3.  Helper Functions ===================================================================

function capitalize(myString) {

     return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }) ;
}

 
function randomElement(myArray) { 
    return(myArray[Math.floor(Math.random() * myArray.length)]); 
} 
 
function stripSpeak(str) { 
    return(str.replace('<speak>', '').replace('</speak>', '')); 
} 
 
 
 
 
function getSlotValues(filledSlots) { 
    const slotValues = {}; 
 
    Object.keys(filledSlots).forEach((item) => { 
        const name  = filledSlots[item].name; 
 
        if (filledSlots[item] && 
            filledSlots[item].resolutions && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0] && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status && 
            filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) { 
                case 'ER_SUCCESS_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name, 
                        ERstatus: 'ER_SUCCESS_MATCH' 
                    }; 
                    break; 
                case 'ER_SUCCESS_NO_MATCH': 
                    slotValues[name] = { 
                        heardAs: filledSlots[item].value, 
                        resolved: '', 
                        ERstatus: 'ER_SUCCESS_NO_MATCH' 
                    }; 
                    break; 
                default: 
                    break; 
            } 
        } else { 
            slotValues[name] = { 
                heardAs: filledSlots[item].value || '', // may be null 
                resolved: '', 
                ERstatus: '' 
            }; 
        } 
    }, this); 
 
    return slotValues; 
} 
 
function getExampleSlotValues(intentName, slotName) { 
 
    let examples = []; 
    let slotType = ''; 
    let slotValuesFull = []; 
 
    let intents = model.interactionModel.languageModel.intents; 
    for (let i = 0; i < intents.length; i++) { 
        if (intents[i].name == intentName) { 
            let slots = intents[i].slots; 
            for (let j = 0; j < slots.length; j++) { 
                if (slots[j].name === slotName) { 
                    slotType = slots[j].type; 
 
                } 
            } 
        } 
 
    } 
    let types = model.interactionModel.languageModel.types; 
    for (let i = 0; i < types.length; i++) { 
        if (types[i].name === slotType) { 
            slotValuesFull = types[i].values; 
        } 
    } 
 
    slotValuesFull = shuffleArray(slotValuesFull); 
 
    examples.push(slotValuesFull[0].name.value); 
    examples.push(slotValuesFull[1].name.value); 
    if (slotValuesFull.length > 2) { 
        examples.push(slotValuesFull[2].name.value); 
    } 
 
 
    return examples; 
} 
 
function sayArray(myData, penultimateWord = 'and') { 
    let result = ''; 
 
    myData.forEach(function(element, index, arr) { 
 
        if (index === 0) { 
            result = element; 
        } else if (index === myData.length - 1) { 
            result += ` ${penultimateWord} ${element}`; 
        } else { 
            result += `, ${element}`; 
        } 
    }); 
    return result; 
} 
function supportsDisplay(handlerInput) // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.) 
{                                      //  Enable your skill for display as shown here: https://alexa.design/enabledisplay 
    const hasDisplay = 
        handlerInput.requestEnvelope.context && 
        handlerInput.requestEnvelope.context.System && 
        handlerInput.requestEnvelope.context.System.device && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces && 
        handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display; 
 
    return hasDisplay; 
} 
 
function getCustomIntents() { 
    const modelIntents = model.interactionModel.languageModel.intents; 
 
    let customIntents = []; 
 
 
    for (let i = 0; i < modelIntents.length; i++) { 
 
        if(modelIntents[i].name.substring(0,7) != "AMAZON." && modelIntents[i].name !== "LaunchRequest" ) { 
            customIntents.push(modelIntents[i]); 
        } 
    } 
    return customIntents; 
} 
 
function getSampleUtterance(intent) { 
 
    return randomElement(intent.samples); 
 
} 
 
function getPreviousIntent(attrs) { 
 
    if (attrs.history && attrs.history.length > 1) { 
        return attrs.history[attrs.history.length - 2].IntentRequest; 
 
    } else { 
        return false; 
    } 
 
} 
 
function getPreviousSpeechOutput(attrs) { 
 
    if (attrs.lastSpeechOutput && attrs.history.length > 1) { 
        return attrs.lastSpeechOutput; 
 
    } else { 
        return false; 
    } 
 
} 
 
function timeDelta(t1, t2) { 
 
    const dt1 = new Date(t1); 
    const dt2 = new Date(t2); 
    const timeSpanMS = dt2.getTime() - dt1.getTime(); 
    const span = { 
        "timeSpanMIN": Math.floor(timeSpanMS / (1000 * 60 )), 
        "timeSpanHR": Math.floor(timeSpanMS / (1000 * 60 * 60)), 
        "timeSpanDAY": Math.floor(timeSpanMS / (1000 * 60 * 60 * 24)), 
        "timeSpanDesc" : "" 
    }; 
 
 
    if (span.timeSpanHR < 2) { 
        span.timeSpanDesc = span.timeSpanMIN + " minutes"; 
    } else if (span.timeSpanDAY < 2) { 
        span.timeSpanDesc = span.timeSpanHR + " hours"; 
    } else { 
        span.timeSpanDesc = span.timeSpanDAY + " days"; 
    } 
 
 
    return span; 
 
} 
 
 
const InitMemoryAttributesInterceptor = { 
    process(handlerInput) { 
        let sessionAttributes = {}; 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            let memoryAttributes = getMemoryAttributes(); 
 
            if(Object.keys(sessionAttributes).length === 0) { 
 
                Object.keys(memoryAttributes).forEach(function(key) {  // initialize all attributes from global list 
 
                    sessionAttributes[key] = memoryAttributes[key]; 
 
                }); 
 
            } 
            handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
 
        } 
    } 
}; 
 
const RequestHistoryInterceptor = { 
    process(handlerInput) { 
 
        const thisRequest = handlerInput.requestEnvelope.request; 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
        let history = sessionAttributes['history'] || []; 
 
        let IntentRequest = {}; 
        if (thisRequest.type === 'IntentRequest' ) { 
 
            let slots = []; 
 
            IntentRequest = { 
                'IntentRequest' : thisRequest.intent.name 
            }; 
 
            if (thisRequest.intent.slots) { 
 
                for (let slot in thisRequest.intent.slots) { 
                    let slotObj = {}; 
                    slotObj[slot] = thisRequest.intent.slots[slot].value; 
                    slots.push(slotObj); 
                } 
 
                IntentRequest = { 
                    'IntentRequest' : thisRequest.intent.name, 
                    'slots' : slots 
                }; 
 
            } 
 
        } else { 
            IntentRequest = {'IntentRequest' : thisRequest.type}; 
        } 
        if(history.length > maxHistorySize - 1) { 
            history.shift(); 
        } 
        history.push(IntentRequest); 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
 
}; 
 
 
 
 
const RequestPersistenceInterceptor = { 
    process(handlerInput) { 
 
        if(handlerInput.requestEnvelope.session['new']) { 
 
            return new Promise((resolve, reject) => { 
 
                handlerInput.attributesManager.getPersistentAttributes() 
 
                    .then((sessionAttributes) => { 
                        sessionAttributes = sessionAttributes || {}; 
 
 
                        sessionAttributes['launchCount'] += 1; 
 
                        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
                        handlerInput.attributesManager.savePersistentAttributes() 
                            .then(() => { 
                                resolve(); 
                            }) 
                            .catch((err) => { 
                                reject(err); 
                            }); 
                    }); 
 
            }); 
 
        } // end session['new'] 
    } 
}; 
 
 
const ResponseRecordSpeechOutputInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
        let lastSpeechOutput = { 
            "outputSpeech":responseOutput.outputSpeech.ssml, 
            "reprompt":responseOutput.reprompt.outputSpeech.ssml 
        }; 
 
        sessionAttributes['lastSpeechOutput'] = lastSpeechOutput; 
 
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes); 
 
    } 
}; 
 
const ResponsePersistenceInterceptor = { 
    process(handlerInput, responseOutput) { 
 
        const ses = (typeof responseOutput.shouldEndSession == "undefined" ? true : responseOutput.shouldEndSession); 
 
        if(ses || handlerInput.requestEnvelope.request.type == 'SessionEndedRequest') { // skill was stopped or timed out 
 
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
 
            sessionAttributes['lastUseTimestamp'] = new Date(handlerInput.requestEnvelope.request.timestamp).getTime(); 
 
            handlerInput.attributesManager.setPersistentAttributes(sessionAttributes); 
 
            return new Promise((resolve, reject) => { 
                handlerInput.attributesManager.savePersistentAttributes() 
                    .then(() => { 
                        resolve(); 
                    }) 
                    .catch((err) => { 
                        reject(err); 
                    }); 
 
            }); 
 
        } 
 
    } 
}; 
 
 
function shuffleArray(array) {  // Fisher Yates shuffle! 
 
    let currentIndex = array.length, temporaryValue, randomIndex; 
 
    while (0 !== currentIndex) { 
 
        randomIndex = Math.floor(Math.random() * currentIndex); 
        currentIndex -= 1; 
 
        temporaryValue = array[currentIndex]; 
        array[currentIndex] = array[randomIndex]; 
        array[randomIndex] = temporaryValue; 
    } 
 
    return array; 
} 
// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
    .addRequestHandlers(
        AMAZON_CancelIntent_Handler, 
        AMAZON_HelpIntent_Handler, 
        AMAZON_StopIntent_Handler, 
        AMAZON_NavigateHomeIntent_Handler, 
        DidNotUnderstandIntent_Handler, 
        WhereIsItIntent_Handler, 
        HowIsWeatherIntent_Handler, 
        ActivitiesIntent_Handler, 
        FoodIntent_Handler, 
        aboutIntent_Handler, 
        LaunchRequest_Handler, 
        SessionEndedHandler
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(InitMemoryAttributesInterceptor)
    .addRequestInterceptors(RequestHistoryInterceptor)

   // .addResponseInterceptors(ResponseRecordSpeechOutputInterceptor)

 // .addRequestInterceptors(RequestPersistenceInterceptor)
 // .addResponseInterceptors(ResponsePersistenceInterceptor)

 // .withTableName("askMemorySkillTable")
 // .withAutoCreateTable(true)

    .lambda();


// End of Skill code -------------------------------------------------------------
// Static Language Model for reference

const model = {
  "interactionModel": {
    "languageModel": {
      "invocationName": "orizaba pueblo mágico",
      "intents": [
        {
          "name": "AMAZON.CancelIntent",
          "samples": []
        },
        {
          "name": "AMAZON.HelpIntent",
          "samples": []
        },
        {
          "name": "AMAZON.StopIntent",
          "samples": []
        },
        {
          "name": "AMAZON.NavigateHomeIntent",
          "samples": []
        },
        {
          "name": "DidNotUnderstandIntent",
          "slots": [],
          "samples": [
            "hoy",
            "habitacion",
            "solucion",
            "sudar",
            "pongale",
            "enloquecer",
            "mundial",
            "recoger",
            "diente",
            "clinica ",
            "azucar",
            "que hora es",
            "querer",
            "salsa",
            "buena",
            "bomba",
            "tumbar",
            "ahora",
            "momento",
            "robar",
            "besos",
            "cargador",
            "asiento",
            "celular",
            "pesado",
            "mundo",
            "social",
            "memoria",
            "dientes",
            "romper",
            "pais",
            "llamar",
            "leon",
            "tigre ",
            "llorar",
            "gasolina",
            "estupendo",
            "magia",
            "cuatro",
            "gato",
            "perrro"
          ]
        },
        {
          "name": "WhereIsItIntent",
          "slots": [],
          "samples": [
            "dime donde se encuentra",
            "dime donde esta",
            "dime su ubicacion",
            "donde esta orizaba",
            "donde se encuentra",
            "en que parte esta ",
            "ubicacion de orizaba",
            "Donde esta ubicado",
            "Donde esta"
          ]
        },
        {
          "name": "HowIsWeatherIntent",
          "slots": [],
          "samples": [
            "dime como es el clima",
            "clima",
            "como es el tiempo",
            "como es el tiempo en orizaba",
            "informacion del clima",
            "Como es el clima "
          ]
        },
        {
          "name": "ActivitiesIntent",
          "slots": [
            {
              "name": "locations",
              "type": "locations"
            }
          ],
          "samples": [
            "dime informacion de {locations}",
            "dime infomracion acerca de  {locations}",
            "{locations}",
            "informacion acerca de {locations}",
            "informacion de {locations}",
            "que puedo hacer en {locations}",
            "que es {locations}"
          ]
        },
        {
          "name": "FoodIntent",
          "slots": [],
          "samples": [
            "dime que puedo comer",
            "gastronomia local",
            "comidas tipicas",
            "tengo hambre",
            "cual es su gastronomia",
            "Que puedo comer"
          ]
        },
        {
          "name": "aboutIntent",
          "slots": [],
          "samples": [
            "dime que puedo hacer en orizaba",
            "dime que puedo hacer ahi",
            "turismo",
            "atractivos turisticos",
            "que puedo hacer en orizaba",
            "lugares que visitar",
            "que puedo hacer",
            "Que hay"
          ]
        },
        {
          "name": "LaunchRequest"
        }
      ],
      "types": [
        {
          "name": "locations",
          "values": [
            {
              "name": {
                "value": "ecoparque cerro del borrego",
                "synonyms": [
                  "cerro del borrego"
                ]
              }
            },
            {
              "name": {
                "value": "Parque nacional 500 escalones",
                "synonyms": [
                  "500 escalones,"
                ]
              }
            },
            {
              "name": {
                "value": "Expo Parque de los Dinosaurios",
                "synonyms": [
                  "Expo Parque"
                ]
              }
            },
            {
              "name": {
                "value": "poliforum mier y pesado",
                "synonyms": [
                  "mier y pesado"
                ]
              }
            },
            {
              "name": {
                "value": "Palacio de hierro"
              }
            },
            {
              "name": {
                "value": "teleférico"
              }
            },
            {
              "name": {
                "value": "Paseo del río de orizaba",
                "synonyms": [
                  "Paseo del río"
                ]
              }
            },
            {
              "name": {
                "value": "palacio municipal",
                "synonyms": [
                  "municipio"
                ]
              }
            },
            {
              "name": {
                "value": "Museo del arte del estado"
              }
            }
          ]
        }
      ]
    }
  }
};
