import { ArrowLeft, ArrowRight, EllipsisVertical, Heart, LogOut, MapPin, Search, Settings, ShoppingBag, ShoppingCart, Star, User } from "lucide-react"
import { MainLayout } from "../../components/layouts"
import { Link, Outlet, useNavigate } from "react-router"
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";

function MobileView({ user, listElement }) { 
  const [open, setOpen] = useState(false); 
  const [t, setT] = useState(false); 
  const navigate = useNavigate();
 console.log(open) 
  return ( 
    <div className="px-4 pt-4 flex-col flex gap-4">
      {t && ( 
        <div className="absolute inset-0 bg-white px-4 pt-4 flex flex-col gap-4">
          <div className="flex h-8 w-full gap-4 items-center">
            <div onClick={()=>setT(false)}><ArrowLeft/></div>
            <div className="flex items-center gap-2 border h-8 p-2 text-gray-500 rounded-lg w-full">
              <Search size={18}/>
              <input type="text" placeholder="Cari Transaksi" className="w-full h-full outline-none"/>
            </div>
            <div onClick={() => navigate('/cart')}><ShoppingCart/></div>
          </div>
          <div className="flex gap-2">
            <div className="rounded-full bg-black/5 px-2 text-sm py-1">Semua Status</div>
            <div className="rounded-full bg-black/5 px-2 text-sm py-1">Semua Status</div>
            <div className="rounded-full bg-black/5 px-2 text-sm py-1">Semua Status</div>
          </div>
          
          <div className="flex rounded-xl border p-2 gap-4 flex-col">
            <header className="flex justify-between w-full">
              <div className="flex gap-2 items-center">
                <div><ShoppingBag /></div>
                <div className="flex flex-col text-sm">
                  <span className="font-bold">Belanja</span>
                  <span className="font-light">9 Des 2024</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="text-sm"><span>Selesai</span></div>
                <div className="flex flex-col">
                  <EllipsisVertical/>
                </div>
              </div>
            </header>

            <main className="flex gap-2 items-center border-y py-2">
              <div className="w-12 h-12">
                <img src="/src/data/images/smart-watch.png" alt="" />
              </div>
              <div className="text-sm">
                <h3 className="font-bold">Smartwatch Fit Life v4</h3>
                <p className="text-xs">1 barang</p>
              </div>
            </main>

            <footer className="flex justify-between items-center">
              <div className="flex flex-col text-xs">
                <span>Total Belanja</span>
                <span className="text-sm font-bold">Rp10.199</span>
              </div>
              <div className="text-sm">Belanja Lagi</div>
            </footer>
          </div>
          
        </div>
      )}
      {open && ( 
        <div className="absolute inset-0 bg-white p-4 flex">
          <div className="flex flex-col gap-4">
            <div onClick={() => setOpen(false)} className="flex gap-4 items-center">
              <ArrowLeft size={18} />
              <span>Kembali</span>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <User />
                <div className="flex flex-col text-xs">
                  <span className="font-bold">Ubah Profile</span>
                  <span>Atur Indentitas dan photo profile kamu</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <User />
                <div className="flex flex-col text-xs">
                  <span className="font-bold">Ubah Profile</span>
                  <span>Atur Indentitas dan photo profile kamu</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <User />
                <div className="flex flex-col text-xs">
                  <span className="font-bold">Ubah Profile</span>
                  <span>Atur Indentitas dan photo profile kamu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <Settings onClick={() => setOpen(true)}/>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 border rounded-full"></div>
        <span className="font-bold">{user?.fullname}</span>
      </div>
      <div className="flex flex-col gap-4 border">
        <div className="font-bold flex justify-between">
          <h3>Transaksi</h3>
          <ArrowRight size={16}/> 
        </div>
        <div className="grid grid-cols-5 justify-center">
          {Array.from({ length: 5 }).map((a, i) => (
            <div key={i} className="flex flex-col items-center">
              <Star />
              <span className="text-xs font-medium">Ulasan</span>
            </div>
          ))}
        </div>
      </div>
      {listElement.map((list, i) => ( 
        <div key={i}>
          <div className="border border-blue-500 px-4 py-2" onClick={() => setT(true)}>{list.title}</div>
        </div>
      ))}
    </div>
  )
}

function DekstopView({ user, listElement }) { 
  return (
    <MainLayout>
    <div className="flex flex-row gap-8  px-4">
      <div className="w-1/5 flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-xl shadow-sm items-center justify-center bg-white border-black/20 border p-4">
          <div className="text-white text-2xl font-bold rounded-full w-16 h-16 bg-blue-500 flex justify-center items-center">{user.fullname?.[0]}</div>
          <div className="flex flex-col text-center pb-2 border-b border-b-black/20">
            <div className="font-medium">{user.fullname}</div>
            <div className="text-gray-500 text-sm">{user.email}</div>
          </div>
          <div className="flex gap-4 justify-center items-center ">
            <div className="text-center">
              {/* <div className="font-bold">{user.order?.length !== 0 ? 0 : user.order?.length}</div>*/}
              <div className="font-bold">{user.order?.length ?? 0}</div>
              <div className="text-xs">Pesanan</div>
            </div>
            <div className="text-center">
              <div className="font-bold">0</div>
              <div className="text-xs">Wishlist</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-black/20 shadow-sm flex flex-col gap-1">
          {listElement.map((item) => { 
            return(
            <Link onClick={item.action} key={item.href} to={item.href} className={`${item.color} flex items-center text-sm justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors`}>
              <div className="flex items-center gap-2">
                {item.icon} 
                <span>{item.title}</span>
              </div>
              <ArrowRight size={16}/>
            </Link>
            )
          })}
        </div>
      </div>
      <div className="flex-1">
        <Outlet/>
      </div>
      </div>
    </MainLayout>
  )
}

const API = import.meta.env.VITE_SERVER_URL

export default function ProfileLayout() { 
  const { user } = useAuth();
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const res = await fetch(`${API}/users/profile`, {
          headers: { Authorization: `Bearer ${user.token}`}
        })
        if (!res.ok) { 
          throw new Error("Failed fetch data user.")
        }
        const data = await res.json(); 
        setData(data.result);
      } catch (error) { 
        console.log(error);
      }
    }
    fetchData();
  }, [])

  console.log(data);

  const listElement = [
    {
      title: "Pesanan",
      href: "/profile",
      icon: <ShoppingBag size={16} />,
    },
    {
      title: "Wishlist",
      href: "/profile/wishlist",
      icon: <Heart size={16} />,
    },
    {
      title: "Alamat",
      href: "/profile/address",
      icon: <MapPin size={16} />,
    },
    {
      title: "Pengaturan",
      href: "/profile/setting",
      icon: <Settings size={16} />,
    },
    {
      title: "Keluar",
      href: "/profile/setting",
      icon: <LogOut size={16} />,
      color: 'text-red-500',
      action: (() => { 
        dispatch(logout(user))
      })
    },
  ];

  
  if (!user || !data) return null;

  return (
    <div>
      <div className="hidden md:block">
      <DekstopView listElement={listElement} user={data}/>
      </div>
      <div className="lg:hidden">
        <MobileView listElement={listElement} user={user}/>
      </div>
    </div>
  )
}