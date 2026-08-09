import ProductCard from "@/components/product-card";
import { useAuth } from "@/hooks/useAuth";
import { WishListService } from "@/services/wishlist.service";
import { useEffect, useState } from "react";

export default function ProfileWishList() { 
  const { user } = useAuth();

  console.log(user.token);
  const [wishlist, setWistList] = useState(); 

  useEffect(() => {
    if (!user?.token) return;
    const controller = new AbortController();
    WishListService.getAll(controller.signal, user.token)
      .then((data) => setWistList(data.results))
      .catch((error) => {
        if (error.name !== 'AbortError') console.error(error.message);
      });
  
    return () => controller.abort();
  }, [user?.token]);  
  console.log(wishlist)
  if (!wishlist) { 
    return;
  }
  return (
    <div className="grid grid-cols-4 gap-4"> 
      {wishlist.map((w) => ( 
        <ProductCard product={w.product}/>
      ))}
    </div>
  )
}