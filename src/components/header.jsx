import { useAuth } from '@/hooks/useAuth';
import { Bell, User, Heart, ShoppingCart , MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

function Header() {
  const { user } = useAuth();
  // console.log(user);
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const search = form.get("search");
    navigate(`/browser-product/?search=${search}`)
  };

  return (
    <div className="w-full border-b border-b-black/20 shadow sticky top-0 z-10 bg-white">
      <div className="bg-blue-500 flex items-center w-full">
        <div className="w-7xl mx-auto text-white py-1 flex items-center gap-2">
          <MapPin size={11} />
          <span className='text-xs'>Kirim ke: Jakarta Selatan</span>
        </div>
      </div>

      <div className="w-full p-2 border-b border-black/20">
        <div className="max-w-7xl mx-auto py-1 flex gap-4 items-center justify-between">
          <Link to={'/'}>
            <div className="flex items-center gap-2">
              <div className="bg-blue-500 w-8 h-8 flex items-center justify-center rounded-md p-2 text-white">
                B
              </div>
              <span>BeliMudah</span>
            </div>
          </Link>

          <form onSubmit={handleSearch} className='w-full'>
            <div className="w-full border border-black/20 bg-black/5 rounded-xl flex items-center">
              <input
                name='search'
                className='w-full rounded-xl p-2'
                type="text"
                placeholder='Cari Produk, merek, kategori...'
              />
            </div>
          </form>

          <div className='flex gap-4 items-center'>
            {user ? (
              <>
                <Link to={'/profile'}><Bell size={20} /></Link>
                <Link className='flex gap-2 items-center w' to={'/profile'}><User size={20} /></Link>
                <Link to={'/profile'}><Heart size={20} /></Link>
                <Link className='relative' to={'/cart'}><ShoppingCart size={20}/>
                  {user.cart?.length > 0 && 
                    <span className='absolute -top-2 -right-2 text-xs bg-red-500 rounded-full w-4 h-4 text-center text-white'>{user.cart.length}</span>
                  }
                </Link>
              </>
            ) : (
                <>
                <Link to={"/sign-in"}>
                  <button className='cursor-pointer border border-blue-500 text-blue-500 rounded-xl py-1.5 px-4'>Masuk</button>
                </Link>

                <Link to={"/sign-up"}>
                  <button className='cursor-pointer bg-blue-500 text-white rounded-xl py-1.5 px-4'>Daftar</button>
                </Link>
                
              </>
            )}
          
            
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div className='w-7xl mx-auto py-1 flex items-center justify-center gap-12 text-sm'>
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
  );
}

export { Header };