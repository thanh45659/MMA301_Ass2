# MMA301 Assignment 2 - Simple E-Commerce App

Project React Native + Expo ở mức cơ bản, tách mỗi screen thành một file JSX.

## Chức năng

- Catalog từ DummyJSON, phân trang 10 sản phẩm, refresh, tìm kiếm và retry.
- Chi tiết, giỏ hàng, tăng/giảm/xóa và tính tổng.
- Cart lưu bằng AsyncStorage và phục hồi khi mở app.
- Wishlist dùng Firebase Firestore; khi chưa cấu hình thì dùng AsyncStorage để app vẫn demo được.
- Gemini gợi ý từ catalog thật và kiểm tra ID trả về.
- Mô phỏng permission và thông báo nhắc giỏ hàng để chạy được trên Expo Go hiện tại.

## Cài đặt và chạy

```bash
npm install
copy .env.example .env
npx expo start
```

Sau đó mở bằng Expo Go hoặc chạy `npm run android`.

## Cấu hình

1. Tạo Firebase project và Firestore Database, điền các giá trị vào `.env`.
2. Tạo Gemini API key và điền `EXPO_PUBLIC_GEMINI_API_KEY`.
3. Không commit file `.env` hoặc API key thật.

## State và data

- `CartContext.jsx`: shared cart state và derived total.
- `productService.js`: remote product API.
- `wishlistService.js`: Firebase/local fallback.
- `aiService.js`: Gemini request và validate kết quả.
- `notificationService.js`: permission và local notification.

## Release Android

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

File APK/build link là release evidence. Muốn dùng notification hệ thống thật thì cài `expo-notifications` và tạo development build tương thích.

## Hạn chế

- Không có đăng nhập nên collection wishlist dùng chung cho demo.
- Search chỉ lọc các trang đã tải.
- API key ở client chỉ phù hợp demo môn học; production nên gọi AI qua backend.

## AI usage

AI được dùng để gợi ý cấu trúc project và code mẫu. Sinh viên cần tự chạy test, sửa cấu hình, đọc và giải thích được từng flow trước khi nộp.
