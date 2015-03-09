var mailin = require('mailin');
var Slack = require('node-slackr');
var cheerio = require('cheerio');
var format = require('string-format');

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
    requireAuthentication: false,
    logLevel: 'warn'
});

mailin.on('message', function (connection, data, content) {
    if (data.headers.subject.indexOf('Alert:') != -1) {
        try {
            //console.log(data);
            var $ = cheerio.load(data.html);
            var companyName = $('table a').eq(0).text().replace(/\n/, '').replace(/(\s)+/g, ' ');
            var companyLink = $('table a').eq(0).attr('href');
            var leadLink = $('table a').eq(2).attr('href').replace(/\.+/g, '.');

            var message = format(
                'Someone from <{companyLink}|{company}> landed on the site.',
                {
                    companyLink: companyLink,
                    company: companyName,
                    link: leadLink
                }
            );

            console.log('company:', companyName);
            console.log('company link:', companyLink);
            console.log('link:', leadLink);
            console.log('message:', message);

            slack.notify(message);
        } catch (e) {
            console.error(e);
        }

    }
});
