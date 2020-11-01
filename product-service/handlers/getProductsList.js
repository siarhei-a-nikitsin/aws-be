import middy from "@middy/core";
import cors from "@middy/http-cors";
import productService from "../services/productService";
import get200Response from "../common/responses/get200Response";
import get500Response from "../common/responses/get500Response";

const handler = async () => {
  try {
    const products = await productService.getProducts();

    return get200Response(products);
  } catch(error) {
    return get500Response(error);
  }
};

export default middy(handler)
  .use(cors());