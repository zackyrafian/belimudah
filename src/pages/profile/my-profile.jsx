import { Card } from "../../components";
import { ProfileLayout } from "../../components/layouts";

export default function MyProfile () { 
  return (
    <ProfileLayout> 
      <div>
        <span className="text-2xl">Pesanan Saya</span>
        <Card className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-bold">#BM98765432</span>
              <span className="text-xs">20 Mei 2026</span>
            </div>
            <div>Terkirim</div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden">
              <img src="/headphone.png" alt="headphone" />
            </div>
            <div className="flex flex-col">
              <span>Headphone Wireless Premium</span>
              <span>x1 Rp 450.000</span>
            </div>
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <div>Total Rp 450.000</div>
            <div className="flex gap-4">
              <button className="border border-blue-500 rounded-xl py-2 px-4">Lacak</button>
              <button className="border border-blue-500 rounded-xl py-2 px-4">Beri Ulasan</button>
              <button className="border border-blue-500 rounded-xl py-2 px-4">Beli Lagi</button>
            </div>
          </div>
        </Card>
      </div>
    </ProfileLayout>
  )
}