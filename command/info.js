class Info
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
            this.jenkins.info((err, data) => {
                if (err) {
                    return reject(err);
                }

                return resolve(that.extract(data));
            });
        })
    }

    extract(data)
    {
        let msg = 'Server summary:\n';
        msg += `Description: ${data.description}\n`;
        msg += `No of executors: ${data.numExecutors}\n`;
        msg += `View URL: ${data.primaryView.url}`;

        return msg;
    }
}

module.exports = Info;
