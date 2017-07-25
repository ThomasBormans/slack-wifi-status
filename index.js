#! /usr/bin/env node
let config;

try {
	config = require("./config");
} catch (e) {
	throw "Please create a `config.js` file. You can use `config.sample.js` as example.";
}

// Check if token is configured
if (!config.token) {
	throw "Please provide a Slack token.";
}

const request = require("request");
const wifi = require("node-wifi");

const updateStatus = (setting) => {
	const options = {
		method: "POST",
		url: "https://slack.com/api/users.profile.set?token=" + config.token + "&profile=" + encodeURIComponent(JSON.stringify(setting)),
		json: true,
	};

	request(options);
};

// Init WiFi
wifi.init({
	iface: null,
});

// Get current WiFi connection
wifi.getCurrentConnections((err, connections) => {
	if (connections.length === 0) { // Check if WiFi is connected
		throw "Not connected to any WiFi at the moment!";
	}

	// Find setting based on current network
	let setting = config.settings.find((s) => {
		return connections.find((c) => {
			return s.name === c.ssid;
		});
	});

	if (!~setting) { // Check if we have found a setting
		throw "Network not configured.";
	}

	// Update status in Slack
	updateStatus(setting.profile);
});
