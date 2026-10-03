export const categories = [
  { id: 'employment', title: 'Việc làm & Nhân sự', description: 'Các biểu mẫu dành cho quan hệ lao động và nhân sự.', icon: 'briefcase', count: 6 },
  { id: 'administrative', title: 'Hành chính', description: 'Đơn từ hành chính thông dụng cho mọi nhu cầu.', icon: 'landmark', count: 8 },
  { id: 'contracts', title: 'Hợp đồng', description: 'Mẫu hợp đồng rõ ràng, chuyên nghiệp và dễ tùy chỉnh.', icon: 'file-signature', count: 5 },
  { id: 'finance', title: 'Tài chính & Kế toán', description: 'Biểu mẫu đề nghị, xác nhận và thanh toán.', icon: 'wallet-cards', count: 4 },
  { id: 'personal', title: 'Cá nhân', description: 'Những giấy tờ cá nhân cần thiết trong cuộc sống.', icon: 'user-round', count: 7 },
  { id: 'education', title: 'Giáo dục', description: 'Đơn xin phép và biểu mẫu học tập.', icon: 'graduation-cap', count: 3 },
]

export const templates = [
  {
    id: 'resignation-standard', categoryId: 'employment', title: 'Đơn xin nghỉ việc tiêu chuẩn', description: 'Mẫu đơn chuyên nghiệp, phù hợp với hầu hết môi trường làm việc.', updated: 'Cập nhật 12/09/2026',
    contentTemplate: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n\nĐƠN XIN NGHỈ VIỆC\n\nKính gửi: Ban Giám đốc Công ty\n\nTôi tên là {{name}}, hiện đang giữ chức vụ {{position}} tại bộ phận {{department}}.\n\nNay tôi làm đơn này kính xin Ban Giám đốc cho phép tôi được nghỉ việc kể từ ngày {{leaveDate}} vì lý do: {{reason}}.\n\nTôi cam kết sẽ hoàn tất việc bàn giao công việc trước thời điểm nghỉ việc.\n\nTrân trọng,\n\n{{name}}',
    fields: [
      { id: 'name', label: 'Họ và tên', type: 'text', placeholder: 'Nguyễn Văn An', required: true },
      { id: 'position', label: 'Chức vụ', type: 'text', placeholder: 'Chuyên viên Marketing', required: true },
      { id: 'department', label: 'Bộ phận', type: 'text', placeholder: 'Phòng Marketing', required: true },
      { id: 'leaveDate', label: 'Ngày nghỉ dự kiến', type: 'date', required: true },
      { id: 'reason', label: 'Lý do nghỉ việc', type: 'textarea', placeholder: 'Nhập lý do của bạn...', required: true },
    ],
  },
  {
    id: 'resignation-health', categoryId: 'employment', title: 'Đơn xin nghỉ việc vì lý do sức khỏe', description: 'Mẫu đơn trình bày ngắn gọn, trang trọng cho lý do sức khỏe.', updated: 'Cập nhật 08/09/2026',
    contentTemplate: 'ĐƠN XIN NGHỈ VIỆC\n\nKính gửi: Ban Giám đốc Công ty\n\nTôi tên là {{name}}, chức vụ {{position}}. Do tình trạng sức khỏe không đảm bảo, tôi kính xin được nghỉ việc kể từ ngày {{leaveDate}}.\n\nTôi xin chân thành cảm ơn sự hỗ trợ của Công ty trong thời gian qua.\n\nTrân trọng,\n{{name}}',
    fields: [
      { id: 'name', label: 'Họ và tên', type: 'text', placeholder: 'Nguyễn Văn An', required: true },
      { id: 'position', label: 'Chức vụ', type: 'text', placeholder: 'Chuyên viên', required: true },
      { id: 'leaveDate', label: 'Ngày nghỉ dự kiến', type: 'date', required: true },
    ],
  },
  {
    id: 'employment-contract', categoryId: 'contracts', title: 'Hợp đồng lao động', description: 'Mẫu hợp đồng lao động cơ bản giữa người lao động và doanh nghiệp.', updated: 'Cập nhật 01/09/2026',
    contentTemplate: 'HỢP ĐỒNG LAO ĐỘNG\n\nBên A: {{company}}\nĐại diện: {{representative}}\n\nBên B: {{name}}\nVị trí công việc: {{position}}\nNgày bắt đầu: {{startDate}}\n\nHai bên thống nhất ký kết hợp đồng với các điều khoản theo quy định hiện hành.',
    fields: [
      { id: 'company', label: 'Tên công ty', type: 'text', placeholder: 'Công ty TNHH ABC', required: true },
      { id: 'representative', label: 'Người đại diện', type: 'text', placeholder: 'Trần Văn Bình', required: true },
      { id: 'name', label: 'Họ và tên người lao động', type: 'text', placeholder: 'Nguyễn Văn An', required: true },
      { id: 'position', label: 'Vị trí công việc', type: 'text', placeholder: 'Kỹ sư phần mềm', required: true },
      { id: 'startDate', label: 'Ngày bắt đầu', type: 'date', required: true },
    ],
  },
  {
    id: 'leave-request', categoryId: 'administrative', title: 'Đơn xin nghỉ phép', description: 'Tạo đơn xin nghỉ phép nhanh chóng cho kỳ nghỉ sắp tới.', updated: 'Cập nhật 28/08/2026',
    contentTemplate: 'ĐƠN XIN NGHỈ PHÉP\n\nKính gửi: {{manager}}\n\nTôi tên là {{name}}, thuộc bộ phận {{department}}, kính xin được nghỉ phép từ ngày {{fromDate}} đến ngày {{toDate}} vì lý do: {{reason}}.\n\nKính mong cấp trên xem xét và phê duyệt.\n\nNgười làm đơn\n{{name}}',
    fields: [
      { id: 'name', label: 'Họ và tên', type: 'text', placeholder: 'Nguyễn Văn An', required: true },
      { id: 'department', label: 'Bộ phận', type: 'text', placeholder: 'Phòng Kinh doanh', required: true },
      { id: 'manager', label: 'Người phê duyệt', type: 'text', placeholder: 'Trưởng phòng', required: true },
      { id: 'fromDate', label: 'Nghỉ từ ngày', type: 'date', required: true },
      { id: 'toDate', label: 'Đến ngày', type: 'date', required: true },
      { id: 'reason', label: 'Lý do', type: 'textarea', placeholder: 'Nhập lý do xin nghỉ...', required: true },
    ],
  },
]

export function getCategory(id) { return categories.find((category) => category.id === id) }
export function getTemplate(id) { return templates.find((template) => template.id === id) }
export function getTemplatesByCategory(categoryId) { return templates.filter((template) => template.categoryId === categoryId) }

export const iconNames = { briefcase: 'BriefcaseBusiness', landmark: 'Landmark', 'file-signature': 'FileSignature', 'wallet-cards': 'WalletCards', 'user-round': 'UserRound', 'graduation-cap': 'GraduationCap' }

export function renderTemplate(template, values) {
  return template.contentTemplate.replace(/{{(.*?)}}/g, (_, key) => values[key.trim()] || `[${template.fields.find((field) => field.id === key.trim())?.label || key.trim()}]`)
}

export function formatDate(value) {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  return day && month && year ? `${day}/${month}/${year}` : value
}
