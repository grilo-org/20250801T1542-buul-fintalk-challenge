import productsReducer from "./modules/products/reducers";

const rootReducer = () => ({
  products: productsReducer,
});

export default rootReducer;
