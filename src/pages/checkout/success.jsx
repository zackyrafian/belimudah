import { MainLayout } from "@/components/layouts"
import { Card } from "@/components"
import { MapPin, Truck, CircleCheckBig, ArrowRight } from "lucide-react"

export default function CheckoutSuccessPage() { 
  return (
    <MainLayout>
        <div className="min-h-screen flex gap-4 items-center justify-center flex-col">
        <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center">
          <CircleCheckBig size={48}/>
        </div>

        <div className="text-2xl">Pembayaran Berhasil</div>
        <span>Terima kasih telah berbelanja di BeliMudah. Pesananmu sedang diproses.</span>
        <Card className="w-160 p-8 flex flex-col gap-4">
          <div>
            <div className="flex justify-between">
              <span>Nomer Pesanan</span>
              <span>Total Pembayaran</span>
            </div>
            <div className="flex justify-between">
              <span>#BM28371132</span>
              <span>Rp 450.000</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-t-black/20 pt-4">
            <div className="flex gap-2">
              <div className="pt-1.5">
                <Truck size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm">JNE Regular</span>
                <span className="text-xs">Estimasi tiba: 2-3 Juni 2026</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="pt-1.5">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm">Alamat Pengiriman</span>
                <span className="text-xs">Jl. Kebon Jeruk No. 15, Jakarta Barat, DKI Jakarta 11530</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="w-160 p-8 flex flex-col gap-4">
          <h3 className="text-lg">Status Pesanan</h3>
          <div>
            <div className="flex gap-4 items-center">
              <div className="w-9 h-9 bg-green-200 flex items-center justify-center rounded-full p-2">
                <CircleCheckBig size={15} />
              </div>
              <div className="flex flex-col ">
                <span>Pesanan Diterima</span>
                <span>Baru saja</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-4 items-center">
              <div className="w-9 h-9 bg-green-200 flex items-center justify-center rounded-full p-2">
                <CircleCheckBig size={15} />
              </div>
              <div className="flex flex-col ">
                <span>Pesanan Diterima</span>
                <span>Baru saja</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-4 items-center">
              <div className="w-9 h-9 bg-green-200 flex items-center justify-center rounded-full p-2">
                <CircleCheckBig size={15} />
              </div>
              <div className="flex flex-col ">
                <span>Pesanan Diterima</span>
                <span>Baru saja</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex gap-4 items-center">
              <div className="w-9 h-9 bg-green-200 flex items-center justify-center rounded-full p-2">
                <CircleCheckBig size={15} />
              </div>
              <div className="flex flex-col ">
                <span>Pesanan Diterima</span>
                <span>Baru saja</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="w-160 flex gap-2">
          <div className="flex-1 rounded-xl bg-blue-500 text-white shadow-sm flex items-center justify-center p-3">Lacak Pesanan</div>
          <div className="flex-1 rounded-xl border border-black/20 shadow-sm flex items-center justify-center p-3">Lihat Riwayat Pesanan</div>
          <div className="flex-1 rounded-xl text-blue-500 flex items-center justify-center p-3 gap-2">
            <span>Lanjut Belanja</span>
            <ArrowRight size={14} className="pt-0.5 text-blue-500"/> 
          </div>
          
        </div>
        </div>
        
    </MainLayout>
  )
}