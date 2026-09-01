class UploadController {
  async uploadImage(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Không tìm thấy file ảnh đính kèm' });
      }

      // Multer with CloudinaryStorage automatically uploads and provides the URL in req.file.path
      res.status(200).json({
        message: 'Upload ảnh thành công',
        url: req.file.path,
        filename: req.file.filename
      });
    } catch (error) {
      console.error('Lỗi upload ảnh:', error);
      res.status(500).json({ message: 'Lỗi server khi upload ảnh' });
    }
  }
}

module.exports = new UploadController();
