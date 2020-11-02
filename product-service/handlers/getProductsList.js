import middy from "@middy/core";
import cors from "@middy/http-cors";
import { autoProxyResponse } from "middy-autoproxyresponse";
import productService from "../services/productService";
import get500Response from "../common/responses/get500Response";

const handler = async () => {
  try {
    const products = await productService.getProducts();

    return products;
  } catch (error) {
    return get500Response(error);
  }
};

export default middy(handler)
  .use(autoProxyResponse())
  .use(cors());