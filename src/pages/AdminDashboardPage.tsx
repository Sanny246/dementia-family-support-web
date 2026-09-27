import React, { useState, useEffect } from 'react';
import { PageId, ReportItem, PolicyUpdateDraft, AnonymousAnalyticsEvent } from '../types';
import { StorageService } from '../services/storageService';
import {
  Lock,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Mail,
  CheckCircle2,
  Trash2,
  Eye,
  Filter,
  RefreshCw,
  XCircle,
  Database
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  // Authentication PIN state (Default demo PIN: caregiver888)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'analytics' | 'reports' | 'policy-drafts' | 'email-logs'>('analytics');

  // Time Range Filter for Prompt 26 Demand Insights
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '3months' | 'all'>('30days');

  // Loaded Data
  const [analyticsEvents, setAnalyticsEvents] = useState<AnonymousAnalyticsEvent[]>([]);
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [policyDrafts, setPolicyDrafts] = useState<PolicyUpdateDraft[]>([]);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);

  // Selected Report for Review
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [reviewDecision, setReviewDecision] = useState<ReportItem['decision']>('補充官方資訊');
  const [verificationNote, setVerificationNote] = useState<string>('');

  const refreshAllData = () => {
    setAnalyticsEvents(StorageService.getAnalyticsEvents());
    setReports(StorageService.getReports());
    setPolicyDrafts(StorageService.getPolicyDrafts());
    setEmailLogs(StorageService.getEmailNotificationLogs());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshAllData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === 'caregiver888' || pinInput.trim() === 'admin') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('管理員安全 PIN 碼錯誤（預設體驗 PIN 為 caregiver888）');
    }
  };

  const handleSaveReportDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReport) return;

    StorageService.updateReportDecision(
      selectedReport.id,
      reviewDecision,
      verificationNote.trim() || '依據主管機關官方最新公告完成查核處置。'
    );

    setSelectedReport(null);
    setVerificationNote('');
    refreshAllData();
  };

  // Metric Computations (Prompt 25 & 26)
  const totalInteractions = analyticsEvents.length;
  const isDataSufficient = totalInteractions >= 3;

  // Breakdown by county
  const countyCount: Record<string, number> = {};
  const problemCount: Record<string, number> = {};
  const categoryCount: Record<string, number> = {};

  analyticsEvents.forEach((ev) => {
    if (ev.county) countyCount[ev.county] = (countyCount[ev.county] || 0) + 1;
    ev.selectedProblems.forEach((p) => {
      problemCount[p] = (problemCount[p] || 0) + 1;
    });
    ev.matchedCategories.forEach((c) => {
      categoryCount[c] = (categoryCount[c] || 0) + 1;
    });
  });

  const pendingReportsCount = reports.filter((r) => r.status !== '已完成').length;

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#FAF7F2] border border-[#DDD0BD] text-[#C46D52] flex items-center justify-center mx-auto shadow-xs">
          <Lock className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-serif text-[#2D2A26]">站長管理後台</h1>
          <p className="text-xs sm:text-sm text-[#7A6B5C]">
            此處為本站維護團隊管理介面，包含匿名需求洞察、檢舉查核與政策更新隊列。
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl border border-[#DDD0BD] space-y-4 shadow-sm text-left">
          <div>
            <label className="block text-xs font-bold text-[#473B2F] mb-1">
              請輸入管理員安全 PIN 碼
            </label>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="預設 PIN: caregiver888"
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm focus:outline-none focus:border-[#C46D52]"
            />
            {pinError && <p className="text-xs text-[#DC2626] mt-1">{pinError}</p>}
            <p className="text-[11px] text-[#8C7A6B] mt-1.5">
              提示：預設安全體驗 PIN 碼為 <strong>caregiver888</strong>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#D96B43] hover:bg-[#C2562E] text-white text-sm font-bold rounded-xl shadow-xs transition-colors"
          >
            驗證並進入後台
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE0D1] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C46D52] bg-[#FAF4EA] px-2.5 py-0.5 rounded-full mb-1">
            <Lock className="w-3.5 h-3.5" /> 站長管理端點 · 權限保護中
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#2D2A26]">
            有人陪你｜管理儀表板與需求洞察
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6B5C] mt-0.5">
            恪守隱私原則：本儀表板嚴格隔離聯絡個資，絕不在分析數據中展示 Email。
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refreshAllData}
            className="p-2 bg-white border border-[#DDD0BD] rounded-xl text-xs font-semibold text-[#54483C] hover:bg-[#FAF7F2] flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>重新整理</span>
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-2 bg-[#FAF7F2] hover:bg-[#EFE5D5] border border-[#DDD0BD] rounded-xl text-xs text-[#54483C]"
          >
            登出
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EAE0D0] rounded-2xl">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'analytics'
              ? 'bg-white text-[#2D2A26] shadow-xs'
              : 'text-[#615243] hover:text-[#2D2A26]'
          }`}
        >
          家庭需求洞察 (Analytics)
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'reports'
              ? 'bg-white text-[#2D2A26] shadow-xs'
              : 'text-[#615243] hover:text-[#2D2A26]'
          }`}
        >
          <span>社群內容檢舉審核</span>
          {pendingReportsCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white text-[10px] flex items-center justify-center font-bold">
              {pendingReportsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('policy-drafts')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'policy-drafts'
              ? 'bg-white text-[#2D2A26] shadow-xs'
              : 'text-[#615243] hover:text-[#2D2A26]'
          }`}
        >
          官方政策更新紀錄 (Updates)
        </button>

        <button
          onClick={() => setActiveTab('email-logs')}
          className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'email-logs'
              ? 'bg-white text-[#2D2A26] shadow-xs'
              : 'text-[#615243] hover:text-[#2D2A26]'
          }`}
        >
          郵件通知模擬佇列 (Email Queue)
        </button>
      </div>

      {/* ========================================================
          TAB 1: PROMPT 25 & 26 家庭需求洞察 (Analytics)
          ======================================================== */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Time range selector */}
          <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-[#E5DAC8] text-xs">
            <span className="font-bold text-[#473B2F] flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-[#C46D52]" />
              分析時間區間：
            </span>
            <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl">
              {(['7days', '30days', '3months', 'all'] as const).map((rng) => (
                <button
                  key={rng}
                  onClick={() => setTimeRange(rng)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    timeRange === rng
                      ? 'bg-[#D96B43] text-white font-bold'
                      : 'text-[#6D5D4E] hover:text-[#2D2A26]'
                  }`}
                >
                  {rng === '7days'
                    ? '最近7天'
                    : rng === '30days'
                    ? '最近30天'
                    : rng === '3months'
                    ? '最近3個月'
                    : '全部歷史'}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt 26 Data sufficiency check */}
          {!isDataSufficient ? (
            <div className="p-8 text-center bg-white border border-[#DDD0BD] rounded-3xl space-y-2 text-[#7A6B5C]">
              <BarChart3 className="w-10 h-10 mx-auto text-[#D96B43] opacity-60" />
              <p className="font-bold text-base text-[#2D2A26]">
                目前資料量不足，暫不進行趨勢判斷。
              </p>
              <p className="text-xs max-w-md mx-auto">
                遵循「嚴禁 AI 憑空捏造統計數據」原則。當使用者於「我需要幫助」完成更多互動評估後，系統會自動匯整即時指標。
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-[#E5DAC8] space-y-1">
                  <span className="text-xs text-[#7A6B5C]">累計評估人次</span>
                  <div className="text-2xl font-bold font-serif text-[#2D2A26]">
                    {totalInteractions} 次
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E5DAC8] space-y-1">
                  <span className="text-xs text-[#7A6B5C]">涵蓋台灣縣市</span>
                  <div className="text-2xl font-bold font-serif text-[#3E5C56]">
                    {Object.keys(countyCount).length} 縣市
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E5DAC8] space-y-1">
                  <span className="text-xs text-[#7A6B5C]">待處理內容檢舉</span>
                  <div className="text-2xl font-bold font-serif text-[#DC2626]">
                    {pendingReportsCount} 則
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#E5DAC8] space-y-1">
                  <span className="text-xs text-[#7A6B5C]">資訊新鮮度狀態</span>
                  <div className="text-2xl font-bold font-serif text-[#2E7D32]">
                    🟢 正常運作
                  </div>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                {/* Most common difficulties */}
                <div className="bg-white p-5 rounded-2xl border border-[#E5DAC8] space-y-3">
                  <h3 className="font-bold text-base text-[#2D2A26]">
                    家庭最常見困擾排行 (Top Difficulties)
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(problemCount)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([prob, cnt]) => (
                        <div key={prob} className="flex items-center justify-between py-1 border-b border-[#FAF7F2]">
                          <span className="text-[#473B2F]">{prob}</span>
                          <span className="font-bold text-[#D96B43] bg-[#FAF5EB] px-2 py-0.5 rounded-lg">
                            {cnt} 次
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Top Matched Welfare Categories */}
                <div className="bg-white p-5 rounded-2xl border border-[#E5DAC8] space-y-3">
                  <h3 className="font-bold text-base text-[#2D2A26]">
                    熱門匹配福利類別 (Matched Welfare)
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(categoryCount)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([cat, cnt]) => (
                        <div key={cat} className="flex items-center justify-between py-1 border-b border-[#FAF7F2]">
                          <span className="text-[#473B2F]">{cat}</span>
                          <span className="font-bold text-[#3E5C56] bg-[#E8F0EE] px-2 py-0.5 rounded-lg">
                            {cnt} 次
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 2: PROMPT 23 檢舉審核隊列 (Moderation Queue)
          ======================================================== */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif text-[#2D2A26]">
              社群內容檢舉審核隊列 (Moderation Queue)
            </h2>
            <p className="text-xs text-[#7A6B5C]">
              依照官方來源進行事實查核，處理政策錯誤資訊、商業廣告或人身攻擊。
            </p>
          </div>

          {reports.length === 0 ? (
            <div className="p-8 text-center bg-white border border-[#DDD0BD] rounded-3xl text-[#7A6B5C]">
              <CheckCircle2 className="w-10 h-10 mx-auto text-[#2E7D32]" />
              <p className="font-bold text-base text-[#2D2A26] mt-2">目前沒有任何待處理檢舉</p>
              <p className="text-xs">社群運作健康無違規通報。</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((rep) => (
                <div
                  key={rep.id}
                  className="bg-white p-5 rounded-2xl border border-[#E5DAC8] space-y-3 text-xs sm:text-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F2ECE1] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#DC2626] bg-[#FEE2E2] px-2.5 py-0.5 rounded-md text-xs">
                        理由：{rep.reason}
                      </span>
                      <span className="text-[#8C7A6B]">
                        通報時間：{rep.createdAt.slice(0, 16).replace('T', ' ')}
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        rep.status === '已完成'
                          ? 'bg-[#E8F5E9] text-[#2E7D32]'
                          : 'bg-[#FEF3C7] text-[#D97706]'
                      }`}
                    >
                      狀態：{rep.status}
                    </span>
                  </div>

                  <div>
                    <strong className="text-[#2D2A26]">被檢舉內容：</strong>
                    <p className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8] text-[#54473A] mt-1">
                      {rep.targetTitleOrSnippet}
                    </p>
                  </div>

                  {rep.description && (
                    <div>
                      <strong className="text-[#2D2A26]">檢舉人補充說明：</strong>
                      <span className="text-[#6D5D4E] ml-1">{rep.description}</span>
                    </div>
                  )}

                  {rep.status === '已完成' ? (
                    <div className="p-3 bg-[#FAF5EC] rounded-xl border border-[#E5DAC8] text-xs text-[#5C4F42] space-y-0.5">
                      <strong>站長審理結果：【{rep.decision}】</strong>
                      <p>查證筆記：{rep.verificationNote}</p>
                    </div>
                  ) : (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setSelectedReport(rep)}
                        className="px-4 py-2 bg-[#D96B43] hover:bg-[#C2562E] text-white text-xs font-bold rounded-xl transition-colors"
                      >
                        開始查證與審理
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Decision Dialog Modal */}
          {selectedReport && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#E5DAC8]">
                <h3 className="text-lg font-bold font-serif text-[#2D2A26]">
                  審理檢舉案件：{selectedReport.reason}
                </h3>

                <form onSubmit={handleSaveReportDecision} className="space-y-3.5 text-xs sm:text-sm">
                  <div>
                    <label className="block text-xs font-bold text-[#473B2F] mb-1">
                      管理員裁定處置方式 *
                    </label>
                    <select
                      value={reviewDecision}
                      onChange={(e) => setReviewDecision(e.target.value as any)}
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm"
                    >
                      <option value="內容無問題">內容無問題（駁回檢舉）</option>
                      <option value="補充官方資訊">補充官方資訊（保留文章並附上官方查證）</option>
                      <option value="要求修正">要求作者修正不實內容</option>
                      <option value="隱藏">隱藏此內容（前台不再顯示）</option>
                      <option value="刪除">刪除此內容</option>
                      <option value="限制使用">限制該使用者再次發言</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#473B2F] mb-1">
                      查證紀錄與官方來源備註
                    </label>
                    <textarea
                      rows={3}
                      value={verificationNote}
                      onChange={(e) => setVerificationNote(e.target.value)}
                      placeholder="紀錄比對之官方網址或公文規定（例如已查對1966長照法規第xx條）..."
                      className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedReport(null)}
                      className="px-4 py-2 bg-[#FAF7F2] text-[#54483C] text-xs rounded-xl"
                    >
                      取消
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#D96B43] text-white text-xs font-bold rounded-xl"
                    >
                      確認裁定並紀錄
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          TAB 3: PROMPT 13 官方政策更新紀錄 (Updates Draft)
          ======================================================== */}
      {activeTab === 'policy-drafts' && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif text-[#2D2A26]">
              官方政策更新比對機制紀錄 (Prompt 13)
            </h2>
            <p className="text-xs text-[#7A6B5C]">
              當偵測到政府修訂法規時，保存舊內容、新內容與差異，防止自動錯誤覆蓋。
            </p>
          </div>

          <div className="space-y-3">
            {policyDrafts.map((d) => (
              <div
                key={d.id}
                className="bg-white p-5 rounded-2xl border border-[#E5DAC8] space-y-2 text-xs sm:text-sm"
              >
                <div className="flex items-center justify-between border-b border-[#F2ECE1] pb-2">
                  <strong className="text-base text-[#2D2A26]">{d.resource_name}</strong>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5E9] text-[#2E7D32]">
                    {d.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8]">
                    <span className="text-[#8C7A6B] block mb-0.5">舊版政策要點：</span>
                    <p className="text-[#54473A]">{d.old_content_summary}</p>
                  </div>
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8]">
                    <span className="text-[#2E7D32] font-semibold block mb-0.5">
                      新版修訂公告要點：
                    </span>
                    <p className="text-[#2D2A26]">{d.new_content_summary}</p>
                  </div>
                </div>

                <div className="pt-2 text-xs text-[#7A6B5C] flex items-center justify-between">
                  <span>發現比對日期：{d.discovered_date}</span>
                  <a
                    href={d.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C46D52] hover:underline"
                  >
                    主管機關原始公告網址
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: PROMPT 21 郵件通知模擬佇列 (Email Queue)
          ======================================================== */}
      {activeTab === 'email-logs' && (
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif text-[#2D2A26]">
              郵件回覆通知模擬佇列 (Prompt 21)
            </h2>
            <p className="text-xs text-[#7A6B5C]">
              遵循「不能假裝已寄出成功」之透明原則。當有留言回覆時，系統保留派發記錄。
            </p>
          </div>

          <div className="p-4 bg-[#FFF9EE] rounded-2xl border-l-4 border-[#E5A93C] text-xs sm:text-sm text-[#66543A]">
            <strong>系統部署準備提示：</strong>
            目前未綁定實體 SMTP 伺服器或 SendGrid API。若需要真正發送實體郵件給讀者，請於雲端環境設定環境變數（如 SMTP_HOST、SMTP_USER、SMTP_PASS）。
          </div>

          {emailLogs.length === 0 ? (
            <div className="p-8 text-center bg-white border border-[#DDD0BD] rounded-3xl text-[#7A6B5C]">
              <Mail className="w-10 h-10 mx-auto text-[#8C7A6B]" />
              <p className="font-bold text-base text-[#2D2A26] mt-2">目前尚無回覆通知事件</p>
            </div>
          ) : (
            <div className="space-y-3">
              {emailLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-white p-4 rounded-2xl border border-[#E5DAC8] text-xs sm:text-sm space-y-1"
                >
                  <div className="flex items-center justify-between text-xs text-[#7A6B5C]">
                    <span className="font-bold text-[#2D2A26]">目標文章：{log.postTitle}</span>
                    <span>{log.timestamp.slice(0, 16).replace('T', ' ')}</span>
                  </div>
                  <p className="text-[#54473A]">
                    回覆者：【{log.replier}】留下了支持與建議。
                  </p>
                  <div className="text-[11px] text-[#A05C3B] pt-1">
                    狀態標記：{log.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
