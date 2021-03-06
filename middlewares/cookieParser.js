const cookieParser = (req, res, next) => {
  const list = {};
  const rc = req.headers.cookie;

  rc && rc.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
  });

  req.parseCookies = list;
  next();
};

export default cookieParser;