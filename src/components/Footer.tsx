import React from 'react';
import { PageId } from '../types';
import { ShieldCheck, Phone, ExternalLink, HeartHandshake, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenGuidelinesModal?: () => void;
  onOpenContactModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenGuidelinesModal,
  onOpenContactModal
}) => {
  return (
    <footer className="bg-[#EFE8DD] border-t border-[#DFD3C2] text-[#4A3F33] mt-20">
      {/* Warm Reassurance Banner */}
      <div className="border-b border-[#DFD3C2]/80 bg-[#E6DCCE]/60 py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#D96B43] shrink-0 border border-[#DACBB8]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-base text-[#2D2A26]">當你感到無助時，記得隨時回到這裡</p>
              <p className="text-sm text-[#736353]">照顧失智家人是一段長路，你已經做得很好了。多給自己一個擁抱。</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('need-help')}
              className="px-5 py-2.5 bg-[#D96B43] hover:bg-[#C2562E] text-white text-sm font-bold rounded-xl transition-colors shadow-xs"
            >
              我需要幫助（整理下一步）
            </button>
            <button
              onClick={() => onNavigate('community')}
              className="px-4 py-2.5 bg-[#FAF7F2] hover:bg-white text-[#4A3F33] text-sm font-medium rounded-xl border border-[#DACBB8] transition-colors"
            >
              看看其他家庭的經驗
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Platform identity & Important Statement */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl font-bold font-serif text-[#2D2A26]">有人陪你</span>
              <span className="text-xs text-[#7A6B5C] bg-[#E3D7C5] px-2 py-0.5 rounded-sm">
                失智家庭福利導航與互助平台
              </span>
            </div>
            <p className="text-sm text-[#665849] leading-relaxed max-w-md">
              這是一個台灣非營利、非募款性質的失智家庭資訊與互助平台。起點來自站長家庭親身經歷，希望用溫暖、沒有壓力的步調，陪每一位照顧者理清資源、找到下一步。
            </p>

            {/* Prompt 04 & 24 Clear Statement */}
            <div className="p-3.5 bg-[#FAF7F2] border border-[#DDD0BC] rounded-xl text-xs text-[#6B5A4A] space-y-1.5">
              <div className="font-semibold text-[#8C3B18] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D96B43]" />
                本站核心原則與免責宣告
              </div>
              <p className="text-[#5A4E42] leading-relaxed font-medium">
                本站為免費非營利資訊平台，不代表任何政府機關。本站不收費、不接受捐款、非醫療機構且不提供疾病診斷。政策資訊以政府官方最新公告為準。
              </p>
            </div>
          </div>

          {/* Col 2: Navigation & Policies */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#3D3328] mb-3">網站導覽與規範</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#C2562E] transition-colors"
                >
                  首頁
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('need-help')}
                  className="hover:text-[#C2562E] font-semibold text-[#C46D52] transition-colors"
                >
                  我需要幫助（互動導航）
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-[#C2562E] transition-colors"
                >
                  福利與資源資料庫
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('community')}
                  className="hover:text-[#C2562E] transition-colors"
                >
                  交流專區
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#C2562E] transition-colors"
                >
                  關於我們
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-[#C2562E] transition-colors"
                >
                  隱私說明與資料保存
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('disclaimer')}
                  className="hover:text-[#C2562E] transition-colors"
                >
                  資訊來源與使用規範
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Hotlines & Support */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#3D3328] mb-3">台灣官方諮詢專線</h2>
            <div className="space-y-3 text-sm">
              <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#DDD0BC]">
                <p className="text-xs text-[#7A6B5C] font-medium">長照2.0申請專線</p>
                <a
                  href="tel:1966"
                  className="text-base font-bold text-[#D96B43] flex items-center gap-1.5 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  1966
                </a>
                <p className="text-[11px] text-[#8C7A6B] mt-0.5">前5分鐘免費（週一至週五上班時間）</p>
              </div>

              <div className="bg-[#FAF7F2] p-3 rounded-lg border border-[#DDD0BC]">
                <p className="text-xs text-[#7A6B5C] font-medium">失智症關懷諮詢專線</p>
                <a
                  href="tel:0800474580"
                  className="text-base font-bold text-[#3E5C56] flex items-center gap-1.5 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  0800-474-580
                </a>
                <p className="text-[11px] text-[#8C7A6B] mt-0.5">中華民國失智症協會</p>
              </div>

              <a
                href="https://1966.gov.tw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#7A6B5C] hover:text-[#2D2A26] flex items-center gap-1 mt-1 transition-colors"
              >
                <span>衛福部長照專區官方網站</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution & Admin Entry */}
        <div className="mt-10 pt-6 border-t border-[#DFD3C2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6B5C] gap-3">
          <p>© {new Date().getFullYear()} 有人陪你（台灣失智家庭福利導航與互助平台）保留所有權利。</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:underline text-[#665849]"
            >
              隱私說明
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('disclaimer')}
              className="hover:underline text-[#665849]"
            >
              使用規範
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('about')}
              className="hover:underline text-[#665849]"
            >
              聯絡我們
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:underline text-[#94785E] inline-flex items-center gap-1"
              title="站長管理後台（需驗證PIN碼）"
            >
              <Lock className="w-3 h-3" />
              <span>後台管理</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
