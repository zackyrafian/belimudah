import { Mail } from "lucide-react"
import { Link } from "react-router"
export default function SignIn () { 
  return ( 
    <div className="flex">
      <div className="flex flex-col w-1/2"></div>
      <div className="flex flex-col w-1/2 gap-4 bg-white">
        <div>
          <h1 className="font-bold text-2xl">Masuk ke Akun</h1>
          <span>Belum punya akun? <Link>Daftar gratis</Link></span>
        </div>

        <div className="flex bg-green-500 gap-4">
          <div className="rounded border p-4 flex-1 border-black/20 text-center">Google</div>
          <div className="rounded border p-4 flex-1 border-black/20 text-center">Facebook</div>
        </div>
        

        {/* FORM */}
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="">Email</label>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Mail size={20}/>
              <input className="w-full h-full" type="text" placeholder="email@contoh.com"/>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <label htmlFor="">Password</label>
              <span>Lupa kata sandi?</span>
            </div>
            <div className="flex p-4 border border-black/20 rounded-xl items-center gap-2">
              <Mail size={20}/>
              <input className="w-full h-full" type="text" placeholder="Masukan kata sandi"/>
            </div>
          </div>
          
          <div className="flex gap-2">
            <input type="checkbox" />
            <span>Ingat saya selama 30 hari</span>
          </div>
          <button className="text-center bg-blue-500 w-full p-4 rounded-xl text-white" type="submit">Masuk</button>
        </form>

        <div className="text-center">
          <div>Login aman dengan enskripsi SSL 256-bit</div>
          <div>Dengan masuk, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami.</div>
        </div>

      </div>
    </div>
  )
}