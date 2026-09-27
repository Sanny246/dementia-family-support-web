/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, FontSizeLevel } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { NeedHelpPage } from './pages/NeedHelpPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CommunityPage } from './pages/CommunityPage';
import { AboutPage } from './pages/AboutPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PhoneCall, Compass, Heart } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [fontLevel, setFontLevel] = useState<FontSizeLevel>(() => {
    try {
      const saved = localStorage.getItem('caregiver_font_level');
      if (saved === 'comfortable' || saved === 'large' || saved === 'normal') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'comfortable'; // 預設提供中高齡友善舒適 18px 字級
  });

  const handleChangeFontLevel = (level: FontSizeLevel) => {
    setFontLevel(level);
    try {
      localStorage.setItem('caregiver_font_level', level);
    } catch {
      // ignore
    }
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compute root font styling based on fontLevel (Prompt 28: A- / A / A+)
  const fontClass =
    fontLevel === 'large'
      ? 'text-[20px] leading-[1.75]'
      : fontLevel === 'comfortable'
      ? 'text-[18px] leading-[1.7]'
      : 'text-[16px] leading-[1.6]';

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2A26] selection:bg-[#E8D9C5] selection:text-[#3B2C1E] transition-all duration-150 ${fontClass}`}
    >
      {/* Accessible Navbar with A- / A / A+ and Prominent "我需要幫助" */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        fontLevel={fontLevel}
        onChangeFontLevel={handleChangeFontLevel}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'need-help' && <NeedHelpPage onNavigate={handleNavigate} />}
        {currentPage === 'resources' && <ResourcesPage onNavigate={handleNavigate} />}
        {currentPage === 'community' && <CommunityPage onNavigate={handleNavigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
        {currentPage === 'disclaimer' && <DisclaimerPage onNavigate={handleNavigate} />}
        {currentPage === 'privacy' && <PrivacyPolicyPage onNavigate={handleNavigate} />}
        {currentPage === 'admin' && <AdminDashboardPage onNavigate={handleNavigate} />}
      </main>

      {/* Persistent Mobile Floating Quick Action (1966 & Need Help) */}
      <aside aria-label="行動版快速求助捷徑" className="fixed bottom-4 right-4 z-30 sm:hidden flex flex-col gap-2">
        <button
          onClick={() => handleNavigate('need-help')}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#473B2F] text-white text-xs font-semibold rounded-full shadow-lg border border-white/20 active:scale-95"
          aria-label="前往我需要幫助情境導航"
        >
          <Compass className="w-4 h-4 text-[#E5A93C]" />
          <span>導航下一步</span>
        </button>
        <a
          href="tel:1966"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#D96B43] text-white text-xs font-bold rounded-full shadow-lg border border-white/20 active:scale-95"
          aria-label="撥打長照專線 1966"
        >
          <PhoneCall className="w-4 h-4" />
          <span>撥打 1966</span>
        </a>
      </aside>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
