import {  ArrowLeft, Mail } from "lucide-react"
import { Link } from "react-router"

export default function ForgetPasswordPage() { 
  return ( 
    <div className="flex min-h-screen">
      {/* {alert && ( 
        <Alert
          title={"Sign In"}
          key={new Date} 
          type={alert.type} 
          message={alert.message}
          onClose={() => clearAlert()}
        />
      )} */}
      <div className="lg:flex hidden w-1/2 min-h-screen">
        <div className="relative w-full">
          <img
            src="/auth/she-flexing.jpg"
            alt="wanita-flexing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1A73E8]/70 to-[#193CB8]/70" />
          <div className="absolute inset-0 z-10 p-12 text-white">
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center gap-4">
                <div className="bg-white/20 w-9 h-9 rounded-xl flex items-center justify-center">B</div>
                <span className="font-bold">BeliMudah</span>
              </div>

              <div className="w-xs flex flex-col gap-6">
                <div className="text-3xl rounded-xl bg-white/20 w-16 h-16 flex justify-center items-center">🔐</div>
                <div className="font-bold text-[32px]">Akun kamu aman bersama kami</div>
                <div className="text-lg">Kami menggunakan enkripsi tingkat militer untuk menjaga keamanan data dan transaksimu.</div>
                <div className="flex flex-col gap-4">
                  <span className="text-sm">🔒 Enkripsi SSL 256-bit</span>
                  <span className="text-sm">🛡️ Perlindungan data pribadi</span>
                  <span className="text-sm">📧 Verifikasi dua langkah</span>
                </div>
              </div>

              <div>© 2026 BeliMudah. Seluruh hak cipta dilindungi.</div>
            </div>
            
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:w-1/2 gap-8 bg-white xl:px-40 lg:py-20 lg:px-20 px-20 justify-center">
        <Link to={'/sign-in'} className="flex gap-2 items-center text-gray-500">
          <ArrowLeft size={18}/>
          <span>Kembali ke Login</span>
        </Link>
        
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl">Lupa Kata Sandi?</h1>
          <span className="text-gray-500">Tidak perlu khawatir. Masukkan email yang terdaftar dan kami akan mengirimkan tautan untuk membuat kata sandi baru.</span>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Mail size={20} className="text-gray-500"/>
              <input name="email" className="w-full h-full outline-none" type="text" placeholder="email@contoh.com"/>
            </div>
          </div>
          
          <button className="text-center bg-blue-500 w-full p-4 rounded-xl text-white" type="submit">Kirim Tautan Reset</button>
        </form>

        <div className="p-4 rounded-xl bg-gray-200 flex flex-col gap-4">
          <div className="font-medium">Tips Keamanan: </div>
          <ul className="text-sm flex flex-col gap-2 text-gray-500">
            <li>• Pastikan kamu memeriksa folder spam/junk email</li>
            <li>• Tautan reset hanya berlaku selama 30 menit</li>
            <li>• Jangan bagikan tautan reset kepada siapapun</li>
          </ul>
        </div>

        <div className="text-center">
          <span>Ingat Sandi kamu? <Link to={'/sign-in'} className="text-blue-500">Masuk Sekarang</Link></span>
        </div>

      </div>
    </div>
  )
}