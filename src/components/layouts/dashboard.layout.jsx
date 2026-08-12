import { NavLink, Outlet, useNavigate, useLocation } from "react-router";
import { Bell, ChevronRight, LayoutDashboard, Package, Settings, ShoppingBag, User2Icon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userInfoAsync } from "@/features/auth/authThunks";

const sidebarList = [
  { name: "Dashboard", href: '/dashboard', icon: <LayoutDashboard size={16}/> },
  { name: "Produk", href: '/dashboard/product', icon: <Package size={16}/> },
  { name: "Pesanan", href: '/dashboard/order', icon: <ShoppingBag size={16}/> },
  { name: "Pelanggan", href: '/dashboard/customers', icon: <User2Icon size={16}/> },
  { name: "Pengaturan", href: '/dashboard/setting', icon: <Settings size={16}/> }
]

export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { auth, loading } = useSelector(state => state.auth);

  const currentPage = sidebarList.find(item =>
    item.href === '/dashboard'
      ? location.pathname === '/dashboard'
      : location.pathname.startsWith(item.href)
  )?.name || 'Dashboard';

  useEffect(() => {
    if (!auth?.role) {
      dispatch(userInfoAsync());
    }
  }, [dispatch, auth?.role])

  useEffect(() => {
    if (!loading && auth && auth.role !== "ADMIN") {
      navigate('/');
    }
  }, [auth, loading, navigate]);

  if (loading || !auth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-500">Memuat...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col min-h-screen">
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              B
            </div>
            <div>
              <div className="font-semibold text-sm leading-tight">BeliMudah</div>
              <div className="text-xs text-gray-400 leading-tight">Admin Panel</div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider px-3 mb-2">Menu</p>
          {sidebarList.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
              }
            >
              <span className={`shrink-0`}>{item.icon}</span>
              <span className="flex-1">{item.name}</span>
            </NavLink>
          ))}
        </div>

        <div className="px-3 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-xs shrink-0">
              {auth.fullname ? auth.fullname[0].toUpperCase() : 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">{auth.fullname || 'Admin'}</div>
              <div className="text-xs text-gray-400 truncate">{auth.email || 'admin@belimudah.id'}</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <nav className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Dashboard</span>
            {currentPage !== 'Dashboard' && (
              <>
                <ChevronRight size={14} className="text-gray-300" />
                <span className="font-medium text-gray-800">{currentPage}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={16} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
            </button>

            <div className="h-5 w-px bg-gray-200" />

            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-xs shrink-0">
                {auth.fullname ? auth.fullname[0].toUpperCase() : 'A'}
              </div>
              <div className="text-sm font-medium text-gray-700">{auth.fullname || 'Admin'}</div>
            </div>
          </div>
        </nav>

        <main className="flex-1 px-6 py-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
