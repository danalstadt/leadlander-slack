# leadlander-slack

Integrates LeadLander leads with Slack via incoming email. Receives and parses incoming email messages with [Mailin](https://github.com/Flolagale/mailin), as LeadLander has no feeds/webhooks/etc that can be used directly. See Mailin's docs for more information about getting that configured.

## Installation

Clone the repo and copy the default config:

`git clone https://github.com/danalstadt/leadlander-slack.git`

`cp config.example.js config.js`

Edit the default configuration to your liking. Then start the app (must be run as root on Linux to use port 25 for SMTP):

`sudo node app.js`

or using forever (recommended):

`sudo forever start app.js`
