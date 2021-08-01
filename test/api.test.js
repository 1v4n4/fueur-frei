import '@babel/polyfill';
import { setApiScore, getApiScoress } from '../src/api';

global.fetch = require('jest-fetch-mock');

describe('Posting Score to Api ', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Returns data if API call is successful', async () => {
    fetch.mockResponseOnce(JSON.stringify('Api test call'));
    const result = await setApiScore('JDoe', 100);
    expect(result).toBe('Api test call');
  });

  test('Posts to API with correct params', async () => {
    fetch.mockResponseOnce(JSON.stringify('Api test call'));
    await setApiScore('JDoe', 100);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][1].body).toEqual(JSON.stringify({ user: 'JDoe', score: 100 }));
  });
});

describe('Get scores from API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Returns an array of objects if API call is successful', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ user: 'JDoe', score: 100 }]));
    const scores = await getApiScoress();
    console.log(scores);
    expect(scores).toEqual([{ score: 100, user: 'JDoe' }]);
  });

  test('Score is not greater than give score', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ user: 'JDoe', score: 10 }]));
    const scores = await getApiScoress('JDoe', 100);
    expect(scores[0].score).not.toBeGreaterThan(100);
  });
});
