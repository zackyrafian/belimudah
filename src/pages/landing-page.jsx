import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { ArrowRight, Clock, StarIcon, Zap, TrendingUp } from 'lucide-react'
import { Link } from 'react-router'
import ProductCard from '@/components/product-card'
import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_SERVER_URL

export default function LandingPage() {
  const [products, setProducts] = useState([])
  console.log(products)

  useEffect(() => {
    fetch(`${API}/products`)
      .then(res => res.json())
      .then(json => setProducts(json.results || []))
      .catch(err => console.error(err))
  }, [])

  const productFlashDeal = products.filter((p) => p.discount > 10)

  const categoryMap = {}
  products.forEach(p => {
    if (!p.category) return
    categoryMap[p.category] = (categoryMap[p.category] || 0) + 1
  })
  const categories = Object.entries(categoryMap)
    .slice(0, 6)
    .map(([name, total]) => ({ name, total }))
  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex max-h-105 mb-4 bg-linear-to-r from-[#4F39F6] to-[#8200DB]">
        <div className=" flex-1 flex justify-end">
          <div className='max-w-160 text-white w-full flex justify-center flex-col p-4 gap-4'>
            <h1 className='text-[40px] font-bold'>Elektronik Pilihan, Harga <br/>
              Spesial</h1>
            <h3>Laptop, smartphone, headphone, dan masih banyak lagi <br/>
              dengan diskon hingga 40%</h3>
            <Link to='/browser-product' className='text-blue-500 flex px-4 py-3 bg-white w-fit rounded-xl items-center gap-2'>
              <span>Lihat Promo</span>
              <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
        <div className="bg-blue-500 opacity-30 flex-1 hidden lg:block">
          <img
            src="/hero-landing-page.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className='w-full lg:w-7xl m-auto flex flex-col gap-4 px-4'>
        <h3 className='text-xl'>Belanja Berdasarkan Kategori</h3>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {categories.map((category,index) => (
            <Link key={index} to={`/browser-product?category=${category.name.toLowerCase().replaceAll(' ', '-')}`}>
              <div className='bg-white border border-black/20 rounded-xl py-4 justify-center items-center flex flex-col gap-2'>
                <div className='w-14 h-14 rounded-xl flex justify-center m-auto'>
                  <img src="images-1.png" alt="elektronik" className='rounded-xl'/>
                </div>
                <div className='min-w-49.5 text-center flex flex-col items-center justify-center'>
                  <h3 className='text-sm'>{category.name}</h3>
                  <p className='text-xs'>{category.total} Produk</p>
                </div>
              </div>
            </Link>
              
          ))}

        </div>

        <section className='flex flex-col gap-4'>
          <header className='flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center'>
            <div className='flex bg-red-500 text-white rounded-lg px-3 sm:px-4 py-1.5 items-center gap-2 text-sm sm:text-base'>
              <Zap size={16}/>
              <span>Flash Deal</span>
            </div>
            <div className='flex items-center gap-2 text-xs sm:text-sm'>
              <Clock size={12} />
              <span>Berakhir dalam: 05 : 21 : 38</span>
            </div>
          </header>
          <div className='grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-3 sm:gap-4'>
            {productFlashDeal.map((p) => (
              <div key={p.id} className='transition-all duration-300 hover:scale-105 hover:shadow-xl'>
                <ProductCard product={p}/>
              </div>
            ))}
          </div>
        </section>
        

        <section className=''>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className="relative overflow-hidden rounded-xl min-h-40">
              <div className="absolute inset-0 bg-[url('/landing_page/running.png')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-black/40" />
            
              <div className="relative flex flex-col justify-center gap-2 p-4 h-full">
                <div className="flex flex-col">
                  <span className="text-sm text-white">Fashion Wanita</span>
                  <span className="text-xl text-white font-bold">Diskon 50%</span>
                </div>
            
                <button className="border border-white text-white text-sm rounded-lg px-3 py-1 max-w-max">
                  Belanja Sekarang
                </button>
              </div>
            </div>
            <div className='hidden lg:flex flex-col bg-[url(/landing_page/bag.png)] bg-linear-to-r from-blue-500 to-red-500 p-4 min-h-40 justify-center rounded-xl gap-2'>
              <div className='flex flex-col'>
                <span className='text-sm text-white'>Elektonik Pilihan</span>
                <span className='text-xl text-white font-bold'>Harga Terbaik</span>
              </div>
              <button className='border border-white text-white text-sm rounded-lg px-3 py-1 text max-w-max'>Lihat Produk</button>
            </div>
          </div>
        </section>


        <section className='flex flex-col gap-4'>
          <header className='flex gap-2'>
            <div className='flex text-black rounded-lg px-4 py-1.5 items-center gap-2'>
              {/* <Zap size={16}/>*/}
              <TrendingUp />
              <span>Produk Terbaru</span>
            </div>
          </header>

          <div className='grid grid-cols-4 gap-4'>
            <div className='flex flex-col rounded-xl border border-black/20  overflow-hidden'>
              <div>
              <img src="headphone.png" alt="headphone" />
              </div>
              <div className='p-4 flex flex-col'>
                <span className='text-xs'>SoundWave</span>
                <span className='text-sm'>Headphone WireLess Premium</span>
                <div className='flex gap-1 items-center'>
                  <div className='flex'>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                  </div>
                  <span className='text-sm'>4.8</span>
                  <span className='text-sm'>(512)</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <span className='text-sm text-blue-500 font-bold'>Rp 450.000</span>
                  <span className='text-xs'>Rp 650.000</span>
                </div>
              </div>
              
            </div>

             <div className='flex flex-col rounded-xl border border-black/20  overflow-hidden'>
              <div>
              <img src="headphone.png" alt="headphone" />
              </div>
              <div className='p-4 flex flex-col'>
                <span className='text-xs'>SoundWave</span>
                <span className='text-sm'>Headphone WireLess Premium</span>
                <div className='flex gap-1 items-center'>
                  <div className='flex'>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                  </div>
                  <span className='text-sm'>4.8</span>
                  <span className='text-sm'>(512)</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <span className='text-sm text-blue-500 font-bold'>Rp 450.000</span>
                  <span className='text-xs'>Rp 650.000</span>
                </div>
              </div>
              
            </div>

             <div className='flex flex-col rounded-xl border border-black/20  overflow-hidden'>
              <div>
              <img src="headphone.png" alt="headphone" />
              </div>
              <div className='p-4 flex flex-col'>
                <span className='text-xs'>SoundWave</span>
                <span className='text-sm'>Headphone WireLess Premium</span>
                <div className='flex gap-1 items-center'>
                  <div className='flex'>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                  </div>
                  <span className='text-sm'>4.8</span>
                  <span className='text-sm'>(512)</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <span className='text-sm text-blue-500 font-bold'>Rp 450.000</span>
                  <span className='text-xs'>Rp 650.000</span>
                </div>
              </div>
              
            </div>

             <div className='flex flex-col rounded-xl border border-black/20  overflow-hidden'>
              <div>
              <img src="headphone.png" alt="headphone" />
              </div>
              <div className='p-4 flex flex-col'>
                <span className='text-xs'>SoundWave</span>
                <span className='text-sm'>Headphone WireLess Premium</span>
                <div className='flex gap-1 items-center'>
                  <div className='flex'>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                    <StarIcon size={10}/>
                  </div>
                  <span className='text-sm'>4.8</span>
                  <span className='text-sm'>(512)</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <span className='text-sm text-blue-500 font-bold'>Rp 450.000</span>
                  <span className='text-xs'>Rp 650.000</span>
                </div>
              </div>
              
            </div>

          </div>
        </section>

        <section className='hidden lg:block transition-all duration-300'>
          <div className='flex flex-col items-center bg-white border border-black/20 p-8 justify-center rounded-xl gap-6'>
            <div>
              <h1 className='text-xl'>Kenapa Belanja diBeliMudah?</h1>
            </div>
            <div className='grid grid-cols-4 gap-4'>
              <div className='flex flex-col items-center justify-center text-center gap-2'>
                <div className='text-3xl'>🚚</div>
                <div>
                  <h2>Gratis Ongkir</h2>
                  <p className='text-sm text-gray-500'>Pembelian di atas Rp 100.000 gratis ongkir keseluruh Indonesia</p>
                </div>
              </div>

              <div className='flex flex-col items-center justify-center text-center gap-2'>
                <div className='text-3xl'>🚚</div>
                <div>
                  <h2>Gratis Ongkir</h2>
                  <p className='text-sm text-gray-500'>Pembelian di atas Rp 100.000 gratis ongkir keseluruh Indonesia</p>
                </div>
              </div>

              <div className='flex flex-col items-center justify-center text-center gap-2'>
                <div className='text-3xl'>🚚</div>
                <div>
                  <h2>Gratis Ongkir</h2>
                  <p className='text-sm text-gray-500'>Pembelian di atas Rp 100.000 gratis ongkir keseluruh Indonesia</p>
                </div>
              </div>

              <div className='flex flex-col items-center justify-center text-center gap-2'>
                <div className='text-3xl'>🚚</div>
                <div>
                  <h2>Gratis Ongkir</h2>
                  <p className='text-sm text-gray-500'>Pembelian di atas Rp 100.000 gratis ongkir keseluruh Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div>

        </div>
      </div>

      <Footer/>
    </div>
  )
}
