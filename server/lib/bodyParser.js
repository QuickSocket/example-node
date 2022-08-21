// bodyParser is Express middleware that will keep both the raw and parsed 
// request body to be used in our routes. We need the raw request body to 
// validate QuickSocket callback requests securely.

const bodyParser = (req, res, next) => {
  req.rawBody = "";
  req.setEncoding("utf8");
  req.on("data", (x) => (req.rawBody += x));
  req.on("end", () => {
    if (req.rawBody) {
      req.body = JSON.parse(req.rawBody);
    }
    next();
  });
};

module.exports = bodyParser;
