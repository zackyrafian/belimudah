import { Edit, Edit2, PlusIcon, Trash2 } from "lucide-react";
import { ProfileLayout } from "../../components/layouts";
import { Card } from "../../components";

export default function ProfileAddress (){ 
  return ( 
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span>Alamat Saya</span>
        <div className="flex bg-blue-500 px-4 py-2 rounded-xl text-white items-center gap-2">
          <PlusIcon/>
          <span>Tambah Alamat</span>
        </div>
      </div>

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

        <div>
          <div>Budi Santoso · 0812-3456-7890</div>
          <div>Jl. Kebon Jeruk No. 15, RT.003/RW.002</div>
          <div>Jakarta Barat, DKI Jakarta 11530</div>
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
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
      </Card>
    </div>
  )
}