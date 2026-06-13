import products from '@/data/products.json';

const ProductService = {
  getAll() {
    return products;
  }
}

export { ProductService }