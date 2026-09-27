import React from 'react';
import { AlertTriangle, PhoneCall, ShieldAlert, Phone } from 'lucide-react';

interface EmergencyBannerProps {
  emergencyTypes: string[];
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ emergencyTypes }) => {
  return (
    <div
      role="alert"
      className="p-6 sm:p-7 bg-[#FFF2F0] border-2 border-[#E76F51] rounded-3xl space-y-4 shadow-sm text-[#2D2A26]"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-2xl bg-[#E76F51] text-white flex items-center justify-center shrink-0 shadow-xs">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C2410C] bg-[#FEE2E2] px-2.5 py-0.5 rounded-full inline-block">
            優先處理人身安全
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#9A3412]">
            這個情況可能需要先處理眼前的安全問題。
          </h3>
          <p className="text-sm sm:text-base text-[#7C2D12] leading-relaxed">
            系統自您的描述中偵測到可能包含：
            <span className="font-semibold underline ml-1">
              {emergencyTypes.join('、')}
            </span>
            。政府長照等一般行政福利申請通常需要數天至數週訪視評估，請優先尋求以下官方即時救援：
          </p>
        </div>
      </div>

      {/* Official Verified Emergency Hotlines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        <div className="bg-white p-3.5 rounded-xl border border-[#FECACA] flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#991B1B]">失聯走失報案／路口監視協尋</span>
            <div className="text-xl font-bold text-[#DC2626] mt-0.5">110 警察局勤務中心</div>
          </div>
          <a
            href="tel:110"
            className="mt-2 text-xs font-bold text-white bg-[#DC2626] hover:bg-[#B91C1C] py-1.5 px-3 rounded-lg text-center transition-colors inline-flex items-center justify-center gap-1"
          >
            <Phone className="w-3 h-3" />
            撥打 110
          </a>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#FECACA] flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#991B1B]">嚴重跌倒／昏迷呼吸異常急症</span>
            <div className="text-xl font-bold text-[#DC2626] mt-0.5">119 緊急救護消防</div>
          </div>
          <a
            href="tel:119"
            className="mt-2 text-xs font-bold text-white bg-[#DC2626] hover:bg-[#B91C1C] py-1.5 px-3 rounded-lg text-center transition-colors inline-flex items-center justify-center gap-1"
          >
            <Phone className="w-3 h-3" />
            撥打 119
          </a>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#FECACA] flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#991B1B]">失智長者全國通報協尋</span>
            <div className="text-lg font-bold text-[#C2410C] mt-0.5">0800-056-781</div>
          </div>
          <a
            href="tel:0800056781"
            className="mt-2 text-xs font-bold text-white bg-[#EA580C] hover:bg-[#C2410C] py-1.5 px-3 rounded-lg text-center transition-colors inline-flex items-center justify-center gap-1"
          >
            <Phone className="w-3 h-3" />
            失蹤老人協尋中心
          </a>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#FECACA] flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#991B1B]">心理危機／想不開緊急支持</span>
            <div className="text-lg font-bold text-[#059669] mt-0.5">1925 安心專線</div>
          </div>
          <a
            href="tel:1925"
            className="mt-2 text-xs font-bold text-white bg-[#059669] hover:bg-[#047857] py-1.5 px-3 rounded-lg text-center transition-colors inline-flex items-center justify-center gap-1"
          >
            <Phone className="w-3 h-3" />
            撥打 1925（24小時免費）
          </a>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#FECACA] flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[#991B1B]">家庭暴力與人身衝突防護</span>
            <div className="text-lg font-bold text-[#7C3AED] mt-0.5">113 保護專線</div>
          </div>
          <a
            href="tel:113"
            className="mt-2 text-xs font-bold text-white bg-[#7C3AED] hover:bg-[#6D28D9] py-1.5 px-3 rounded-lg text-center transition-colors inline-flex items-center justify-center gap-1"
          >
            <Phone className="w-3 h-3" />
            撥打 113（24小時免費）
          </a>
        </div>
      </div>
    </div>
  );
};
