import Combobox from "@/components/combo-box";
import TableProducts from "@/components/dashboard/table-product";
import Pagination from "@/components/pagination";
import { useAuth } from "@/hooks/useAuth";
import { ProductService } from "@/services/product.service";
import { Plus, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";



const API = import.meta.env.VITE_SERVER_URL

const EMPTY_FORM = {
  name: "",
  price: "",
  discount: "",
  stock: "",
  description: "",
  brand_id: "",
  category_id: "",
  variant: "",
};

export default function DashboardProductPage() {
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    ProductService.getAll(controller.signal, { page, limit })
      .then((res) => {
        setProducts(res.results);
        setData(res.data);
      })
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error.message);
      });
    return () => controller.abort();
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = 5 - imageFiles.length;
    if (remaining <= 0) return;
    const accepted = files.slice(0, remaining);
    const previews = accepted.map((f) => URL.createObjectURL(f));
    setImageFiles((prev) => [...prev, ...accepted]);
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const loadFormOptions = async () => {
    const controller = new AbortController();
    try {
      const [catRes, brandRes] = await Promise.all([
        fetch(`${API}/categories`, { signal: controller.signal }),
        fetch(`${API}/brands`, { signal: controller.signal }),
      ]);
      if (!catRes.ok) throw new Error("Failed to fetch categories");
      if (!brandRes.ok) throw new Error("Failed to fetch brands");
      const [cat, brand] = await Promise.all([catRes.json(), brandRes.json()]);
      setCategories(cat.results);
      setBrands(brand.results);
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error(error.message);
    }
  };

  const handleClick = () => {
    setOpen(true);
    loadFormOptions();
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
          variant: form.variant,
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
      setForm(EMPTY_FORM);
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
          page: prev.page > newTotalPages ? newTotalPages : prev.page,
        };
      });
      setProducts((prev) => {
        if (prev.length === 0 && page > 1) {
          setPage(page - 1);
        }
        return [...prev, newProduct];
      });
    } catch (error) {
      console.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name || "",
      price: product.price || "",
      discount: product.discount || "",
      stock: product.stock || "",
      description: product.description || "",
      brand_id: product.brand_id || "",
      category_id: product.category_id || "",
      variant: Array.isArray(product.variant)
        ? product.variant.join(", ")
        : product.variant || "",
    });
    loadFormOptions();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editProduct) return;
    setUploading(true);
    try {
      const res = await ProductService.update(editProduct.id, {
        name: form.name,
        price: Number(form.price),
        discount: Number(form.discount),
        stock: Number(form.stock),
        description: form.description,
        brand_id: Number(form.brand_id),
        category_id: Number(form.category_id),
        variant: form.variant,
      }, user.token);

      const updated = res.result;
      setProducts((prev) =>
        prev.map((p) => (p.id === editProduct.id ? { ...p, ...updated } : p))
      );
      setEditProduct(null);
      setForm(EMPTY_FORM);
      setImageFiles([]);
      setImagePreviews([]);
    } catch (error) {
      console.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCloseEdit = () => {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setImageFiles([]);
    setImagePreviews([]);
  };

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
          page: prev.page > newTotalPages ? newTotalPages : prev.page,
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

  const renderFormFields = () => (
    <>
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
          value={brands.find((b) => b.id === form.brand_id)?.name || ""}
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
          value={categories.find((c) => c.id === form.category_id)?.name || ""}
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
        <label htmlFor="variant" className="text-xs font-medium text-gray-600">
          Varian
          <span className="ml-1 text-gray-400 font-normal">(pisahkan dengan koma, cth: Merah, Biru)</span>
        </label>
        <input
          id="variant" name="variant" value={form.variant} onChange={handleChange}
          placeholder="Cth: Merah, Biru, Hijau"
          className="border border-black/20 px-3 py-2 rounded-xl bg-black/3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400"
          type="text"
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
              <span className="text-xs text-gray-400 text-center">Klik untuk upload foto<br />Maks. 5 foto, 2MB per foto</span>
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
    </>
  );

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
              {renderFormFields()}

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

      {editProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/10">
              <div>
                <h2 className="text-base font-semibold">Edit Produk</h2>
                <p className="text-xs text-gray-500 mt-0.5">Ubah informasi produk di bawah ini</p>
              </div>
              <button
                onClick={handleCloseEdit}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-gray-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form className="flex flex-col gap-5 overflow-y-auto px-6 py-5" onSubmit={handleUpdate}>
              {renderFormFields()}

              <div className="flex gap-3 pt-1 pb-1">
                <button
                  type="button"
                  onClick={handleCloseEdit}
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
                  {uploading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <span className="text-2xl font-medium">Manajement Produk</span>
        <div onClick={handleClick} className="border border-black/20 text-black px-4 py-1.5 rounded-xl gap-2 text-sm flex items-center justify-center cursor-pointer">
          <Plus size={18} /><span>Tambah Produk</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center flex-col bg-white p-4 border border-black/10 rounded-xl">
            <div className="text-2xl font-bold">{data?.total}</div>
            <div>Total Product</div>
          </div>
        ))}
      </div>

      <TableProducts
        products={products}
        remove={handleDelete}
        edit={handleEditClick}
      />

      {data && data.totalPages > 1 && (
        <Pagination data={data} setPage={setPage}/>
      )}
    </div>
  );
}
