import '@babel/polyfill';
import { setApiScore } from '../src/api';

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

