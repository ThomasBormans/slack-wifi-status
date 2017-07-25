# Slack WiFi Status #

Update your Slack Status based on your current WiFi connection.

## Requirements ##

* Node.js

## Installation ##

### Clone the repository ###

```sh
git clone https://github.com/ThomasBormans/slack-wifi-status.git
```

### Install dependencies ###

```sh
npm install
```

### Install config file ###

Copy the sample file (`config.sample.js`) to `config.js` and edit the content based on your network preferences.

### Create Slack token ###

Create a new [legacy token](https://api.slack.com/custom-integrations/legacy-tokens) for your current team and paste it in the `config.js` file.

### Create a cronjob ###

```sh
*/15 * * * * /complete/path/to/slack-wifi-status
```
The above cronjob runs every 15 minutes.
