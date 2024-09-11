const fetchProducts = async ({ queryKey }) => {
  const category = queryKey[1];
  const limit = queryKey[2] ? `?limit=${queryKey[2]}` : "";

  const apiRes = await fetch(`http://127.0.0.1:8000/api/products/${category}${limit}`);

  if (!apiRes.ok) {
    throw new Error(`Fetching products for category ${category} not ok`);
  }

  return apiRes.json();
};

export default fetchProducts;
