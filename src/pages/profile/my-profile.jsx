import { formatIDR, formatDate } from "@/utils/format";
import { Card } from "../../components";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { ImageOff, ScanEye, Star } from "lucide-react";

const API = import.meta.env.VITE_SERVER_URL

export default function MyProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalPreview, setModalPreview] = useState(false);
  const [reviews, setReviews] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orders, setOrders] = useState([]);

  // console.log(orders)
  // console.log(selectedOrder)
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/users/orders`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      const data = await res.json();
      setOrders(data.results);
    }
    fetchData();
  }, [])

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalPreview(true);
    const initial = {};
    order.items.forEach((item) => {
      initial[item.id] = { rating: 0, comment: "" };
    });
    setReviews(initial);
  };

  const handleRating = (variantId, value) => {
    setReviews((prev) => ({
      ...prev,
      [variantId]: { ...prev[variantId], rating: value },
    }));
  };

  const handleComment = (variantId, value) => {
    setReviews((prev) => ({
      ...prev,
      [variantId]: { ...prev[variantId], comment: value },
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const requests = selectedOrder.items.map((item) => {
        const review = reviews[item.id];
        // console.log(review)
        return fetch(`${API}/products/${item.product_id}/reviews`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            rating: review.rating,
            comment: review.comment,
            variant_id: item.variant_id,
          }),
        });
      });
      await Promise.all(requests);
      setModalPreview(false);
      setSelectedOrder(null);
    } catch (err) {
      console.log(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {modalPreview && selectedOrder && (
        <div
          className="fixed w-full z-50 inset-0 bg-black/20 items-center flex justify-center"
          onClick={() => setModalPreview(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Card className="w-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
              <div className="flex gap-2 items-center">
                <ScanEye size={24} />
                <h1 className="text-xl font-medium">Berikan Ulasan</h1>
              </div>

              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 border-b border-black/10 pb-4">
                  <div className="flex gap-2 items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                        {item.images ? (
                          <img src={item.images} alt={item.product_name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageOff size={16} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">{item.product_name}</span>
                        <span className="text-xs text-black/50">x{item.quantity} · {formatIDR(item.price)}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRating(item.id, star)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={22}
                            className={
                              star <= (reviews[item.id]?.rating ?? 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    className="rounded-xl p-4 border border-black/20 bg-black/3 text-sm resize-none"
                    rows={3}
                    placeholder="Tulis komentarmu di sini..."
                    value={reviews[item.id]?.comment ?? ""}
                    onChange={(e) => handleComment(item.id, e.target.value)}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalPreview(false)}
                  className="border border-black/20 text-black/70 rounded-xl py-1.5 px-4 text-sm"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-blue-500 text-white rounded-xl py-1.5 px-4 text-sm disabled:opacity-50"
                >
                  {submitting ? "Mengirim..." : "Kirim Ulasan"}
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      <span className="text-2xl">Pesanan Saya</span>

      {orders?.map((order, i) => (
        <Card key={i} className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-bold">#{order?.id}</span>
              <span className="text-xs">{formatDate(order.created_at)}</span>
            </div>
            <div className="bg-blue-500 text-white px-2 font-medium text-xs rounded-l-xl py-0.5 rounded-r-xl">{order.status}</div>
          </div>

          {order.items?.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.product_name.toLowerCase().replaceAll(' ', '-')}`)}
              className="flex gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-md overflow-hidden">
                {item.images ? (
                  <img src={item.images} alt="headphone" />
                ) : (
                  <div className="w-full h-full bg-gray-200 text-gray-400 rounded-xl flex items-center justify-center">
                    <ImageOff size={14} />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm">{item.product_name}</span>
                <span className="text-sm">x{item?.quantity} · {formatIDR(item?.price)}</span>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center border-t-black/20 border-t pt-4">
            <div>Total: <span className="text-blue-500">{formatIDR(order.total_price)}</span></div>
            <div className="flex gap-2 text-sm">
              <button className="border border-blue-500 text-blue-500 rounded-xl py-1.5 px-4">Lacak</button>
              {order.status === "DONE" && (
                <button
                  onClick={() => openModal(order)}
                  className="border bg-blue-500 text-white border-blue-500 rounded-xl py-1.5 px-4"
                >
                  Beri Ulasan
                </button>
              )}
              <button className="border border-black/40 text-black/70 rounded-xl py-1.5 px-4">Beli Lagi</button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
