import { Card } from "@/components";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";

export default function DashboardProductPage() { 
  return ( 
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <span className="text-xl">Manajement Produk</span>
        <div className="flex bg-orange-400 text-white px-4 py-2 rounded-xl gap-2"><Plus/><span>Tambah Produk</span></div>
      </div>
      <div className="p-4 bg-white flex justify-between shadow-sm border rounded-xl border-black/20 gap-2">
        <input className="py-2.5 px-4 flex-1 bg-black/5 border rounded-xl border-black/20" type="text" />
        <div className="flex gap-2.5">
          <div className="py-2.5 px-4 bg-white border border-black/20 rounded-xl">Semua Kategori</div>
          <div className="py-2.5 px-4 bg-white border-black/20 border rounded-xl">Filter</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="flex items-center justify-center flex-col">
            <div className="text-2xl font-bold">18</div>
            <div>Total Product</div>
          </Card>
        ))}
      </div>

      <div className="bg-white px-4 py-2 border border-black/20 shadow-sm rounded-xl flex flex-col gap-4">
        <div className="pt-4">18 Product</div>
        <table className="w-full">
          <thead className="border-b-2 border-b-black/20 border-t-2 border-t-black/20">
            <tr>
              <th className="text-left p-3">Produk</th>
              <th className="text-left p-3">Kategori</th>
              <th className="text-left p-3">Harga</th>
              <th className="text-left p-3">Stok</th>
              <th className="text-left p-3">Rating</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Aksi</th>
            </tr>
          </thead>
        
          <tbody>
            {Array.from({ length: 18 }).map((_, i) => (
              <tr key={i} className="border-t border-black/10">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                      <img src="/headphone.png" alt="" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Headphone Wireless Premium</span>
                      <span className="text-sm text-black/60">SoundWave</span>
                    </div>
                  </div>
                </td>
          
                <td className="p-3">Elektronik</td>
          
                <td className="p-3">
                  <div className="flex flex-col">
                    <span>Rp 450.000</span>
                    <span className="text-sm text-black/60 line-through">
                      Rp 650.000
                    </span>
                  </div>
                </td>
          
                <td className="p-3">45</td>
          
                <td className="p-3">4.8 (512)</td>
          
                <td className="p-3">
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-500">
                      Baru
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-orange-500">
                      Unggulan
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-500">
                      Promo
                    </span>
                  </div>
                </td>
          
                <td className="p-3">
                  <div className="flex gap-4 items-center">
                    <button className="text-blue-600">
                      <Eye size={15} />
                    </button>
                
                    <button className="text-blue-600">
                      <Edit size={15} />
                    </button>
                
                    <button className="text-blue-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      
    </div>
  )
}