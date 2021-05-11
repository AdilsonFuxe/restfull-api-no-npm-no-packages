/**
 * Create and export configuration variables
 *
 */

//  Container for all the environments
const environments = {};

// Staging { default } environments
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging',
};

// Production environments
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
};

// Determine which environment was passed as a command-line arguments
const currentEnvironment =
  typeof process.env.NODE_ENV == 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

// Check that current environment is one of the environments above, if not, default to staging

const environmentToExport =
  typeof environments[currentEnvironment] == 'object'
    ? environments[currentEnvironment]
    : environments.staging;

// export the module

module.exports = environmentToExport;
