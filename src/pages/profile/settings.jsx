import { Edit } from "lucide-react";
import { Card } from "../../components";

export default function ProfileSetting () { 
  return ( 
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl">Pengaturan Profile</h1>
        <div className="flex gap-2 border rounded-xl border-blue-400 px-4 py-2 items center text-sm">
          <Edit/>
          <span>Simpan</span>
        </div>
      </div>

      <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-4"> 
            <div className="rounded-full w-20 h-20 bg-fuchsia-100 flex items-center justify-center">B</div>
            <span>Ganti Foto Profile</span>
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="">Nama Lengkap</label>
            <input type="text" className="border border-black/20 rounded-xl py-3 px-4" />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="">Email</label>
            <input type="text" className="border border-black/20 rounded-xl py-3 px-4" />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="">No Telepon</label>
            <input type="text" className="border border-black/20 rounded-xl py-3 px-4" />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="">Tanggal Lahir</label>
            <input type="date" className="border border-black/20 rounded-xl py-3 px-4" />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="">Jenis Kelamin</label>
            <input type="text" className="border border-black/20 rounded-xl py-3 px-4" />
          </div>
      </Card>


      <Card className="flex flex-col gap-2">
        <span className="font-bold">Keamanan Akun</span>
        <span>Ubah Kata Sandi</span>
        <span>Aktifkan Verifikasi 2 Langkah</span>
      </Card>
    </div>
  )
}