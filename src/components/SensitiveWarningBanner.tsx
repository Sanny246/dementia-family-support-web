import React from 'react';
import { ShieldAlert, Trash2 } from 'lucide-react';

interface SensitiveWarningBannerProps {
  issues: string[];
  onRemoveSensitiveHints?: () => void;
}

export const SensitiveWarningBanner: React.FC<SensitiveWarningBannerProps> = ({
  issues,
  onRemoveSensitiveHints
}) => {
  if (issues.length === 0) return null;

  return (
    <div
      role="alert"
      className="p-4 bg-[#FFFBEB] border-2 border-[#F59E0B] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#92400E]"
    >
      <div className="flex items-start gap-2.5">
        <ShieldAlert className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <strong className="font-bold text-[#B45309] block">
            隱私保護提醒：內容中偵測到疑似個人隱私資料
          </strong>
          <p className="text-[#78350F]">
            偵測項目：{issues.join('、')}。
            為了保護長輩與您的個資安全，請勿在此填寫真實身分證、電話、詳細地址或病歷號。建議將其刪除後再送出。
          </p>
        </div>
      </div>
    </div>
  );
};
