import products from '@/data/products.json';

const ProductService = {
  getAll() {
    return products;
  }, 
  getByName(name) { 
    return products.find(product => product.name.toLowerCase().replaceAll(" ", "-") === name)
  }
}

export { ProductService }