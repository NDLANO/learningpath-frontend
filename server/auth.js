import 'isomorphic-fetch';
import queryString from 'query-string';
import btoa from 'btoa';
import config from '../src/config';

const NDLA_API_URL = config.ndlaApiUrl;

const clientData = {
  grant_type: 'client_credentials',
};
const url = `${NDLA_API_URL}/auth/tokens`;

const b64EncodeUnicode = str => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)));

const getToken = () => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    Authorization: `Basic ${b64EncodeUnicode(`${process.env.client_id}:${process.env.client_secret}`)}`,
  },
  body: queryString.stringify(clientData),
}).then(res => res.json());


export {
  getToken,
};
