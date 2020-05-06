module.exports = {
    "en-US": {
        "translation": {
            "LAUNCH": 'Hello. Which park, parade, or nightime show would you like the hours for? ',
            "LAUNCH_REPROMPT": 'You can ask me a question like: What time does Magic Kingdom open? ',
            "HELP": 'You can ask me a question like: What time does Magic Kingdom open? ',
            "CANCEL": 'Goodbye. ',
            "SENTENCE_END" : '. ',
            "GET_PARK_HOURS": '{{parkHours.park}} is open from {{parkHours.open}} to {{parkHours.close}} on {{parkHours.date}}',
            "GET_PARK_OPEN": '{{parkHours.park}} opens at {{parkHours.open}} on {{parkHours.date}}',
            "GET_PARK_CLOSE": "{{parkHours.park}} closes at {{parkHours.close}} on {{parkHours.date}}",
            "EXTRA_MAGIC_HOURS": ' with extra magic hours from {{parkHours.extraMagicHours.start}} to {{parkHours.extraMagicHours.end}}',
            "CLOSED": '{{parkHours.park}} is closed on {{parkHours.date}}',
            "NO_SCHEDULE": "No hours found for {{parkHours.park}} on {{parkHours.date}} yet",
            "NO_TIMES": "{{eventTimes.name}} is not scheduled on {{eventTimes.date}}",
            "EVENT_START" : "{{eventTime.name}} is at {{eventTime.start}}",
            "EVENT_START_LOOP": ", {{eventTime.start}}",
            "EVENT_START_ENDLOOP": ", and {{eventTime.start}}",
            "EVENT_START_AND_END" : "{{eventTime.name}} is from {{eventTime.start}} to {{eventTime.end}}",
            "EVENT_START_AND_END_LOOP" : ", {{eventTime.start}} to {{eventTime.end}}",
            "EVENT_START_AND_END_ENDLOOP" : ", and {{eventTime.start}} to {{eventTime.end}}",
            "EVENT_ON_DATE" : " on {{eventTimes.date}}",
            "NO_FIREWORKS" : "There are no Fireworks or Nighttime Spectaculars scheduled on {{parkHours.date}} at {{parkHours.park}}",
            "NO_PARADES" : "There are no parades scheduled on {{parkHours.date}} at {{parkHours.park}}",
            "OPEN_COVID" : ". However, in view of the current situation and in line with direction provided by government officials, Walt Disney World Resort will remain closed until further notice.",
            "CLOSED_COVID" : ". In view of the current situation and in line with direction provided by government officials, Walt Disney World Resort will remain closed until further notice."
        }
    }
}