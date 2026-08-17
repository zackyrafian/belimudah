import { Star, } from 'lucide-react'
import { useState, useEffect } from 'react'
import ProductCard from '@/components/product-card'
import { MainLayout } from '@/components/layouts'
import { useSearchParams } from 'react-router'

const API = import.meta.env.VITE_SERVER_URL

export default function BrowserProductPage(){
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [limit, setLimit] = useState(12); 
  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const category = params.get('category') || '';
  const brand = params.get('brand') || '';

  useEffect(() => {
    const controller = new AbortController();
    const query = new URLSearchParams()
    if (search) query.set('search[name]', search)
    if (category) query.set('search[category]', category)
    fetch(`${API}/products?${query.toString()}`, { signal: controller.signal })
      .then(res => res.json())
      .then(json => setAllProducts(json.results || []))
      .catch(err => { if (err.name !== 'AbortError') console.error(err) })
    return () => controller.abort();
  }, [search, category])

  useEffect(() => {
    const controller = new AbortController(); 
    const query = new URLSearchParams()
    if (search) query.set('search[name]', search)
    if (category) query.set('search[category]', category)
    if (brand) query.set('search[brand]', brand)
    fetch(`${API}/products?${query.toString()}`, { signal: controller.signal })
      .then(res => res.json())
      .then(json => setProducts(json.results || []))
      .catch(err => { if (err.name !== 'AbortError') console.error(err) })
    return () => controller.abort();
  }, [search, category, brand])

  const brands = [...new Set(allProducts.map(p => p.brand).filter(Boolean))];

  const handleBrandClick = (b) => {
    const next = new URLSearchParams(params);
    if (brand === b) {
      next.delete('brand');
    } else {
      next.set('brand', b);
    }
    setParams(next);
  };

  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className='w-7xl m-auto flex flex-row gap-8'>
          <aside className='w-1/5 flex flex-col gap-4'>
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Harga</h3>
              <div className='flex justify-between'>
                <span>Rp 0</span>
                <span>Rp 20.000.000</span>
              </div>
            </div>
  
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Merek</h3>
              <div className='flex flex-col gap-1'>
                {brands.map((b) => (
                  <div key={b} className='flex gap-2 items-center cursor-pointer' onClick={() => handleBrandClick(b)}>
                    <input type="checkbox" readOnly checked={brand === b} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
  
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Rating Minimum</h3>
              
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                  <input type="radio" />
                  <div className='flex items-center gap-1'>
                    <div className='flex'>
                      <Star size={12}/>
                      <Star size={12}/>
                      <Star size={12}/>
                      <Star size={12}/>
                    </div>
                    <span>ke atas</span>
                  </div>
                </div>
  
                <div className='flex gap-2 items-center'>
                  <input type="radio" />
                  <div className='flex items-center gap-1'>
                    <div className='flex'>
                      <Star size={12}/>
                      <Star size={12}/>
                      <Star size={12}/>
                      <Star size={12}/>
                    </div>
                    <span>ke atas</span>
                  </div>
                </div>
              </div>
            </div>
  
  
            <div className='flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Keserdiaan</h3>
              
              <div className='flex flex-col gap-1'>
                <div className='flex gap-2 items-center'>
                  <input type="checkbox" />
                  <div>
                    <span>Stok tersedia</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
  
          <section className='w-full flex-1 gap-2 flex flex-col'>
            <span>{products.length} produk ditemukan</span>
            <div className='grid grid-cols-4 gap-4'>
            {products.slice(0, limit).map((w) => (
                  <ProductCard
                    key={w.id}
                    product={w}
                  />
                ))
              }
            </div>
            {limit < products.length && (
              <div className='flex justify-center'>
                <button
                  onClick={() => setLimit(prev => prev + 6)}
                  className="mt-4 self-center border p-4 px-40 rounded-xl"
                >
                  Muat Lebih Banyak
                </button>
              </div>
              
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  )
}
