import { CreditCard, LockIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateCheckout } from "@/features/auth/authSlice";
export default function CheckoutPaymentPage() { 
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkout = user?.checkout;
  const handleForm = (e) => { 
    e.preventDefault();
    const form = new FormData(e.target);
    const data = form.get("payment_metode"); 

    if (!data) { 
      return
    }
    dispatch(updateCheckout({
      ...checkout,
      payment_method: data
    }));
    navigate("/checkout/confirm")
  }
  return (
    <div className="flex flex-col gap-4"> 
      <form onSubmit={handleForm} className="flex flex-col gap-4 p-2">
      <div className="flex gap-2 items-center">
        <CreditCard/>
        <span className="text-xl font-medium">Metode Pembayaran</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className="flex items-center gap-2 border-2 border-black/10 rounded-xl h-20 p-3 cursor-pointer has-checked:border-blue-500">
          <input className="hidden" value="va_bca" name="payment_metode" type="radio" />
          <div className="flex items-center justify-center w-12 h-12 shrink-0">
            <img className="max-h-full max-w-full object-contain" src="/payment_logo/bca.svg" alt="" />
          </div>
          <span className="font-medium font-sm">Virtual Account BCA</span>
        </label>
        <label className="flex items-center gap-2 border-2 border-black/10 rounded-xl h-20 p-3 cursor-pointer has-checked:border-blue-500">
          <input className="hidden" value="va_bri" name="payment_metode" type="radio" />
          <div className="flex items-center justify-center w-12 h-12 shrink-0">
            <img className="max-h-full max-w-full object-contain" src="/payment_logo/bri.svg" alt="" />
          </div>
          <span className="font-medium font-sm">Virtual Account BRI</span>
        </label>
        <label className="flex items-center gap-2 border-2 border-black/10 rounded-xl h-20 p-3 cursor-pointer has-checked:border-blue-500">
          <input className="hidden" value="va_bni" name="payment_metode" type="radio" />
          <div className="flex items-center justify-center w-12 h-12 shrink-0">
            <img className="max-h-full max-w-full object-contain" src="/payment_logo/bni.svg" alt="" />
          </div>
          <span className="font-medium font-sm">Virtual Account BNI</span>
        </label>
        <label className="flex items-center gap-2 border-2 border-black/10 rounded-xl h-20 p-3 cursor-pointer has-checked:border-blue-500">
          <input className="hidden" value="dana" name="payment_metode" type="radio" />
          <div className="flex items-center justify-center w-12 h-12 shrink-0">
            <img className="max-h-full max-w-full object-contain" src="/payment_logo/dana_logo.png" alt="" />
          </div>
          <span className="font-medium font-sm">DANA</span>
        </label>
        <label className="flex items-center gap-2 border-2 border-black/10 rounded-xl h-20 p-3 cursor-pointer has-checked:border-blue-500">
          <input className="hidden" value="ovo" name="payment_metode" type="radio" />
          <div className="flex items-center justify-center w-12 h-12 shrink-0">
            <img className="max-h-full max-w-full object-contain" src="/payment_logo/ovo_logo.png" alt="" />
          </div>
          <span className="font-medium font-sm">OVO</span>
        </label>
        <label className="flex items-center gap-2 border-2 border-black/10 rounded-xl h-20 p-3 cursor-pointer has-checked:border-blue-500">
          <input className="hidden" value="qris" name="payment_metode" type="radio" />
          <div className="flex items-center justify-center w-12 h-12 shrink-0">
            <img className="max-h-full max-w-full object-contain" src="/payment_logo/QRIS_Logo.svg" alt="" />
          </div>
          <span className="font-medium font-sm">QRIS</span>
        </label>
      </div>
      <div className="flex border w-full items-center p-3 bg-blue-200/60 gap-2 rounded-xl text-gray-600">
        <LockIcon size={18}/>
        <span className="text-sm">Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak menyimpan data kartu kreditmu.</span>
      </div>
        <div className="flex gap-2">
        <Link to={'/checkout/address'} className="rounded-xl flex w-1/5 border px-4 py-3 justify-center">
            {/* <button className="rounded-xl flex w-1/5 border px-4 py-3 justify-center">Kembali</button>*/}
            Kembali
        </Link>
        <button type="submit" className="cursor-pointer rounded-xl flex border flex-1 px-4 py-3 items-center justify-center bg-blue-500 text-white">Lanjut ke Konfirmasi</button>
        </div>
      </form>
        
    </div>
    
  )
}