import { Bell, User, Heart, ShoppingCart , MapPin } from 'lucide-react';
import { Link } from 'react-router';

function Header() {
  return (
    <div className="w-full border-b border-b-black/20 shadow">
      <div className="bg-blue-500 flex items-center w-full">
        <div className="w-7xl mx-auto text-white py-1 flex items-center gap-2">
          <MapPin size={11} />
          <span>Kirim ke: Jakarta Selatan</span>
        </div>
      </div>

      <div className="w-full p-2 border-b border-black/20">
        <div className="max-w-7xl mx-auto py-1 flex gap-4 items-center justify-between">
            <Link to={'/'}>
              <div className="flex items-center gap-2">
                <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md p-2 text-white">B</div>
                <span>BeliMudah</span>
              </div>
            </Link>
            <div className="w-full border border-black/20 bg-black/5 rounded-xl flex items-center">
              <input className='w-full rounded-xl p-2' type="text" placeholder='Cari Produk, merek, kategori...' />
            </div>
            <div className='flex gap-4'>
              <Link to={'/profile'}><Bell size={20}/></Link>
              <Link to={'/profile'}><User size={20} /></Link>
              <Link to={'/profile'}><Heart size={20}/></Link>
              <Link to={'/cart'}><ShoppingCart to size={20}/></Link>
            </div>
        </div>
      </div>

      <div className='w-full'>
        <div className='w-7xl mx-auto py-1 flex items-center justify-center gap-12'>
          <div>
            <span>Semua Category</span>
          </div>
          <span>Elektornik</span>
          <span>Fashion</span>
          <span>Rumah & Dapur</span>
          <span>Kecantikan</span>
          <span>Olahraga</span>
          <span>Buku & Alamat Tulis</span>
          <span>Promo</span>
        </div>
      </div>
    </div>
  )
}

export { Header };
