const Log = require('./../command/log');
const Queue = require('./../command/queue');
const Info = require('./../command/info');
const Jobs = require('./../command/jobs');
const Build = require('./../command/build');
const Enable = require('./../command/enable');
const Disable = require('./../command/disable');
const Null = require('./../command/null');
const Jenkins = require('jenkins')({
    baseUrl: process.env.JENKINS_URL
});

class JenkinsFactory
{
    static createFromCommand(command)
    {
        switch (true) {
            case command.toLowerCase().startsWith('queue'):
                command = new Queue(Jenkins, this.commandWithNoAction(command, 'queue'));
                break;
            case command.toLowerCase().startsWith('log'):
                command = new Log(Jenkins, this.commandWithNoAction(command, 'log'));
                break;
            case command.toLowerCase().startsWith('build'):
                command = new Build(Jenkins, this.commandWithNoAction(command, 'build'));
                break;
            case command.toLowerCase().startsWith('disable'):
                command = new Disable(Jenkins, this.commandWithNoAction(command, 'disable'));
                break;
            case command.toLowerCase().startsWith('enable'):
                command = new Enable(Jenkins, this.commandWithNoAction(command, 'enable'));
                break;
            case command.toLowerCase().startsWith('info'):
                command = new Info(Jenkins, null);
                break;
            case command.toLowerCase().startsWith('jobs'):
                command = new Jobs(Jenkins, null);
                break;
            default:
                command = new Null(Jenkins, null);
        }

        return command;
    }

    static commandWithNoAction(command, action)
    {
        return command.substr(action.length).trim();
    }
}

module.exports = JenkinsFactory;
