// const apiServerHost = 'http://ec2-13-49-41-155.eu-north-1.compute.amazonaws.com:3000';
const apiServerHost = 'https://help-animals.pp.ua:3000';

const apiUrl = apiServerHost + '/api/v1';
const activeAdminApiUrl = apiServerHost + '/admin';

export const environment = {
  production: true,
  apiServerHost,
  apiUrl,
  activeAdminApiUrl
};
