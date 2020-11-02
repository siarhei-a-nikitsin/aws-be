import middy from "@middy/core";
import cors from "@middy/http-cors";
import { autoProxyResponse } from "middy-autoproxyresponse";
import productService from "../services/productService";
import NotFoundError from "../common/errors/notFoundError";
import get404Response from "../common/responses/get404Response";
import get500Response from "../common/responses/get500Response";

const handler = async event => {
  try {
    const { pathParameters: { id: productId } } = event;
    const product = await productService.getProductById(productId);

    if(!product) {
      throw new NotFoundError(`The following product (id: ${productId}) is not found.`);
    }

    return product;
  } catch (error) {
    if(error instanceof NotFoundError) {
      return get404Response(error);
    }

    return get500Response(error);
  }
};

export default middy(handler)
  .use(autoProxyResponse())
  .use(cors());