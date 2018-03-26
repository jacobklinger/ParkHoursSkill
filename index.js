const Alexa = require('alexa-sdk');
const request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const APP_ID = 'amzn1.ask.skill.2bebffd2-ee89-44fe-aa51-56183cebbe0a';  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'getParkHours': function () {
        console.log("getParkHours handler");

        var date = this.event.request.intent.slots.date.value;
        console.log("date: " + date);

        if (date === undefined) {
            date = new Date().toISOString().substring(0, 10);
        } 

        if (this.event.request.intent.slots.park.value === undefined) {
            this.response.speak('I\'m sorry, I didn\'t understand that question.');
            this.emit(':responseReady');
        }

        var park = this.event.request.intent.slots.park.value.toString();
        console.log("park: " + park);

        var parkCode = parseParkCode(this.event.request.intent.slots.park.value.toString());
        console.log("parkCode: " + parkCode);

        if (parkCode < 0) {
            console.error('failed to recognize park name: ' + park);
            this.response.speak('I\'m sorry, I didn\'t recognize that park.');
            this.emit(':responseReady');
        }

        getHours(this, parkCode, date, function(date, parkHours, alexa_this) {
            response = '';

            if (parkHours.hours != null) {
                response += parkHours.park  + ' is open from ' + parkHours.hours.open + ' to ' + parkHours.hours.close;
                if (parkHours.extraMagicHours != null) {
                    response += ' with extra magic hours from ' + parkHours.extraMagicHours.open + ' to ' + parkHours.extraMagicHours.close;
                }
                response += ' on ' + date;
            } else {
                response += parkHours.park + ' is closed on ' + date;
            }

            alexa_this.response.speak(response);
            alexa_this.emit(':responseReady');
        })
    },
    'getParkOpen': function () {
        console.log("getParkOpen handler");

        var date = this.event.request.intent.slots.date.value;

       if (date === undefined) {
            date = new Date().toISOString().substring(0, 10);
        }

        console.log("date: " + date);

        if (this.event.request.intent.slots.park.value === undefined) {
            this.response.speak('I\'m sorry, I didn\'t understand that question.');
            this.emit(':responseReady');
        }

        var park = this.event.request.intent.slots.park.value.toString();
        console.log("park: " + park);

        var parkCode = parseParkCode(this.event.request.intent.slots.park.value.toString());
        console.log("parkCode: " + parkCode);

        if (parkCode < 0) {
            console.error('failed to recognize park name: ' + park);
            this.response.speak('I\'m sorry, I didn\'t recognize that park.');
            this.emit(':responseReady');
        }

        getHours(this, parkCode, date, function(date, parkHours, alexa_this) {
            response = '';

            if (parkHours.hours != null) {
                response += parkHours.park  + ' opens at ' + parkHours.hours.open;
                if (parkHours.extraMagicHours != null && parkHours.extraMagicHours.type === 'am') {
                    response += ' with extra magic hours from ' + parkHours.extraMagicHours.open + ' to ' + parkHours.extraMagicHours.close;
                }
                response += ' on ' + date;
            } else {
                response += parkHours.park + ' is closed on ' + date;
            }

            alexa_this.response.speak(response);
            alexa_this.emit(':responseReady');
        })
    },
    'getParkClose': function () {
        console.log("getParkOpen handler");

        var date = this.event.request.intent.slots.date.value;

       if (date === undefined) {
            date = new Date().toISOString().substring(0, 10);
        }

        console.log("date: " + date);

        if (this.event.request.intent.slots.park.value === undefined) {
            this.response.speak('I\'m sorry, I didn\'t understand that question.');
            this.emit(':responseReady');
        }

        var park = this.event.request.intent.slots.park.value.toString();
        console.log("park: " + park);

        var parkCode = parseParkCode(this.event.request.intent.slots.park.value.toString());
        console.log("parkCode: " + parkCode);

        if (parkCode < 0) {
            console.error('failed to recognize park name: ' + park);
            this.response.speak('I\'m sorry, I didn\'t recognize that park.');
            this.emit(':responseReady');
        }

        getHours(this, parkCode, date, function(date, parkHours, alexa_this) {
            response = '';

            if (parkHours.hours != null) {
                response += parkHours.park  + ' closes at ' + parkHours.hours.close;
            if (parkHours.extraMagicHours != null && parkHours.extraMagicHours.type === 'pm') {
                    response += ' with extra magic hours from ' + parkHours.extraMagicHours.open + ' to ' + parkHours.extraMagicHours.close;
                }
                response += ' on ' + date;
            } else {
                response += parkHours.park + ' is closed on ' + date;
            }

            alexa_this.response.speak(response);
            alexa_this.emit(':responseReady');
        })
    },
    'getParades' : function () {
        console.log("getParades handler");

        var date = this.event.request.intent.slots.date.value;

       if (date === undefined) {
            date = new Date().toISOString().substring(0, 10);
        }

        console.log("date: " + date);

        if (this.event.request.intent.slots.park.value === undefined) {
            this.response.speak('I\'m sorry, I didn\'t understand that question.');
            this.emit(':responseReady');
        }

        var park = this.event.request.intent.slots.park.value.toString();
        console.log("park: " + park);

        var parkCode = parseParkCode(this.event.request.intent.slots.park.value.toString());
        console.log("parkCode: " + parkCode);

        if (parkCode < 0) {
            console.error('failed to recognize park name: ' + park);
            this.response.speak('I\'m sorry, I didn\'t recognize that park.');
            this.emit(':responseReady');
        }

        getParkParades(this, parkCode, date, function(date, parkHours, alexa_this) {
            response = '';
            var parades = parkHours.parades;

            if (parades != null && parades.length > 0) {
                response += 'On ' + date + ', ';
                console.log("PARADES: " + parades);
                parades.forEach(function(parade, i, paradeList) {
                    console.log("PARADE: " + parade);
                    response += parade.name + " is "
                    parade.times.forEach(function(paradeTime, j, paradeTimesList) {
                        if (paradeTime.end != null || paradeTime.end != undefined) {
                            response += "from " + paradeTime.start + " to " + paradeTime.end;
                        } else if (j === 0) {
                            response += "at " + paradeTime.start;
                        } else if (j === paradeTimesList.length - 1){
                            response += "and " + paradeTime.start
                        } else {
                            response += "" + paradeTime.start;
                        }
                        if (j === paradeTimesList.length - 1) {
                            response += ". "
                        } else {
                            response += ", "
                        }
                        console.log(response);
                    });
                });
            } else if (parades === undefined || parades === null || parades.length === 0) {
                response += 'There are no parades at ' + parkHours.park + ' on ' + date;
            }

            alexa_this.response.speak(response);
            alexa_this.emit(':responseReady');
        })
    },
    'getFireworks' : function () {
        console.log("getFireworks handler");

        var date = this.event.request.intent.slots.date.value;

       if (date === undefined) {
            date = new Date().toISOString().substring(0, 10);
        }

        console.log("date: " + date);

        if (this.event.request.intent.slots.park.value === undefined) {
            this.response.speak('I\'m sorry, I didn\'t understand that question.');
            this.emit(':responseReady');
        }

        var park = this.event.request.intent.slots.park.value.toString();
        console.log("park: " + park);

        var parkCode = parseParkCode(this.event.request.intent.slots.park.value.toString());
        console.log("parkCode: " + parkCode);

        if (parkCode < 0) {
            console.error('failed to recognize park name: ' + park);
            this.response.speak('I\'m sorry, I didn\'t recognize that park.');
            this.emit(':responseReady');
        }

        getParkFireworks(this, parkCode, date, function(date, parkHours, alexa_this) {
            response = '';
            var fireworks = parkHours.fireworks;

            if (fireworks != null || fireworks.length > 0) {
                response += 'On ' + date + ', ';
                console.log("PARADES: " + fireworks);
                fireworks.forEach(function(firework, i, fireworksList) {
                    console.log("PARADE: " + firework);
                    response += firework.name + " is "
                    firework.times.forEach(function(fireworkTime, j, fireworkTimesList) {
                        if (fireworkTime.end != null || fireworkTime.end != undefined) {
                            response += "from " + fireworkTime.start + " to " + fireworkTime.end;
                        } else if (j === 0) {
                            response += "at " + fireworkTime.start;
                        } else if (j === fireworkTimesList.length - 1){
                            response += "and " + fireworkTime.start
                        } else {
                            response += "" + fireworkTime.start;
                        }
                        if (j === fireworkTimesList.length - 1) {
                            response += ". "
                        } else {
                            response += ", "
                        }
                        console.log(response);
                    });
                });
            } else if (parades === undefined || parades === null || parades.length === 0) {
                response += 'There are no parades at ' + parkHours.park + ' on ' + date;
            }

            alexa_this.response.speak(response);
            alexa_this.emit(':responseReady');
        })
    },
    'getEventTime' : function () {
        console.log("getEventTime handler");

        var date = this.event.request.intent.slots.date.value;

       if (date === undefined || date.indexOf('-') < 0) {
            date = new Date().toISOString().substring(0, 10);
        }

        console.log("date: " + date);

        if (this.event.request.intent.slots.event.resolutions.resolutionsPerAuthority[0].values[0].value.id === undefined) {
            this.response.speak('I\'m sorry, I didn\'t understand that question.');
            this.emit(':responseReady');
        } else {
            var eventId = this.event.request.intent.slots.event.resolutions.resolutionsPerAuthority[0].values[0].value.id;
            console.log("eventId: " + eventId);
        }

        getEvent(this, eventId, date, function(date, events, alexa_this) {
            response = '';

            if (events != null) {
                response += 'On ' + date + ', ';
                console.log("events: " + events);
                events.forEach(function(event, i, eventsList) {
                    console.log("event: " + event);
                    response += event.name + " is "
                    event.times.forEach(function(eventTime, j, eventTimeList) {
                        if (eventTime.end != null || eventTime.end != undefined) {
                            response += "from " + eventTime.start + " to " + eventTime.end;
                        } else if (j === 0) {
                            response += "at " + eventTime.start;
                        } else if (j === eventTimeList.length - 1){
                            response += "and " + eventTime.start
                        } else {
                            response += "" + eventTime.start;
                        }
                        if (j === eventTimeList.length - 1) {
                            response += '. ';
                        } else {
                            response += ", "
                        }
                        console.log(response);
                    });
                });
            } else {
                var event = alexa_this.event.request.intent.slots.event.value;
                respone += '' + event + ' is not scheduled for ' + date;
            }

            alexa_this.response.speak(response);
            alexa_this.emit(':responseReady');
        })
    },
    'LaunchRequest': function () {
        var response = 'Hello. Which park, parade, or nightime show would you like the hours for?';
        var reprompt = 'You can ask me a question like: What time does Magic Kingdom open?';
        this.response.speak(response).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        var response = 'You can ask me a question like: What time does Magic Kingdom open?';
        this.response.speak(response).listen(response);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        var response = '';
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        var response = '';
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak('I\'m sorry, I didn\'t understand that question.');
        this.emit(':responseReady');
    }
};

exports.handler = function (event, context, callback) {
    console.log("handler");
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

function parseParkCode(park) {
    console.log("parseParkCode");

    park = '' + park.toLowerCase();

    if (park.indexOf('magic kingdom') > -1) {
        return 0;
    }
    else if (park.indexOf('epcot') > -1) {
        return 1;
    }
    else if (park.indexOf('hollywood studios') > -1) {
        return 2;
    }
    else if (park.indexOf('animal kingdom') > -1) {
        return 3;
    }
    else if (park.indexOf('springs') > -1) {
        return 4;
    }
    else if (park.indexOf('typhoon lagoon') > -1) {
        return 5;
    }
    else if (park.indexOf('blizzard beach') > -1) {
        return 6;
    }
    else if (park.indexOf('sports') > -1 || park.indexOf('espn') > -1) {
        return 7;
    }
    return -1;
}

function getHours(alexa_this, parkCode, date, callback) {
    console.log("getHours");

    var splitDates = date.split('-');

    var month = splitDates[1];
    var day = splitDates[2];

    var parkHours = {};
    parkHours.hours = {};
    parkHours.extraMagicHours = {};

    var parks = ['magic-kingdom', 'epcot', 'hollywood-studios', 'animal-kingdom', 
                    'disney-springs', 'typhoon-lagoon', 'blizzard-beach', 'wide-world-of-sports'];
    var park = parks[parkCode];

    var parkNames = ['Magic Kingdom Park', 'Epcot', 'Disney\'s Hollywood Studios', 'Disney\'s Animal Kingdom Theme Park',
     'Disney Springs', 'Disney\'s Typhoon Lagoon Water Park', 'Disney\'s Blizzard Beach Water Park', 'ESPN Wide World of Sports Complex']

     parkHours.park = parkNames[parkCode];

    const options = {
      url: 'https://disneyworld.disney.go.com/calendars/five-day/' + date,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                 'Accept' : '*/*',
                 'X-Requested-With':'XMLHttpRequest',
                 'Referer':'https://disneyworld.disney.go.com/calendars/day/2018-03-12/'
                }
    };

    request(options, function cb(error, response, html) {
        const dom = new JSDOM(html);
        var selector = "td[headers~='" + getDate(month, day) + " " + park + "']";
        console.log(selector);
        var parkBlock = dom.window.document.querySelector(selector);
        console.log('parkBlock: ' + parkBlock);
        
        // Park hours
        var parkHoursString = parkBlock.querySelector("div.parkHours");
        console.log("parkBlock.querySelector(\"div.parkHours\"): " + parkHoursString)
        var parkHoursString = parkHoursString.querySelector("p:nth-child(2)").textContent;
        console.log("parkHoursString: " + parkHoursString)
        var splitHours = parkHoursString.split(' to ');
        
        parkHours.hours.open = splitHours[0];
        parkHours.hours.close = splitHours[1];

        if (splitHours[1] === undefined) {
            parkHours.hours = null;
        } else {
            parkHours.hours.open = splitHours[0];
            parkHours.hours.close = splitHours[1];
        }

        // Extra magic hours
        var extraMagicHoursString = parkBlock.querySelector("div.magicHours").querySelector("p:nth-child(2)").textContent;
        splitHours = extraMagicHoursString.split(' to ');

        if (splitHours[1] === undefined) {
            parkHours.extraMagicHours = null;
        } else {
            parkHours.extraMagicHours.open = splitHours[0];
            parkHours.extraMagicHours.close = splitHours[1];

            if (parkHours.extraMagicHours.close === parkHours.hours.open) {
                parkHours.extraMagicHours.type = 'am';
            } else {
                parkHours.extraMagicHours.type = 'pm';
            }
        }

        callback(date, parkHours, alexa_this);
    });
}

function getParkParades(alexa_this, parkCode, date, callback) {
    console.log("getParades");

    var splitDates = date.split('-');

    var month = splitDates[1];
    var day = splitDates[2];

    var parkHours = {};
    parkHours.hours = {};
    parkHours.extraMagicHours = {};

    var parks = ['magic-kingdom', 'epcot', 'hollywood-studios', 'animal-kingdom', 
                    'disney-springs', 'typhoon-lagoon', 'blizzard-beach', 'wide-world-of-sports'];
    var park = parks[parkCode];

    var parkNames = ['Magic Kingdom Park', 'Epcot', 'Disney\'s Hollywood Studios', 'Disney\'s Animal Kingdom Theme Park',
     'Disney Springs', 'Disney\'s Typhoon Lagoon Water Park', 'Disney\'s Blizzard Beach Water Park', 'ESPN Wide World of Sports Complex']

     parkHours.park = parkNames[parkCode];

    const options = {
      url: 'https://disneyworld.disney.go.com/calendars/five-day/' + date,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                 'Accept' : '*/*',
                 'X-Requested-With':'XMLHttpRequest',
                 'Referer':'https://disneyworld.disney.go.com/calendars/day/2018-03-12/'
                }
    };

    request(options, function cb(error, response, html) {
        const dom = new JSDOM(html);
        var selector = "td[headers~='" + getDate(month, day) + " " + park + "']";
        console.log(selector);
        var parkBlock = dom.window.document.querySelector(selector);
        console.log('parkBlock: ' + parkBlock);
        
        // Parades
        var paradeNames = parkBlock.querySelectorAll("div.parades a");
        var paradeTimes = parkBlock.querySelectorAll("div.parades p");

        parkHours.parades = [];

        paradeNames.forEach(function(currentA, i, listA) {
            var parade = {};
            parade.name = currentA.innerHTML
                    .replace(/&amp;/g, "and")
                    .replace(/®/g, "");
            
            var timesString = paradeTimes[i].innerHTML.replace(/&nbsp;/g, "")
            var splitTimes = timesString.split(', ');
            var times = [];

            splitTimes.forEach(function(currentB, j, listB) {
                var splitCurrent = currentB.split(' to ');
                var time = {};
                time.start = splitCurrent[0];
                if (splitCurrent.length > 1) {
                    time.end = splitCurrent[1];
                }
                times.push(time);
            });

            parkHours.parades.push(parade);
            parade.times = times;
            
        });
        callback(date, parkHours, alexa_this);
    });
}

function getParkFireworks(alexa_this, parkCode, date, callback) {
    console.log("getParkFireworks");

    var splitDates = date.split('-');

    var month = splitDates[1];
    var day = splitDates[2];

    var parkHours = {};
    parkHours.hours = {};
    parkHours.extraMagicHours = {};

    var parks = ['magic-kingdom', 'epcot', 'hollywood-studios', 'animal-kingdom', 
                    'disney-springs', 'typhoon-lagoon', 'blizzard-beach', 'wide-world-of-sports'];
    var park = parks[parkCode];

    var parkNames = ['Magic Kingdom Park', 'Epcot', 'Disney\'s Hollywood Studios', 'Disney\'s Animal Kingdom Theme Park',
     'Disney Springs', 'Disney\'s Typhoon Lagoon Water Park', 'Disney\'s Blizzard Beach Water Park', 'ESPN Wide World of Sports Complex']

     parkHours.park = parkNames[parkCode];

    const options = {
      url: 'https://disneyworld.disney.go.com/calendars/five-day/' + date,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                 'Accept' : '*/*',
                 'X-Requested-With':'XMLHttpRequest',
                 'Referer':'https://disneyworld.disney.go.com/calendars/day/2018-03-12/'
                }
    };

    request(options, function cb(error, response, html) {
        const dom = new JSDOM(html);
        var selector = "td[headers~='" + getDate(month, day) + " " + park + "']";
        console.log(selector);
        var parkBlock = dom.window.document.querySelector(selector);
        console.log('parkBlock: ' + parkBlock);
        
        var fireworksNames = parkBlock.querySelectorAll("div.nighttime-spectacular-firework a");
        var fireworksTimes = parkBlock.querySelectorAll("div.nighttime-spectacular-firework p");

        parkHours.fireworks = [];

        fireworksNames.forEach(function(currentValue, currentIndex, listObj) {
            var firework = {};
            firework.name = currentValue.innerHTML
                    .replace(/&amp;/g, "and")
                    .replace(/®/g, "");

            if (firework.name.toLowerCase().indexOf('electrical water') > -1) {
                firework.name = 'Electrical Water Pageant';
            }
            
            var timesString = fireworksTimes[currentIndex].innerHTML.replace(/&nbsp;/g, "")
            var splitTimes = timesString.split(', ');
            var times = [];

            splitTimes.forEach(function(currentB, j, listB) {
                var splitCurrent = currentB.split(' to ');
                var time = {};
                time.start = splitCurrent[0];
                if (splitCurrent.length > 1) {
                    time.end = splitCurrent[1];
                }
                times.push(time);
            });

            parkHours.fireworks.push(firework);
            firework.times = times;
        });
        callback(date, parkHours, alexa_this);
    });
}

function getEvent(alexa_this, eventId, date, callback) {
    console.log("getEvents");

    var splitDates = date.split('-');

    var month = splitDates[1];
    var day = splitDates[2];

    var parkHours = {};
    parkHours.events = [];

    const options = {
      url: 'https://disneyworld.disney.go.com/calendars/five-day/' + date,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                 'Accept' : '*/*',
                 'X-Requested-With':'XMLHttpRequest',
                 'Referer':'https://disneyworld.disney.go.com/calendars/day/2018-03-12/'
                }
    };

    request(options, function cb(error, response, html) {

        const dom = new JSDOM(html);
        var parkBlocks = dom.window.document.querySelectorAll("td[headers~='" + getDate(month, day) + "']");
        console.log(parkBlocks.length);

        parkBlocks.forEach(function(parkBlock, k, listC) {
            console.log("parkBlock: " + parkBlock.innerHTML);
            console.log("a[href='" + eventId + "']");
            var eventNames = parkBlock.querySelectorAll("a[href='" + eventId + "']");
            var eventTimes = parkBlock.querySelectorAll("a[href='" + eventId + "'] + p");

            

            console.log("eventNames: " + eventNames.length);

            eventNames.forEach(function(currentA, i, listA) {
                console.log("currentA: " + currentA.innerHTML);
                var event = {};
                event.name = currentA.innerHTML
                        .replace(/&amp;/g, "and")
                        .replace(/®/g, "");
                
                var timesString = eventTimes[i].innerHTML.replace(/&nbsp;/g, "")
                var splitTimes = timesString.split(', ');
                var times = [];

                splitTimes.forEach(function(currentB, j, listB) {
                    var splitCurrent = currentB.split(' to ');
                    var time = {};
                    time.start = splitCurrent[0];
                    if (splitCurrent.length > 1) {
                        time.end = splitCurrent[1];
                    }
                    times.push(time);
                });
                event.times = times;
                parkHours.events.push(event);
                console.log(event);
                console.log(parkHours);
                console.log(parkHours.events);
            })
            console.log(parkHours);
        });
        
        console.log(parkHours.events);
        callback(date, parkHours.events, alexa_this);
    });
}

function master(alexa_this, parkCode, date, callback) {
    console.log("master");

    var splitDates = date.split('-');

    var month = splitDates[1];
    var day = splitDates[2];

    var parkHours = {};
    parkHours.hours = {};
    parkHours.extraMagicHours = {};

    var parks = ['magic-kingdom', 'epcot', 'hollywood-studios', 'animal-kingdom', 
                    'disney-springs', 'typhoon-lagoon', 'blizzard-beach', 'wide-world-of-sports'];
    var park = parks[parkCode];

    var parkNames = ['Magic Kingdom Park', 'Epcot', 'Disney\'s Hollywood Studios', 'Disney\'s Animal Kingdom Theme Park',
     'Disney Springs', 'Disney\'s Typhoon Lagoon Water Park', 'Disney\'s Blizzard Beach Water Park', 'ESPN Wide World of Sports Complex']

     parkHours.park = parkNames[parkCode];

    const options = {
      url: 'https://disneyworld.disney.go.com/calendars/five-day/' + date,
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                 'Accept' : '*/*',
                 'X-Requested-With':'XMLHttpRequest',
                 'Referer':'https://disneyworld.disney.go.com/calendars/day/2018-03-12/'
                }
    };

    request(options, function cb(error, response, html) {
        const dom = new JSDOM(html);
        var parkBlock = dom.window.document.querySelector("td[headers='" + getDate(month, day) + " " + park + "']");
        
        // Park hours
        var parkHoursString = parkBlock.querySelector("div.parkHours").querySelector("p:nth-child(2)").textContent;
        var splitHours = parkHoursString.split(' to ');
        
        parkHours.hours.open = splitHours[0];
        parkHours.hours.close = splitHours[1];

        if (splitHours[1] === undefined) {
            parkHours.hours = null;
        } else {
            parkHours.hours.open = splitHours[0];
            parkHours.hours.close = splitHours[1];
        }

        // Extra magic hours
        var extraMagicHoursString = parkBlock.querySelector("div.magicHours").querySelector("p:nth-child(2)").textContent;
        splitHours = extraMagicHoursString.split(' to ');

        if (splitHours[1] === undefined) {
            parkHours.extraMagicHours = null;
        } else {
            parkHours.extraMagicHours.open = splitHours[0];
            parkHours.extraMagicHours.close = splitHours[1];
        }

        // Parades
        var paradeNames = parkBlock.querySelectorAll("div.parades a");
        var paradeTimes = parkBlock.querySelectorAll("div.parades p");

        parkHours.parades = [];

        paradeNames.forEach(function(currentA, i, listA) {
            var parade = {};
            parade.name = currentA.innerHTML
                    .replace(/&amp;/g, "and")
                    .replace(/®/g, "");
            
            var timesString = paradeTimes[i].innerHTML.replace(/&nbsp;/g, "")
            var splitTimes = timesString.split(', ');
            var times = [];

            splitTimes.forEach(function(currentB, j, listB) {
                var splitCurrent = currentB.split(' to ');
                var time = {};
                time.start = splitCurrent[0];
                if (splitCurrent.length > 1) {
                    time.end = splitCurrent[1];
                }
                times.push(time);
            });

            parkHours.parades.push(parade);
            parade.times = times;
        })
        
        // Fireworks
        var fireworksNames = parkBlock.querySelectorAll("div.nighttime-spectacular-firework a");
        var fireworksTimes = parkBlock.querySelectorAll("div.nighttime-spectacular-firework p");

        parkHours.fireworks = [];

        fireworksNames.forEach(function(currentValue, currentIndex, listObj) {
            var firework = {};
            firework.name = currentValue.innerHTML
                    .replace(/&amp;/g, "and")
                    .replace(/®/g, "");
            
            var timesString = fireworksTimes[currentIndex].innerHTML.replace(/&nbsp;/g, "")
            var splitTimes = timesString.split(', ');
            var times = [];

            splitTimes.forEach(function(currentB, j, listB) {
                var splitCurrent = currentB.split(' to ');
                var time = {};
                time.start = splitCurrent[0];
                if (splitCurrent.length > 1) {
                    time.end = splitCurrent[1];
                }
                times.push(time);
            });

            parkHours.fireworks.push(firework);
            firework.times = times;
        })

        // Events
        var eventNames = parkBlock.querySelectorAll("div.event a");
        var eventTimes = parkBlock.querySelectorAll("div.event p");

        parkHours.events = [];

        eventNames.forEach(function(currentValue, currentIndex, listObj) {
            var event = {};
            event.name = currentValue.innerHTML
                    .replace(/&amp;/g, "and")
                    .replace(/®/g, "");
            
            var timesString = eventTimes[currentIndex].innerHTML
                    .replace(/&nbsp;/g, "")
            var times = timesString.split(' to ');
            parkHours.events.push(event);
            event.times = {};
            event.times.open = times[0];
            event.times.close = times[1];
        });

        callback(date, parkHours, alexa_this);
    });
}

function getDate(month, day) {
    console.log("getDate");
    switch (month) {
        case '01':
            m = 'january';
            break;
        case '02':
            m = 'february';
            break;
        case '03':
            m = 'march';
            break;
        case '04':
            m = 'april';
            break;
        case '05':
            m = 'may';
            break;
        case '06':
            m = 'june';
            break;
        case '07':
            m = 'july';
            break;
        case '08':
            m = 'august';
            break;
        case '09':
            m = 'september';
            break;
        case '10':
            m = 'october';
            break;
        case '11':
            m = 'november';
            break;
        case '12':
            m = 'december';
            break;
    }
    return m + day;
}