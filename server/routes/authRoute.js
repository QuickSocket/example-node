const uuid = require("uuid");

const { authUser } = require("../lib/manageQuickSocket");

// POST /api/v1/quicksocket/auth
const authRoute = (repository) => async (req, res) => {
  const referenceId = uuid.v1();
  const name = req.body.name;

  const connectionToken = await authUser(referenceId);
  
  repository.auth(referenceId, name);

  res.json({ connectionToken, referenceId });
};

module.exports = authRoute;
