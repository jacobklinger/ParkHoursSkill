const Alexa = require('ask-sdk-core');
const i18n = require('i18next'); 
const languageStrings = require('./languageStrings');
const Skill = require('./skill');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speakText = handlerInput.t('LAUNCH');
    const repromptText = handlerInput.t('LAUNCH_REPROMPT');

    return handlerInput.responseBuilder
      .speak(speakText)
      .reprompt(repromptText)
      .withSimpleCard(Skill.name, speakText)
      .getResponse();
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speakText = handlerInput.t('HELP');

    return handlerInput.responseBuilder
      .speak(speakText)
      .reprompt(speakText)
      .withSimpleCard(Skill.name, speakText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speakText = "";

    return handlerInput.responseBuilder
      .speak(speakText)
      .withShouldEndSession(true)
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('I\'m sorry, I don\'t understand that question.')
      .getResponse();
  },
};

const LocalizationInterceptor = {
  process(handlerInput) {
      i18n.init({
          lng: Alexa.getLocale(handlerInput.requestEnvelope),
          resources: languageStrings,
          fallbackLng: {
            'default': ['en-US']
        }
      }).then((t) => {
          handlerInput.t = (...args) => t(...args);
      });
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addRequestHandlers(...Skill.handlers)
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();