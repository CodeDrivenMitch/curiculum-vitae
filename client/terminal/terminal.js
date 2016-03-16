var inputHolderElement, cursorElement;

Meteor.startup(function () {
    // Session vars
    Session.set('content', []);
    Session.set('input', '');
    Session.set('typing', false);

    // Jquery elements
    cursorElement = $('#cursor');
    inputHolderElement = $('#inputHolder');


    // Initialize
    cursorElement.flicker();
    setInterval(function () {
        Session.set('input', $('#inputHolder').val());
    }, 50);

    // Welcome the user
    welcomeLines.forEach(function (val) {
        setTimeout(function () {
            pushTerminalLine(val.text, val.steps);
            if (val.focus) {
                inputHolderElement.focus();
                Session.set('typing', true);
                setTimeout(function() {
                    $('#cursor').flicker();
                }, 100)
            }
        }, val.time);
    });

    setInterval(function () {
        var content = Session.get('content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].text.length > 0) {
                var steps = content[i].steps;
                content[i].actual_text = content[i].actual_text + content[i].text.substring(0, steps);
                content[i].text = content[i].text.substring(steps);

            }
        }
        Session.set('content', content);
        $('html, body').animate({scrollTop: $(document).height()}, 10);
    }, 10)
});

Template.terminal.events({
    "submit #inputForm": function (e) {
        e.preventDefault();
        executeCommand(Session.get('input'));
        $('#inputHolder').val('')
    },
    "keydown #inputHolder": function (e) {
        if (e.key === 'Enter') {
            executeCommand(inputHolderElement.val());
            inputHolderElement.val('');
        }
    },
    "click #terminal": function () {
        inputHolderElement.focus();
    }
});

Template.terminal.helpers({
    terminal_text: function () {
        return Session.get('content');
    },
    holdingInput: function () {
        return Session.get('input');
    },
    typing: function () {
        return Session.get('typing');
    }
});