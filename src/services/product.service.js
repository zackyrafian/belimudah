import products from '@/data/products.json';

const ProductService = {
  getAll() {
    return products;
  }, 
  getByName(name) { 
    return products.find(product => product.name.toLowerCase().replaceAll(" ", "-") === name)
  }, 
  getCategories(limit) { 
    const categories = {};

    products.forEach(product => { 
      if (!categories[product.category]) { 
        categories[product.category] = { 
          name: product.category, 
          total: 0, 
        }
      }
      categories[product.category].total++; 
    })
    const result = Object.values(categories); 
    return limit ? result.slice(0, limit) : result;
  }
}

export { ProductService }