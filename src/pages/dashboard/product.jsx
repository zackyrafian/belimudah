import { useAuth } from "@/hooks/useAuth";
import { ProductService } from "@/services/product.service";
import { formatIDR } from "@/utils/format";
import { ChevronDown, Edit, Eye, Plus, Search, Trash2, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Combobox({ label, options, value, onChange, placeholder }) {
  const [query, setQuery] = useState(value || "");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const filtered = query
    ? options.filter((o) => o.name.toLowerCase().includes(query.toLowerCase()))
    : options;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (opt) => {
    setQuery(opt.name);
    onChange(opt);
    setOpen(false);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    onChange(null);
    setOpen(true);
  };

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-1.5 relative">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full border border-black/20 px-3 pr-9 py-2 rounded-xl bg-black/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setOpen((v) => !v)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
        >
          <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && filtered.length > 0 && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-black/10 rounded-xl shadow-lg overflow-hidden max-h-44 overflow-y-auto">
          {filtered.map((opt) => (
            <li
              key={opt.id}
              onMouseDown={() => handleSelect(opt)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                query === opt.name ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700"
              }`}
            >
              {opt.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
              <div>
                <h2 className="text-base font-semibold">Tambah Produk Baru</h2>
                <p className="text-xs text-gray-500 mt-0.5">Isi informasi produk di bawah ini</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-gray-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form className="flex flex-col gap-5 overflow-y-auto px-6 py-5" onSubmit={handleSubmit}>
              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-gray-600">Nama Produk</label>
                  <input
                    id="name" name="name" value={form.name} onChange={handleChange}
                    placeholder="Contoh: Headphone Pro X"
                    className="border border-black/20 px-3 py-2 rounded-xl bg-black/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    type="text"
                  />
                </div>
                <Combobox
                  label="Merek"
                  options={brands}
                  value={form.brand_id}
                  onChange={(opt) => setForm((prev) => ({ ...prev, brand_id: opt?.id || "" }))}
                  placeholder="Cari atau pilih merek..."
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-1.5">
                  <label htmlFor="price" className="text-xs font-medium text-gray-600">Harga (IDR)</label>
                  <input
                    id="price" name="price" value={form.price} onChange={handleChange}
                    placeholder="0"
                    className="border border-black/20 px-3 py-2 rounded-xl bg-black/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    type="number"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <label htmlFor="discount" className="text-xs font-medium text-gray-600">Diskon (%)</label>
                  <input
                    id="discount" name="discount" value={form.discount} onChange={handleChange}
                    placeholder="0"
                    className="border border-black/20 px-3 py-2 rounded-xl bg-black/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    type="number"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-1.5">
                  <label htmlFor="stock" className="text-xs font-medium text-gray-600">Stok</label>
                  <input
                    id="stock" name="stock" value={form.stock} onChange={handleChange}
                    placeholder="0"
                    className="border border-black/20 px-3 py-2 rounded-xl bg-black/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                    type="number"
                  />
                </div>
                <Combobox
                  label="Kategori"
                  options={categories}
                  value={form.category_id}
                  onChange={(opt) => setForm((prev) => ({ ...prev, category_id: opt?.id || "" }))}
                  placeholder="Cari atau pilih kategori..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="description" className="text-xs font-medium text-gray-600">Deskripsi</label>
                <textarea
                  id="description" name="description" value={form.description} onChange={handleChange}
                  rows={3}
                  placeholder="Tulis deskripsi produk..."
                  className="border border-black/20 px-3 py-2 rounded-xl bg-black/3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-600">
                  Foto Produk
                  <span className="ml-1 text-gray-400 font-normal">({imagePreviews.length}/5)</span>
                </label>
                <div
                  className="border-2 border-dashed border-black/20 rounded-xl p-4 cursor-pointer hover:bg-black/2 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imagePreviews.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {imagePreviews.map((src, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-black/20">
                          <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                            className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5 text-white"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                      {imagePreviews.length < 5 && (
                        <div className="w-16 h-16 rounded-lg border-2 border-dashed border-black/20 flex items-center justify-center text-gray-400">
                          <Upload size={16} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-2">
                      <Upload size={20} className="text-black/30" />
                      <span className="text-xs text-gray-400 text-center">Klik untuk upload foto<br/>Maks. 5 foto, 2MB per foto</span>
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

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-gray-600">Tag Produk</span>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded accent-blue-500" />
                    <span className="text-sm text-gray-700">Produk Unggulan</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded accent-blue-500" />
                    <span className="text-sm text-gray-700">Terbaru</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-1 pb-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={uploading}
                  className="flex-1 border border-black/20 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-black/5 transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 rounded-xl px-4 py-2.5 text-white text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {uploading ? "Menyimpan..." : "Tambah Produk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-2xl font-medium">Manajement Produk</span>
        <div onClick={handleClick} className="border border-black/20 text-black px-4 py-1.5 rounded-xl gap-2 text-sm flex items-center justify-center"><Plus size={18}/><span>Tambah Produk</span></div>
      </div>
      <div className="flex flex-col gap-4 bg-white p-4 shadow-sm rounded-xl border-black/20 border">
        <div className="flex justify-between gap-2 font-medium">
          <div className="py-2.5 px-4 flex-1 bg-black/3 border gap-2 rounded-xl border-black/20 text-sm flex items-center">
            <Search className="text-gray-500" size={16}/>
            <input className="w-full outline-none h-full text-md" placeholder="Cari Produk" type="text" />
          </div>
          <div className="flex gap-2.5">
            <div className="py-2.5 px-4 bg-white border border-black/20 rounded-xl text-sm">Semua Kategori</div>
            <div className="py-2.5 px-4 bg-white border-black/20 border rounded-xl text-sm">Filter</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-center flex-col bg-black/3 p-4 border border-black/20 rounded-xl">
              <div className="text-2xl font-bold">{data?.total}</div>
              <div>Total Product</div>
            </div>
          ))}
        </div>
      </div>

      

      <div className="bg-white px-4 py-2 border border-black/20 shadow-sm rounded-xl flex flex-col gap-4">
        <div className="pt-4 text-sm">Table Product</div>
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
                    {/* <span>Rp 450.000</span>
                    <span className="text-sm text-black/60 line-through">
                      {formatIDR(product.price)}
                    </span>*/}
                    {product.discount ? ( 
                      <div className="flex flex-col">
                        <span className="font-medium">{formatIDR(product.price - (product.price * product.discount / 100))}</span>
                        <span className="text-xs">{formatIDR(product.price)}</span>
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