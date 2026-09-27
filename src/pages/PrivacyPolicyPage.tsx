import React from 'react';
import { PageId } from '../types';
import { ShieldCheck, Lock, EyeOff, Server, Mail, ArrowRight } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageId) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#A05C3B] uppercase">
          隱私至上 · 誠信透明
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#2D2A26]">
          隱私說明與三層資料保存規範
        </h1>
        <p className="text-base sm:text-lg text-[#5A4E42] max-w-2xl mx-auto leading-relaxed">
          我們深知失智家庭面對的脆弱與隱私重要性。本站採取最嚴謹的三層資料隔離架構。
        </p>
      </div>

      {/* PROMPT 24: 資料分三層架構說明 */}
      <section className="bg-[#FAF7F2] border-2 border-[#D98A6C] rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="flex items-center gap-2.5">
          <Lock className="w-6 h-6 text-[#C46D52]" />
          <h2 className="text-2xl font-bold font-serif text-[#2D2A26]">
            三層資料隔離處理原則 (Three-Tier Privacy Architecture)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm">
          {/* Tier A */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5DAC8] space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F0EE] text-[#3E5C56] font-bold flex items-center justify-center">
              A
            </div>
            <strong className="text-base font-bold text-[#2D2A26] block">
              匿名分析資料
            </strong>
            <p className="text-[#54473A] leading-relaxed">
              僅收集去識別化的統計指標：長輩年齡區間、居住縣市、照顧關係、照顧方式、主要困難分類與點擊資源。
            </p>
            <div className="text-[11px] text-[#3E5C56] font-semibold pt-1">
              ✓ 無任何個資關聯，僅供政策趨勢洞察
            </div>
          </div>

          {/* Tier B */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5DAC8] space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FCECE6] text-[#C46D52] font-bold flex items-center justify-center">
              B
            </div>
            <strong className="text-base font-bold text-[#2D2A26] block">
              公開交流內容
            </strong>
            <p className="text-[#54473A] leading-relaxed">
              使用者主動發布的分享文章、心得與留言回覆。發文一律使用暱稱，受社群交流守則規範。
            </p>
            <div className="text-[11px] text-[#C46D52] font-semibold pt-1">
              ✓ 自動檢測並提醒移除電話與身分證
            </div>
          </div>

          {/* Tier C */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5DAC8] space-y-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF5EB] text-[#A05C3B] font-bold flex items-center justify-center">
              C
            </div>
            <strong className="text-base font-bold text-[#2D2A26] block">
              聯絡信箱（嚴格隔離）
            </strong>
            <p className="text-[#54473A] leading-relaxed">
              使用者選填之 Email 電子郵件。絕不與 Tier A 分析資料混同，亦不在公開網頁展示。
            </p>
            <div className="text-[11px] text-[#A05C3B] font-semibold pt-1">
              ✓ 僅供留言回覆通知使用，絕不外流
            </div>
          </div>
        </div>
      </section>

      {/* 隱私細項說明條文 */}
      <section className="bg-white border border-[#DDD0BD] rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-[#473B2F] leading-relaxed">
        <div className="space-y-2">
          <h3 className="font-bold text-base text-[#2D2A26]">1. 我們收集什麼？</h3>
          <p>
            我們僅在您使用互動導航時，紀錄您的選擇（如居住縣市、照護現況）；在您於交流專區留言時，紀錄您的暱稱、文字內容，以及您自由選擇是否填寫的電子信箱。
            <strong>本站絕不要求、亦嚴格禁止填寫：身分證字號、姓名、完整門牌住址、電話號碼、健保卡號或病歷號。</strong>
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-base text-[#2D2A26]">2. 為什麼收集這些資料？</h3>
          <p>
            唯一的目的是為了依據家庭現況精準篩選台灣各縣市之政府福利（如長照四包錢、日間照顧、失智據點、防走失手鍊），並在站長後台統整失智家庭常見的政策缺口與困難趨勢，回饋公益社群。
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-base text-[#2D2A26]">3. 電子信箱（Email）的嚴格限制用途</h3>
          <p>
            Email 為非必填項目。若您提供 Email，其唯一用途為：當您發布的文章獲得其他照顧者回覆時，系統發送一對一提醒通知。本站絕不將 Email 販售、出租、提供予任何第三方商業機構或商業廣告郵件群發。
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-base text-[#2D2A26]">4. 資料保存與刪除權利</h3>
          <p>
            您隨時有權要求檢視、更正或刪除您於本站所發表之文章、留言或留存之聯絡紀錄。若需刪除，可透過「聯絡我們」專區向站長團隊提出，我們將在核對身分後於 3 個工作天內手動抹除。
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-bold text-base text-[#2D2A26]">5. 如何聯絡站方？</h3>
          <p>
            若您對本隱私政策有任何疑問，或發現內容有任何資安疑慮，歡迎至「關於我們」頁面點選站長聯絡專屬表單，或於站內進行檢舉通報。
          </p>
        </div>
      </section>

      <div className="text-center pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#EAE0D0] hover:bg-[#D5C4AC] text-[#473B2F] font-bold text-sm rounded-xl transition-colors"
        >
          <span>返回首頁</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
