# Test matrix

| # | Case | Expected | Actual |
|---|---|---|---|
| 1 | Load catalog online | Danh sách hiện | Chưa test thiết bị |
| 2 | Tắt mạng rồi retry | Hiện lỗi, app không crash | Chưa test thiết bị |
| 3 | Search không khớp | Hiện empty message | Chưa test thiết bị |
| 4 | Cuộn cuối | Tải trang tiếp, không trùng | Chưa test thiết bị |
| 5 | Pull refresh | Danh sách về trang đầu | Chưa test thiết bị |
| 6 | Add cùng item 2 lần | Quantity = 2 | Chưa test thiết bị |
| 7 | Giảm quantity về 0 | Item bị xóa | Chưa test thiết bị |
| 8 | Mở lại app | Cart được restore | Chưa test thiết bị |
| 9 | Firebase save/read | Wishlist hiện item | Chưa test cấu hình |
| 10 | Firebase lỗi | Có feedback, không crash | Chưa test cấu hình |
| 11 | Deny notification | Hiện trạng thái rõ | Chưa test thiết bị |
| 12 | Allow notification | Nhận cart reminder | Chưa test thiết bị |
| 13 | Gemini valid | Gợi ý item có trong list | Chưa test API key |
| 14 | Gemini lỗi/ID giả | Hiện fallback error | Chưa test API key |
| 15 | APK install/run | Core flow chạy | Chưa build |

Điền cột Actual và chụp evidence sau khi test thật; không ghi Passed nếu chưa chạy.
