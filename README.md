# leadlander-slack

Integrates LeadLander leads with Slack via incoming email.

This app and parses incoming email messages with [Mailin](https://github.com/Flolagale/mailin), as LeadLander has no feeds/webhooks/etc that can be used directly, and posts a message to a Slack #channel of your choice. See Mailin's docs for more information about getting incoming email configured. You should configure LeadLander to send you instant email alerts, and forward them to wherever your application is running.

## Installation

Clone the repo and copy the default config:

```
git clone https://github.com/danalstadt/leadlander-slack.git
npm install
cp config.example.js config.js
```

Edit the default configuration to your liking. Then start the app (must be run as root on Linux to use port 25 for SMTP):

`sudo node app.js`

or using forever (recommended):

`sudo forever start app.js`
