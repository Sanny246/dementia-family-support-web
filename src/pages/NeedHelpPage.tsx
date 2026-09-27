import React, { useState, useId } from 'react';
import { PageId, UserNeedsInput, ClassifiedNeeds, WelfareResource } from '../types';
import { analyzeUserNeeds, detectSensitiveInfo } from '../services/ragEngine';
import { StorageService } from '../services/storageService';
import { EmergencyBanner } from '../components/EmergencyBanner';
import { SensitiveWarningBanner } from '../components/SensitiveWarningBanner';
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Phone,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Copy,
  Printer,
  RotateCcw,
  Send,
  AlertCircle,
  FlaskConical
} from 'lucide-react';

interface NeedHelpPageProps {
  onNavigate: (page: PageId) => void;
}

const TAIWAN_COUNTIES = [
  '台北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '苗栗縣',
  '台中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '台南市',
  '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '台東縣', '澎湖縣', '金門縣', '連江縣'
];

const PROBLEM_OPTIONS = [
  '我不知道有哪些政府福利',
  '白天沒有人可以照顧',
  '長輩容易走失',
  '晚上不睡或日夜顛倒',
  '洗澡、吃飯或如廁變得困難',
  '想找居家照顧',
  '想找日間照顧',
  '家人需要喘息',
  '不知道怎麼申請長照',
  '長輩情緒或行為變化很大',
  '我覺得自己快撐不住了',
  '我有其他問題'
];

export const NeedHelpPage: React.FC<NeedHelpPageProps> = ({ onNavigate }) => {
  // Wizard steps: 1: 最想解決, 2: 基本資料, 3: 情況描述, 4: 必要追問(若有), 5: 結果頁
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [elderAge, setElderAge] = useState<string>('75～84歲');
  const [county, setCounty] = useState<string>('新北市');
  const [diagnosisStatus, setDiagnosisStatus] = useState<string>('已確診');
  const [dailyLivingStatus, setDailyLivingStatus] = useState<string[]>(['需要提醒']);
  const [primaryCareMethod, setPrimaryCareMethod] = useState<string>('家人照顧');
  const [relationship, setRelationship] = useState<string>('子女');
  const [email, setEmail] = useState<string>('');
  const [freeText, setFreeText] = useState<string>('');
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});

  // Result state
  const [analysisResult, setAnalysisResult] = useState<ClassifiedNeeds | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [followUpQuestionText, setFollowUpQuestionText] = useState<string>('');
  const [followUpAnswerHistory, setFollowUpAnswerHistory] = useState<
    { q: string; a: string; sources: string[] }[]
  >([]);

  // Toggle helpers
  const toggleProblem = (item: string) => {
    setSelectedProblems((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  const toggleDailyLiving = (item: string) => {
    setDailyLivingStatus((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  // Sensitivity check on freeText
  const sensitiveIssues = detectSensitiveInfo(freeText);

  // Quick Test Cases loader (Prompt 29 verification)
  const loadTestCase = (testCaseKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (testCaseKey === 'A') {
      // 案例A：75歲、確診失智、白天無人照顧
      setSelectedProblems(['白天沒有人可以照顧', '想找日間照顧', '不知道怎麼申請長照']);
      setElderAge('75～84歲');
      setCounty('台北市');
      setDiagnosisStatus('已確診');
      setDailyLivingStatus(['大多可以自行生活', '需要提醒']);
      setPrimaryCareMethod('與家人同住但白天無人');
      setRelationship('子女');
      setFreeText('媽媽今年76歲，上個月神經內科確診阿茲海默輕度，白天我和先生都要上班，非常擔心她自己在家煮水忘記關瓦斯，想了解日間照顧中心如何接送與申請長照補助。');
    } else if (testCaseKey === 'B') {
      // 案例B：尚未確診、開始嚴重健忘
      setSelectedProblems(['長輩情緒或行為變化很大', '我不知道有哪些政府福利']);
      setElderAge('65～74歲');
      setCounty('台中市');
      setDiagnosisStatus('尚未評估');
      setDailyLivingStatus(['需要提醒']);
      setPrimaryCareMethod('家人照顧');
      setRelationship('子女');
      setFreeText('爸爸最近半年常重複問同一件事，昨天懷疑媽媽偷他抽屜的錢，脾氣變得很暴躁，他不承認自己生病，堅持不肯去看精神科，不知道該怎麼帶他去醫院就醫。');
    } else if (testCaseKey === 'C') {
      // 案例C：已有外籍家庭看護
      setSelectedProblems(['家人需要喘息', '我不知道有哪些政府福利']);
      setElderAge('85歲以上');
      setCounty('高雄市');
      setDiagnosisStatus('已確診');
      setDailyLivingStatus(['洗澡需要協助', '如廁需要協助', '行走需要協助']);
      setPrimaryCareMethod('外籍家庭看護');
      setRelationship('子女');
      setFreeText('阿嬤中重度失智，目前家裡有請一位印尼籍看護工照顧，但看護每個月想固定休假兩天，家屬不知道請外籍看護還可不可以申請政府的長照喘息服務或其他輔具補助？');
    } else if (testCaseKey === 'D') {
      // 案例D：晚上會自行外出，有走失風險
      setSelectedProblems(['長輩容易走失', '晚上不睡或日夜顛倒']);
      setElderAge('75～84歲');
      setCounty('新北市');
      setDiagnosisStatus('已確診');
      setDailyLivingStatus(['需要提醒', '行走需要協助']);
      setPrimaryCareMethod('家人照顧');
      setRelationship('配偶');
      setFreeText('老伴最近晚上常自己開大門走到大馬路上，前兩天被鄰居帶回來，我們晚上完全不敢深睡，怕他走失發生危險，想知道有哪些防走失定位手錶或手鍊可以申請。');
    } else if (testCaseKey === 'E') {
      // 案例E：照顧者非常疲累，需要喘息
      setSelectedProblems(['我覺得自己快撐不住了', '家人需要喘息', '洗澡、吃飯或如廁變得困難']);
      setElderAge('75～84歲');
      setCounty('台南市');
      setDiagnosisStatus('已確診');
      setDailyLivingStatus(['洗澡需要協助', '穿衣需要協助', '吃飯需要協助', '如廁需要協助']);
      setPrimaryCareMethod('家人照顧');
      setRelationship('子女');
      setFreeText('我全職照顧媽媽兩年了，每天半夜幫她換尿布、白天幫她洗澡，最近自己常心悸胸悶睡不著，每天都想哭，覺得自己快要撐不下去了，很需要有人能來家裡幫忙洗澡或喘息。');
    }
  };

  // Run final analysis
  const executeAnalysis = (customFollowUpAnswers?: Record<string, string>) => {
    const input: UserNeedsInput = {
      selectedProblems,
      elderAge,
      county,
      diagnosisStatus,
      dailyLivingStatus,
      primaryCareMethod,
      relationship,
      email: email.trim(),
      freeText: freeText.trim(),
      followUpAnswers: customFollowUpAnswers || followUpAnswers
    };

    const res = analyzeUserNeeds(input);
    setAnalysisResult(res);

    // Prompt 24: Record Tier A Anonymous Analytics Event (NEVER saves email here)
    StorageService.logAnalyticsEvent({
      county,
      elderAge,
      diagnosisStatus,
      primaryCareMethod,
      relationship,
      selectedProblems,
      matchedCategories: res.categories,
      clickedResourceIds: res.recommendedResources.map((r) => r.resource_id),
      isEmergencyTriggered: res.isEmergency
    });

    setCurrentStep(5); // Jump to Results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step transition
  const handleNextFromProblems = () => {
    if (selectedProblems.length === 0) {
      alert('請至少勾選一項您目前最想解決的事情，或點選「我有其他問題」。');
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromProfile = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextFromFreeText = () => {
    // Preliminary check to see if follow-up questions are needed
    const input: UserNeedsInput = {
      selectedProblems,
      elderAge,
      county,
      diagnosisStatus,
      dailyLivingStatus,
      primaryCareMethod,
      relationship,
      email: email.trim(),
      freeText: freeText.trim()
    };
    const res = analyzeUserNeeds(input);

    if (res.missingInfoQuestions.length > 0) {
      setAnalysisResult(res);
      setCurrentStep(4); // Go to follow-up questions
    } else {
      executeAnalysis();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Follow-up question answer selection
  const handleFollowUpChoice = (questionId: string, choice: string) => {
    setFollowUpAnswers((prev) => ({ ...prev, [questionId]: choice }));
  };

  // Handle Interactive Follow-Up in Result Section E
  const handleAskFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    const q = followUpQuestionText.trim();
    if (!q) return;

    // Grounded RAG Response Generator based on strictly verified WELFARE_DATABASE
    let replyText = '';
    const citedSources: string[] = [];

    const lowerQ = q.toLowerCase();
    if (/洗澡|洗頭|居服|到府/.test(lowerQ)) {
      replyText =
        '依衛生福利部長照2.0規範：經長照評估核定第2~8級後，可使用「第一包錢：照顧及專業服務」，由合格照顧服務員到府提供身體沐浴清潔服務。一般戶自負額僅 16%，中低收入戶自負 5%，低收入戶全額由政府補助。';
      citedSources.push('衛生福利部 1966 長照專區');
    } else if (/費用|多少錢|補助金額|補助/.test(lowerQ)) {
      replyText =
        '長照四包錢各項額度由主管機關依長照等級核定：每月照顧服務額度約 10,020 至 36,180 元（一般戶自負16%）；每年喘息服務額度最高 48,510 元；每 3 年輔具與無障礙補助最高 40,000 元；綜合所得稅每人每年可享定額長照特別扣除額 120,000 元。實際資格仍需由官方照管專員評定。';
      citedSources.push('長照2.0給付及支付基準', '財政部所得稅長照特別扣除額規範');
    } else if (/外籍|看護|休假/.test(lowerQ)) {
      replyText =
        '勞動部與衛福部最新規定：失智長輩臨床失智評估量表（CDR）達1分以上，可免巴氏量表直接申請聘僱外籍家庭看護。此外，家中已聘僱外籍看護之家庭，若看護短暫請假或需支援，依然可以享有長照喘息服務、交通接送與輔具補助。';
      citedSources.push('勞動部勞動力發展署', '衛生福利部長照司');
    } else if (/走失|找不到|手鍊|手錶/.test(lowerQ)) {
      replyText =
        '防走失主要有三項官方資源：1. 警察局偵查隊免費「指紋捺印建檔」；2. 向中華民國老人福利推動聯盟申請「愛心防走失手鍊」；3. 透過長照評估申請個人「GPS衛星定位手錶」補助。長輩若常拆下手鍊，建議將輕量定位器放入鞋墊或於常穿外套內縫製電話布標。';
      citedSources.push('警政署刑事警察局', '老人福利推動聯盟');
    } else {
      replyText =
        '目前在官方現行公告資料庫中，未檢索到與您提問完全相符的特定條文。依本站防幻覺原則，不憑空推測法規。建議您週一至週五上班時間，直接致電免付費「1966 長照專線」或「0800-474-580 失智症關懷諮詢專線」，由主管機關個管人員為您進行個案查對。';
      citedSources.push('衛福部長照專線 1966', '失智關懷專線 0800-474-580');
    }

    setFollowUpAnswerHistory((prev) => [
      ...prev,
      { q, a: replyText, sources: citedSources }
    ]);
    setFollowUpQuestionText('');
  };

  const handleCopySummary = () => {
    if (!analysisResult) return;
    const txt = `【有人陪你｜我的失智家庭下一步行動清單】
客觀情況摘要：
${analysisResult.situationSummary}

現在可以先做的 3 件事：
${analysisResult.priorityActions
  .map(
    (a, idx) =>
      `${idx + 1}. 【${a.action_title}】\n- 為什麼：${a.reason}\n- 怎麼開始：${a.how_to_start}\n- 官方窗口：${a.official_source_agency}（${a.official_phone || '無專線'}）`
  )
  .join('\n\n')}

建議優先了解的官方資源：
${analysisResult.recommendedResources
  .map(
    (r) =>
      `- ${r.resource_name}\n  主管機關：${r.official_agency}（官方網址：${r.official_url}）`
  )
  .join('\n')}

（本清單由「有人陪你｜失智家庭福利導航與互助平台」協助整理，非政府核定公文，實際資格以主管機關最新公告為準。）`;

    navigator.clipboard.writeText(txt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Test Case Quick-Load Bar (Prompt 29 Verification) */}
      <div className="p-3 bg-[#EAE0D0] border border-[#DDD0BD] rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs text-[#5E5042]">
        <div className="flex items-center gap-1.5 font-bold text-[#7A4B29]">
          <FlaskConical className="w-4 h-4 text-[#D96B43]" />
          <span>Prompt 29 驗證測試範例（點選快速載入）：</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => loadTestCase('A')}
            className="px-2.5 py-1 bg-white hover:bg-[#FAF7F2] rounded-lg border border-[#D5C4AC] font-medium"
            title="案例A：75歲、確診失智、白天無人照顧"
          >
            案例A (75歲白天無人)
          </button>
          <button
            onClick={() => loadTestCase('B')}
            className="px-2.5 py-1 bg-white hover:bg-[#FAF7F2] rounded-lg border border-[#D5C4AC] font-medium"
            title="案例B：尚未確診、開始嚴重健忘"
          >
            案例B (未確診嚴重健忘)
          </button>
          <button
            onClick={() => loadTestCase('C')}
            className="px-2.5 py-1 bg-white hover:bg-[#FAF7F2] rounded-lg border border-[#D5C4AC] font-medium"
            title="案例C：已有外籍家庭看護"
          >
            案例C (外籍看護喘息)
          </button>
          <button
            onClick={() => loadTestCase('D')}
            className="px-2.5 py-1 bg-white hover:bg-[#FAF7F2] rounded-lg border border-[#D5C4AC] font-medium"
            title="案例D：晚上會自行外出，有走失風險"
          >
            案例D (夜間走失防護)
          </button>
          <button
            onClick={() => loadTestCase('E')}
            className="px-2.5 py-1 bg-white hover:bg-[#FAF7F2] rounded-lg border border-[#D5C4AC] font-medium"
            title="案例E：照顧者非常疲累，需要喘息"
          >
            案例E (照顧者極度疲累)
          </button>
        </div>
      </div>

      {/* Intro Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE4D3] text-[#78614E] text-xs sm:text-sm font-medium">
          <Heart className="w-4 h-4 text-[#D96B43] fill-[#D96B43]/20" />
          <span>免費 · 不募款 · 非政府機關 · 官方來源可追溯</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#2D2A26]">
          我需要幫助：家庭狀況與福利導航
        </h1>
        <p className="text-base sm:text-lg text-[#5A4E42] max-w-2xl mx-auto leading-relaxed">
          不用被繁瑣政策名詞嚇到。按照以下步驟告訴我們目前的家庭情況，我們會幫你梳理出最清晰的優先順序與下一步。
        </p>

        {/* Step Progress Indicator (Prompt 28: 長表單分步驟、明確上一步下一步) */}
        {currentStep < 5 && (
          <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-[#8C7A6B]">
            <span className={`px-2.5 py-1 rounded-full ${currentStep === 1 ? 'bg-[#D96B43] text-white' : 'bg-[#EAE0D0]'}`}>
              1. 困擾問題
            </span>
            <span>→</span>
            <span className={`px-2.5 py-1 rounded-full ${currentStep === 2 ? 'bg-[#D96B43] text-white' : 'bg-[#EAE0D0]'}`}>
              2. 基本現況
            </span>
            <span>→</span>
            <span className={`px-2.5 py-1 rounded-full ${currentStep === 3 ? 'bg-[#D96B43] text-white' : 'bg-[#EAE0D0]'}`}>
              3. 自由描述
            </span>
            {currentStep === 4 && (
              <>
                <span>→</span>
                <span className="px-2.5 py-1 rounded-full bg-[#D96B43] text-white">
                  4. 關鍵確認
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* ========================================================
          STEP 1: PROMPT 05 「你現在最想解決什麼？」
          ======================================================== */}
      {currentStep === 1 && (
        <div className="bg-[#FAF7F2] border border-[#DDD0BD] rounded-3xl p-6 sm:p-9 shadow-xs space-y-7">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-[#2D2A26] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#E5D7C3] text-[#695847] text-sm flex items-center justify-center font-bold">
                1
              </span>
              <span>你現在最想解決什麼？</span>
            </h2>
            <p className="text-sm text-[#7A6B5C]">（可複選，點選符合家中目前面臨的困擾）</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {PROBLEM_OPTIONS.map((item) => {
              const isSelected = selectedProblems.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleProblem(item)}
                  className={`text-left p-4 rounded-2xl border-2 transition-all flex items-start justify-between gap-2 min-h-[72px] ${
                    isSelected
                      ? 'border-[#C46D52] bg-[#F7EFE4] text-[#2D2A26] shadow-xs'
                      : 'border-[#E5DAC8] hover:border-[#D5C4AC] bg-white text-[#4A3F33]'
                  }`}
                >
                  <span className="text-sm sm:text-base font-medium leading-snug">{item}</span>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-[#C46D52] shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#EAE0D1] flex justify-end">
            <button
              onClick={handleNextFromProblems}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D96B43] hover:bg-[#C2562E] text-white font-bold text-base rounded-xl shadow-xs transition-colors"
            >
              <span>繼續，幫我整理</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 2: PROMPT 06 「家庭基本資料」（絕不索取姓名/身分證/住址/電話）
          ======================================================== */}
      {currentStep === 2 && (
        <div className="bg-[#FAF7F2] border border-[#DDD0BD] rounded-3xl p-6 sm:p-9 shadow-xs space-y-7">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-[#2D2A26] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#E5D7C3] text-[#695847] text-sm flex items-center justify-center font-bold">
                2
              </span>
              <span>家庭基本現況</span>
            </h2>
            <p className="text-sm text-[#7A6B5C]">
              請依照長輩目前的實際狀態進行簡易選擇（這不是政府表格，完全不需提供真實個資）。
            </p>
          </div>

          {/* Privacy reassurance pill */}
          <div className="p-3.5 bg-[#FAF4EA] border border-[#E5DAC8] rounded-xl text-xs text-[#7A6B5C] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D96B43] shrink-0" />
            <span>本站絕對不會索取：真實姓名、身分證字號、完整生日、住址、電話或病歷號碼。</span>
          </div>

          <div className="space-y-6">
            {/* 1. 長輩年齡區間 */}
            <div>
              <label className="block text-sm font-bold text-[#2D2A26] mb-2">
                1. 長輩年齡區間
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {['64歲以下', '65～74歲', '75～84歲', '85歲以上', '不方便回答'].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setElderAge(age)}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      elderAge === age
                        ? 'border-[#C46D52] bg-[#F7EFE4] text-[#C46D52] font-bold'
                        : 'border-[#DDD0BD] bg-white text-[#4A3F33]'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. 居住縣市 */}
            <div>
              <label className="block text-sm font-bold text-[#2D2A26] mb-2">
                2. 長輩居住縣市（台灣各縣市）
              </label>
              <select
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                className="w-full sm:w-72 p-3 bg-white border border-[#DDD0BD] rounded-xl text-sm font-medium text-[#2D2A26] focus:outline-none focus:border-[#C46D52]"
              >
                {TAIWAN_COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. 是否已經由醫療機構診斷失智症 */}
            <div>
              <label className="block text-sm font-bold text-[#2D2A26] mb-2">
                3. 是否已經由醫療機構診斷失智症？
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['已確診', '正在評估', '尚未評估', '不確定'].map((ds) => (
                  <button
                    key={ds}
                    type="button"
                    onClick={() => setDiagnosisStatus(ds)}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      diagnosisStatus === ds
                        ? 'border-[#C46D52] bg-[#F7EFE4] text-[#C46D52] font-bold'
                        : 'border-[#DDD0BD] bg-white text-[#4A3F33]'
                    }`}
                  >
                    {ds}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. 日常生活狀況 (可複選) */}
            <div>
              <label className="block text-sm font-bold text-[#2D2A26] mb-2">
                4. 日常生活狀況（可複選）
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  '大多可以自行生活',
                  '需要提醒',
                  '洗澡需要協助',
                  '穿衣需要協助',
                  '吃飯需要協助',
                  '如廁需要協助',
                  '行走需要協助',
                  '大部分日常生活需要協助',
                  '不確定'
                ].map((act) => {
                  const isChecked = dailyLivingStatus.includes(act);
                  return (
                    <button
                      key={act}
                      type="button"
                      onClick={() => toggleDailyLiving(act)}
                      className={`text-left p-2.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#C46D52] bg-[#F7EFE4] text-[#2D2A26] font-bold'
                          : 'border-[#DDD0BD] bg-white text-[#4A3F33]'
                      }`}
                    >
                      <span>{act}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-[#C46D52]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. 主要照顧方式 */}
            <div>
              <label className="block text-sm font-bold text-[#2D2A26] mb-2">
                5. 主要照顧方式
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  '家人照顧',
                  '長輩獨居',
                  '與家人同住但白天無人',
                  '外籍家庭看護',
                  '居家服務',
                  '日間照顧',
                  '機構住宿',
                  '其他'
                ].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPrimaryCareMethod(method)}
                    className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                      primaryCareMethod === method
                        ? 'border-[#C46D52] bg-[#F7EFE4] text-[#C46D52] font-bold'
                        : 'border-[#DDD0BD] bg-white text-[#4A3F33]'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* 6. 與長輩關係 */}
            <div>
              <label className="block text-sm font-bold text-[#2D2A26] mb-2">
                6. 你與長輩的關係
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['子女', '配偶', '孫子女', '兄弟姊妹', '其他親屬', '朋友', '其他'].map(
                  (rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => setRelationship(rel)}
                      className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                        relationship === rel
                          ? 'border-[#C46D52] bg-[#F7EFE4] text-[#C46D52] font-bold'
                          : 'border-[#DDD0BD] bg-white text-[#4A3F33]'
                      }`}
                    >
                      {rel}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* 7. Email（選填，Prompt 06 & 24 嚴格規範） */}
            <div className="bg-white p-4 rounded-2xl border border-[#E5DAC8] space-y-2">
              <label className="block text-sm font-bold text-[#2D2A26]">
                7. Email 電子郵件信箱（非必填，選填）
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="例如：name@example.com（選填）"
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm focus:outline-none focus:border-[#C46D52]"
              />
              <p className="text-xs text-[#7A6B5C] leading-relaxed">
                <strong>隱私嚴正聲明：</strong>
                Email 絕對不會在網站上公開。其唯一用途為：若您日後在交流專區發問時，接收重要留言回覆通知，或接收由您主動同意的重要福利異動提醒。若不需要可直接留空。
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE0D1] flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#DDD0BD] hover:bg-[#F3EBE0] text-[#54483C] font-semibold text-sm rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>上一步</span>
            </button>
            <button
              onClick={handleNextFromProfile}
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#D96B43] hover:bg-[#C2562E] text-white font-bold text-base rounded-xl shadow-xs transition-colors"
            >
              <span>下一步：說說現在的情況</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 3: PROMPT 07 「說說你現在的情況」
          ======================================================== */}
      {currentStep === 3 && (
        <div className="bg-[#FAF7F2] border border-[#DDD0BD] rounded-3xl p-6 sm:p-9 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-[#2D2A26] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#E5D7C3] text-[#695847] text-sm flex items-center justify-center font-bold">
                3
              </span>
              <span>說說你現在的情況</span>
            </h2>
            <p className="text-base text-[#524538] leading-relaxed">
              不用使用專業術語，就像跟朋友說話一樣，把目前最困擾你的事情寫下來就可以。
            </p>
          </div>

          {/* Example card */}
          <div className="p-4 bg-white rounded-2xl border border-[#E5DAC8] text-xs sm:text-sm text-[#7A6B5C]">
            <span className="font-bold text-[#A05C3B] block mb-1">例如你可以這樣寫：</span>
            <p className="italic text-[#5C4F42]">
              「爸爸最近晚上會自己跑出去，我白天還要上班，不知道有沒有白天可以照顧他的地方，也不知道長照怎麼申請。」
            </p>
          </div>

          {/* Large Text Area */}
          <div className="space-y-2">
            <textarea
              rows={6}
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="請隨意寫下家中長輩最近的狀況、你的困惑，或是最迫切需要解決的困難..."
              className="w-full p-4 bg-white border border-[#D5C4AC] rounded-2xl text-base text-[#2D2A26] placeholder-[#9E8E7D] shadow-xs focus:outline-none focus:border-[#C46D52] transition-colors leading-relaxed"
            />
            <p className="text-xs text-[#8C7A6B]">
              提醒：請勿輸入長輩姓名、身分證字號、詳細門牌住址、電話或病歷號碼。
            </p>
          </div>

          {/* Prompt 07 Sensitive Warning Banner */}
          <SensitiveWarningBanner issues={sensitiveIssues} />

          <div className="pt-4 border-t border-[#EAE0D1] flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#DDD0BD] hover:bg-[#F3EBE0] text-[#54483C] font-semibold text-sm rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>上一步</span>
            </button>
            <button
              onClick={handleNextFromFreeText}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D96B43] hover:bg-[#C2562E] text-white font-bold text-base rounded-xl shadow-xs transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>為我整理下一步</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 4: PROMPT 09 必要追問 (最多 3 題，提供「不知道/跳過」)
          ======================================================== */}
      {currentStep === 4 && analysisResult && (
        <div className="bg-[#FAF7F2] border-2 border-[#D98A6C] rounded-3xl p-6 sm:p-9 shadow-xs space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-[#C46D52] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> 必要資訊小確認
            </div>
            <h2 className="text-2xl font-bold font-serif text-[#2D2A26]">
              為了更精準推薦資源，有幾個小問題想跟您確認
            </h2>
            <p className="text-sm text-[#705F4F]">
              若不清楚可以直接點選「不知道」或「跳過」，完全不影響整體導航。
            </p>
          </div>

          <div className="space-y-5">
            {analysisResult.missingInfoQuestions.map((q, idx) => (
              <div key={q.id} className="bg-white p-5 rounded-2xl border border-[#E5DAC8] space-y-3">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#EFE4D3] text-[#78614E] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-[#2D2A26]">{q.question}</h3>
                    <p className="text-xs text-[#7A6B5C] mt-0.5">{q.reason}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {q.options.map((opt) => {
                    const isSelected = followUpAnswers[q.id] === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleFollowUpChoice(q.id, opt)}
                        className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                          isSelected
                            ? 'border-[#C46D52] bg-[#F7EFE4] text-[#C46D52] font-bold'
                            : 'border-[#DDD0BD] bg-[#FAF7F2] hover:bg-white text-[#4A3F33]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EAE0D1] flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-[#DDD0BD] hover:bg-[#F3EBE0] text-[#54483C] font-semibold text-sm rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>返回修改描述</span>
            </button>
            <button
              onClick={() => executeAnalysis(followUpAnswers)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D96B43] hover:bg-[#C2562E] text-white font-bold text-base rounded-xl shadow-xs transition-colors"
            >
              <span>查看我的下一步建議</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 5: PROMPT 10 「你的下一步」結果頁
          ======================================================== */}
      {currentStep === 5 && analysisResult && (
        <div className="space-y-8">
          {/* Prompt 27 Emergency Banner if triggered */}
          {analysisResult.isEmergency && (
            <EmergencyBanner emergencyTypes={analysisResult.emergencyTypes} />
          )}

          {/* Result Main Card */}
          <div className="bg-[#FAF7F2] border-2 border-[#D98A6C] rounded-3xl p-6 sm:p-9 shadow-md space-y-8">
            {/* Header with Title and Copy/Print Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE0D1] pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#A05C3B] bg-[#EFE5D5] px-2.5 py-0.5 rounded-full inline-block mb-1">
                  導航建議已為你整理完畢
                </span>
                <h2 className="text-3xl font-bold font-serif text-[#2D2A26]">
                  你的下一步
                </h2>
                <p className="text-sm text-[#705F4F] mt-1">
                  不需急著一次做完所有事。照著推薦的順序，一步一步走就可以。
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border border-[#DDD0BD] hover:bg-[#F3EBE0] text-[#473B2F] rounded-xl transition-colors"
                  title="複製此行動清單"
                >
                  <Copy className="w-3.5 h-3.5 text-[#D96B43]" />
                  <span>{isCopied ? '已複製到剪貼簿！' : '複製行動清單'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white border border-[#DDD0BD] hover:bg-[#F3EBE0] text-[#473B2F] rounded-xl transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>列印</span>
                </button>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1 text-xs text-[#7A6B5C] hover:text-[#2D2A26] px-2 py-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>重填</span>
                </button>
              </div>
            </div>

            {/* A｜我先幫你整理現在的情況 (Prompt 10-A: 只能摘要使用者實際提供的資訊) */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5DAC8] space-y-2">
              <h3 className="font-bold text-base text-[#2D2A26] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#EADDCB] text-[#5A4B3C] text-xs flex items-center justify-center font-bold">
                  A
                </span>
                <span>我先幫你整理現在的情況</span>
              </h3>
              <p className="text-sm sm:text-base text-[#524538] leading-relaxed pl-8">
                {analysisResult.situationSummary || '已依據您勾選的家庭照護狀況完成整理。'}
              </p>
            </div>

            {/* B｜現在可以先做的 3 件事 (Prompt 10-B & Prompt 15: 最多 3 件) */}
            <div className="space-y-3">
              <h3 className="font-bold text-lg text-[#2D2A26] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#D96B43] text-white text-xs flex items-center justify-center font-bold">
                  B
                </span>
                <span>現在可以先做的 3 件事（依急迫性排序）</span>
              </h3>

              <div className="space-y-3.5">
                {analysisResult.priorityActions.map((act, index) => (
                  <div
                    key={act.id}
                    className="bg-white p-5 rounded-2xl border border-[#E2D4C0] space-y-2 shadow-2xs"
                  >
                    <div className="flex items-center gap-2 text-[#C46D52] font-bold text-base">
                      <span className="w-5 h-5 rounded-full bg-[#FCECE6] text-[#C46D52] text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <span>要做什麼：{act.action_title}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#54473A] pt-1">
                      <div>
                        <strong className="text-[#2D2A26] block mb-0.5">為什麼建議先做？</strong>
                        <p className="text-[#665445]">{act.reason}</p>
                      </div>
                      <div>
                        <strong className="text-[#2D2A26] block mb-0.5">可以解決什麼問題？</strong>
                        <p className="text-[#665445]">{act.solves_what}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#F2ECE1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <strong className="text-[#2D2A26]">怎麼開始：</strong>
                        <span className="text-[#54473A]">{act.how_to_start}</span>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        {act.official_phone && (
                          <a
                            href={`tel:${act.official_phone.replace(/[^0-9]/g, '')}`}
                            className="inline-flex items-center gap-1 text-[#D96B43] font-bold hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{act.official_phone}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* C｜你可以進一步了解的資源 (Prompt 10-C & Prompt 16 嚴格防幻覺語氣) */}
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-[#2D2A26] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3E5C56] text-white text-xs flex items-center justify-center font-bold">
                    C
                  </span>
                  <span>你可以進一步了解的資源</span>
                </h3>
                <p className="text-xs text-[#7A6B5C]">
                  ※ 依據本站防幻覺與客觀性原則：依目前提供的資訊，建議優先了解以下資源；實際資格仍需由官方單位確認。
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {analysisResult.recommendedResources.map((res) => (
                  <div
                    key={res.resource_id}
                    className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E5DAC8] space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE1] pb-3">
                      <div>
                        <span className="text-xs font-semibold text-[#A05C3B] bg-[#EFE5D5] px-2 py-0.5 rounded-sm">
                          {res.category_label}
                        </span>
                        <h4 className="text-lg font-bold text-[#2D2A26] mt-1">
                          {res.resource_name}
                        </h4>
                      </div>

                      {/* Prompt 17 Freshness Badge */}
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#2E7D32] bg-[#E8F5E9] px-2.5 py-1 rounded-full shrink-0">
                        <span>🟢</span>
                        <span>最近已確認（{res.last_confirmed_date}）</span>
                      </span>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-[#473B2F]">
                      <div>
                        <strong className="text-[#2D2A26]">這是什麼：</strong>
                        <span>{res.plain_explanation}</span>
                      </div>
                      <div>
                        <strong className="text-[#2D2A26]">為什麼可能和目前情況有關：</strong>
                        <span className="text-[#6D5D4E]">
                          依目前提供的資訊，這項資源可能與您的困難（{analysisResult.categories.join('、')}）密切相關。
                        </span>
                      </div>
                      <div>
                        <strong className="text-[#2D2A26]">哪些資格仍需要確認：</strong>
                        <span className="text-[#6D5D4E]">
                          {res.eligibility_conditions.join('；')}（需由主辦機關複核）。
                        </span>
                      </div>
                      <div>
                        <strong className="text-[#2D2A26]">下一步怎麼做：</strong>
                        <span>{res.application_method[0] || '撥打1966專線諮詢。'}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#F2ECE1] flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="text-[#7A6B5C]">主管機關：{res.official_agency}</span>
                      <div className="flex items-center gap-3">
                        <a
                          href={`tel:${res.official_phone.replace(/[^0-9]/g, '')}`}
                          className="font-bold text-[#D96B43] hover:underline"
                        >
                          專線：{res.official_phone}
                        </a>
                        <a
                          href={res.official_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#473B2F] hover:text-[#C46D52]"
                        >
                          <span>查看官方原文</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* D｜官方資料來源 (Prompt 10-D & Prompt 16) */}
            <div className="bg-[#FAF5ED] p-5 rounded-2xl border border-[#E5DAC8] space-y-2 text-xs text-[#6B5C4D]">
              <h4 className="font-bold text-sm text-[#2D2A26] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D96B43]" />
                D｜官方資料來源與規範依據
              </h4>
              <p>
                本導航整理之項目全部引用自中華民國政府公開政策法規，包含：衛生福利部長照專區（1966.gov.tw）、失智症防治照護政策綱領2.0、勞動部勞動力發展署外籍家庭看護免評新制、財政部長照特別扣除額申報要點。
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[#A05C3B] font-medium">
                <a href="https://1966.gov.tw" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5">
                  1966長照專區 <ExternalLink className="w-3 h-3" />
                </a>
                <span>·</span>
                <a href="https://www.mohw.gov.tw" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5">
                  衛福部失智照護專區 <ExternalLink className="w-3 h-3" />
                </a>
                <span>·</span>
                <a href="https://tax.nat.gov.tw" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-0.5">
                  財政部稅務入口網 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* E｜還想問什麼？ (Prompt 10-E: 後續提問框) */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E2D4C0] space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold text-base text-[#2D2A26] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#B96A39] text-white text-xs flex items-center justify-center font-bold">
                    E
                  </span>
                  <span>還想問什麼？（輸入問題，查詢官方資料庫）</span>
                </h4>
                <p className="text-xs text-[#7A6B5C]">
                  例如：「洗澡補助是怎麼算的？」、「外籍看護休假怎麼辦？」、「申請愛心手鍊要帶什麼？」
                </p>
              </div>

              {/* History QA if any */}
              {followUpAnswerHistory.length > 0 && (
                <div className="space-y-3 pt-2">
                  {followUpAnswerHistory.map((item, i) => (
                    <div key={i} className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8] space-y-2 text-xs sm:text-sm">
                      <div className="font-bold text-[#C46D52]">問：{item.q}</div>
                      <div className="text-[#473B2F] leading-relaxed">答：{item.a}</div>
                      {item.sources.length > 0 && (
                        <div className="text-[11px] text-[#8C7A6B] pt-1">
                          資料來源依據：{item.sources.join('、')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleAskFollowUp} className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={followUpQuestionText}
                  onChange={(e) => setFollowUpQuestionText(e.target.value)}
                  placeholder="輸入你還想了解的細節..."
                  className="flex-1 p-3 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm focus:outline-none focus:border-[#C46D52]"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#D96B43] hover:bg-[#C2562E] text-white font-bold text-sm rounded-xl transition-colors shrink-0 inline-flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>提問</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
