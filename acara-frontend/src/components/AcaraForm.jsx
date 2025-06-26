import { useState as useLocalState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AcaraForm({ onSuccess }) {
  const [form, setForm] = useLocalState({
    acara: "",
    deskripsi: "",
    lokasi: "",
    tanggal: "",
    waktu_mulai: "",
    waktu_selesai: "",
    biaya: "",
    kuota: "",
    status: "",
    poster: "",
  });
  const [loading, setLoading] = useLocalState(false);
  const [error, setError] = useLocalState("");
  const [success, setSuccess] = useLocalState(false);
  const [posterPreview, setPosterPreview] = useLocalState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "poster" && files && files[0]) {
      setForm({ ...form, poster: files[0] });
      setPosterPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    axios.post("http://localhost:8000/api/acara", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        setForm({
          acara: "",
          deskripsi: "",
          lokasi: "",
          tanggal: "",
          waktu_mulai: "",
          waktu_selesai: "",
          biaya: "",
          kuota: "",
          status: "",
          poster: "",
        });
        setPosterPreview(null);
        setSuccess(true);
        onSuccess();
      })
      .catch((err) => {
        setError("Gagal menyimpan acara. Silakan coba lagi.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white space-y-6 p-8 border border-gray-200 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-2 text-center">Tambah Acara Baru</h2>
      <p className="text-gray-500 text-center mb-6">Isi detail acara dengan lengkap dan benar.</p>
      {success && <div className="p-2 bg-green-100 text-green-700 rounded text-center">Acara berhasil disimpan!</div>}
      {error && <div className="p-2 bg-red-100 text-red-700 rounded text-center">{error}</div>}
      <div className="space-y-4">
        <div>
          <Label htmlFor="acara">Nama Acara</Label>
          <Input id="acara" name="acara" value={form.acara} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="deskripsi">Deskripsi</Label>
          <Input id="deskripsi" name="deskripsi" value={form.deskripsi} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="lokasi">Lokasi</Label>
          <Input id="lokasi" name="lokasi" value={form.lokasi} onChange={handleChange} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="tanggal">Tanggal</Label>
            <Input id="tanggal" name="tanggal" type="date" value={form.tanggal} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Input id="status" name="status" value={form.status} onChange={handleChange} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="waktu_mulai">Waktu Mulai</Label>
            <Input id="waktu_mulai" name="waktu_mulai" type="time" value={form.waktu_mulai} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="waktu_selesai">Waktu Selesai</Label>
            <Input id="waktu_selesai" name="waktu_selesai" type="time" value={form.waktu_selesai} onChange={handleChange} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="biaya">Biaya</Label>
            <Input id="biaya" name="biaya" type="number" min="0" value={form.biaya} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="kuota">Kuota</Label>
            <Input id="kuota" name="kuota" type="number" min="1" value={form.kuota} onChange={handleChange} required />
          </div>
        </div>
        <div>
          <Label htmlFor="poster">Poster (opsional)</Label>
          <Input id="poster" name="poster" type="text" value={form.poster} onChange={handleChange} />
        </div>
      </div>
      <Button type="submit" disabled={loading} className="w-full mt-4">
        {loading ? "Menyimpan..." : "Tambah Acara"}
      </Button>
    </form>
  );
}