import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Update_product = () => {
  const [product, setProduct] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      alert('An error occurred. Please login again.');
      navigate('/login_Admin');
    } else {
      setIsAuthenticated(true);
      show_products(token);
    }
  }, [navigate]);

  async function show_products(token) {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/show_product", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="navbar">
        <div className="container">
          <div className="nav-wrapper grid p-2">
            <div className="flex justify-between items-center">
              <img src="../assets/images/logo.png" alt="Logo" />
            </div>
          </div>
        </div>
      </header>
      <div>
        <div style={styles.container}>
          <h2 style={styles.title}>Update Products</h2>
          <table style={styles.table} border="1">
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Old Price</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Stock Quantity</th>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((p) => (
                <tr key={p.id}>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>{p.old_price}</td>
                  <td style={styles.td}>{p.price}</td>
                  <td style={styles.td}>{p.stock_quantity}</td>
                  <td style={styles.td}>
                    <img
                      src={`http://127.0.0.1:8000/storage/${p.image}`}
                      alt={p.name}
                      style={styles.img}
                    />
                  </td>
                  <td style={styles.td}>
                    <Link to={`/update-product/${p.id}`}>
                      <button style={styles.button}>Update</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '960px',
    height: '800px',
    margin: 'auto',
    padding: '40px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    borderRadius: '8px',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    margin: '20px 0'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  },
  th: {
    backgroundColor: '#f4f4f4',
    padding: '10px 20px',
    border: '1px solid #ccc'
  },
  td: {
    textAlign: 'center',
    padding: '10px 20px',
    border: '1px solid #ccc'
  },
  img: {
    width: '100px',
    height: '50px',
    objectFit: 'cover'
  },
  button: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default Update_product;
