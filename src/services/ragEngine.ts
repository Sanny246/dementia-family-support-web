import {
  UserNeedsInput,
  ClassifiedNeeds,
  WelfareCategory,
  PriorityAction,
  WelfareResource,
  FollowUpQuestion
} from '../types';
import { WELFARE_DATABASE } from '../data/welfareDatabase';

/**
 * 敏感個資偵測器 (Prompt 07)
 * 偵測身分證號、台灣手機/市話、完整門牌地址、病歷號碼
 */
export function detectSensitiveInfo(text: string): string[] {
  const issues: string[] = [];
  if (!text) return issues;

  // 身分證字號（字母 + 1或2 + 8碼數字）
  const twIdRegex = /[A-Za-z][12]\d{8}/g;
  if (twIdRegex.test(text)) {
    issues.push('疑似包含中華民國身分證字號');
  }

  // 台灣手機號碼 (09xxxxxxxx)
  const phoneRegex = /09\d{2}[-\s]?\d{3}[-\s]?\d{3}|09\d{8}/g;
  if (phoneRegex.test(text)) {
    issues.push('疑似包含行動電話號碼');
  }

  // 台灣市話 (0x-xxxxxxx)
  const telRegex = /0\d{1,2}[-\s]?\d{6,8}/g;
  if (telRegex.test(text)) {
    issues.push('疑似包含市內電話號碼');
  }

  // 完整門牌 (xx市xx區xx路xx號)
  const addressRegex = /[\u4e00-\u9fa5]{1,4}(?:市|縣)[\u4e00-\u9fa5]{1,4}(?:區|鄉|鎮|市)[\u4e00-\u9fa5]{1,10}(?:路|街|大道)\d{1,5}(?:之\d{1,3})?號/g;
  if (addressRegex.test(text)) {
    issues.push('疑似包含詳細居住門牌地址');
  }

  // 病歷號
  const medicalIdRegex = /(?:病歷號|病歷編號|病歷)\s*[:：]?\s*[A-Za-z0-9]{5,}/g;
  if (medicalIdRegex.test(text)) {
    issues.push('疑似包含醫院病歷號碼');
  }

  return issues;
}

/**
 * 緊急情境偵測器 (Prompt 27)
 * 如果涉及走失、立即人身危險、暴力、自傷、呼吸困難等，優先提示眼前的安全協助。
 */
export function detectEmergency(input: UserNeedsInput): {
  isEmergency: boolean;
  emergencyTypes: string[];
} {
  const types: string[] = [];
  const text = `${input.freeText} ${input.selectedProblems.join(' ')}`;

  if (/走失|失蹤|找不到人|跑出去沒回來|迷路中/i.test(text)) {
    types.push('長輩目前走失或失聯緊急協尋');
  }
  if (/自傷|自殺|想不開|割腕|跳樓/i.test(text)) {
    types.push('緊急自傷或心理危急狀態');
  }
  if (/打人|家暴|拿刀|攻擊|傷害他人|威脅生命/i.test(text)) {
    types.push('家庭暴力或即時人身衝突安全威脅');
  }
  if (/昏迷|叫不醒|沒有呼吸|大出血|抽搐不止/i.test(text)) {
    types.push('急性生命危險與急症醫療救護');
  }

  return {
    isEmergency: types.length > 0,
    emergencyTypes: types
  };
}

/**
 * 需求分類器 (Prompt 08)
 * 根據使用者勾選的困難、長輩基本狀況、照顧方式與自由文字，對應到 17 大福利類別。
 * 遵守規則：AI 僅進行「需求分類」，絕對不進行疾病診斷！
 */
export function classifyNeeds(input: UserNeedsInput): WelfareCategory[] {
  const categories = new Set<WelfareCategory>();
  const combinedText = `${input.selectedProblems.join(' ')} ${input.freeText} ${input.dailyLivingStatus.join(' ')} ${input.primaryCareMethod}`.toLowerCase();

  // 1. 長照申請
  if (
    input.selectedProblems.includes('不知道怎麼申請長照') ||
    input.selectedProblems.includes('我不知道有哪些政府福利') ||
    input.diagnosisStatus === '已確診' ||
    /長照|1966|額度|四包錢|照管專員/.test(combinedText)
  ) {
    categories.add('長照申請');
  }

  // 2. 日間照顧
  if (
    input.selectedProblems.includes('想找日間照顧') ||
    input.selectedProblems.includes('白天沒有人可以照顧') ||
    input.primaryCareMethod === '與家人同住但白天無人' ||
    /白天|日照|上班|送去|託管/.test(combinedText)
  ) {
    categories.add('日間照顧');
  }

  // 3. 居家服務
  if (
    input.selectedProblems.includes('想找居家照顧') ||
    input.selectedProblems.includes('洗澡、吃飯或如廁變得困難') ||
    input.dailyLivingStatus.some((s) => /洗澡|穿衣|如廁|吃飯/.test(s)) ||
    /到府|洗澡|居服|餵食|翻身/.test(combinedText)
  ) {
    categories.add('居家服務');
  }

  // 4. 喘息服務
  if (
    input.selectedProblems.includes('家人需要喘息') ||
    input.selectedProblems.includes('我覺得自己快撐不住了') ||
    /累|喘息|休息|放假|睡不著|照顧壓力|心力交瘁/.test(combinedText)
  ) {
    categories.add('喘息服務');
  }

  // 5. 走失與安全
  if (
    input.selectedProblems.includes('長輩容易走失') ||
    input.selectedProblems.includes('晚上不睡或日夜顛倒') ||
    /走失|迷路|出門|愛心手鍊|指紋|gps|定位/.test(combinedText)
  ) {
    categories.add('走失與安全');
  }

  // 6. 輔具與居家安全
  if (
    input.dailyLivingStatus.includes('行走需要協助') ||
    input.dailyLivingStatus.includes('洗澡需要協助') ||
    /跌倒|扶手|無障礙|輪椅|防跌|氣墊床/.test(combinedText)
  ) {
    categories.add('輔具與居家安全');
  }

  // 7. 外籍家庭看護
  if (
    input.primaryCareMethod === '外籍家庭看護' ||
    /外籍|看護|移工|印傭|巴氏量表/.test(combinedText)
  ) {
    categories.add('外籍家庭看護');
  }

  // 8. 失智共同照護 & 醫療評估
  if (
    input.diagnosisStatus === '正在評估' ||
    input.diagnosisStatus === '尚未評估' ||
    input.diagnosisStatus === '不確定' ||
    input.selectedProblems.includes('長輩情緒或行為變化很大') ||
    /健忘|懷疑|看醫生|門診|神經內科|精神科|幻覺|妄想|診斷/.test(combinedText)
  ) {
    categories.add('失智共同照護');
    categories.add('醫療與失智評估');
  }

  // 9. 失智社區服務
  if (
    input.diagnosisStatus === '已確診' ||
    input.diagnosisStatus === '正在評估' ||
    /據點|活動|延緩退化|防退化|做美勞|運動/.test(combinedText)
  ) {
    categories.add('失智社區服務');
  }

  // 10. 經濟補助
  if (
    input.selectedProblems.includes('我不知道有哪些政府福利') ||
    /補助|津貼|扣除額|所得稅|免稅|錢|自負額/.test(combinedText)
  ) {
    categories.add('經濟補助');
  }

  // 11. 交通接送
  if (/輪椅接送|看病接送|接送|交通車|復康巴士/.test(combinedText)) {
    categories.add('交通接送');
  }

  // 12. 照顧者支持 & 情緒支持
  if (
    input.selectedProblems.includes('我覺得自己快撐不住了') ||
    /哭|痛苦|壓力|崩潰|自責|孤單|生氣/.test(combinedText)
  ) {
    categories.add('照顧者支持');
    categories.add('情緒支持');
  }

  // 13. 機構住宿
  if (
    input.primaryCareMethod === '機構住宿' ||
    /住宿型|安養院|養護中心|護理之家|全天照顧/.test(combinedText)
  ) {
    categories.add('機構住宿');
  }

  if (categories.size === 0) {
    categories.add('長照申請');
    categories.add('其他');
  }

  return Array.from(categories);
}

/**
 * 必要追問機制 (Prompt 09)
 * 只有真正影響資源匹配（如是否已有確診診斷書、外籍看護狀況、走失史）且原資料不足時，最多提 3 題。
 * 提供選項且必含「不知道」或「跳過」。
 */
export function generateFollowUpQuestions(
  input: UserNeedsInput,
  categories: WelfareCategory[]
): FollowUpQuestion[] {
  const questions: FollowUpQuestion[] = [];

  // 追問 1：如果選了長照或走失，但未確認長輩年齡是否滿 50 歲
  if (
    (input.elderAge === '64歲以下' || input.elderAge === '不方便回答') &&
    categories.includes('長照申請')
  ) {
    questions.push({
      id: 'fq_age_fifty',
      question: '長輩目前是否已年滿 50 歲？',
      reason: '台灣長照2.0失智照護補助起計年齡為50歲，年滿50歲且具診斷證明即可申請長照。',
      options: ['已滿 50 歲', '未滿 50 歲', '不知道', '跳過']
    });
  }

  // 追問 2：如果提到了白天需要照顧或居家服務，但診斷狀況為尚未評估或不確定
  if (
    (input.diagnosisStatus === '尚未評估' || input.diagnosisStatus === '不確定') &&
    (categories.includes('日間照顧') || categories.includes('居家服務'))
  ) {
    questions.push({
      id: 'fq_doctor_visit',
      question: '長輩近期是否願意至醫院神經內科或記憶門診做初步健康檢查？',
      reason: '若長輩願意就醫，可由失智共照中心協助快速排檢；若非常抗拒，個管師會提供委婉引導就醫的話術建議。',
      options: ['願意去醫院', '非常抗拒就醫', '需要委婉理由協助', '不知道', '跳過']
    });
  }

  // 追問 3：如果提到了走失風險，詢問目前是否已佩戴任何防走失配件
  if (
    categories.includes('走失與安全') &&
    !/手鍊|手錶|指紋|gps|晶片/.test(input.freeText.toLowerCase())
  ) {
    questions.push({
      id: 'fq_wandering_tool',
      question: '長輩目前身上是否有佩戴任何標示聯絡電話的配件（如手鍊、防走失手錶或布標）？',
      reason: '若尚未配戴，會優先指引免費申請愛心防走失手鍊與警察局免費指紋建檔。',
      options: ['完全沒有', '長輩常自行摘掉', '已有佩戴', '不知道', '跳過']
    });
  }

  // 最多只保留 3 題
  return questions.slice(0, 3);
}

/**
 * 現在先做 3 件事 (Prompt 15)
 * 最多 3 個優先行動。優先考慮最急迫問題、人身安全、立即聯絡的官方專線。
 * 遵循 Prompt 10 禁令：絕不使用「你一定符合」或「你可以領到」。
 */
export function generatePriorityActions(
  input: UserNeedsInput,
  categories: WelfareCategory[],
  isEmergency: boolean
): PriorityAction[] {
  const actions: PriorityAction[] = [];

  // 若為緊急情境，第一件永遠是眼前人身安全
  if (isEmergency) {
    actions.push({
      id: 'act-emergency',
      action_title: '先處理眼前人身安全，必要時撥打 110 或 119',
      reason: '長輩目前處於走失失聯或急性身心危險狀態，政策福利需暫緩，以安全尋獲與生命醫療為第一順位。',
      solves_what: '防止長輩意外傷害，動員警方即時路口監視器調閱與協尋。',
      how_to_start: '若長輩走失，請攜帶近期正面清晰大頭照至附近派出所報案協尋，並可致電 0800-056-781（失蹤老人協尋中心）。',
      official_source_agency: '內政部警政署 / 失蹤老人協尋中心',
      official_phone: '110 / 0800-056-781',
      official_url: 'https://www.oldpeople.org.tw'
    });
  }

  // 行動：若尚未確立診斷，優先安排友善就醫
  if (input.diagnosisStatus === '尚未評估' || input.diagnosisStatus === '正在評估') {
    actions.push({
      id: 'act-diagnosis',
      action_title: '致電失智關懷諮詢專線，尋求溫和帶長輩就診建議',
      reason: '失智症多項福利（長照四包錢、身心障礙生活補助、所得稅扣除額）多以專科醫師診斷書（CDR）為依據。',
      solves_what: '避免家屬與抗拒就醫的長輩正面衝突，並安排神經內科或記憶門診檢查。',
      how_to_start: '撥打 0800-474-580 或長輩所在地的失智共同照護中心，向個管師諮詢掛號與溝通訣竅。',
      official_source_agency: '中華民國失智症協會 / 衛福部失智共照中心',
      official_phone: '0800-474-580',
      official_url: 'https://www.tada2002.org.tw'
    });
  }

  // 行動：撥打 1966 申請長照專員到府評估
  if (
    categories.includes('長照申請') ||
    categories.includes('日間照顧') ||
    categories.includes('居家服務') ||
    categories.includes('喘息服務')
  ) {
    actions.push({
      id: 'act-1966',
      action_title: '撥打「1966 長照專線」預約照顧管理專員到府評估',
      reason: '依目前提供的資訊，建議優先了解長照2.0。評估核定後即可每月享有照顧服務或日照中心之政府高額補助（一般戶補助84%）。',
      solves_what: '解決白天上班無人照顧、居服員到府洗澡、以及照顧者精疲力竭需要喘息的根本問題。',
      how_to_start: `市話或手機直接撥打 1966（前5分鐘免費），向專線人員簡述長輩住在「${input.county}」與目前生活現況，登記預約專員到府。`,
      official_source_agency: '衛生福利部 長期照顧司',
      official_phone: '1966',
      official_url: 'https://1966.gov.tw'
    });
  }

  // 行動：防走失手鍊與指紋捺印
  if (
    categories.includes('走失與安全') &&
    actions.length < 3
  ) {
    actions.push({
      id: 'act-wandering',
      action_title: '至派出所偵查隊辦理「指紋捺印」並申請「愛心手鍊」',
      reason: '失智症病程中定向感易受損，建立主動協尋防線可在走失黃金時間內平安辨識返家。',
      solves_what: '避免長輩獨自外出迷路時無法表達身分。',
      how_to_start: '攜帶長輩身分證與診斷書影本，陪同長輩至分局偵查隊免費捺印指紋（約10分鐘）；並可向老盟申請愛心防走失手鍊。',
      official_source_agency: '內政部警政署 / 老人福利推動聯盟',
      official_phone: '0800-056-781',
      official_url: 'https://www.oldpeople.org.tw'
    });
  }

  // 行動：照顧者喘息與心理支持
  if (
    (categories.includes('喘息服務') || categories.includes('情緒支持')) &&
    actions.length < 3
  ) {
    actions.push({
      id: 'act-respite',
      action_title: '先給自己安排 15 分鐘留白，並請個管師啟動「喘息服務」',
      reason: '依目前情況，主要照顧者已處於高度疲憊負荷，顧好自己，長輩才能被穩穩接住。',
      solves_what: '避免家庭照顧者陷入崩潰或身心症狀。',
      how_to_start: '向已指派的長照個管師要求安排「居家喘息照服員」到府看顧數小時，或撥打 1966 加急申請。',
      official_source_agency: '各縣市政府長期照顧管理中心',
      official_phone: '1966',
      official_url: 'https://1966.gov.tw'
    });
  }

  // 確保最多 3 件
  return actions.slice(0, 3);
}

/**
 * RAG 福利檢索與比對 (Prompt 14)
 * 只能根據檢索到的可靠資料回答政策問題。
 * 遵守 Prompt 10 & 18 防幻覺規則：
 * 禁止使用「你一定符合」、「你可以領到」；嚴禁憑空發明補助名稱或聯絡電話。
 */
export function searchWelfareDatabase(
  categories: WelfareCategory[],
  input: UserNeedsInput
): WelfareResource[] {
  const matched = WELFARE_DATABASE.filter((resource) => {
    // 檢查類別匹配
    const categoryMatches =
      categories.includes(resource.category) ||
      resource.keywords.some((k) =>
        input.selectedProblems.some((p) => p.includes(k)) ||
        input.freeText.toLowerCase().includes(k.toLowerCase())
      );

    // 檢查外籍看護互斥或專屬
    if (resource.resource_id === 'MOL-FOREIGN-CAREGIVER-SIMPLIFIED') {
      return (
        input.primaryCareMethod === '外籍家庭看護' ||
        categories.includes('外籍家庭看護') ||
        input.freeText.includes('外籍') ||
        input.freeText.includes('看護')
      );
    }

    return categoryMatches;
  });

  return matched;
}

/**
 * 產生客製化現況摘要（只能摘要使用者實際提供的資訊，Prompt 10-A）
 */
export function generateSituationSummary(input: UserNeedsInput): string {
  const parts: string[] = [];

  if (input.elderAge && input.elderAge !== '不方便回答') {
    parts.push(`長輩年齡約為【${input.elderAge}】`);
  }
  if (input.county) {
    parts.push(`居住在【${input.county}】`);
  }
  if (input.relationship && input.relationship !== '其他') {
    parts.push(`由【${input.relationship}】協助看顧`);
  }
  if (input.diagnosisStatus) {
    parts.push(`就醫狀況為【${input.diagnosisStatus}】`);
  }
  if (input.primaryCareMethod) {
    parts.push(`主要生活安排為【${input.primaryCareMethod}】`);
  }
  if (input.dailyLivingStatus.length > 0) {
    parts.push(`日常自理包含【${input.dailyLivingStatus.join('、')}】之情形`);
  }
  if (input.selectedProblems.length > 0) {
    parts.push(`目前最想解決的困難包含：${input.selectedProblems.join('、')}`);
  }
  if (input.freeText.trim()) {
    // 截取前 80 字摘要，不加入主觀推測
    const cleanNote = input.freeText.trim().replace(/\s+/g, ' ');
    parts.push(`家屬具體描述：「${cleanNote.length > 90 ? cleanNote.slice(0, 90) + '...' : cleanNote}」`);
  }

  return parts.join('；');
}

/**
 * 完整 RAG 需求分析流程 (Prompt 08 ~ 10, 14 ~ 18, 27)
 */
export function analyzeUserNeeds(input: UserNeedsInput): ClassifiedNeeds {
  // 1. 敏感個資檢測 (Prompt 07)
  const detectedSensitiveInfo = detectSensitiveInfo(input.freeText);

  // 2. 緊急危險情境檢測 (Prompt 27)
  const { isEmergency, emergencyTypes } = detectEmergency(input);

  // 3. 需求類別分類 (Prompt 08)
  const categories = classifyNeeds(input);

  // 4. 必要追問生成 (Prompt 09 - 最多3題)
  const missingInfoQuestions = generateFollowUpQuestions(input, categories);

  // 5. 檢索可靠福利資料庫 (Prompt 11 & 14)
  const recommendedResources = searchWelfareDatabase(categories, input);

  // 6. 提煉最急迫先做的 3 件事 (Prompt 15)
  const priorityActions = generatePriorityActions(input, categories, isEmergency);

  // 7. 客觀情況摘要 (Prompt 10-A)
  const situationSummary = generateSituationSummary(input);

  return {
    categories,
    isEmergency,
    emergencyTypes,
    detectedSensitiveInfo,
    priorityActions,
    recommendedResources,
    situationSummary,
    missingInfoQuestions
  };
}
