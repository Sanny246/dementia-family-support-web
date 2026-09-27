import { OfficialSourceEntry } from '../types';

/**
 * 台灣失智與長照政策之官方資料來源註冊表 (Official Source Registry)
 * 依照規範：不要假設政府有公開即時 API。無 API 即明確標示「無公開API需手動/網頁擷取」，絕對不建立偽造 API Endpoint。
 */
export const OFFICIAL_SOURCES_REGISTRY: OfficialSourceEntry[] = [
  {
    source_id: 'SRC-MOHW-1966',
    agency: '衛生福利部 長期照顧司',
    website_name: '1966 長照專區官方網站',
    url: 'https://1966.gov.tw',
    category: '長照2.0四包錢、照護等級、申請資格',
    is_official: true,
    last_checked: '2026-09-15',
    update_frequency: '每季定期檢視',
    status: '無公開API需手動/網頁擷取',
    notes: '中央主管機關核心網站，無開放 REST API，由本站團隊定期手動比對長照四包錢給付標準公告。'
  },
  {
    source_id: 'SRC-MOHW-DEMENTIA',
    agency: '衛生福利部 護理及健康照護司',
    website_name: '失智症防治照護政策綱領與照護網絡',
    url: 'https://www.mohw.gov.tw',
    category: '失智共同照護中心、失智社區服務據點',
    is_official: true,
    last_checked: '2026-09-10',
    update_frequency: '半年或重大政策修正時',
    status: '無公開API需手動/網頁擷取',
    notes: '失智共照中心名冊每年由各縣市衛生局更新公告，以衛福部公報或 PDF 形式發布。'
  },
  {
    source_id: 'SRC-HPA-HEALTH',
    agency: '衛生福利部 國民健康署',
    website_name: '慢性病與失智友善社區專區',
    url: 'https://www.hpa.gov.tw',
    category: '失智警訊、預防延緩失能、友善天使',
    is_official: true,
    last_checked: '2026-08-20',
    update_frequency: '每年檢視',
    status: '無公開API需手動/網頁擷取',
    notes: '衛教與早期篩檢宣導，國健署定期發布宣導手冊。'
  },
  {
    source_id: 'SRC-MOL-WDA',
    agency: '勞動部 勞動力發展署',
    website_name: '移工申請與家庭看護工聘僱專區',
    url: 'https://www.wda.gov.tw',
    category: '聘僱外籍家庭看護工資格、多元免評、聘僱外籍看護使用長照喘息服務',
    is_official: true,
    last_checked: '2026-09-01',
    update_frequency: '每季檢視',
    status: '無公開API需手動/網頁擷取',
    notes: '2023年底起實施失智臨床評估量表（CDR>=1）免巴氏量表之最新聘僱放寬規定。'
  },
  {
    source_id: 'SRC-MOF-TAX',
    agency: '財政部 賦稅署',
    website_name: '財政部電子申報繳稅服務網',
    url: 'https://tax.nat.gov.tw',
    category: '綜合所得稅長照特別扣除額（每人每年12萬元）',
    is_official: true,
    last_checked: '2026-05-10',
    update_frequency: '每年所得稅申報期公告',
    status: '無公開API需手動/網頁擷取',
    notes: '所得稅法第17條規定之長照特別扣除額標準作業要點。'
  },
  {
    source_id: 'SRC-NPA-POLICE',
    agency: '內政部警政署 刑事警察局',
    website_name: '預防走失長者指紋捺印建檔服務專區',
    url: 'https://www.cpc.gov.tw',
    category: '防走失指紋捺印建檔服務',
    is_official: true,
    last_checked: '2026-08-15',
    update_frequency: '每年檢視',
    status: '無公開API需手動/網頁擷取',
    notes: '全國各警察分局偵查隊受理失智長者免費指紋捺印指引。'
  },
  {
    source_id: 'SRC-LOCAL-GOV-HEALTH',
    agency: '全台各縣市政府衛生局 / 長期照顧管理中心',
    website_name: '各縣市政府衛生局長照專案公告',
    url: 'https://1966.gov.tw',
    category: '各縣市自辦交通接送補助、緊急救援鈴、失智據點位置',
    is_official: true,
    last_checked: '2026-09-18',
    update_frequency: '每月或重大變動時',
    status: '無公開API需手動/網頁擷取',
    notes: '不同縣市自負額比例依偏遠與平地差異定額核算。'
  },
  {
    source_id: 'SRC-DATA-GOV',
    agency: '數位發展部 政府資料開放平台 (data.gov.tw)',
    website_name: '政府資料開放平台 (data.gov.tw)',
    url: 'https://data.gov.tw',
    category: '長照機構地理位置清單、社區關懷據點公開資料集 (CSV/JSON)',
    is_official: true,
    last_checked: '2026-09-01',
    update_frequency: '靜態資料集每半年更新',
    status: '無公開API需手動/網頁擷取',
    notes: '部分據點提供批次下載，但詳細收費與即時床位仍需致電或由個管專員到府媒合。'
  }
];

export const UPDATE_MECHANISM_NOTICE = {
  is_automated_scraper_running: false,
  status_statement: '目前尚未啟用自動定時抓取（因無常規伺服器背景排程服務）。本站架構具備待確認更新與差異記錄比對機制，由站長與社群志工定期人工複核。',
  last_registry_audit_date: '2026-09-20'
};
