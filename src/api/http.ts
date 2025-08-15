import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://easydev.club/api/v1/todos',
  headers: {
    'Content-Type': 'application/json',
  },
});
