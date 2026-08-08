import { Link, Outlet, useNavigate } from "react-router";
import { Bell, LayoutDashboard, Package, Settings, SquareRoundCorner, User2Icon, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const sidebarList = [
  {
    name: "Dashboard",
    href: '',
    icon: <LayoutDashboard size={18}/>
  },
  {
    name: "Produk", 
    href: 'product',
    icon: <Package size={18}/>
  }, 
  { 
    name: "Pesanan", 
    href: 'order', 
    icon: <SquareRoundCorner size={18}/>
  }, 
  { 
    name: "Pelanggan", 
    href: 'customers',
    icon: <User2Icon size={18}/>
    
  }, 
  { 
    name: "Pengaturan", 
    href: 'setting',
    icon: <Settings size={18}/>
  }
]

const API = import.meta.env.VITE_SERVER_URL

export default function DashboardLayout() {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [userInfo, setUserInfo] = useState(); 
  useEffect(() => { 
    const fetchUser = async () => { 
      try { 
        const res = await fetch(`${API}/users/info`, { 
          headers: { Authorization: `Bearer ${user.token}` }
        })
        if (!res.ok) { 
          throw new Error("Failed fetch user"); 
        }
        const data = await res.json(); 
        setUserInfo(data.result);
      } catch (error) { 
        console.log(error.message)
      }
    }
    fetchUser();
  }, [])
  console.log(userInfo)

  if (userInfo?.role !== "ADMIN") { 
    navigate('/')
    console.log("BUKAN ADMIN")
  };
  return ( 
    <div className="flex min-h-screen ">
      <aside className="min-w-1/7 p-4 border-r border-r-black/20 shadow-sm min-h-screen flex-col flex gap-8">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center">B</div>
          <span>BeliMudah</span>
        </div>

        <div className="flex flex-col px-2 gap-4">
          {sidebarList.map((item) => (
            <Link to={item.href} className="flex items-center gap-4 rounded-xl py-1.5 text-sm font-medium">
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </aside>

      <div className="flex-1 flex-items items-center">
        <nav className="flex items-center px-6 py-4 justify-between border-b border-b-black/20 shadow-sm">
          <div className="flex items-center gap-4">
            <X size={18}/>
            <div>Admin</div>
          </div>
          <div className="flex items-center gap-4">
            <Bell size={18}/>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500/20">B</div>
            <div>Admin</div>
          </div>
        </nav>
        <div className="px-6 py-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}