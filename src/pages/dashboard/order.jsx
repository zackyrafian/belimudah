import { Download, Search } from "lucide-react";

export default function DashboardOrderPage() { 
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">Manajement Produk</h1>
        <button className="flex gap-2 items-center justify-center bg-blue-500 px-4 py-2 text-white text-sm rounded-xl">
          <Download size={18} />
          Export
        </button>
      </div>

      <div className="flex gap-2">
        <div className="rounded-xl border border-black/20 px-4 py-1">Semua</div>
        <div className="rounded-xl border border-black/20 px-4 py-1">Pending</div>
        <div className="rounded-xl border border-black/20 px-4 py-1">Dikirim</div>
        <div className="rounded-xl border border-black/20 px-4 py-1">Terkirim</div>
      </div>

      <div>
        <div className="rounded-xl flex gap-4 border border-black/20 py-2 px-4">
          <Search />
          <input type="text" placeholder="Cari nomer pesanan atau pelanggan" className="w-full outline-none"/>
        </div>
      </div>
    </div>
  )
}