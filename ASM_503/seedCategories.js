require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const { Category } = require('./models');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/genz_warehouse';

async function seedCategories() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Kết nối MongoDB thành công:', MONGODB_URI);

    // Xóa toàn bộ danh mục cũ
    await Category.deleteMany({});
    console.log('🗑️  Đã xóa toàn bộ danh mục cũ');

    // =============================================
    // DANH MỤC CHA (Parent Categories)
    // =============================================

    const catNu = await Category.create({
      name: 'Nữ',
      description: 'Thời trang nữ - Bộ sưu tập đa dạng các mẫu áo, váy, quần dành cho phái đẹp',
      image: '/banner-nu.webp',
      parentId: null,
      isActive: true
    });
    console.log('📁 Đã tạo danh mục cha: Nữ');

    const catNam = await Category.create({
      name: 'Nam',
      description: 'Thời trang nam - Bộ sưu tập áo thun, polo, quần shorts phong cách dành cho phái mạnh',
      image: '/banner-nam.webp',
      parentId: null,
      isActive: true
    });
    console.log('📁 Đã tạo danh mục cha: Nam');

    // =============================================
    // DANH MỤC CON - NỮ (Child Categories under Nữ)
    // =============================================

    const catAoThunNu = await Category.create({
      name: 'Áo thun nữ',
      description: 'Áo thun nữ đa dạng kiểu dáng: cổ tròn, cổ tim, oversize, croptop phù hợp mọi phong cách',
      image: '/ao-thun-nu1.webp',
      parentId: catNu._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Áo thun nữ');

    const catAoPoloNu = await Category.create({
      name: 'Áo polo nữ',
      description: 'Áo polo nữ thanh lịch, năng động với chất liệu cotton thoáng mát, phù hợp đi làm và dạo phố',
      image: '/ao-polo-nu1.webp',
      parentId: catNu._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Áo polo nữ');

    const catAoKieuNu = await Category.create({
      name: 'Áo kiểu nữ',
      description: 'Áo kiểu nữ thiết kế đa dạng: tay bồng, cổ vuông, peplum, xếp ly tạo điểm nhấn thời trang',
      image: '/ao-kieu-nu1.webp',
      parentId: catNu._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Áo kiểu nữ');

    const catAoChongNangNu = await Category.create({
      name: 'Áo chống nắng nữ',
      description: 'Áo chống nắng nữ UPF50+, chất liệu mỏng nhẹ, thoáng khí, bảo vệ da khỏi tia UV hiệu quả',
      image: '/ao-chong-nang-nu1.webp',
      parentId: catNu._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Áo chống nắng nữ');

    const catAoThunDaiTayNu = await Category.create({
      name: 'Áo thun dài tay nữ',
      description: 'Áo thun dài tay nữ phù hợp mùa thu đông, chất cotton co giãn thoải mái suốt cả ngày',
      image: '/ao-thun-dai-tay-nu1.webp',
      parentId: catNu._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Áo thun dài tay nữ');

    const catAoSatNachNu = await Category.create({
      name: 'Áo sát nách nữ',
      description: 'Áo sát nách nữ thoáng mát, phù hợp tập gym, yoga và mặc trong mùa hè nóng bức',
      image: '/ao-sat-nach-nu.webp',
      parentId: catNu._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Áo sát nách nữ');

    const catVayNu = await Category.create({
      name: 'Váy nữ',
      description: 'Váy nữ đa phong cách: chữ A, xếp ly, bút chì, midi - phù hợp đi làm, đi chơi và dự tiệc',
      image: '/vay1.webp',
      parentId: catNu._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Váy nữ');

    const catQuanShortsNu = await Category.create({
      name: 'Quần shorts nữ',
      description: 'Quần shorts nữ năng động, thoải mái với nhiều kiểu dáng: lưng thun, lưng cao, ống rộng',
      image: '/shorts1.webp',
      parentId: catNu._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Quần shorts nữ');

    // =============================================
    // DANH MỤC CON - NAM (Child Categories under Nam)
    // =============================================

    const catAoThunNam = await Category.create({
      name: 'Áo thun nam',
      description: 'Áo thun nam đa dạng: cổ tròn, oversize, form regular fit, chất liệu cotton premium thoáng mát',
      image: '/T-shipts1.webp',
      parentId: catNam._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Áo thun nam');

    const catQuanShortsNam = await Category.create({
      name: 'Quần shorts nam',
      description: 'Quần shorts nam phong cách thể thao và casual, chất liệu thoáng mát phù hợp mùa hè',
      image: '/shorts3.webp',
      parentId: catNam._id,
      isActive: true
    });
    console.log('  📂 Đã tạo danh mục con: Quần shorts nam');

    // =============================================
    // TỔNG KẾT
    // =============================================
    const total = await Category.countDocuments();
    console.log(`\n🎉 Seed danh mục hoàn tất! Tổng cộng: ${total} danh mục`);
    console.log('   - 2 danh mục cha (Nữ, Nam)');
    console.log('   - 8 danh mục con thuộc Nữ');
    console.log('   - 2 danh mục con thuộc Nam');

    await mongoose.disconnect();
    console.log('🔌 Đã ngắt kết nối MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed danh mục:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedCategories();
