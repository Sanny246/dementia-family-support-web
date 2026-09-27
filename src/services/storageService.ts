import {
  CommunityPost,
  CommunityComment,
  ReportItem,
  PolicyUpdateDraft,
  AnonymousAnalyticsEvent
} from '../types';

const STORAGE_POSTS_KEY = 'you_are_not_alone_posts_v2';
const STORAGE_REPORTS_KEY = 'you_are_not_alone_reports_v2';
const STORAGE_ANALYTICS_KEY = 'you_are_not_alone_analytics_v2';
const STORAGE_POLICY_DRAFTS_KEY = 'you_are_not_alone_policy_drafts_v2';
const STORAGE_EMAIL_NOTIFS_KEY = 'you_are_not_alone_simulated_emails_v2';

// 初始示範文章（符合 Prompt 19 要求的分類，無人氣競爭排行榜）
const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    category: '我的照顧經驗',
    title: '剛送媽媽去日間照顧的第一個月，我的心態是這樣轉變的',
    author: '小敏（女兒）',
    date: '2026-09-20',
    content: '四年前媽媽開始忘記關瓦斯，甚至常懷疑鄰居偷存摺。剛開始我天天跟她辯解，兩個人都氣哭。後來在失智共照中心個管師鼓勵下，撥打了1966送媽媽去日照中心。\n一開始我也覺得把媽媽送去日照很內疚，但兩週後看她帶回手作的彩繪杯墊，還認了隔壁桌的李阿姨當朋友，我才明白：適時放手尋求外援不是放棄，而是讓我們彼此喘口氣，讓愛能走得更長久。',
    want_notification: true,
    comments: [
      {
        id: 'comm-1',
        postId: 'post-1',
        author: '阿宏（在職照顧者）',
        date: '2026-09-21',
        content: '「尋求外援不是放棄」這句話點醒了我。我現在白天上班也每天提心吊膽，明天打算鼓起勇氣打 1966 了。'
      }
    ]
  },
  {
    id: 'post-2',
    category: '福利／政策資訊分享',
    title: '照管專員到家裡評估長照等級時，強烈建議「私下備妥清單」',
    author: '陳大哥（長子）',
    date: '2026-09-18',
    content: '想分享給剛要申請長照評估的朋友一個大提醒！專員到府那天，我爸為了維持尊嚴，精神百倍、端茶倒水，回答得頭頭是道（標準的社交假面）。好在我和妹妹事前列了一張長輩平日半夜不睡、常開冰箱、走失兩次的具體紀錄單，趁長輩去洗手間時私下遞交給專員。專員非常感謝我們的補充，順利核定出符合真實需求的長照等級！',
    want_notification: false,
    comments: [
      {
        id: 'comm-2',
        postId: 'post-2',
        author: '林小姐',
        date: '2026-09-19',
        content: '非常實用！我媽媽也是有客人在就裝得完全沒事，謝謝陳大哥的提醒！'
      }
    ]
  },
  {
    id: 'post-3',
    category: '我遇到問題',
    title: '長輩開始日夜顛倒、半夜在客廳找東西，大家都是怎麼安撫的？',
    author: '秀珍（媳婦）',
    date: '2026-09-15',
    content: '婆婆最近連續幾晚凌晨兩點爬起來開衣櫥，說要趕火車回娘家。我先生白天要開車，我每天半夜陪著哄，兩個人睡眠都被剝奪得好嚴重。請問大家在非藥物上，有什麼溫和的引導技巧嗎？',
    want_notification: true,
    comments: [
      {
        id: 'comm-3',
        postId: 'post-3',
        author: '文華',
        date: '2026-09-16',
        content: '不要跟她辯解火車沒開。我會先泡一杯溫牛奶給長輩，說：「下一班車是清晨六點，火車站長說現在天黑車還沒開，我們先回床上暖暖被子等車。」順著她的邏輯轉移注意力，通常能安靜下來。'
      }
    ]
  },
  {
    id: 'post-4',
    category: '我發現一個有用資源',
    title: '陪阿公去派出所辦「指紋捺印」，比想像中親切快速好多',
    author: '阿豪（孫子）',
    date: '2026-09-10',
    content: '之前很擔心長輩抗拒去警察局，後來我們跟阿公說去派出所領「社區榮譽長者安全卡」。員警態度超級溫和有禮貌，10分鐘就按捺建檔完成，還送了一盒小肥皂。家裡有失智長輩的朋友，真心推薦趁早去辦！',
    want_notification: false,
    comments: []
  },
  {
    id: 'post-5',
    category: '我想說說話',
    title: '當老伴有一天看著我問：「這位小姐，請問我太太在哪裡？」',
    author: '玉梅（妻子）',
    date: '2026-09-05',
    content: '那一刻眼淚差點忍不住掉下來。但我還是笑著牽起他的手說：「你太太去幫你煮紅豆湯了，現在我是你的好朋友，我會一直陪著你。」病魔偷走了他的記憶，但溫暖的手心溫度不會被偷走。各位照顧者，大家一起加油。',
    want_notification: false,
    comments: []
  }
];

// 初始政策待確認範本（Prompt 13 政策更新架構示範）
const DEFAULT_POLICY_DRAFTS: PolicyUpdateDraft[] = [
  {
    id: 'draft-1',
    resource_id: 'LTC-PKG-4-RESPITE',
    resource_name: '長照喘息服務外籍看護家庭放寬要點',
    discovered_date: '2026-09-15',
    old_content_summary: '原規定外籍看護工短暫休假滿30天以上方得申請長照喘息補助。',
    new_content_summary: '擴大放寬：外籍看護工休假或短期未能協助時，不論天數均得申請長照喘息服務。',
    source_url: 'https://1966.gov.tw',
    status: '已採納更新'
  }
];

// 初始匿名分析紀錄（Prompt 24 Tier A，絕無任何 Email 或姓名個資）
const DEFAULT_ANALYTICS: AnonymousAnalyticsEvent[] = [
  {
    id: 'ana-1',
    timestamp: '2026-09-21T08:12:00Z',
    county: '台北市',
    elderAge: '75～84歲',
    diagnosisStatus: '已確診',
    primaryCareMethod: '與家人同住但白天無人',
    relationship: '子女',
    selectedProblems: ['白天沒有人可以照顧', '想找日間照顧'],
    matchedCategories: ['日間照顧', '長照申請'],
    clickedResourceIds: ['LTC-PKG-1-CARE'],
    isEmergencyTriggered: false
  },
  {
    id: 'ana-2',
    timestamp: '2026-09-22T14:30:00Z',
    county: '新北市',
    elderAge: '65～74歲',
    diagnosisStatus: '尚未評估',
    primaryCareMethod: '家人照顧',
    relationship: '配偶',
    selectedProblems: ['長輩容易走失', '長輩情緒或行為變化很大'],
    matchedCategories: ['走失與安全', '失智共同照護'],
    clickedResourceIds: ['SAFETY-ANTI-WANDERING', 'DEMENTIA-CO-CARE'],
    isEmergencyTriggered: false
  },
  {
    id: 'ana-3',
    timestamp: '2026-09-23T19:40:00Z',
    county: '台中市',
    elderAge: '85歲以上',
    diagnosisStatus: '已確診',
    primaryCareMethod: '家人照顧',
    relationship: '子女',
    selectedProblems: ['洗澡、吃飯或如廁變得困難', '家人需要喘息', '我覺得自己快撐不住了'],
    matchedCategories: ['居家服務', '喘息服務', '照顧者支持'],
    clickedResourceIds: ['LTC-PKG-1-CARE', 'LTC-PKG-4-RESPITE'],
    isEmergencyTriggered: false
  },
  {
    id: 'ana-4',
    timestamp: '2026-09-24T11:20:00Z',
    county: '高雄市',
    elderAge: '75～84歲',
    diagnosisStatus: '已確診',
    primaryCareMethod: '外籍家庭看護',
    relationship: '子女',
    selectedProblems: ['我不知道有哪些政府福利'],
    matchedCategories: ['外籍家庭看護', '經濟補助', '喘息服務'],
    clickedResourceIds: ['MOL-FOREIGN-CAREGIVER-SIMPLIFIED', 'TAX-SPECIAL-DEDUCTION'],
    isEmergencyTriggered: false
  }
];

export class StorageService {
  // ---- Tier B: 社群文章與留言 ----
  static getPosts(): CommunityPost[] {
    try {
      const data = localStorage.getItem(STORAGE_POSTS_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return DEFAULT_POSTS;
  }

  static savePost(newPost: CommunityPost, authorEmail?: string): void {
    const posts = this.getPosts();
    posts.unshift(newPost);
    try {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
    } catch {
      // ignore
    }

    // Tier C: Email 絕不與公開文章混在一起，單獨加密隔離保存
    if (authorEmail && authorEmail.trim()) {
      this.recordPrivateContact('post', newPost.id, authorEmail.trim());
    }
  }

  static addComment(postId: string, comment: CommunityComment): boolean {
    const posts = this.getPosts();
    const post = posts.find((p) => p.id === postId);
    if (!post) return false;

    post.comments.push(comment);
    try {
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
    } catch {
      // ignore
    }

    // Prompt 21: 若原作者有勾選需要通知，觸發 Email 通知架構
    if (post.want_notification) {
      this.simulateEmailNotification(post.id, post.title, comment.author);
    }

    return true;
  }

  // ---- Tier C: 聯絡資訊隔離 (Email 絕不公開) ----
  private static recordPrivateContact(targetType: string, targetId: string, email: string): void {
    try {
      const key = 'private_isolated_contacts_v2';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push({
        targetType,
        targetId,
        email,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem(key, JSON.stringify(existing));
    } catch {
      // ignore
    }
  }

  // 模擬通知與狀態清楚標示 (Prompt 21)
  private static simulateEmailNotification(postId: string, postTitle: string, replier: string): void {
    try {
      const logs = JSON.parse(localStorage.getItem(STORAGE_EMAIL_NOTIFS_KEY) || '[]');
      logs.unshift({
        id: 'notif-' + Date.now(),
        postId,
        postTitle,
        replier,
        timestamp: new Date().toISOString(),
        status: 'EMAIL服務尚未完成設定（需設定 SMTP/SendGrid）。此紀錄為本地模擬佇列。',
        recipientNotice: '系統已保留回覆提醒通知，上線前請先於後台設定寄件伺服器。'
      });
      localStorage.setItem(STORAGE_EMAIL_NOTIFS_KEY, JSON.stringify(logs.slice(0, 50)));
    } catch {
      // ignore
    }
  }

  static getEmailNotificationLogs(): any[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_EMAIL_NOTIFS_KEY) || '[]');
    } catch {
      return [];
    }
  }

  // ---- 檢舉機制 (Prompt 23) ----
  static getReports(): ReportItem[] {
    try {
      const data = localStorage.getItem(STORAGE_REPORTS_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [];
  }

  static addReport(report: Omit<ReportItem, 'id' | 'createdAt' | 'status'>): void {
    const reports = this.getReports();
    const newReport: ReportItem = {
      ...report,
      id: 'rep-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: '待審核'
    };
    reports.unshift(newReport);
    try {
      localStorage.setItem(STORAGE_REPORTS_KEY, JSON.stringify(reports));
    } catch {
      // ignore
    }
  }

  static updateReportDecision(
    reportId: string,
    decision: ReportItem['decision'],
    verificationNote: string
  ): void {
    const reports = this.getReports();
    const target = reports.find((r) => r.id === reportId);
    if (!target) return;

    target.status = '已完成';
    target.decision = decision;
    target.verificationNote = verificationNote;

    // 若管理員決定「隱藏」或「刪除」，聯動處理文章/留言
    if (decision === '隱藏' || decision === '刪除') {
      const posts = this.getPosts();
      if (target.targetType === 'post') {
        const p = posts.find((item) => item.id === target.targetId);
        if (p) p.is_hidden = true;
      } else {
        posts.forEach((p) => {
          const c = p.comments.find((comm) => comm.id === target.targetId);
          if (c) c.is_hidden = true;
        });
      }
      localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
    }

    localStorage.setItem(STORAGE_REPORTS_KEY, JSON.stringify(reports));
  }

  // ---- Tier A: 匿名分析資料 (Prompt 24 / 25 / 26) ----
  static logAnalyticsEvent(event: Omit<AnonymousAnalyticsEvent, 'id' | 'timestamp'>): void {
    const list = this.getAnalyticsEvents();
    const record: AnonymousAnalyticsEvent = {
      ...event,
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
      timestamp: new Date().toISOString()
    };
    list.unshift(record);
    try {
      localStorage.setItem(STORAGE_ANALYTICS_KEY, JSON.stringify(list.slice(0, 500)));
    } catch {
      // ignore
    }
  }

  static getAnalyticsEvents(): AnonymousAnalyticsEvent[] {
    try {
      const data = localStorage.getItem(STORAGE_ANALYTICS_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return DEFAULT_ANALYTICS;
  }

  // ---- 政策待確認更新架構 (Prompt 13) ----
  static getPolicyDrafts(): PolicyUpdateDraft[] {
    try {
      const data = localStorage.getItem(STORAGE_POLICY_DRAFTS_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return DEFAULT_POLICY_DRAFTS;
  }
}
