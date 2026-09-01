require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const { Product, Category } = require('./models');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/genz_warehouse';

async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công:', MONGODB_URI);

    // Xóa toàn bộ sản phẩm cũ
    await Product.deleteMany({});
    console.log('🗑️  Đã xóa toàn bộ sản phẩm cũ');

    // =============================================
    // TÌM DANH MỤC
    // =============================================
    const catAoThunNu = await Category.findOne({ name: 'Áo thun nữ' });
    const catAoPoloNu = await Category.findOne({ name: 'Áo polo nữ' });
    const catAoKieuNu = await Category.findOne({ name: 'Áo kiểu nữ' });
    const catAoChongNangNu = await Category.findOne({ name: 'Áo chống nắng nữ' });
    const catAoThunDaiTayNu = await Category.findOne({ name: 'Áo thun dài tay nữ' });
    const catAoSatNachNu = await Category.findOne({ name: 'Áo sát nách nữ' });
    const catVayNu = await Category.findOne({ name: 'Váy nữ' });
    const catQuanShortsNu = await Category.findOne({ name: 'Quần shorts nữ' });
    const catAoThunNam = await Category.findOne({ name: 'Áo thun nam' });
    const catQuanShortsNam = await Category.findOne({ name: 'Quần shorts nam' });

    console.log('📂 Đã tìm thấy tất cả danh mục');

    let count = 0;

    // =============================================
    // ÁO THUN NỮ (6 sản phẩm)
    // =============================================
    console.log('\n👗 Đang tạo sản phẩm Áo thun nữ...');

    await Product.create({
      sku: 'ATN-001',
      name: 'Áo Thun Nữ Cổ Tròn Basic',
      description: 'Áo thun nữ cổ tròn basic với chất liệu cotton 100% mềm mại, thấm hút mồ hôi tốt. Thiết kế đơn giản, dễ phối đồ, phù hợp mặc hàng ngày đi học, đi làm hay dạo phố. Form áo vừa vặn tôn dáng, đường may tỉ mỉ chắc chắn.',
      category: catAoThunNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-nu1.webp'],
      price: 199000,
      salePrice: 149000,
      material: 'Cotton 100%',
      instruction: 'Giặt máy ở nhiệt độ thường, không sử dụng chất tẩy, phơi trong bóng râm, ủi ở nhiệt độ thấp.',
      rating: 4.8,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-thun-nu1.webp' }],
      stock: 85,
      weight: 180,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'ATN-002',
      name: 'Áo Thun Nữ Tay Ngắn In Họa Tiết',
      description: 'Áo thun nữ tay ngắn với họa tiết in sắc nét, không bong tróc sau nhiều lần giặt. Chất vải cotton pha spandex co giãn nhẹ, thoáng mát và thoải mái khi vận động. Phong cách trẻ trung, năng động cho các bạn nữ yêu thích sự cá tính.',
      category: catAoThunNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-nu2.webp'],
      price: 249000,
      salePrice: null,
      material: 'Cotton pha Spandex',
      instruction: 'Giặt lộn trái, giặt máy với nước lạnh, không ngâm lâu, phơi trong bóng râm để giữ màu.',
      rating: 4.5,
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Hồng', code: '#f472b6', image: '/ao-thun-nu2.webp' }],
      stock: 60,
      weight: 190,
      style: 'Streetwear'
    });
    count++;

    await Product.create({
      sku: 'ATN-003',
      name: 'Áo Thun Nữ Dáng Rộng Oversize',
      description: 'Áo thun nữ dáng rộng oversize phong cách Hàn Quốc, che khuyết điểm cơ thể hiệu quả. Chất cotton dày dặn, form rộng thoải mái, tạo cảm giác tự do khi mặc. Phù hợp phối cùng quần jean, shorts hoặc chân váy.',
      category: catAoThunNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-nu3.webp'],
      price: 229000,
      salePrice: 179000,
      material: 'Cotton 95% - Spandex 5%',
      instruction: 'Giặt máy ở chế độ nhẹ, không vắt mạnh, phơi trên móc áo để giữ form dáng.',
      rating: 4.7,
      sizes: ['M', 'L', 'XL'],
      colors: [{ name: 'Đen', code: '#000000', image: '/ao-thun-nu3.webp' }],
      stock: 72,
      weight: 220,
      style: 'Streetwear'
    });
    count++;

    await Product.create({
      sku: 'ATN-004',
      name: 'Áo Thun Nữ Cổ Tim',
      description: 'Áo thun nữ cổ tim thanh lịch, tôn lên vẻ nữ tính và quyến rũ. Đường cắt cổ tim vừa phải, không quá sâu, phù hợp mọi vóc dáng. Chất vải mềm mại, co giãn tốt, mặc thoải mái suốt cả ngày dài.',
      category: catAoThunNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-nu4.webp'],
      price: 219000,
      salePrice: null,
      material: 'Cotton Compact',
      instruction: 'Giặt tay hoặc giặt máy chế độ nhẹ, không sử dụng chất tẩy mạnh, phơi nơi thoáng mát.',
      rating: 4.3,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xanh navy', code: '#1e3a5f', image: '/ao-thun-nu4.webp' }],
      stock: 55,
      weight: 175,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'ATN-005',
      name: 'Áo Thun Nữ Phối Sọc',
      description: 'Áo thun nữ phối sọc ngang phong cách Pháp thanh lịch, mang đến vẻ ngoài trẻ trung và tươi mới. Chất liệu cotton cao cấp, mềm mại, thấm hút tốt. Thiết kế sọc tinh tế, dễ phối đồ cho nhiều hoàn cảnh khác nhau.',
      category: catAoThunNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-nu5.webp'],
      price: 259000,
      salePrice: 199000,
      material: 'Cotton 100%',
      instruction: 'Giặt lộn trái với nước lạnh, không sử dụng chất tẩy có clo, phơi trong bóng râm.',
      rating: 4.6,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-thun-nu5.webp' }],
      stock: 48,
      weight: 185,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'ATN-006',
      name: 'Áo Thun Nữ Croptop',
      description: 'Áo thun nữ croptop trẻ trung, năng động dành cho các bạn nữ yêu thích phong cách tự do. Chiều dài áo vừa phải, tôn lên vòng eo thon gọn. Chất cotton mỏng nhẹ, thoáng mát, phù hợp mặc mùa hè hoặc khi tập gym.',
      category: catAoThunNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-nu6.webp'],
      price: 179000,
      salePrice: null,
      material: 'Cotton pha Modal',
      instruction: 'Giặt tay nhẹ nhàng hoặc giặt máy trong túi giặt, phơi phẳng trên mặt phẳng.',
      rating: 4.4,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [{ name: 'Be', code: '#d2b48c', image: '/ao-thun-nu6.webp' }],
      stock: 65,
      weight: 150,
      style: 'Sporty'
    });
    count++;
    console.log(`  ✅ Đã tạo ${count} sản phẩm Áo thun nữ`);

    // =============================================
    // ÁO POLO NỮ (9 sản phẩm)
    // =============================================
    console.log('\n👗 Đang tạo sản phẩm Áo polo nữ...');

    await Product.create({
      sku: 'APN-001',
      name: 'Áo Polo Nữ Cổ Bẻ Classic',
      description: 'Áo polo nữ cổ bẻ classic với thiết kế thanh lịch, sang trọng. Chất liệu pique cotton thoáng khí, thấm hút mồ hôi tốt. Phù hợp mặc đi làm văn phòng, đi chơi golf hoặc dạo phố cuối tuần. Đường may chắc chắn, giữ form tốt sau nhiều lần giặt.',
      category: catAoPoloNu._id,
      brand: 'GENZ',
      images: ['/ao-polo-nu1.webp'],
      price: 349000,
      salePrice: 279000,
      material: 'Cotton Pique',
      instruction: 'Giặt máy ở 30°C, không sử dụng chất tẩy, ủi mặt trái ở nhiệt độ trung bình.',
      rating: 4.7,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-polo-nu1.webp' }],
      stock: 70,
      weight: 220,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'APN-002',
      name: 'Áo Polo Nữ Phối Màu',
      description: 'Áo polo nữ phối màu năng động với đường viền cổ và tay áo tạo điểm nhấn nổi bật. Chất liệu cotton CVC mềm mại, co giãn nhẹ, mặc thoải mái cả ngày. Thiết kế trẻ trung phù hợp cho các hoạt động thể thao và dạo phố.',
      category: catAoPoloNu._id,
      brand: 'GENZ',
      images: ['/ao-polo-nu2.webp'],
      price: 379000,
      salePrice: null,
      material: 'Cotton CVC',
      instruction: 'Giặt lộn trái, giặt máy ở chế độ nhẹ, không ngâm lâu, phơi trong bóng râm.',
      rating: 4.5,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Hồng', code: '#f472b6', image: '/ao-polo-nu2.webp' }],
      stock: 55,
      weight: 230,
      style: 'Sporty'
    });
    count++;

    await Product.create({
      sku: 'APN-003',
      name: 'Áo Polo Nữ Tay Ngắn Thêu Logo',
      description: 'Áo polo nữ tay ngắn với chi tiết thêu logo tinh xảo ở ngực trái. Chất vải TC cao cấp, bền màu, ít nhăn, dễ chăm sóc. Form áo regular fit vừa vặn, tôn dáng mà không quá ôm sát, mang đến sự tự tin cho người mặc.',
      category: catAoPoloNu._id,
      brand: 'GENZ',
      images: ['/ao-polo-nu3.webp'],
      price: 399000,
      salePrice: 329000,
      material: 'Vải TC (65% Polyester - 35% Cotton)',
      instruction: 'Giặt máy ở nhiệt độ thường, ủi ở nhiệt độ thấp, không vắt xoắn mạnh.',
      rating: 4.6,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xanh navy', code: '#1e3a5f', image: '/ao-polo-nu3.webp' }],
      stock: 48,
      weight: 235,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'APN-004',
      name: 'Áo Polo Nữ Dáng Suông',
      description: 'Áo polo nữ dáng suông thoải mái, phù hợp cho mọi vóc dáng cơ thể. Chất liệu lacoste cotton mềm mịn, thoáng khí, không bám dính vào cơ thể khi trời nóng. Cổ bẻ lịch sự, phù hợp mặc trong nhiều dịp khác nhau.',
      category: catAoPoloNu._id,
      brand: 'GENZ',
      images: ['/ao-polo-nu4.webp'],
      price: 329000,
      salePrice: null,
      material: 'Lacoste Cotton',
      instruction: 'Giặt máy với nước lạnh, phơi trên móc áo, ủi nhẹ mặt trái để giữ form.',
      rating: 4.4,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Be', code: '#d2b48c', image: '/ao-polo-nu4.webp' }],
      stock: 62,
      weight: 225,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'APN-005',
      name: 'Áo Polo Nữ Viền Sọc Thể Thao',
      description: 'Áo polo nữ viền sọc thể thao với thiết kế khỏe khoắn, năng động. Đường viền sọc ở cổ và tay áo tạo phong cách sporty chic. Chất liệu polyester pha cotton nhanh khô, thấm hút mồ hôi, lý tưởng cho các hoạt động ngoài trời.',
      category: catAoPoloNu._id,
      brand: 'GENZ',
      images: ['/ao-polo-nu5.webp'],
      price: 359000,
      salePrice: 289000,
      material: 'Polyester pha Cotton',
      instruction: 'Giặt máy ở 30°C, không sử dụng chất tẩy, phơi trong bóng râm, ủi mặt trái.',
      rating: 4.3,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xám', code: '#6b7280', image: '/ao-polo-nu5.webp' }],
      stock: 40,
      weight: 210,
      style: 'Sporty'
    });
    count++;

    await Product.create({
      sku: 'APN-006',
      name: 'Áo Polo Nữ Cổ Trụ Thanh Lịch',
      description: 'Áo polo nữ cổ trụ thanh lịch mang phong cách công sở hiện đại. Thiết kế cổ trụ cao vừa phải tạo vẻ sang trọng, đẳng cấp. Chất vải mát lạnh, co giãn 4 chiều, thoải mái vận động suốt cả ngày làm việc.',
      category: catAoPoloNu._id,
      brand: 'GENZ',
      images: ['/ao-polo-nu6.webp'],
      price: 449000,
      salePrice: null,
      material: 'Vải Coolmax',
      instruction: 'Giặt tay hoặc giặt máy chế độ nhẹ, không ngâm tẩy, phơi nơi thoáng mát.',
      rating: 4.8,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Đen', code: '#000000', image: '/ao-polo-nu6.webp' }],
      stock: 35,
      weight: 240,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'APN-007',
      name: 'Áo Polo Nữ Phối Nút Gỗ',
      description: 'Áo polo nữ phối nút gỗ tự nhiên mang phong cách vintage độc đáo. Chi tiết nút gỗ tạo điểm nhấn thời trang khác biệt. Chất liệu organic cotton thân thiện với da nhạy cảm, không gây kích ứng, mềm mại sau mỗi lần giặt.',
      category: catAoPoloNu._id,
      brand: 'GENZ',
      images: ['/ao-polo-nu7.webp'],
      price: 389000,
      salePrice: 319000,
      material: 'Organic Cotton',
      instruction: 'Giặt tay với nước ấm, không vắt xoắn, phơi phẳng trên mặt phẳng.',
      rating: 4.5,
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Nâu', code: '#92400e', image: '/ao-polo-nu7.webp' }],
      stock: 45,
      weight: 215,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'APN-008',
      name: 'Áo Polo Nữ Tay Dài Mùa Thu',
      description: 'Áo polo nữ tay dài phù hợp thời tiết se lạnh mùa thu. Chất vải cotton dày dặn giữ ấm nhẹ, cổ bẻ cứng cáp giữ form tốt. Thiết kế tay dài thanh lịch, phù hợp mặc đi làm hoặc đi café cuối tuần cùng bạn bè.',
      category: catAoPoloNu._id,
      brand: 'GENZ',
      images: ['/ao-polo-nu8.webp'],
      price: 429000,
      salePrice: null,
      material: 'Cotton Heavyweight',
      instruction: 'Giặt máy ở 30°C, phơi trên móc áo, ủi mặt trái ở nhiệt độ trung bình.',
      rating: 4.6,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xanh lá', code: '#22c55e', image: '/ao-polo-nu8.webp' }],
      stock: 38,
      weight: 260,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'APN-009',
      name: 'Áo Polo Nữ Crop Năng Động',
      description: 'Áo polo nữ dáng crop năng động, trẻ trung dành cho các bạn nữ Gen Z. Chiều dài áo vừa phải ở eo, tôn lên vóc dáng. Chất liệu pique mềm mịn, co giãn nhẹ, phối cùng quần cạp cao hoặc chân váy đều rất thời trang.',
      category: catAoPoloNu._id,
      brand: 'GENZ',
      images: ['/ao-polo-nu9.webp'],
      price: 299000,
      salePrice: 249000,
      material: 'Pique Cotton pha Elastane',
      instruction: 'Giặt lộn trái, giặt máy chế độ nhẹ, phơi trong bóng râm, không sấy máy.',
      rating: 4.2,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-polo-nu9.webp' }],
      stock: 50,
      weight: 195,
      style: 'Sporty'
    });
    count++;
    console.log(`  ✅ Đã tạo ${count} sản phẩm (bao gồm 9 Áo polo nữ)`);

    // =============================================
    // ÁO KIỂU NỮ (9 sản phẩm)
    // =============================================
    console.log('\n👗 Đang tạo sản phẩm Áo kiểu nữ...');

    await Product.create({
      sku: 'AKN-001',
      name: 'Áo Kiểu Nữ Tay Bồng',
      description: 'Áo kiểu nữ tay bồng lãng mạn phong cách Hàn Quốc, tạo vẻ ngoài nữ tính và duyên dáng. Thiết kế tay bồng nhẹ nhàng che khuyết điểm bắp tay, chất liệu voan mỏng nhẹ thoáng mát. Phù hợp mặc đi làm, đi hẹn hò hoặc dự tiệc nhẹ.',
      category: catAoKieuNu._id,
      brand: 'GENZ',
      images: ['/ao-kieu-nu1.webp'],
      price: 399000,
      salePrice: 329000,
      material: 'Voan Chiffon',
      instruction: 'Giặt tay nhẹ nhàng với nước lạnh, không vắt mạnh, phơi trong bóng râm, ủi ở nhiệt độ thấp.',
      rating: 4.7,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-kieu-nu1.webp' }],
      stock: 42,
      weight: 160,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'AKN-002',
      name: 'Áo Kiểu Nữ Cổ Vuông',
      description: 'Áo kiểu nữ cổ vuông thanh lịch, tôn lên xương quai xanh quyến rũ. Đường cắt cổ vuông vừa phải tạo vẻ sang trọng mà không quá hở. Chất liệu lụa mềm mại rũ tự nhiên, mặc mát lạnh trong mùa hè oi bức.',
      category: catAoKieuNu._id,
      brand: 'GENZ',
      images: ['/ao-kieu-nu2.webp'],
      price: 449000,
      salePrice: null,
      material: 'Lụa Satin',
      instruction: 'Chỉ giặt tay với nước lạnh, không vắt, phơi trên móc áo có đệm vai, ủi mặt trái.',
      rating: 4.6,
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Be', code: '#d2b48c', image: '/ao-kieu-nu2.webp' }],
      stock: 35,
      weight: 140,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'AKN-003',
      name: 'Áo Kiểu Nữ Peplum Eo',
      description: 'Áo kiểu nữ peplum eo tạo hiệu ứng thắt eo đồng hồ cát quyến rũ. Phần peplum bung nhẹ giúp che khuyết điểm vùng bụng hiệu quả. Chất liệu vải dày dặn giữ form tốt, phù hợp mặc đi tiệc, sự kiện hoặc đi làm công sở.',
      category: catAoKieuNu._id,
      brand: 'GENZ',
      images: ['/ao-kieu-nu3.webp'],
      price: 479000,
      salePrice: 399000,
      material: 'Vải Taffeta',
      instruction: 'Giặt tay hoặc giặt khô, ủi mặt trái ở nhiệt độ trung bình, treo trên móc áo.',
      rating: 4.5,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Đen', code: '#000000', image: '/ao-kieu-nu3.webp' }],
      stock: 30,
      weight: 180,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'AKN-004',
      name: 'Áo Kiểu Nữ Xếp Ly Cổ Điển',
      description: 'Áo kiểu nữ xếp ly cổ điển mang phong cách retro thanh lịch. Các nếp xếp ly tinh tế chạy dọc thân áo tạo chiều sâu và sự sang trọng. Chất liệu voan dày, không xuyên thấu, phù hợp mặc đi làm hoặc dự sự kiện quan trọng.',
      category: catAoKieuNu._id,
      brand: 'GENZ',
      images: ['/ao-kieu-nu4.webp'],
      price: 499000,
      salePrice: null,
      material: 'Voan Dày Cao Cấp',
      instruction: 'Giặt tay với nước ấm dưới 30°C, phơi trong bóng râm, ủi hơi nước nhẹ.',
      rating: 4.8,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xám', code: '#6b7280', image: '/ao-kieu-nu4.webp' }],
      stock: 28,
      weight: 170,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'AKN-005',
      name: 'Áo Kiểu Nữ Thắt Nơ Cổ',
      description: 'Áo kiểu nữ thắt nơ cổ phong cách Pháp lãng mạn, tạo vẻ ngoài dịu dàng và thanh tao. Chi tiết nơ cổ có thể thắt nhiều kiểu khác nhau, mang đến sự đa dạng trong cách phối đồ. Chất lụa mềm rũ, mặc mát mẻ.',
      category: catAoKieuNu._id,
      brand: 'GENZ',
      images: ['/ao-kieu-nu5.webp'],
      price: 529000,
      salePrice: 449000,
      material: 'Lụa Nhân Tạo',
      instruction: 'Giặt tay với xà phòng dịu nhẹ, không vắt xoắn, phơi trong bóng râm.',
      rating: 4.4,
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Hồng', code: '#f472b6', image: '/ao-kieu-nu5.webp' }],
      stock: 33,
      weight: 145,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'AKN-006',
      name: 'Áo Kiểu Nữ Vai Trần Quyến Rũ',
      description: 'Áo kiểu nữ vai trần quyến rũ, khoe trọn đường vai và xương quai xanh gợi cảm. Thiết kế vai trần với dây chun co giãn nhẹ giữ áo cố định. Chất vải cotton pha linen thoáng mát, phù hợp mặc mùa hè đi biển hoặc dạo phố.',
      category: catAoKieuNu._id,
      brand: 'GENZ',
      images: ['/ao-kieu-nu6.webp'],
      price: 349000,
      salePrice: null,
      material: 'Cotton pha Linen',
      instruction: 'Giặt tay hoặc giặt máy trong túi giặt, không sấy máy, phơi phẳng.',
      rating: 4.3,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-kieu-nu6.webp' }],
      stock: 40,
      weight: 155,
      style: 'Streetwear'
    });
    count++;

    await Product.create({
      sku: 'AKN-007',
      name: 'Áo Kiểu Nữ Babydoll Dễ Thương',
      description: 'Áo kiểu nữ babydoll dễ thương với dáng áo bung nhẹ từ ngực, tạo cảm giác thoải mái và tự do. Thiết kế trẻ trung, nữ tính với chi tiết bèo nhún tinh tế. Chất vải mỏng nhẹ, thoáng mát, phù hợp mặc mùa hè.',
      category: catAoKieuNu._id,
      brand: 'GENZ',
      images: ['/ao-kieu-nu7.webp'],
      price: 379000,
      salePrice: 309000,
      material: 'Vải Rayon',
      instruction: 'Giặt tay nhẹ nhàng, không ngâm lâu, phơi trong bóng râm, ủi ở nhiệt độ thấp.',
      rating: 4.5,
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Xanh lá', code: '#22c55e', image: '/ao-kieu-nu7.webp' }],
      stock: 38,
      weight: 135,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'AKN-008',
      name: 'Áo Kiểu Nữ Tay Loe Boho',
      description: 'Áo kiểu nữ tay loe phong cách boho tự do, phóng khoáng. Thiết kế tay loe rộng tạo vẻ bay bổng, nghệ thuật. Chất liệu lụa pha cotton mềm mại, rũ tự nhiên, phù hợp mặc đi du lịch, dự lễ hội hoặc dạo phố.',
      category: catAoKieuNu._id,
      brand: 'GENZ',
      images: ['/ao-kieu-nu8.webp'],
      price: 559000,
      salePrice: null,
      material: 'Lụa pha Cotton',
      instruction: 'Giặt tay với nước lạnh, không vắt, phơi trên móc áo trong bóng râm.',
      rating: 4.7,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Nâu', code: '#92400e', image: '/ao-kieu-nu8.webp' }],
      stock: 25,
      weight: 165,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'AKN-009',
      name: 'Áo Kiểu Nữ Cổ Yếm Thời Thượng',
      description: 'Áo kiểu nữ cổ yếm thời thượng, mang đến phong cách hiện đại và cá tính. Đường cổ yếm cách điệu tôn lên vẻ đẹp vùng cổ và vai. Chất vải crepe dày dặn, không nhăn, giữ form tốt suốt cả ngày dài.',
      category: catAoKieuNu._id,
      brand: 'GENZ',
      images: ['/ao-kieu-nu9.webp'],
      price: 599000,
      salePrice: 499000,
      material: 'Vải Crepe',
      instruction: 'Giặt khô hoặc giặt tay với nước lạnh, ủi mặt trái ở nhiệt độ trung bình.',
      rating: 4.9,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [{ name: 'Đen', code: '#000000', image: '/ao-kieu-nu9.webp' }],
      stock: 22,
      weight: 175,
      style: 'Streetwear'
    });
    count++;
    console.log(`  ✅ Đã tạo ${count} sản phẩm (bao gồm 9 Áo kiểu nữ)`);

    // =============================================
    // ÁO CHỐNG NẮNG NỮ (6 sản phẩm)
    // =============================================
    console.log('\n👗 Đang tạo sản phẩm Áo chống nắng nữ...');

    await Product.create({
      sku: 'ACN-001',
      name: 'Áo Chống Nắng Nữ UPF50+',
      description: 'Áo chống nắng nữ UPF50+ chống tia UV hiệu quả lên đến 98%. Chất liệu vải chống nắng chuyên dụng, mỏng nhẹ, thoáng khí, không gây bí nóng. Thiết kế dáng dài che kín tay và lưng bàn tay, bảo vệ toàn diện khi ra ngoài trời.',
      category: catAoChongNangNu._id,
      brand: 'GENZ',
      images: ['/ao-chong-nang-nu1.webp'],
      price: 449000,
      salePrice: 359000,
      material: 'Vải chống nắng UPF50+',
      instruction: 'Giặt máy ở chế độ nhẹ, không sử dụng chất tẩy, phơi trong bóng râm để bảo toàn tính năng chống nắng.',
      rating: 4.8,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-chong-nang-nu1.webp' }],
      stock: 90,
      weight: 180,
      style: 'Sporty'
    });
    count++;

    await Product.create({
      sku: 'ACN-002',
      name: 'Áo Chống Nắng Nữ Dáng Dài Toàn Thân',
      description: 'Áo chống nắng nữ dáng dài toàn thân bao phủ từ cổ đến đầu gối. Thiết kế dáng rộng thoải mái, có mũ trùm đầu tích hợp bảo vệ mặt và cổ. Chất vải siêu nhẹ, nhanh khô, gấp gọn dễ dàng mang theo bên mình.',
      category: catAoChongNangNu._id,
      brand: 'GENZ',
      images: ['/ao-chong-nang-nu2.webp'],
      price: 499000,
      salePrice: 399000,
      material: 'Nylon chống UV',
      instruction: 'Giặt tay hoặc giặt máy nhẹ nhàng, không sấy máy, phơi trong bóng râm.',
      rating: 4.6,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Hồng', code: '#f472b6', image: '/ao-chong-nang-nu2.webp' }],
      stock: 75,
      weight: 200,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'ACN-003',
      name: 'Áo Chống Nắng Nữ Có Khẩu Trang Liền',
      description: 'Áo chống nắng nữ tích hợp khẩu trang liền tiện lợi, bảo vệ mặt khỏi nắng và bụi. Thiết kế thông minh với phần khẩu trang có thể gập lên gập xuống dễ dàng. Chất vải mát lạnh, thấm hút mồ hôi tốt, không gây bí khi đeo lâu.',
      category: catAoChongNangNu._id,
      brand: 'GENZ',
      images: ['/ao-chong-nang-nu3.webp'],
      price: 529000,
      salePrice: 449000,
      material: 'Vải Ice Silk chống UV',
      instruction: 'Giặt máy ở chế độ nhẹ, không sử dụng nước nóng, phơi trong bóng râm.',
      rating: 4.7,
      sizes: ['M', 'L', 'XL'],
      colors: [{ name: 'Xám', code: '#6b7280', image: '/ao-chong-nang-nu3.webp' }],
      stock: 65,
      weight: 195,
      style: 'Sporty'
    });
    count++;

    await Product.create({
      sku: 'ACN-004',
      name: 'Áo Chống Nắng Nữ Phối Lưới Thoáng Khí',
      description: 'Áo chống nắng nữ phối lưới thoáng khí ở lưng và nách, giúp thoát nhiệt hiệu quả trong những ngày nắng nóng đỉnh điểm. Thiết kế thời trang không kém phần năng động, có thể mặc như áo khoác nhẹ khi đi dạo phố.',
      category: catAoChongNangNu._id,
      brand: 'GENZ',
      images: ['/ao-chong-nang-nu4.webp'],
      price: 479000,
      salePrice: 389000,
      material: 'Polyester chống UV pha Mesh',
      instruction: 'Giặt lộn trái, giặt máy ở nhiệt độ thường, không vắt xoắn, phơi trong bóng râm.',
      rating: 4.5,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xanh navy', code: '#1e3a5f', image: '/ao-chong-nang-nu4.webp' }],
      stock: 58,
      weight: 170,
      style: 'Sporty'
    });
    count++;

    await Product.create({
      sku: 'ACN-005',
      name: 'Áo Chống Nắng Nữ Phong Cách Nhật Bản',
      description: 'Áo chống nắng nữ phong cách Nhật Bản với thiết kế kimono nhẹ nhàng, thanh tao. Dáng áo rộng thoải mái, phù hợp mặc ngoài áo thun hay váy. Chất liệu chống nắng cao cấp, bền màu sau nhiều lần giặt, bảo vệ da tối ưu.',
      category: catAoChongNangNu._id,
      brand: 'GENZ',
      images: ['/ao-chong-nang-nu5.webp'],
      price: 549000,
      salePrice: 459000,
      material: 'Vải Tencel chống UV',
      instruction: 'Giặt tay với nước lạnh, phơi trong bóng râm, ủi mặt trái ở nhiệt độ thấp.',
      rating: 4.9,
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Be', code: '#d2b48c', image: '/ao-chong-nang-nu5.webp' }],
      stock: 32,
      weight: 185,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'ACN-006',
      name: 'Áo Chống Nắng Nữ Năng Động Zip-Up',
      description: 'Áo chống nắng nữ năng động kiểu zip-up khóa kéo tiện lợi. Thiết kế thể thao năng động phù hợp đạp xe, chạy bộ hoặc đi dã ngoại. Túi có khóa kéo hai bên bảo quản đồ dùng cá nhân. Chất vải nhanh khô, nhẹ chỉ 170g.',
      category: catAoChongNangNu._id,
      brand: 'GENZ',
      images: ['/ao-chong-nang-nu6.webp'],
      price: 399000,
      salePrice: 329000,
      material: 'Micro Polyester chống UV',
      instruction: 'Giặt máy ở 30°C, khóa kéo trước khi giặt, không sấy máy, phơi trong bóng râm.',
      rating: 4.4,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Đen', code: '#000000', image: '/ao-chong-nang-nu6.webp' }],
      stock: 80,
      weight: 170,
      style: 'Sporty'
    });
    count++;
    console.log(`  ✅ Đã tạo ${count} sản phẩm (bao gồm 6 Áo chống nắng nữ)`);

    // =============================================
    // ÁO THUN DÀI TAY NỮ (9 sản phẩm)
    // =============================================
    console.log('\n👗 Đang tạo sản phẩm Áo thun dài tay nữ...');

    await Product.create({
      sku: 'ADTN-001',
      name: 'Áo Thun Dài Tay Nữ Basic',
      description: 'Áo thun dài tay nữ basic với form dáng vừa vặn, dễ phối đồ cho nhiều phong cách. Chất cotton 100% mềm mại, giữ ấm nhẹ, phù hợp mặc mùa thu đông hoặc trong phòng điều hòa. Đường may chắc chắn, bền đẹp sau nhiều lần giặt.',
      category: catAoThunDaiTayNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-dai-tay-nu1.webp'],
      price: 279000,
      salePrice: 219000,
      material: 'Cotton 100%',
      instruction: 'Giặt máy ở nhiệt độ thường, phơi trên móc áo, ủi mặt trái ở nhiệt độ thấp.',
      rating: 4.6,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-thun-dai-tay-nu1.webp' }],
      stock: 78,
      weight: 220,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'ADTN-002',
      name: 'Áo Thun Dài Tay Nữ Cổ Tròn Ôm Dáng',
      description: 'Áo thun dài tay nữ cổ tròn ôm dáng tôn lên đường cong cơ thể. Chất liệu cotton pha spandex co giãn 4 chiều, ôm sát mà không gây khó chịu. Kiểu dáng slim fit thời trang, phù hợp mặc bên trong áo khoác hoặc mặc đơn lẻ.',
      category: catAoThunDaiTayNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-dai-tay-nu2.webp'],
      price: 299000,
      salePrice: null,
      material: 'Cotton pha Spandex',
      instruction: 'Giặt lộn trái, giặt máy chế độ nhẹ, không sấy máy, phơi phẳng giữ form.',
      rating: 4.5,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [{ name: 'Đen', code: '#000000', image: '/ao-thun-dai-tay-nu2.webp' }],
      stock: 65,
      weight: 210,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'ADTN-003',
      name: 'Áo Thun Dài Tay Nữ Oversize Streetwear',
      description: 'Áo thun dài tay nữ oversize phong cách streetwear đường phố. Form áo rộng thoải mái, tay áo dài rủ nhẹ tạo cảm giác cool ngầu. Chất cotton heavyweight dày dặn, giữ ấm tốt, in hình nghệ thuật ở lưng tạo điểm nhấn.',
      category: catAoThunDaiTayNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-dai-tay-nu3.webp'],
      price: 349000,
      salePrice: 279000,
      material: 'Cotton Heavyweight',
      instruction: 'Giặt lộn trái với nước lạnh, không sử dụng chất tẩy, phơi trong bóng râm.',
      rating: 4.7,
      sizes: ['M', 'L', 'XL'],
      colors: [{ name: 'Xám', code: '#6b7280', image: '/ao-thun-dai-tay-nu3.webp' }],
      stock: 52,
      weight: 280,
      style: 'Streetwear'
    });
    count++;

    await Product.create({
      sku: 'ADTN-004',
      name: 'Áo Thun Dài Tay Nữ Phối Sọc Ngang',
      description: 'Áo thun dài tay nữ phối sọc ngang phong cách Breton cổ điển Pháp. Họa tiết sọc ngang đều đặn tạo hiệu ứng thị giác kéo dài cơ thể. Chất liệu cotton mềm mại, co giãn nhẹ, mặc thoải mái suốt cả ngày.',
      category: catAoThunDaiTayNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-dai-tay-nu4.webp'],
      price: 309000,
      salePrice: null,
      material: 'Cotton Combed',
      instruction: 'Giặt máy ở 30°C, phơi trong bóng râm, ủi ở nhiệt độ trung bình.',
      rating: 4.4,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-thun-dai-tay-nu4.webp' }],
      stock: 60,
      weight: 230,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'ADTN-005',
      name: 'Áo Thun Dài Tay Nữ Raglan Phối Màu',
      description: 'Áo thun dài tay nữ raglan phối màu thể thao, năng động. Thiết kế tay raglan với màu tương phản tạo vẻ trẻ trung, khỏe khoắn. Chất vải thể thao nhanh khô, co giãn tốt, phù hợp mặc tập thể dục hoặc đi dạo.',
      category: catAoThunDaiTayNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-dai-tay-nu5.webp'],
      price: 289000,
      salePrice: 229000,
      material: 'Polyester pha Cotton',
      instruction: 'Giặt máy ở nhiệt độ thường, không sử dụng chất tẩy có clo, phơi trong bóng râm.',
      rating: 4.3,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xanh navy', code: '#1e3a5f', image: '/ao-thun-dai-tay-nu5.webp' }],
      stock: 55,
      weight: 215,
      style: 'Sporty'
    });
    count++;

    await Product.create({
      sku: 'ADTN-006',
      name: 'Áo Thun Dài Tay Nữ Cổ Lọ Ấm Áp',
      description: 'Áo thun dài tay nữ cổ lọ ấm áp cho mùa đông lạnh giá. Phần cổ lọ cao ôm vừa vặn, giữ ấm vùng cổ hiệu quả. Chất liệu cotton dày dặn kết hợp lớp fleece mỏng bên trong, mang đến cảm giác ấm áp và êm ái.',
      category: catAoThunDaiTayNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-dai-tay-nu6.webp'],
      price: 399000,
      salePrice: 329000,
      material: 'Cotton pha Fleece',
      instruction: 'Giặt máy ở chế độ nhẹ với nước ấm, không sấy máy, phơi trên móc áo.',
      rating: 4.8,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Nâu', code: '#92400e', image: '/ao-thun-dai-tay-nu6.webp' }],
      stock: 42,
      weight: 270,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'ADTN-007',
      name: 'Áo Thun Dài Tay Nữ In Chữ Cá Tính',
      description: 'Áo thun dài tay nữ in chữ typography cá tính, phong cách Gen Z. Hình in sắc nét bằng công nghệ DTG không bong tróc, giữ màu bền lâu. Form áo regular fit dễ mặc, phù hợp mix match với nhiều loại trang phục.',
      category: catAoThunDaiTayNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-dai-tay-nu7.webp'],
      price: 269000,
      salePrice: null,
      material: 'Cotton Single Jersey',
      instruction: 'Giặt lộn trái, giặt máy với nước lạnh, không ngâm lâu, phơi trong bóng râm.',
      rating: 4.2,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-thun-dai-tay-nu7.webp' }],
      stock: 70,
      weight: 200,
      style: 'Streetwear'
    });
    count++;

    await Product.create({
      sku: 'ADTN-008',
      name: 'Áo Thun Dài Tay Nữ Tay Phồng Nhẹ',
      description: 'Áo thun dài tay nữ với thiết kế tay phồng nhẹ mang nét nữ tính hiện đại. Phần tay áo phồng nhẹ từ vai tạo vẻ thanh thoát, che bắp tay hiệu quả. Chất vải mềm mịn, co giãn tốt, phù hợp cả đi làm và đi chơi.',
      category: catAoThunDaiTayNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-dai-tay-nu8.webp'],
      price: 329000,
      salePrice: 269000,
      material: 'Cotton CVC',
      instruction: 'Giặt tay hoặc giặt máy chế độ nhẹ, phơi trên móc áo, ủi mặt trái.',
      rating: 4.5,
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Hồng', code: '#f472b6', image: '/ao-thun-dai-tay-nu8.webp' }],
      stock: 45,
      weight: 225,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'ADTN-009',
      name: 'Áo Thun Dài Tay Nữ Phong Cách Layer',
      description: 'Áo thun dài tay nữ phong cách layer độc đáo với hiệu ứng mặc chồng hai lớp. Thiết kế sáng tạo tạo cảm giác như mặc hai áo nhưng thực tế chỉ một, tiết kiệm thời gian phối đồ. Chất cotton premium mềm mại, thoáng mát.',
      category: catAoThunDaiTayNu._id,
      brand: 'GENZ',
      images: ['/ao-thun-dai-tay-nu9.webp'],
      price: 369000,
      salePrice: null,
      material: 'Cotton Premium',
      instruction: 'Giặt máy ở 30°C, không vắt xoắn, phơi phẳng trên mặt phẳng để giữ form.',
      rating: 4.6,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xám', code: '#6b7280', image: '/ao-thun-dai-tay-nu9.webp' }],
      stock: 38,
      weight: 245,
      style: 'Streetwear'
    });
    count++;
    console.log(`  ✅ Đã tạo ${count} sản phẩm (bao gồm 9 Áo thun dài tay nữ)`);

    // =============================================
    // ÁO SÁT NÁCH NỮ (3 sản phẩm)
    // =============================================
    console.log('\n👗 Đang tạo sản phẩm Áo sát nách nữ...');

    await Product.create({
      sku: 'ASN-001',
      name: 'Áo Sát Nách Nữ Thể Thao',
      description: 'Áo sát nách nữ thể thao thiết kế chuyên dụng cho tập gym và yoga. Chất liệu nhanh khô, thấm hút mồ hôi vượt trội, không bám dính vào cơ thể khi tập luyện. Đường may phẳng mịn không gây cọ xát khó chịu.',
      category: catAoSatNachNu._id,
      brand: 'GENZ',
      images: ['/ao-sat-nach-nu.webp'],
      price: 199000,
      salePrice: 149000,
      material: 'Polyester pha Spandex',
      instruction: 'Giặt máy sau mỗi lần mặc, không sử dụng nước xả vải, phơi trong bóng râm.',
      rating: 4.5,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Đen', code: '#000000', image: '/ao-sat-nach-nu.webp' }],
      stock: 80,
      weight: 150,
      style: 'Sporty'
    });
    count++;

    await Product.create({
      sku: 'ASN-002',
      name: 'Áo Sát Nách Nữ Dây Đan Chéo Lưng',
      description: 'Áo sát nách nữ với thiết kế dây đan chéo phía sau lưng tạo điểm nhấn thời trang. Phần dây đan chéo vừa đẹp vừa giúp cố định áo khi vận động mạnh. Chất liệu co giãn cao, ôm sát cơ thể, hỗ trợ nhẹ khi tập luyện.',
      category: catAoSatNachNu._id,
      brand: 'GENZ',
      images: ['/ao-sat-nach-nu2.webp'],
      price: 249000,
      salePrice: null,
      material: 'Nylon pha Spandex',
      instruction: 'Giặt tay hoặc giặt máy trong túi giặt, không sấy máy, phơi phẳng.',
      rating: 4.7,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: [{ name: 'Xanh lá', code: '#22c55e', image: '/ao-sat-nach-nu2.webp' }],
      stock: 55,
      weight: 140,
      style: 'Sporty'
    });
    count++;

    await Product.create({
      sku: 'ASN-003',
      name: 'Áo Sát Nách Nữ Cotton Mặc Hằng Ngày',
      description: 'Áo sát nách nữ cotton mềm mại dành cho mặc hằng ngày. Thiết kế đơn giản, thoải mái với cổ tròn rộng vừa phải. Chất cotton 100% thấm hút mồ hôi tự nhiên, mát mẻ suốt mùa hè. Phù hợp mặc ở nhà hoặc mặc lót bên trong áo khoác.',
      category: catAoSatNachNu._id,
      brand: 'GENZ',
      images: ['/ao-sat-nach-nu3.webp'],
      price: 159000,
      salePrice: null,
      material: 'Cotton 100%',
      instruction: 'Giặt máy ở nhiệt độ thường, có thể sử dụng chất tẩy nhẹ, phơi ngoài trời.',
      rating: 4.3,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/ao-sat-nach-nu3.webp' }],
      stock: 95,
      weight: 130,
      style: 'Basic'
    });
    count++;
    console.log(`  ✅ Đã tạo ${count} sản phẩm (bao gồm 3 Áo sát nách nữ)`);

    // =============================================
    // VÁY NỮ (4 sản phẩm)
    // =============================================
    console.log('\n👗 Đang tạo sản phẩm Váy nữ...');

    await Product.create({
      sku: 'VN-001',
      name: 'Váy Chữ A Công Sở',
      description: 'Váy chữ A công sở thanh lịch với form dáng xòe nhẹ từ eo, tôn lên vóc dáng đồng hồ cát. Thiết kế tối giản không họa tiết, phù hợp mặc đi làm, dự hội nghị hoặc gặp đối tác. Chất liệu vải dày dặn, giữ form tốt, không bị nhăn trong quá trình ngồi.',
      category: catVayNu._id,
      brand: 'GENZ',
      images: ['/vay1.webp'],
      price: 499000,
      salePrice: 399000,
      material: 'Vải Kate Cao Cấp',
      instruction: 'Giặt tay hoặc giặt khô, ủi ở nhiệt độ trung bình, treo trên móc váy.',
      rating: 4.7,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Đen', code: '#000000', image: '/vay1.webp' }],
      stock: 35,
      weight: 320,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'VN-002',
      name: 'Váy Xếp Ly Dài Thanh Lịch',
      description: 'Váy xếp ly dài thanh lịch phong cách Hàn Quốc, mang vẻ đẹp thướt tha, nữ tính. Các nếp xếp ly đều đặn tạo hiệu ứng chuyển động đẹp mắt khi bước đi. Chất liệu voan dày không xuyên thấu, co giãn nhẹ ở phần lưng thun.',
      category: catVayNu._id,
      brand: 'GENZ',
      images: ['/vay2.webp'],
      price: 549000,
      salePrice: null,
      material: 'Voan Dày Xếp Ly',
      instruction: 'Giặt tay nhẹ nhàng, không vắt, treo trên móc váy để giữ nếp xếp ly.',
      rating: 4.8,
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Be', code: '#d2b48c', image: '/vay2.webp' }],
      stock: 28,
      weight: 350,
      style: 'Vintage'
    });
    count++;

    await Product.create({
      sku: 'VN-003',
      name: 'Váy Bút Chì Ôm Dáng',
      description: 'Váy bút chì ôm dáng quyến rũ, tôn lên đường cong cơ thể hoàn hảo. Thiết kế chiều dài ngang gối, xẻ nhẹ sau lưng giúp di chuyển thoải mái. Chất liệu co giãn cao, ôm sát mà không gây bó cứng, phù hợp mặc đi làm hoặc dự sự kiện.',
      category: catVayNu._id,
      brand: 'GENZ',
      images: ['/vay3.webp'],
      price: 459000,
      salePrice: 379000,
      material: 'Vải Ponte Roma',
      instruction: 'Giặt máy chế độ nhẹ, không sấy máy, phơi phẳng, ủi nhẹ mặt trái.',
      rating: 4.5,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xanh navy', code: '#1e3a5f', image: '/vay3.webp' }],
      stock: 30,
      weight: 300,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'VN-004',
      name: 'Váy Midi Hoa Nhí Phong Cách Retro',
      description: 'Váy midi hoa nhí phong cách retro mang vẻ đẹp cổ điển, lãng mạn. Họa tiết hoa nhí nhỏ xinh xắn trải đều trên nền vải, tạo cảm giác tươi tắn, dịu dàng. Eo co giãn nhẹ phù hợp nhiều vóc dáng, phù hợp đi picnic và chụp hình.',
      category: catVayNu._id,
      brand: 'GENZ',
      images: ['/vay4.webp'],
      price: 599000,
      salePrice: null,
      material: 'Vải Chiffon In Hoa',
      instruction: 'Giặt tay với nước lạnh, phơi trong bóng râm, ủi hơi nước nhẹ nhàng.',
      rating: 4.9,
      sizes: ['S', 'M', 'L'],
      colors: [{ name: 'Hồng', code: '#f472b6', image: '/vay4.webp' }],
      stock: 24,
      weight: 280,
      style: 'Vintage'
    });
    count++;
    console.log(`  ✅ Đã tạo ${count} sản phẩm (bao gồm 4 Váy nữ)`);

    // =============================================
    // QUẦN SHORTS (4 sản phẩm)
    // =============================================
    console.log('\n👖 Đang tạo sản phẩm Quần shorts...');

    await Product.create({
      sku: 'QS-001',
      name: 'Quần Shorts Nữ Lưng Thun Thoải Mái',
      description: 'Quần shorts nữ lưng thun co giãn thoải mái, không gây bó bụng. Thiết kế đơn giản, dễ phối đồ với áo thun, áo croptop hoặc áo sơ mi buộc vạt. Chất vải cotton mềm mại, thoáng mát, phù hợp mặc ở nhà hoặc đi dạo.',
      category: catQuanShortsNu._id,
      brand: 'GENZ',
      images: ['/shorts1.webp'],
      price: 249000,
      salePrice: 199000,
      material: 'Cotton pha Elastane',
      instruction: 'Giặt máy ở nhiệt độ thường, không sử dụng chất tẩy mạnh, phơi trong bóng râm.',
      rating: 4.4,
      sizes: ['26', '27', '28', '29', '30'],
      colors: [{ name: 'Be', code: '#d2b48c', image: '/shorts1.webp' }],
      stock: 65,
      weight: 250,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'QS-002',
      name: 'Quần Shorts Nữ Ống Rộng Thời Trang',
      description: 'Quần shorts nữ ống rộng thời trang phong cách Hàn Quốc, tạo hiệu ứng chân dài. Thiết kế ống rộng thoải mái, lưng cao tôn dáng, phối cùng áo croptop cực kỳ cuốn hút. Chất liệu linen pha cotton mát mẻ, phù hợp mùa hè.',
      category: catQuanShortsNu._id,
      brand: 'GENZ',
      images: ['/shorts2.webp'],
      price: 299000,
      salePrice: null,
      material: 'Linen pha Cotton',
      instruction: 'Giặt tay hoặc giặt máy chế độ nhẹ, ủi mặt trái ở nhiệt độ trung bình.',
      rating: 4.6,
      sizes: ['26', '27', '28', '29', '30'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/shorts2.webp' }],
      stock: 50,
      weight: 270,
      style: 'Streetwear'
    });
    count++;

    await Product.create({
      sku: 'QS-003',
      name: 'Quần Shorts Nam Thể Thao Năng Động',
      description: 'Quần shorts nam thể thao năng động với chất liệu nhanh khô, thoáng khí. Thiết kế có túi khoá kéo hai bên tiện lợi, lưng thun co giãn kèm dây rút điều chỉnh. Phù hợp chạy bộ, tập gym hoặc mặc đi chơi thể thao.',
      category: catQuanShortsNam._id,
      brand: 'GENZ',
      images: ['/shorts3.webp'],
      price: 299000,
      salePrice: 249000,
      material: 'Polyester Dri-Fit',
      instruction: 'Giặt máy ở nhiệt độ thường, không sấy máy, phơi trong bóng râm.',
      rating: 4.5,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Đen', code: '#000000', image: '/shorts3.webp' }],
      stock: 70,
      weight: 280,
      style: 'Sporty'
    });
    count++;

    await Product.create({
      sku: 'QS-004',
      name: 'Quần Shorts Nam Kaki Casual',
      description: 'Quần shorts nam kaki casual lịch sự, phù hợp mặc đi làm ngày thường hoặc đi chơi cuối tuần. Chất vải kaki cotton dày dặn, bền màu, giữ form tốt. Thiết kế lưng có khuy và khóa kéo, phối cùng áo polo hoặc sơ mi rất lịch lãm.',
      category: catQuanShortsNam._id,
      brand: 'GENZ',
      images: ['/shorts4.webp'],
      price: 349000,
      salePrice: null,
      material: 'Kaki Cotton',
      instruction: 'Giặt máy ở 30°C, ủi ở nhiệt độ trung bình, phơi trên móc quần.',
      rating: 4.3,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [{ name: 'Xanh navy', code: '#1e3a5f', image: '/shorts4.webp' }],
      stock: 58,
      weight: 320,
      style: 'Basic'
    });
    count++;
    console.log(`  ✅ Đã tạo ${count} sản phẩm (bao gồm 4 Quần shorts)`);

    // =============================================
    // ÁO THUN NAM (4 sản phẩm)
    // =============================================
    console.log('\n👕 Đang tạo sản phẩm Áo thun nam...');

    await Product.create({
      sku: 'ATM-001',
      name: 'Áo Thun Nam Cổ Tròn Classic',
      description: 'Áo thun nam cổ tròn classic với form regular fit vừa vặn, phù hợp mọi vóc dáng. Chất liệu cotton 100% thượng hạng, mềm mại, thấm hút mồ hôi tốt. Đường may kép chắc chắn ở cổ và tay áo, bền đẹp sau nhiều lần giặt.',
      category: catAoThunNam._id,
      brand: 'GENZ',
      images: ['/T-shipts1.webp'],
      price: 249000,
      salePrice: 199000,
      material: 'Cotton 100%',
      instruction: 'Giặt máy ở nhiệt độ thường, phơi lộn trái trong bóng râm, ủi ở nhiệt độ thấp.',
      rating: 4.7,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [{ name: 'Trắng', code: '#ffffff', image: '/T-shipts1.webp' }],
      stock: 100,
      weight: 220,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'ATM-002',
      name: 'Áo Thun Nam Oversize Graphic',
      description: 'Áo thun nam oversize graphic với hình in nghệ thuật phía trước ngực và lưng. Form áo rộng rãi phong cách đường phố, thoải mái và phóng khoáng. Chất cotton heavyweight dày dặn, đứng form, phù hợp phối cùng quần jogger hoặc jeans.',
      category: catAoThunNam._id,
      brand: 'GENZ',
      images: ['/T-shipts2.webp'],
      price: 299000,
      salePrice: null,
      material: 'Cotton Heavyweight 250GSM',
      instruction: 'Giặt lộn trái với nước lạnh, không sử dụng chất tẩy, phơi trong bóng râm để giữ màu in.',
      rating: 4.5,
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: [{ name: 'Đen', code: '#000000', image: '/T-shipts2.webp' }],
      stock: 85,
      weight: 280,
      style: 'Streetwear'
    });
    count++;

    await Product.create({
      sku: 'ATM-003',
      name: 'Áo Thun Nam Cổ Tròn Phối Viền',
      description: 'Áo thun nam cổ tròn phối viền tay và cổ tạo điểm nhấn tinh tế. Thiết kế đơn giản nhưng không nhàm chán, phù hợp mặc hàng ngày hoặc đi chơi cuối tuần. Chất liệu cotton compact mềm mại, co giãn nhẹ, thoáng mát.',
      category: catAoThunNam._id,
      brand: 'GENZ',
      images: ['/T-shipts3.webp'],
      price: 279000,
      salePrice: 229000,
      material: 'Cotton Compact',
      instruction: 'Giặt máy ở 30°C, phơi trong bóng râm, ủi mặt trái ở nhiệt độ thấp.',
      rating: 4.4,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Xám', code: '#6b7280', image: '/T-shipts3.webp' }],
      stock: 75,
      weight: 210,
      style: 'Basic'
    });
    count++;

    await Product.create({
      sku: 'ATM-004',
      name: 'Áo Thun Nam Thể Thao Dry-Fit',
      description: 'Áo thun nam thể thao Dry-Fit với công nghệ thấm hút và thoát ẩm nhanh chóng. Chất liệu siêu nhẹ, co giãn 4 chiều, không bám dính vào cơ thể khi tập luyện cường độ cao. Thiết kế không đường may ở vai giảm ma sát, tối ưu hiệu suất vận động.',
      category: catAoThunNam._id,
      brand: 'GENZ',
      images: ['/T-shipts4.webp'],
      price: 349000,
      salePrice: 289000,
      material: 'Polyester Dry-Fit',
      instruction: 'Giặt máy sau mỗi lần tập, không sử dụng nước xả vải, không sấy máy, phơi trong bóng râm.',
      rating: 4.6,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: [{ name: 'Xanh navy', code: '#1e3a5f', image: '/T-shipts4.webp' }],
      stock: 90,
      weight: 180,
      style: 'Sporty'
    });
    count++;
    console.log(`  ✅ Đã tạo ${count} sản phẩm (bao gồm 4 Áo thun nam)`);

    // =============================================
    // TỔNG KẾT
    // =============================================
    const total = await Product.countDocuments();
    console.log(`\n🎉 Seed sản phẩm hoàn tất! Tổng cộng: ${total} sản phẩm`);
    console.log('   - 6 Áo thun nữ');
    console.log('   - 9 Áo polo nữ');
    console.log('   - 9 Áo kiểu nữ');
    console.log('   - 6 Áo chống nắng nữ');
    console.log('   - 9 Áo thun dài tay nữ');
    console.log('   - 3 Áo sát nách nữ');
    console.log('   - 4 Váy nữ');
    console.log('   - 4 Quần shorts');
    console.log('   - 4 Áo thun nam');

    await mongoose.disconnect();
    console.log('🔌 Đã ngắt kết nối MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed sản phẩm:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedProducts();
