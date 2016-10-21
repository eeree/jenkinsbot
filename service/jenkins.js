const Factory = require('./../factory/jenkins');

class Jenkins {
    executeCommand(data)
    {
        let command = data.text.trim();
        if (command.toLowerCase().startsWith('jenkins')) {
            command = command.substr('jenkins'.length).trim();
            const CommandObject = Factory.createFromCommand(command);
            const result = CommandObject.execute();

            return result;
        }

        return 'No command found';
    }
}

module.exports = Jenkins;
