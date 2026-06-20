import ProductCard from "@/components/product-card";
import { UserStorage } from "@/services/user.service";

export default function ProfileWishList() { 
  const products = UserStorage.getCart(); 
  return (
    <div className="grid grid-cols-4 gap-4">
      {products.cart.product.map((product) => ( 
        <ProductCard product={product}/>
      ))}
    </div>
  )
}