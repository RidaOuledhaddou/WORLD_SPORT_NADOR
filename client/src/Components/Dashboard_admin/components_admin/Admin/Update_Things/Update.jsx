import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [information, setInformation] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [review, setReview] = useState('');
  const [brand, setBrand] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [message, setMessage] = useState('');
  const [flavors, setFlavors] = useState([]);
  const [Data_flavors, setDataFlavors] = useState([]);
  const [category, setCategory] = useState('');
  const [Data_category, setDataCategory] = useState([]);
  const [files, setFiles] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFiles(event.target.files);
    console.log(files);
  };

  useEffect(() => {
    const token = localStorage.getItem('token_admin');
    if (!token) {
      alert('An error occurred. Please login again.');
      navigate('/login_Admin');
    } else {
      setIsAuthenticated(true);
      info_category();
      info_flavor();
      fetchData(token);
    }
  }, [navigate]);

  const fetchData = async (token) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/product/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch');

      setName(data.name);
      setSubtitle(data.subtitle);
      setInformation(data.information);
      setOldPrice(data.old_price);
      setPrice(data.price);
      setStatus(data.status);
      setDescription(data.description);
      setReview(data.review);
      setBrand(data.brand);
      setStockQuantity(data.stock_quantity);
      setMainImage(data.main_image_url);
    } catch (error) {
      setMessage(error.toString());
    }
  };

  async function info_category() {
    try {
      let res = await fetch("http://127.0.0.1:8000/api/info_categories");
      let data = await res.json();
      setDataCategory(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }

  const handleCategroyChange = (event) => {
    setCategory(event.target.value);
  };

  const handleImageChange = (event) => {
    setMainImage(event.target.files[0]);
  };

  const handleFlavorChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFlavors([...flavors, value]); // Add flavor
    } else {
      setFlavors(flavors.filter(flavor => flavor !== value)); // Remove flavor
    }
  };

  async function info_flavor() {
    try {
      let res = await fetch("http://127.0.0.1:8000/api/info_flavors");
      let data = await res.json();
      setDataFlavors(data);
    } catch (error) {
      console.error('Failed to fetch flavors:', error);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('subtitle', subtitle);
    formData.append('information', information);
    formData.append('old_price', oldPrice);
    formData.append('price', price);
    formData.append('status', status);
    formData.append('description', description);
    formData.append('review', review);
    formData.append('brand', brand);
    formData.append('stock_quantity', stockQuantity);
    formData.append('main_image_url', mainImage);
    formData.append('category', category);
    flavors.forEach(flavor => formData.append('flavors[]', flavor));

    for (let i = 0; i < files.length; i++) {
      formData.append('images[]', files[i]);
    }

    try {
      const token = localStorage.getItem('token_admin');
      const response = await fetch(`http://127.0.0.1:8000/api/update_products/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      console.log("FormData before sending: ", Object.fromEntries(formData));
      if (!response.ok) throw new Error('Network response was not ok.');
      const result = await response.json();
      setMessage('Product updated successfully!');

      setTimeout(() => {
        setMessage(''); // Clear the message after 5 seconds
      }, 5000);
      console.log(result);
    } catch (error) {
      setMessage(`Error: Failed to update product, OOPS`);

      setTimeout(() => {
        setMessage(''); // Clear the message after 5 seconds
      }, 5000);
      console.error('Error during the upload:', error);
    }
  };

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
      <div style={styles.container}>
        <h2 style={styles.heading}>Update Product</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inlineFormGroup}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Subtitle:
                <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} style={styles.input} required />
              </label>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Information:
              <textarea value={information} onChange={(e) => setInformation(e.target.value)} style={styles.input} required />
            </label>
          </div>
          <div style={styles.inlineFormGroup}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Old Price:
                <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} style={styles.input} required />
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} style={styles.input} required />
              </label>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Status:
              <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} style={styles.input} required />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={styles.input} required />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Review:
              <textarea value={review} onChange={(e) => setReview(e.target.value)} style={styles.input} />
            </label>
          </div>
          <div style={styles.inlineFormGroup}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Brand:
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} style={styles.input} />
              </label>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Stock Quantity:
                <input type="number" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} style={styles.input} required />
              </label>
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Upload Main Image:
              <input type="file" onChange={handleImageChange} accept="image/*" style={styles.input} required />
            </label>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Flavors:</label>
            {Data_flavors.map(flavor => (
              <div key={flavor.id}>
                <input
                  type="checkbox"
                  id={`flavor-${flavor.id}`}
                  name="flavors"
                  value={flavor.id}
                  onChange={handleFlavorChange}
                  checked={flavors.includes(`${flavor.id}`)} // Ensuring the checkbox is checked if flavor is in the array
                  style={styles.input}
                />
                <label htmlFor={`flavor-${flavor.id}`}>{flavor.name}</label>
              </div>
            ))}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Category
              <select value={category} onChange={handleCategroyChange} style={styles.input}>
                <option value="">Select a category</option>
                {Data_category.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={styles.formGroup}>
            <input type="file" multiple onChange={handleFileChange} style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Submit</button>
        </form>
        {message && <p style={styles.error}>{message}</p>}
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '10px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff'
  },
  formGroup: {
    marginBottom: '15px'
  },
  inlineFormGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '22px',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#555',
    fontSize: '16px'  // Ensures labels are clearly readable
  },
  input: {
    width: '100%', // Ensures input fields fill the form
    padding: '7px', // Reducing padding might help if inputs still don't fit
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    outline: 'none'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#800080',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center'
  }
};

export default UpdateProduct;
