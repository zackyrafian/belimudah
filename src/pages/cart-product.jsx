import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { Clock, Star, StarIcon, Zap } from 'lucide-react'

export default function CartPage(){
  return (
    <div className="flex flex-col">
      <Header />

      <div className='w-7xl m-auto flex flex-col gap-4'>
          <div>Keranjang Belanja</div>
          <div></div>
      </div>

      <Footer/>
    </div>
  )
}
