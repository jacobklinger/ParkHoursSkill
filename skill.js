const parkHoursService = require('./parkHoursService');

const Skill = {};
Skill.name = 'ParkHours';
Skill.handlers = [];

const GetParkHoursIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'getParkHours';
    },
    async handle(handlerInput) {
        var speakText;

        var park = handlerInput.requestEnvelope.request.intent.slots.park.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        var date = handlerInput.requestEnvelope.request.intent.slots.date.value;
        if (date == null) {
            date = parkHoursService.getCurrentDateStringEastern();
        }

        try {
            var parkHours = await parkHoursService.getParkHours(date, park);
        }
        catch (error) {
            if (error.name != null && error.name === "InvalidParkException") {
                speakText = handlerInput.t('I\'m sorry, I didn\'t recognize the name of that park');
                return handlerInput.responseBuilder
                    .speak(speakText)
                    .withSimpleCard(Skill.name, speakText)
                    .getResponse();
            }
            else {
                throw error;
            }
        }

        if (parkHours != null) {
            if (parkHours.noSchedule === true) {
                speakText = handlerInput.t('NO_SCHEDULE', { parkHours: parkHours });
            }
            else if (parkHours.open != null) {
                if (parkHours.close != null) {
                    speakText = handlerInput.t('GET_PARK_HOURS', { parkHours: parkHours });
                }
                else {
                    speakText = handlerInput.t('GET_PARK_OPEN', { parkHours: parkHours });
                }
                if (parkHours.extraMagicHours != null && parkHours.extraMagicHours.start != null && parkHours.extraMagicHours.close != null) {
                    speakText += handlerInput.t('EXTRA_MAGIC_HOURS', { parkHours: parkHours });
                }
                speakText += handlerInput.t('OPEN_COVID');
            }
            else {
                speakText = handlerInput.t('CLOSED', { parkHours: parkHours });
                speakText += handlerInput.t('CLOSED_COVID');
            }
        }

        return handlerInput.responseBuilder
            .speak(speakText)
            .withSimpleCard(Skill.name, speakText)
            .getResponse();
    }

};

const GetParkOpenIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'getParkOpen';
    },
    async handle(handlerInput) {
        var speakText;

        var park = handlerInput.requestEnvelope.request.intent.slots.park.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        var date = handlerInput.requestEnvelope.request.intent.slots.date.value;
        if (date == null) {
            date = parkHoursService.getCurrentDateStringEastern();
        }

        try {
            var parkHours = await parkHoursService.getParkHours(date, park);
        }
        catch (error) {
            if (error.name != null && error.name === "InvalidParkException") {
                speakText = handlerInput.t('I\'m sorry, I didn\'t recognize the name of that park');
                return handlerInput.responseBuilder
                    .speak(speakText)
                    .withSimpleCard(Skill.name, speakText)
                    .getResponse();
            }
            else {
                throw error;
            }
        }

        if (parkHours != null) {
            if (parkHours.noSchedule === true) {
                speakText = handlerInput.t('NO_SCHEDULE', { parkHours: parkHours });
            }
            else if (parkHours.open != null) {
                speakText = handlerInput.t('GET_PARK_OPEN', { parkHours: parkHours });
                if (parkHours.extraMagicHours != null && parkHours.extraMagicHours.start != null && parkHours.extraMagicHours.end != null 
                    && typeof parkHours.extraMagicHours.type === "string" && parkHours.extraMagicHours.type.toLowerCase() === 'am') {
                    speakText += handlerInput.t('EXTRA_MAGIC_HOURS', { parkHours: parkHours });
                }
                speakText += handlerInput.t('OPEN_COVID');
            }
            else {
                speakText = handlerInput.t('CLOSED', { parkHours: parkHours });
                speakText += handlerInput.t('CLOSED_COVID');
            }
        }

        return handlerInput.responseBuilder
            .speak(speakText)
            .withSimpleCard(Skill.name, speakText)
            .getResponse();
    }

};

const GetParkCloseIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'getParkClose';
    },
    async handle(handlerInput) {
        var speakText;

        var park = handlerInput.requestEnvelope.request.intent.slots.park.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        var date = handlerInput.requestEnvelope.request.intent.slots.date.value;
        if (date == null) {
            date = parkHoursService.getCurrentDateStringEastern();
        }

        try {
            var parkHours = await parkHoursService.getParkHours(date, park);
        }
        catch (error) {
            if (error.name != null && error.name === "InvalidParkException") {
                speakText = handlerInput.t('I\'m sorry, I didn\'t recognize the name of that park');
                return handlerInput.responseBuilder
                    .speak(speakText)
                    .withSimpleCard(Skill.name, speakText)
                    .getResponse();
            }
            else {
                throw error;
            }
        }

        if (parkHours != null) {
            if (parkHours.noSchedule === true) {
                speakText = handlerInput.t('NO_SCHEDULE', { parkHours: parkHours });
            }
            else if (parkHours.open != null) {
                speakText = handlerInput.t('GET_PARK_CLOSE', { parkHours: parkHours });
                if (parkHours.extraMagicHours != null && parkHours.extraMagicHours.start != null && parkHours.extraMagicHours.end != null 
                    && typeof parkHours.extraMagicHours.type === "string" && parkHours.extraMagicHours.type.toLowerCase() === 'pm') {
                    speakText += handlerInput.t('EXTRA_MAGIC_HOURS', { parkHours: parkHours });
                }
                speakText += handlerInput.t('OPEN_COVID');
            }
            else {
                speakText = handlerInput.t('CLOSED', { parkHours: parkHours });
                speakText += handlerInput.t('CLOSED_COVID');
            }
        }

        return handlerInput.responseBuilder
            .speak(speakText)
            .withSimpleCard(Skill.name, speakText)
            .getResponse();
    }

};

const GetEventTimeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'getEventTime';
    },
    async handle(handlerInput) {
        var speakText = "";

        var event = handlerInput.requestEnvelope.request.intent.slots.event.resolutions.resolutionsPerAuthority[0].values[0].value.name;
        var date = handlerInput.requestEnvelope.request.intent.slots.date.value;
        if (date == null) {
            date = parkHoursService.getCurrentDateStringEastern();
        }

        try {
            var eventTimes = await parkHoursService.getEventTimes(date, event);
            eventTimes.date = date;
        }
        catch (error) {
            throw error;
        }

        if (eventTimes == null || eventTimes.times == null || eventTimes.times.length < 1) {
            eventTimes.name = event;
            speakText = handlerInput.t('NO_TIMES', { eventTimes: eventTimes });
            speakText += handlerInput.t('CLOSED_COVID');
        }
        else {
            speakText = buildSpeechFromEventTime(eventTimes, handlerInput);
            speakText += handlerInput.t('OPEN_COVID');
        }

        return handlerInput.responseBuilder
            .speak(speakText)
            .withSimpleCard(Skill.name, speakText)
            .getResponse();
    }

};

const GetParadesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'getParades';
    },
    async handle(handlerInput) {
        var speakText = "";

        var park = handlerInput.requestEnvelope.request.intent.slots.park.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        var date = handlerInput.requestEnvelope.request.intent.slots.date.value;
        if (date == null) {
            date = parkHoursService.getCurrentDateStringEastern();
        }

        try {
            var parkHours = await parkHoursService.getParkHours(date, park);
        }
        catch (error) {
            if (error.name != null && error.name === "InvalidParkException") {
                speakText = handlerInput.t('I\'m sorry, I didn\'t recognize the name of that park');
                return handlerInput.responseBuilder
                    .speak(speakText)
                    .withSimpleCard(Skill.name, speakText)
                    .getResponse();
            }
            else {
                throw error;
            }
        }

        if (parkHours != null) {
            if (parkHours.noSchedule === true) {
                speakText = handlerInput.t('NO_SCHEDULE', { parkHours: parkHours });
            }
            else if (parkHours.open != null) {
                if (parkHours.parades != null && parkHours.parades.length > 0) {
                    for (let i = 0; i < parkHours.parades.length; i++) {
                        parkHours.parades[i].date = date;
                        speakText += buildSpeechFromEventTime(parkHours.parades[i], handlerInput);
                        speakText += handlerInput.t('SENTENCE_END');
                        speakText += handlerInput.t('OPEN_COVID');
                    }
                }
                else {
                    speakText = handlerInput.t('NO_PARADES', { parkHours: parkHours });
                    speakText += handlerInput.t('CLOSED_COVID');
                }
                
            }
            else {
                speakText = handlerInput.t('CLOSED', { parkHours: parkHours });
                speakText += handlerInput.t('CLOSED_COVID');
            }
        }

        return handlerInput.responseBuilder
            .speak(speakText)
            .withSimpleCard(Skill.name, speakText)
            .getResponse();
    }

};

const GetFireworksIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'getFireworks';
    },
    async handle(handlerInput) {
        var speakText = "";

        var park = handlerInput.requestEnvelope.request.intent.slots.park.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        var date = handlerInput.requestEnvelope.request.intent.slots.date.value;
        if (date == null) {
            date = parkHoursService.getCurrentDateStringEastern();
        }

        try {
            var parkHours = await parkHoursService.getParkHours(date, park);
        }
        catch (error) {
            if (error.name != null && error.name === "InvalidParkException") {
                speakText = handlerInput.t('I\'m sorry, I didn\'t recognize the name of that park');
                return handlerInput.responseBuilder
                    .speak(speakText)
                    .withSimpleCard(Skill.name, speakText)
                    .getResponse();
            }
            else {
                throw error;
            }
        }

        if (parkHours != null) {
            if (parkHours.noSchedule === true) {
                speakText = handlerInput.t('NO_SCHEDULE', { parkHours: parkHours });
            }
            else if (parkHours.open != null) {
                if (parkHours.fireworks != null && parkHours.fireworks.length > 0) {
                    for (let i = 0; i < parkHours.fireworks.length; i++) {
                        parkHours.fireworks[i].date = date;
                        speakText += buildSpeechFromEventTime(parkHours.fireworks[i], handlerInput);
                        speakText += handlerInput.t('SENTENCE_END');
                    }
                    speakText += handlerInput.t('OPEN_COVID');
                }
                else {
                    speakText = handlerInput.t('NO_FIREWORKS', { parkHours: parkHours });
                    speakText += handlerInput.t('CLOSED_COVID');
                }
            }
            else {
                speakText = handlerInput.t('CLOSED', { parkHours: parkHours });
                speakText += handlerInput.t('CLOSED_COVID');
            }
        }

        return handlerInput.responseBuilder
            .speak(speakText)
            .withSimpleCard(Skill.name, speakText)
            .getResponse();
    }

};

Skill.handlers.push(GetParkOpenIntentHandler);
Skill.handlers.push(GetParkHoursIntentHandler);
Skill.handlers.push(GetParkCloseIntentHandler);
Skill.handlers.push(GetEventTimeIntentHandler);
Skill.handlers.push(GetParadesIntentHandler);
Skill.handlers.push(GetFireworksIntentHandler);

module.exports = Skill;

function buildSpeechFromEventTime(eventTimes, handlerInput) {
    var speakText = "";
    if (eventTimes != null && eventTimes.times != null && eventTimes.times.length > 0) {
        var length = eventTimes.times.length;
        var eventTime = eventTimes.times[0];
        eventTime.date = eventTimes.date;
        eventTime.name = eventTimes.name;

        if (eventTime.start == null) {
            throw new Error("Event time did not contain start time.");
        }

        if (eventTime.end == null) {
            speakText += handlerInput.t('EVENT_START', { eventTime: eventTime });
        }
        else {
            speakText += handlerInput.t('EVENT_START_AND_END', { eventTime: eventTime });
        }

        for (let i = 1; i < length; i++) {
            eventTime = eventTimes.times[i];
            if (i === length - 1) {
                if (eventTime.end == null) {
                    speakText += handlerInput.t('EVENT_START_ENDLOOP', { eventTime: eventTime });
                }
                else {
                    speakText += handlerInput.t('EVENT_START_AND_END_ENDLOOP', { eventTime: eventTime });
                }
            }
            else {
                if (eventTime.end == null) {
                    speakText += handlerInput.t('EVENT_START_LOOP', { eventTime: eventTime });
                }
                else {
                    speakText += handlerInput.t('EVENT_START_AND_END_LOOP', { eventTime: eventTime });
                }
            }
        }
        speakText += handlerInput.t('EVENT_ON_DATE', { eventTimes: eventTimes });
    }
    return speakText;
}