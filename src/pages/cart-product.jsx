import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Clock, Heart, Shield, Star, StarIcon, Tag, Trash, Trash2, Zap } from 'lucide-react'

export default function CartPage() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className='w-7xl m-auto flex flex-col gap-4 pt-4'>
        <div className='text-2xl'>Keranjang Belanja</div>
        <div>
          <div className='flex gap-8'>
            <div className='flex w-full flex-col gap-4'>
              <div className='flex w-full bg-white border-black/20 border p-4 gap-4 rounded-xl'>
                <div className='w-24 h-24'>
                  <img className='rounded-xl' src="headphone.png" alt="headphone" />
                </div>
                <div className='flex flex-col gap-1 flex-1'>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>Headphone Wireless Premium</span>
                    <Trash2 size={16} />
                  </div>

                  <div>
                    <span>Hitam</span>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='border flex px-4 py-1 gap-4 rounded-xl items-center'>
                      <button className='w-6 text-center'>-</button>
                      <span className='w-6 text-center'>1</span>
                      <button className='w-6 text-center'>+</button>
                    </div>
                    <span>Rp 450.000</span>
                  </div>

                  <div className='flex items-center gap-1'>
                    <Heart size={16} />
                    <span>Simpan ke wishlist</span>
                  </div>
                </div>
              </div>


              <div className='flex flex-col w-full border-black/20 border bg-white p-4 gap-4 rounded-xl'>
                <div className='flex gap-2 items-center'>
                  <Tag size={16} />
                  <span>Kode Promo</span>
                </div>

                <div className='flex gap-2'>
                  <div className='flex-1 bg-black/15 rounded-xl border border-black/20'>
                    <input className='w-full px-4 py-3.5 rounded-xl' type="text" placeholder='Masukan kode promo' />
                  </div>
                  <button className='bg-blue-500 rounded-xl px-6 text-white'>Terapkan</button>
                </div>

              </div>
            </div>

            <div className='text-sm flex gap-4 flex-col w-[45%] bg-white p-4 rounded-xl border border-black/20'>
              <span className='text-xl font-semibold'>Ringkasan Pesanan</span>

              <div className='flex-col flex gap-2'>
                <div className='flex justify-between'>
                  <span>Subtotal 1(item)</span>
                  <span>Rp 450.000</span>
                </div>

                <div className='flex justify-between border-b border-b-black/20'>
                  <span>Ongkir Kirim</span>
                  <span>Gratis</span>
                </div>

                <div className='flex justify-between pt-2'>
                  <span>Total</span>
                  <span>Rp 450.000</span>
                </div>
              </div>

              <div className='bg-orange-500 gap-2 text-sm items-center flex justify-center p-4 text-white rounded-xl'>
                <Shield size={16}/>
                <span>Checkout Aman</span>
              </div>

              <div className='flex flex-col text-center text-sm'>
                <span>Pembayaran 100% Aman</span>
                <span> Metode: Transfer Bank · Virtual Account · Kartu Kredit · e-Wallet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
