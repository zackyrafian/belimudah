import { UserStorage } from "@/services/user.service";
import { formatIDR } from "@/utils/format";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router";
import { PackageCheck } from 'lucide-react'

export default function CheckoutConfirmPage() {
  const checkout = UserStorage.getUser().checkout;
  const navigate = useNavigate();
  const handleForm = () => { 
    UserStorage.createOrder(checkout);
    UserStorage.clearCheckout();

    navigate('/checkout/success')
  }
  return ( 
    <form onSubmit={handleForm} className="flex-col flex gap-4">
      <div className="flex items-center gap-2">
        <PackageCheck />
        <h3 className="text-xl font-medium">Konfirmasi Pesanan</h3>
        
      </div>

      <div className="p-4 flex flex-col border border-black/20 to-30% rounded-xl">
        <span>Alamat Pengiriman</span>
        <span>{checkout.shipping_address
.recipient_name} · {checkout.shipping_address
.phone_number}</span>
        <span>Alamat</span>
      </div>

      <div className="p-4 flex flex-col border border-black/20 bg-gray-200/30 rounded-xl">
        <span>Metode Pengiriman</span>
        <span>JNE Regular 3-5 hari kerja</span>
      </div>
      <div className="p-4 flex flex-col gap-4 border border-black/20 bg-gray-200/30 rounded-xl">
        <span>Produk yang di Pesan</span>

        {checkout.cart.map((cart) => (
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden"><img src="/headphone.png" alt="headphone" /></div>
              <div>
                <div>{cart.name}</div>
                <div>x{cart.quantity}</div>
              </div>  
            </div>
            <div>Rp 450.000</div>
          </div>
        ))}
        {/* <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden"><img src="/headphone.png" alt="headphone" /></div>
            <div>
              <div>Headphone Wireless Premium</div>
              <div>x1</div>
            </div>  
          </div>
          <div>Rp 450.000</div>
        </div>*/}
      </div>
      
      <div className="flex gap-4 items-center border rounded-xl py-2 p-4">
        <Shield size={28}/>
        <span className="text-sm">Dengan menekan "Bayar Sekarang", kamu menyetujui Syarat & Ketentuan kami. Pembayaran baru akan diproses setelah kamu mengkonfirmasi di langkah ini.</span>
      </div>

      <div className="flex gap-4">
        <button className="border w-30 text-center p-2 rounded-xl">Kembali</button>
        <button className="flex items-center border flex-1 justify-center p-2 rounded-xl" type="submit">Bayar {formatIDR(checkout.total)} Sekarang</button>
      </div>
    </form>
  )
}