class Log
{
    constructor(jenkins, command)
    {
        this.jenkins = jenkins;
        this.command = command;
    }

    execute()
    {
        let build = 1;
        return new Promise((resolve, reject) => {
            this.jenkins.job.get(this.command, (err, data) => {
                if (err) {
                    return reject(err);
                }
                if ('lastBuild' in data) {
                    build = data.lastBuild.number;
                }
                return resolve(this.log(build));
            });
        })
    }

    log(build)
    {
        return new Promise((resolve, reject) => {
            return this.jenkins.build.log(this.command, build, (err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(data);
            });
        })
    }
}

module.exports = Log;
