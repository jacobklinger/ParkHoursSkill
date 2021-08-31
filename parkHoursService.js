const apiService = require("./apiService");

const parkHoursService = {};

var parkNames = {
    "magicKingdom": "Magic Kingdom",
    "epcot": "Epcot",
    "hollywoodStudios": "Disney's Hollywood Studios",
    "animalKingdom": "Disney's Animal Kingdom Theme Park",
    "disneyland" : "Disneyland Park",
    "disneyCaliforniaAdventure" : "Disney California Adventure Park"
};

parkHoursService.getParkHours = async function (date, park) {

    var parkHours = {};
    parkHours.date = date;

    if (park == null) {
        throw new Error("Value of park is null or undefined.");
    }

    parkHours.park = parkNames[park];

    if (parkHours.park == null) {
        throw new InvalidParkException("Failed to recognize park.");
    }

    var data = await apiService.get(date);
    if (data == null) {
        throw new Error("Failed to get data from the API.")
    }

    parkData = data.parks[park];

    if (parkData != null) {
        if (parkData.hours.start != null) {
            parkHours.open = parkData.hours.start;
        }
        if (parkData.hours.end != null) {
            parkHours.close = parkData.hours.end;
        }
        if (parkData.parkHopperHours != null) {
            parkHours.parkHopperHours = parkData.parkHopperHours;
        }
        if (parkData.parades != null) {
            parkHours.parades = parkData.parades;
        }
        if (parkData.fireworks != null) {
            parkHours.fireworks = parkData.fireworks;
        }
    }
    else { 
        parkHours.noSchedule = true;
    }

    return parkHours;
}

parkHoursService.getEventTimes = async function (date, event) {
    if (event == null) {
        throw new Error("Value of event is null or undefined.");
    }

    var data = await dynamoService.getByDate(date);
    if (data == null) {
        throw new Error("Failed to get data fromy Dynamo.")
    }

    for (property in data) {
        let value = data[property];
        if (value.parades != null && value.parades.length > 0) {
            for (let i = 0; i < value.parades.length; i++) {
                let parade = value.parades[i];
                if (parade != null && parade.name.toLowerCase() === event.toLowerCase()) {
                    return parade;
                }
            }
        }
        if (value.fireworks != null && value.fireworks.length > 0) {
            for (let i = 0; i < value.fireworks.length; i++) {
                let fireworks = value.fireworks[i];
                if (fireworks != null && fireworks.name.toLowerCase() === event.toLowerCase()) {
                    return fireworks;
                }
            }
        }
        if (value.events != null && value.events.length > 0) {
            for (let i = 0; i < value.events.length; i++) {
                let events = value.events[i];
                if (events != null && events.name === event) {
                    return events;
                }
            }
        }
    }

    return {};
}

parkHoursService.getCurrentDateStringEastern = function() {
    date = new Date();
    date = date.toLocaleString('sv', { timeZone: 'America/New_York' }).substring(0, 10);
    return date;
}

function InvalidParkException(message) {
    this.message = message;
    this.name = 'InvalidParkException';
}

module.exports = parkHoursService;