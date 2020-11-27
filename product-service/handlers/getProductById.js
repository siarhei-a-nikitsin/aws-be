import middy from '@middy/core';
import cors from '@middy/http-cors';
import { autoProxyResponse } from 'middy-autoproxyresponse';
import { getProductById } from '../services/productService';
import NotFoundError from '../common/errors/notFoundError';
import get404Response from '../common/responses/get404Response';
import get500Response from '../common/responses/get500Response';
import { logEvent } from '../common/logging';

const handler = async (event) => {
  logEvent(event);

  try {
    const { pathParameters: { id: productId } } = event;
    const product = await getProductById(productId);

    if (!product) {
      throw new NotFoundError(`The following product (id: ${productId}) is not found.`);
    }

    return product;
  } catch (error) {
    if (error instanceof NotFoundError) {
      return get404Response(error);
    }

    return get500Response(error);
  }
};

export default middy(handler)
  .use(cors())
  .use(autoProxyResponse());
