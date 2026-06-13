import { Mail, Truck } from "lucide-react"
import { Link } from "react-router"
export default function CheckoutAddress () { 
  return ( 
    <div className="p-2">
      <div className="flex text-xl gap-2 mb-4">
        <Truck/>
        <div>Alamat Pengiriman</div>
      </div>
      <form className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="">Nama Pengirim *</label>
            <input type="text" placeholder="Budi" className="border px-4 py-2 rounded-xl"/>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="">Nomer Telepon *</label>
            <input type="number" placeholder="Budi" className="border px-4 py-2 rounded-xl"/>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Email *</label>
          <input type="number" placeholder="Budi" className="border px-4 py-2 rounded-xl"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Alamat Lengkap *</label>
          <input type="number" placeholder="Budi" className="border px-4 py-2 rounded-xl"/>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="">Kota *</label>
            <input type="text" placeholder="Budi" className="border px-4 py-2 rounded-xl"/>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="">Provinsi *</label>
            <input type="number" placeholder="Budi" className="border px-4 py-2 rounded-xl"/>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <label htmlFor="">Kode Pos *</label>
            <input type="text" placeholder="Budi" className="border px-4 py-2 rounded-xl"/>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="">Catatan (ppsional)</label>
            <input type="number" placeholder="Budi" className="border px-4 py-2 rounded-xl"/>
          </div>
        </div>

        <div className="flex-col gap-4 flex">
          <span>Metode Pengiriman</span>
          <label htmlFor="jne" className="flex items-center border p-2 justify-between px-4 rounded-xl">
            <div htmlFor="jne" className="flex items-center gap-4">
              <input id="jne" type="radio" />
              <div className="flex flex-col">
                <span>JNE Regular</span>
                <span className="text-sm text-gray-500">
                  3-5 hari kerja
                </span>
              </div>
            </div>
            <span>Gratis</span>
          </label>

          <label htmlFor="jne" className="flex items-center border p-2 justify-between px-4 rounded-xl">
            <div htmlFor="jne" className="flex items-center gap-4">
              <input id="jne" type="radio" />
              <div className="flex flex-col">
                <span>JNE Regular</span>
                <span className="text-sm text-gray-500">
                  3-5 hari kerja
                </span>
              </div>
            </div>
            <span>Gratis</span>
          </label>

          <label htmlFor="jne" className="flex items-center border p-2 justify-between px-4 rounded-xl">
            <div htmlFor="jne" className="flex items-center gap-4">
              <input id="jne" type="radio" />
              <div className="flex flex-col">
                <span>JNE Regular</span>
                <span className="text-sm text-gray-500">
                  3-5 hari kerja
                </span>
              </div>
            </div>
            <span>Gratis</span>
          </label>
          
        </div>

        <button type="submit" className="border p-4 rounded-xl bg-blue-500 text-white">
          <span>Lanjutakan ke Pembayaran</span>
        </button>
      </form>
    </div>
  )
}