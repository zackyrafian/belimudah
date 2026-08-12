import { StarIcon, ImageOff } from "lucide-react";
import { Link } from "react-router";
import { formatIDR } from "@/utils/format";
import { calculateDiscount } from "@/utils/calculate";
import { API } from "@/services/api";

export default function ProductCard({product}) { 
  const { finalPrice } = calculateDiscount(product.price, product.discount)
  console.log(product)
  return ( 
    <Link  to={`/product/${product.id}`}>
      <div className='bg-white flex flex-col rounded-xl border border-black/20  overflow-hidden'>
        <div>
          {product.images?.[0] ? (
            <div className="relative min-h-58.75 max-h-58.75 overflow-hidden">
              {/* <img className="h-58.75 w-full" src={`${API}${product.images[0]}`} alt={product.name} />*/}
              <img
                className="h-58.75 w-full"
                src={
                  /^https?:\/\//i.test(product.images[0])
                    ? product.images[0]
                    : `${API}${product.images[0]}`
                }
                alt={product.name}
              />
              {product.discount > 0 && (
                <div className="text-white absolute top-2 bg-red-500 left-2 text-xs rounded-full px-2 py-1">-{product.discount}%</div>
              )}
            </div>
          ) : (
            <div className="relative w-full min-h-58.75 flex items-center justify-center bg-gray-200 text-gray-400">
              <ImageOff size={32} />
              {product.discount > 0 && ( 
                <div className="text-white absolute top-2 bg-red-500 left-2 text-xs rounded-full px-2 py-1">-{product.discount}%</div>
              )}
            </div>
          )}
        </div>
        <div className='px-4 py-2 flex flex-col gap-0.5'>
          <span className='text-xs'>{product.brand}</span>
          <span className='text-sm overflow-hidden text-ellipsis whitespace-nowrap'>{product.name}</span>
          <div className='flex gap-1 items-center pb-0.5'>
            <div className='flex'>
              {Array.from({length:5}).map((i) => ( 
                <StarIcon key={i} className={i < Math.round(product.rating) ? "hidden": "fill-yellow-500 text-yellow-500"} size={12}/>
              ))}
              {/* <StarIcon size={10}/> */}
            </div>
            {/* <span className='text-xs'>{product.rating}</span>*/}
            <span className='text-xs'>
             {product.rating} ({product.sold_out})</span>
          </div>
          <div className='flex gap-2 items-center'>
            <div className="flex gap-2 items-center">
            <span className="text-blue-500 font-bold text-sm">
              {formatIDR(finalPrice)}
            </span>

            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatIDR(product.price)}
              </span>
            )}
          </div>
          </div>
        </div>
      </div>
    </Link>

  )
}