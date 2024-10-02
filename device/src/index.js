const { Client, Message } = require('azure-iot-device');
const { Mqtt } = require('azure-iot-device-mqtt');

// Paste your device connection string here
const connectionString = process.env.connectionString 

const client = Client.fromConnectionString(connectionString, Mqtt);

// Function to send random telemetry data
function sendTelemetry() {
  // Random temperature
  const temperature = (20 + Math.random() * 15).toFixed(2); 
  // Random humidity
  const humidity = (60 + Math.random() * 20).toFixed(2); 
  
  const data = JSON.stringify({ temperature, humidity });
  const message = new Message(data);
  console.log('Sending message: ' + message.getData());

  // Send telemetry data
  client.sendEvent(message, (err) => {
    if (err) {
      console.error('Failed to send message: ' + err.toString());
    } else {
      console.log('Message sent successfully');
    }
  });
}

// Connect the client and start sending telemetry every 5 seconds
client.open((err) => {
  if (err) {
    console.error('Could not connect: ' + err.toString());
  } else {
    console.log('Client connected');
    // Send telemetry every 5 seconds
    setInterval(sendTelemetry, 5000); 
  }
});
