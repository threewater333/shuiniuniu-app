(function () {
  'use strict';
  var STORAGE_KEY = 'cc-workbench-v2';
  var SIDEBAR_KEY = 'shuiniuniu-sidebar-collapsed';
  var today = new Date();
  var todayText = today.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', weekday: 'short' });

  // ===== INJECT CSS FOR NEW MODULES =====
  (function () {
    var s = document.createElement('style');
    s.textContent =
      /* Module panel switching */
      '.module-panel{display:none}' +
      '.module-panel.active-module{display:block}' +
      /* Packing section color */
      '.color-packing h2 .tag{background:rgba(161,194,177,.22);color:var(--green-deep)}' +
      '.color-packing{border-left:3px solid var(--travel-color)}' +
      /* Expense section color */
      '.color-expense h2 .tag{background:rgba(230,166,172,.18);color:var(--pink-deep)}' +
      '.color-expense{border-left:3px solid var(--pink-mid)}' +
      /* Packing items */
      '.packing-stats{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}' +
      '.packing-stats-text{font-size:13px;color:var(--muted)}' +
      '.packing-stats-text strong{color:var(--travel-color)}' +
      '.packing-progress-bar{height:6px;border-radius:999px;background:var(--rule);overflow:hidden;width:100%;max-width:200px;flex:1;margin-left:12px}' +
      '.packing-progress-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--green-mid),var(--pink-mid));transition:width .4s ease}' +
      '.packing-category-group{margin-bottom:16px}' +
      '.packing-category-header{font-size:12px;font-weight:700;color:var(--muted);margin-bottom:8px;padding-left:2px;letter-spacing:.04em}' +
      '.packing-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid var(--rule);border-radius:12px;background:var(--bg);margin-bottom:6px;cursor:pointer;transition:border-color .15s,opacity .15s}' +
      '.packing-item:hover{border-color:var(--travel-color)}' +
      '.packing-circle{width:22px;height:22px;border-radius:50%;border:2.5px solid var(--rule);flex-shrink:0;position:relative;transition:all .2s ease;background:#fff}' +
      '.packing-circle::after{content:"";position:absolute;left:5.5px;top:1.5px;width:7px;height:12px;border:solid #fff;border-width:0 2.5px 2.5px 0;transform:rotate(45deg) scale(0);transition:transform .15s ease}' +
      '.packing-item.checked .packing-circle{background:var(--green-deep);border-color:var(--green-deep);box-shadow:0 0 0 3px rgba(161,194,177,.26)}' +
      '.packing-item.checked .packing-circle::after{transform:rotate(45deg) scale(1)}' +
      '.packing-item.checked .packing-name{text-decoration:line-through;color:var(--muted)}' +
      '.packing-name{font-size:14px;font-weight:600;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
      '.packing-delete{margin-left:auto;font-size:12px;color:var(--pink-deep);cursor:pointer;opacity:0;transition:opacity .15s;padding:4px 8px;border-radius:8px;background:none;border:none;font-family:inherit;font-weight:600;white-space:nowrap}' +
      '.packing-delete:hover{background:rgba(230,166,172,.18);color:var(--pink-deep)}' +
      '.packing-item:hover .packing-delete{opacity:1}' +
      /* Expenses */
      '.expense-stats{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px}' +
      '.expense-stats-text{font-size:13px;color:var(--muted)}' +
      '.expense-stats-text strong{color:var(--pink-deep)}' +
      '.expense-date-group{margin-bottom:16px}' +
      '.expense-date-header{display:flex;justify-content:space-between;align-items:center;padding:8px 4px;border-bottom:2px solid var(--rule);margin-bottom:8px}' +
      '.expense-date-label{font-size:14px;font-weight:700}' +
      '.expense-date-total{font-size:14px;font-weight:700;color:var(--pink-deep)}' +
      '.expense-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid var(--rule);border-radius:12px;background:var(--bg);margin-bottom:6px;transition:border-color .15s}' +
      '.expense-item:hover{border-color:var(--accent)}' +
      '.expense-icon{font-size:20px;flex-shrink:0;width:28px;text-align:center}' +
      '.expense-info{flex:1;min-width:0}' +
      '.expense-cat{font-size:13px;font-weight:700}' +
      '.expense-note{font-size:12px;color:var(--muted);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
      '.expense-amount{font-size:15px;font-weight:800;color:var(--ink);white-space:nowrap}' +
      '.expense-delete{font-size:12px;color:var(--pink-deep);cursor:pointer;opacity:0;transition:opacity .15s;padding:4px 8px;border-radius:8px;background:none;border:none;font-family:inherit;font-weight:600;white-space:nowrap}' +
      '.expense-delete:hover{background:rgba(230,166,172,.18);color:var(--pink-deep)}' +
      '.expense-item:hover .expense-delete{opacity:1}' +
      /* Calories */
      '.calorie-mode-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:14px}' +
      '.calorie-calc-card{border:1px solid var(--rule);border-radius:18px;background:var(--bg);padding:14px}' +
      '.calorie-calc-card h3{font-size:14px;margin-bottom:4px;color:var(--ink)}' +
      '.calorie-calc-card p{font-size:12px;color:var(--muted);margin-bottom:10px}' +
      '.calorie-result{border:1px solid var(--rule);border-radius:18px;background:linear-gradient(110deg,rgba(230,166,172,.16),rgba(183,213,198,.18));padding:14px;margin-bottom:14px}' +
      '.calorie-result strong{font-size:22px;color:var(--pink-deep)}' +
      '.calorie-list-title{font-size:13px;font-weight:800;margin:10px 0;color:var(--muted)}' +
      '.calorie-item{display:flex;align-items:center;gap:10px;padding:10px 14px;border:1px solid var(--rule);border-radius:12px;background:var(--bg);margin-bottom:6px}' +
      '.calorie-info{flex:1;min-width:0}' +
      '.calorie-name{font-size:14px;font-weight:800;color:var(--ink)}' +
      '.calorie-meta{font-size:12px;color:var(--muted);margin-top:2px}' +
      '.calorie-kcal{font-size:16px;font-weight:900;color:var(--green-deep);white-space:nowrap}' +
      /* Daily updates and favorites */
      '.update-section{border:1px solid var(--rule);border-radius:20px;background:rgba(255,255,255,.68);padding:14px;margin-bottom:18px}' +
      '.sub-tab-bar{display:flex;gap:8px;align-items:center;margin-bottom:12px;flex-wrap:wrap}' +
      '.sub-tab{border:1px solid var(--rule);background:var(--bg2);color:var(--muted);font-family:inherit;font-size:12px;font-weight:800;border-radius:999px;padding:7px 14px;cursor:pointer;transition:all .15s var(--ease)}' +
      '.sub-tab:hover{border-color:var(--accent);color:var(--ink)}' +
      '.sub-tab.active{background:linear-gradient(135deg,var(--pink-mid),var(--green-mid));border-color:transparent;color:#fff;box-shadow:0 8px 20px rgba(212,141,149,.22)}' +
      '.update-list{display:grid;gap:10px}' +
      '.update-card{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:start;border:1px solid var(--rule);border-radius:16px;background:var(--bg2);padding:13px 14px;box-shadow:var(--shadow-sm)}' +
      '.update-title{font-size:14px;font-weight:800;color:var(--ink);text-decoration:none;line-height:1.45}' +
      '.update-title:hover{color:var(--pink-deep);text-decoration:underline}' +
      '.update-meta{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:5px 0 6px;font-size:11.5px;color:var(--muted)}' +
      '.update-summary{font-size:12.5px;color:var(--muted);line-height:1.6}' +
      '.star-btn{border:none;background:transparent;color:var(--pink-deep);font-size:24px;line-height:1;cursor:pointer;padding:0 2px;transition:transform .15s var(--ease),color .15s}' +
      '.star-btn:hover{transform:scale(1.12)}' +
      '.star-btn.filled{color:var(--pink-deep)}' +
      '.favorite-star{font-size:20px;color:var(--pink-deep)}' +
      '.update-empty{border:1px dashed var(--rule);border-radius:16px;padding:18px;text-align:center;color:var(--muted);font-size:13px;background:rgba(255,255,255,.5)}' +
      '@media(max-width:760px){.calorie-mode-grid{grid-template-columns:1fr}.update-card{grid-template-columns:1fr}.star-btn{justify-self:end}}';
    document.head.appendChild(s);
  })();

  // ===== CONSTANTS =====
  var EXPENSE_CATEGORIES = { '打车': '\uD83D\uDE95', '飞机': '\u2708\uFE0F', '高铁': '\uD83D\uDE84', '\u4F4F\u5BBF': '\uD83C\uDFE8', '\u996E\u98DF': '\uD83C\uDF5C', '\u666F\u533A': '\uD83C\uDFDE\uFE0F', '\u5176\u4ED6': '\uD83D\uDCE6' };
  var PACKING_CATEGORIES = ['证件', '衣物', '电子产品', '洗漱用品', '药品'];
  var MODULE_META = {
    todos: { title: '每日待办事项', desc: '安排今天要完成的任务，按优先级和时间推进。' },
    reading: { title: '阅读记录', desc: '记录小说名称、主要内容和可转化为账号素材的阅读线索。' },
    writing: { title: '公文写作任务', desc: '管理公文写作计划、方法库与体制内新闻稿参考。' },
    travel: { title: '旅行计划', desc: '集中管理行程、地图、携带物品、旅行记账和热量计算。' },
    hotspot: { title: '热点与素材订阅', desc: '追踪抖音、小红书等平台的小说阅读热点和选题方向。' },
    media: { title: '好文推荐', desc: '收藏和拆解人民日报、新华社、解放军报等主流媒体稿件。' },
    english: { title: '英语学习', desc: '每日英语文章精读，支持逐句对照、朗读和单词训练。' },
    photo: { title: '拍照教学', desc: '沉淀拍照场景、参考链接和拍摄教学素材。' }
  };

  // ===== SAMPLE DATA =====
  var sampleData = {
    todos: [
      { id: uid(), title: '整理今天的小说阅读素材', priority: '高', time: '09:30', done: false },
      { id: uid(), title: '学习公文写作方法库 - 通知格式', priority: '高', time: '10:00', done: false },
      { id: uid(), title: '汇总人民日报新闻稿标题结构', priority: '中', time: '14:00', done: false },
      { id: uid(), title: '编写活动新闻稿初稿', priority: '中', time: '15:30', done: false },
      { id: uid(), title: '确认周末旅行交通方案', priority: '低', time: '20:00', done: true }
    ],
    novels: [
      {
        id: uid(), title: '长安的荔枝', author: '马伯庸',
        tags: ['历史', '悬疑'],
        content: '天宝十四年，长安城的小吏李善德突然接到一个任务：要在贵妃诞日之前，从岭南运来新鲜荔枝。荔枝保鲜期只有三天，而岭南距长安五千余里...',
        progress: 65, note: '小人物执行高难任务，主线清晰、压力递进。适合拆解为"任务型叙事"选题。开篇即入冲突的写法值得借鉴。'
      },
      {
        id: uid(), title: '三体', author: '刘慈欣',
        tags: ['科幻', '硬核'],
        content: '文化大革命如火如荼进行的同时，军方探寻外星文明的绝秘计划"红岸工程"取得了突破性进展...',
        progress: 100, note: '宏大叙事与微观人物交织。黑暗森林法则、降维打击等概念已成为文化符号。适合做"硬核科普+小说推荐"类内容。'
      },
      {
        id: uid(), title: '坏小孩', author: '紫金陈',
        tags: ['悬疑', '社会'],
        content: '三个孩子，在暑假期间无意目击了一场谋杀案。为了保护自己，他们精心策划了一场完美的犯罪...',
        progress: 30, note: '开篇制造反常识悬念，中段埋误导线索，结尾反转。适合提炼短视频开头钩子。'
      }
    ],
    writing: [
      { id: uid(), title: '部门会议通知', type: '通知', reference: '结构：依据→事项→时间地点→参会要求→联系人', done: false },
      { id: uid(), title: '活动新闻稿标题库', type: '新闻稿', reference: '参考人民日报导语：先写核心事实，再写背景意义和成效', done: false },
      { id: uid(), title: '上半年工作总结框架', type: '总结', reference: '框架：总体概述→主要做法和成效→存在不足→下一步打算', done: false }
    ],
    writingDailyUpdates: [
      { id: 'writing-20260723-01', source: '国务院公报', title: '国务院关于修改和废止部分行政法规的决定', date: '2026-07-23', summary: '文种类型：决定。适合学习规范性文件标题、条款式正文和政策依据表达。', url: 'https://www.gov.cn/zhengce/content/202506/content_7027713.htm' },
      { id: 'writing-20260722-01', source: '党建网', title: '以高质量党建引领基层治理提质增效', date: '2026-07-22', summary: '文种类型：党建评论。适合积累“党建引领、协同治理、闭环落实”等体制内表达。', url: 'https://www.dangjian.cn/shouye/dangjianyaowen/202506/t20250618_7012546.shtml' },
      { id: 'writing-20260721-01', source: '求是网', title: '坚持系统观念推动改革任务落地见效', date: '2026-07-21', summary: '文种类型：理论文章。可提炼总分结构、政治性表述和段落过渡句。', url: 'https://www.qstheory.cn/dukan/qs/2025-06/16/c_1130170734.htm' },
      { id: 'writing-20260720-01', source: '中国政府网', title: '关于进一步做好政务服务事项标准化工作的通知', date: '2026-07-20', summary: '文种类型：通知。重点参考“工作目标、重点任务、保障措施”的结构安排。', url: 'https://www.gov.cn/zhengce/zhengceku/202506/content_7028484.htm' }
    ],
    writingFavorites: [],
    travel: [
      {
        id: 'day1', label: 'Day 1', summary: '北京 → 锡林浩特 · 草原初印象',
        description: '从北京出发，乘坐高铁/飞机前往锡林浩特。沿途欣赏华北平原到内蒙古高原的过渡景观。下午抵达后入住酒店，傍晚前往贝子庙和额尔敦敖包山，感受这座草原城市的独特氛围。',
        timeline: [
          { time: '07:00', text: '北京出发（高铁/飞机）' },
          { time: '11:30', text: '抵达锡林浩特机场/站' },
          { time: '12:00', text: '午餐 - 蒙餐一条街' },
          { time: '14:00', text: '入住酒店，稍作休整' },
          { time: '16:00', text: '贝子庙参观' },
          { time: '18:00', text: '额尔敦敖包山看日落' },
          { time: '19:30', text: '晚餐 - 牧人餐厅' }
        ],
        accommodation: '锡林浩特大酒店（标间，约 ¥320/晚）',
        food: [
          { name: '蒙餐一条街', type: '餐饮', note: '奶茶、手把肉、奶皮子，体验正宗蒙餐' },
          { name: '牧人餐厅', type: '餐饮', note: '烤全羊、血肠、羊杂汤，口碑极好' },
          { name: '特色涮肉', type: '餐饮', note: '锡林郭勒羊肉品质极佳，铜锅涮肉必尝' }
        ],
        spots: [
          { name: '贝子庙', lat: 43.9447, lng: 116.0547, note: '内蒙古四大庙宇之一' },
          { name: '额尔敦敖包山', lat: 43.9512, lng: 116.0683, note: '城市制高点，可俯瞰全城' }
        ],
        stayCoord: { lat: 43.9350, lng: 116.0500, name: '锡林浩特大酒店' },
        foodCoords: [
          { name: '蒙餐一条街', lat: 43.9400, lng: 116.0450, note: '市区中心' },
          { name: '牧人餐厅', lat: 43.9420, lng: 116.0600, note: '贝子庙附近' },
          { name: '特色涮肉', lat: 43.9480, lng: 116.0550, note: '敖包山脚下' }
        ]
      },
      {
        id: 'day2', label: 'Day 2', summary: '锡林浩特 → 西乌珠穆沁 · 深入草原腹地',
        description: '早餐后出发前往西乌珠穆沁旗，沿途穿越广袤的锡林郭勒草原。途中在乌拉盖草原停留拍照，下午抵达西乌珠穆沁旗，参观蒙古族牧民家庭，体验骑马、射箭等草原活动。',
        timeline: [
          { time: '08:00', text: '酒店早餐' },
          { time: '09:00', text: '出发前往西乌珠穆沁旗（车程约3小时）' },
          { time: '10:00', text: '乌拉盖草原停留，拍照' },
          { time: '12:00', text: '路餐 / 牧民家简餐' },
          { time: '14:00', text: '抵达西乌珠穆沁旗' },
          { time: '15:00', text: '参观牧民家庭，体验骑马' },
          { time: '18:00', text: '返回锡林浩特' },
          { time: '20:00', text: '晚餐' }
        ],
        accommodation: '锡林浩特大酒店（续住）',
        food: [
          { name: '路餐补给', type: '餐饮', note: '自备干粮 + 沿途牧民家奶茶' },
          { name: '西乌旗晚餐', type: '餐饮', note: '返回后市区用餐' }
        ],
        spots: [
          { name: '乌拉盖草原', lat: 45.7500, lng: 118.8500, note: '最美草原公路' },
          { name: '西乌珠穆沁旗', lat: 44.0000, lng: 117.5000, note: '牧民文化体验' }
        ],
        stayCoord: { lat: 43.9350, lng: 116.0500, name: '锡林浩特大酒店' },
        foodCoords: []
      }
    ],
    hotspots: [
      { id: uid(), platform: '抖音', title: '小说推文账号：强冲突+悬念钩子', heat: '120万粉丝', link: '#', note: '标题套路分析：开头设悬念，中段反转，结尾留钩子' },
      { id: uid(), platform: '抖音', title: '好书推荐类账号运营技巧', heat: '85万粉丝', link: '#', note: '封面关键词：治愈、女性成长、反转' },
      { id: uid(), platform: '小红书', title: '读书笔记爆款封面公式', heat: '3.2万赞', link: '#', note: '排版规律：大标题+关键词标签+氛围感配图' },
      { id: uid(), platform: '小红书', title: '小说推荐笔记的高频标签', heat: '1.8万赞', link: '#', note: '#小说推荐 #好书分享 #读书笔记 #治愈系' }
    ],
    media: [
      { id: uid(), source: '人民日报', title: '以进一步全面深化改革开辟中国式现代化广阔前景', date: '2026-07-22', summary: '文章深入阐述党的二十届三中全会精神，强调要以改革创新为根本动力，推动高质量发展，加快建设社会主义现代化强国。', url: 'http://paper.people.com.cn/rmrb/html/2025-06/18/nw.D110000renmrb_20250618_1-01.htm' },
      { id: uid(), source: '人民日报', title: '凝聚起推进中国式现代化的磅礴力量', date: '2026-07-21', summary: '评论员文章指出，面对复杂严峻的国际形势和艰巨繁重的国内改革发展稳定任务，必须坚持和加强党的全面领导，凝聚全党全国各族人民的智慧和力量。', url: 'http://paper.people.com.cn/rmrb/html/2025-06/20/nw.D110000renmrb_20250620_1-01.htm' },
      { id: uid(), source: '解放军报', title: '锻造高素质新型军事人才方阵', date: '2026-07-22', summary: '报道我军深入推进军事人才培养体系改革，着力培养联合作战指挥人才、新型作战力量人才和高层次科技创新人才，为强军事业提供坚强人才支撑。', url: 'http://www.81.cn/szb_223187/szblb/index.html?paperName=jfjb&paperDate=2025-06-18&paperNumber=01&articleid=943049' },
      { id: uid(), source: '解放军报', title: '全面加强军事治理 提高国防和军队现代化水平', date: '2026-07-20', summary: '文章强调要按照国防和军队现代化新"三步走"战略安排，全面加强军事治理，确保如期实现建军一百年奋斗目标。', url: 'http://www.81.cn/szb_223187/szblb/index.html?paperName=jfjb&paperDate=2025-06-20&paperNumber=01&articleid=943210' },
      { id: uid(), source: '求是网', title: '坚持以人民为中心的发展思想', date: '2026-07-21', summary: '理论文章系统论述了以人民为中心发展思想的理论内涵和实践要求，强调人民是历史的创造者，是决定党和国家前途命运的根本力量。', url: 'https://www.qstheory.cn/dukan/qs/2025-06/01/c_1130167073.htm' },
      { id: uid(), source: '新华网', title: '时政新闻：中共中央政治局召开会议分析研究当前经济形势', date: '2026-07-22', summary: '会议指出，当前经济运行总体平稳、稳中有进，高质量发展扎实推进，但也要清醒看到面临的困难和挑战。', url: 'https://www.news.cn/politics/20250630/2c8f60c11188431f9295a83c0f6f6d21/c.html' }
    ],
    mediaDailyUpdates: [
      { id: 'media-20260723-01', source: '人民日报', title: '坚定不移推动高质量发展取得新成效', date: '2026-07-23', summary: '聚焦高质量发展、改革创新和民生保障，适合作为新闻稿导语和评论标题拆解素材。', url: 'http://paper.people.com.cn/rmrb/html/2025-06/19/nw.D110000renmrb_20250619_1-01.htm' },
      { id: 'media-20260723-02', source: '新华社', title: '上半年国民经济运行稳中有进', date: '2026-07-23', summary: '围绕宏观经济数据、政策成效和下一步重点工作展开，适合学习数据型新闻稿写法。', url: 'https://www.news.cn/fortune/20250715/7a4e33e5f3f04e5db7f4a5f0f7f4ec1a/c.html' },
      { id: 'media-20260722-01', source: '解放军报', title: '聚力练兵备战锻造胜战本领', date: '2026-07-22', summary: '报道基层部队实战化训练情况，可参考其“事实+细节+精神内核”的报道结构。', url: 'http://www.81.cn/szb_223187/szblb/index.html?paperName=jfjb&paperDate=2025-06-21&paperNumber=02&articleid=943286' },
      { id: 'media-20260721-01', source: '新华网', title: '各地扎实推进重点项目建设', date: '2026-07-21', summary: '以多地案例串联政策落地情况，适合积累综合报道中的并列式结构。', url: 'https://www.news.cn/local/20250623/0c5b1680b7904d9283d16e9be8740e7d/c.html' }
    ],
    mediaFavorites: [],
    packingItems: [
      { id: uid(), name: '身份证', category: '证件', packed: false },
      { id: uid(), name: '护照', category: '证件', packed: false },
      { id: uid(), name: '驾驶证', category: '证件', packed: true },
      { id: uid(), name: '酒店预订确认单', category: '证件', packed: true },
      { id: uid(), name: '机票/车票电子版', category: '证件', packed: true },
      { id: uid(), name: '内衣裤 x5', category: '衣物', packed: false },
      { id: uid(), name: 'T恤 x3', category: '衣物', packed: false },
      { id: uid(), name: '外套 x2', category: '衣物', packed: false },
      { id: uid(), name: '长裤 x3', category: '衣物', packed: false },
      { id: uid(), name: '运动鞋 x2', category: '衣物', packed: false },
      { id: uid(), name: '手机充电器', category: '电子产品', packed: true },
      { id: uid(), name: '充电宝', category: '电子产品', packed: false },
      { id: uid(), name: '耳机', category: '电子产品', packed: false },
      { id: uid(), name: '数据线', category: '电子产品', packed: true },
      { id: uid(), name: '相机', category: '电子产品', packed: false },
      { id: uid(), name: '牙刷', category: '洗漱用品', packed: false },
      { id: uid(), name: '牙膏', category: '洗漱用品', packed: false },
      { id: uid(), name: '洗发水', category: '洗漱用品', packed: false },
      { id: uid(), name: '防晒霜', category: '洗漱用品', packed: false },
      { id: uid(), name: '毛巾', category: '洗漱用品', packed: false },
      { id: uid(), name: '感冒药', category: '药品', packed: false },
      { id: uid(), name: '创可贴', category: '药品', packed: false },
      { id: uid(), name: '晕车药', category: '药品', packed: false },
      { id: uid(), name: '肠胃药', category: '药品', packed: false }
    ],
    expenses: [
      { id: uid(), date: '2026-07-25', category: '打车', amount: 45, note: '往机场打车' },
      { id: uid(), date: '2026-07-25', category: '飞机', amount: 1280, note: '北京-锡林浩特机票' },
      { id: uid(), date: '2026-07-25', category: '打车', amount: 35, note: '机场到酒店' },
      { id: uid(), date: '2026-07-26', category: '住宿', amount: 320, note: '锡林浩特大酒店' },
      { id: uid(), date: '2026-07-26', category: '饮食', amount: 88, note: '午餐蒙餐一条街' },
      { id: uid(), date: '2026-07-26', category: '景区', amount: 60, note: '贝子庙门票' },
      { id: uid(), date: '2026-07-26', category: '饮食', amount: 128, note: '晚餐牧人餐厅' },
      { id: uid(), date: '2026-07-27', category: '打车', amount: 80, note: '前往西乌珠穆沁旗' },
      { id: uid(), date: '2026-07-27', category: '饮食', amount: 65, note: '路餐补给' },
      { id: uid(), date: '2026-07-27', category: '其他', amount: 150, note: '骑马体验' }
    ],
    calorieItems: [
      { id: uid(), name: '酸奶', mode: '每100g千焦', kjPer100g: 360, weightG: 180, servingKj: 648, kcal: 154.9 },
      { id: uid(), name: '能量棒', mode: '单份千焦', servingKj: 890, kcal: 212.7 }
    ],
    englishArticles: [
      {
        title: 'Is the future of work remote?',
        source: 'BBC Worklife',
        sentences: [
          { en: 'The pandemic forced millions of people to work from home.', zh: '疫情迫使数百万人居家办公。' },
          { en: 'Now, many companies are adopting hybrid models.', zh: '如今，许多公司正在采用混合办公模式。' },
          { en: 'But not everyone agrees this is the best approach.', zh: '但并非所有人都认同这是最佳方式。' },
          { en: 'Some bosses want workers back in the office full-time.', zh: '一些老板希望员工全职回到办公室。' },
          { en: 'Research shows flexibility can boost productivity.', zh: '研究表明灵活性可以提高生产力。' },
          { en: 'The debate over remote work is far from settled.', zh: '关于远程办公的争论远未结束。' }
        ],
        words: ['pandemic', 'hybrid', 'flexibility', 'productivity', 'approach', 'debate']
      },
      {
        title: 'The science of sleep',
        source: 'BBC Future',
        sentences: [
          { en: 'Sleep is essential for both body and mind.', zh: '睡眠对身心都至关重要。' },
          { en: 'Adults typically need seven to nine hours per night.', zh: '成年人通常每晚需要七到九小时的睡眠。' },
          { en: 'Lack of sleep can affect memory and decision-making.', zh: '睡眠不足会影响记忆力和决策能力。' },
          { en: 'Blue light from screens can disrupt our sleep cycles.', zh: '屏幕发出的蓝光会扰乱我们的睡眠周期。' },
          { en: 'Experts recommend avoiding screens before bedtime.', zh: '专家建议睡前避免使用屏幕。' },
          { en: 'Good sleep habits are key to long-term health.', zh: '良好的睡眠习惯是长期健康的关键。' }
        ],
        words: ['essential', 'typically', 'disrupt', 'cycles', 'recommend', 'habits']
      },
      {
        title: 'How to learn a new language',
        source: 'BBC Learning English',
        sentences: [
          { en: 'Learning a new language opens doors to new cultures.', zh: '学习一门新语言为接触新文化打开了大门。' },
          { en: 'Consistency matters more than intensity.', zh: '持续性比强度更重要。' },
          { en: 'Even fifteen minutes a day can make a difference.', zh: '即使每天十五分钟也能产生影响。' },
          { en: 'Immersion helps speed up the learning process.', zh: '沉浸式学习有助于加快学习进程。' },
          { en: 'Making mistakes is a natural part of learning.', zh: '犯错是学习的自然组成部分。' },
          { en: 'Patience and practice lead to fluency.', zh: '耐心和练习会带来流利度。' }
        ],
        words: ['consistency', 'intensity', 'immersion', 'process', 'natural', 'fluency']
      }
    ],
    englishDailyUpdates: [
      {
        id: 'english-20260723-01', source: 'China Daily 英语点津', title: 'Phrase of the day: take the initiative', date: '2026-07-23', summary: '例句：Young professionals should take the initiative when learning new skills. 适合积累职场表达。', url: 'https://language.chinadaily.com.cn/',
        content: [
          { en: 'The phrase "take the initiative" means to act first or take the lead in doing something.', zh: '"take the initiative" 这个短语的意思是率先行动或在某事上起带头作用。' },
          { en: 'In the workplace, taking the initiative often leads to career advancement.', zh: '在职场中，主动采取行动往往能带来职业晋升。' },
          { en: 'Young professionals should take the initiative when learning new skills.', zh: '年轻职场人士在学习新技能时应该主动采取行动。' },
          { en: 'This expression emphasizes proactivity rather than waiting for instructions.', zh: '这个表达强调的是主动性，而不是等待指示。' },
          { en: 'Managers value employees who can take the initiative to solve problems.', zh: '管理者重视那些能主动解决问题的员工。' }
        ],
        vocabulary: [
          { word: 'initiative', phonetic: '/ɪˈnɪʃətɪv/', meaning: '主动性；倡议' },
          { word: 'professional', phonetic: '/prəˈfeʃənl/', meaning: '专业的；职业人士' },
          { word: 'advancement', phonetic: '/ədˈvænsmənt/', meaning: '晋升；进步' },
          { word: 'proactivity', phonetic: '/ˌproʊækˈtɪvɪti/', meaning: '主动性；积极性' }
        ]
      },
      {
        id: 'english-20260723-02', source: 'BBC Learning English', title: '6 Minute English: Why do we procrastinate?', date: '2026-07-23', summary: '围绕 procrastination 展开听力与词汇训练，适合30分钟精听和跟读。', url: 'https://www.bbc.co.uk/learningenglish/',
        content: [
          { en: 'Procrastination is the act of delaying or postponing tasks that need to be done.', zh: '拖延症是指延迟或推迟需要完成的任务的行为。' },
          { en: 'Many people procrastinate because they feel overwhelmed by the size of a task.', zh: '许多人拖延是因为他们觉得任务规模太大，令人不知所措。' },
          { en: 'Research suggests that procrastination is not about laziness, but about emotional regulation.', zh: '研究表明，拖延症与懒惰无关，而是与情绪调节有关。' },
          { en: 'When we procrastinate, we are often trying to avoid negative emotions associated with the task.', zh: '当我们拖延时，通常是在试图回避与任务相关的负面情绪。' },
          { en: 'Breaking large tasks into smaller steps can help reduce procrastination.', zh: '将大任务分解为小步骤有助于减少拖延。' }
        ],
        vocabulary: [
          { word: 'procrastination', phonetic: '/prəˌkræstɪˈneɪʃn/', meaning: '拖延；拖延症' },
          { word: 'postpone', phonetic: '/poʊˈspoʊn/', meaning: '推迟；延期' },
          { word: 'overwhelmed', phonetic: '/ˌoʊvərˈwelmd/', meaning: '不知所措的；不堪重负的' },
          { word: 'regulation', phonetic: '/ˌreɡjuˈleɪʃn/', meaning: '调节；管理' }
        ]
      },
      {
        id: 'english-20260722-01', source: 'VOA 慢速英语', title: 'Learning English: Daily habits for better speaking', date: '2026-07-22', summary: '慢速英语短文，关键词包括 routine、confidence、practice，可用于口语复述。', url: 'https://learningenglish.voanews.com/',
        content: [
          { en: 'Building confidence in speaking English requires consistent daily practice.', zh: '建立说英语的自信心需要持续的日常练习。' },
          { en: 'One effective habit is to read aloud for ten minutes every morning.', zh: '一个有效的习惯是每天早上大声朗读十分钟。' },
          { en: 'Recording yourself and listening back helps identify pronunciation problems.', zh: '录下自己的声音并回听有助于发现发音问题。' },
          { en: 'Shadowing native speakers by repeating what they say improves fluency.', zh: '通过跟读母语者的说话内容来提高流利度。' },
          { en: 'Setting small, achievable goals keeps motivation high over the long term.', zh: '设定小而可实现的目标有助于长期保持动力。' }
        ],
        vocabulary: [
          { word: 'confidence', phonetic: '/ˈkɑːnfɪdəns/', meaning: '信心；自信' },
          { word: 'consistent', phonetic: '/kənˈsɪstənt/', meaning: '一致的；持续的' },
          { word: 'pronunciation', phonetic: '/prəˌnʌnsiˈeɪʃn/', meaning: '发音' },
          { word: 'shadowing', phonetic: '/ˈʃædoʊɪŋ/', meaning: '跟读；影子练习' }
        ]
      },
      {
        id: 'english-20260721-01', source: 'BBC Learning English', title: 'The English We Speak: on the same page', date: '2026-07-21', summary: '每日短语：on the same page，表示"意见一致、理解一致"。', url: 'https://www.bbc.co.uk/learningenglish/',
        content: [
          { en: '"On the same page" is an idiom meaning that people agree or understand each other.', zh: '"on the same page" 是一个习语，意思是人们达成一致或相互理解。' },
          { en: 'Before starting a project, make sure everyone is on the same page.', zh: '在开始一个项目之前，确保每个人都意见一致。' },
          { en: 'The manager called a meeting to get everyone on the same page.', zh: '经理召开了一次会议，让所有人都达成共识。' },
          { en: 'If team members are not on the same page, misunderstandings can occur.', zh: '如果团队成员之间没有达成共识，就可能产生误解。' },
          { en: 'This phrase is commonly used in business and collaborative environments.', zh: '这个短语在商业和协作环境中经常使用。' }
        ],
        vocabulary: [
          { word: 'idiom', phonetic: '/ˈɪdiəm/', meaning: '习语；成语' },
          { word: 'collaborative', phonetic: '/kəˈlæbəreɪtɪv/', meaning: '协作的；合作的' },
          { word: 'misunderstanding', phonetic: '/ˌmɪsʌndərˈstændɪŋ/', meaning: '误解；误会' },
          { word: 'commonly', phonetic: '/ˈkɑːmənli/', meaning: '通常地；普遍地' }
        ]
      }
    ],
    englishFavorites: [],
    englishArticle: null,
    photoScenes: []
  };

  // ===== STATE =====
  var state = load();
  var ui = {
    query: '',
    hotspotPlatform: 'all',
    activeModule: 'todos',
    updateTabs: { writing: 'daily', media: 'daily', english: 'daily' },
    englishDetailTab: 'original',
    englishExpandedId: null
  };

  // ===== UTILITY =====
  function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }
  function load() { try { var r = localStorage.getItem(STORAGE_KEY); if (!r) return clone(sampleData); return Object.assign(clone(sampleData), JSON.parse(r)); } catch (e) { return clone(sampleData); } }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function esc(v) { return String(v || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function prioClass(p) { return p === '高' ? 'tag-high' : p === '中' ? 'tag-mid' : 'tag-low'; }
  function updateKeys(moduleKey) {
    return {
      daily: moduleKey + 'DailyUpdates',
      favorites: moduleKey + 'Favorites',
      dailyEl: moduleKey + 'DailyUpdates',
      favoriteEl: moduleKey + 'Favorites'
    };
  }
  function isFavorited(moduleKey, itemId) {
    var keys = updateKeys(moduleKey);
    return (state[keys.favorites] || []).some(function (f) { return f.originalId === itemId; });
  }
  function sortByDateDesc(items) {
    return (items || []).slice().sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });
  }
  function renderUpdateCard(moduleKey, item, mode) {
    var favored = mode === 'daily' && isFavorited(moduleKey, item.id);
    var href = item.url || '#';
    var star = mode === 'daily'
      ? '<button class="star-btn ' + (favored ? 'filled' : '') + '" title="' + (favored ? '取消收藏' : '加入收藏') + '" data-action="toggleFavorite" data-module-key="' + moduleKey + '" data-id="' + esc(item.id) + '">' + (favored ? '★' : '☆') + '</button>'
      : '<span class="favorite-star" title="已收藏">★</span>';
    var isEnglish = moduleKey === 'english';
    var titleHtml;
    if (isEnglish && mode === 'daily') {
      var expanded = ui.englishExpandedId === item.id;
      titleHtml = '<span class="update-title clickable" data-action="toggleEnglishDetail" data-id="' + esc(item.id) + '" title="点击展开详情">' + esc(item.title) + (expanded ? ' ▼' : ' ▶') + '</span>';
    } else {
      titleHtml = '<a class="update-title" href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(item.title) + '</a>';
    }
    var detailHtml = '';
    if (isEnglish && mode === 'daily' && ui.englishExpandedId === item.id) {
      detailHtml = renderEnglishDetailPanel(item);
    }
    return '<div class="update-card">' +
      '<div>' + titleHtml +
      '<div class="update-meta"><span class="tag tag-sky">' + esc(item.source || 'TRAE每日更新') + '</span><span>' + esc(item.date || item.time || '') + '</span></div>' +
      (item.summary ? '<div class="update-summary">' + esc(item.summary) + '</div>' : '') +
      detailHtml +
      '</div>' + star +
      '</div>';
  }
  function renderUpdateModule(moduleKey) {
    var keys = updateKeys(moduleKey);
    var dailyEl = document.getElementById(keys.dailyEl);
    var favEl = document.getElementById(keys.favoriteEl);
    if (!dailyEl || !favEl) return;
    var dailyItems = sortByDateDesc(state[keys.daily] || []);
    var favorites = (state[keys.favorites] || []).slice().sort(function (a, b) { return String(b.favoritedAt || '').localeCompare(String(a.favoritedAt || '')); });
    if (ui.query) {
      var q = ui.query.toLowerCase();
      dailyItems = dailyItems.filter(function (item) { return (item.title + ' ' + (item.summary || '') + ' ' + (item.source || '')).toLowerCase().indexOf(q) >= 0; });
      favorites = favorites.filter(function (item) { return (item.title + ' ' + (item.summary || '') + ' ' + (item.source || '')).toLowerCase().indexOf(q) >= 0; });
    }
    dailyEl.innerHTML = dailyItems.length
      ? '<div class="update-list">' + dailyItems.map(function (item) { return renderUpdateCard(moduleKey, item, 'daily'); }).join('') + '</div>'
      : '<div class="update-empty">暂无每日更新内容</div>';
    // For media favorites, render into a sub-container to preserve the fetch form
    var favListEl = favEl;
    if (moduleKey === 'media') {
      favListEl = document.getElementById('mediaFavoritesList');
      if (!favListEl) favListEl = favEl;
    }
    favListEl.innerHTML = favorites.length
      ? '<div class="update-list">' + favorites.map(function (item) { return renderUpdateCard(moduleKey, item, 'favorite'); }).join('') + '</div>'
      : '<div class="update-empty">收藏夹为空。可在“每日更新”中点击 ☆ 收藏单条内容，或使用上方“抓取”功能导入链接。</div>';
    var view = (ui.updateTabs && ui.updateTabs[moduleKey]) || 'daily';
    dailyEl.style.display = view === 'daily' ? 'block' : 'none';
    favEl.style.display = view === 'favorites' ? 'block' : 'none';
    document.querySelectorAll('[data-update-tabs="' + moduleKey + '"] .sub-tab').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-view') === view);
    });
  }

  // ===== ENGLISH DETAIL PANEL =====
  function speakText(text, rate) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate || 1;
    window.speechSynthesis.speak(u);
  }
  function highlightWords(sentence, vocabList) {
    if (!vocabList || !vocabList.length) return esc(sentence);
    var words = vocabList.map(function (v) { return v.word.toLowerCase(); });
    var result = sentence;
    vocabList.forEach(function (v) {
      var regex = new RegExp('\\b' + v.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      result = result.replace(regex, function (match) {
        return '<span class="word-highlight" data-word="' + esc(v.word) + '" data-phonetic="' + esc(v.phonetic) + '" data-meaning="' + esc(v.meaning) + '">' + match + '</span>';
      });
    });
    return result;
  }
  function renderEnglishDetailPanel(item) {
    var tab = ui.englishDetailTab || 'original';
    var content = item.content || [];
    var vocab = item.vocabulary || [];
    var speed = parseFloat(document.getElementById('englishSpeed') ? document.getElementById('englishSpeed').value : '1') || 1;
    var html = '<div class="english-detail-panel">' +
      '<div class="english-detail-toolbar">' +
      '<button class="tab-btn ' + (tab === 'original' ? 'active' : '') + '" data-action="englishDetailTab" data-tab="original">原文阅读</button>' +
      '<button class="tab-btn ' + (tab === 'bilingual' ? 'active' : '') + '" data-action="englishDetailTab" data-tab="bilingual">双语逐句对照</button>' +
      '<button class="tab-btn ' + (tab === 'vocabulary' ? 'active' : '') + '" data-action="englishDetailTab" data-tab="vocabulary">单词训练</button>' +
      '</div>';
    if (tab === 'original') {
      html += '<div class="english-detail-original">' + content.map(function (s) {
        return '<p style="margin-bottom:10px;">' + highlightWords(s.en, vocab) + '</p>';
      }).join('') + '</div>';
    } else if (tab === 'bilingual') {
      html += '<div class="english-detail-bilingual">' + content.map(function (s, idx) {
        return '<div class="bilingual-row">' +
          '<div class="bilingual-en">' + highlightWords(s.en, vocab) + '<button class="english-speak-btn" data-action="speakSentence" data-text="' + esc(s.en) + '">🔊 朗读</button></div>' +
          '<div class="bilingual-zh">' + esc(s.zh) + '</div>' +
          '</div>';
      }).join('') + '</div>';
    } else if (tab === 'vocabulary') {
      html += '<div class="english-detail-vocab">' + vocab.map(function (v) {
        return '<span class="vocab-chip" data-word="' + esc(v.word) + '" data-phonetic="' + esc(v.phonetic) + '" data-meaning="' + esc(v.meaning) + '">' + esc(v.word) + '<span class="v-phonetic">' + esc(v.phonetic) + '</span></span>';
      }).join('') + '</div>';
    }
    html += '<div style="margin-top:12px;font-size:12px;color:var(--muted);text-align:right;"><a href="' + esc(item.url || '#') + '" target="_blank" rel="noopener">查看原文来源 ↗</a></div>';
    html += '</div>';
    return html;
  }
  function showWordTooltip(el) {
    var word = el.getAttribute('data-word');
    var phonetic = el.getAttribute('data-phonetic');
    var meaning = el.getAttribute('data-meaning');
    if (!word) return;
    document.querySelectorAll('.word-tooltip').forEach(function (t) { t.remove(); });
    var rect = el.getBoundingClientRect();
    var tip = document.createElement('div');
    tip.className = 'word-tooltip';
    tip.innerHTML = '<button class="wt-close" data-action="closeTooltip">&times;</button>' +
      '<div class="wt-word">' + esc(word) + '</div>' +
      '<div class="wt-phonetic">' + esc(phonetic || '') + '</div>' +
      '<div class="wt-meaning">' + esc(meaning || '') + '</div>' +
      '<button class="wt-speak" data-action="speakWord" data-text="' + esc(word) + '">🔊 朗读</button>';
    document.body.appendChild(tip);
    var tipRect = tip.getBoundingClientRect();
    var top = rect.bottom + window.scrollY + 6;
    var left = rect.left + window.scrollX + rect.width / 2 - tipRect.width / 2;
    if (left < 8) left = 8;
    if (left + tipRect.width > window.innerWidth - 8) left = window.innerWidth - tipRect.width - 8;
    tip.style.top = top + 'px';
    tip.style.left = left + 'px';
  }
  function closeAllTooltips() {
    document.querySelectorAll('.word-tooltip').forEach(function (t) { t.remove(); });
  }

  // ===== MODULE SWITCHING =====
  function showModule(name) {
    ui.activeModule = name;
    document.querySelectorAll('.module-panel').forEach(function (p) { p.classList.remove('active-module'); });
    var target = document.getElementById('mod-' + name);
    if (target) target.classList.add('active-module');
    var meta = MODULE_META[name] || MODULE_META.todos;
    var titleEl = document.getElementById('currentModuleTitle');
    var descEl = document.getElementById('currentModuleDesc');
    if (titleEl) titleEl.textContent = meta.title;
    if (descEl) descEl.textContent = meta.desc;
    // 桌面端侧栏导航同步
    document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
    var navItem = document.querySelector('.nav-item[data-module="' + name + '"]');
    if (navItem) navItem.classList.add('active');
    // 移动端底部Tab同步
    document.querySelectorAll('#mobileTabBar .mtab').forEach(function (t) { t.classList.remove('active'); });
    var mtab = document.querySelector('#mobileTabBar .mtab[data-module="' + name + '"]');
    if (mtab) mtab.classList.add('active');
    document.body.classList.remove('drawer-open', 'drawer-runtime-open');
    document.documentElement.classList.remove('drawer-open', 'drawer-runtime-open');
    renderCurrentModule();
  }

  // ===== RENDER: SUMMARY =====
  function renderSummary() {
    var $ = function (id) { return document.getElementById(id); };
    if ($('todoCount')) $('todoCount').textContent = state.todos.filter(function (t) { return !t.done; }).length;
    if ($('readingCount')) $('readingCount').textContent = state.novels.length;
    if ($('writingCount')) $('writingCount').textContent = state.writing.filter(function (w) { return !w.done; }).length;
    if ($('travelCount')) $('travelCount').textContent = state.travel.length;
    if ($('hotspotCount')) $('hotspotCount').textContent = state.hotspots.length;
    if ($('mediaCount')) $('mediaCount').textContent = state.media.length;
    // 携带物品和旅行记账已并入旅行计划栏目，仅在旅行模块内展示
  }

  // ===== RENDER: TODOS =====
  function renderTodos() {
    var el = document.getElementById('todoList');
    var items = state.todos;
    if (ui.query) { var q = ui.query.toLowerCase(); items = items.filter(function (t) { return t.title.toLowerCase().indexOf(q) >= 0; }); }
    el.innerHTML = items.length ? items.map(function (t) {
      return '<div class="item ' + (t.done ? 'done' : '') + '">' +
        '<input type="checkbox" data-action="toggle" data-col="todos" data-id="' + t.id + '" ' + (t.done ? 'checked' : '') + '>' +
        '<div class="item-body"><div class="item-title">' + esc(t.title) + '</div>' +
        '<div class="item-meta"><span class="tag ' + prioClass(t.priority) + '">' + esc(t.priority) + '</span>' +
        (t.time ? '<span>' + esc(t.time) + '</span>' : '') + '</div></div>' +
        '<button class="icon-btn delete-btn" data-action="delete" data-col="todos" data-id="' + t.id + '">删除</button></div>';
    }).join('') : '<div class="empty">暂无待办事项</div>';
  }

  // ===== RENDER: NOVELS =====
  function renderNovels() {
    var el = document.getElementById('novelList');
    var items = state.novels;
    if (ui.query) { var q = ui.query.toLowerCase(); items = items.filter(function (n) { return n.title.toLowerCase().indexOf(q) >= 0 || n.author.toLowerCase().indexOf(q) >= 0; }); }
    el.innerHTML = items.length ? items.map(function (n) {
      return '<div class="novel-card">' +
        '<div class="novel-header" data-action="collapse" data-target="novel-' + n.id + '">' +
        '<span class="novel-title">' + esc(n.title) + '</span>' +
        '<span class="novel-author">' + esc(n.author) + '</span>' +
        '<div class="novel-tags">' + (n.tags || []).map(function (t) { return '<span class="tag tag-purple">' + esc(t) + '</span>'; }).join('') + '</div>' +
        '</div>' +
        '<div class="novel-body" id="novel-' + n.id + '" style="display:none">' +
        '<div class="novel-detail">' +
        '<div class="novel-cover">' + esc(n.title.charAt(0)) + '</div>' +
        '<div class="novel-info">' +
        '<h4>' + esc(n.title) + ' · ' + esc(n.author) + '</h4>' +
        '<p>' + esc(n.content) + '</p>' +
        '<div class="novel-progress"><div class="bar"><div class="bar-fill" style="width:' + (n.progress || 0) + '%"></div></div>' +
        '<div class="progress-text">阅读进度 ' + (n.progress || 0) + '%</div></div></div></div>' +
        '<div class="novel-note"><h4>我的读后感 / 笔记</h4>' +
        '<textarea data-action="note" data-col="novels" data-id="' + n.id + '" placeholder="记录你的读后感、可转化选题或金句...">' + esc(n.note || '') + '</textarea></div>' +
        '<div style="margin-top:8px;text-align:right">' +
        '<button class="icon-btn delete-btn" data-action="delete" data-col="novels" data-id="' + n.id + '">删除</button></div>' +
        '</div></div>';
    }).join('') : '<div class="empty">暂无小说记录，点击右上角添加</div>';
  }

  // ===== RENDER: WRITING TASKS =====
  function renderWritingTasks() {
    var el = document.getElementById('writingList');
    var items = state.writing;
    if (ui.query) { var q = ui.query.toLowerCase(); items = items.filter(function (w) { return w.title.toLowerCase().indexOf(q) >= 0; }); }
    el.innerHTML = items.length ? items.map(function (w) {
      return '<div class="item ' + (w.done ? 'done' : '') + '">' +
        '<input type="checkbox" data-action="toggle" data-col="writing" data-id="' + w.id + '" ' + (w.done ? 'checked' : '') + '>' +
        '<div class="item-body"><div class="item-title">' + esc(w.title) + '</div>' +
        '<div class="item-meta"><span class="tag tag-red">' + esc(w.type) + '</span>' +
        '<span>' + esc(w.reference || '') + '</span></div></div>' +
        '<button class="icon-btn delete-btn" data-action="delete" data-col="writing" data-id="' + w.id + '">删除</button></div>';
    }).join('') : '<div class="empty">暂无写作任务</div>';
  }

  // ===== RENDER: METHOD LIBRARY =====
  var methodData = null;
  function renderMethodLibrary() {
    if (!methodData) {
      methodData = [
        { category: '公文写作框架', items: [
          { title: '通知的写作框架', content: '正文一般包括：告知对象、告知事项、原因理由、落实要求。多数通知用条款格式，分条分款排列。结尾通常用"特此通知"。', example: 'XX省教育厅关于做好2026年秋季学期开学工作的通知' },
          { title: '请示的写作框架', content: '基本框架：请示理由——事项——要求。一文一事，结尾用语："以上请示妥否，请予批复"。', example: 'XX局关于追加2026年度专项经费的请示' },
          { title: '报告的写作框架', content: '基本框架：陈述基本情况→指明存在的问题→提出解决对策。注意：报告中不得夹带请示事项。', example: 'XX市人民政府关于2026年上半年工作情况的报告' },
          { title: '工作总结的写作框架', content: '框架：总体概述→主要工作和成效→存在不足→下一步打算。要在全面回顾的基础上提炼规律性认识和经验性做法。', example: 'XX局2026年度工作总结' }
        ] },
        { category: '标题拟制方法', items: [
          { title: '公文标题三要素法', content: '公文标题由发文机关名称+事由+文种组成。三要素均应完整，文种不可省略。', example: '《国务院办公厅关于加强和改进行政应诉工作的意见》' },
          { title: '转文类标题处理技巧', content: '可采取替代法、概括法、直转法解决标题中行文机关、介词"关于"及文种重复叠加问题。', example: '正确：《XX市人民政府转发国务院关于XX工作的通知》' }
        ] },
        { category: '常用句式和过渡语', items: [
          { title: '公文常用开头语', content: '通知类："为深入贯彻落实……""根据……要求"。报告类："现将有关情况报告如下："。批复类："你单位《关于XX的请示》收悉"。', example: '为深入贯彻落实党的二十大精神，根据《XX条例》要求，现就有关事项通知如下：' },
          { title: '公文常用过渡语', content: '承上启下类："在……基础上"。递进类："更重要的是"。转折类："但是……"。总结类："综上所述……"。', example: '在肯定成效的同时，我们清醒认识到，工作推进中仍存在薄弱环节。' },
          { title: '公文金句与万能句', content: '"立足全局谋发展，聚焦细节抓落实""强化统筹联动，凝聚协同攻坚合力""坚持守正创新，打破固有工作思维"等。', example: '坚持问题导向、目标导向、结果导向相结合，全方位推进工作提质。' }
        ] },
        { category: '结构模板', items: [
          { title: '通知结构模板', content: '标题（发文机关+事由+通知）→主送机关→缘由→事项（分条列项）→执行要求→结语（特此通知）→落款。', example: 'XX省教育厅关于做好2026年秋季学期开学工作的通知（完整模板见方法库JSON）' },
          { title: '新闻稿结构模板', content: '标题（简明扼要）→导语（5W1H，概括核心事实）→主体（按重要性递减展开）→结语（总结意义，展望未来）→落款。', example: 'XX市举行2026年重大项目集中签约仪式（完整模板见方法库JSON）' }
        ] },
        { category: '格式规范', items: [
          { title: '公文用纸与页面设置', content: 'A4纸（210mm×297mm），上边距3.7cm，下边距3.5cm，左边距2.8cm，右边距2.6cm。每页22行，每行28字。依据GB/T 9704-2012。', example: '' },
          { title: '序号层级使用规范', content: '第一层"一、"，第二层"（一）"，第三层"1."，第四层"（1）"。不得跳级使用，括号后不加顿号。', example: '正确：一、……（一）……1.……（1）……' }
        ] }
      ];
    }
    var el = document.getElementById('methodLibrary');
    el.innerHTML = methodData.map(function (cat) {
      return '<div class="method-category">' +
        '<div class="method-category-header" data-action="collapse" data-target="cat-' + cat.category.replace(/\s/g, '') + '">' +
        '<span class="arrow">\u25B6</span> ' + esc(cat.category) +
        '<span class="cat-count">' + cat.items.length + ' 条</span></div>' +
        '<div class="collapse-body" id="cat-' + cat.category.replace(/\s/g, '') + '">' +
        cat.items.map(function (m) {
          return '<div class="method-item"><h5>' + esc(m.title) + '</h5>' +
            '<p>' + esc(m.content) + '</p>' +
            (m.example ? '<div class="example">示例：' + esc(m.example) + '</div>' : '') +
            '</div>';
        }).join('') + '</div></div>';
    }).join('');
  }

  // ===== RENDER: WRITING PLAN =====
  function renderWritingPlan() {
    var el = document.getElementById('writingPlanTimeline');
    var plan = [
      { week: '第1周', title: '公文基础 + 新闻稿格式', detail: '学习公文写作基本框架、标题拟制方法。精读人民日报3篇新闻稿，分析导语结构和5W1H写法。' },
      { week: '第2周', title: '通知与请示实战练习', detail: '学习通知、请示、报告的结构模板和常用句式。各写一篇完整范文，对照方法库自检。' },
      { week: '第3周', title: '总结与纪要写作', detail: '学习工作总结、会议纪要的写作框架。练习用数据说话、分条列项表述。' },
      { week: '第4周', title: '讲话稿与综合写作', detail: '学习讲话稿的口语化+书面语结合技巧。完成一篇综合材料（含通知+总结+新闻稿）。' },
      { week: '第5周', title: '格式规范 + 润色提升', detail: '学习GB/T 9704-2012格式标准，用法定格式重排所有练笔。重点打磨标题、过渡语和金句。' },
      { week: '第6周', title: '模拟实战 + 复盘', detail: '限时完成一篇完整公文（从拟题到成文不超过2小时）。对照主流媒体文章找差距，制定下一步提升方向。' }
    ];
    el.innerHTML = '<div class="timeline">' + plan.map(function (p) {
      return '<div class="timeline-item"><h5>' + esc(p.week) + '\uFF1A' + esc(p.title) + '</h5>' +
        '<p>' + esc(p.detail) + '</p></div>';
    }).join('') + '</div>';
  }

  // ===== RENDER: TRAVEL (NO LEAFLET) =====
  function renderTravel() {
    var el = document.getElementById('travelDays');
    var items = state.travel;
    if (ui.query) { var q = ui.query.toLowerCase(); items = items.filter(function (d) { return d.summary.toLowerCase().indexOf(q) >= 0; }); }
    el.innerHTML = items.length ? items.map(function (d) {
      return '<div class="day-card">' +
        '<div class="day-header" data-action="collapse" data-target="day-' + d.id + '">' +
        '<span class="day-label">' + esc(d.label) + '</span>' +
        '<span class="day-summary">' + esc(d.summary) + '</span>' +
        '<span class="toggle-icon">\u25BC</span></div>' +
        '<div class="day-body" id="day-' + d.id + '">' +
        '<div class="day-section"><h4>行程描述</h4><p>' + esc(d.description) + '</p></div>' +
        '<div class="day-section"><h4>关键时间节点</h4>' +
        '<div class="timeline-simple">' + (d.timeline || []).map(function (t) {
          return '<div class="tl-item"><span class="tl-time">' + esc(t.time) + '</span> ' + esc(t.text) + '</div>';
        }).join('') + '</div></div>' +
        '<div class="day-section"><h4>住宿安排</h4>' +
        '<ul class="stay-list"><li><strong>' + esc(d.accommodation || '待定') + '</strong></li></ul></div>' +
        '<div class="day-section"><h4>餐饮推荐</h4>' +
        '<ul class="food-list">' + (d.food || []).map(function (f) {
          return '<li><strong>' + esc(f.name) + '</strong> - ' + esc(f.note || '') + '</li>';
        }).join('') + '</ul></div>' +
        '<div class="day-section"><h4>地图路线</h4>' +
        '<div class="map-placeholder" id="map-' + d.id + '">' +
        '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--muted);font-size:14px;gap:8px">' +
        '<span style="font-size:32px">\uD83D\uDDFA\uFE0F</span>' +
        '<span>地图加载需要 API Key</span><span style="font-size:12px">请在 app.js 中填写 AMAP_JS_API_KEY 或 BAIDU_MAP_JS_API_KEY</span></div></div>' +
        '</div>' +
        (d.stayCoord || d.foodCoords || d.spots ? '<button class="btn btn-sm" style="margin-top:10px" data-action="openMap" data-day="' + d.id + '">在地图上查看食宿点</button>' : '') +
        '</div></div>';
    }).join('') : '<div class="empty">暂无旅行计划</div>';
  }

  // ===== RENDER: PACKING =====
  function renderPacking() {
    var el = document.getElementById('packingList');
    var items = state.packingItems;
    if (ui.query) {
      var q = ui.query.toLowerCase();
      items = items.filter(function (p) { return p.name.toLowerCase().indexOf(q) >= 0 || p.category.toLowerCase().indexOf(q) >= 0; });
    }

    var packedCount = state.packingItems.filter(function (p) { return p.packed; }).length;
    var totalCount = state.packingItems.length;
    var pct = totalCount > 0 ? Math.round(packedCount / totalCount * 100) : 0;

    // Group by category
    var groups = {};
    PACKING_CATEGORIES.forEach(function (cat) { groups[cat] = []; });
    items.forEach(function (item) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });

    var html = '<div class="packing-stats">' +
      '<span class="packing-stats-text">已整理 <strong>' + packedCount + '</strong> / ' + totalCount + ' 件</span>' +
      '<div class="packing-progress-bar"><div class="packing-progress-fill" style="width:' + pct + '%"></div></div>' +
      '</div>';

    var hasItems = false;
    PACKING_CATEGORIES.forEach(function (cat) {
      var catItems = groups[cat];
      if (catItems.length === 0) return;
      hasItems = true;
      var catPacked = catItems.filter(function (c) { return c.packed; }).length;
      html += '<div class="packing-category-group">' +
        '<div class="packing-category-header">' + esc(cat) + '（' + catPacked + '/' + catItems.length + '）</div>';
      catItems.forEach(function (item) {
        html += '<div class="packing-item' + (item.packed ? ' checked' : '') + '" data-action="togglePacking" data-id="' + item.id + '">' +
          '<div class="packing-circle"></div>' +
          '<span class="packing-name">' + esc(item.name) + '</span>' +
          '<button class="packing-delete" data-action="delete" data-col="packingItems" data-id="' + item.id + '">删除</button>' +
          '</div>';
      });
      html += '</div>';
    });

    if (!hasItems) {
      html += '<div class="empty">暂无携带物品，请使用上方表单添加</div>';
    }

    el.innerHTML = html;
  }

  // ===== RENDER: EXPENSES =====
  function renderExpenses() {
    var el = document.getElementById('expenseList');
    var items = state.expenses;
    if (ui.query) {
      var q = ui.query.toLowerCase();
      items = items.filter(function (e) {
        return e.category.toLowerCase().indexOf(q) >= 0 || (e.note || '').toLowerCase().indexOf(q) >= 0 || String(e.amount).indexOf(q) >= 0;
      });
    }

    // Total
    var totalAmount = state.expenses.reduce(function (s, e) { return s + e.amount; }, 0);

    // Group by date (descending)
    var dateGroups = {};
    items.forEach(function (item) {
      if (!dateGroups[item.date]) dateGroups[item.date] = [];
      dateGroups[item.date].push(item);
    });
    var sortedDates = Object.keys(dateGroups).sort(function (a, b) { return b.localeCompare(a); });

    var html = '<div class="expense-stats">' +
      '<span class="expense-stats-text">共 <strong>' + state.expenses.length + '</strong> 笔支出</span>' +
      '<span class="expense-stats-text">合计 <strong>\u00A5' + totalAmount.toFixed(2) + '</strong></span>' +
      '</div>';

    if (sortedDates.length === 0) {
      html += '<div class="empty">暂无支出记录，请使用上方表单添加</div>';
    } else {
      sortedDates.forEach(function (date) {
        var dateItems = dateGroups[date];
        var dayTotal = dateItems.reduce(function (s, e) { return s + e.amount; }, 0);
        var weekday = new Date(date + 'T00:00:00').toLocaleDateString('zh-CN', { weekday: 'short' });

        html += '<div class="expense-date-group">' +
          '<div class="expense-date-header">' +
          '<span class="expense-date-label">' + esc(date) + ' ' + esc(weekday) + '</span>' +
          '<span class="expense-date-total">\u00A5' + dayTotal.toFixed(2) + '</span>' +
          '</div>';

        dateItems.forEach(function (item) {
          var catEmoji = EXPENSE_CATEGORIES[item.category] || '\uD83D\uDCE6';
          html += '<div class="expense-item">' +
            '<span class="expense-icon">' + catEmoji + '</span>' +
            '<div class="expense-info">' +
            '<div class="expense-cat">' + esc(item.category) + '</div>' +
            '<div class="expense-note">' + esc(item.note || '-') + '</div>' +
            '</div>' +
            '<span class="expense-amount">\u00A5' + item.amount.toFixed(2) + '</span>' +
            '<button class="expense-delete" data-action="delete" data-col="expenses" data-id="' + item.id + '">删除</button>' +
            '</div>';
        });

        html += '</div>';
      });
    }

    el.innerHTML = html;
  }

  // ===== RENDER: CALORIES =====
  function renderCalories() {
    var resultEl = document.getElementById('calorieResult');
    var listEl = document.getElementById('calorieList');
    if (!listEl) return;
    var items = state.calorieItems || [];
    var total = items.reduce(function (sum, item) { return sum + (Number(item.kcal) || 0); }, 0);
    if (resultEl) {
      resultEl.innerHTML = '<div class="calorie-result">' +
        '<div style="font-size:12px;color:var(--muted);margin-bottom:4px">计算公式：大卡 = 千焦 ÷ 4.184</div>' +
        '<div>本次已记录合计 <strong>' + total.toFixed(1) + '</strong> 大卡</div>' +
        '</div>';
    }
    if (!items.length) {
      listEl.innerHTML = '<div class="empty">暂无热量计算记录，请使用上方表单计算。</div>';
      return;
    }
    listEl.innerHTML = '<div class="calorie-list-title">计算记录</div>' + items.map(function (item) {
      var meta = item.mode === '每100g千焦'
        ? '每100g ' + item.kjPer100g + ' kJ × ' + item.weightG + 'g = ' + item.servingKj.toFixed(1) + ' kJ'
        : '单份 ' + item.servingKj + ' kJ';
      return '<div class="calorie-item">' +
        '<span style="font-size:22px">🔥</span>' +
        '<div class="calorie-info"><div class="calorie-name">' + esc(item.name || '未命名食物') + '</div>' +
        '<div class="calorie-meta">' + esc(item.mode) + ' · ' + esc(meta) + '</div></div>' +
        '<span class="calorie-kcal">' + Number(item.kcal).toFixed(1) + ' kcal</span>' +
        '<button class="expense-delete" data-action="delete" data-col="calorieItems" data-id="' + item.id + '">删除</button>' +
        '</div>';
    }).join('');
  }

  // ===== RENDER: HOTSPOTS =====
  function renderHotspots() {
    var el = document.getElementById('hotspotList');
    var items = state.hotspots;
    if (ui.hotspotPlatform !== 'all') { items = items.filter(function (h) { return h.platform === ui.hotspotPlatform; }); }
    if (ui.query) { var q = ui.query.toLowerCase(); items = items.filter(function (h) { return h.title.toLowerCase().indexOf(q) >= 0; }); }
    el.innerHTML = items.length ? items.map(function (h) {
      return '<div class="hotspot-card">' +
        '<span class="tag ' + (h.platform === '\u6296\u97F3' ? 'tag-yellow' : 'tag-red') + '">' + esc(h.platform) + '</span>' +
        '<div class="hotspot-body"><div class="hotspot-title">' + esc(h.title) + '</div>' +
        '<div class="hotspot-meta">' + esc(h.heat || '') + ' \u00B7 ' + esc(h.note || '') + '</div>' +
        (h.link && h.link !== '#' ? '<a class="hotspot-link" href="' + esc(h.link) + '" target="_blank" rel="noopener">查看原文 \u2192</a>' : '') +
        '</div><button class="icon-btn delete-btn" data-action="delete" data-col="hotspots" data-id="' + h.id + '">删除</button></div>';
    }).join('') : '<div class="empty">暂无热点线索</div>';
  }

  // ===== RENDER: MEDIA =====
  function renderMedia() {
    renderUpdateModule('media');
  }

  // ===== RENDER: ENGLISH =====
  function renderEnglish() {
    renderUpdateModule('english');
  }

  // ===== RENDER: PHOTO =====
  function renderPhoto() {
    var el = document.getElementById('photoSceneList');
    if (!el) return;
    var scenes = state.photoScenes || [];
    if (ui.query) {
      var q = ui.query.toLowerCase();
      scenes = scenes.filter(function (s) { return (s.name || '').toLowerCase().indexOf(q) >= 0; });
    }
    el.innerHTML = scenes.length ? scenes.map(function (scene) {
      return '<div class="photo-scene-card">' +
        '<div class="photo-scene-header" data-action="collapse" data-target="photo-' + scene.id + '">' +
        '<span contenteditable="true" data-action="editSceneName" data-id="' + scene.id + '">' + esc(scene.name || '未命名场景') + '</span>' +
        '<span class="arrow">▶</span></div>' +
        '<div class="photo-scene-body collapse-body" id="photo-' + scene.id + '" style="display:none">' +
        '<div class="form-row">' +
        '<input type="file" accept="image/*,video/*" data-action="uploadPhotoFile" data-scene="' + scene.id + '">' +
        '</div>' +
        '<div style="font-size:12px;color:var(--muted);margin:8px 0;text-align:center;">— 或添加链接 —</div>' +
        '<div class="form-row">' +
        '<input type="text" placeholder="简介（如：海边日落拍摄技巧）" data-role="photoLinkIntro" data-scene="' + scene.id + '" style="flex:1;min-width:140px;">' +
        '<input type="text" placeholder="抖音/小红书链接" data-role="photoLinkUrl" data-scene="' + scene.id + '" style="flex:1;min-width:180px;">' +
        '<button class="btn btn-sm" data-action="addPhotoLink" data-scene="' + scene.id + '">添加链接</button>' +
        '</div>' +
        '<div class="photo-grid">' +
        ((scene.items || []).length ? (scene.items || []).map(function (item) {
          if (item.type === 'image') return '<div class="photo-upload-card"><img src="' + esc(item.src) + '" alt="拍照参考" style="max-width:100%;border-radius:12px;"><span>' + esc(item.note || '') + '</span></div>';
          if (item.type === 'link') {
            var platformIcon = item.platform === 'douyin' ? '🎵' : item.platform === 'xiaohongshu' ? '📕' : '🔗';
            var platformLabel = item.platform === 'douyin' ? '抖音' : item.platform === 'xiaohongshu' ? '小红书' : '链接';
            return '<div class="photo-link-card">' +
              '<div class="photo-link-intro" contenteditable="true" data-action="editPhotoIntro" data-scene="' + scene.id + '" data-id="' + item.id + '">' + esc(item.intro || '点击编辑简介') + '</div>' +
              '<a class="photo-link-btn" href="' + esc(item.url) + '" target="_blank" rel="noopener" onclick="window.tryOpenApp &amp;&amp; window.tryOpenApp(event, \'' + esc(item.url) + '\', \'' + item.platform + '\')">' + platformIcon + ' 用浏览器打开' + platformLabel + '</a>' +
              '<div class="photo-link-meta">' + esc(item.url) + '</div>' +
              '<button class="icon-btn delete-btn" data-action="deletePhotoItem" data-scene="' + scene.id + '" data-id="' + item.id + '" style="align-self:flex-end;">删除</button>' +
              '</div>';
          }
          return '<div class="photo-upload-card"><strong>' + esc(item.type === 'douyin' ? '抖音参考' : '文字参考') + '</strong><span style="word-break:break-all">' + esc(item.text || '') + '</span></div>';
        }).join('') : '<div class="photo-upload-card">尚未添加照片或链接内容</div>') +
        '</div></div></div>';
    }).join('') : '<div class="photo-empty">暂无拍照教学场景。点击右上角“新增场景”后，可自行编辑场景名称，并在展开区上传照片或添加抖音/小红书链接。</div>';
  }

  // ===== RENDER CURRENT MODULE =====
  function renderCurrentModule() {
    switch (ui.activeModule) {
      case 'todos': renderTodos(); break;
      case 'reading': renderNovels(); break;
      case 'writing':
        renderUpdateModule('writing');
        renderWritingTasks();
        renderMethodLibrary();
        renderWritingPlan();
        break;
      case 'travel':
        renderTravel();
        renderPacking();
        renderExpenses();
        renderCalories();
        break;
      case 'hotspot': renderHotspots(); break;
      case 'media': renderMedia(); break;
      case 'english': renderEnglish(); break;
      case 'photo': renderPhoto(); break;
    }
  }

  // ===== RENDER ALL =====
  function render() {
    var todayLabel = document.getElementById('todayLabel');
    if (todayLabel) todayLabel.textContent = todayText;
    renderSummary();
    renderCurrentModule();
  }

  // 旅行内折叠卡片兜底函数：用于语义化按钮的直接 onclick，保证折叠/展开稳定可用
  window.toggleWorkbenchPanel = function (id, trigger) {
    var body = document.getElementById(id);
    if (!body) return;
    var isHidden = window.getComputedStyle(body).display === 'none';
    body.style.display = isHidden ? 'block' : 'none';
    if (trigger) {
      trigger.classList.toggle('open', isHidden);
      var arrow = trigger.querySelector('.arrow');
      if (arrow) arrow.textContent = isHidden ? '\u25BC' : '\u25B6';
    }
  };

  // 使用系统浏览器打开抖音/小红书链接，避免 App Scheme 失效或未安装 App 导致报错
  window.tryOpenApp = function (e, url, platform) {
    e.preventDefault();
    window.open(url, '_blank', 'noopener');
  };

  // ===== MAP MODAL (PLACEHOLDER) =====
  // 请在此处替换为您的高德地图/百度地图 JS-API Key
  var AMAP_JS_API_KEY = '';
  var BAIDU_MAP_JS_API_KEY = '';

  function openMapModal(dayId) {
    var day = state.travel.find(function (d) { return d.id === dayId; });
    if (!day) return;
    var modal = document.getElementById('mapModal');
    modal.classList.add('open');
    document.getElementById('mapModalTitle').textContent = day.summary + ' \u00B7 食宿与景点标注';
    var mapEl = document.getElementById('mapFull');
    var keyHint = AMAP_JS_API_KEY || BAIDU_MAP_JS_API_KEY ? '地图 Key 已配置，可在此处接入高德/百度 JS API 初始化。' : '地图加载需要 API Key，请在代码中填写高德地图或百度地图 JS-API Key。';
    mapEl.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--muted);font-size:15px;gap:12px;text-align:center;padding:24px;">' +
      '<span style="font-size:48px">\uD83D\uDDFA\uFE0F</span>' +
      '<span>' + esc(keyHint) + '</span>' +
      '<span style="font-size:12px">请在 <code>assets/app.js</code> 中搜索 <code>AMAP_JS_API_KEY</code> 或 <code>BAIDU_MAP_JS_API_KEY</code> 填入 Key。</span>' +
      '<span style="font-size:12px">标注点：' +
      (day.stayCoord ? '住宿1处' : '') +
      (day.spots ? (day.stayCoord ? '、' : '') + day.spots.length + '处景点' : '') +
      (day.foodCoords ? ((day.stayCoord || day.spots) ? '、' : '') + day.foodCoords.length + '处餐饮' : '') +
      '</span></div>';
  }

  // ===== EVENT HANDLERS =====

  // Drawer menu open / close
  var drawerToggle = document.getElementById('drawerToggle');
  var drawerBackdrop = document.getElementById('drawerBackdrop');
  function setDrawerOpen(isOpen) {
    document.body.classList.toggle('drawer-open', isOpen);
    document.body.classList.toggle('drawer-runtime-open', isOpen);
    document.documentElement.classList.toggle('drawer-open', isOpen);
    document.documentElement.classList.toggle('drawer-runtime-open', isOpen);
    if (drawerToggle) drawerToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
  function closeDrawer() {
    setDrawerOpen(false);
  }
  if (drawerToggle) {
    drawerToggle.setAttribute('aria-expanded', 'false');
    drawerToggle.addEventListener('click', function () {
      setDrawerOpen(!document.body.classList.contains('drawer-open'));
    });
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Sidebar nav - module switching
  document.querySelectorAll('.nav-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var moduleName = item.getAttribute('data-module');
      if (moduleName) showModule(moduleName);
      closeDrawer();
    });
  });

  // Mobile bottom tab bar - module switching
  document.querySelectorAll('#mobileTabBar .mtab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      var moduleName = tab.getAttribute('data-module');
      if (moduleName) showModule(moduleName);
    });
  });

  // Search - only re-renders current module
  document.getElementById('searchInput').addEventListener('input', function (e) {
    ui.query = e.target.value.trim();
    render();
  });

  // Click delegation on body
  document.body.addEventListener('click', function (e) {
    // Switch daily update / favorites tabs
    var updateTab = e.target.closest('[data-action="switchUpdateTab"]');
    if (updateTab) {
      var moduleKey = updateTab.getAttribute('data-module-key');
      var view = updateTab.getAttribute('data-view') || 'daily';
      if (moduleKey && ui.updateTabs) {
        ui.updateTabs[moduleKey] = view;
        renderUpdateModule(moduleKey);
      }
      return;
    }

    // Toggle English detail expand
    var engDetailToggle = e.target.closest('[data-action="toggleEnglishDetail"]');
    if (engDetailToggle) {
      var eid = engDetailToggle.getAttribute('data-id');
      ui.englishExpandedId = (ui.englishExpandedId === eid) ? null : eid;
      ui.englishDetailTab = 'original';
      closeAllTooltips();
      renderUpdateModule('english');
      return;
    }

    // English detail tab switch
    var engDetailTab = e.target.closest('[data-action="englishDetailTab"]');
    if (engDetailTab) {
      ui.englishDetailTab = engDetailTab.getAttribute('data-tab');
      renderUpdateModule('english');
      return;
    }

    // Speak sentence
    var speakBtn = e.target.closest('[data-action="speakSentence"]');
    if (speakBtn) {
      var text = speakBtn.getAttribute('data-text');
      var rate = parseFloat(document.getElementById('englishSpeed') ? document.getElementById('englishSpeed').value : '1') || 1;
      speakText(text, rate);
      return;
    }

    // Speak word
    var speakWordBtn = e.target.closest('[data-action="speakWord"]');
    if (speakWordBtn) {
      speakText(speakWordBtn.getAttribute('data-text'), 1);
      return;
    }

    // Word highlight click
    var wordEl = e.target.closest('.word-highlight');
    if (wordEl) {
      e.stopPropagation();
      showWordTooltip(wordEl);
      return;
    }

    // Vocab chip click
    var vocabChip = e.target.closest('.vocab-chip');
    if (vocabChip) {
      e.stopPropagation();
      showWordTooltip(vocabChip);
      return;
    }

    // Close tooltip
    if (e.target.closest('[data-action="closeTooltip"]')) {
      closeAllTooltips();
      return;
    }

    // Toggle single item favorite
    var favBtn = e.target.closest('[data-action="toggleFavorite"]');
    if (favBtn) {
      var favModule = favBtn.getAttribute('data-module-key');
      var favId = favBtn.getAttribute('data-id');
      var favKeys = updateKeys(favModule);
      var dailyItems = state[favKeys.daily] || [];
      var item = dailyItems.find(function (entry) { return entry.id === favId; });
      if (!item) return;
      var favorites = state[favKeys.favorites] || [];
      if (favorites.some(function (f) { return f.originalId === favId; })) {
        state[favKeys.favorites] = favorites.filter(function (f) { return f.originalId !== favId; });
      } else {
        var copy = Object.assign({}, item, { id: uid(), originalId: item.id, favoritedAt: new Date().toISOString() });
        state[favKeys.favorites] = favorites.concat([copy]);
      }
      save();
      renderUpdateModule(favModule);
      return;
    }

    // Collapse toggle
    var target = e.target.closest('[data-action="collapse"]');
    if (target) {
      var id = target.getAttribute('data-target');
      var body = document.getElementById(id);
      if (body) {
        var isHidden = window.getComputedStyle(body).display === 'none';
        if (isHidden) {
          body.style.display = 'block';
          target.classList.add('open');
          if (target.querySelector('.arrow')) target.querySelector('.arrow').textContent = '\u25BC';
        } else {
          body.style.display = 'none';
          target.classList.remove('open');
          if (target.querySelector('.arrow')) target.querySelector('.arrow').textContent = '\u25B6';
        }
      }
      return;
    }

    // Toggle packing item
    var packingItem = e.target.closest('[data-action="togglePacking"]');
    if (packingItem && !e.target.closest('[data-action="delete"]')) {
      var pid = packingItem.getAttribute('data-id');
      state.packingItems = state.packingItems.map(function (item) {
        if (item.id === pid) return Object.assign({}, item, { packed: !item.packed });
        return item;
      });
      save();
      renderPacking();
      renderSummary();
      return;
    }

    // Toggle checkbox (todos, writing)
    var chk = e.target.closest('[data-action="toggle"]');
    if (chk) {
      var col = chk.getAttribute('data-col');
      var id = chk.getAttribute('data-id');
      state[col] = state[col].map(function (item) {
        if (item.id === id) return Object.assign({}, item, { done: chk.checked });
        return item;
      });
      save();
      render();
      return;
    }

    // Delete (todos, novels, writing, hotspots, packingItems, expenses)
    var del = e.target.closest('[data-action="delete"]');
    if (del) {
      var col = del.getAttribute('data-col');
      var id = del.getAttribute('data-id');
      if (state[col]) {
        state[col] = state[col].filter(function (item) { return item.id !== id; });
        save();
        render();
      }
      return;
    }

    // Open map modal
    var mapBtn = e.target.closest('[data-action="openMap"]');
    if (mapBtn) {
      openMapModal(mapBtn.getAttribute('data-day'));
      return;
    }

    // Add photo link with intro
    var addPhotoLinkBtn = e.target.closest('[data-action="addPhotoLink"]');
    if (addPhotoLinkBtn) {
      var sid = addPhotoLinkBtn.getAttribute('data-scene');
      var introInput = document.querySelector('[data-role="photoLinkIntro"][data-scene="' + sid + '"]');
      var urlInput = document.querySelector('[data-role="photoLinkUrl"][data-scene="' + sid + '"]');
      var url = urlInput ? urlInput.value.trim() : '';
      if (!url) return;
      var intro = introInput ? introInput.value.trim() : '';
      var platform = 'other';
      if (/douyin\.cn|v\.douyin\.com|douyin\.com/i.test(url)) platform = 'douyin';
      else if (/xiaohongshu\.com|xhslink\.com|xhs\.cn/i.test(url)) platform = 'xiaohongshu';
      state.photoScenes = (state.photoScenes || []).map(function (scene) {
        if (scene.id !== sid) return scene;
        var items = scene.items || [];
        items.push({ id: uid(), type: 'link', intro: intro || '点击编辑简介', url: url, platform: platform });
        return Object.assign({}, scene, { items: items });
      });
      if (introInput) introInput.value = '';
      if (urlInput) urlInput.value = '';
      save();
      renderPhoto();
      return;
    }

    // Delete photo item
    var delPhotoItem = e.target.closest('[data-action="deletePhotoItem"]');
    if (delPhotoItem) {
      var sceneId = delPhotoItem.getAttribute('data-scene');
      var itemId = delPhotoItem.getAttribute('data-id');
      state.photoScenes = (state.photoScenes || []).map(function (scene) {
        if (scene.id !== sceneId) return scene;
        return Object.assign({}, scene, { items: (scene.items || []).filter(function (it) { return it.id !== itemId; }) });
      });
      save();
      renderPhoto();
      return;
    }

    // Close tooltips when clicking outside
    if (!e.target.closest('.word-tooltip') && !e.target.closest('.word-highlight') && !e.target.closest('.vocab-chip')) {
      closeAllTooltips();
    }
  });

  // Note textarea save
  document.body.addEventListener('input', function (e) {
    if (e.target.getAttribute('data-action') === 'note') {
      var col = e.target.getAttribute('data-col');
      var id = e.target.getAttribute('data-id');
      state[col] = state[col].map(function (item) {
        if (item.id === id) return Object.assign({}, item, { note: e.target.value });
        return item;
      });
      save();
    }
    if (e.target.getAttribute('data-action') === 'editSceneName') {
      var sceneId = e.target.getAttribute('data-id');
      state.photoScenes = (state.photoScenes || []).map(function (scene) {
        if (scene.id === sceneId) return Object.assign({}, scene, { name: e.target.textContent.trim() || '未命名场景' });
        return scene;
      });
      save();
    }
    if (e.target.getAttribute('data-action') === 'editPhotoIntro') {
      var psid = e.target.getAttribute('data-scene');
      var pid = e.target.getAttribute('data-id');
      state.photoScenes = (state.photoScenes || []).map(function (scene) {
        if (scene.id !== psid) return scene;
        return Object.assign({}, scene, {
          items: (scene.items || []).map(function (it) {
            if (it.id !== pid) return it;
            return Object.assign({}, it, { intro: e.target.textContent.trim() || '点击编辑简介' });
          })
        });
      });
      save();
    }
  });

  // 上传照片/视频文件到拍照场景（以本地 dataURL 保存）
  document.body.addEventListener('change', function (e) {
    if (e.target.getAttribute('data-action') !== 'uploadPhotoFile') return;
    var sid = e.target.getAttribute('data-scene');
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      state.photoScenes = (state.photoScenes || []).map(function (scene) {
        if (scene.id !== sid) return scene;
        var items = scene.items || [];
        items.push({ id: uid(), type: 'image', src: reader.result, note: file.name });
        return Object.assign({}, scene, { items: items });
      });
      save();
      renderPhoto();
    };
    reader.readAsDataURL(file);
  });

  // Media favorites: fetch article
  var mediaFetchUrl = document.getElementById('mediaFetchUrl');
  var mediaFetchBtn = document.getElementById('mediaFetchBtn');
  var mediaFetchForm = document.getElementById('mediaFetchForm');
  var mediaFetchTitle = document.getElementById('mediaFetchTitle');
  var mediaFetchSource = document.getElementById('mediaFetchSource');
  var mediaFetchDate = document.getElementById('mediaFetchDate');
  var mediaFetchSummary = document.getElementById('mediaFetchSummary');

  function resetMediaFetchForm() {
    if (mediaFetchForm) mediaFetchForm.style.display = 'none';
    if (mediaFetchTitle) mediaFetchTitle.value = '';
    if (mediaFetchSource) mediaFetchSource.value = '';
    if (mediaFetchDate) mediaFetchDate.value = '';
    if (mediaFetchSummary) mediaFetchSummary.value = '';
  }

  function detectSourceFromUrl(url) {
    if (/people\.com\.cn|rmrb/.test(url)) return '人民日报';
    if (/81\.cn|jjb/.test(url)) return '解放军报';
    if (/news\.cn|xinhua/.test(url)) return '新华网';
    if (/gov\.cn/.test(url)) return '中国政府网';
    if (/qstheory\.cn/.test(url)) return '求是网';
    if (/dangjian\.cn/.test(url)) return '党建网';
    if (/weixin\.qq\.com|mp\.weixin/.test(url)) return '微信公众号';
    return '网络来源';
  }

  if (mediaFetchBtn && mediaFetchForm) {
    mediaFetchBtn.addEventListener('click', function () {
      var url = mediaFetchUrl ? mediaFetchUrl.value.trim() : '';
      if (!url) return;
      // Try to infer source from URL
      var inferredSource = detectSourceFromUrl(url);
      if (mediaFetchTitle) mediaFetchTitle.value = '';
      if (mediaFetchSource) mediaFetchSource.value = inferredSource;
      if (mediaFetchDate) mediaFetchDate.value = new Date().toISOString().slice(0, 10);
      if (mediaFetchSummary) mediaFetchSummary.value = '';
      // Show manual form (CORS prevents direct fetching in browser)
      mediaFetchForm.style.display = 'block';
      // Optional: attempt fetch with no-cors, but content will be opaque
      fetch(url, { method: 'GET', mode: 'no-cors' }).catch(function () {}).then(function () {
        // no-cors returns opaque response, cannot read content
      });
    });

    document.getElementById('mediaFetchCancel').addEventListener('click', resetMediaFetchForm);
    document.getElementById('mediaFetchSave').addEventListener('click', function () {
      var url = mediaFetchUrl ? mediaFetchUrl.value.trim() : '';
      var title = mediaFetchTitle ? mediaFetchTitle.value.trim() : '';
      var source = mediaFetchSource ? mediaFetchSource.value.trim() : '网络来源';
      var date = mediaFetchDate ? mediaFetchDate.value : '';
      var summary = mediaFetchSummary ? mediaFetchSummary.value.trim() : '';
      if (!title || !url) { alert('请至少填写标题和确认链接'); return; }
      state.mediaFavorites = state.mediaFavorites || [];
      state.mediaFavorites.unshift({
        id: uid(), originalId: 'manual-' + uid(),
        title: title, source: source, date: date,
        summary: summary || '（用户手动导入）',
        url: url, favoritedAt: new Date().toISOString()
      });
      save();
      resetMediaFetchForm();
      if (mediaFetchUrl) mediaFetchUrl.value = '';
      renderUpdateModule('media');
    });
  }

  // Add todo
  document.getElementById('todoAddBtn').addEventListener('click', function () {
    var title = document.getElementById('todoInput').value.trim();
    if (!title) return;
    state.todos.unshift({ id: uid(), title: title, priority: document.getElementById('todoPriority').value, time: document.getElementById('todoTime').value.trim(), done: false });
    document.getElementById('todoInput').value = '';
    document.getElementById('todoTime').value = '';
    save(); render();
  });
  document.getElementById('todoInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') document.getElementById('todoAddBtn').click(); });

  // Add novel
  document.getElementById('addNovelBtn').addEventListener('click', function () {
    var form = document.getElementById('novelAddForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  });
  document.getElementById('novelCancelBtn').addEventListener('click', function () {
    document.getElementById('novelAddForm').style.display = 'none';
  });
  document.getElementById('novelSaveBtn').addEventListener('click', function () {
    var title = document.getElementById('novelTitle').value.trim();
    if (!title) return;
    var tags = document.getElementById('novelTags').value.split(/[,，、\s]+/).filter(Boolean);
    state.novels.unshift({
      id: uid(), title: title, author: document.getElementById('novelAuthor').value.trim() || '未知',
      tags: tags, content: '', progress: 0, note: ''
    });
    document.getElementById('novelTitle').value = '';
    document.getElementById('novelAuthor').value = '';
    document.getElementById('novelTags').value = '';
    document.getElementById('novelAddForm').style.display = 'none';
    save(); render();
  });

  // Writing tabs
  document.getElementById('writingTabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.tab-btn');
    if (!btn) return;
    document.querySelectorAll('#writingTabs .tab-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    document.querySelectorAll('#mod-writing .tab-content').forEach(function (c) { c.classList.remove('active'); });
    var tab = btn.getAttribute('data-tab');
    document.getElementById(tab).classList.add('active');
  });

  // Add writing task
  document.getElementById('writingAddBtn').addEventListener('click', function () {
    var title = document.getElementById('writingTitle').value.trim();
    if (!title) return;
    state.writing.unshift({
      id: uid(), title: title,
      type: document.getElementById('writingType').value,
      reference: document.getElementById('writingRef').value.trim(),
      done: false
    });
    document.getElementById('writingTitle').value = '';
    document.getElementById('writingRef').value = '';
    save(); render();
  });

  // Hotspot platform tabs
  document.getElementById('hotspotTabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.platform-tab');
    if (!btn) return;
    document.querySelectorAll('#hotspotTabs .platform-tab').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    ui.hotspotPlatform = btn.getAttribute('data-platform');
    renderHotspots();
  });

  // Add hotspot
  document.getElementById('hotspotAddBtn').addEventListener('click', function () {
    var title = document.getElementById('hotspotTitle').value.trim();
    if (!title) return;
    state.hotspots.unshift({
      id: uid(), title: title,
      platform: document.getElementById('hotspotPlatform').value,
      heat: document.getElementById('hotspotHeat').value.trim(),
      link: document.getElementById('hotspotLink').value.trim() || '#',
      note: ''
    });
    document.getElementById('hotspotTitle').value = '';
    document.getElementById('hotspotHeat').value = '';
    document.getElementById('hotspotLink').value = '';
    save(); render();
  });

  // Add packing item
  document.getElementById('packingAddBtn').addEventListener('click', function () {
    var name = document.getElementById('packingItemName').value.trim();
    if (!name) return;
    var category = document.getElementById('packingItemCategory').value;
    state.packingItems.push({ id: uid(), name: name, category: category, packed: false });
    document.getElementById('packingItemName').value = '';
    save();
    renderPacking();
    renderSummary();
  });
  document.getElementById('packingItemName').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') document.getElementById('packingAddBtn').click();
  });

  // Add expense
  document.getElementById('expenseAddBtn').addEventListener('click', function () {
    var date = document.getElementById('expenseDate').value;
    if (!date) date = today.toISOString().slice(0, 10);
    var amount = parseFloat(document.getElementById('expenseAmount').value);
    if (isNaN(amount) || amount <= 0) return;
    var category = document.getElementById('expenseCategory').value;
    var note = document.getElementById('expenseNote').value.trim();
    state.expenses.push({ id: uid(), date: date, category: category, amount: amount, note: note });
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseNote').value = '';
    save();
    renderExpenses();
    renderSummary();
  });
  document.getElementById('expenseNote').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') document.getElementById('expenseAddBtn').click();
  });

  // Calorie instant calculation
  function updateCalorieInstantA() {
    var kjPer100g = parseFloat(document.getElementById('calorieKjPer100g').value);
    var weightG = parseFloat(document.getElementById('calorieWeightG').value);
    var resultEl = document.getElementById('calorieInstantResultA');
    var valueEl = document.getElementById('calorieInstantValueA');
    if (!isNaN(kjPer100g) && kjPer100g > 0 && !isNaN(weightG) && weightG > 0) {
      var kcal = (kjPer100g * weightG / 100) / 4.184;
      valueEl.textContent = kcal.toFixed(1);
      resultEl.style.display = 'flex';
    } else {
      resultEl.style.display = 'none';
    }
  }
  function updateCalorieInstantB() {
    var servingKj = parseFloat(document.getElementById('calorieKjServing').value);
    var resultEl = document.getElementById('calorieInstantResultB');
    var valueEl = document.getElementById('calorieInstantValueB');
    if (!isNaN(servingKj) && servingKj > 0) {
      var kcal = servingKj / 4.184;
      valueEl.textContent = kcal.toFixed(1);
      resultEl.style.display = 'flex';
    } else {
      resultEl.style.display = 'none';
    }
  }
  document.getElementById('calorieKjPer100g').addEventListener('input', updateCalorieInstantA);
  document.getElementById('calorieWeightG').addEventListener('input', updateCalorieInstantA);
  document.getElementById('calorieKjServing').addEventListener('input', updateCalorieInstantB);

  // Add calorie record: by weight
  document.getElementById('calorieAddByWeightBtn').addEventListener('click', function () {
    var name = document.getElementById('calorieFoodA').value.trim() || '未命名食物';
    var kjPer100g = parseFloat(document.getElementById('calorieKjPer100g').value);
    var weightG = parseFloat(document.getElementById('calorieWeightG').value);
    if (isNaN(kjPer100g) || kjPer100g <= 0 || isNaN(weightG) || weightG <= 0) return;
    var servingKj = kjPer100g * weightG / 100;
    var kcal = servingKj / 4.184;
    state.calorieItems = state.calorieItems || [];
    state.calorieItems.unshift({ id: uid(), name: name, mode: '每100g千焦', kjPer100g: kjPer100g, weightG: weightG, servingKj: servingKj, kcal: kcal });
    document.getElementById('calorieFoodA').value = '';
    document.getElementById('calorieKjPer100g').value = '';
    document.getElementById('calorieWeightG').value = '';
    document.getElementById('calorieInstantResultA').style.display = 'none';
    save(); renderCalories();
  });

  // Add calorie record: by serving kJ
  document.getElementById('calorieAddByKjBtn').addEventListener('click', function () {
    var name = document.getElementById('calorieFoodB').value.trim() || '未命名食物';
    var servingKj = parseFloat(document.getElementById('calorieKjServing').value);
    if (isNaN(servingKj) || servingKj <= 0) return;
    var kcal = servingKj / 4.184;
    state.calorieItems = state.calorieItems || [];
    state.calorieItems.unshift({ id: uid(), name: name, mode: '单份千焦', servingKj: servingKj, kcal: kcal });
    document.getElementById('calorieFoodB').value = '';
    document.getElementById('calorieKjServing').value = '';
    document.getElementById('calorieInstantResultB').style.display = 'none';
    save(); renderCalories();
  });

  // Add photo scene
  document.getElementById('photoSceneAddBtn').addEventListener('click', function () {
    state.photoScenes = state.photoScenes || [];
    state.photoScenes.push({ id: uid(), name: '未命名场景', items: [] });
    save();
    renderPhoto();
    renderSummary();
  });

  // Map modal close
  document.getElementById('mapModalClose').addEventListener('click', function () {
    document.getElementById('mapModal').classList.remove('open');
    document.getElementById('mapFull').innerHTML = '';
  });
  document.getElementById('mapModal').addEventListener('click', function (e) {
    if (e.target === this) { this.classList.remove('open'); document.getElementById('mapFull').innerHTML = ''; }
  });

  // Export / Import
  document.getElementById('exportBtn').addEventListener('click', function () {
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = '工作台数据-' + today.toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  document.getElementById('importBtn').addEventListener('click', function () {
    document.getElementById('importFile').click();
  });

  document.getElementById('importFile').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        state = Object.assign(clone(sampleData), JSON.parse(reader.result));
        save(); render();
      } catch (err) {
        alert('导入失败，请确认 JSON 格式正确。');
      }
    };
    reader.readAsText(file);
  });

  // ===== INIT =====
  // Set default date for expense form
  var expenseDateEl = document.getElementById('expenseDate');
  if (expenseDateEl) expenseDateEl.value = today.toISOString().slice(0, 10);

  // Merge daily updates if structure changed (e.g., missing content/vocabulary)
  function mergeDailyUpdates(key) {
    var existing = state[key] || [];
    var fresh = sampleData[key] || [];
    if (!existing.length) { state[key] = clone(fresh); return; }
    // If first item lacks new fields, replace entire list with fresh data
    if (fresh.length && (!existing[0].content || !existing[0].vocabulary)) {
      state[key] = clone(fresh);
    }
  }
  mergeDailyUpdates('englishDailyUpdates');
  mergeDailyUpdates('mediaDailyUpdates');
  mergeDailyUpdates('writingDailyUpdates');

  // Sync detail-page URLs after data schema updates, avoiding old root-domain links
  function syncDetailUrls(key) {
    var fresh = sampleData[key] || [];
    var lookup = {};
    fresh.forEach(function (item) { lookup[item.id] = item.url; lookup[item.title] = item.url; });
    state[key] = (state[key] || []).map(function (item) {
      var detailUrl = lookup[item.id] || lookup[item.title];
      return detailUrl ? Object.assign({}, item, { url: detailUrl }) : item;
    });
  }
  syncDetailUrls('writingDailyUpdates');
  syncDetailUrls('mediaDailyUpdates');
  syncDetailUrls('media');

  // Show default module (todos)
  var initTodayLabel = document.getElementById('todayLabel');
  if (initTodayLabel) initTodayLabel.textContent = todayText;
  renderSummary();
  showModule('todos');

  // Register Service Worker for PWA offline support
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(function () {});
  }
})();
