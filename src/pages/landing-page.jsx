import { Header } from '../components/header'
import { Footer } from '../components/footer'

export default function LandingPage(){
  return (
    <div className="flex flex-col">
      <Header />

      <div className='w-7xl m-auto'>
        <div className='flex gap-4 '>

          <div className='bg-white border border-black/20 rounded-xl px-16 py-4 justify-center items-center flex flex-col'>
            <div className='w-14 h-14 rounded-xl flex justify-center m-auto'>
              <img src="images-1.png" alt="elektronik" className='rounded-xl'/>
            </div>
            <div>
              <h3 className=''>Elektornik</h3>
              <p>7 produk</p>
            </div>

          </div>

        </div>
      </div>

      <Footer/>
    </div>
  )
}
