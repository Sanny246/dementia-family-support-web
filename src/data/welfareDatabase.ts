import { WelfareResource } from '../types';

export const WELFARE_DATABASE: WelfareResource[] = [
  {
    resource_id: 'LTC-PKG-1-CARE',
    resource_name: '長照2.0第一包錢：照顧及專業服務（居服員到府或日間照顧）',
    category: '長照申請',
    category_label: '長照2.0四包錢',
    plain_explanation: '這是政府出大筆補助，請受過合格訓練的照顧員到你家幫長輩洗澡、餵飯、備餐，或是白天專車把長輩接到日間照顧中心，讓照顧者不用24小時被綁住。',
    service_content: [
      '居家照顧服務：照服員到家協助長輩洗澡沐浴、口腔清潔、翻身拍背、陪同外出散步與就醫。',
      '日間照顧中心：白天接送至日照中心，提供團體社交、認知鍛鍊、運動與營養午餐，傍晚接回家中。',
      '專業復能服務：物理、職能或語言治療師到府指導長輩生活自主訓練（如自己握湯匙、安全站立）。'
    ],
    target_audience: [
      '50歲以上確診失智症者（領有身心障礙證明或經醫師開立失智症診斷書）',
      '65歲以上失能老人',
      '55歲以上失能原住民'
    ],
    eligibility_conditions: [
      '經各縣市長期照顧管理中心「照顧管理專員」到府評定長照需要等級（第2級至第8級）。',
      '未接受機構收容安置者（若入住長照機構則不適用此包錢）。'
    ],
    region: '全國',
    application_method: [
      '第一步：拿起市話或手機撥打「1966 長照服務專線」（前5分鐘通話免費）。',
      '第二步：提供長輩姓名、現居地址與目前失智/生活自理狀況。',
      '第三步：照管中心安排專員預約到府進行長照評估。',
      '第四步：核定等級後，由社區整合型服務中心（A單位個管師）到府共同討論擬定照顧計畫並媒合單位。'
    ],
    application_window: '各縣市政府衛生局長期照顧管理中心 / 撥打1966',
    official_agency: '衛生福利部 長期照顧司',
    official_phone: '1966',
    official_url: 'https://1966.gov.tw',
    source_title: '長照十年計畫2.0 照顧及專業服務給付及支付基準',
    source_summary: '長照等級第2~8級每月核定補助額度約10,020元至36,180元。一般戶自負額16%，中低收入戶自負5%，低收入戶政府全額補助。',
    official_update_date: '2026-01-15',
    retrieved_date: '2026-09-15',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['長照', '1966', '居家服務', '洗澡', '日照中心', '日間照顧', '餵飯', '復能', '照顧員'],
    source_url: 'https://1966.gov.tw/LTC/cp-4501-44754-207.html',
    practical_caregiver_tips: '訪視當天，請一定要由平時最清楚長輩狀況的主要照顧者在場。很多失智長輩在陌生專員面前會出現「社交假面」，表現得條理清晰、否認自己需要人幫忙；家屬請務必私下遞交一張平時記錄長輩健忘、半夜不睡或發脾氣的真實情境清單給專員，以確保評定出合理的等級。'
  },
  {
    resource_id: 'LTC-PKG-4-RESPITE',
    resource_name: '長照2.0第四包錢：喘息服務（照顧者休息給力）',
    category: '喘息服務',
    category_label: '長照2.0四包錢',
    plain_explanation: '專為照顧者設計的「放假充電補助」。安排受訓人員替你看顧長輩幾小時或短期住宿數天，讓你可以安心去醫院看自己的病、出趟差或睡個好覺。',
    service_content: [
      '居家喘息：照服員到家看顧陪伴長輩，協助進食、服藥與如廁，家屬可出門辦事或安心補眠。',
      '社區喘息：白天將長輩送至日間照顧中心或巷弄長照站使用喘息服務。',
      '機構住宿喘息：將長輩送至合約長照機構或護理之家短暫住宿（通常可預約數天至兩週）。'
    ],
    target_audience: [
      '經照管中心評定長照需要等級第2級至第8級之失智或失能者家庭',
      '聘僱外籍家庭看護工之家庭（自2023年起擴大放寬：外籍看護休假或短暫無法協助時，無論失能等級只要核定均可申請喘息服務）'
    ],
    eligibility_conditions: [
      '長照等級第2級至第6級：每年額度 32,340 元。',
      '長照等級第7級至第8級：每年額度 48,510 元。',
      '一般戶自負額僅 16%（政府補助84%）。'
    ],
    region: '全國',
    application_method: [
      '撥打1966長照專線，或直接向指派給您的A單位個管師提出申請。',
      '確認希望的喘息型態（居家照服員到府或機構短期住宿）與日期。',
      '若是逢年過節或長照機構住宿喘息，建議提前1至2個月請個管師協助預約床位。'
    ],
    application_window: '各縣市政府長期照顧管理中心 / A單位個案管理師',
    official_agency: '衛生福利部 長期照顧司',
    official_phone: '1966',
    official_url: 'https://1966.gov.tw',
    source_title: '長期照顧給付及支付基準第四包錢：喘息服務項目規範',
    source_summary: '保障主要照顧者身心健康，避免照顧者負荷過重倒下。每年給予32,340~48,510元之使用額度。',
    official_update_date: '2026-02-01',
    retrieved_date: '2026-09-15',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['喘息', '休息', '累了', '撐不住', '機構住宿', '外籍看護休假', '照顧者心理', '居家喘息'],
    source_url: 'https://1966.gov.tw/LTC/cp-4501-44754-207.html',
    practical_caregiver_tips: '很多照顧者會覺得把長輩送去喘息會對不起長輩，心裡有罪惡感。但照顧是一場馬拉松，照顧者垮了，整個家庭就跟著停擺。給自己定期安排幾小時或一個週末的空檔，是為了能走得更長久。'
  },
  {
    resource_id: 'LTC-PKG-3-ASSISTIVE-SAFETY',
    resource_name: '長照2.0第三包錢：輔具購租與居家無障礙環境改善（含GPS個人衛星定位器補助）',
    category: '輔具與居家安全',
    category_label: '長照2.0四包錢',
    plain_explanation: '補助家裡加裝防跌扶手、斜坡板、防褥瘡氣墊床、輪椅，以及失智長輩專用的「個人GPS衛星定位器（手錶/防走失器）」，大幅降低跌倒與走失危機。',
    service_content: [
      '居家無障礙改裝：浴室防滑處理、安全扶手安裝、門檻弭平或活動式斜坡板。',
      '個人生活輔具：輪椅、助行器、移位帶、高背輪椅、氣墊床。',
      '失智防走失專用輔具：個人衛星定位器（GPS協尋裝置），家屬可隨時透過手機APP得知長輩精準位置。'
    ],
    target_audience: [
      '長照需要等級第2級（含）以上之失智長者或失能者。'
    ],
    eligibility_conditions: [
      '每 3 年享有最高 40,000 元補助額度。',
      '一般戶自負額 30%（政府補助70%）；中低收入戶自負10%；低收入戶全額補助。',
      '必須先經過輔具中心評估人員「評估核定」後再行購買或施工，切勿自行先行購買以免無法核銷。'
    ],
    region: '全國',
    application_method: [
      '撥打1966或向A單位個管師提出需求。',
      '由個管師派案給「輔具資源中心」，專業評估師到府或到輔具中心進行評估。',
      '取得「輔具評估報告書」後，憑報告至合格輔具特約廠商選購或租賃，並由特約廠商代償墊付或家屬檢據核銷。'
    ],
    application_window: '各縣市輔具資源中心 / 1966長照專線',
    official_agency: '衛生福利部 社會及家庭署 / 長期照顧司',
    official_phone: '1966',
    official_url: 'https://1966.gov.tw',
    source_title: '長照2.0輔具服務及居家無障礙環境改善服務給付基準',
    source_summary: '每3年每人最高補助4萬元。含各類行動、沐浴、居家無障礙以及GPS個人定位手錶補助。',
    official_update_date: '2026-01-20',
    retrieved_date: '2026-09-10',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['輔具', '扶手', '浴室防跌', '無障礙', '斜坡板', '氣墊床', 'GPS定位器', '防走失手錶', '輪椅'],
    source_url: 'https://1966.gov.tw',
    practical_caregiver_tips: '「千萬不要先買再申請」！一定要等輔具評估報告書核定下來後再購買特約商品。若申請GPS定位手錶，記得評估長輩願不願意隨身佩戴，若長輩常把手錶摘掉，可考慮將定位器放置在長輩習慣隨身攜帶的小袋子或鞋底專用夾層。'
  },
  {
    resource_id: 'LTC-PKG-2-TRANSPORT',
    resource_name: '長照2.0第二包錢：交通接送服務（輪椅接送就醫）',
    category: '交通接送',
    category_label: '長照2.0四包錢',
    plain_explanation: '專車接送失智或失能長輩往返住家與醫院就醫、復健或日照中心，車輛備有輪椅升降設備，不用家人滿頭大汗抱長輩上下普通計程車。',
    service_content: [
      '專車接送至醫療院所就醫、回診、認知復健或日間照顧中心。',
      '車輛均為無障礙福祉車或配有合格輔具設備之合格特約車輛。'
    ],
    target_audience: [
      '經評定長照需要等級第4級以上者（偏遠地區放寬至第2級以上）。'
    ],
    eligibility_conditions: [
      '依居住地距離與各縣市公告定額補助，每月給予固定趟次額度。',
      '一般戶自負額通常約21%~27%（依各縣市自治規定略有差異）。'
    ],
    region: '全國',
    application_method: [
      '長照等級核定後，由個管師協助連結長照交通接送特約派車平台（或各縣市專屬預約APP/專線）。',
      '乘車前通常需提早 3~7 天進行線上或電話預約。'
    ],
    application_window: '各縣市長照交通預約中心 / A單位個管師',
    official_agency: '各縣市政府衛生局長期照顧管理中心',
    official_phone: '1966',
    official_url: 'https://1966.gov.tw',
    source_title: '長照2.0交通接送服務補助要點',
    source_summary: '減輕輪椅長者與失智家庭就醫路程交通負擔。',
    official_update_date: '2026-01-10',
    retrieved_date: '2026-09-12',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['交通接送', '長照專車', '復康巴士', '看醫生', '就醫車輛', '輪椅接送'],
    source_url: 'https://1966.gov.tw',
    practical_caregiver_tips: '長照交通接送因需求熱門，回診日前一至兩週即可向車隊預約。若遇臨時門診預約不到，亦可詢問各縣市無障礙計程車或復康巴士做備用選擇。'
  },
  {
    resource_id: 'DEMENTIA-CO-CARE',
    resource_name: '失智共同照護中心（各大醫院一站式專責窗口）',
    category: '失智共同照護',
    category_label: '失智專業照護體系',
    plain_explanation: '全台各大區域教學醫院設立的專責綠色通道。指派專業個管師一對一陪伴，協助尚未確診的長輩順利掛號檢查，並在診斷確立後提供家屬用藥指導與資源轉介。',
    service_content: [
      '就醫協助與綠色通道：協調神經內科、精神科與記憶門診，加速腦部影像檢查及臨床心理認知測驗安排。',
      '專責個管師個案管理：提供失智精神行為問題（如猜忌、妄想、日夜顛倒）的非藥物照護技巧諮詢。',
      '資源媒合：主動協助轉介1966長照申請、社區失智據點與家屬支持團體。'
    ],
    target_audience: [
      '懷疑有失智症狀但尚未確立診斷之長者與其家屬。',
      '已確診為極輕度（CDR 0.5）、輕度（CDR 1）至重度失智症患者及其家庭。'
    ],
    eligibility_conditions: [
      '全台各縣市居民均可致電所在地承辦共照中心醫院免費尋求諮詢。'
    ],
    region: '全國',
    application_method: [
      '查詢長輩居住地合作之失智共同照護中心（各縣市主要公私立大醫院均有設立）。',
      '撥打該院共照中心專線，描述目前長輩情況即可建檔並獲得專責個管師協助。'
    ],
    application_window: '衛福部全國失智共同照護中心名單（或撥打失智專線0800-474-580）',
    official_agency: '衛生福利部 護理及健康照護司',
    official_phone: '0800-474-580',
    official_url: 'https://www.mohw.gov.tw',
    source_title: '失智症防治照護政策綱領2.0 失智共同照護中心推展計畫',
    source_summary: '全國已成立逾115處失智共照中心，擔任失智家庭進入醫療與長照體系的引路人。',
    official_update_date: '2026-03-01',
    retrieved_date: '2026-09-10',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['共照中心', '失智確診', '記憶門診', '神經內科', '精神科', 'CDR評估', '個管師', '懷疑失智'],
    source_url: 'https://www.mohw.gov.tw',
    practical_caregiver_tips: '長輩若堅決抗拒看「失智症」或「精神科」，先不要強逼或爭執。可先打給共照中心個管師，個管師經驗豐富，會教你用「做心血管健康檢查」、「重陽免費健檢領贈品」、「聽力與記憶保養」等長輩能欣然接受的藉口順利帶進門診。'
  },
  {
    resource_id: 'DEMENTIA-COMMUNITY-POINT',
    resource_name: '失智社區服務據點（長輩日常活動與防退化樂園）',
    category: '失智社區服務',
    category_label: '失智專業照護體系',
    plain_explanation: '開在社區活動中心、教會或診所旁的友善聚會所。每週固定數天提供體能運動、音樂懷舊與手作課，讓輕中度失智長輩走出家門交朋友、延緩大腦退化，也讓家屬白天有一段喘息時光。',
    service_content: [
      '認知促進與延緩失能課程：手作藝能、音樂律動、懷舊故事、防跌體適能。',
      '安全友善共餐：營養午餐與茶水點心，引導長輩自主進食。',
      '家屬支持團體：照顧者分享茶會，彼此交換實務照顧訣竅與心理排解。'
    ],
    target_audience: [
      '經醫師確診失智症且日常生活尚具基本自理能力之長輩（CDR 0.5~2分）。'
    ],
    eligibility_conditions: [
      '免費或僅酌收微薄教材與共餐食材費。'
    ],
    region: '全國',
    application_method: [
      '洽詢各縣市長期照顧管理中心或所在地之失智共照中心媒合住家鄰近據點。',
      '致電據點預約參觀試讀，確認長輩適應良好即可加入固定班級。'
    ],
    application_window: '各縣市政府衛生局心理與長期照顧科 / 住家附近失智據點',
    official_agency: '衛生福利部 護理及健康照護司',
    official_phone: '1966',
    official_url: 'https://www.mohw.gov.tw',
    source_title: '失智照護服務據點布建計畫作業手冊',
    source_summary: '深入鄉鎮巷弄，提供失智長者非藥物治療與社會互動，減緩病程退化速度。',
    official_update_date: '2026-02-15',
    retrieved_date: '2026-09-12',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['失智據點', '社區據點', '延緩失能', '交朋友', '認知活動', '家屬支持團體', '共餐'],
    source_url: 'https://www.mohw.gov.tw',
    practical_caregiver_tips: '有些自尊心高的長輩不喜歡去「據點上課」，跟長輩說話時不妨換個包裝：「里長找你這種熱心大哥去幫忙當志工」、「那邊有棋友缺人泡茶」，長輩有被需要的尊榮感，出席意願會大幅提升。'
  },
  {
    resource_id: 'SAFETY-ANTI-WANDERING',
    resource_name: '防走失三道安全防護網（指紋捺印建檔、愛心手鍊、協尋網絡）',
    category: '走失與安全',
    category_label: '走失與居家安全',
    plain_explanation: '長輩出門突然迷路時的黃金救援保障！包含免費到警察局建檔指紋、佩戴刻有專屬編號與24小時服務電話的手鍊，走失時幾分鐘內就能幫長輩找到回家的路。',
    service_content: [
      '警察局指紋捺印建檔：至住家附近分局偵查隊或申請警察到府捺印，指紋建檔至警政署協尋系統，迷路送到派出所一比對即可辨識身分。',
      '愛心防走失手鍊：中華民國老人福利推動聯盟與各縣市政府合作發行，刻有長輩代碼及協尋免付費電話。',
      '失蹤老人協尋中心全國通報系統：連線全國警政與社政網絡協尋。'
    ],
    target_audience: [
      '確診失智症、有走失之虞，或領有身心障礙證明之長者。'
    ],
    eligibility_conditions: [
      '指紋捺印：完全免費，持身分證與失智相關診斷即可受理。',
      '愛心手鍊：各縣市符合中低收入或失智證明者免費申請，一般戶僅收取工本費約200元。'
    ],
    region: '全國',
    application_method: [
      '指紋捺印：家屬攜帶長輩身分證及診斷證明，陪同長輩前往住家附近的各分局偵查隊現場辦理。',
      '愛心手鍊：至各縣市社會局指定合約窗口，或向中華民國老人福利推動聯盟官網填表郵寄申請。'
    ],
    application_window: '各縣市政府警察局偵查隊 / 各縣市社會局 / 老人福利推動聯盟',
    official_agency: '內政部警政署 / 中華民國老人福利推動聯盟',
    official_phone: '0800-056-781',
    official_url: 'https://www.oldpeople.org.tw',
    source_title: '身心障礙者與失智長者預防走失手鍊與指紋捺印作業手冊',
    source_summary: '建置完善預防走失安全防護網，走失平安尋獲率逾98%。',
    official_update_date: '2026-03-01',
    retrieved_date: '2026-09-12',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['走失', '找不到家', '指紋捺印', '愛心手鍊', '迷路', '警察局', '老盟', '協尋'],
    source_url: 'https://www.oldpeople.org.tw',
    practical_caregiver_tips: '長輩若常把手鍊拆下來丟掉，可採取多重防護：1.在外套領口內側、常穿長褲內縫上寫有家人手機的防敏布標；2.在布鞋鞋墊或最常帶的鑰匙圈內放置輕型定位器；3.拍照存下長輩近三個月正面清晰大頭照，備於手機相簿內以備緊急協尋使用。'
  },
  {
    resource_id: 'TAX-SPECIAL-DEDUCTION',
    resource_name: '綜合所得稅長照特別扣除額（每人每年定額扣除 120,000 元）',
    category: '經濟補助',
    category_label: '經濟與稅捐減免',
    plain_explanation: '每年5月申報個人所得稅時，只要家中有符合長照或特定身心障礙條件的長輩，每人每年可以直接從綜合所得總額中扣除12萬元，實質減輕家庭荷包負擔。',
    service_content: [
      '定額減除綜合所得總額 120,000 元/人。'
    ],
    target_audience: [
      '符合長照需要等級第2級至第8級且在當年度有使用長照2.0服務者。',
      '入住全日型住宿式照顧機構達90天以上者。',
      '在家自行照顧且符合聘僱外籍家庭看護工標準（例如經指定醫療機構評估失智評估量表CDR 1分以上或持有特定身心障礙手冊）。'
    ],
    eligibility_conditions: [
      '排富條款限制：申報戶適用所得稅率在20%以上、基本所得額超過免稅門檻者不適用。'
    ],
    region: '全國',
    application_method: [
      '年度報稅時，直接附上以下任一證明文件即可申報：',
      '1. 當年度使用長照服務之收據（繳費單）。',
      '2. 住宿式機構繳費收據累計90天。',
      '3. 符合外籍看護標準之診斷證明書（病症暨失能診斷證明書影本）。',
      '4. 載有特定障礙項目之身心障礙證明影本。'
    ],
    application_window: '財政部各地區國稅局 / 國稅局免付費電話',
    official_agency: '財政部 賦稅署',
    official_phone: '0800-000-321',
    official_url: 'https://tax.nat.gov.tw',
    source_title: '所得稅法第17條長照特別扣除額申報與查核作業要點',
    source_summary: '每年定額12萬元扣除額，減輕照顧失能與失智親屬之租稅負擔。',
    official_update_date: '2026-05-01',
    retrieved_date: '2026-09-01',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['長照扣除額', '報稅', '所得稅', '12萬', '免稅額', '國稅局', '退稅', '節稅'],
    source_url: 'https://tax.nat.gov.tw',
    practical_caregiver_tips: '平時每次使用長照服務支付自負額的繳費收據，或是日照中心收據，請準備一個專用透明夾統一妥善保存。報稅時只要有使用紀錄，國稅局系統多數也能直接自動查調帶入。'
  },
  {
    resource_id: 'MOL-FOREIGN-CAREGIVER-SIMPLIFIED',
    resource_name: '外籍家庭看護工失智免巴氏量表申請管道（多元免評新制）',
    category: '外籍家庭看護',
    category_label: '居家與外籍照護',
    plain_explanation: '勞動部最新多元免評政策：失智長輩只要經神經內科或精神科醫師開立「失智臨床評估量表（CDR）1分以上」，即可直接申請聘僱外籍家庭看護工，不必再辛苦做繁瑣的巴氏量表。',
    service_content: [
      '得申請聘僱一名外籍家庭看護工到家協助長輩全天候日常生活作息。',
      '外籍看護在台期間，家庭仍可併同使用長照2.0之專業復能、交通接送、輔具補助與喘息服務。'
    ],
    target_audience: [
      '經專科醫師評估CDR量表1分以上之輕度至中重度失智症患者。',
      '初次申請或期滿續聘者。'
    ],
    eligibility_conditions: [
      '具有神經科或精神科醫師開立載明CDR分數達1分以上之有效診斷證明書，或具符合特定障礙類別之身心障礙手冊。'
    ],
    region: '全國',
    application_method: [
      '請醫師於看診時開立「病症暨失能診斷證明書（載明CDR分數達1分以上）」。',
      '向各縣市政府長期照顧管理中心遞交申請，並向勞動力發展署申請招募許可函（可自行申請或委託合法立案私立就業服務機構代辦）。'
    ],
    application_window: '勞動部勞動力發展署 / 各縣市長期照顧管理中心照管專員',
    official_agency: '勞動部 勞動力發展署',
    official_phone: '1955',
    official_url: 'https://www.wda.gov.tw',
    source_title: '外國人從事就業服務法第46條第1項第8款至第11款工作資格及審查標準',
    source_summary: '2023年底起實施簡化便民新制，失智症CDR達1分者免受巴氏量表分數限制即可申請。',
    official_update_date: '2026-01-01',
    retrieved_date: '2026-09-01',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['外籍看護', '外勞', '印傭', '菲傭', '免巴氏量表', 'CDR 1分', '外籍家庭看護工', '勞動部'],
    source_url: 'https://www.wda.gov.tw',
    practical_caregiver_tips: '很多人以為家裡有請外籍看護就不能用長照2.0，這是錯誤觀念！聘僱外籍看護的家庭，依然可以享受政府長照「喘息服務」（讓外籍看護休假回鄉充電）、「交通接送服務」、「專業復能」及「輔具3年4萬元補助」，千萬不要放棄自己的權益。'
  },
  {
    resource_id: 'LEGAL-GUARDIANSHIP-PROTECTION',
    resource_name: '成年監護宣告、輔助宣告與意定監護（預防詐騙與產權法律防線）',
    category: '法律與財產保護',
    category_label: '法律與長者保護',
    plain_explanation: '失智長輩判斷力衰退時，很容易被詐騙、亂過戶房產或遭簽訂不平等合約。透過法院監護宣告或長輩清醒時立下的意定監護，在法律上守護長輩晚年老本與醫療自主權。',
    service_content: [
      '意定監護：長輩在輕度失智、尚具辨識能力時，自行指定未來信任的監護人（向公證人辦理公證）。',
      '監護宣告：向法院聲請，由法院裁定監護人與會同開具財產清冊人，長輩日後重大財產處分均須經監護人同意，法律上可撤銷被詐騙簽約行為。',
      '高齡安養信託：將退休金與房產放入銀行專戶，專款專用於醫療院所與長照機構費用，防止任何人挪用。'
    ],
    target_audience: [
      '輕度失智尚有意思能力長輩（適合辦理意定監護或安養信託）。',
      '中度至重度失智、意思能力顯著不足或已無法表達者（向法院聲請輔助宣告或監護宣告）。'
    ],
    eligibility_conditions: [
      '經公立或精神專科醫院出具認知障礙精神鑑定報告。'
    ],
    region: '全國',
    application_method: [
      '向長輩戶籍所在地之地方法院家事法庭提出聲請狀。',
      '法院指定合格醫療院所指派精神科專科醫師進行精神鑑定，法官綜合裁定宣告。'
    ],
    application_window: '各地方法院家事服務中心 / 法律扶助基金會（全國專線412-8518）',
    official_agency: '司法院 家事法庭 / 財團法人法律扶助基金會',
    official_phone: '02-412-8518',
    official_url: 'https://www.judicial.gov.tw',
    source_title: '民事訴訟法與家事事件法 成年監護宣告作業規定',
    source_summary: '保障認知障礙長者法律權益與財產安全，遏止詐騙集團及不當產權移轉。',
    official_update_date: '2026-01-01',
    retrieved_date: '2026-09-01',
    last_confirmed_date: '2026-09-20',
    data_status: '有效',
    freshness: 'fresh',
    keywords: ['監護宣告', '輔助宣告', '意定監護', '詐騙', '過戶', '房產', '信託', '家事法庭', '法扶'],
    source_url: 'https://www.judicial.gov.tw',
    practical_caregiver_tips: '若手足之間對於長輩照顧財務容易有懷疑猜忌，提早由法院裁定監護人並由公正第三人會同開立財產清冊，或設立安養信託專戶，是保護長輩、也能避免家族日後興訟的最佳法律護盾。'
  }
];
