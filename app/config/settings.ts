const settings = {
  dev: {
    // apiUrl: "http://localhost:8000/api",
    // apiUrl: "http://paytrail-api-dev.us-east-2.elasticbeanstalk.com/api",
    apiUrl: "https://4078-142-165-103-193.ngrok.io/api",
    // apiUrl: "http://paytrail-api-dev.us-east-2.elasticbeanstalk.com/api",
  },
  staging: {
    apiUrl: "http://paytrail-api-dev.us-east-2.elasticbeanstalk.com/api",
  },
  prod: {
    apiUrl: "http://paytrail-api-dev.us-east-2.elasticbeanstalk.com/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) {
    return settings.dev;
  }

  return settings.prod;
};

export default getCurrentSettings();
