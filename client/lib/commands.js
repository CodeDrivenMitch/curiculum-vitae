executeCommand = function (command) {
    pushTerminalLine('> ' + command);

    var split = command.split(' ');
    var found = null;
    while (split.length > 0) {
        found = commands[split[0]];
        split.splice(0, 1);

        console.log(typeof found);
        if (typeof found === 'function' || typeof found === 'undefined') {
            break;
        }
    }

    if (typeof found === 'function') {
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
    "clear": function (arg) {
        Session.set('content', []);
        if (arg) {
            pushTerminalLine(arg)
        }
    },
    "commands": function () {
        pushTerminalLine(
            "whoami help clear commands download work education personal"
        );
    },
    "download": function () {
        // TODO: Add real download link
        pushTerminalLine(
            "I will add a <a href='#'>download</a> here in the future. This one is a placeholder!"
        )
    },
    "whoami": function () {
        pushTerminalLine(
            "Retrieving information............... <br/>" +
            "<br/>" +
            "        Nickname: Guest <br/>" +
            "Probable purpose: Getting to know more about the individual Mitchell Herrijgers, the creator of this OS which was created for that sole purpose.")
    },
    "about": function () {
        pushTerminalLine(
            "This website is the Curiculum Vitae of Mitchell Herrijgers. Through using the commands you can find out more about me. <br/>" +
            "I personally love Linux and open-source, so the design of this website resembles me. <br/><br/>" +
            "If you are disgusted by this, you are probably browsing this using Internet Explorer. You can just type 'download' and get it in PDF format."
        )
    },
    "personal": function (arg) {
        if (arg === undefined || arg === null) {
            pushTerminalLine(
                "Hey there! <br/>" +
                "I am a 22-year old male living in Rotterdam. I love programming as my work and as my hobby. <br/>" +
                "As a young boy I took apart old computers and assemble them again," +
                "trying to understand how they worked. Well, to a certain degree I know now!<br/><br/>" +
                "Anyway, I can ramble on and on, but maybe it would be nicer if you asked things about me! How? Use on of these commands: <br/><br/>" +
                "- personal hobbies           I'll tell you about my hobbies!<br/>" +
                "- personal politics          My political view on things <br/>" +
                "- personal mind              How does my mind work? What are it's qualities? <br/>" +
                "- personal conflict          On what topics is my mind in conflict right now?"
            );
            return;
        }

        switch (arg) {
            case 'hobbies':
                pushTerminalLine("I don't have any! Kidding, I still need to write this. Come back later.");
                break;
            default:
                pushTerminalLine("This is not a valid option for this command!");
                break;
        }
    },
    "help": function (program) {
        if (program === undefined || program === null) {
            // Display general help
            pushTerminalLine("" +
                "Welcome to the MorlackOS help. We are here to you rescue while finding your way around here. <br>" +
                "These are the commands available to you: <br/><br/>" +
                "- whoami        Shows the current user. <br/>" +
                "- help          You're already here! Good job! <br/>" +
                "- clear         Removed all text from the terminal. <br/><br/>" +
                "- personal      Shows information about Mitchell as a person. <br/>" +
                "- education     Shows information about Mitchell as a student. <br/>" +
                "- work          Shows information about Mitchell regarding his work-related habits. <br/><br/>" +
                "- download      Starts a download to get Mitchell's CV in PDF format.<br/>" +
                "- commands      Shows all commands on this OS. This might include fun things not listed here." +
                "<br/><br/>" +
                "I hope you will enjoy my C.V. as much as I enjoyed creating it. Good luck!")
        }
    }
};