import React from 'react';
import { PageId } from '../types';
import { WarmIllustration } from '../components/WarmIllustration';
import {
  Heart,
  ShieldCheck,
  Ban,
  DollarSign,
  Building,
  Stethoscope,
  ArrowRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#A05C3B] uppercase">
          初衷與理念
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#2D2A26]">
          關於「有人陪你」
        </h1>
        <p className="text-base sm:text-lg text-[#5A4E42] max-w-2xl mx-auto leading-relaxed">
          這是一個服務台灣失智家庭照顧者的免費、非營利、非募款資訊與互助平台。
        </p>
      </div>

      {/* Origin Story (Prompt 03) */}
      <section className="bg-[#FAF7F2] border border-[#DDD0BD] rounded-3xl p-6 sm:p-10 space-y-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="space-y-4 flex-1">
            <h2 className="text-2xl font-bold font-serif text-[#2D2A26]">
              成立背景：我們也是正在面對失智的家庭
            </h2>
            <p className="text-base text-[#4F4234] leading-relaxed">
              這個平台的起點，是因為<strong>站長自己的家庭也正在面對長輩失智與照顧問題</strong>。
            </p>
            <p className="text-base text-[#4F4234] leading-relaxed">
              當家人開始出現失智或需要照護時，家屬常常不知道：
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-base text-[#7A4B29] font-medium pl-2">
              <li>有哪些政府資源？</li>
              <li>可以申請什麼？</li>
              <li>要找誰？</li>
              <li>第一步做什麼？</li>
              <li>哪些資訊適合自己的家庭？</li>
            </ul>
            <p className="text-base text-[#4F4234] leading-relaxed pt-1">
              因此建立這個平台，希望把分散在政府各個網站與公開資訊中的繁雜內容，用一般家屬比較容易理解的生活語言整理出來，讓大家在迷惘時有一個溫暖的指南針。
            </p>
          </div>

          <div className="w-full md:w-64 shrink-0">
            <WarmIllustration variant="holding-hands" className="w-full rounded-2xl shadow-xs" />
          </div>
        </div>
      </section>

      {/* Explicit Declarations (Prompt 03 清確規範) */}
      <section className="bg-[#FAF7F2] border-2 border-[#D98A6C] rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FCECE6] text-[#C46D52] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2D2A26]">
              我們的核心原則與明確聲明
            </h2>
            <p className="text-xs sm:text-sm text-[#7A6B5C]">請每一位使用者在閱讀本站前務必知悉：</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#473B2F]">
          <div className="p-4 bg-white rounded-xl border border-[#E5DAC8] flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-[#8C7A6B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2D2A26]">本站不收費</strong>
              <p className="text-xs text-[#6B5C4D] mt-0.5">全站所有資訊導航、清單整理與社群功能，永久免費供公眾使用。</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E5DAC8] flex items-start gap-3">
            <Ban className="w-5 h-5 text-[#8C7A6B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2D2A26]">本站不接受捐款</strong>
              <p className="text-xs text-[#6B5C4D] mt-0.5">為保持絕對中立與公益初心，本站謝絕一切形式之金錢捐贈與贊助。</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E5DAC8] flex items-start gap-3">
            <Ban className="w-5 h-5 text-[#8C7A6B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2D2A26]">本站不販售照護服務</strong>
              <p className="text-xs text-[#6B5C4D] mt-0.5">本站不販售任何商品、不推銷保險或保健品，亦不擔任仲介業者。</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E5DAC8] flex items-start gap-3">
            <Building className="w-5 h-5 text-[#8C7A6B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2D2A26]">本站不是政府機關</strong>
              <p className="text-xs text-[#6B5C4D] mt-0.5">本平台為民間自發維護之非營利公益導航工具，不具備官方審核公權力。</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E5DAC8] flex items-start gap-3">
            <Stethoscope className="w-5 h-5 text-[#8C7A6B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2D2A26]">本站不是醫療機構</strong>
              <p className="text-xs text-[#6B5C4D] mt-0.5">醫療處置請前往各大醫院門診，由神經內科或精神專科醫師診療。</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#E5DAC8] flex items-start gap-3">
            <Stethoscope className="w-5 h-5 text-[#8C7A6B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#2D2A26]">本站不提供疾病診斷</strong>
              <p className="text-xs text-[#6B5C4D] mt-0.5">所有功能僅針對「福利與資源導航」，絕不從事任何醫療診斷。</p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#FFF9EE] rounded-xl border-l-4 border-[#E5A93C] text-xs sm:text-sm text-[#66543A] space-y-1">
          <p className="font-bold text-[#8C5E13]">
            AI 與公開資訊使用說明：
          </p>
          <p>
            AI 僅協助整理公開資訊與需求分類。所有福利、政策、資格與申請方式仍以主管機關及官方最新公告為準。
          </p>
        </div>
      </section>

      {/* Warm Ending Statement (Prompt 03 要求字句) */}
      <div className="text-center py-6 px-4 bg-[#FAF5EC] border border-[#DDD0BD] rounded-3xl space-y-4">
        <Heart className="w-8 h-8 text-[#D96B43] mx-auto fill-[#D96B43]/20" />
        <p className="text-xl sm:text-2xl font-serif font-bold text-[#2D2A26]">
          「希望在你覺得有點無助的時候，這裡至少可以先陪你走一小段路。」
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('need-help')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D96B43] hover:bg-[#C2562E] text-white font-bold text-base rounded-xl shadow-xs transition-colors"
          >
            <span>前往福利導航（梳理下一步）</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
