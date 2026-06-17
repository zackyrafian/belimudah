import { StarIcon } from "lucide-react";
import { Link } from "react-router";
import { formatIDR } from "@/utils/format";
import { ImageOff } from 'lucide-react'

export default function ProductCard({product}) { 
  return ( 
    <Link  to={`/product/${product.name.toLowerCase().replaceAll(" ", "-")}`}>
      <div className='bg-white flex flex-col rounded-xl border border-black/20  overflow-hidden'>
        <div>
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} />
          ) : (
            <div className="w-full min-h-58.75 flex items-center justify-center bg-gray-100 text-gray-400">
              <ImageOff size={32} />
            </div>
          )}
        </div>
        <div className='p-4 flex flex-col'>
          <span className='text-xs'>{product.brand}</span>
          <span className='text-sm overflow-hidden text-ellipsis whitespace-nowrap'>{product.name}</span>
          <div className='flex gap-1 items-center'>
            <div className='flex'>
              <StarIcon size={10}/>
              <StarIcon size={10}/>
              <StarIcon size={10}/>
              <StarIcon size={10}/>
              <StarIcon size={10}/>
            </div>
            <span className='text-sm'>{product.rating}</span>
            <span className='text-sm'>
             {product.ratting} ({product.total_review})</span>
          </div>
          <div className='flex gap-2 items-center'>
            <span className='text-sm text-blue-500 font-bold'>{formatIDR(product.price)}</span>
            <span className='text-xs'>{formatIDR(product.price)}</span>
          </div>
        </div>
      </div>
    </Link>

  )
}