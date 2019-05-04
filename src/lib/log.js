const LogLevels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  };
  
  // default to debug if not specified
  const logLevelName = process.env.log_level || "DEBUG";

  const getContext = () => { return {
    awsRegion: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
    functionName: process.env.AWS_LAMBDA_FUNCTION_NAME,
    functionVersion: process.env.AWS_LAMBDA_FUNCTION_VERSION,
    functionMemorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
    stage: process.env.ENVIRONMENT || process.env.STAGE,
    correlationId: process.env.correlationId
  }};
  
  function isEnabled(level) {
    return level >= LogLevels[logLevelName];
  }
  
  function appendError(params, err) {
    if (!err) {
      return params;
    }
  
    return Object.assign(params || {}, {
      errorName: err.name,
      errorMessage: err.message,
      stackTrace: err.stack
    });
  }
  
  function log(levelName, message, params) {
    if (!isEnabled(LogLevels[levelName])) {
      return;
    }
  
    const logMsg = Object.assign({}, getContext(), params);
    logMsg.level = levelName;
    logMsg.message = message;
  
    console.log(JSON.stringify(logMsg));
  }
  
  module.exports.debug = (msg, params) => log("DEBUG", msg, params);
  module.exports.info = (msg, params) => log("INFO", msg, params);
  module.exports.warn = (msg, params, error) =>
    log("WARN", msg, appendError(params, error));
  module.exports.error = (msg, params, error) =>
    log("ERROR", msg, appendError(params, error));