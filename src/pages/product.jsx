import { Check, Truck, Heart, ShoppingCart, Star, ImageOff, ArrowRight, ChevronRight} from 'lucide-react'
import { Link, useParams } from 'react-router'
import { ProductService } from '@/services/product.service'
import { formatIDR } from '@/utils/format'
import { calculateDiscount } from '@/utils/calculate'
import { useState } from 'react'
import { MainLayout } from '@/components/layouts'
import { UserStorage } from '@/services/user.service'
import Alert from '@/components/ui/alert'
import ProductCard from '@/components/product-card'

export default function Product() {
  const [alert, setAlert] = useState(null);
  const params = useParams();
  const product = ProductService.getByName(params.name);

  const discount = Number(product.discount) || 0;
  const hasDiscount = discount > 0;

  const { finalPrice, save } = hasDiscount
    ? calculateDiscount(product.price, discount)
    : {
        finalPrice: product.price,
        save: 0,
      };

  const [ variant, setVariantSelect ] = useState(product.variant[0]);
  const [quantity, setQuantity] = useState(1);
  

  return (
    <div className="flex flex-col">
      {alert && (
        <Alert
          key={alert.id}
          title="Product"
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <MainLayout>
      <div className='w-7xl m-auto flex-col gap-4 flex pt-4'>
        <div className='text-sm text-black'>
          <Link className='flex items-center gap-2' to={'/'}>Beranda<ChevronRight size={16} />
            <Link to={`/browser-product?category=${product.category}`} className='flex items-center gap-2'>{product.category}<ChevronRight size={16} />
              <Link className='flex items-center gap-2 font-bold'>{product.name}</Link>
            </Link>
          </Link>
        </div>
        <div className='flex flex-row gap-8'>
          <div className='w-1/2'>
              <div className='w-full'>
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} className='rounded-xl w-full' />
                ) : 
                <div className="w-full min-h-156 rounded-xl flex items-center justify-center bg-gray-200 text-gray-400 hover">
                  <ImageOff size={32} />
                </div>
                }
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
                <span className='text-3xl font-bold text-blue-700'>
                  {formatIDR(finalPrice)}
                </span>

                {hasDiscount && (
                  <div className='flex gap-2'>
                    <span>{formatIDR(product.price)}</span>
                    <div className='rounded-full bg-red-600 text-white px-2 py-0.5 flex items-center'>
                      <span className='text-xs'>Hemat {discount}%</span>
                    </div>
                  </div>
                )}
              </div>

              {hasDiscount && (
                <div>
                  <span className='text-green-600'>
                    Kamu hemat {formatIDR(save)}
                  </span>
                </div>
              )}
            </div>

            <div className='flex gap-2 flex-col'>
              <span>Variant: {variant}</span>
              <div className='flex gap-2'>
                {product.variant.map((set, index) => {
                  const isActive = variant === set;
                
                  return (
                    <button
                      key={index}
                      onClick={() =>
                        setVariantSelect(set)}
                      className={`
                        px-4 py-2 rounded-xl border transition-all duration-200
                        ${isActive 
                          ? ' text-blue-500 border-blue-500 bg-white-500 scale-[1.02]' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-500'
                        }
                        active:scale-95
                      `}
                    >
                      {set}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className='flex gap-2 flex-col'>
              <span>Jumlah: {quantity}</span>
              <div className='border border-black/20 flex px-4 py-1 gap-4 rounded-xl items-center w-fit'>
                <button onClick={() => setQuantity(quantity - 1)} className='w-6 text-center cursor-pointer'>-</button>
                <span className='w-6 text-center'>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className='w-6 text-center cursor-pointer'>+</button>
              </div>
            </div>

            <div className='flex gap-2 w-full'>
                <button onClick={() => {
                  const item = { 
                    ...product, 
                    quantity, 
                    variant
                  }
                  setAlert({ 
                    id: Date.now(),
                    type: "success", 
                    message: `Successfully added ${product.name} to your cart.`
                  })
                  // console.log(item);
                  UserStorage.addCart(item)
              }} className='flex-1 gap-4 p-4 flex border-2 border-orange-400  rounded-xl text-orange-400 items-center justify-center'>
                <ShoppingCart size={18}/>
                <span className='font-semibold'>Tambah Keranjang</span>
              </button>
              <div className='flex-1 p-4 flex border border-orange-400 bg-orange-400  rounded-xl text-white items-center justify-center'>
                <span>Beli Sekarang</span>
              </div>
              <div className='flex justify-center items-center border-2 border-black/20  p-4 rounded-xl'>
                <Heart />
              </div>
            </div>

            <div className='grid grid-cols-3 gap-2'>
              <div className='bg-gray-200/30 border-black/20 border rounded-xl flex flex-col gap-2 items-center p-2'>
                <Truck size={18} className='text-blue-500' />
                <div className='flex flex-col text-center'>
                  <span className='text-xs'>Gratis Ongkir</span>
                  <span className='text-xs'>Min. Rp 100.000</span>
                </div>
              </div>
              <div className='bg-gray-200/30 border-black/20 border rounded-xl flex flex-col gap-2 items-center p-2'>
                <Truck size={18} className='text-blue-500' />
                <div className='flex flex-col text-center'>
                  <span className='text-xs'>Gratis Ongkir</span>
                  <span className='text-xs'>Min. Rp 100.000</span>
                </div>
              </div>
              <div className='bg-gray-200/30 border-black/20 border rounded-xl flex flex-col gap-2 items-center p-2'>
                <Truck size={18} className='text-blue-500' />
                <div className='flex flex-col text-center'>
                  <span className='text-xs'>Gratis Ongkir</span>
                  <span className='text-xs'>Min. Rp 100.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className='bg-white border border-black/20 rounded-xl'>
          <header className='flex gap-4 text-sm p-4 border-b border-b-black/20'>
            <div>Deksripsi</div>
            <div>Spesifikasi</div>
            <div>Ulasan (2)</div>
          </header>

          <main className='p-6 flex flex-col gap-4'>
            <h2 className='font-medium text-xl'>{product.name}</h2>
            <div className='flex flex-col'>
              <span> Brand: {product.brand} </span>
              <span>Category: {product.category}</span>
            </div>
            <p className='text-justify'>{product.description}</p>
          </main>
        </section>

        <section className='flex gap-4 flex-col'>
          <h1 className='text-2xl font-medium'>Product Terkait</h1>
          <div className='grid grid-cols-4 gap-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
          
        </section>
      </div>
      </MainLayout>
    </div>
  )
}