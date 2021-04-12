// const apiServerHost = 'http://ec2-13-49-41-155.eu-north-1.compute.amazonaws.com:3000';
const serverHost = 'http://help-animals.hopto.org:3000';

const apiUrl = serverHost + '/api/v1';
const activeAdminApiUrl = serverHost + '/admin';

export const environment = {
  production: true,
  serverHost,
  apiUrl,
  activeAdminApiUrl
};
