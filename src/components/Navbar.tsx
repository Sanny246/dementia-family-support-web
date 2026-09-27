import React, { useState } from 'react';
import { PageId, FontSizeLevel } from '../types';
import { HeartHandshake, PhoneCall, Menu, X, Heart, Shield } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  fontLevel: FontSizeLevel;
  onChangeFontLevel: (level: FontSizeLevel) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  fontLevel,
  onChangeFontLevel
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; prominent?: boolean }[] = [
    { id: 'home', label: '首頁' },
    { id: 'need-help', label: '我需要幫助', prominent: true },
    { id: 'resources', label: '福利與資源' },
    { id: 'community', label: '交流專區' },
    { id: 'about', label: '關於我們' },
    { id: 'disclaimer', label: '資訊來源' }
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8]/80 transition-colors">
      {/* Top Reassurance Ribbon */}
      <div className="bg-[#EFE8DD] border-b border-[#E4D8C4] py-2 px-4 text-center text-xs sm:text-sm text-[#665849] flex items-center justify-center gap-2 leading-relaxed">
        <Heart className="w-3.5 h-3.5 text-[#D96B43] inline-block shrink-0 fill-[#D96B43]/20 mt-0.5 sm:mt-0" />
        <span className="font-medium">
          非營利 · 不收費 · 不接受募款 · 單純因為自家親友有需要所以想打造一個快速搜集網路資訊的平台，您若有需要也歡迎使用，一起走過這段不容易的路。
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus-visible:outline-2 focus-visible:outline-[#D96B43] rounded-lg p-1 transition-opacity hover:opacity-90"
            aria-label="回有人陪你首頁"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#E87A50]/15 flex items-center justify-center text-[#D96B43] shrink-0 border border-[#E87A50]/30 shadow-xs">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D2A26] font-serif">
                  有人陪你
                </span>
                <span className="hidden md:inline-block text-[11px] font-medium text-[#7D6B5A] bg-[#EDE4D6] px-2 py-0.5 rounded-sm">
                  失智家庭互助
                </span>
              </div>
              <p className="text-xs text-[#7A6B5C] font-normal leading-tight hidden sm:block">
                失智家庭福利導航與互助平台
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="主要導覽">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              if (item.prominent) {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2.5 text-base font-bold rounded-xl transition-all shadow-xs focus-visible:outline-2 focus-visible:outline-[#D96B43] ${
                      isActive
                        ? 'bg-[#C2562E] text-white ring-2 ring-[#C2562E]/30'
                        : 'bg-[#D96B43] hover:bg-[#C2562E] text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-base font-medium rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-[#D96B43] ${
                    isActive
                      ? 'text-[#C2562E] font-semibold bg-[#F0E5D4]'
                      : 'text-[#54483C] hover:text-[#2D2A26] hover:bg-[#F3EBE0]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Utility Tools: A- / A / A+ Font Size Controls & 1966 Shortcut */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Prompt 28: A- / A / A+ Accessible font scale */}
            <div
              className="flex items-center bg-[#F0E6D7] p-1 rounded-xl border border-[#DDD0BC]"
              role="group"
              aria-label="文字大小調整"
              title="調整字體大小（方便中高齡閱讀）"
            >
              <button
                type="button"
                onClick={() => onChangeFontLevel('normal')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors ${
                  fontLevel === 'normal'
                    ? 'bg-white text-[#2D2A26] shadow-xs'
                    : 'text-[#6D5D4E] hover:text-[#2D2A26]'
                }`}
                aria-label="標準字體 (A-)"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => onChangeFontLevel('comfortable')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors ${
                  fontLevel === 'comfortable'
                    ? 'bg-white text-[#2D2A26] shadow-xs'
                    : 'text-[#6D5D4E] hover:text-[#2D2A26]'
                }`}
                aria-label="適中字體 (A)"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onChangeFontLevel('large')}
                className={`px-2 py-1 text-xs font-bold rounded-lg transition-colors ${
                  fontLevel === 'large'
                    ? 'bg-white text-[#2D2A26] shadow-xs'
                    : 'text-[#6D5D4E] hover:text-[#2D2A26]'
                }`}
                aria-label="特大字體 (A+)"
              >
                A+
              </button>
            </div>

            {/* Direct Official Line 1966 button */}
            <a
              href="tel:1966"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold text-[#8C3B18] bg-[#FBECE2] hover:bg-[#F7D8C4] border border-[#F0BEA3] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-[#D96B43]"
              title="衛福部長照專線 1966（前5分鐘通話免費）"
            >
              <PhoneCall className="w-4 h-4 text-[#D96B43]" />
              <span>長照 1966</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('need-help')}
              className="px-3 py-1.5 bg-[#D96B43] text-white text-xs font-bold rounded-lg"
            >
              我需要幫助
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#473B2F] hover:bg-[#EFE5D5] focus-visible:outline-2 focus-visible:outline-[#D96B43]"
              aria-label={mobileMenuOpen ? '關閉選單' : '開啟選單'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DEC8] bg-[#FAF7F2] px-4 pt-3 pb-6 shadow-lg">
          {/* Mobile Font Size Switch */}
          <div className="flex items-center justify-between py-2 px-3 bg-[#EFE4D3] rounded-xl mb-3 text-xs text-[#5E5042]">
            <span>閱讀字體大小：</span>
            <div className="flex items-center gap-1 bg-white p-1 rounded-lg">
              <button
                onClick={() => onChangeFontLevel('normal')}
                className={`px-2 py-0.5 text-xs font-bold rounded ${
                  fontLevel === 'normal' ? 'bg-[#D96B43] text-white' : 'text-[#5E5042]'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => onChangeFontLevel('comfortable')}
                className={`px-2 py-0.5 text-xs font-bold rounded ${
                  fontLevel === 'comfortable' ? 'bg-[#D96B43] text-white' : 'text-[#5E5042]'
                }`}
              >
                A
              </button>
              <button
                onClick={() => onChangeFontLevel('large')}
                className={`px-2 py-0.5 text-xs font-bold rounded ${
                  fontLevel === 'large' ? 'bg-[#D96B43] text-white' : 'text-[#5E5042]'
                }`}
              >
                A+
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-lg font-medium transition-colors ${
                    item.prominent
                      ? 'bg-[#D96B43] text-white font-bold my-1'
                      : isActive
                      ? 'bg-[#EFE2CE] text-[#C2562E] font-semibold'
                      : 'text-[#4A3F33] hover:bg-[#F3EBE0]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[#E8DEC8] space-y-3">
            <a
              href="tel:1966"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#D96B43] hover:bg-[#C2562E] text-white rounded-xl font-semibold shadow-xs text-base transition-colors"
            >
              <PhoneCall className="w-5 h-5" />
              <span>撥打政府長照專線 1966</span>
            </a>
            <p className="text-center text-xs text-[#8C7A6B]">
              週一至週五 08:30~12:00、13:30~17:30，市話及手機前5分鐘免費
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
