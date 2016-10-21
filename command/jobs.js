class Jobs
{
    constructor(jenkins, command)
    {
        this.jenkins = jenkins;
        this.command = command;
    }

    execute()
    {
        return new Promise((resolve, reject) => {
            const that = this;
            this.jenkins.info(function(err, data) {
                if (err) {
                    return reject(err);
                }

                if (!('jobs' in data)) {
                    return resolve('No jobs on this server :(');
                }

                return resolve(that.extract(data.jobs));
            });
        })
    }

    extract(jobs)
    {
        let msg = 'Available jobs: \n';
        jobs.forEach((item, index) => {
            msg += `${index}: \n`;
            msg += `\tName: ${item.name} \n`;
            msg += `\tStuck: ${item.url} \n`;
        });

        return msg;
    }
}

module.exports = Jobs;
