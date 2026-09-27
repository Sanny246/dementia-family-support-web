import React from 'react';
import { PageId } from '../types';
import { WarmIllustration } from '../components/WarmIllustration';
import { QUICK_QUESTIONS } from '../data/resourcesData';
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  Compass,
  PhoneCall,
  Sparkles,
  Users,
  Search,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-16 overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-b from-[#F7EBDD]/60 via-[#F3E3CF]/30 to-transparent -z-10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Quiet reassurance kicker */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE4D3] text-[#78614E] text-sm sm:text-base font-medium">
                <Heart className="w-4 h-4 text-[#D96B43] fill-[#D96B43]/20" />
                <span>本站免費、不募款、非政府機關</span>
              </div>

              {/* Exact User Requested Main Headline (PROMPT 02) */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-[#2D2A26] font-serif tracking-tight leading-[1.25]">
                當家人開始忘記，
                <span className="block text-[#C46D52] mt-1 sm:mt-2">
                  我們陪你一起找下一步。
                </span>
              </h1>

              {/* Exact User Requested Description (PROMPT 02) */}
              <p className="text-lg sm:text-xl text-[#524538] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                你不需要一次搞懂所有制度，只要告訴我們現在遇到什麼，我們會陪你一步一步整理可能有幫助的政府福利、照護資源與下一步。
              </p>

              {/* Primary & Secondary CTAs (PROMPT 02) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Main CTA */}
                <button
                  onClick={() => onNavigate('need-help')}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D96B43] hover:bg-[#C2562E] active:scale-[0.99] text-white text-lg sm:text-xl font-bold rounded-2xl shadow-md shadow-[#D96B43]/20 transition-all duration-200 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D96B43]"
                >
                  <span>我需要幫助</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={() => onNavigate('community')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#FAF7F2] hover:bg-white text-[#4A3F33] text-lg sm:text-xl font-medium rounded-2xl border-2 border-[#D8C7B0] hover:border-[#C46D52]/60 shadow-xs transition-all duration-200"
                >
                  <Users className="w-5 h-5 text-[#8C7A6B]" />
                  <span>看看其他家庭的經驗</span>
                </button>
              </div>

              {/* 3 Empathetic Caregiver Touchpoints */}
              <div className="pt-6 sm:pt-8 border-t border-[#E8DEC8] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#EADDCB] flex items-center justify-center text-[#78614E] shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-[#2D2A26]">有人理解我</h2>
                    <p className="text-xs sm:text-sm text-[#6E5E4E] leading-normal">
                      你的慌亂與疲倦，我們都懂
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#EADDCB] flex items-center justify-center text-[#78614E] shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-[#2D2A26]">不用一次搞懂</h2>
                    <p className="text-xs sm:text-sm text-[#6E5E4E] leading-normal">
                      政策很繁複，拆成日常小步做
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#EADDCB] flex items-center justify-center text-[#78614E] shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-semibold text-[#2D2A26]">陪你找下一步</h2>
                    <p className="text-xs sm:text-sm text-[#6E5E4E] leading-normal">
                      不賣商品、只給官方透明路徑
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Illustration Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <WarmIllustration className="w-full max-w-md lg:max-w-none drop-shadow-md rounded-3xl" />
              <p className="text-xs sm:text-sm text-[#847463] text-center mt-3 flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D96B43]" />
                「步調慢一點沒關係，只要我們一步一步走。」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMPT 02: 首頁加入三個步驟 ① 說說你現在遇到什麼 ② 找到可能有幫助的資源 ③ 看懂下一步可以怎麼做 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF5EC] border-2 border-[#E1D1BC] rounded-3xl p-8 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#A05C3B] uppercase">
              三步驟導航
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2D2A26] mt-1">
              簡單三步驟，找到適合你家的支援
            </h2>
            <p className="text-base text-[#6E5E4E] mt-2">
              不用填寫任何身分證或敏感個資，用最自然的話語，我們會陪伴你整理。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#DFD1BD] space-y-3 relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E87A50]/15 flex items-center justify-center text-[#D96B43] font-bold text-xl font-serif mb-2">
                  ①
                </div>
                <h3 className="text-lg font-bold text-[#2D2A26]">說說你現在遇到什麼</h3>
                <p className="text-sm text-[#5C4F42] leading-relaxed mt-2">
                  長輩是容易走失、白天沒人看顧，還是剛拿到診斷不知所措？像跟老朋友聊天一樣寫下來。
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2ECE1] text-xs font-semibold text-[#A05C3B]">
                免身分證 · 免個資負擔
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#DFD1BD] space-y-3 relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#3E5C56]/15 flex items-center justify-center text-[#3E5C56] font-bold text-xl font-serif mb-2">
                  ②
                </div>
                <h3 className="text-lg font-bold text-[#2D2A26]">找到可能有幫助的資源</h3>
                <p className="text-sm text-[#5C4F42] leading-relaxed mt-2">
                  系統根據情況自動篩選長照2.0四包錢、失智共照、日間照顧、防走失或津貼補助。
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2ECE1] text-xs font-semibold text-[#3E5C56]">
                政府公開資訊 · 資料可追溯
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#DFD1BD] space-y-3 relative flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#B96A39]/15 flex items-center justify-center text-[#B96A39] font-bold text-xl font-serif mb-2">
                  ③
                </div>
                <h3 className="text-lg font-bold text-[#2D2A26]">看懂下一步可以怎麼做</h3>
                <p className="text-sm text-[#5C4F42] leading-relaxed mt-2">
                  產出最多 3 個優先行動清單、該打哪支官方專線、帶什麼證件，以及照顧者實戰提醒。
                </p>
              </div>
              <div className="pt-3 border-t border-[#F2ECE1] text-xs font-semibold text-[#B96A39]">
                步驟拆解 · 照順序一件件來
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('need-help')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D96B43] hover:bg-[#C2562E] text-white font-bold text-base rounded-xl shadow-xs transition-colors"
            >
              <Compass className="w-5 h-5" />
              <span>立即開始整理我的家庭情況</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Situation Triage (剛遇到家人有狀況？常見困擾速查) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#A05C3B] uppercase">
            家庭日常常見疑難
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2D2A26] mt-1">
            你現在是不是也遇到了這些狀況？
          </h2>
          <p className="text-base text-[#6E5E4E] mt-2">
            點選符合你目前情況的問題，我們為你梳理出最省時的下一步。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {QUICK_QUESTIONS.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF7F2] p-6 sm:p-7 rounded-2xl border border-[#E4D7C3] hover:border-[#D96B43]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8C7A6B]">
                  <span className="font-medium text-[#A05C3B]">{item.tag}</span>
                  <span className="text-[#A39281]">常見困擾</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2D2A26] leading-snug">
                  {item.question}
                </h3>
                <p className="text-sm sm:text-base text-[#524538] leading-relaxed">
                  {item.answer}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#EAE0D1] flex items-center justify-between">
                <button
                  onClick={() => onNavigate('need-help')}
                  className="text-sm sm:text-base font-semibold text-[#C46D52] hover:text-[#9E4A31] inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>立即協助我整理補助步驟</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Welfare Pillars Overview (長照2.0四包錢與官方資源重點) */}
      <section className="bg-[#F2ECE1] py-14 sm:py-20 border-y border-[#DFD3C0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#A05C3B] uppercase">
                政府福利地圖
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2D2A26] mt-1">
                認識「長照2.0」與失智家庭專屬支援
              </h2>
              <p className="text-base text-[#6E5E4E] mt-1 max-w-xl">
                許多失智家庭不知道：只要滿50歲並有診斷證明，就能享有政府長照補助。
              </p>
            </div>
            <button
              onClick={() => onNavigate('resources')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAF7F2] hover:bg-white text-[#4A3F33] font-medium text-sm rounded-xl border border-[#D5C6B1] transition-colors shrink-0"
            >
              <span>查看全部福利詳細資料庫</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Box 1 */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#DDD0BD] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E87A50]/15 flex items-center justify-center text-[#D96B43] mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#2D2A26]">第 1 包錢：照顧及專業服務</h3>
                <p className="text-sm text-[#5C4F42] mt-2 leading-relaxed">
                  居服員到府洗澡、餵食、備餐，或白天至日間照顧中心活動。一般戶補助達84%。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFE5D6] text-xs text-[#847463]">
                每月最高補助約 36,180 元額度
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#DDD0BD] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#52796F]/15 flex items-center justify-center text-[#3E5C56] mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#2D2A26]">第 2 包錢：交通接送服務</h3>
                <p className="text-sm text-[#5C4F42] mt-2 leading-relaxed">
                  專車接送長輩往返醫院就醫、復健或至日照中心，減輕家人輪椅上下車與推行負擔。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFE5D6] text-xs text-[#847463]">
                依各縣市就醫距離定額補助
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#DDD0BD] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#E59866]/15 flex items-center justify-center text-[#B96A39] mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#2D2A26]">第 3 包錢：輔具與無障礙改裝</h3>
                <p className="text-sm text-[#5C4F42] mt-2 leading-relaxed">
                  補助浴室防跌扶手、斜坡板、防褥瘡氣墊床、輪椅及GPS個人衛星定位手錶。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFE5D6] text-xs text-[#847463]">
                每 3 年最高補助 40,000 元
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#DDD0BD] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#84A98C]/20 flex items-center justify-center text-[#4B7354] mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#2D2A26]">第 4 包錢：喘息服務</h3>
                <p className="text-sm text-[#5C4F42] mt-2 leading-relaxed">
                  照服員到府看顧或安排長輩至機構短期住宿，讓照顧者出差、就醫或好好補眠休息。
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#EFE5D6] text-xs text-[#847463]">
                每年最高補助 48,510 元
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Emergency Contact Card (1966 專線直通) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF5EE] to-[#F1E5D5] border-2 border-[#E1D1BD] rounded-3xl p-6 sm:p-10 shadow-sm text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#D96B43] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
            <PhoneCall className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#2D2A26]">
            現在就不知道怎麼辦？直接打「1966」
          </h2>
          <p className="text-base sm:text-lg text-[#524538] mt-3 max-w-xl mx-auto leading-relaxed">
            這是台灣政府長照專線，只要拿起電話撥打 1966，說明家中長輩目前的狀況，縣市照顧管理專員就會為你安排下一步到府評估。前 5 分鐘通話免費。
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:1966"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D96B43] hover:bg-[#C2562E] text-white font-bold text-lg rounded-xl shadow-xs transition-colors"
            >
              <PhoneCall className="w-5 h-5" />
              <span>手機點此立即撥打 1966</span>
            </a>
            <button
              onClick={() => onNavigate('need-help')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#FAF7F2] hover:bg-white text-[#4A3F33] font-semibold text-lg rounded-xl border border-[#D5C6B1] transition-colors"
            >
              <span>先在網站上整理我的需求</span>
            </button>
          </div>

          <p className="text-xs text-[#8C7A6B] mt-4">
            服務時間：週一至週五 08:30~12:00、13:30~17:30 · 若是非上班時間，也可透過本站導航先整理文件
          </p>
        </div>
      </section>

      {/* Clear Disclaimer Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-[#FAF7F2] border border-[#DDD0BD] rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="w-12 h-12 rounded-xl bg-[#F0E6D7] flex items-center justify-center text-[#78614E] shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#A05C3B]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#2D2A26]">
              【本站重要聲明與原則】
            </h3>
            <p className="text-sm text-[#5E5144] leading-relaxed">
              本站不是政府機關，不是醫療機構，亦不提供任何醫療診斷或處方。本站完全不收費，且不接受任何形式的捐款。各項長照補助金額與資格規範由AI與站長協助整理，使用者仍應以各縣市主管機關最新公告為準。
            </p>
          </div>
          <button
            onClick={() => onNavigate('disclaimer')}
            className="text-xs sm:text-sm font-semibold text-[#C46D52] hover:underline shrink-0 whitespace-nowrap"
          >
            閱讀完整免責聲明 →
          </button>
        </div>
      </section>
    </div>
  );
};
