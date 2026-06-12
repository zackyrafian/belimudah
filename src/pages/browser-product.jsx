import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Clock, Star, StarIcon, Zap } from 'lucide-react'

export default function LandingPage(){
  return (
    <div className="flex flex-col">
      <Header />

      <div className='w-7xl m-auto flex flex-row gap-8'>
        <aside className='w-1/4 flex flex-col gap-4'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-xl font-semibold'>Harga</h3>
            <div className='flex justify-between'>
              <span>Rp 0</span>
              <span>Rp 20.000.000</span>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <h3 className='text-xl font-semibold'>Merek</h3>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-2 items-center'>
              <input type="checkbox" />
              <span>TechMaster</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" />
                <span>TechMaster</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" />
                <span>TechMaster</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" />
                <span>TechMaster</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" />
                <span>TechMaster</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" />
                <span>TechMaster</span>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <h3 className='text-xl font-semibold'>Rating Minimum</h3>
            
            <div className='flex flex-col gap-1'>
              <div className='flex gap-2 items-center'>
                <input type="radio" />
                <div className='flex items-center gap-1'>
                  <div className='flex'>
                    <Star size={12}/>
                    <Star size={12}/>
                    <Star size={12}/>
                    <Star size={12}/>
                  </div>
                  <span>ke atas</span>
                </div>
              </div>

              <div className='flex gap-2 items-center'>
                <input type="radio" />
                <div className='flex items-center gap-1'>
                  <div className='flex'>
                    <Star size={12}/>
                    <Star size={12}/>
                    <Star size={12}/>
                    <Star size={12}/>
                  </div>
                  <span>ke atas</span>
                </div>
              </div>
            </div>
          </div>


          <div className='flex flex-col gap-4'>
            <h3 className='text-xl font-semibold'>Keserdiaan</h3>
            
            <div className='flex flex-col gap-1'>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" />
                <div>
                  <span>Stok tersedia</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className='w-3/4'>
          <span>18 produk ditemukan</span>
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
      </div>

      {/* <div className='w-7xl m-auto flex flex-col gap-4'>

        <div className='flex gap-4'>
          <div className='bg-white border border-black/20 rounded-xl px-16 py-4 justify-center items-center flex flex-col gap-2'>
            <div className='w-14 h-14 rounded-xl flex justify-center m-auto'>
              <img src="images-1.png" alt="elektronik" className='rounded-xl'/>
            </div>
            <div>
              <h3 className=''>Elektornik</h3>
              <p>7 produk</p>
            </div>
          </div>

        </div>

        <section className='flex flex-col gap-4'>
          <header className='flex gap-2'>
            <div className='flex bg-red-500 text-white rounded-lg px-4 py-1.5 items-center gap-2'>
              <Zap size={16}/>
              <span>Flash Deal</span>
            </div>
            <div className='flex items-center gap-2'>
              <Clock size={12} />
              <span>Berakhir dalam: 05 : 21 : 38</span>
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

        <section>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col bg-red-500 p-4 min-h-40 justify-center rounded-xl gap-2'>
              <div className='flex flex-col'>
                <span className='text-sm'>Fashtion Wanita</span>
                <span className='text-xl text-white font-bold'>Diskon 50%</span>
              </div>
              <button className='border border-white text-white text-sm rounded-xl px-3 py-1 text max-w-max'>Belanja Sekarang</button>
            </div>
            <div className='flex flex-col bg-red-500 p-4 min-h-40 justify-center rounded-xl gap-2'>
              <div className='flex flex-col'>
                <span className='text-sm'>Elektonik Pilihan</span>
                <span className='text-xl text-white font-bold'>Harga Terbaik</span>
              </div>
              <button className='border border-white text-white text-sm rounded-xl px-3 py-1 text max-w-max'>Lihat Produk</button>
            </div>
          </div>
        </section>

        <section>
          <div className='flex flex-col items-center bg-white p-8 justify-center rounded-xl gap-6'>
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
      </div> */}

      <Footer/>
    </div>
  )
}
