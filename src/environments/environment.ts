// const apiServerHost = 'http://help-animals.pp.ua:3000';
const apiServerHost = 'http://localhost:3000';

const apiUrl = apiServerHost + '/api/v1';
const activeAdminApiUrl = apiServerHost + '/admin';

export const environment = {
  production: false,
  apiServerHost,
  apiUrl,
  activeAdminApiUrl
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
