const BASE_URL = 'https://dummyjson.com/products';

export async function getProducts(limit = 10, skip = 0) {
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);
  if (!response.ok) throw new Error('Không tải được sản phẩm');
  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error('Không tìm thấy sản phẩm');
  return response.json();
}
