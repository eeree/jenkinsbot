class Build
{
    constructor(jenkins, command)
    {
        this.jenkins = jenkins;
        this.command = command;
    }

    execute()
    {
        return new Promise((resolve, reject) => {
            this.jenkins.job.enable(this.command, (err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(`Build ${this.command} has been enabled (Or not? Nobody knows! :oncoming_police_car:).`);
                });
        });
    }
}

module.exports = Build;
