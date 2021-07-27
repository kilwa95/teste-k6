import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 400 }, // ramp up to 400 users
    { duration: '3h56m', target: 400 }, // stay at 400 for ~4 hours
    { duration: '2m', target: 0 }, // scale down. (optional)
  ],
};

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // make sure this is not production

export default function () {
  http.batch([
    ['GET', `${API_BASE_URL}/book/1/`],
    ['GET', `${API_BASE_URL}/book/2/`],
    ['GET', `${API_BASE_URL}/book/3/`],
    ['GET', `${API_BASE_URL}/book/4/`],
  ]);

  sleep(1);
}