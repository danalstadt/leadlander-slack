# leadlander-slack

Integrates LeadLander leads with Slack via incoming email. Receives incoming email messages with [Mailin](https://github.com/Flolagale/mailin).

## Installation

Clone the repo and copy the default config:

`git clone https://github.com/danalstadt/leadlander-slack.git`
`cp config.example.js config.js`

Edit the default configuration to your liking. Then start the app (must be run as root on Linux to use port 25 for SMTP):

`sudo node app.js`

or using forever (recommended):

`sudo forever start app.js`
