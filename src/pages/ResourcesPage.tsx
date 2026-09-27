import React, { useState } from 'react';
import { PageId, WelfareResource, WelfareCategory } from '../types';
import { WELFARE_DATABASE } from '../data/welfareDatabase';
import {
  Search,
  CheckCircle,
  ExternalLink,
  Phone,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('LTC-PKG-1-CARE');

  const categories = [
    { id: 'all', label: '全部資源' },
    { id: '長照申請', label: '長照2.0四包錢' },
    { id: '失智共同照護', label: '失智共照中心' },
    { id: '失智社區服務', label: '失智社區據點' },
    { id: '走失與安全', label: '防走失與安全' },
    { id: '輔具與居家安全', label: '輔具與無障礙' },
    { id: '喘息服務', label: '照顧者喘息' },
    { id: '外籍家庭看護', label: '外籍家庭看護' },
    { id: '經濟補助', label: '所得稅與經濟津貼' },
    { id: '法律與財產保護', label: '法律與意定監護' }
  ];

  const filteredResources = WELFARE_DATABASE.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      item.category === selectedCategory ||
      (selectedCategory === '長照申請' && item.category_label.includes('長照2.0'));

    const matchesQuery =
      item.resource_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.plain_explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service_content.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.target_audience.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#A05C3B] uppercase">
          資訊透明 · 官方來源 · 拒絕假資料
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#2D2A26]">
          福利與資源資料庫
        </h1>
        <p className="text-base sm:text-lg text-[#5A4E42] max-w-2xl mx-auto leading-relaxed">
          不用被繁瑣法規淹沒。我們把台灣中央與各縣市失智家庭福利，整理成清楚的生活語言、申請方式與官方追溯來源。
        </p>
      </div>

      {/* Search Bar & Category Filter */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#8C7A6B] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜尋關鍵字，例如：洗澡、日間照顧、愛心手鍊、喘息、外籍看護、報稅12萬、指紋..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#D5C4AC] rounded-2xl text-base text-[#2D2A26] placeholder-[#9E8E7D] shadow-xs focus:outline-none focus:border-[#C46D52] transition-colors"
          />
        </div>

        {/* Clean Segmented Filter */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EAE0D0] rounded-2xl">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all ${
                  isSelected
                    ? 'bg-white text-[#2D2A26] shadow-xs font-bold'
                    : 'text-[#615243] hover:text-[#2D2A26] hover:bg-white/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-5">
        {filteredResources.length === 0 ? (
          <div className="p-10 text-center bg-[#FAF7F2] border border-[#DDD0BD] rounded-3xl text-[#7A6B5C]">
            <p className="font-semibold text-lg">沒有找到符合「{searchQuery}」的項目</p>
            <p className="text-sm mt-1">請嘗試其他關鍵字，或切換至「全部資源」。</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#EAE0D0] hover:bg-[#D5C4AC] text-[#473B2F] font-semibold text-sm rounded-xl"
            >
              清除搜尋條件
            </button>
          </div>
        ) : (
          filteredResources.map((item) => {
            const isExpanded = expandedId === item.resource_id;
            return (
              <div
                key={item.resource_id}
                className="bg-[#FAF7F2] border border-[#DDD0BD] hover:border-[#C46D52]/60 rounded-3xl p-6 sm:p-7 shadow-xs transition-all"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-xs text-[#7A6B5C]">
                      <span className="font-medium text-[#A05C3B]">{item.category_label}</span>
                      <span>·</span>
                      <span>適用地區：{item.region}</span>
                      <span>·</span>
                      {/* Prompt 17 Freshness indicator */}
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full font-medium">
                        <span>🟢</span>
                        <span>最近已確認（{item.last_confirmed_date}）</span>
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A26]">
                      {item.resource_name}
                    </h2>

                    <p className="text-sm sm:text-base text-[#524538] leading-relaxed pt-1">
                      {item.plain_explanation}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleExpand(item.resource_id)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#EFE5D5] hover:bg-[#E2D5C1] text-[#473B2F] text-sm font-semibold rounded-xl shrink-0 transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? '收合申請細節' : '查看完整申請指南'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-[#EAE0D1] space-y-6 text-sm text-[#473B2F]">
                    {/* Eligibility & Benefits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Eligibility */}
                      <div className="bg-white p-5 rounded-2xl border border-[#E4D8C5] space-y-2.5">
                        <h3 className="font-bold text-[#2D2A26] flex items-center gap-2 text-base">
                          <CheckCircle className="w-4 h-4 text-[#C46D52]" />
                          適用對象與資格條件
                        </h3>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-[#54473A]">
                          {item.target_audience.map((el, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#C46D52] font-bold">•</span>
                              <span>{el}</span>
                            </li>
                          ))}
                          {item.eligibility_conditions.map((ec, i) => (
                            <li key={'c' + i} className="flex items-start gap-2">
                              <span className="text-[#A05C3B] font-bold">※</span>
                              <span className="text-[#6D5D4E]">{ec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Benefits / Content */}
                      <div className="bg-white p-5 rounded-2xl border border-[#E4D8C5] space-y-2.5">
                        <h3 className="font-bold text-[#2D2A26] flex items-center gap-2 text-base">
                          <FileCheck className="w-4 h-4 text-[#3E5C56]" />
                          具體服務內容
                        </h3>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-[#54473A]">
                          {item.service_content.map((be, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#3E5C56] font-bold">•</span>
                              <span>{be}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Step-by-step procedure */}
                    <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E4D8C5] space-y-3">
                      <h3 className="font-bold text-[#2D2A26] text-base">
                        申請流程與步驟（怎麼辦理？）
                      </h3>
                      <ol className="space-y-2.5 text-xs sm:text-sm text-[#54473A]">
                        {item.application_method.map((st, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-5 h-5 rounded-full bg-[#EADDCB] text-[#5A4B3C] text-xs flex items-center justify-center shrink-0 font-bold mt-0.5">
                              {i + 1}
                            </span>
                            <span>{st}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Practical Tips */}
                    <div className="p-4 sm:p-5 bg-[#FFF9EE] border-l-4 border-[#E5A93C] rounded-r-2xl text-xs sm:text-sm text-[#66543A]">
                      <strong className="text-[#8C5E13] block mb-1">💡 照顧者實戰叮嚀：</strong>
                      {item.practical_caregiver_tips}
                    </div>

                    {/* Official Contact Button & Link (Prompt 16) */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#EAE0D1]">
                      <div className="flex items-center gap-2 text-xs text-[#7A6B5C]">
                        <span>主管機關：{item.official_agency}</span>
                        <span>·</span>
                        <span>受理窗口：{item.application_window}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.official_phone && (
                          <a
                            href={`tel:${item.official_phone.replace(/[^0-9]/g, '')}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D96B43] hover:bg-[#C2562E] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>撥打專線：{item.official_phone}</span>
                          </a>
                        )}

                        <a
                          href={item.official_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#F3EBE0] text-[#54483C] text-xs sm:text-sm font-medium border border-[#D5C4AC] rounded-xl transition-colors"
                        >
                          <span>查看官方原文</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct guide CTA */}
      <div className="p-6 sm:p-8 bg-[#EFE7DC] border border-[#DDD0BD] rounded-3xl text-center space-y-3">
        <h3 className="text-xl font-bold font-serif text-[#2D2A26]">
          想要系統依據家裡情況，為你自動挑選？
        </h3>
        <p className="text-sm text-[#5C4F42] max-w-lg mx-auto">
          只要回答幾個簡單勾選題，系統會幫您自動梳理出最合適的項目與下一步清單。
        </p>
        <button
          onClick={() => onNavigate('need-help')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D96B43] hover:bg-[#C2562E] text-white font-semibold text-sm rounded-xl shadow-xs transition-colors"
        >
          <span>使用互動情境導航</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
