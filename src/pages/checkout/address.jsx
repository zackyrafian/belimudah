import { UserStorage } from "@/services/user.service";
import { generateId } from "@/utils/calculate";
import { ArrowLeft, MapPin, Plus, Truck } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router";
import Alert from "@/components/ui/alert";

export default function CheckoutAddress() {
  const user = UserStorage.getUser();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [viewMode, setViewMode] = useState(user.shipping_address && user.shipping_address.length > 0 ? 'list' : 'form');

  const [shippingAddress, setShippingAddress] = useState(null);
  const [shippingMetode, setShippingMetode] = useState(null);

  const handleSelectAddress = (address) => { 
    setShippingAddress(address);
  }

  const handleForm = (e) => {
    e.preventDefault();
    if (!shippingMetode) {
      setAlert({ 
        type: "error", 
        message: "No shipping method selected."
      })
      return;
    }

    let finalAddress;
    if (viewMode === 'list' && shippingAddress) {
      finalAddress = shippingAddress;
    } else {
      const form = new FormData(e.target);
      const data = Object.fromEntries(form.entries());
      if (
        !data.recipient_name ||
        !data.phone_number ||
        !data.recipient_address_full
      ) {
        setAlert({ 
          type: "error", 
          message: "No shipping method selected."
        })
        return;
      }

      UserStorage.updateShippingAddress(data);
      UserStorage.setSelectedShippingAddress(data);
      finalAddress = data;
    }

    const total = user.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    UserStorage.createCheckout({
      id: generateId(),
      cart: user.cart,
      shipping_address: finalAddress,
      shipping_metode: shippingMetode,
      total,
      payment: "pending",
      createdAt: new Date(),
    });

    navigate("/checkout/payment");
  };

  return ( 
    <div className="p-2">
      {alert && ( 
        <Alert
          title={"Checkout"}
          key={new Date}
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
            <button onClick={() => { setViewMode('form'); setShippingAddress(null)}} className="flex items-center border border-black/20 text-gray-600 rounded-xl px-4 py-2 text-sm gap-2">
              <Plus size={18} />
              <span>Tambah Alamat</span>
            </button>
          )}
        </div>

        {viewMode === 'list' && ( 
          <div className="flex flex-col gap-3">
            {user.shipping_address?.map((address, index) => (
              <label
                key={index}
                className={`border-2 flex flex-col gap-1 p-3 rounded-xl cursor-pointer transition
                  ${
                    shippingAddress?.recipient_address_full ===
                    address.recipient_address_full
                      ? "border-blue-500"
                      : "border-black/20"
                  }`}
              >
                <input
                  type="radio"
                  name="shipping_address_list"
                  className="hidden"
                  checked={shippingAddress?.recipient_address_full === address.recipient_address_full}
                  onChange={() => handleSelectAddress(address)}
                />

                <div className="font-semibold">
                  {address.recipient_name}
                </div>
                <div className="text-sm text-gray-600">
                  {address.recipient_address_full}
                </div>
                <div className="text-xs text-gray-500">
                  {address.recipient_city}, {address.recipient_province} - {address.zip_code}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {(viewMode === 'form' || (viewMode === 'list' && shippingAddress)) && (
        <form onSubmit={handleForm} className="flex flex-col gap-5">

          {viewMode === 'form' && (
            <>
              {user.shipping_address?.length > 0 && ( 
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className="text-sm text-gray-500 items-center flex gap-1 mb-2 hover:text-gray-800"
                >
                  <ArrowLeft size={14}/>
                  Kembali ke daftar alamat
                </button>
              )}

              {/* <h3 className="font-semibold text-lg mb-2">Detail Penerima</h3>*/}

              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Nama Pengirim *</label>
                  <input required name="recipient_name" type="text" placeholder="Budi" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Nomer Telepon *</label>
                  <input required name="phone_number" type="number" placeholder="Budi" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Email *</label>
                <input name="recipient_email" type="text" placeholder="Budi" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Alamat Lengkap *</label>
                <input required name="recipient_address_full" type="text" placeholder="Budi" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Kota *</label>
                  <input required name="recipient_city" type="text" placeholder="Budi" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Provinsi *</label>
                  <input required name="recipient_province" type="text" placeholder="Budi" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Kode Pos *</label>
                  <input required name="zip_code" type="text" placeholder="Budi" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Catatan (opsional)</label>
                  <input name="note" type="text" placeholder="Budi" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
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