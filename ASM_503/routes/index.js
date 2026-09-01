var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/sum/:x/:y', function(req, res, next) {
  let a = parseFloat(req.params.x);
  let b = parseFloat(req.params.y);
  res.json({ sum: a + b });
});
// khai báo 1 mảng lưu danh sách sv
let students = [
  { id: 1, name: 'Nguyen Van A', age: 20 },
  { id: 2, name: 'Le Thi B', age: 22 },
  { id: 3, name: 'Tran Van C', age: 21 }
];

// lấy danh sách thông tin sinh viên khi dùng gửi id => getBuyId
router.get('/students/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  let student = students.find(s => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

module.exports = router;
