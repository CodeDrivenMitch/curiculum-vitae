executeCommand = function (command) {
    pushTerminalLine('> ' + command);

    var split = command.split(' ');
    var found = null;
    while(split.length > 0) {
        found = commands[split[0]];
        split.splice(0, 1);

        console.log(typeof found);
        if(typeof found === 'function' || typeof found === 'undefined') {
            break;
        }
    }

    if(typeof found === 'function') {
        found.apply({}, split);
    } else {
        pushTerminalLine("Unknown command. Try accessing help!")
    }
};

pushTerminalLine = function (line, steps) {
    var content = Session.get('content');

    content.push({
        text: line,
        actual_text: '',
        steps: steps === null || steps === undefined ? 2 : steps
    });
    Session.set('content', content);
};


commands = {
   "clear": function(arg) {
       Session.set('content', []);
       if(arg) {
           pushTerminalLine(arg)
       }
   }
};