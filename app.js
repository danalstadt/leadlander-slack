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

slack.notify("Testing message", function(err, result){
    console.log(err,result);
});