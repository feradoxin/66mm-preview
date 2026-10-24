(()=>{
const copy={
client:['Customer','顾客','Pelanggan','Khách hàng'],admin:['Boss','老板','Bos','Chủ quán'],
wechatOnboardingTitle:['How can we reach you?','我们如何联系您？','Bagaimana kami boleh hubungi anda?','Chúng tôi có thể liên hệ bạn thế nào?'],
wechatContact:['WeChat contact','微信联系方式','Hubungan WeChat','Liên hệ WeChat'],
wechatId:['WeChat ID','微信号','ID WeChat','ID WeChat'],
wechatWhy:['Add your WeChat ID so a manager can contact you about bookings. You can skip this and browse, but booking and help requests will stay locked.','请填写微信号，方便经理就预订事宜联系您。您可以跳过并继续浏览，但预订及协助申请将暂时无法使用。','Tambah ID WeChat supaya pengurus boleh menghubungi anda tentang tempahan. Anda boleh langkau dan terus melihat, tetapi tempahan dan permintaan bantuan akan dikunci.','Thêm ID WeChat để quản lý liên hệ về đặt chỗ. Bạn có thể bỏ qua và tiếp tục xem, nhưng chức năng đặt chỗ và yêu cầu hỗ trợ sẽ bị khóa.'],
wechatEditHelp:['Keep this ID up to date so managers can contact you about your bookings.','请及时更新微信号，方便经理就预订事宜联系您。','Pastikan ID ini terkini supaya pengurus boleh menghubungi anda tentang tempahan.','Hãy cập nhật ID này để quản lý có thể liên hệ về đặt chỗ của bạn.'],
wechatPlaceholder:['Your WeChat ID','您的微信号','ID WeChat anda','ID WeChat của bạn'],
saveContinue:['Save and continue','保存并继续','Simpan dan teruskan','Lưu và tiếp tục'],skipForNow:['Skip for now','暂时跳过','Langkau dahulu','Bỏ qua lúc này'],
saveWechat:['Save WeChat ID','保存微信号','Simpan ID WeChat','Lưu ID WeChat'],removeWechat:['Remove WeChat ID','删除微信号','Padam ID WeChat','Xóa ID WeChat'],
addWechat:['Add WeChat ID','添加微信号','Tambah ID WeChat','Thêm ID WeChat'],editWechat:['Edit WeChat ID','修改微信号','Ubah ID WeChat','Sửa ID WeChat'],notProvided:['Not added yet','尚未填写','Belum ditambah','Chưa thêm'],
wechatRequired:['Add your WeChat ID so a manager can contact you about this request.','请先添加微信号，方便经理就此申请联系您。','Tambah ID WeChat supaya pengurus boleh menghubungi anda tentang permintaan ini.','Thêm ID WeChat để quản lý có thể liên hệ về yêu cầu này.'],
removeWechatRule:['Cancel or complete all open bookings, reservations and services before removing your WeChat ID. A cancellation request still needs approval.','删除微信号前，请先取消或完成所有未结束的预订及服务。取消申请仍需批准。','Batalkan atau selesaikan semua tempahan dan perkhidmatan yang belum selesai sebelum memadam ID WeChat. Permintaan pembatalan masih memerlukan kelulusan.','Hủy hoặc hoàn tất mọi đặt chỗ và dịch vụ còn mở trước khi xóa ID WeChat. Yêu cầu hủy vẫn cần được duyệt.'],
wechatRemoveBlocked:['You still have open bookings or services. Cancel or complete them before removing your WeChat ID.','您仍有未结束的预订或服务，请先取消或完成后再删除微信号。','Anda masih mempunyai tempahan atau perkhidmatan belum selesai. Batalkan atau selesaikannya sebelum memadam ID WeChat.','Bạn vẫn có đặt chỗ hoặc dịch vụ chưa kết thúc. Hãy hủy hoặc hoàn tất trước khi xóa ID WeChat.'],
wechatEnterOrSkip:['Enter your WeChat ID, or choose Skip for now.','请输入微信号，或选择暂时跳过。','Masukkan ID WeChat, atau pilih Langkau dahulu.','Nhập ID WeChat hoặc chọn Bỏ qua lúc này.'],
wechatInvalid:['Use your WeChat ID: 6–20 letters, numbers, underscores or hyphens, starting with a letter.','请填写微信号：以字母开头，6–20 个字符，可包含字母、数字、下划线或连字符。','Gunakan ID WeChat: 6–20 huruf, nombor, garis bawah atau sempang, bermula dengan huruf.','Dùng ID WeChat: 6–20 chữ cái, số, dấu gạch dưới hoặc gạch nối, bắt đầu bằng chữ cái.'],
wechatSaved:['WeChat ID saved for this demo.','已在本次演示中保存微信号。','ID WeChat disimpan untuk demo ini.','Đã lưu ID WeChat cho bản thử này.'],wechatRemoved:['WeChat ID removed. Booking actions are now locked.','微信号已删除，预订操作现已锁定。','ID WeChat dipadam. Tindakan tempahan kini dikunci.','Đã xóa ID WeChat. Các thao tác đặt chỗ hiện bị khóa.'],
contactLocal:['Preview only. Contact details stay in this session and reset when you reload.','仅供预览，联系方式仅保留在本次会话中，刷新后清除。','Pratonton sahaja. Butiran hubungan kekal dalam sesi ini dan dipadam apabila dimuat semula.','Chỉ để xem thử. Thông tin liên hệ chỉ giữ trong phiên này và đặt lại khi tải lại.'],
dismissMessage:['Dismiss message','关闭提示','Tutup mesej','Đóng thông báo'],
noOpenBookings:['No open bookings.','没有未结束的预订。','Tiada tempahan belum selesai.','Không có đặt chỗ chưa kết thúc.'],noBookingHistory:['No finished bookings in this demo yet.','本次演示中尚无已结束的预订。','Belum ada tempahan selesai dalam demo ini.','Chưa có đặt chỗ đã kết thúc trong bản thử này.'],
cancelAwaiting:['Cancellation waiting for manager approval','取消申请待经理批准','Pembatalan menunggu kelulusan pengurus','Yêu cầu hủy đang chờ quản lý duyệt'],changeAwaiting:['Change waiting for manager approval','更改申请待经理批准','Perubahan menunggu kelulusan pengurus','Yêu cầu thay đổi đang chờ quản lý duyệt'],
bookingContactHelp:['Need to change this booking or resolve a problem? Send a request to the manager.','需要更改预订或处理问题？请向经理发送申请。','Perlu ubah tempahan atau selesaikan masalah? Hantar permintaan kepada pengurus.','Cần đổi đặt chỗ hoặc giải quyết vấn đề? Hãy gửi yêu cầu cho quản lý.'],
resolveConflict:['Ask a manager for help','请经理协助','Minta bantuan pengurus','Nhờ quản lý hỗ trợ'],conflictHelp:['Send this booking to the manager for help. They will contact you on WeChat.','将此预订发送给经理以寻求协助，经理将通过微信联系您。','Hantar tempahan ini kepada pengurus untuk bantuan. Mereka akan menghubungi anda di WeChat.','Gửi đặt chỗ này cho quản lý để được hỗ trợ. Quản lý sẽ liên hệ bạn qua WeChat.'],
changeRequestSent:['Request sent. Your booking stays active until a manager approves it.','申请已发送，经理批准前预订仍有效。','Permintaan dihantar. Tempahan kekal aktif sehingga pengurus meluluskannya.','Đã gửi yêu cầu. Đặt chỗ vẫn có hiệu lực cho đến khi quản lý duyệt.'],conflictRequestSent:['Help request sent to the manager in this demo.','已在演示中向经理发送协助申请。','Permintaan bantuan dihantar kepada pengurus dalam demo ini.','Đã gửi yêu cầu hỗ trợ cho quản lý trong bản thử.'],
exampleCustomer:['Example customer','示例顾客','Pelanggan contoh','Khách hàng mẫu'],contactWechat:['Contact on WeChat','通过微信联系','Hubungi melalui WeChat','Liên hệ qua WeChat'],copyWechat:['Copy WeChat ID','复制微信号','Salin ID WeChat','Sao chép ID WeChat'],
wechatLinkLimit:['A direct link to this personal WeChat chat is not available here. Copy the ID, open WeChat and use Add Contacts to find the customer.','此处暂无可直接打开个人微信聊天的链接。请复制微信号，打开微信，通过添加朋友查找顾客。','Pautan terus ke sembang WeChat peribadi ini tidak tersedia di sini. Salin ID, buka WeChat dan gunakan Tambah Kenalan untuk mencari pelanggan.','Chưa có liên kết trực tiếp đến cuộc trò chuyện WeChat cá nhân tại đây. Sao chép ID, mở WeChat và dùng Thêm liên hệ để tìm khách hàng.'],
contactFixture:['This is a fictional contact ID for layout preview.','此为用于界面预览的虚构联系账号。','Ini ID hubungan rekaan untuk pratonton reka bentuk.','Đây là ID liên hệ hư cấu để xem thử giao diện.'],
wechatCopied:['WeChat ID copied.','微信号已复制。','ID WeChat disalin.','Đã sao chép ID WeChat.'],wechatCopyFailed:['Could not copy. Select and copy the ID shown above.','复制失败，请选中并复制上方微信号。','Tidak dapat menyalin. Pilih dan salin ID di atas.','Không thể sao chép. Hãy chọn và sao chép ID ở trên.'],
approveCancellation:['Approve cancellation','批准取消','Luluskan pembatalan','Duyệt hủy'],approveChange:['Approve change','批准更改','Luluskan perubahan','Duyệt thay đổi'],markBookingComplete:['Mark booking completed','标记预订已完成','Tandakan tempahan selesai','Đánh dấu đặt chỗ đã hoàn tất'],
noWechatManager:['This customer has not added a WeChat ID yet.','此顾客尚未添加微信号。','Pelanggan ini belum menambah ID WeChat.','Khách hàng này chưa thêm ID WeChat.'],
demoReviewOnly:['Demo controls only. No real bookings are changed.','仅为演示操作，不会更改真实预订。','Kawalan demo sahaja. Tiada tempahan sebenar diubah.','Chỉ là thao tác thử. Không thay đổi đặt chỗ thật.'],
customerFollowUp:['Customer requests','顾客申请','Permintaan pelanggan','Yêu cầu của khách hàng'],
newDate:['New date','新日期','Tarikh baharu','Ngày mới'],newTime:['New time','新时间','Masa baharu','Giờ mới'],requestedStart:['Requested start','申请开始时间','Masa mula diminta','Giờ bắt đầu yêu cầu'],
customerHelpPending:['Customer needs help','顾客需要协助','Pelanggan perlukan bantuan','Khách hàng cần hỗ trợ'],resolveCustomerHelp:['Mark help request handled','标记协助申请已处理','Tandakan bantuan selesai','Đánh dấu đã hỗ trợ']
};
for(const [key,values]of Object.entries(copy))['en','zh','ms','vi'].forEach((lang,i)=>window.COPY[lang][key]=values[i]);
// UI terminology changes only. Internal role identifiers retain their existing API-compatible names.
for(const [lang,dict]of Object.entries(window.COPY))for(const key of Object.keys(dict)){
 if(lang==='en')dict[key]=dict[key].replace(/\bclients\b/gi,'customers').replace(/\bclient\b/gi,m=>m[0]==='C'?'Customer':'customer').replace(/\badmins\b/gi,'bosses').replace(/\badmin\b/gi,m=>m[0]==='A'?'Boss':'boss');
 if(lang==='zh')dict[key]=dict[key].replaceAll('管理员','老板').replaceAll('客户','顾客');
 if(lang==='ms')dict[key]=dict[key].replaceAll('Pentadbir','Bos').replaceAll('pentadbir','bos');
 if(lang==='vi')dict[key]=dict[key].replace(/Quản trị viên/g,'Chủ quán').replace(/quản trị viên/g,'chủ quán');
}
})();
