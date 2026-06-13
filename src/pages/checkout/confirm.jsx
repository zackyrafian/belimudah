import { Shield } from "lucide-react";

export default function CheckoutConfirmPage () { 
  return ( 
    <div className="flex-col flex gap-4">
      <div>Konfirmasi Pesanan</div>

      <div className="p-4 flex flex-col bg-gray-200 rounded-xl">
        <span>Alamat Pengiriman</span>
        <span>Budi Santoso · 0812-3456-7890</span>
        <span>Jl. Kebon Jeruk No. 15, Jakarta Barat, DKI Jakarta 11530</span>
      </div>

      <div className="p-4 flex flex-col bg-gray-200 rounded-xl">
        <span>Metode Pengiriman</span>
        <span>JNE Regular 3-5 hari kerja</span>
      </div>
      <div className="p-4 flex flex-col gap-2 bg-gray-200 rounded-xl">
        <span>Produk yang di Pesan</span>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden"><img src="/headphone.png" alt="headphone" /></div>
            <div>
              <div>Headphone Wireless Premium</div>
              <div>x1</div>
            </div>  
          </div>
          <div>Rp 450.000</div>
        </div>
      </div>
      
      <div className="flex gap-4 items-center border rounded-xl py-2 p-4">
        <Shield size={28}/>
        <span className="text-sm">Dengan menekan "Bayar Sekarang", kamu menyetujui Syarat & Ketentuan kami. Pembayaran baru akan diproses setelah kamu mengkonfirmasi di langkah ini.</span>
      </div>

      <div className="flex gap-4">
        <div className="border w-30 text-center p-2 rounded-xl">Kembali</div>
        <div className="flex items-center border flex-1 justify-center p-2 rounded-xl">Bayar Rp 450.000 Sekarang</div>
      </div>
    </div>
  )
}