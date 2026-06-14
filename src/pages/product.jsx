import { Check, Truck, Heart, ShoppingCart, Star, } from 'lucide-react'
import { useParams } from 'react-router'
import { ProductService } from '@/services/product.service'
import { formatIDR } from '@/utils/format'
import { calculateDiscount } from '@/utils/calculate'
import { useState } from 'react'
import { MainLayout } from '@/components/layouts'
import { UserStorage } from '@/services/user.service'

export default function Product() {
  const params = useParams();
  const product = ProductService.getByName(params.name);
  const { finalPrice, save } = calculateDiscount(product.price, product.discount)
  const [ variant, setVariantSelect ] = useState(product.variant[0]);
  const [quantity, setQuantity] = useState(1);
  

  return (
    <div className="flex flex-col">
      <MainLayout>

      <div className='w-7xl m-auto flex-col gap-4 flex pt-4'>
        <div>Headphone Wireless Premium</div>
        <div className='flex flex-row gap-8'>
          <div className='w-1/2'>
            <div className='w-full'>
              <img src="/headphone.png" alt="headphone" className='rounded-xl w-full' />
            </div>
            <div>

            </div>
          </div>
          <div className='w-1/2 flex flex-col gap-4'>
            <div>
              <div className='flex gap-2'>
                <span>{product.brand}</span>
                <span>{product.category}</span>
              </div>
              <h1 className='text-2xl font-bold'>{product.name}</h1>
              <div>
                <div className='flex items-center gap-1 text-sm'>
                  <div className='flex'>
                    <Star size={14} />
                    <Star size={14} />
                    <Star size={14} />
                    <Star size={14} />
                    <Star size={14} />
                  </div>
                  <span>4.8</span>
                  <span>(512)</span>
                  <div className='flex gap-1 items-center bg-green-200 text-green-600 rounded-md px-2 py-0.5'>
                    <Check size={14} />
                    <span className='text-sm'>Tersedia (45)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-blue-200 p-4 flex rounded-xl flex-col gap-1'>
              <div className='flex items-center gap-4'>
                <span className='text-3xl font-bold text-blue-700'>{formatIDR(finalPrice)}</span>
                <span>{formatIDR(product.price)}</span>
                <div className='rounded-full bg-red-600 text-white px-2 py-0.5'>
                  <span>Hemat {product.discount}%</span>
                </div>
              </div>
              <div>
                <span className='text-green-600'>Kamu hemat {formatIDR(save)}</span>
              </div>
            </div>

            

            <div className='flex gap-2 flex-col'>
              <span>Variant: {variant}</span>
              <div className='flex gap-2'>
                {product.variant.map((set, index) => (
                  <button onClick={() => setVariantSelect(set)} value={set} className='border p-2 rounded-xl' key={index}>{set}</button>
                ))}
              </div>
            </div>

            <div className='flex gap-2 flex-col'>
              <span>Jumlah: {quantity}</span>
              <div className='border flex px-4 py-1 gap-4 rounded-xl items-center w-fit'>
                <button onClick={() => setQuantity(quantity - 1)} className='w-6 text-center'>-</button>
                <span className='w-6 text-center'>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className='w-6 text-center'>+</button>
              </div>
            </div>

            <div className='flex gap-2 w-full'>
                <button onClick={() => {
                  const item = { 
                    ...product, 
                    quantity, 
                    variant
                  }
                  console.log(item);
                  UserStorage.addCart(item)
              }} className='flex-1 gap-4 p-4 flex border border-orange-400  rounded-xl text-orange-400 items-center justify-center'>
                <ShoppingCart />
                <span>Tambah Keranjang</span>
              </button>
              <div className='flex-1 p-4 flex border border-orange-400  rounded-xl text-orange-400 items-center justify-center'>
                <span>Beli Sekarang</span>
              </div>
              <div className='flex justify-center items-center border border-black/20  p-4 rounded-xl'>
                <Heart />
              </div>
            </div>

            <div className='grid grid-cols-3 gap-2'>
              <div className='bg-gray-500/30 border-black/20 border rounded-xl flex flex-col items-center p-2'>
                <Truck size={16} className='text-blue-500' />
                <span className='text-xs'>Gratis Ongkir</span>
                <span className='text-xs'>Min. Rp 100.000</span>
              </div>
              <div className='bg-gray-500/30 border-black/20 border rounded-xl flex flex-col items-center p-2'>
                <Truck size={16} className='text-blue-500' />
                <span className='text-xs'>Gratis Ongkir</span>
                <span className='text-xs'>Min. Rp 100.000</span>
              </div>
              <div className='bg-gray-500/30 border-black/20 border rounded-xl flex flex-col items-center p-2'>
                <Truck size={16} className='text-blue-500' />
                <span className='text-xs'>Gratis Ongkir</span>
                <span className='text-xs'>Min. Rp 100.000</span>
              </div>

            </div>
            
          </div>
        </div>

        <section className='bg-white border border-black/20 rounded-xl'>
          <header className='flex gap-4 text-sm p-4 border-b'>
            <div>Deksripsi</div>
            <div>Spesifikasi</div>
            <div>Ulasan (2)</div>
          </header>

          <main className='p-6'>
            <p>Headphone wireless dengan teknologi noise-cancelling terdepan. Nikmati musik favoritmu tanpa gangguan dengan kualitas suara yang memukau.</p>
          </main>
        </section>
      </div>
      </MainLayout>
    </div>
  )
}
