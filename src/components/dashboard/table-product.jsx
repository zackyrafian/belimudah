import { formatIDR } from "@/utils/format";
import { Edit, Eye, Search, Trash2 } from "lucide-react";

export default function TableProducts({ products, remove, edit }) {
  return ( 
    <div className="bg-white px-4 py-2 border border-black/10 rounded-xl flex flex-col gap-4">
      <div className="pt-4 text-sm">Table Product</div>

      <div className="flex gap-2">
        <div className="py-2 px-4 flex-1 bg-black/3 border gap-2 rounded-xl border-black/20 text-sm flex items-center">
          <Search className="text-gray-500" size={16} />
          <input className="w-full outline-none h-full text-md" placeholder="Cari Produk" type="text" />
        </div>
        <div className="flex gap-2.5">
          <div className="py-2 px-4 bg-white border border-black/20 rounded-xl text-sm">Semua Kategori</div>
          <div className="py-2 px-4 bg-white border-black/20 border rounded-xl text-sm">Filter</div>
        </div>
      </div>

      <table className="w-full text-sm">
        <thead className="border-b-2 border-b-black/20 border-t-2 border-t-black/20">
          <tr>
            <th className="text-left p-3">Produk</th>
            <th className="text-left p-3">Kategori</th>
            <th className="text-left p-3">Harga</th>
            <th className="text-left p-3">Stok</th>
            <th className="text-left p-3">Rating</th>
            <th className="text-left p-3">Status</th>
            <th className="text-left p-3">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-black/10">
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img src="/headphone.png" alt="" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-xs text-black/60">{product.brand}</span>
                  </div>
                </div>
              </td>

              <td className="p-3 text-sm">{product.category}</td>

              <td className="p-3">
                <div className="flex flex-col">
                  {product.discount ? (
                    <div className="flex flex-col">
                      <span className="font-medium">{formatIDR(product.price - (product.price * product.discount / 100))}</span>
                      <span className="text-xs">{formatIDR(product.price)}</span>
                    </div>
                  ) : (
                    <span>{formatIDR(product.price)}</span>
                  )}
                </div>
              </td>

              <td className="p-3">{product.stock}</td>

              <td className="p-3 text-sm">{product.rating} (512)</td>

              <td className="p-3">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 border-blue-400/20 border py-1 text-[10px] rounded-full bg-blue-100 text-blue-500">
                    Baru
                  </span>
                  <span className="px-2 border border-orange-400/20 py-1 text-[10px] rounded-full bg-yellow-100 text-orange-500">
                    Unggulan
                  </span>
                  <span className="px-2 border border-red-400/20 py-1 text-[10px] rounded-full bg-red-100 text-red-500">
                    Promo
                  </span>
                </div>
              </td>

              <td className="p-3">
                <div className="flex gap-4 items-center">
                  <button className="text-blue-600">
                    <Eye size={15} />
                  </button>

                  <button onClick={() => edit(product)} className="text-blue-600">
                    <Edit size={15} />
                  </button>

                  <button onClick={() => remove(product.id)} className="text-blue-600">
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}