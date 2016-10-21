class Null
{
    constructor(jenkins, command)
    {
        this.jenkins = jenkins;
        this.command = command;
    }

    execute()
    {
        return new Promise((resolve) => {
            return resolve('I don\'t know this command :(');
        });
    }
}

module.exports = Null;
