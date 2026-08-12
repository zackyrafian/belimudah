import { Check, Truck, Heart, ShoppingCart, Star, ImageOff, ChevronRight} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router'
import { formatIDR } from '@/utils/format'
import { calculateDiscount } from '@/utils/calculate'
import { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layouts'
import Alert from '@/components/ui/alert'
import ProductCard from '@/components/product-card'
import { useAuth } from '@/hooks/useAuth'

const API = import.meta.env.VITE_SERVER_URL

export default function Product() {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const params = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [variant, setVariantSelect] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetch(`${API}/products/${params.id}`)
      .then(res => res.json())
      .then(json => {
        const p = json.results?.[0] ?? json.result ?? json.data;
        setProduct(p);
        setVariantSelect(p?.variant?.[0] || null);
        setSelectedImage(0);
        if (p?.category) {
          fetch(`${API}/products?search[category]=${encodeURIComponent(p.category)}`)
            .then(r => r.json())
            .then(j => setRelated((j.results || []).filter(r => r.id !== p.id).slice(0, 4)))
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleCart = async () => {
    if (!user) { 
      navigate('/sign-in')
      return
    }
    try {
      const res = await fetch(`${API}/users/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ product_id: product.id, quantity })
      });
      const json = await res.json();
      if (!res.ok) {
        setAlert({ id: Date.now(), type: 'error', message: json.message || 'Gagal menambahkan ke keranjang.' });
        return;
      }
      setAlert({ id: Date.now(), type: 'success', message: `Berhasil menambahkan ${product.name} ke keranjang.` });
    } catch (err) {
      setAlert({ id: Date.now(), type: 'error', message: err.message });
    }
  }

  if (loading) return <MainLayout><div className='p-8 text-center'>Memuat produk...</div></MainLayout>
  if (!product) return <MainLayout><div className='p-8 text-center'>Produk tidak ditemukan.</div></MainLayout>


  const discount = Number(product.discount) || 0;
  const hasDiscount = discount > 0;
  const { finalPrice, save } = hasDiscount
    ? calculateDiscount(product.price, discount)
    : { finalPrice: product.price, save: 0 };

  return (
    <div className="flex flex-col border">
      {alert && (
        <Alert
          key={alert.id}
          title="Product"
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <MainLayout>
      <div className='lg:w-7xl m-auto flex-col gap-4 flex pt-4'>
        <div className="hidden text-sm lg:flex lg:items-center lg:gap-2">
          <Link to="/">Beranda</Link>
          <ChevronRight size={16} />
        
          <Link to={`/browser-product?category=${product.category}`}>
            {product.category}
          </Link>
          <ChevronRight size={16} />
        
          <span className="font-bold">{product.name}</span>
        </div>
        <div className='flex flex-col gap-8 lg:flex-row'>
          <div className='w-screen lg:w-1/2'>
              <div className='w-full'>
                {product.images?.[selectedImage] ? (
                  <img src={`${API}${product.images[selectedImage]}`} alt={product.name} className='lg:rounded-xl min-h-156 max-h-156 w-full object-cover' />
                ) : 
                <div className="w-full min-h-156 rounded-xl flex items-center justify-center bg-gray-200 text-gray-400">
                  <ImageOff size={32} />
                </div>
                }
            </div>
            <div className='flex gap-2 mt-2'>
              {product.images.map((image, i) => ( 
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-md overflow-hidden cursor-pointer border-2 transition-all ${selectedImage === i ? 'border-blue-500' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={`${API}${image}`} alt={`${product.name} ${i + 1}`} className='w-full h-full object-cover' />
                </div>
              ))}
            </div>
          </div>
          <div className='max-w-screen px-2 lg:min-w-1/2 flex flex-col gap-4'>
            <div>
              <div className='flex gap-2'>
                <span>{product.brand}</span>
                <span>{product.category}</span>
              </div>
              <h1 className='text-2xl font-bold'>{product.name}</h1>
              <div>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='flex gap-0.5 items-center'>
                    {Array.from({length:5}).map((_, i) => ( 
                      <Star key={i} className={i < Math.round(product.rating) ? 'fill-yellow-500 text-yellow-500': 'hidden'} size={14} />
                    ))}
                  </div>

                  <span>{product.rating}</span>
                  <span>(512)</span>
                  <div className='flex gap-1 items-center bg-green-200 text-green-600 rounded-md px-2 py-0.5'>
                    <Check size={14} />
                    <span className='text-sm'>Tersedia (45)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-blue-200 p-4 flex rounded-xl flex-col gap-1'>
              <div className='flex items-center gap-4'>
                <span className='text-3xl font-bold text-blue-700'>
                  {formatIDR(finalPrice)}
                </span>

                {hasDiscount && (
                  <div className='flex gap-2'>
                    <span>{formatIDR(product.price)}</span>
                    <div className='rounded-full bg-red-600 text-white px-2 py-0.5 flex items-center'>
                      <span className='text-xs'>Hemat {discount}%</span>
                    </div>
                  </div>
                )}
              </div>

              {hasDiscount && (
                <div>
                  <span className='text-green-600'>
                    Kamu hemat {formatIDR(save)}
                  </span>
                </div>
              )}
            </div>

            <div className='hidden lg:flex lg:gap-2 lg:flex-col'>
              <span>Variant: {variant}</span>
              <div className='flex gap-2'>
                {product.variant.map((set, index) => {
                  const isActive = variant === set;
                
                  return (
                    <button
                      key={index}
                      onClick={() =>
                        setVariantSelect(set)}
                      className={`
                        px-4 py-2 rounded-xl border transition-all duration-200
                        ${isActive 
                          ? ' text-blue-500 border-blue-500 bg-white-500 scale-[1.02]' 
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-500'
                        }
                        active:scale-95
                      `}
                    >
                      {set}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className='hidden lg:flex lg:gap-2 lg:flex-col'>
              <span>Jumlah: {quantity}</span>
              <div className='border border-black/20 flex px-4 py-1 gap-4 rounded-xl items-center w-fit'>
                <button onClick={() => setQuantity(quantity - 1)} className='w-6 text-center cursor-pointer'>-</button>
                <span className='w-6 text-center'>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className='w-6 text-center cursor-pointer'>+</button>
              </div>
            </div>

            <div className='flex gap-2 w-full
              fixed bottom-0 left-0 right-0 z-5 bg-white p-2
              md:static md:bg-transparent md:p-0'>
                <button onClick={handleCart} className='flex-1 gap-4 px-3 flex bg-blue-500 borde text-white r-orange-400  rounded-xl items-center justify-center hover:bg-blue-400'>
                <ShoppingCart size={18}/>
                <span className='font-semibold'>Tambah Keranjang</span>
              </button>
              {/* <div className='flex-1 p-4 flex border border-orange-400 bg-orange-400  rounded-xl text-white items-center justify-center'>
                <span>Beli Sekarang</span>
              </div>*/}
              <div className='flex justify-center items-center border border-black/20  p-3 rounded-xl'>
                <Heart />
              </div>
            </div>

            <div className='hidden lg:grid-cols-3 lg:grid gap-2'>
              <div className='bg-gray-200/30 border-black/20 border rounded-xl flex flex-col gap-2 items-center p-2'>
                <Truck size={18} className='text-blue-500' />
                <div className='flex flex-col text-center'>
                  <span className='text-xs'>Gratis Ongkir</span>
                  <span className='text-xs'>Min. Rp 100.000</span>
                </div>
              </div>
              <div className='bg-gray-200/30 border-black/20 border rounded-xl flex flex-col gap-2 items-center p-2'>
                <Truck size={18} className='text-blue-500' />
                <div className='flex flex-col text-center'>
                  <span className='text-xs'>Gratis Ongkir</span>
                  <span className='text-xs'>Min. Rp 100.000</span>
                </div>
              </div>
              <div className='bg-gray-200/30 border-black/20 border rounded-xl flex flex-col gap-2 items-center p-2'>
                <Truck size={18} className='text-blue-500' />
                <div className='flex flex-col text-center'>
                  <span className='text-xs'>Gratis Ongkir</span>
                  <span className='text-xs'>Min. Rp 100.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className= 'lg:bg-white lg:border lg:border-black/20 rounded-xl'>
          <header className='flex gap-4 text-sm p-4 border-b border-b-black/20'>
            <div>Deksripsi</div>
            <div>Spesifikasi</div>
            <div>Ulasan (2)</div>
          </header>

          <main className='p-6 flex flex-col gap-4'>
            <h2 className='font-medium text-xl'>{product.name}</h2>
            <div className='flex flex-col'>
              <span> Brand: {product.brand} </span>
              <span>Category: {product.category}</span>
            </div>
            <p className='text-justify'>{product.description}</p>
          </main>
        </section>

        <section className='flex gap-4 p-4 lg:p-0 flex-col'>
          <h1 className='text-2xl font-medium'>Product Terkait</h1>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
      </MainLayout>
    </div>
  )
}