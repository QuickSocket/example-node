const axios = require("axios");
const { Base64 } = require("js-base64");

const clientId = process.env.QUICKSOCKET_CLIENT_ID;
const clientSecret = process.env.QUICKSOCKET_CLIENT_SECRET;

const encoded = Base64.encode(`${clientId}:${clientSecret}`);

async function authUser(referenceId) {
  const response = await axios.post(
    `https://manage.quicksocket.io/auth`,
    { referenceId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
    }
  );
  return response.data.connectionToken
}

async function sendMessage(connectionId, payload) {
  await axios.post(
    `https://manage.quicksocket.io/send`,
    {
      connectionId,
      payload,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
    }
  );
}

module.exports = {
  authUser,
  sendMessage,
};
