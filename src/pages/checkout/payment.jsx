import { CreditCard, LockIcon } from "lucide-react";

export default function CheckoutPaymentPage () { 
  return (
    <div className="flex flex-col gap-4"> 
      <div className="flex gap-2">
        <CreditCard/>
        <span>Metode Pembayaran</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className="flex gap-2 border rounded-xl p-3">
          <input type="radio" /> 
          <span>Virtual Account BCA</span>
        </label>
        <label className="flex gap-2 border rounded-xl p-3">
          <input type="radio" /> 
          <span>Virtual Account BCA</span>
        </label>
        <label className="flex gap-2 border rounded-xl p-3">
          <input type="radio" /> 
          <span>Virtual Account BCA</span>
        </label>
        <label className="flex gap-2 border rounded-xl p-3">
          <input type="radio" /> 
          <span>Virtual Account BCA</span>
        </label>
        <label className="flex gap-2 border rounded-xl p-3">
          <input type="radio" /> 
          <span>Virtual Account BCA</span>
        </label>
        <label className="flex gap-2 border rounded-xl p-3">
          <input type="radio" /> 
          <span>Virtual Account BCA</span>
        </label>
      </div>
      <div className="flex border w-full items-center p-3 bg-blue-200 gap-2 rounded-xl">
        <LockIcon size={18}/>
        <span className="text-sm">Informasi pembayaranmu dienkripsi dengan SSL 256-bit. Kami tidak menyimpan data kartu kreditmu.</span>
      </div>

      <div className="flex gap-2">
        <div className="rounded-xl flex w-1/5 border px-4 py-2 justify-center">Kembali</div>
        <div className="rounded-xl flex border flex-1 px-4 py-2 items-center justify-center">Lanjut ke Konfirmasi</div>
      </div>
    </div>
  )
}