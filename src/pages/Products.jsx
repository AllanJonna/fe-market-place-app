import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/products`;

function formatRupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Gagal mengambil data produk dari server. Pastikan backend berjalan di port 5000.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="info-text">Loading produk...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <section>
      <h2>Daftar Produk</h2>

      <div className="produk-container">
        {products.map((product) => (
          <div className="card" key={product.id}>
            {product.imageUrl && (
              <img className="product-image" src={product.imageUrl} alt={product.name} />
            )}
            <h3>{product.name}</h3>
            <p className="harga">{formatRupiah(product.price)}</p>
            <Link className="detail-button" to={`/products/${product.id}`}>
              Lihat Detail
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
