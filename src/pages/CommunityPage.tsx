import React, { useState, useEffect } from 'react';
import { PageId, CommunityPost, CommunityComment } from '../types';
import { StorageService } from '../services/storageService';
import {
  MessageCircle,
  PlusCircle,
  ShieldAlert,
  Send,
  Flag,
  CheckCircle2,
  AlertCircle,
  X,
  Heart,
  BookOpen
} from 'lucide-react';

interface CommunityPageProps {
  onNavigate: (page: PageId) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState<boolean>(false);

  // New Post Form State (Prompt 20)
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [postCategory, setPostCategory] = useState<CommunityPost['category']>('我的照顧經驗');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [wantNotification, setWantNotification] = useState(true);
  const [agreedGuidelines, setAgreedGuidelines] = useState(false);

  // New Comment input map
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  // Report Modal State (Prompt 23)
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{
    targetType: 'post' | 'comment';
    targetId: string;
    titleOrSnippet: string;
  } | null>(null);
  const [reportReason, setReportReason] = useState<
    '錯誤福利資訊' | '醫療錯誤資訊' | '詐騙／廣告' | '人身攻擊' | '隱私' | '不當內容' | '其他'
  >('錯誤福利資訊');
  const [reportDescription, setReportDescription] = useState('');
  const [reportSuccessMsg, setReportSuccessMsg] = useState(false);

  useEffect(() => {
    setPosts(StorageService.getPosts());
  }, []);

  const refreshPosts = () => {
    setPosts(StorageService.getPosts());
  };

  const categories = [
    { id: 'all', label: '全部文章' },
    { id: '我想說說話', label: '我想說說話' },
    { id: '我遇到問題', label: '我遇到問題' },
    { id: '我的照顧經驗', label: '我的照顧經驗' },
    { id: '我發現一個有用資源', label: '我發現一個有用資源' },
    { id: '福利／政策資訊分享', label: '福利／政策資訊分享' }
  ];

  const filteredPosts = posts.filter((p) => {
    if (p.is_hidden) return false;
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  // Handle Post Submit (Prompt 20)
  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !content.trim()) {
      alert('請填寫暱稱、文章標題與內容。');
      return;
    }
    if (!agreedGuidelines) {
      alert('發文前請先閱讀並勾選同意社群交流規範。');
      return;
    }

    const newPost: CommunityPost = {
      id: 'post-' + Date.now(),
      category: postCategory,
      title: title.trim(),
      author: author.trim(),
      date: new Date().toISOString().split('T')[0],
      content: content.trim(),
      want_notification: wantNotification,
      comments: []
    };

    StorageService.savePost(newPost, email);
    refreshPosts();

    // Reset Form
    setAuthor('');
    setEmail('');
    setTitle('');
    setContent('');
    setAgreedGuidelines(false);
    setShowNewPostModal(false);
  };

  // Handle Comment Submit (Prompt 21)
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: CommunityComment = {
      id: 'comm-' + Date.now(),
      postId,
      author: '熱心陪伴者',
      content: text,
      date: new Date().toISOString().split('T')[0]
    };

    StorageService.addComment(postId, newComment);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    refreshPosts();
  };

  const toggleCommentsView = (postId: string) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Handle Open Report Modal (Prompt 23)
  const handleOpenReport = (
    targetType: 'post' | 'comment',
    targetId: string,
    titleOrSnippet: string
  ) => {
    setReportTarget({ targetType, targetId, titleOrSnippet });
    setReportReason('錯誤福利資訊');
    setReportDescription('');
    setReportSuccessMsg(false);
    setReportModalOpen(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTarget) return;

    StorageService.addReport({
      targetType: reportTarget.targetType,
      targetId: reportTarget.targetId,
      targetTitleOrSnippet: reportTarget.titleOrSnippet,
      reason: reportReason,
      description: reportDescription
    });

    setReportSuccessMsg(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReportTarget(null);
      setReportSuccessMsg(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#A05C3B] uppercase">
          彼此打氣 · 溫暖互助
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#2D2A26]">
          交流專區：照顧者經驗與心聲
        </h1>
        <p className="text-base sm:text-lg text-[#5A4E42] max-w-2xl mx-auto leading-relaxed">
          不用獨自承受所有重量。這裡有走過相同道路的家庭，分享最真實的淚水、笑聲與走過來的智慧。
        </p>
      </div>

      {/* Top Bar: Code of Care and Post Action */}
      <div className="bg-[#FAF7F2] border border-[#DDD0BD] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-[#665849]">
        <div className="flex items-center gap-2.5">
          <Heart className="w-5 h-5 text-[#D96B43] shrink-0" />
          <span>
            <strong>社群交流原則：</strong>
            傾聽不批判、保護長輩個人隱私、不進行商業推銷、非醫療診斷。
          </span>
          <button
            onClick={() => setShowGuidelinesModal(true)}
            className="text-[#C46D52] underline font-semibold hover:text-[#9A3412]"
          >
            閱讀完整社群規範
          </button>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#D96B43] hover:bg-[#C2562E] text-white text-sm font-bold rounded-xl shrink-0 transition-colors shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>發布文章／提問</span>
        </button>
      </div>

      {/* Category Filter (Prompt 19: 分類篩選，無競爭性人氣排名) */}
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
                  : 'text-[#615243] hover:text-[#2D2A26]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Post List (Prompt 19: 顯示分類、標題、暱稱、日期、回覆數) */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-[#FAF7F2] border border-[#DDD0BD] rounded-3xl text-[#7A6B5C]">
            <p className="font-semibold text-lg">目前此分類尚無文章</p>
            <p className="text-sm mt-1">歡迎點擊上方「發布文章／提問」，成為第一個分享的照顧者。</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#FAF7F2] border border-[#DDD0BD] hover:border-[#D5C4AC] rounded-3xl p-6 sm:p-7 space-y-4 shadow-xs"
            >
              {/* Post Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAE0D1] pb-3">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#7A6B5C]">
                    <span className="font-bold text-[#A05C3B] bg-[#EFE5D5] px-2 py-0.5 rounded-sm">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-[#2D2A26]">{post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2D2A26] mt-1.5">
                    {post.title}
                  </h2>
                </div>

                {/* Prompt 23 Report button on post */}
                <button
                  onClick={() => handleOpenReport('post', post.id, post.title)}
                  className="inline-flex items-center gap-1 text-xs text-[#8C7A6B] hover:text-[#DC2626] transition-colors self-start sm:self-center"
                  title="檢舉此文章"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>檢舉</span>
                </button>
              </div>

              {/* Post Content */}
              <p className="text-base text-[#473B2F] leading-relaxed whitespace-pre-line">
                {post.content}
              </p>

              {/* Action Bar (Comments count and toggle) */}
              <div className="pt-2 border-t border-[#EAE0D1] flex items-center justify-between text-xs sm:text-sm">
                <button
                  onClick={() => toggleCommentsView(post.id)}
                  className="inline-flex items-center gap-1.5 text-[#5C4F42] hover:text-[#C46D52] font-semibold"
                >
                  <MessageCircle className="w-4 h-4 text-[#D96B43]" />
                  <span>
                    {post.comments.filter((c) => !c.is_hidden).length} 則回覆與支持
                  </span>
                </button>

                {post.want_notification && (
                  <span className="text-[11px] text-[#8C7A6B]">
                    （作者開啟了回覆提醒）
                  </span>
                )}
              </div>

              {/* Comments Section (Expanded by default or toggle) */}
              <div className="space-y-3 pt-2">
                {post.comments
                  .filter((c) => !c.is_hidden)
                  .map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-white p-3.5 rounded-xl border border-[#E5DAC8] text-xs sm:text-sm space-y-1"
                    >
                      <div className="flex items-center justify-between text-[#7A6B5C]">
                        <span className="font-bold text-[#2D2A26]">{comment.author}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px]">{comment.date}</span>
                          <button
                            onClick={() =>
                              handleOpenReport('comment', comment.id, comment.content)
                            }
                            className="text-[#8C7A6B] hover:text-[#DC2626] text-[11px]"
                            title="檢舉此留言"
                          >
                            檢舉
                          </button>
                        </div>
                      </div>
                      <p className="text-[#54473A] leading-relaxed">{comment.content}</p>
                    </div>
                  ))}

                {/* Quick reply box */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                    placeholder="留下一句鼓勵的話，或分享你的經驗..."
                    className="flex-1 p-2.5 bg-white border border-[#DDD0BD] rounded-xl text-xs sm:text-sm text-[#2D2A26] placeholder-[#9E8E7D] focus:outline-none focus:border-[#C46D52]"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-4 py-2.5 bg-[#EAE0D0] hover:bg-[#D5C4AC] text-[#473B2F] font-semibold text-xs sm:text-sm rounded-xl transition-colors inline-flex items-center gap-1 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>回覆</span>
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* ========================================================
          PROMPT 20: 免註冊發文 Modal
          ======================================================== */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto border border-[#E5DAC8]">
            <div className="flex items-center justify-between border-b border-[#EAE0D1] pb-3">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#2D2A26]">發布分享或提問</h2>
                <p className="text-xs text-[#7A6B5C]">無需註冊即可發布，請共同維護溫暖無壓力的氛圍。</p>
              </div>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="p-1 text-[#8C7A6B] hover:text-[#2D2A26]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPost} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#473B2F] mb-1">
                    暱稱或稱謂 *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="例如：小美（女兒）"
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm focus:outline-none focus:border-[#C46D52]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#473B2F] mb-1">
                    文章分類 *
                  </label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm focus:outline-none focus:border-[#C46D52]"
                  >
                    <option value="我的照顧經驗">我的照顧經驗</option>
                    <option value="我遇到問題">我遇到問題</option>
                    <option value="我想說說話">我想說說話</option>
                    <option value="我發現一個有用資源">我發現一個有用資源</option>
                    <option value="福利／政策資訊分享">福利／政策資訊分享</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#473B2F] mb-1">
                  Email 電子信箱（選填，絕不公開）
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="僅用於重要回覆通知，不會顯示在文章中（選填）"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm focus:outline-none focus:border-[#C46D52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#473B2F] mb-1">文章標題 *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="簡明扼要寫下您的問題或分享主題..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm focus:outline-none focus:border-[#C46D52]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#473B2F] mb-1">內容描述 *</label>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="分享您的心境、當時如何解決問題、或目前的困擾...（請勿填寫長輩身分證、電話等個人隱私）"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-sm focus:outline-none focus:border-[#C46D52]"
                />
              </div>

              {/* Notification Checkbox (Prompt 20 & 21) */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="notifyCheck"
                  checked={wantNotification}
                  onChange={(e) => setWantNotification(e.target.checked)}
                  className="rounded text-[#D96B43] focus:ring-[#D96B43]"
                />
                <label htmlFor="notifyCheck" className="text-xs text-[#5C4F42]">
                  有人回覆這篇文章時，發送通知提醒我
                </label>
              </div>

              {/* Notice for Email setup status (Prompt 21) */}
              {wantNotification && (
                <div className="p-3 bg-[#FAF5EC] rounded-xl border border-[#E5DAC8] text-xs text-[#7A6B5C]">
                  <strong>系統透明通知：</strong>
                  目前站方尚未串接外部郵件發送服務（需設定 SMTP/SendGrid）。若有回覆，目前會將通知紀錄保存於後台模擬佇列。
                </div>
              )}

              {/* Agree to Community Guidelines (Prompt 20 & 22) */}
              <div className="flex items-start gap-2 pt-1 border-t border-[#EAE0D1]">
                <input
                  type="checkbox"
                  id="guidelineCheck"
                  required
                  checked={agreedGuidelines}
                  onChange={(e) => setAgreedGuidelines(e.target.checked)}
                  className="rounded text-[#D96B43] focus:ring-[#D96B43] mt-0.5"
                />
                <label htmlFor="guidelineCheck" className="text-xs text-[#5C4F42]">
                  我已閱讀並同意
                  <button
                    type="button"
                    onClick={() => setShowGuidelinesModal(true)}
                    className="text-[#C46D52] underline font-bold mx-1"
                  >
                    社群交流規範
                  </button>
                  （承諾不謾罵攻擊、不公開催眠廣告詐騙、不公開敏感個資、醫療經驗不作為保證療效之宣稱）。
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#EFE5D5] text-[#54483C] text-sm font-medium rounded-xl"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D96B43] hover:bg-[#C2562E] text-white text-sm font-bold rounded-xl shadow-xs transition-colors"
                >
                  發布文章
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          PROMPT 22: 社群規範 Modal
          ======================================================== */}
      {showGuidelinesModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto border border-[#E5DAC8]">
            <div className="flex items-center justify-between border-b border-[#EAE0D1] pb-3">
              <h3 className="text-xl font-bold font-serif text-[#2D2A26] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#C46D52]" />
                社群交流規範
              </h3>
              <button
                onClick={() => setShowGuidelinesModal(false)}
                className="p-1 text-[#8C7A6B] hover:text-[#2D2A26]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-[#473B2F] space-y-3 leading-relaxed">
              <p className="font-semibold text-[#8C3B18]">
                為了給每一位正在辛苦照顧長輩的家屬一個安全、溫暖、不被干擾的交流空間，請務必共同遵守以下原則：
              </p>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8] space-y-1.5">
                <strong className="text-[#B45309] block">【嚴格禁止行為】</strong>
                <ul className="list-disc list-inside space-y-1 text-[#5C4F42]">
                  <li>禁止謾罵、霸凌、歧視、騷擾、威脅或惡意人身攻擊。</li>
                  <li>禁止任何形式之商業廣告、保健品直銷推銷與業務招攬。</li>
                  <li>禁止未經主管機關核准之募款或金錢索求行為。</li>
                  <li>禁止故意散播錯誤不實之政府福利與法規訊息。</li>
                </ul>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E5DAC8] space-y-1.5">
                <strong className="text-[#B45309] block">【隱私與醫療保護】</strong>
                <ul className="list-disc list-inside space-y-1 text-[#5C4F42]">
                  <li>絕對不要在文章或留言中公開長輩或自己的真實姓名、身分證字號、詳細門牌住址、電話或病歷號。</li>
                  <li>個人就醫與照護經驗純屬個人心得，不得宣稱為任何醫療診斷或保證療效。</li>
                </ul>
              </div>

              <div className="p-3 bg-[#FFF9EE] rounded-xl border-l-4 border-[#E5A93C] text-xs text-[#7A6B5C]">
                <strong>站方管理準則：</strong>
                站方有權隱藏或刪除違反上述規範之內容。但站方絕不會因合情合理的照顧心態、不同經驗或意見分歧而刪除使用者的真心分享。
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setShowGuidelinesModal(false)}
                className="px-5 py-2 bg-[#D96B43] text-white text-xs sm:text-sm font-bold rounded-xl"
              >
                我已了解
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PROMPT 23: 檢舉 Modal
          ======================================================== */}
      {reportModalOpen && reportTarget && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#E5DAC8]">
            <div className="flex items-center justify-between border-b border-[#EAE0D1] pb-3">
              <h3 className="text-lg font-bold font-serif text-[#2D2A26] flex items-center gap-1.5">
                <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
                檢舉內容通報
              </h3>
              <button
                onClick={() => setReportModalOpen(false)}
                className="p-1 text-[#8C7A6B] hover:text-[#2D2A26]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {reportSuccessMsg ? (
              <div className="p-6 text-center space-y-2 text-[#2E7D32]">
                <CheckCircle2 className="w-10 h-10 mx-auto" />
                <p className="font-bold text-base">檢舉已送達站長審核隊列</p>
                <p className="text-xs text-[#5C4F42]">
                  感謝您的守護。站長團隊會依照官方來源進行查證，並依規範做出審查處置。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReport} className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-xs text-[#7A6B5C]">被檢舉內容：</span>
                  <p className="font-medium text-[#2D2A26] line-clamp-2 bg-[#FAF7F2] p-2 rounded-lg border border-[#E5DAC8] mt-0.5">
                    {reportTarget.titleOrSnippet}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#473B2F] mb-1">
                    請選擇檢舉理由 *
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#C46D52]"
                  >
                    <option value="錯誤福利資訊">錯誤福利資訊（政策不實）</option>
                    <option value="醫療錯誤資訊">醫療錯誤資訊（誇大療效）</option>
                    <option value="詐騙／廣告">詐騙／廣告招攬</option>
                    <option value="人身攻擊">人身攻擊、惡意謾罵</option>
                    <option value="隱私">外洩個人隱私與個資</option>
                    <option value="不當內容">不當內容</option>
                    <option value="其他">其他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#473B2F] mb-1">
                    具體說明（選填）
                  </label>
                  <textarea
                    rows={3}
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="請簡要說明您認為此內容有問題的原因或相關官方正確來源..."
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#DDD0BD] rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#C46D52]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#EFE5D5] text-[#54483C] text-xs rounded-xl"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    確認送出檢舉
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
