import middy from '@middy/core';
import cors from '@middy/http-cors';
import { autoProxyResponse } from 'middy-autoproxyresponse';
import { createProduct } from '../services/productService';
import getSuccessResponse from '../common/responses/getSuccessResponse';
import get400Response from '../common/responses/get400Response';
import get500Response from '../common/responses/get500Response';
import { logEvent } from '../common/logging';

const handler = async (event) => {
  logEvent(event);

  try {
    const newProduct = JSON.parse(event.body);

    const createdProduct = await createProduct(newProduct);

    return getSuccessResponse({
      message: 'The product is created successfully.',
      newProduct: createdProduct,
    }, 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return get400Response(error);
    }

    return get500Response(error);
  }
};

export default middy(handler)
  .use(cors())
  .use(autoProxyResponse());
