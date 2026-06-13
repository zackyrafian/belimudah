import { StarIcon } from "lucide-react";

export default function ProductCard({product}) { 
  return ( 
    <div className='bg-white flex flex-col rounded-xl border border-black/20  overflow-hidden'>
      <div>
      <img src="headphone.png" alt="headphone" />
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
          <span className='text-sm'>{product.total_review}</span>
        </div>
        <div className='flex gap-2 items-center'>
          <span className='text-sm text-blue-500 font-bold'>{product.price}</span>
          <span className='text-xs'>{product.price}</span>
        </div>
      </div>
    </div>
  )
}