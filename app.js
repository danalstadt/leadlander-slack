var mailin = require('mailin');
var Slack = require('node-slackr');
var cheerio = require('cheerio');

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
    if (data.headers.subject.indexOf('Alert:') != -1) {
        console.log(data);

        var $ = cheerio.load(data.html);

        var companyName = ($('table:nth-child(2) tr:nth-child(1) td:nth-child(2) a')).text();
        console.log(companyName);

        var link = $('a[href*="ssl.leadlander.com/leads"]').attr('href');
        console.log(link);

    }


});
