import productsData from "../data/products.json";

const getProducts = async () => Promise.resolve(productsData)

const getProductById = async productId => {
    const products = await getProducts();

    return products.find(x => x.id === productId);
}

export default { getProducts, getProductById };
