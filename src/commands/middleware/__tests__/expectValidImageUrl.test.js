import R from 'ramda';

import expectValidImageUrl, { messages } from '../expectValidImageUrl';
import { createContext } from '../../../util/tests';

describe('expectValidImageUrl', () => {
  const next = R.identity;

  it('should dispatch an error if the provided url doesn\'t point to an image', async () => {
    const context = createContext({
      args: {
        url: 'http://example.com',
      },
    });
    const errorResponse = await expectValidImageUrl()(next, context);
    const response = await errorResponse.executor(context);

    expect(response.embed.fields[1].value).toBe(messages.msg1);
  });

  it('should pass through if the provided url does point to an image', async () => {
    const context = createContext({
      args: {
        url: 'http://example.com/image.png',
      },
    });
    const nextContext = await expectValidImageUrl()(next, context);

    expect(nextContext).toEqual(context);
  });
});
