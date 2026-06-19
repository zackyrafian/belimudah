import { Heart, Shield, Tag, Trash2 } from 'lucide-react'
import { UserStorage } from '@/services/user.service'
import { formatIDR } from '@/utils/format';
import { MainLayout } from '@/components/layouts';

export default function CartPage() {
  const { cart, total } = UserStorage.getCart();
  // const [ quantity , setQuantity ] = useState()
  return (
    <MainLayout className="flex flex-col">
      <div className='w-7xl m-auto flex flex-col gap-4 pt-4'>
        <div className='text-2xl'>Keranjang Belanja { total } Produk</div>
        <div>
          <div className='flex gap-8 items-start'>
            <div className='flex w-full flex-col gap-4'>
              {cart.product.map((product) => (
                <div className='shadow-sm flex w-full bg-white border-black/20 border p-4 gap-4 rounded-xl'>
                  <div className='w-24 h-24'>
                    <img className='rounded-xl' src={product.images[0]} alt="headphone" />
                  </div>
                  <div className='flex flex-col gap-1 flex-1'>
                    <div className='flex justify-between items-center'>
                      <span className='text-sm'>{product.name}</span>
                      <Trash2 size={16} />
                    </div>
  
                    <div>
                      <span>{product.variant}</span>
                    </div>
  
                    <div className='flex items-center justify-between'>
                      <div className='border flex px-4 py-1 gap-4 rounded-xl items-center'>
                        <button className='w-6 text-center'>-</button>
                        <span className='w-6 text-center'>{product.quantity}</span>
                        <button onClick={() => } className='w-6 text-center'>+</button>
                      </div>
                      <span>{ formatIDR(product.price)}</span>
                    </div>
  
                    <div className='flex items-center gap-1'>
                      <Heart size={16} />
                      <span>Simpan ke wishlist</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className='shadow-sm flex flex-col w-full border-black/20 border bg-white p-4 gap-4 rounded-xl'>
                <div className='flex gap-2 items-center'>
                  <Tag size={16} />
                  <span>Kode Promo</span>
                </div>

                <div className='flex gap-2'>
                  <div className='flex-1 bg-black/5 rounded-xl border border-black/20'>
                    <input className='w-full px-4 py-3.5 rounded-xl' type="text" placeholder='Masukan kode promo' />
                  </div>
                  <button className='bg-blue-500 rounded-xl px-6 text-white'>Terapkan</button>
                </div>

              </div>
            </div>

            <div className='shadow-sm text-sm flex gap-4 flex-col w-[45%] bg-white p-4 rounded-xl border border-black/20'>
              <span className='text-xl font-semibold'>Ringkasan Pesanan</span>

              <div className='flex-col flex gap-2'>
                <div className='flex justify-between'>
                  <span>Subtotal {total}(item)</span>
                  <span>{ 1 }</span>
                </div>

                <div className='flex justify-between border-b pb-4 border-b-black/20'>
                  <span>Ongkir Kirim</span>
                  <span>Gratis</span>
                </div>

                <div className='flex justify-between pt-2'>
                  <span>Total</span>
                  <span>Rp 450.000</span>
                </div>
              </div>

              <button onClick={() => location.href = "/checkout/address"} className='cursor-pointer bg-orange-500 gap-2 text-sm items-center flex justify-center p-4 text-white rounded-xl'>
                <Shield size={16}/>
                <span>Checkout Aman</span>
              </button>

              <div className='flex flex-col text-center text-sm'>
                <span>Pembayaran 100% Aman</span>
                <span> Metode: Transfer Bank · Virtual Account · Kartu Kredit · e-Wallet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </MainLayout>
  )
}
