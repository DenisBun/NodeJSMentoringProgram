const queryParser = (req, res, next) => {
  const queryPos = req.url.indexOf('?');

  let parsedQuery = {};

  if (queryPos !== -1) {
    const query = req.url.substring(queryPos + 1);
    
    const queryParamsArray = query.split('&');

    queryParamsArray.forEach(params => {
      const parsedParam = params.split('=');
      const paramName = parsedParam[0];
      const paramValue = parsedParam[1];

      parsedQuery = { ...parsedQuery, [paramName]: paramValue};
    });
  }
  
  req.parsedQuery = parsedQuery;

  next();
};

export default queryParser;