# Requirement Traceability Matrix

| ID | Yêu cầu | File/UI | Test |
|---|---|---|---|
| R01 | Remote data | productService, ProductListScreen | Online/offline + retry |
| R02 | Pagination | ProductListScreen onEndReached | Cuộn cuối, không gọi khi loading |
| R03 | Search/refresh | ProductListScreen | Từ khóa đúng/sai, kéo refresh |
| R04 | Detail | ProductDetailScreen | ID đúng/sai |
| R05 | Cart state | CartContext, CartScreen | Add/update/remove |
| R06 | Derived totals | CartContext | 0/1/nhiều item |
| R07 | Persistence | AsyncStorage trong CartContext | Tắt/mở app |
| R08 | Firebase | wishlistService, WishlistScreen | Save/read/error |
| R09 | Notification | SettingsScreen, notificationService | Allow/deny/test |
| R10 | Gemini | AIRecommendationScreen, aiService | Valid/error/ID giả |
| R11 | Debug | docs/DEBUG_LOG.md | Root cause + retest |
| R12 | Release | eas.json, README | Build/install APK |
