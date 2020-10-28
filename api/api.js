const axios = require('axios');
const { client_id, oauth } = require('../opts');

const baseURL = 'https://api.twitch.tv/helix';

const headers = {
  'Client-Id': client_id,
  Authorization: `Bearer ${oauth}`,
};

const getUserInfo = (name) => {
  return axios
    .get(`${baseURL}/users`, { headers, params: { login: name } })
    .then(({ data: { data } }) => {
      const { id } = data[0];
      return id;
    })
    .catch((err) => console.log(err));
};

const getChannelInfo = (broadcaster_id) => {
  return axios
    .get(`${baseURL}/channels`, {
      headers,
      params: { broadcaster_id },
    })
    .then(({ data: { data } }) => {
      const { broadcaster_name, game_name } = data[0];
      return { broadcaster_name, game_name };
    })
    .catch((err) => console.log(err));
};

const shoutout = (name) => {
  return getUserInfo('shanodin').then((res) => getChannelInfo(res));
};

module.exports = { shoutout };
