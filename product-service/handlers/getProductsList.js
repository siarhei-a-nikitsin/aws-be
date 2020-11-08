import middy from "@middy/core";
import cors from "@middy/http-cors";
import { autoProxyResponse } from "middy-autoproxyresponse";
import { getProducts } from "../services/productService";
import get500Response from "../common/responses/get500Response";
import { logEvent } from "../common/logging";

const handler = async (event) => {
  logEvent(event);

  try {
    return await getProducts();
  } catch (error) {
    return get500Response(error);
  }
};

export default middy(handler)
  .use(cors())
  .use(autoProxyResponse());