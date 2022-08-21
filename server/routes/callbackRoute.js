require("dotenv").config();

const validateQuickSocketCallback = require("../lib/validateQuickSocketCallback");
const { sendMessage } = require("../lib/manageQuickSocket");

// POST /api/v1/quicksocket/auth
const callbackRoute = (repository) => async (req, res) => {
  res.sendStatus(204);
  const qsSignature = req.headers["qs-signature"];
  const rawRequestBody = req.rawBody;
  const publicKey = process.env.QUICKSOCKET_PUBLIC_KEY;

  const valid = validateQuickSocketCallback(
    rawRequestBody,
    qsSignature,
    publicKey
  );

  if (!valid) {
    return;
  }

  const { action, connectionId, clientId, referenceId, payload } = req.body;

  switch (action) {
    case "CONNECT":
      await connect(repository, referenceId, connectionId);
      break;
    case "DISCONNECT":
      await disconnect(repository, referenceId);
      break;
    case "MESSAGE":
      await message(repository, payload);
      break;
  }
};

const connect = (repository, referenceId, connectionId) => {
  const newConnection = repository.connect(referenceId, connectionId);
  return Promise.all(
    repository.getAllConnections().map((connection) => {
      return sendMessage(
        connection.connectionId,
        JSON.stringify({
          name: newConnection.name,
          message: "Has joined the chat!",
        })
      );
    })
  );
};

const disconnect = (repository, referenceId) => {
  const newDisconnection = repository.disconnect(referenceId);
  return Promise.all(
    repository.getAllConnections().map((connection) => {
      return sendMessage(
        connection.connectionId,
        JSON.stringify({
          name: newDisconnection.name,
          message: "Has left the chat!",
        })
      );
    })
  );
};

const message = (repository, payload) => {
  return Promise.all(
    repository.getAllConnections().map((connection) => {
      return sendMessage(connection.connectionId, payload);
    })
  );
};

module.exports = callbackRoute;
