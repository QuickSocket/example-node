// Repository is used to keep track of the chat users.
// Normally it would be best to use a persistant database.
// This app is using memory storage for demonstration purposes only.

module.exports = class Repository {
  constructor() {
    this.connections = {};
  }

  getAllConnections() {
    return Object.values(this.connections);
  }

  auth(referenceId, name) {
    this.connections[referenceId] = { name };
  }

  connect(referenceId, connectionId) {
    this.connections[referenceId].connectionId = connectionId;
    return this.connections[referenceId];
  }

  disconnect(referenceId) {
    const disconnectedUser = this.connections[referenceId];
    delete this.connections[referenceId];
    return disconnectedUser;
  }
};
