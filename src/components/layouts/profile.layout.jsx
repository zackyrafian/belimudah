import { ArrowRight, Heart, LogOut, MapPin, Settings, ShoppingBag } from "lucide-react"
import { MainLayout } from "../../components/layouts"
import { Link, Outlet } from "react-router"


const listElement = [
  {
    title: "Pesanan Saya",
    href: "/profile",
    icon: <ShoppingBag size={16} />,
  },
  {
    title: "Wishlist",
    href: "/profile/wishlist",
    icon: <Heart size={16} />,
  },
  {
    title: "Alamat Saya",
    href: "/profile/address",
    icon: <MapPin size={16} />,
  },
  {
    title: "Pengaturan Profile",
    href: "/profile/setting",
    icon: <Settings size={16} />,
  },
  {
    title: "Keluar",
    href: "/profile/setting",
    icon: <LogOut size={16} />,
  },
];

export default function ProfileLayout() { 
  return (
    <MainLayout>
      <div className="flex flex-row gap-8">
        <div className="w-1/5 flex flex-col gap-4">
          <div className="flex flex-col gap-2 rounded-xl shadow-sm items-center justify-center bg-white border-black/20 border p-4">
            <div className="rounded-full w-16 h-16 bg-blue-500 flex justify-center items-center">B</div>
            <div>Budi Santoso</div>
            <div>budi@email.com</div>
          </div>

          <div className="bg-white rounded-xl border border-black/20 shadow-sm flex flex-col gap-1">
            {listElement.map((item) => { 
              return(
              <Link key={item.href} to={item.href} className="flex items-center text-sm justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors">
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