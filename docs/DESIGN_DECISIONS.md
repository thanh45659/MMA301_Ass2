# Design decisions

| Quyết định | Lựa chọn | Lý do đơn giản |
|---|---|---|
| State | Context API | Đủ cho app nhỏ, dễ học |
| API | Service riêng | Screen không chứa URL và fetch chi tiết |
| Pagination | limit/skip | DummyJSON hỗ trợ sẵn |
| Persistence | AsyncStorage | Dễ dùng cho cart nhỏ |
| Firebase | Firestore wishlist | Có nghiệp vụ lưu sản phẩm yêu thích |
| Gemini | Gợi ý một sản phẩm | Có context catalog và validate ID |
| Notification | Local cart reminder | Gắn với business event rõ ràng |
