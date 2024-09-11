import { useEffect, useState } from "react";

const DeleteProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    showProducts();
  }, []);

  async function showProducts() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/show_product");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete_product/${id}`, { method: 'DELETE' });
      if (response.ok) {
        showProducts(); // Refresh the list on successful delete
      } else {
        console.error('Failed to delete product:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
        <div style={styles.container}>
      <h2 style={styles.title}>Delete Products</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            {["name", "old_price", "price", "stock_quantity", "image", "Actions"].map(header => (
              <th key={header} style={styles.th}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>{product.old_price}</td>
              <td style={styles.td}>{product.price}</td>
              <td style={styles.td}>{product.stock_quantity}</td>
              <td style={styles.td}>
                <img
                  style={styles.img}
                  src={`http://127.0.0.1:8000/storage/${product.image}`}
                  
                />
              </td>
              <td style={styles.td}>
                <button style={styles.buttonDelete} onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

const styles = {
  container: {
    margin: ' auto',
    width: '80%',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px', // Example font size
    marginTop: '20px',
    marginBottom: '20px'
  },
  heading: {
    color: '#333',
    textAlign: 'center'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  },
  th: {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    border: '1px solid #ddd'
  },
  td: {
    textAlign: 'center',
    padding: '10px',
    border: '1px solid #ddd'
  },
  button: {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#800080', // Purple color
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px'
  },
  img: {
    width: '200px',
    height: '50px',
    objectFit: 'cover'
  },
  buttonDelete:{
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#FF0000', // Purple color
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px'
  }

};
export default DeleteProduct;
