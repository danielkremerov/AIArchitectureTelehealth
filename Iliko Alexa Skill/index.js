'use strict';

var Alexa = require('alexa-sdk');
var APP_ID = undefined; 
var database = require('./database');
var storage = require("./storage");
var readings = [];
var name = session.user.firstname;

exports.handle = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();

};

var handlers = {
    'LaunchRequest': function () {
     
           this.emit(':askWithCard', welcomeRegisteredUser, welcomeRegisteredUserReprompt,welcomeRegisteredUsercardTitle,welcomeRegisteredUsercardContent);
        
    },
    'Unhandled': function() {
        this.emit(':ask', 'There was an error, please repeat what you want to do.');
    },
    'TestIntent': function() {
        var color = "testtesttest"
        var response = '';

        storage.save(color, this.event.session, (color) => {
            response = 'Ok ' + color + ' is your favorite color. I got it.';
            this.emit(':ask', response);
        });
    },
    'ReadingIntent': function () {

        /* Delegate to Interactionmodel (utelize Dialog Interface) to handle slot retrieval and
        confirmation  on frontend side and return "completed" intent */
        var intent = delegateSlotCollection.call(this);

        // push retrieved slot values to array
        var typeOfVital = intent.slots.typeOfVital.value;
        var vitalValue = intent.slots.vitalValue.value;
        var recording = name +" recorded a vital reading:" + typeOfVital + "of" + vitalValue;
        var response = "I got your " + typeOfVital + " Do you want to record another reading, activity or medication intake?" ;

        storage.save(recording, this.event.session, (response) => {
            this.emit(':ask', recording);
        });
        },
         'ActivityIntent': function () {
        var intent = delegateSlotCollection.call(this);

        var activity = intent.slots.activity.value;
        var recording = name + "recorded the following activity:" + activity;
        var response = 'I recorded the activty, you can record another one, or a reading or a medication intake';

        storage.save(color, this.event.session, (color) => {
            this.emit(':ask', response);
        });
        },
        'MedicationIntent': function () {
        var intent = delegateSlotCollection.call(this);

        var medicine = intent.slots.medicine.value;
        var dosis = intent.slots.dosis.value;
        var recording =  name +"recorded the following medication intake:" + medicine + " with a dosis of " + dosis;
        var response = "I recorded your intake of " + medicine  + " you can record another one, or a reading or an activity";

        storage.save(recording, this.event.session, (recording) => {
            this.emit(':ask', response);
        });
        },
    
    'AMAZON.HelpIntent': function () {
        var speechOutput = "For example say that you watched a family video or record your pulse";
        var reprompt = "";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        var speechOutput = "";
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        var speechOutput = "";
        this.emit(':tell', speechOutput);
    },
    'EndSessionIntent': function () {
        var endsessionResponse = "";
        this.emit(':tell', response);  
    },
};



/***************  Functions  ******************************/

// function handle delegate Model (only works on actual device and echosim)
function delegateSlotCollection(){
    console.log("in delegateSlotCollection");
    console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
        console.log("in Beginning");
        var updatedIntent=this.event.request.intent;
        this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
        console.log("in not completed");
        // return a Dialog.Delegate directive with no updatedIntent property.
        this.emit(":delegate");
    } else {
        console.log("in completed");
        console.log("returning: "+ JSON.stringify(this.event.request.intent));
        // Dialog is now complete and all required slots should be filled,
        // so call your normal intent handler.
        return this.event.request.intent;
    }
}

/***************  Prompts  ******************************/

var welcomeNewUser = "To start using Iliko, please use the companion app to authenticate on Amazon";
var welcomeRegisteredUser = "Hello Margaret, what would you like to do?";
var welcomeRegisteredUserReprompt = "To start tell me your first vital reading, an activity you did today or a medication intake";
var welcomeRegisteredUsercardTitle = "Things you can do";
var welcomeRegisteredUsercardContent = "Record a Medication intake\nRecord my pulse\nRecord that I did the household";