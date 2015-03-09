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
    requireAuthentication: false
});

mailin.on('message', function (connection, data, content) {
    if (data.headers.subject.indexOf('Alert:') != -1) {
        try {
            //console.log(data);
            var $ = cheerio.load(data.html);
            var companyName = $('table a').eq(0).text().replace(/\n/, '').replace(/(\s)+/g, ' ');
            var companyLink = $('table a').eq(0).attr('href');
            var leadLink = $('table a').eq(2).attr('href');

            console.log('company:', companyName);
            console.log('company link:', companyLink);
            console.log('link:', leadLink);

            slack.notify(format(
                'Someone from <{companyLink}|{company}> landed on the site. <{link}|View on LeadLander>',
                {
                    companyLink: companyLink,
                    company: companyName,
                    link: leadLink
                }
            ));
        } catch (e) {
            console.error(e);
        }

    }
});
