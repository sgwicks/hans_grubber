const axios = require('axios');
const { client_id, oauth } = require('../opts');

const permittedUsers = require('../user-ids');

const permittedUserIds = Object.values(permittedUsers);

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

const shoutout = async (msg, user) => {
  if (!user.mod) {
    if (!permittedUserIds.includes(user['user-id'])) {
      return;
    }
  }
  const name = msg.split(' ')[1]
  const res = await getUserInfo(name)
  const {game_name, broadcaster_name} = await getChannelInfo(res);
  return `Please take a moment to check out some ${game_name} action with ${broadcaster_name}. Give them a follow at twitch.tv/${broadcaster_name} and check out their amazing content!`

};

module.exports = { shoutout };
