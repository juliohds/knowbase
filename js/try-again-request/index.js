/* 
    For retrying request prone to punctual errors, 
    server related issues for example 
*/
import { waitForMilliseconds } from '../utils';

export const tryAgainRequest = async (request, params = [], attemptsLimit = 3, attempts = 0) => {
    try {
        if (!request) return;

        return await request(...params);
    } catch (err) {
        if (attempts >= attemptsLimit) throw err;

        await waitForMilliseconds(5000); // This guy is in the utils module.

        return tryAgainRequest(request, params, attemptsLimit, ++attempts);
    }
}