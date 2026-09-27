export type PageId =
  | 'home'
  | 'need-help'
  | 'resources'
  | 'community'
  | 'about'
  | 'disclaimer'
  | 'privacy'
  | 'admin';

export type FontSizeLevel = 'normal' | 'comfortable' | 'large';

export type DataFreshnessStatus = 'fresh' | 'warning' | 'stale';

export interface WelfareResource {
  resource_id: string;
  resource_name: string;
  category: WelfareCategory;
  category_label: string;
  plain_explanation: string;
  service_content: string[];
  target_audience: string[];
  eligibility_conditions: string[];
  region: string; // '全國' or specific county
  application_method: string[];
  application_window: string;
  official_agency: string;
  official_phone: string;
  official_url: string;
  source_title: string;
  source_summary: string;
  official_update_date: string;
  retrieved_date: string;
  last_confirmed_date: string;
  data_status: '有效' | '待確認' | '疑似更新' | '失效';
  freshness: DataFreshnessStatus;
  keywords: string[];
  source_url: string;
  practical_caregiver_tips: string;
}

export type WelfareCategory =
  | '長照申請'
  | '居家服務'
  | '日間照顧'
  | '喘息服務'
  | '失智共同照護'
  | '失智社區服務'
  | '走失與安全'
  | '輔具與居家安全'
  | '交通接送'
  | '外籍家庭看護'
  | '照顧者支持'
  | '經濟補助'
  | '醫療與失智評估'
  | '機構住宿'
  | '地方政府資源'
  | '情緒支持'
  | '法律與財產保護'
  | '其他';

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  summary: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  steps: string[];
  documents: string[];
  contactName: string;
  contactPhone: string;
  officialUrl?: string;
  practicalTips: string;
}

export interface CaregiverStory {
  id: string;
  author: string;
  relation: string;
  location: string;
  title: string;
  content: string;
  tags: string[];
  likesCount: number;
  date: string;
  comments: {
    id: string;
    author: string;
    text: string;
    date: string;
  }[];
}

export interface OfficialSourceEntry {
  source_id: string;
  agency: string;
  website_name: string;
  url: string;
  category: string;
  is_official: boolean;
  last_checked: string;
  update_frequency: string;
  status: '正常' | '待確認' | '無公開API需手動/網頁擷取';
  notes: string;
}

export interface UserNeedsInput {
  selectedProblems: string[];
  elderAge: string;
  county: string;
  diagnosisStatus: string;
  dailyLivingStatus: string[];
  primaryCareMethod: string;
  relationship: string;
  email?: string;
  freeText: string;
  followUpAnswers?: Record<string, string>;
}

export interface ClassifiedNeeds {
  categories: WelfareCategory[];
  isEmergency: boolean;
  emergencyTypes: string[];
  detectedSensitiveInfo: string[];
  priorityActions: PriorityAction[];
  recommendedResources: WelfareResource[];
  situationSummary: string;
  missingInfoQuestions: FollowUpQuestion[];
}

export interface PriorityAction {
  id: string;
  action_title: string;
  reason: string;
  solves_what: string;
  how_to_start: string;
  official_source_agency: string;
  official_phone?: string;
  official_url?: string;
}

export interface FollowUpQuestion {
  id: string;
  question: string;
  reason: string;
  options: string[];
}

export interface CommunityPost {
  id: string;
  category: '我想說說話' | '我遇到問題' | '我的照顧經驗' | '我發現一個有用資源' | '福利／政策資訊分享';
  title: string;
  author: string;
  date: string;
  content: string;
  want_notification: boolean;
  comments: CommunityComment[];
  is_hidden?: boolean;
  moderator_note?: string;
}

export interface CommunityComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
  is_hidden?: boolean;
}

export interface ReportItem {
  id: string;
  targetType: 'post' | 'comment';
  targetId: string;
  targetTitleOrSnippet: string;
  reason: '錯誤福利資訊' | '醫療錯誤資訊' | '詐騙／廣告' | '人身攻擊' | '隱私' | '不當內容' | '其他';
  description: string;
  reporterContact?: string;
  createdAt: string;
  status: '待審核' | '查證中' | '已完成';
  decision?: '內容無問題' | '補充官方資訊' | '要求修正' | '隱藏' | '刪除' | '限制使用';
  verificationNote?: string;
}

export interface PolicyUpdateDraft {
  id: string;
  resource_id: string;
  resource_name: string;
  discovered_date: string;
  old_content_summary: string;
  new_content_summary: string;
  source_url: string;
  status: '待管理員確認' | '已採納更新' | '已駁回保持原樣';
}

export interface AnonymousAnalyticsEvent {
  id: string;
  timestamp: string;
  county: string;
  elderAge: string;
  diagnosisStatus: string;
  primaryCareMethod: string;
  relationship: string;
  selectedProblems: string[];
  matchedCategories: string[];
  clickedResourceIds: string[];
  isEmergencyTriggered: boolean;
}
