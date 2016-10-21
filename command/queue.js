class Queue
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
            this.jenkins.queue.list(function(err, data) {
                if (err) {
                    return reject(err);
                }

                if (!('items' in data)) {
                    return resolve('Nothing in the queue :(');
                }

                return resolve(that.format(data));
            });
        })
    }

    format(data)
    {
        let msg = 'Running tasks: \n';
        data.forEach((item, index) => {
            msg += '\tNo: index: \n';
            msg += '\t\tName: item.task.name \n';
            msg += '\t\tStuck: item.stuck \n';
        });

        return msg;
    }
}

module.exports = Queue;
