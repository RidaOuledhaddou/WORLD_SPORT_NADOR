const fetchProductById = async ({ queryKey }) => {
    const id = queryKey[1];
    const apiRes = await fetch(`http://127.0.0.1:8000/api/product/${id}`);
  
    if (!apiRes.ok) {
      throw new Error(`details/${id} fetch not ok`);
    }
  
    return apiRes.json();
  };
  
  export default fetchProductById;
  