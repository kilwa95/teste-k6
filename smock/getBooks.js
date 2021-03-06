import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
	vus: 2, // 3 user looping for 1 minute
	duration: '1m',

	thresholds: {
		http_req_duration: [ 'p(99)<1500' ] // 99% of requests must complete below 1.5s
	}
};

const BASE_URL = 'http://127.0.0.1:8000';

export default () => {
	let books = http.get(`${BASE_URL}/api/books`).json();
	check(books, {
		'is status 200': (r) => r.status === 200
	});
	sleep(1);
};
