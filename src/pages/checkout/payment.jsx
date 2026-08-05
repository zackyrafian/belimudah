import { CreditCard, LockIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateCheckout } from "@/features/auth/authSlice";
import { useState, useEffect } from "react";

const API = 'http://localhost:2222';

export default function CheckoutPaymentPage() { 
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [methods, setMethods] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!user?.token) return;
    fetch(`${API}/payments`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => setMethods(data.results || []))
      .catch(err => console.error(err));
  }, [user]);

  const handleForm = (e) => { 
    e.preventDefault();
    if (!selectedId) return;
    dispatch(updateCheckout({ payment_method_id: selectedId }));
    navigate("/checkout/confirm");
  }

  return (
    <div className="flex flex-col gap-4"> 
      <form onSubmit={handleForm} className="flex flex-col gap-4 p-2">
        <div className="flex gap-2 items-center">
          <CreditCard/>
          <span className="text-xl font-medium">Metode Pembayaran</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {methods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center gap-2 border-2 rounded-xl h-20 p-3 cursor-pointer
                ${selectedId === method.id ? 'border-blue-500' : 'border-black/10'}`}
            >
              <input
                className="hidden"
                name="payment_metode"
                type="radio"
                value={method.id}
                onChange={() => setSelectedId(method.id)}
              />
              <div className="flex items-center justify-center w-12 h-12 shrink-0">
                {method.image_url ? (
                  <img className="max-h-full max-w-full object-contain" src={method.image_url} alt={method.name} />
                ) : (
                  <CreditCard size={32} className="text-gray-400" />
                )}
              </div>
              <span className="font-medium text-sm">{method.name}</span>
            </label>
          ))}
        </div>
        <div className="flex border w-full items-center p-3 bg-blue-200/60 gap-2 rounded-xl text-gray-600">
          <LockIcon size={18}/>
          <span className="text-sm">Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak menyimpan data kartu kreditmu.</span>
        </div>
        <div className="flex gap-2">
          <Link to={'/checkout/address'} className="rounded-xl flex w-1/5 border px-4 py-3 justify-center">
            Kembali
          </Link>
          <button type="submit" className="cursor-pointer rounded-xl flex border flex-1 px-4 py-3 items-center justify-center bg-blue-500 text-white">
            Lanjut ke Konfirmasi
          </button>
        </div>
      </form>
    </div>
  )
}
