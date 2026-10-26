/* Payroll preview copy: all app-controlled controls have four locales. */
(()=>{const lines=`
month20View|View This Month|查看本月|Lihat Bulan Ini|Xem tháng này
month20Title|This Month’s Transactions|本月财务明细|Transaksi Bulan Ini|Giao dịch tháng này
month20Help|Simulated records, from the first day of this calendar month to now (Malaysia time). Each row is one transaction type. Sales and Staff earnings are separate entries, not a net-profit total. Pending requests and live estimates are excluded. Staff shares use the preview’s 60% rate.|模拟记录，涵盖本自然月1日至今（马来西亚时间）。每行仅列一种财务事项。销售收入与员工工资分别列示，不代表净利润合计。不含待处理申请及进行中的估算金额。员工工资按预览版60%的比例计算。|Rekod simulasi dari 1hb bulan kalendar ini hingga kini (waktu Malaysia). Setiap baris ialah satu jenis transaksi. Jualan dan pendapatan Staf disenaraikan berasingan, bukan jumlah untung bersih. Permohonan belum selesai dan anggaran semasa dikecualikan. Bahagian Staf menggunakan kadar pratonton 60%.|Dữ liệu mô phỏng từ ngày đầu tháng dương lịch đến hiện tại (giờ Malaysia). Mỗi dòng là một loại giao dịch. Doanh thu và thu nhập Nhân viên được ghi riêng, không phải tổng lợi nhuận ròng. Không gồm yêu cầu đang chờ và số tiền ước tính của dịch vụ đang diễn ra. Phần Nhân viên tính theo tỷ lệ 60% của bản xem trước.
month20Oldest|Earliest First|时间由早到晚|Paling Awal Dahulu|Từ cũ đến mới
month20Empty|No recorded transactions this month yet.|本月至今暂无已记录的财务事项。|Belum ada transaksi direkodkan bulan ini.|Chưa có giao dịch được ghi nhận trong tháng này.
month20ServiceSales|Service Sales|服务销售收入|Jualan Perkhidmatan|Doanh thu dịch vụ
month20StaffEarnings|Staff Earnings|员工工资收入|Pendapatan Staf|Thu nhập Nhân viên
month20RoomEarnings|Room Earnings|包厢收入|Pendapatan Bilik|Doanh thu phòng
month20TableEarnings|Table Earnings|桌位收入|Pendapatan Meja|Doanh thu bàn
month20CashAdvance|Cash Advancement|现金预支|Pendahuluan Tunai|Ứng tiền mặt
month20FundsAdvance|Manager Funds Advanced|拨付经理托管款|Dana Diserahkan kepada Pengurus|Giao quỹ cho Quản lý
month20FundsReturn|Manager Funds Returned|经理退回托管款|Dana Dipulangkan oleh Pengurus|Quản lý hoàn trả quỹ
month20OutstandingIncrease|Outstanding Increased|员工欠款增加|Hutang Staf Bertambah|Tăng dư nợ
month20OutstandingDecrease|Outstanding Reduced|员工欠款减少|Hutang Staf Berkurang|Giảm dư nợ
month20WagePayout|Wages Paid Out|工资发放|Gaji Dibayar|Chi trả lương
month20Tally|Wages Applied to Outstanding|工资抵扣欠款|Gaji Ditolak daripada Hutang|Đối trừ lương vào dư nợ
month20WageCorrection|Wage Correction|工资更正|Pembetulan Gaji|Điều chỉnh lương
month20TallyRestored|Tally Reversal|冲回工资抵扣|Pembalikan Tolakan|Hoàn lại khoản đối trừ
month20Repayment|Recovery Repaid|追偿款归还|Bayaran Balik Pemulihan|Hoàn trả khoản phải thu hồi
month20WriteOff|Recovery Written Off|追偿款核销|Hapus Kira Pemulihan|Xóa khoản phải thu hồi
payWorkspace|Payroll|薪资|Gaji|Bảng lương
payDemo|Simulated records only. No money is transferred and no document is delivered.|仅模拟记录，不转账或发送文件。|Rekod simulasi sahaja. Tiada pemindahan wang atau penghantaran dokumen.|Chỉ mô phỏng hồ sơ. Không chuyển tiền hay gửi tài liệu.
payFinalize|Finalize|结算定稿|Muktamadkan|Chốt lương
payTally|Tally|抵扣欠款|Tolak Hutang|Đối trừ
payPaidOut|Paid Out|工资发放|Bayaran Gaji|Chi trả
payOutstanding|Outstanding|员工欠款|Hutang Staf|Dư nợ
payFunds|Manager Funds|经理托管款|Dana Pengurus|Quỹ Quản lý
payRevisions|Revisions & Recovery|修订及追偿|Semakan & Pemulihan|Sửa đổi và thu hồi
payReports|Reports|报表|Laporan|Báo cáo
payHistory|History|历史记录|Sejarah|Lịch sử
payTools|More Payroll Tools|更多薪资工具|Alat Gaji Lain|Công cụ lương khác
payPeriod|Payroll Period|薪资周期|Tempoh Gaji|Kỳ lương
payPrimary|Primary Venue|主管门店|Premis Utama|Cơ sở chính
payCompany|All Venues|所有门店|Semua Premis|Mọi cơ sở
payBasis|Period: first day 18:00 to next first day 18:00, MYT. Cutoff: day 10 at 00:00 after period end; earlier finalization locks Manager edits.|周期为每月1日18:00至次月1日18:00（马来西亚时间）。次月10日00:00截止；提前定稿即锁定经理修改。|Tempoh: 1hb 18:00 hingga 1hb berikutnya 18:00 MYT. Tutup pada 10hb 00:00 selepas tempoh tamat; pemuktamadan awal mengunci edit Pengurus.|Kỳ: ngày 1 lúc 18:00 đến ngày 1 tháng sau lúc 18:00 MYT. Hạn sửa: ngày 10 lúc 00:00 sau kỳ; chốt sớm khóa chỉnh sửa của Quản lý.
payWages|Wages Accrued|累计工资|Gaji Terakru|Lương tích lũy
payOffset|Tally Applied|已抵扣|Tolakan Digunakan|Đã đối trừ
payRemainder|Full Payable|应发余额|Baki Penuh Dibayar|Toàn bộ tiền phải trả
payPaid|Paid|已发放|Dibayar|Đã chi
payStaff|Staff|员工|Staf|Nhân viên
paySources|Service Sources|服务来源|Sumber Khidmat|Nguồn dịch vụ
payVersion|Version|版本|Versi|Phiên bản
payDraft|Needs Finalization|待定稿|Perlu Dimuktamadkan|Chờ chốt
payFinalized|Ready for Tally|可抵扣|Sedia untuk Tolakan|Sẵn sàng đối trừ
payTallied|Ready for Full Payout|可全额发放|Sedia Bayaran Penuh|Sẵn sàng chi đủ
paySettled|Settled by Tally|已通过抵扣结清|Selesai melalui Tolakan|Đã tất toán qua đối trừ
payPrepared|Awaiting Manager Report|等待经理付款记录|Menunggu Laporan Pengurus|Chờ báo cáo Quản lý
payReported|Awaiting Boss Confirmation|等待老板确认|Menunggu Pengesahan Bos|Chờ Chủ quán xác nhận
payUncertain|Payment Reconciliation Required|需核对付款|Penyelarasan Bayaran Diperlukan|Cần đối soát thanh toán
paySourceReady|Reconciled|已核对|Diselaraskan|Đã đối soát
paySourceOpen|Incomplete Service|服务未完成|Khidmat Belum Selesai|Dịch vụ chưa hoàn tất
paySourcePending|Needs Source Review|待核对来源|Perlu Semakan Sumber|Cần kiểm tra nguồn
paySourceHelp|Reconcile every relevant Staff service source across venues. Full secondary-venue payroll closure is not required.|核对该员工所有门店相关服务来源，无需等待其他门店整份薪资关闭。|Selaraskan semua sumber khidmat staf merentas premis; tidak perlu menutup seluruh gaji premis sekunder.|Đối soát mọi nguồn dịch vụ liên quan của nhân viên; không cần chốt toàn bộ cơ sở phụ.
payReview|Review|审核|Semak|Kiểm tra
payConfirm|Confirm Record|确认记录|Sahkan Rekod|Xác nhận ghi nhận
payReviewFinalize|Review Venue Finalization|审核门店薪资定稿|Semak Pemuktamadan Premis|Kiểm tra chốt lương cơ sở
payReviewSources|Review Completed Sources|核对已完成服务|Semak Sumber Selesai|Kiểm tra nguồn đã hoàn tất
paySelect|Select|选择|Pilih|Chọn
paySelectAll|Select Eligible Staff|选择可处理员工|Pilih Staf Layak|Chọn nhân viên đủ điều kiện
payReviewTally|Review Selected Tally|审核所选抵扣|Semak Tolakan Dipilih|Kiểm tra đối trừ đã chọn
payReviewPayout|Review Selected Payouts|审核所选发放|Semak Bayaran Dipilih|Kiểm tra chi trả đã chọn
payMethod|Payout Route|发放方式|Laluan Bayaran|Cách chi trả
payDirect|Boss Records Full External Payment|老板记录外部全额付款|Bos Rekod Bayaran Luar Penuh|Chủ quán ghi nhận thanh toán đủ bên ngoài
payPrepare|Prepare Delegated Manager Payout|准备授权经理发放|Sediakan Bayaran Pengurus Diwakilkan|Chuẩn bị chi trả ủy quyền cho Quản lý
payManager|Manager|经理|Pengurus|Quản lý
payCustody|Entrusted Balance|托管余额|Baki Amanah|Số dư giữ hộ
payHeld|Held|已冻结预留|Ditahan|Đang giữ
payAvailable|Available Funds|可用款项|Dana Tersedia|Quỹ khả dụng
payFundAdvance|Record Funds Entrusted|记录交付托管款|Rekod Dana Diamanahkan|Ghi nhận giao quỹ
payFundReturn|Confirm Unused Funds Returned|确认退回未用款项|Sahkan Pulangan Dana Tidak Diguna|Xác nhận hoàn quỹ chưa dùng
payFundHelp|Company-wide funds belong to the named Manager. Holds reduce available funds. Only wages settlement is permitted.|款项归指定经理托管，预留款降低可用余额，仅可用于工资结算。|Dana syarikat dipegang Pengurus dinamakan. Tahanan mengurangkan dana tersedia. Untuk gaji sahaja.|Quỹ công ty do Quản lý được chỉ định giữ. Khoản giữ giảm quỹ khả dụng. Chỉ dùng trả lương.
payAmount|Amount (MYR)|金额（MYR）|Amaun (MYR)|Số tiền (MYR)
payNewWage|Corrected Full Entitlement (MYR)|修订后完整工资（MYR）|Kelayakan Penuh Dibetulkan (MYR)|Tổng quyền hưởng đã sửa (MYR)
payDirection|Adjustment|调整方向|Pelarasan|Điều chỉnh
payIncrease|Increase|增加|Tambah|Tăng
payDecrease|Decrease|减少|Kurang|Giảm
payDescription|Staff-Visible Description|员工可见说明|Keterangan untuk Staf|Mô tả nhân viên nhìn thấy
payReferenceDate|Reference Date (Optional)|参考日期（可选）|Tarikh Rujukan (Pilihan)|Ngày tham chiếu (tùy chọn)
payPostedToday|Posting uses today's date. A reference date does not backdate the record.|记录使用今天日期，参考日期不改变入账日期。|Rekod menggunakan tarikh hari ini. Tarikh rujukan tidak mengundurkan tarikh rekod.|Ghi nhận theo ngày hôm nay. Ngày tham chiếu không làm lùi ngày ghi nhận.
payReason|Internal Reason|内部原因|Sebab Dalaman|Lý do nội bộ
payEvidence|External Payment / Evidence Reference|外部付款／凭证编号|Rujukan Bayaran / Bukti Luar|Tham chiếu thanh toán / bằng chứng
payEvidenceHelp|Record evidence of the full external disbursement. This screen does not send money. Partial or uncertain transfers must remain held for reconciliation.|记录外部全额付款凭证，此界面不转账。部分或不确定付款须继续冻结并核对。|Rekod bukti bayaran luar penuh. Skrin ini tidak menghantar wang. Pindahan separa atau tidak pasti kekal ditahan.|Ghi nhận bằng chứng chi đủ bên ngoài. Màn hình không gửi tiền. Chuyển thiếu hoặc chưa rõ phải tiếp tục giữ để đối soát.
payEach|I reviewed this person's full amount|我已核对该员工全额金额|Saya semak amaun penuh staf ini|Tôi đã kiểm tra toàn bộ số tiền người này
payChecked|I reviewed the values, scope and consequences|我已核对金额、范围及影响|Saya semak nilai, skop dan kesan|Tôi đã kiểm tra giá trị, phạm vi và tác động
paySelf|Boss self-approval is recorded. Mandatory oversight for other active Boss accounts is retained in this preview; no external notification is sent.|记录老板自行审批，并保留对其他有效老板的强制监督通知，本预览不向外发送。|Kelulusan sendiri Bos direkodkan. Pengawasan wajib Bos aktif lain dikekalkan; tiada notifikasi luar dihantar.|Lưu việc Chủ quán tự duyệt và thông báo giám sát bắt buộc cho Chủ quán khác; không gửi thông báo ngoài.
payBefore|Before|原值|Sebelum|Trước
payAfter|After|新值|Selepas|Sau
payNoRows|No records for this selection.|此筛选无记录。|Tiada rekod untuk pilihan ini.|Không có hồ sơ theo lựa chọn này.
paySaved|Recorded in this preview.|已在预览中记录。|Direkodkan dalam pratonton ini.|Đã ghi nhận trong bản mẫu.
paySourceError|Unresolved or incomplete service sources block finalization.|未核对或未完成的服务阻止定稿。|Sumber belum selesai/diselaras menghalang pemuktamadan.|Nguồn chưa hoàn tất hoặc đối soát ngăn chốt lương.
payAccessError|Current role, primary venue or delegation does not permit this action.|当前角色、主管门店或授权不允许此操作。|Peranan, premis utama atau delegasi tidak membenarkan tindakan.|Vai trò, cơ sở chính hoặc ủy quyền hiện tại không cho phép thao tác.
payBlockedError|This record is not eligible for that action. Refresh its current state.|此记录不符合条件，请刷新当前状态。|Rekod tidak layak. Segar semula keadaan semasa.|Hồ sơ chưa đủ điều kiện. Làm mới trạng thái hiện tại.
payStaleError|The reviewed data or authority changed. Review again before confirming.|审核数据或权限已改变，请重新审核。|Data atau kuasa berubah. Semak semula sebelum sahkan.|Dữ liệu hoặc quyền đã thay đổi. Kiểm tra lại trước khi xác nhận.
payAmountError|Enter a valid nonnegative amount with at most two decimals; balances must not become negative.|请输入最多两位小数的有效非负金额，余额不得为负。|Masukkan amaun sah sehingga dua perpuluhan; baki tidak boleh negatif.|Nhập số tiền hợp lệ tối đa hai số thập phân; số dư không được âm.
payFundsError|The named Manager has insufficient available funds or held funds cannot be returned.|指定经理可用款不足，预留款不能退回。|Dana tersedia Pengurus tidak cukup atau dana ditahan tidak boleh dipulangkan.|Quỹ khả dụng của Quản lý không đủ hoặc khoản giữ chưa được hoàn.
payEvidenceError|An evidence reference is required for each payment or fund record.|每笔付款或托管款记录均需凭证编号。|Rujukan bukti diperlukan bagi setiap bayaran atau dana.|Mỗi khoản thanh toán hoặc quỹ cần tham chiếu bằng chứng.
payReasonError|Add a reason and explicitly confirm the review.|请填写原因并明确确认审核。|Tambah sebab dan sahkan semakan secara jelas.|Thêm lý do và xác nhận rõ việc kiểm tra.
payDescriptionError|A Staff-visible description is required.|必须填写员工可见说明。|Keterangan untuk Staf diperlukan.|Cần mô tả nhân viên nhìn thấy.
payConfirmEach|Confirm each selected person's full amount.|请逐一确认所选员工的全额金额。|Sahkan amaun penuh setiap staf dipilih.|Xác nhận đủ số tiền của từng người đã chọn.
payExportError|Select a concluded period, supported format, language and available version.|请选择已结束周期、支持格式、语言及可用版本。|Pilih tempoh selesai, format, bahasa dan versi tersedia.|Chọn kỳ đã kết thúc, định dạng, ngôn ngữ và phiên bản có sẵn.
payReconcileFirst|Resolve the payment or linked settlement evidence before revising or retrying.|修订或重试前须先核对付款及关联结算凭证。|Selesaikan bukti bayaran/penyelesaian sebelum semak atau cuba lagi.|Giải quyết bằng chứng thanh toán liên quan trước khi sửa hay thử lại.
payRevisionHelp|Positive change creates a supplement for the difference only. Unpaid reductions restore excess Tally explicitly. Paid reductions create separate recovery; no automatic debt or wage deduction.|增加仅生成差额补发；未发放减少须明确恢复超额抵扣；已发放减少生成独立追偿，不自动扣工资或增加欠款。|Pertambahan mewujudkan tambahan beza sahaja. Pengurangan belum dibayar memulihkan tolakan berlebihan. Pengurangan sudah dibayar jadi pemulihan berasingan tanpa potongan automatik.|Tăng tạo khoản bổ sung phần chênh lệch. Giảm chưa trả hoàn đối trừ vượt. Giảm đã trả tạo khoản thu hồi riêng, không tự tăng nợ hay khấu trừ lương.
payRevision|Review Entitlement Revision|审核工资修订|Semak Kelayakan Semula|Kiểm tra sửa quyền hưởng
payRecoverable|Recoverable Overpayment|可追偿超付款|Lebihan Bayaran Boleh Pulih|Khoản trả thừa có thể thu hồi
payRepayment|Record Repayment|记录归还|Rekod Bayaran Balik|Ghi nhận hoàn trả
payWriteOff|Approve Write-off|批准核销|Lulus Hapus Kira|Duyệt xóa khoản thu hồi
payReconcile|Review Payment Evidence|审核付款凭证|Semak Bukti Bayaran|Kiểm tra bằng chứng thanh toán
payObserved|Observed External Amount (MYR)|核实外部金额（MYR）|Amaun Luar Diperhatikan (MYR)|Số tiền bên ngoài đã xác minh (MYR)
payFullPaid|Full Payment Verified|已核实全额付款|Bayaran Penuh Disahkan|Đã xác minh chi đủ
payNotPaid|Not Paid — Release Hold|未付款—解除预留|Belum Dibayar — Lepas Tahanan|Chưa trả — bỏ khoản giữ
payKeepHeld|Keep Held — Evidence Unclear or Partial|保留冻结—凭证不清或部分付款|Kekal Ditahan — Bukti Kabur/Separa|Tiếp tục giữ — bằng chứng chưa rõ hoặc trả thiếu
payManagerPaid|Full External Payment Reported|报告已全额付款|Bayaran Luar Penuh Dilaporkan|Báo cáo đã chi đủ bên ngoài
payManagerUncertain|Uncertain / Partial External Payment|付款不确定／部分付款|Bayaran Luar Tidak Pasti / Separa|Thanh toán bên ngoài chưa rõ / trả thiếu
payReportPayment|Report External Payment|记录外部付款情况|Lapor Bayaran Luar|Báo cáo thanh toán bên ngoài
payConfirmReport|Review Manager Payment Report|审核经理付款记录|Semak Laporan Bayaran Pengurus|Kiểm tra báo cáo Quản lý
payRetryFailed|Review Failed Items Only|仅审核失败项目|Semak Item Gagal Sahaja|Chỉ kiểm tra mục thất bại
paySuccess|Recorded|已记录|Direkodkan|Đã ghi nhận
payFailed|Failed — No Payment Recorded|失败—未记录付款|Gagal — Tiada Bayaran Direkodkan|Thất bại — chưa ghi nhận chi trả
payReportRequest|Review Report Request|审核报表请求|Semak Permintaan Laporan|Kiểm tra yêu cầu báo cáo
payFormat|Format|格式|Format|Định dạng
payLanguage|Document Language|报表语言|Bahasa Dokumen|Ngôn ngữ tài liệu
payLatest|Latest Version|最新版本|Versi Terkini|Phiên bản mới nhất
payReportLimit|Preview request only: no PDF/XLSX is generated, no Telegram delivery or download link is created.|仅演示请求，不生成PDF/XLSX，不发送Telegram或创建下载链接。|Permintaan pratonton sahaja: tiada PDF/XLSX, penghantaran Telegram atau pautan muat turun.|Chỉ mô phỏng yêu cầu: không tạo PDF/XLSX, gửi Telegram hay tạo liên kết tải.
paySupplement|Supplement Only|仅补发差额|Tambahan Sahaja|Chỉ khoản bổ sung
payAudit|Review and Change History|审核及变更历史|Sejarah Semakan dan Perubahan|Lịch sử kiểm tra và thay đổi
payNoPartial|Only the full positive remainder can be recorded as Paid Out. Zero is settled by Tally.|仅可记录全额正数余额为已发放，零余额通过抵扣结清。|Hanya baki penuh positif direkod dibayar. Baki sifar selesai melalui tolakan.|Chỉ ghi chi trả toàn bộ số dư dương. Số dư không tất toán qua đối trừ.
payDelegated|Delegated Payouts|授权工资发放|Bayaran Diwakilkan|Chi trả được ủy quyền
payDetail|Statement Details|工资明细|Butiran Penyata|Chi tiết sao kê
payHistoryBasis|Original versions, Tally and payment facts are retained. Revisions do not create another full payout.|保留原始版本、抵扣及付款事实，修订不会产生重复全额发放。|Versi asal, tolakan dan fakta bayaran dikekalkan. Semakan tidak mewujudkan bayaran penuh kedua.|Giữ phiên bản gốc, đối trừ và chi trả. Sửa đổi không tạo lần chi đủ thứ hai.
`;for(const line of lines.trim().split('\n')){const [key,...values]=line.split('|');['en','zh','ms','vi'].forEach((lang,i)=>COPY[lang][key]=values[i]);}})();
