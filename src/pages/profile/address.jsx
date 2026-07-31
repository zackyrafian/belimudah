import { Edit, MapPin, PlusIcon, Trash2, X } from "lucide-react";
import { Card } from "../../components";
import { useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import Alert from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateShippingAddress } from "@/features/auth/authSlice";
export default function ProfileAddress() { 
  const { alert, showSuccess, clearAlert } = useAlert();
  const [dialog, setDialog] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleForm = (e) => { 
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const currentShipping = user?.shipping_address || [];
    const updatedShipping = [...currentShipping, data]; 
    dispatch(updateShippingAddress(updatedShipping));
    showSuccess("Berhasil menambahkan Alamat")
  }
  return ( 
    <div className="flex flex-col gap-2">
      <div>
        {alert && (
          <Alert
            title={"Profile Address"}
            key={new Date}
            type={alert.type}
            message={alert.message}
            onClose={() => clearAlert()}
          />
      )}
      {dialog && (
        <div className="fixed inset-0 bg-black/50 items-center justify-center z-50 flex">
          <Card className="p-6 flex flex-col min-w-1/2 gap-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <MapPin/>
                <h1 className="text-xl font-medium">Alamat Pengiriman</h1>
              </div>
              <button onClick={() => setDialog(false)}>
                <X/>
              </button>
            </div>
            <form onSubmit={handleForm} className="flex flex-col gap-6 text-sm">
              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Nama Pengirim *</label>
                  <input required name="recipient_name" type="text" placeholder="Nama Penerima" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
                <div className="flex flex-col w-1/2">
                  <label htmlFor="">Nomer Telepon *</label>
                  <input required name="phone_number" type="number" placeholder="Nomer telepon" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="">Email *</label>
                <input name="recipient_email" type="text" placeholder="Email penerima" className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"/>
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
              <button className="bg-blue-500 py-3 rounded-xl text-white text-center">Save</button>
            </form>
          </Card>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-2xl font-medium">Alamat Pengiriman</span>
        <button onClick={() => setDialog(true)} className="flex text-gray-500 border-black/20 border text-sm px-4 py-2 rounded-xl items-center gap-2">
          <PlusIcon size={18}/>
          <span>Alamat Pengiriman</span>
        </button>
      </div>

        <div className="flex flex-col gap-4 pt-4">
          {user?.shipping_address?.map((address) => (
            <Card className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 font-bold">
                  <span>Rumah Utama</span>
                  <div className="rounded-full text-xs flex items-center bg-blue-500 text-white px-4">Utama</div>
                </div>
                <div className="flex gap-4">
                  <Edit size={15}/>
                  <Trash2 size={15}/>
                </div>
              </div>
      
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{address.recipient_name}</h3>
                  <span className="text-sm text-gray-500">{address.phone_number}</span>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {address.recipient_address_full}
                </div>
                <span className="text-xs text-gray-500">{address.recipient_city}, {address.recipient_province} - {address.zip_code}</span>
              </div>
            </Card>
          ))}
        </div>
      
      {/* <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 font-bold">
            <span>Rumah Utama</span>
            <div className="rounded-full text-xs flex items-center bg-blue-500 text-white px-4">Utama</div>
          </div>
          <div className="flex gap-4">
            <Edit size={15}/>
            <Trash2 size={15}/>
          </div>
        </div>

        <div>
          <div>Budi Santoso · 0812-3456-7890</div>
          <div>Jl. Kebon Jeruk No. 15, RT.003/RW.002</div>
          <div>Jakarta Barat, DKI Jakarta 11530</div>
        </div>
      </Card>*/}

      {/* <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 font-bold">
            <span>Kantor</span>
          </div>
          <div className="flex gap-4">
            <Edit size={15}/>
            <Trash2 size={15}/>
          </div>
        </div>

        <div>
          <div>Budi Santoso · 0812-3456-7890</div>
          <div>Jl. Kebon Jeruk No. 15, RT.003/RW.002</div>
          <div>Jakarta Barat, DKI Jakarta 11530</div>
        </div>
        <div>
          <span>Jadikan Alamat Utama</span>
        </div>
      </Card>*/}
      </div>
    </div>
  )
}