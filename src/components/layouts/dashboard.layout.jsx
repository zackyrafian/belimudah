import { Link, Outlet } from "react-router";
import { Bell, LayoutDashboard, X } from "lucide-react";

const sidebarList = [
  {
    name: "Dashboard",
    href: '',
  },
  {
    name: "Produk", 
    href: 'product'
  }, 
  { 
    name: "Pesanan", 
    href: 'order'
  }, 
  { 
    name: "Pelanggan", 
    href: 'user'
  }, 
  { 
    name: "Pengaturan", 
    href: 'setting'
  }
]

export default function DashboardLayout() { 
  return ( 
    <div className="flex min-h-screen">
      <aside className="min-w-1/7 p-4 border-r shadow-sm min-h-screen flex-col flex gap-8">
        <div className="flex gap-2 items-center justify-center">
          <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center">B</div>
          <span>BeliMudah Admin</span>
        </div>

        <div className="flex flex-col px-2 gap-4">
          {sidebarList.map((item) => (
            <Link to={item.href} className="flex items-center gap-4 border rounded-xl px-4 py-1.5">
              <LayoutDashboard/>
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