import { useAuth } from "@/hooks/useAuth";
import { formatDate, formatIDR } from "@/utils/format";
import { Download, Eye, Search } from "lucide-react";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_SERVER_URL

export default function DashboardOrderPage() { 
  const { user } = useAuth(); 
  const [orders, setOrders] = useState([]);
  useEffect(() => { 
    const fetchOrdeers = async () => { 
      try { 
        const res = await fetch(`${API}/users/orders`, { 
          headers: { Authorization: `Bearer ${user.token}` }
        })
        if (!res.ok) { 
          throw new Error("Failed to fetch data"); 
        }
        const data = await res.json(); 
        setOrders(data.results);
      } catch (error) { 
        console.log(error.message); 
     }
    }
    fetchOrdeers();
  }, [])

  console.log(orders)
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">Manajement Produk</h1>
        <button className="flex gap-2 items-center justify-center bg-blue-500 px-4 py-2 text-white text-sm rounded-xl">
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="flex gap-2 text-sm">
        <div className="rounded-lg border border-black/20 px-4 py-1">Semua</div>
        <div className="rounded-lg border border-black/20 px-4 py-1">Pending</div>
        <div className="rounded-lg border border-black/20 px-4 py-1">Dikirim</div>
        <div className="rounded-lg border border-black/20 px-4 py-1">Terkirim</div>
      </div>

      <div>
        <div className="rounded-xl flex gap-4 border border-black/20 py-2 px-4">
          <Search />
          <input type="text" placeholder="Cari nomer pesanan atau pelanggan" className="w-full outline-none"/>
        </div>
      </div>
      
      <table className="w-full text-sm">
        <thead className="border-b-2 border-b-black/20 border-t-2 border-t-black/20">
          <tr>
            <th className="text-left p-3">No Pesanan</th>
            <th className="text-left p-3">Pelanggan</th>
            <th className="text-left p-3">Tanggal</th>
            <th className="text-left p-3">Item</th>
            <th className="text-left p-3">Total</th>
            <th className="text-left p-3">Pembayaran</th>
            <th className="text-left p-3">Status</th>
          </tr>
        </thead>
      
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-black/10">
              <td className="p-3">
                #{order.id}
              </td>
        
              <td className="p-3">
                <div className="flex flex-col">
                  <span className="text-sm">{order.user.fullname}</span>
                  <span className="text-xs">{order.user.email}</span>
                </div>
              </td>
        
              <td className="p-3">
                <div className="flex flex-col">
                  <span className="text-md">{formatDate(order.created_at)}</span>
                </div>
              </td>
        
              <td className="p-3">{order.items.length}</td>
        
              <td className="p-3">{formatIDR(order.total_price)}</td>
        
              <td className="p-3">
                Gopay
              </td>
        
              <td className="p-3">
                <div className="flex gap-4 items-center">
                  <button className="text-blue-600">
                    <Eye size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  )
}