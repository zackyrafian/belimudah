import { ShoppingCart } from "lucide-react";

export default function MainDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Selamat datang kembali! Ini ringkasan bisnis hari ini.
          </p>
        </div>

        <div className="text-sm text-gray-500">28 Mei 2026</div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-black/20 shadow-sm rounded-xl p-4 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Pesanan Baru</span>
              <div className="w-9 h-9 rounded-lg bg-orange-300 flex items-center justify-center">
                <ShoppingCart size={18}/>
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold">890</div>
              <div className="text-xs text-green-600">
                +12.5% dari bulan lalu
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white border border-black/20 shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Pendapatan & Pesanan (2026)</h2>
            <span className="text-sm text-gray-500">12 Bulan Terakhir</span>
          </div>

          <div className="mt-6">
            <img src="/dashboard/chart.svg" className="w-full" />
          </div>
        </div>

        <div className="bg-white border border-black/20 shadow-sm rounded-xl p-6">
          <h2 className="font-medium">Penjualan per Kategori</h2>

          <div className="mt-6 flex justify-center">
            <div className="w-40 h-40 rounded-full flex items-center justify-center">
              <img src="/dashboard/Group.svg" alt="" />
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>Lainnya</span>
              </div>
              <span className="text-gray-900">45%</span>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>Lainnya</span>
              </div>
              <span className="text-gray-900">45%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-black/20 shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Pesanan Terbaru</h2>
            <button className="text-sm text-blue-500">Lihat Semua</button>
          </div>
          <div className="mt-4 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-between border-b border-black/20 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">#BM98765432</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Terkirim
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Budi Santoso · 28 Mei 2026
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-600">Rp 900.000</div>
                  <div className="text-xs text-gray-500">2 item</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-black/20 shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Produk Terlaris</h2>
            <button className="text-sm text-gray-500">Kelola</button>
          </div>

        </div>
      </div>
    </div>
  );
}
