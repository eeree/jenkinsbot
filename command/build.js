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
            this.jenkins.job.build(
                {
                    'name': this.command,
                    'token': process.env.JENKINS_TOKEN
                }, (err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(`Build ${this.command} has started (I hope so).`);
                });
        });
    }
}

module.exports = Build;
