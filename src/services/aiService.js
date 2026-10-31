const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

export async function askGemini(need, products) {
  if (!API_KEY) throw new Error('Chưa cấu hình Gemini API key');
  const catalog = products.map((item) => `ID ${item.id}: ${item.title}, $${item.price}`).join('\n');
  const prompt = `Người dùng cần: ${need}. Chọn đúng 1 sản phẩm trong danh sách sau. Trả lời ngắn và phải ghi ID sản phẩm.\n${catalog}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
  const response = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
  });
  if (!response.ok) throw new Error('Gemini đang bận hoặc API key không đúng');
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const matchedProduct = products.find((item) => text.includes(String(item.id)));
  if (!matchedProduct) throw new Error('AI trả về sản phẩm không có trong catalog');
  return { text, product: matchedProduct };
}
