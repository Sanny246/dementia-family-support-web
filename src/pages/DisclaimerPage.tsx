import React from 'react';
import { PageId } from '../types';
import { OFFICIAL_SOURCES_REGISTRY, UPDATE_MECHANISM_NOTICE } from '../data/officialSourcesRegistry';
import {
  ShieldAlert,
  ExternalLink,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Scale,
  Database,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface DisclaimerPageProps {
  onNavigate: (page: PageId) => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#A05C3B] uppercase">
          資訊來源 · 嚴正宣告 · 規範標準
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#2D2A26]">
          官方資訊來源、更新機制與免責聲明
        </h1>
        <p className="text-base sm:text-lg text-[#5A4E42] max-w-2xl mx-auto leading-relaxed">
          為保障每一位使用者的權益，本站將所有官方資訊來源清單、更新機制與防幻覺標準透明公開。
        </p>
      </div>

      {/* PROMPT 12: 官方來源清單 (Official Source Registry) */}
      <section className="bg-[#FAF7F2] border border-[#DDD0BD] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Database className="w-6 h-6 text-[#C46D52]" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2D2A26]">
              官方資訊來源註冊表 (Official Source Registry)
            </h2>
            <p className="text-xs text-[#7A6B5C]">
              本站優先參考中央與地方政府 .gov.tw 網站，絕對不建立虛偽假造之官方 API Endpoint。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {OFFICIAL_SOURCES_REGISTRY.map((src) => (
            <div
              key={src.source_id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E5DAC8] space-y-2 text-xs sm:text-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE1] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#A05C3B] bg-[#EFE5D5] px-2 py-0.5 rounded-sm">
                    {src.agency}
                  </span>
                  <strong className="text-base font-bold text-[#2D2A26]">
                    {src.website_name}
                  </strong>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#7A6B5C] bg-[#F5ECE0] px-2 py-0.5 rounded-lg">
                    {src.status}
                  </span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C46D52] hover:underline inline-flex items-center gap-0.5 font-semibold"
                  >
                    <span>官方網址</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="text-[#54473A] space-y-1">
                <div>
                  <strong className="text-[#2D2A26]">涵蓋政策範疇：</strong>
                  <span>{src.category}</span>
                </div>
                <div>
                  <strong className="text-[#2D2A26]">更新備註與來源型態：</strong>
                  <span className="text-[#7A6B5C]">{src.notes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMPT 13: 官方資訊更新機制架構 (透明標記) */}
      <section className="bg-[#FAF7F2] border border-[#DDD0BD] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <RefreshCw className="w-6 h-6 text-[#3E5C56]" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2D2A26]">
              官方資料更新與查證架構
            </h2>
            <p className="text-xs text-[#7A6B5C]">
              遵循「誠實透明」原則，絕不假裝已具備無伺服器背景定時更新。
            </p>
          </div>
        </div>

        <div className="p-4 bg-[#FFF9EE] rounded-2xl border-l-4 border-[#E5A93C] text-xs sm:text-sm text-[#66543A] space-y-2">
          <p className="font-bold text-[#8C5E13]">
            【運作狀態宣告】：{UPDATE_MECHANISM_NOTICE.status_statement}
          </p>
          <p>
            本站設有「待確認更新比對紀錄」。當政府修改補助金額、放寬免巴氏量表資格或增訂長照扣除額時，由站方人工錄入並進行新舊差異比對，經查核後始得發布，以杜絕誤導。
          </p>
        </div>
      </section>

      {/* PROMPT 17: 資訊新鮮度燈號標準 */}
      <section className="bg-[#FAF7F2] border border-[#DDD0BD] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <h2 className="text-xl font-bold font-serif text-[#2D2A26]">
          資訊新鮮度燈號標準 (Freshness Standard)
        </h2>
        <p className="text-xs sm:text-sm text-[#665849]">
          本站資料庫中每筆福利均標註確認狀態，非由 AI 主觀判定，而是依據實際查核紀錄：
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-4 bg-white rounded-2xl border border-[#C8E6C9] space-y-1">
            <span className="font-bold text-[#2E7D32] flex items-center gap-1">
              <span>🟢</span> 最近已確認
            </span>
            <p className="text-[#556B2F]">
              半年內經站方或官方主管機關檢視核實，法規條文與電話網址皆屬最新有效。
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#FFF59D] space-y-1">
            <span className="font-bold text-[#F57F17] flex items-center gap-1">
              <span>🟡</span> 一段時間未確認
            </span>
            <p className="text-[#8D6E63]">
              超過半年尚未重新手動複核，申請前建議直接致電 1966 官方專線確認最新施行細則。
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#FFCDD2] space-y-1">
            <span className="font-bold text-[#C62828] flex items-center gap-1">
              <span>🔴</span> 疑似更新／無法確認
            </span>
            <p className="text-[#B71C1C]">
              偵測到法規公告修訂或地方政府自治條例異動，正由管理團隊查核比對中。
            </p>
          </div>
        </div>
      </section>

      {/* PROMPT 18: AI 防幻覺嚴格準則 */}
      <section className="bg-[#FAF7F2] border-2 border-[#D98A6C] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#C46D52]" />
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2D2A26]">
            AI 防幻覺與事實檢核標準
          </h2>
        </div>

        <div className="space-y-2 text-xs sm:text-sm text-[#473B2F] leading-relaxed">
          <p>
            為避免人工智慧產生虛偽法規，本站制定了最高層級的<strong>防幻覺工程規範</strong>：
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#5C4F42]">
            <li>不得憑 AI 模型訓練記憶回答政策事實。</li>
            <li>涉及福利、資格、補助金額、政府服務、醫療與法律，必須先自結構化資料庫檢索可信來源。</li>
            <li>嚴格禁止憑空創造補助名稱、資格門檻、金額、電話或政府單位。</li>
            <li>若檢索資料庫無可靠依據，系統會誠實回答：「目前沒有找到足夠可靠的官方資料可以確認」，絕不自行胡亂補完。</li>
          </ul>
        </div>
      </section>

      {/* 核心免責聲明 */}
      <section className="p-6 bg-white border border-[#DDD0BD] rounded-3xl space-y-3 text-xs sm:text-sm text-[#54473A]">
        <h3 className="font-bold text-base text-[#2D2A26] flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#D96B43]" />
          核心免責聲明
        </h3>
        <p className="leading-relaxed">
          本站所呈現之所有資訊僅供家庭照護規劃與政策導航參考，不能取代各級政府主管機關（衛生福利部、各縣市長期照顧管理中心、社會局）之正式個案審定公文，亦不能取代醫師之專業臨床診斷。各項服務之自負額及申請核准與否，以主管機關之最終審核裁定為準。
        </p>
      </section>
    </div>
  );
};
