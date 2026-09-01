# FashionStock

FashionStock là hệ thống quản lý bán hàng và tồn kho cho cửa hàng thời trang, giúp theo dõi sản phẩm quần áo, quản lý số lượng hàng hóa, xử lý đơn hàng, giám sát khách hàng và hỗ trợ vận hành kho hiệu quả hơn.

Dự án này bao gồm:
- Frontend: ASM_502
- Backend/API: ASM_503

---

## 1. Tổng quan

FashionStock được thiết kế để hỗ trợ các cửa hàng quần áo, boutique hoặc shop thời trang trong việc:
- quản lý danh mục sản phẩm
- kiểm soát số lượng hàng tồn kho
- quản lý đơn hàng và trạng thái giao hàng
- quản lý khách hàng, nhà cung cấp và danh mục
- thống kê doanh thu và báo cáo nhanh
- hỗ trợ bán hàng trực tuyến hoặc nội bộ

---

## 2. Chức năng chính

### Quản lý sản phẩm
- Thêm, sửa, xóa sản phẩm
- Quản lý danh mục sản phẩm
- Theo dõi giá bán, kích thước, màu sắc, số lượng tồn
- Tìm kiếm và lọc sản phẩm

### Quản lý kho
- Theo dõi tồn kho theo từng sản phẩm
- Cảnh báo khi hàng sắp hết
- Giám sát nhập/xuất hàng
- Quản lý vị trí kho, khu vực lưu trữ

### Quản lý đơn hàng
- Tạo đơn hàng mới
- Cập nhật trạng thái đơn hàng
- Xử lý đơn hàng chờ xác nhận / đang giao / hoàn tất / hủy
- Theo dõi lịch sử giao dịch

### Quản lý khách hàng
- Lưu thông tin khách hàng
- Theo dõi lịch sử mua hàng
- Phân loại khách hàng theo nhóm

### Quản lý nhà cung cấp
- Theo dõi nhà cung cấp và đơn hàng nhập
- Quản lý sản phẩm từ nhà cung cấp

### Báo cáo và thống kê
- Doanh thu theo ngày/tháng
- Sản phẩm bán chạy
- Tồn kho thấp
- Báo cáo đơn hàng và khách hàng

---

## 3. Công nghệ sử dụng

### Frontend
- HTML
- CSS
- TypeScript
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Handlebars
- Cloudinary (upload ảnh)
- JWT / Session cho xác thực người dùng

---

## 4. Cấu trúc dự án

```text
ASM/
├── ASM_502/                  # Frontend / giao diện người dùng
│   ├── index.html
│   ├── package.json
│   ├── src/
│   ├── css/
│   └── public/
│
├── ASM_503/                  # Backend / API / quản lý dữ liệu
│   ├── app.js
│   ├── package.json
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── views/
│   ├── config/
│   └── middleware/
│
├── README.md                # Tài liệu dự án
└── package-lock.json
```

---

## 5. Yêu cầu hệ thống

- Node.js >= 18
- npm hoặc pnpm
- MongoDB
- Internet / môi trường phát triển cho Cloudinary nếu dùng chức năng upload ảnh

---

## 6. Cài đặt

### Bước 1: Clone dự án

```bash
git clone <repository-url>
cd ASM
```

### Bước 2: Cài đặt frontend

```bash
cd ASM_502
npm install
```

### Bước 3: Cài đặt backend

```bash
cd ../ASM_503
npm install
```

### Bước 4: Cấu hình môi trường

Tạo file `.env` trong `ASM_503` nếu cần với các biến như:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fashionstock
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 7. Chạy dự án

### Chạy frontend

```bash
cd ASM_502
npm run dev
```

### Chạy backend

```bash
cd ASM_503
npm run dev
```

### Chạy server production

```bash
cd ASM_503
npm start
```

---

## 8. Seed dữ liệu mẫu

Để tạo dữ liệu mẫu ban đầu cho hệ thống:

```bash
cd ASM_503
npm run seed
```

---

## 9. Quy trình hoạt động

1. Admin hoặc quản lý thêm danh mục sản phẩm
2. Nhập hàng hoặc cập nhật số lượng tồn kho
3. Khách hàng đặt hàng hoặc mua hàng
4. Hệ thống cập nhật đơn hàng và tồn kho tự động
5. Quản lý theo dõi doanh thu, báo cáo và trạng thái đơn hàng

---

## 10. Lợi ích của hệ thống

- Giảm sai sót trong quản lý kho
- Theo dõi hàng tồn dễ dàng hơn
- Tăng hiệu quả bán hàng
- Dễ quản lý theo thời gian thực
- Hỗ trợ ra quyết định kinh doanh nhanh hơn

---

## 11. Đóng góp

Nếu bạn muốn đóng góp cho dự án, vui lòng:
- Fork repository
- Tạo nhánh mới
- Commit thay đổi
- Tạo Pull Request

---

## 12. Giấy phép

Dự án này đang được phát triển cho mục đích học tập và quản lý nội bộ. Vui lòng liên hệ chủ sở hữu nếu muốn sử dụng cho môi trường thương mại hoặc sản xuất.

---

## 13. Gợi ý tên dự án

Tên đề xuất cho dự án là:
- FashionStock
- ASM Fashion Stock
- StyleStock
- ApparelFlow

Trong số đó, tên phù hợp nhất cho hệ thống bán quần áo và quản lý tồn kho là:

### FashionStock

---

## 14. Thông tin liên hệ

- Tác giả: ASM Team
- Mục tiêu: Quản lý thời trang, bán hàng và kho hàng hiệu quả

---

Mọi thắc mắc hoặc góp ý vui lòng cập nhật trong dự án để tiếp tục phát triển hệ thống.
