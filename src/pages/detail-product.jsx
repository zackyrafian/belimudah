import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Check, Truck, Heart, ShoppingCart, Star, } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function DetailPage() {
  const { user } = useAuth();
  console.log(user)
  return (
    <div className="flex flex-col">
      <Header />

      <div className='w-7xl m-auto flex-col gap-4 flex pt-4'>
        <div>Headphone Wireless Premium</div>
        <div className='flex flex-row gap-8'>
          <div className='w-1/2'>
            <div className='w-full'>
              <img src="headphone.png" alt="headphone" className='rounded-xl w-full' />
            </div>
            <div>

            </div>
          </div>
          <div className='w-1/2 flex flex-col gap-2'>
            <div>
              <div className='flex gap-2'>
                <span>SoundWare</span>
                <span>Audio</span>
              </div>
              <h1 className='text-2xl font-bold'>Headphone Wireless Premium</h1>
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
                <span className='text-3xl font-bold text-blue-700'>Rp 450.000</span>
                <span>Rp 650.000</span>
                <div className='rounded-full bg-red-600 text-white px-2 py-0.5'>
                  <span>Hemat 31%</span>
                </div>
              </div>
              <div>
                <span className='text-green-600'>Kamu hemat Rp 200.000</span>
              </div>
            </div>

            <div className='flex gap-2 w-full'>
              <div className='flex-1 gap-4 p-4 flex border border-orange-400  rounded-xl text-orange-400 items-center justify-center'>
                <ShoppingCart />
                <span>Tambah Keranjang</span>
              </div>
              <div className='flex-1 p-4 flex border border-orange-400  rounded-xl text-orange-400 items-center justify-center'>
                <span>Beli Sekarang</span>
              </div>
              <div className='flex justify-center items-center border border-black/20  p-4 rounded-xl'>
                <Heart />
              </div>
            </div>

            <div>
              <span>Warna</span>
              <input type="" />
            </div>

            <div>
              <span>Jumlah</span>
              <input type="" />
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
      <Footer />
    </div>
  )
}
