require('dotenv').config();
const token = process.env.TOKEN || '';
const admins = JSON.parse(process.env.USERS);
const auth = require('./service/auth');
auth(admins);
const Jenkins = require('./service/jenkins');
const RtmClient = require('@slack/client').RtmClient;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
const MemoryDataStore = require('@slack/client').MemoryDataStore;
const rtm = new RtmClient(token, {
    logLevel: 'debug',
    dataStore: new MemoryDataStore()
});
rtm.start();

const sayHello = (name) => {
    const dm = rtm.dataStore.getDMByName(name);
    rtm.sendMessage('Yo! What are we going to deploy today?', dm.id);
};

rtm.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, () => {
    admins.map(sayHello);
});

rtm.on(RTM_EVENTS.MESSAGE, (data) => {
    if (data.type !== 'message' && !('text' in data)) {
        return;
    }
    const user = rtm.dataStore.getUserById(data.user);
    const dm = rtm.dataStore.getDMByName(user.name);
    if (-1 !== admins.indexOf(user.name)) {
        const jenkinsService = new Jenkins();
        const response = jenkinsService.executeCommand(data);
        response.then((msg) => {
            rtm.sendMessage(`\`\`\`${msg}\`\`\``, dm.id);
        }).catch((msg) => {
            rtm.sendMessage(`\`\`\`${msg}\`\`\``, dm.id);
        })
    }
});

