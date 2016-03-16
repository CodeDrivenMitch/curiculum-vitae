var inputHolderElement, cursorElement;

var welcomeLines = [
    {
        time: 0,
        text: '   __  ___         __         __   ____  ____<br/>  \/  |\/  \/__  ____\/ \/__ _____\/ \/__\/ __ \\\/ __\/<br/> \/ \/|_\/ \/ _ \\\/ __\/ \/ _ `\/ __\/  \'_\/ \/_\/ \/\\ \\  <br/>\/_\/  \/_\/\\___\/_\/ \/_\/\\_,_\/\\__\/_\/\\_\\\\____\/___\/  ',
        steps: 10
    },
    {
        time: 1500,
        text: 'Hi there. Welcome to MorlackOS!'
    },
    {
        time: 2000,
        text: 'This OS is named after it\'s creator, Mitchell Herrijgers. Also known as Morlack on the World-Wide-Web.',
        steps: 5
    },
    {
        time: 2500,
        text: 'Copyright 2016 by Insidion Productions',
        steps: 5
    },
    {
        time: 2500,
        text: 'Booting.............................................................................................',
        steps: 1
    },
    {
        time: 4000,
        text: 'System booted and User-Interface initialized. Ready for your keyboard queries.<br/>',
        steps: 2,
        focus: true
    },
    {
        time: 5000,
        text: 'It seems this is your first time using this OS! May I recommend you the following commands? <br/> - help <br/> - about <br/> - whoami'
    }
];

var executeCommand = function(command) {
   pushTerminalLine('\r\n> ' + command);
};


var pushTerminalLine = function(line, steps) {
    var content = Session.get('content');

    content.push({
        text: line,
        actual_text: '',
        steps: steps === null || steps === undefined ? 2 : steps
    });
    Session.set('content', content);
};

Meteor.startup(function() {
    // Session vars
    Session.set('content', []);
    Session.set('input', '');
    Session.set('inputting', false);

    // Jquery elements
    cursorElement = $('#cursor');
    inputHolderElement = $('#inputHolder');


    // Initialize
    cursorElement.flicker();
    setInterval(function() {
        Session.set('input', $('#inputHolder').val());
    }, 50);

    // Welcome the user
    welcomeLines.forEach(function(val) {
        setTimeout(function() {
            pushTerminalLine(val.text, val.steps);
            if(val.focus) {
                inputHolderElement.focus();
            }
        }, val.time);
    });

    setInterval(function() {
        var content = Session.get('content');
        for(var i = 0; i< content.length; i++) {
            if(content[i].text.length > 0) {
                var steps = content[i].steps;
                content[i].actual_text = content[i].actual_text + content[i].text.substring(0, steps).replace(/\s/g, '&nbsp;');
                content[i].text = content[i].text.substring(steps);

            }
        }
        Session.set('content', content);
    }, 10)
});

Template.terminal.events({
    "submit #inputForm": function(e) {
        e.preventDefault();
        executeCommand(Session.get('input'));
        $('#inputHolder').val('')
    },
    "keydown #inputHolder": function(e) {
        if(e.key === 'Enter') {
            executeCommand(inputHolderElement.val());
            inputHolderElement.val('');
        }
    },
    "focus #inputHolder": function() {
        Session.set('typing', true);
    }
});

Template.terminal.helpers({
    terminal_text: function () {
        return Session.get('content');
    },
    holdingInput: function() {
        return Session.get('input');
    },
    inputting: function() {
        return Session.get('typing');
    }
});