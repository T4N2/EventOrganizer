// src/components/AcaraList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import AcaraForm from "./AcaraForm";

export default function AcaraList() {
  const [acara, setAcara] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/api/acara")
      .then((res) => {
        const result = Array.isArray(res.data) ? res.data : res.data.data ?? [];
        setAcara(result);
      })
      .catch((err) => {
        console.error("Gagal ambil data acara:", err);
        setAcara([]); // fallback supaya .map tidak error
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Acara Event</h1>
      <AcaraForm onSuccess={fetchData} />
      <div className="space-y-4">
        {acara.map((item) => (
          <Card key={item.id} className="p-4 border shadow-md">
            <h2 className="text-lg font-semibold">{item.acara}</h2>
            <p>{item.deskripsi}</p>
            <p>{item.lokasi}</p>
            <p>{item.tanggal}</p>
            <p>
              {item.waktu_mulai} - {item.waktu_selesai}
            </p>
            <p>Biaya: {item.biaya}</p>
            <p>Kuota: {item.kuota}</p>
            <p>Status: {item.status}</p>
            <p>Poster: {item.poster}</p>
            <p>Created: {item.created_at}</p>
            <p>Updated: {item.updated_at}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
