import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/products`;

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Detail produk gagal diambil dari server.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="info-text">Loading detail produk...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!product) return <p className="error-text">Produk tidak ditemukan.</p>;

  return (
    <section>
      <h2>Detail Produk</h2>

      <div className="detail-box">
        {product.imageUrl && (
          <img className="detail-image" src={product.imageUrl} alt={product.name} />
        )}
        <h3>{product.name}</h3>
        <p>
          <strong>Harga:</strong> {formatRupiah(product.price)}
        </p>
        <p>{product.description || 'Produk ini tersedia di toko online sederhana kami.'}</p>
        <Link className="back-link" to="/products">← Kembali ke daftar produk</Link>
      </div>
    </section>
  );
}

export default ProductDetail;
