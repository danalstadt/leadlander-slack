var mailin = require('mailin');
var Slack = require('node-slackr');

var config = require('./config');

var slackConfig = {
    channel: config.channel
};

config.username ? slackConfig.username = config.username : null;
config.emoji ? slackConfig.icon_emoji = config.emoji : null;
config.icon ? slackConfig.icon_url = config.icon : null;

var slack = new Slack(config.webhook, slackConfig);

mailin.start({
    port: 25,
    disableWebhook: true,
    requireAuthentication: false
});

mailin.on('message', function (connection, data, content) {
    console.log(data);
});