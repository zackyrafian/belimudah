import { Card } from "@/components";
import { useAuth } from "@/hooks/useAuth";
import { ProductService } from "@/services/product.service";
import { formatIDR } from "@/utils/format";
import { Edit, Eye, Plus, Trash2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const API = import.meta.env.VITE_SERVER_URL

export default function DashboardProductPage() { 
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [brands, setBrands] = useState([]); 
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    brand_id: "",
    category_id: "",
  });
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth(); 


  console.log(imageFiles)
  console.log(imagePreviews)
  // useEffect(() => { 
  //   const fetchProducts = async () => { 
  //     try { 
  //       const res = await fetch(`${API}/products`); 
  //       const data = await res.json(); 
  //       if (!res.ok) { 
  //         throw new Error("Failed to fetch products"); 
  //       }
  //       setProducts(data.results);
  //     } catch (error) { 
  //       console.log(error.message); 
  //     }
  //   }

  //   fetchProducts();
  // }, []) 

  useEffect(() => {
    const controller = new AbortController();
    ProductService.getAll(controller.signal, { page, limit })
      .then((res) => {
        console.log('API response:', res);
        setProducts(res.results);
        setData(res.data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') console.log(error.message);
      });
    return () => controller.abort();
  }, [page]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); 
    console.log(files)

    const remaining = 5 - files.length;
    if (remaining <= 0) return;
    const accepted = files.slice(0, remaining)
    const previews = accepted.map((f) => URL.createObjectURL(f))
    setImageFiles((prev) => [...prev, ...accepted]) 
    setImagePreviews((prev) => [...prev, ...previews])
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          discount: Number(form.discount),
          stock: Number(form.stock),
          description: form.description,
          brand_id: Number(form.brand_id),
          category_id: Number(form.category_id),
        }),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const data = await res.json();
      const newProduct = data.result;

      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append("images", file));
        const imgRes = await fetch(`${API}/products/${newProduct.id}/images`, {
          method: "POST",
          headers: { Authorization: `Bearer ${user.token}` },
          body: formData,
        });
        if (imgRes.ok) {
          const imgData = await imgRes.json();
          newProduct.images = imgData.result?.map((img) => img.url) ?? [];
        }
      }

      setOpen(false);
      setForm({ name: "", price: "", discount: "", stock: "", description: "", brand_id: "", category_id: "" });
      setImageFiles([]);
      setImagePreviews([]);
      setData((prev) => {
        if (!prev) return prev;
        const newTotal = prev.total + 1;
        const newTotalPages = Math.ceil(newTotal / limit);
        return {
          ...prev,
          total: newTotal,
          totalPages: newTotalPages,
          page: prev.page > newTotalPages ? newTotalPages : prev.page
        };
      }); 
      setProducts((prev) => {
        if (prev.length === 0 && page > 1) { 
          setPage(page - 1);
        }
        return [...prev, newProduct]
      });

      console.log(newProduct)
    } catch (error) {
      console.log(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleClick = () => { 
    setOpen(true);
    const controller = new AbortController(); 
    const fetchOptions = async () => { 
      try { 
        const [catRes, brandRes] = await Promise.all([
          fetch(`${API}/categories`, { signal: controller.signal}),
          fetch(`${API}/brands`, { signal: controller.signal}),
        ]);
  
        if (!catRes.ok) throw new Error("Failed to fetch categories"); 
        if (!brandRes.ok) throw new Error("failed to fetch brands");
  
        const [cat, brand] = await Promise.all([catRes.json(), brandRes.json()]);
        setCategories(cat.results);
        setBrands(brand.results);
      } catch (error) { 
        if (error.name === 'AbortError') return; 
      }
    } 
    fetchOptions();
    console.log(categories);
    return () => controller.abort();
  }

  const handleDelete = async (product_id) => {
    try {
      await ProductService.delete(product_id, user.token);
      setProducts((prev) => prev.filter((p) => p.id !== product_id));
      setData((prev) => {
        if (!prev) return prev;
        const newTotal = prev.total - 1;
        const newTotalPages = Math.ceil(newTotal / limit);
        return {
          ...prev,
          total: newTotal,
          totalPages: newTotalPages,
          page: prev.page > newTotalPages ? newTotalPages : prev.page
        };
      });
      setProducts((prev) => {
        if (prev.length === 0 && page > 1) {
          setPage(page - 1);
        }
        return prev;
      });
      
    } catch (error) {
      console.error(error.message);
    }
  };
  return ( 
    <div className="flex flex-col gap-4">
      {open && ( 
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-1/2">
            <div className="flex justify-between border-b border-b-black/20 pb-4">
              <div className="text-xl">Tambah Produk Baru</div>
              <button onClick={() => setOpen(false)}><X/></button>
            </div>

            <form className="pt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="name" className="text-sm">Nama Produk</label>
                  <input id="name" name="name" value={form.name} onChange={handleChange} className="border border-black/20 px-4 py-2 rounded-xl bg-black/5" type="text" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="brand_id" className="text-sm">Merek</label>
                  <select
                    id="brand_id"
                    name="brand_id"
                    value={form.brand_id}
                    onChange={handleChange}
                    className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"
                  >
                    <option value="">Pilih Merek</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="price" className="text-sm">Harga (IDR)</label>
                  <input id="price" name="price" value={form.price} onChange={handleChange} className="border border-black/20 px-4 py-2 rounded-xl bg-black/5" type="number" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="discount" className="text-sm">Diskon (%)</label>
                  <input id="discount" name="discount" value={form.discount} onChange={handleChange} className="border border-black/20 px-4 py-2 rounded-xl bg-black/5" type="number" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="stock" className="text-sm">Stok</label>
                  <input id="stock" name="stock" value={form.stock} onChange={handleChange} className="border border-black/20 px-4 py-2 rounded-xl bg-black/5" type="number" />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <label htmlFor="category_id" className="text-sm">Kategori</label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={form.category_id}
                    onChange={handleChange}
                    className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"
                  >
                    <option value="">Pilih Kategori </option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <label htmlFor="description" className="text-sm">Deskripsi</label>
                <textarea id="description" name="description" value={form.description} onChange={handleChange} className="border border-black/20 px-4 py-2 rounded-xl bg-black/5"></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm">Foto Produk</label>
                <div
                  className="border-2 border-dashed border-black/20 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-black/5 transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                {imagePreviews.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-black/20">
                        <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5 text-white"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                ): ( 
                  <div className="flex flex-col gap-2 items-center justify-center"> 
                    <Upload size={20} className="text-black/40" />
                    <span className="text-sm text-black/50">Klik untuk upload foto (maks. 5 foto, 2MB each)</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">Produk Unggulan</label>
                </div>
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <label htmlFor="">Terbaru</label>
                </div>
              </div>

              <div className="flex gap-4">
                <button type="button" onClick={() => setOpen(false)} disabled={uploading} className="border border-black/30 rounded-xl px-4 flex-1 py-2 flex items-center justify-center text-sm disabled:opacity-50">Kembali</button>
                <button type="submit" disabled={uploading} className="bg-blue-500 rounded-xl px-4 flex-1 py-2 text-white flex items-center justify-center text-sm disabled:opacity-50">
                  {uploading ? "Menyimpan..." : "Tambah Produk"}
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-2xl font-medium">Manajement Produk</span>
        <div onClick={handleClick} className="border border-black/20 text-black px-4 py-2 rounded-xl gap-2 text-sm flex items-center justify-center"><Plus size={18}/><span>Tambah Produk</span></div>
      </div>
      <div className="p-4 bg-white flex justify-between shadow-sm border rounded-xl border-black/20 gap-2 font-medium">
        <input className="py-2.5 px-4 flex-1 bg-black/5 border rounded-xl border-black/20 text-sm" type="text" />
        <div className="flex gap-2.5">
          <div className="py-2.5 px-4 bg-white border border-black/20 rounded-xl text-sm">Semua Kategori</div>
          <div className="py-2.5 px-4 bg-white border-black/20 border rounded-xl text-sm">Filter</div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="flex items-center justify-center flex-col">
            <div className="text-2xl font-bold">{data?.total}</div>
            <div>Total Product</div>
          </Card>
        ))}
      </div>

      <div className="bg-white px-4 py-2 border border-black/20 shadow-sm rounded-xl flex flex-col gap-4">
        <div className="pt-4 text-sm">Table Product</div>
        <table className="w-full">
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
                      <span className="text-sm text-black/60">{product.brand}</span>
                    </div>
                  </div>
                </td>
          
                <td className="p-3 text-sm">{product.category}</td>
          
                <td className="p-3">
                  <div className="flex flex-col">
                    {/* <span>Rp 450.000</span>
                    <span className="text-sm text-black/60 line-through">
                      {formatIDR(product.price)}
                    </span>*/}
                    {product.discount ? ( 
                      <div className="flex flex-col">
                        <span>{formatIDR(product.price - (product.price * product.discount / 100))}</span>
                        <span className="text-sm">{formatIDR(product.price)}</span>
                      </div>
                    ): (
                      <span>{formatIDR(product.price)}</span>
                    )}
                  </div>
                </td>
          
                <td className="p-3">{product.stock}</td>
          
                <td className="p-3 text-sm">{product.rating} (512)</td>
          
                <td className="p-3">
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-500">
                      Baru
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-orange-500">
                      Unggulan
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-500">
                      Promo
                    </span>
                  </div>
                </td>
          
                <td className="p-3">
                  <div className="flex gap-4 items-center">
                    <button className="text-blue-600">
                      <Eye size={15} />
                    </button>
                
                    <button className="text-blue-600">
                      <Edit size={15} />
                    </button>
                
                    <button onClick={() => handleDelete(product.id)} className="text-blue-600">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-gray-500">
            Halaman {data.page} dari {data.totalPages} &mdash; Total {data.total} produk
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={!data.prevPage}
              className="px-2 py-1 text-sm rounded-lg border border-black/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              «
            </button>
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={!data.prevPage}
              className="px-3 py-1 text-sm rounded-lg border border-black/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Prev
            </button>

            {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 text-sm rounded-lg border ${
                  p === data.page
                    ? "text-black border-black-600"
                    : "border-black/10 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!data.nextPage}
              className="px-3 py-1 text-sm rounded-lg border border-black/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
            <button
              onClick={() => setPage(data.totalPages)}
              disabled={!data.nextPage}
              className="px-2 py-1 text-sm rounded-lg border border-black/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  )
}