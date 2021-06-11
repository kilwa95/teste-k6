import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

const BASE_URL = 'http://127.0.0.1:8000';

export let options = {
	vus: 2, // 2 user looping for 1 minute
	duration: '1m',

	thresholds: {
		http_req_duration: [ 'p(99)<1500' ] // 99% of requests must complete below 1.5s
	}
};

export default function() {
	var url = `${BASE_URL}/api/users`;
	var payload = JSON.stringify({
		email: 'julie@gmail.com',
		password: 'taylor123',
		firstname: 'khaled',
		lastname: 'abd'
	});
	var params = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	let res = http.post(url, payload, params).json();
	check(res, {
		'is status 201': (r) => r.status === 201
	});
}
