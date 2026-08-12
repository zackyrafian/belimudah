import { formatIDR } from "@/utils/format";
import { ImageOff, Shield } from "lucide-react";
import { useNavigate } from "react-router";
import { PackageCheck } from 'lucide-react'
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "@/features/auth/authSlice";
import { useState, useEffect } from "react";

const API = import.meta.env.VITE_SERVER_URL

export default function CheckoutConfirmPage() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.auth.auth?.checkout);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const address_id = checkout?.address_id;
  const payment_method_id = checkout?.payment_method_id;

  useEffect(() => {
    if (!user?.token) return;
    fetch(`${API}/users/cart`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => setCart(data.results || []))
      .catch(err => console.error(err));
  }, [user]);

  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!user || !address_id || !payment_method_id) return;

    const cart_id = cart.map(item => item.id);

    setLoading(true);
    try {
      const res = await fetch(`${API}/users/orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart_id,
          address_id: Number(address_id),
          payment_method_id: Number(payment_method_id)
        })
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.message || 'Gagal membuat pesanan.');
        return;
      }
      dispatch(placeOrder());
      navigate('/checkout/success', { state: { order: json.results } });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!address_id || !payment_method_id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <PackageCheck size={64} className="text-gray-400" />
        <h3 className="text-xl font-medium text-gray-600">Data checkout tidak lengkap</h3>
        <button
          onClick={() => navigate('/checkout/address')}
          className="bg-blue-500 text-white px-6 py-2 rounded-xl"
        >
          Mulai dari Alamat
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleForm} className="flex-col flex gap-4">
      <div className="flex items-center gap-2">
        <PackageCheck />
        <h3 className="text-xl font-medium">Konfirmasi Pesanan</h3>
      </div>

      <div className="p-4 flex flex-col gap-4 border border-black/20 rounded-xl">
        <span>Produk yang di Pesan</span>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {item.images ? ( 
                <div className='w-12 h-12 bg-gray-200 text-gray-400 rounded-xl flex items-center justify-center'>
                  <ImageOff/>
                </div>
              ): <img src={item.images?.[0]} className="w-12 h-12 rounded-xl object-cover" alt={item.name} /> }
              <div>
                <div className="text-sm font-medium">{item.name}</div>
                <div>x{item.quantity}</div>
              </div>
            </div>
            <div>{formatIDR(Number(item.price) * item.quantity)}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 items-center border border-black/20 bg-blue-500/20 text-black rounded-xl py-2 p-4">
        <Shield size={22}/>
        <span className="text-xs">Dengan menekan "Bayar Sekarang", kamu menyetujui Syarat & Ketentuan kami. Pembayaran baru akan diproses setelah kamu mengkonfirmasi di langkah ini.</span>
      </div>

      <div className="flex gap-4">
        <button type="button" onClick={() => navigate('/checkout/payment')} className="cursor-pointer border w-30 text-center border-black/20 p-2 rounded-xl">Kembali</button>
        <button disabled={loading} className="cursor-pointer flex items-center border border-black/20 flex-1 justify-center p-2 rounded-xl bg-blue-500 text-white disabled:opacity-60" type="submit">
          {loading ? 'Memproses...' : `Bayar ${formatIDR(total)} Sekarang`}
        </button>
      </div>
    </form>
  )
}
