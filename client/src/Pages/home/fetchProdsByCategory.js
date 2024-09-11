const fetchProdsByCategory = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(`http://127.0.0.1:8000/api/products/featured-products`);
  
    if (!apiRes.ok) {
      throw new Error(`details/${id} fetch not ok`);
    }
  
    return apiRes.json();
  };
  
  export default fetchProdsByCategory;
  