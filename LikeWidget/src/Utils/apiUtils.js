export function ApiUtils() {
	return new Promise((res, rej) => {
		setTimeout(() => {
			let randomVal = Math.random();
			if (randomVal > 0.5) res("SUCCESS");
			else res("FAILURE");
		}, 1000);
	});
}
