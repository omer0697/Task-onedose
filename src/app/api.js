import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://onedose-backend-fw8e.zeet-omer0697-team.zeet.app',
});

export default instance;