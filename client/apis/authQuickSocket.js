import axios from "axios";

const rootUrl = "/api/v1/quicksocket";

// POST /api/v1/quicksocket/auth
export async function authQuickSocket(name) {
  const response = await axios.post(`${rootUrl}/auth`, { name })
  return response.data.connectionToken;
}
