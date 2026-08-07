import { ArrowLeft, MapPin, Plus, Truck } from "lucide-react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Alert from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateCheckout } from "@/features/auth/authSlice";

const API = import.meta.env.VITE_SERVER_URL

export default function CheckoutAddress() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [shippingMetode, setShippingMetode] = useState(null);
  const [viewMode, setViewMode] = useState('loading');

  useEffect(() => {
    if (!user?.token) return;
    fetch(`${API}/users/address`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(res => res.json())
      .then(data => {
        const list = data.results || [];
        setAddresses(list);
        if (list.length > 0) {
          setSelectedAddressId(list[0].id);
          setViewMode('list');
        } else {
          setViewMode('form');
        }
      })
      .catch(() => setViewMode('form'));
  }, [user]);

  const handleForm = async (e) => {
    e.preventDefault();
    if (!shippingMetode) {
      setAlert({ type: 'error', message: 'Pilih metode pengiriman.' });
      return;
    }

    let address_id = selectedAddressId;

    if (viewMode === 'form') {
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());
      if (!data.recipient_name || !data.phone_number || !data.recipient_address_full) {
        setAlert({ type: 'error', message: 'Isi semua kolom yang wajib.' });
        return;
      }
      try {
        const res = await fetch(`${API}/users/address`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const json = await res.json();
        if (!res.ok) {
          setAlert({ type: 'error', message: json.message || 'Gagal menyimpan alamat.' });
          return;
        }
        const listRes = await fetch(`${API}/users/address`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const listJson = await listRes.json();
        const updatedList = listJson.results || [];
        if (updatedList.length > 0) {
          address_id = updatedList[updatedList.length - 1].id;
        }
      } catch (err) {
        setAlert({ type: 'error', message: err.message });
        return;
      }
    }

    if (!address_id) {
      setAlert({ type: 'error', message: 'Pilih alamat pengiriman.' });
      return;
    }

    dispatch(updateCheckout({ address_id, shipping_metode: shippingMetode }));
    navigate('/checkout/payment');
  };
  return ( 
    <div className="p-2">
      {alert && ( 
        <Alert
          title={"Checkout"}
          key={new Date()}
          type={alert.type}
          message={alert.message}
          onClick={() => setAlert(null)}
        />
      )}
      <div className="mb-4 flex flex-col gap-4">
        <div className="text-xl flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2 font-medium">
            <MapPin/>
            <span>Alamat Pengiriman</span>
          </div>
          {viewMode === 'list' && ( 
            <button type="button" onClick={() => { setViewMode('form'); setSelectedAddressId(null)}} className="flex items-center border border-black/20 text-gray-600 rounded-xl px-4 py-2 text-sm gap-2">
              <Plus size={18} />
              <span>Tambah Alamat</span>
            </button>
          )}
        </div>

        {viewMode === 'list' && ( 
          <div className="flex flex-col gap-3">
            {addresses.map((address) => (
              <label
                key={address.id}
                className={`border-2 flex flex-col gap-1 p-3 rounded-xl cursor-pointer transition
                  ${selectedAddressId === address.id ? "border-blue-500" : "border-black/20"}`}
              >
                <input
                  type="radio"
                  name="shipping_address_list"
                  className="hidden"
                  checked={selectedAddressId === address.id}
                  onChange={() => setSelectedAddressId(address.id)}
                />
                <div className="font-semibold">{address.recipient_name}</div>
                <div className="text-sm text-gray-600">{address.recipient_address_full}</div>
                <div className="text-xs text-gray-500">
                  {address.recipient_city}, {address.recipient_province} - {address.zip_code}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {(viewMode === 'form' || viewMode === 'list') && (
        <form onSubmit={handleForm} className="flex flex-col gap-5">

          {viewMode === 'form' && (
            <>
              {addresses.length > 0 && ( 
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="text-sm text-gray-500 items-center flex gap-1 mb-2 hover:text-gray-800"
                >
                  <ArrowLeft size={14}/>
                  Kembali ke daftar alamat
                </button>
              )}

              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Nama Penerima *</label>
                  <input required name="recipient_name" type="text" placeholder="Nama penerima" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Nomor Telepon *</label>
                  <input required name="phone_number" type="number" placeholder="Nomor telepon" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Email *</label>
                <input required name="recipient_email" type="email" placeholder="Email penerima" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Alamat Lengkap *</label>
                <input required name="recipient_address_full" type="text" placeholder="Alamat lengkap" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Kota *</label>
                  <input required name="recipient_city" type="text" placeholder="Kota" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Provinsi *</label>
                  <input required name="recipient_province" type="text" placeholder="Provinsi" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Kode Pos *</label>
                  <input required name="zip_code" type="text" placeholder="Kode pos" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Catatan (opsional)</label>
                  <input name="note" type="text" placeholder="Catatan tambahan" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center gap-2 text-xl font-medium">
              <Truck className="text-blue-500"/>
              <span>Metode Pengiriman</span>
            </div>

            <div className="grid gap-3">
              {[
                { id: 'jne_regular', label: 'JNE Regular', desc: '3-5 hari kerja', value: 'jne_regular' },
                { id: 'jne_express', label: 'JNE Express', desc: '1-2 hari kerja', value: 'jne_express' },
                { id: 'same_day', label: 'Same Day', desc: 'Hari ini (sebelum 16:00)', value: 'same_day' }
              ].map((item) => (
                <label 
                  key={item.id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${shippingMetode === item.value ? "border-blue-500" : "border-gray-200 hover:border-gray-300"}`}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      name="shipping_metode" 
                      value={item.value} 
                      type="radio" 
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                      onChange={(e) => setShippingMetode(e.target.value)}
                      checked={shippingMetode === item.value}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">{item.label}</span>
                      <span className="text-xs text-gray-500">{item.desc}</span>
                    </div>
                  </div>
                  <span className="text-sm text-green-600">Gratis</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="border p-4 rounded-xl bg-blue-500 text-white mt-4">
            <span>Lanjutkan ke Pembayaran</span>
          </button>
        </form>
      )}
    </div>
  )
}