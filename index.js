/*
 * Copyright (C) 2016 Orange
 *
 * This software is distributed under the terms and conditions of the 'BSD-3-Clause'
 * license which can be found in the file 'LICENSE.txt' in this package distribution
 * or at 'https://opensource.org/licenses/BSD-3-Clause'.
 */
var fs = require("fs");
var mqtt = require('mqtt')
const url = "mqtt://liveobjects.orange-business.com:1883"
const apiKey = "dbef594c58cc4fcca07284d1accb9d2d"


/** Subscription for one specific device (pub sub) **/
// const mqttTopic = "router/~event/v1/data/new/urn/lora/0123456789ABCDEF/#"

/** Subscription for all devices (pub sub) **/
const mqttTopic = "router/~event/v1/data/new/urn/lora/#"

/** Subscription for a fifo (persisted) **/
//const mqttTopic = "fifo/dev_payload"

/** connect **/
console.log("MQTT::Connecting to ");
var client  = mqtt.connect(url, {username:"payload", password:apiKey, keepAlive:30})

/** client on connect **/
client.on("connect", function() {
  console.log("MQTT::Connected");

  client.subscribe(mqttTopic)
  console.log("MQTT::Subscribed to topic:", mqttTopic);
})

/** client on error **/
client.on("error", function(err) {
  console.log("MQTT::Error from client --> ", err);
})

client.on("message", function (topic, message) {

  console.log("MQTT::New message\n");
  var loraMessage = JSON.parse(message)

  console.log("DevEUI:", loraMessage.metadata.source.split(':')[2]);
  console.log("Timestamp:", loraMessage.timestamp);
  console.log("Port:", loraMessage.metadata.network.lora.port);
  console.log("Fcnt:", loraMessage.metadata.network.lora.fcnt);
  console.log("Payload:", loraMessage.value.payload, "\n");
  fs.writeFile('/home/site/',loraMessage.timestamp, function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
  });
})