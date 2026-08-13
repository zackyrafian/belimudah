import { Edit, MapPin, PlusIcon, Trash2, X } from "lucide-react";
import { Card } from "../../components";
import { useEffect, useState } from "react";
import { useAlert } from "@/hooks/useAlert";
import Alert from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";

const API = import.meta.env.VITE_SERVER_URL;

const emptyAddress = {
  recipient_name: "",
  phone_number: "",
  recipient_email: "",
  recipient_address_full: "",
  recipient_city: "",
  recipient_province: "",
  zip_code: "",
};

async function getAddresses(token) {
  if (!token) return [];

  const response = await fetch(`${API}/users/address`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  return data.results || [];
}

export default function ProfileAddress() {
  const { alert, showSuccess, showError, clearAlert } = useAlert();
  const { user } = useAuth();
  const [shippingAddress, setShippingAddress] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState(emptyAddress);
  const [loading, setLoading] = useState(false);

  const fetchAddresses = async () => {
    if (!user?.token) return;

    const response = await fetch(`${API}/users/address`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await response.json();
    setShippingAddress(data.results || []);
  };

  useEffect(() => {
    let active = true;

    getAddresses(user?.token)
      .then((addresses) => {
        if (active) setShippingAddress(addresses);
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, [user?.token]);

  const openAddDialog = () => {
    setEditingAddress(null);
    setFormData(emptyAddress);
    setDialog(true);
  };

  const openEditDialog = (address) => {
    setEditingAddress(address);
    setFormData({
      recipient_name: address.recipient_name || "",
      phone_number: address.phone_number || "",
      recipient_email: address.recipient_email || "",
      recipient_address_full: address.recipient_address_full || "",
      recipient_city: address.recipient_city || "",
      recipient_province: address.recipient_province || "",
      zip_code: address.zip_code || "",
    });
    setDialog(true);
  };

  const closeDialog = () => {
    if (loading) return;
    setDialog(false);
    setEditingAddress(null);
    setFormData(emptyAddress);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleForm = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        editingAddress
          ? `${API}/users/address/${editingAddress.id}`
          : `${API}/users/address`,
        {
          method: editingAddress ? "PATCH" : "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal menyimpan alamat");
      }

      await fetchAddresses();
      closeDialog();
      showSuccess(editingAddress ? "Alamat berhasil diubah" : "Alamat berhasil ditambahkan");
    } catch (error) {
      showError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/users/address/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Gagal menghapus alamat");
      }

      setShippingAddress((addresses) => addresses.filter((address) => address.id !== id));
      showSuccess("Alamat berhasil dihapus");
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {alert && (
        <Alert
          title="Profile Address"
          type={alert.type}
          message={alert.message}
          onClose={clearAlert}
        />
      )}

      {dialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={20} />
                <h1 className="text-lg font-medium">
                  {editingAddress ? "Edit Alamat" : "Tambah Alamat"}
                </h1>
              </div>
              <button type="button" onClick={closeDialog}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleForm} className="flex flex-col gap-4 text-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  Nama Penerima
                  <input required name="recipient_name" value={formData.recipient_name} onChange={handleChange} className="rounded-xl border border-black/20 px-4 py-2" />
                </label>
                <label className="flex flex-col gap-1">
                  Nomor Telepon
                  <input required name="phone_number" type="tel" value={formData.phone_number} onChange={handleChange} className="rounded-xl border border-black/20 px-4 py-2" />
                </label>
              </div>

              <label className="flex flex-col gap-1">
                Email
                <input required name="recipient_email" type="email" value={formData.recipient_email} onChange={handleChange} className="rounded-xl border border-black/20 px-4 py-2" />
              </label>

              <label className="flex flex-col gap-1">
                Alamat Lengkap
                <input required name="recipient_address_full" value={formData.recipient_address_full} onChange={handleChange} className="rounded-xl border border-black/20 px-4 py-2" />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  Kota
                  <input required name="recipient_city" value={formData.recipient_city} onChange={handleChange} className="rounded-xl border border-black/20 px-4 py-2" />
                </label>
                <label className="flex flex-col gap-1">
                  Provinsi
                  <input required name="recipient_province" value={formData.recipient_province} onChange={handleChange} className="rounded-xl border border-black/20 px-4 py-2" />
                </label>
              </div>

              <label className="flex flex-col gap-1">
                Kode Pos
                <input required name="zip_code" value={formData.zip_code} onChange={handleChange} className="rounded-xl border border-black/20 px-4 py-2" />
              </label>

              <button disabled={loading} className="rounded-xl bg-blue-500 py-3 text-white disabled:opacity-50">
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </form>
          </Card>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-2xl font-medium">Alamat Pengiriman</span>
        <button type="button" onClick={openAddDialog} className="flex items-center gap-2 rounded-xl border border-black/20 px-4 py-2 text-sm text-gray-500">
          <PlusIcon size={18} />
          <span>Tambah Alamat</span>
        </button>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        {shippingAddress.map((address) => (
          <Card key={address.id} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <span>Alamat</span>
                <div className="flex h-4 items-center rounded-full bg-blue-500 px-2 text-[8px] font-normal text-white">Utama</div>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => openEditDialog(address)}>
                  <Edit size={15} />
                </button>
                <button type="button" onClick={() => handleDelete(address.id)}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">{address.recipient_name}</h3>
                <span className="text-xs text-gray-500">{address.phone_number}</span>
              </div>
              <div className="text-xs font-medium leading-relaxed text-gray-700">{address.recipient_address_full}</div>
              <span className="text-xs text-gray-400">{address.recipient_city}, {address.recipient_province} - {address.zip_code}</span>
              <span className="text-xs text-gray-500">{address.recipient_email}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
