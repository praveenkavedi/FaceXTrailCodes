// greeting Skill Lambda code Backup //

'use strict';
exports.handler = function(event,context) {
    try {
    var request = event.request;
    if (request.type === "LaunchRequest") {
        let options = {};

        options.speechText = "Welcome to Face X. We are here to care your skin. Please say your name";
        options.repromptText = "you can say for example, myname is praveen. ";
        options.endSession = false;
        context.succeed(buildResponse(options));

    }else if (request.type === "IntentRequest") {
        let options = {};

        if (request.intent.name === "HelloIntent") {

            let name = request.intent.slots.FirstName.value;
            options.speechText = "Hello "+name+". ";
            options.speechText += getWish();
            options.endSession = true;
            context.succeed(buildResponse(options));

        }else {
            throw "Unknown intent"; 
        }

        }else if (request.type === "SessionEndedRequest") {

    }else {
        throw "unknown intent type";
    }
} catch(e) {
    context.fail("Exception:" +e);
}
}
function getWish() {
    var myDate = new Date();
    var hours = myDate.getUTCHours() - 8;
    if (hours < 0) {
            hours = hours + 24;
    }
    if (hours < 12){
        return "Good Morning. ";
    }else if (hours < 18) {
        return "Good Afternoon. ";
    }else {
        return "Good Evening. ";
    }
}
function buildResponse(options) {

        var response = {
            version: "1.0",
            response: {
                outputSpeech: {
                  type: "PlainText",
                  text: options.speechText 
                },
                shouldEndSession: options.endSession
        }
    };
    if(options.repromptText) {
        response.response.reprompt = {
            outputSpeech: {
                type: "PlainText",
                text: options.repromptText
        }
    };
 }
    return response;
}