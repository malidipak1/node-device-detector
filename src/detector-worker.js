const DeviceDetector = require('node-device-detector');
const ClientHints = require('node-device-detector/client-hints');

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: false,
});
const clientHints = new ClientHints();

module.exports = ({ ua, headers }) => {
  const bot = detector.parseBot(ua);
  if (bot && bot.name) {
    return { type: 'bot', bot };
  }
  const device = detector.detect(ua, clientHints.parse(headers));
  return { type: 'device', device };
};
