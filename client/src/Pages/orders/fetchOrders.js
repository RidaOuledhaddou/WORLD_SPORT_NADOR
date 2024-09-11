const fetchOrders = async ({ queryKey }) => {
    console.log('eee')
    const apiRes = await fetch('http://127.0.0.1:8000/api/orders', {
        method: 'GET'
    });

    if (!apiRes.ok) {
        throw new Error('Network response was not ok');
    }

    return apiRes.json();
};

export default fetchOrders;
