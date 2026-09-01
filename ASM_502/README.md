# GenZ Fashion Store Backend

Backend cho GenZ Fashion Store với MongoDB.

## Chạy dự án

1. Cài dependencies:

```powershell
Set-Location d:\NewProject\ASM_502
npm install
```

2. Khởi động server cũ bình thường (kiểm tra trước khi chuyển sang Mongo):

```powershell
npm run server
```

3. Khởi động server với MongoDB:

```powershell
$env:USE_MONGO='true'
$env:MONGO_URI='mongodb://127.0.0.1:27017'
npm run server
```

## API Mongo

Prefix: `/api/mongo`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /products/:productId/variants`
- `GET /products/:productId/variants`
- `GET /categories`
- `POST /categories`
- `GET /warehouses`
- `POST /warehouses`
- `GET /warehouses/:warehouseId/stock/:variantId`
- `POST /stock/adjust`
- `POST /stock/transfer`
- `GET /orders`
- `GET /orders/:id`
- `POST /orders`
- `PUT /orders/:id/status`

## Lưu ý

- Cần chạy MongoDB local hoặc remote.
- `USE_MONGO=true` bật route Mongo mới.
- `db.json` vẫn giữ nguồn mock cũ.
