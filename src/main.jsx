import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const assetPath = (path) => path.startsWith("http") ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
const avatarSrc = assetPath("/resume-image-1-1.png");

const contactInfo = [
  { label: "手机号", value: "19230649854", icon: "phone" },
  { label: "微信号", value: "Lifan54", icon: "wechat" },
  { label: "邮箱", value: "Lifan54@qq.com", icon: "mail" },
];

const timeline = [
  {
    period: "2020.09 - 2025.05",
    company: "武汉米创科技有限公司",
    role: "新媒体运营 / 活动策划",
    intro: "主导公司核心新媒体营销项目，从策划、内容生产、落地复盘，推进全流程管理，并负责公司官方公众号、视频号、抖音等新媒体平台运营。",
    points: ["5 大核心新媒体营销项目按时交付", "账号粉丝增长 12.8 万", "十余场省级及地方大型活动策划执行", "每日监测 10+ 项运营数据", "连续三年荣获企业优秀员工", "带领 5 人新媒体团队协同推进项目"],
  },
  {
    period: "2025.05 - 2026.05",
    company: "深圳市阳林合科技有限公司",
    note: "创业公司",
    role: "品牌运营 / 海外增长运营",
    intro: "独立负责海外文旅品牌全链路品牌建设与海外新媒体运营，主导品牌体系、海外流量矩阵、内容商业化运营、外部资源合作等核心工作。",
    points: ["品牌视觉体系从 0 到 1 搭建", "海外社媒矩阵搭建与精细化运营", "短视频全流程内容创作", "海外付费投流与数据化优化", "产品设计开发与路线规划", "外部资源拓展与项目全案落地"],
  },
];

const stats = [
  ["5+", "核心新媒体营销项目"],
  ["12.8W", "账号粉丝增长"],
  ["120W+", "海外项目曝光"],
  ["500W+", "合作 KOL 全网粉丝"],
];

const projects = [
  {
    id: "overseas-growth",
    title: "JalanJalan China 海外文旅品牌从 0 到 1",
    tag: "品牌运营 / 海外增长",
    period: "2025.11 - 2026.05",
    tone: "cyan",
    cardCover: "/projects/overseas-growth/cover-social.png",
    summary: "面向海外市场搭建中国文旅品牌 JalanJalan China，主导品牌定位、视觉体系、社媒矩阵、内容策略、短视频生产、投流优化、KOL 合作与项目落地全链路。",
    metrics: ["10+ 社媒平台", "500+ 内容资产", "2个 AI 网站", "全链路 增长闭环"],
    detail: ["完成品牌从 0 到 1 的定位与表达体系，围绕“年轻、真实、有温度”的中国文旅形象建立海外传播调性。", "搭建 Facebook、Instagram、TikTok 等社媒矩阵，按平台特性区分品牌主阵地、视觉种草窗口和流量增长引擎。", "入境游产品的设计与开发，推进路线规划、供应商对接、产品包装、价格信息整理与持续优化。", "建立爆款种草、行程攻略、氛围视频、互动引流、深度介绍五类内容体系，提升内容生产稳定性与转化承接能力。", "结合投流数据、用户互动和 KOL 合作复盘，持续优化素材、受众、发布节奏和后续商业化合作方向。"],
  },
  {
    id: "kol-china-trip",
    title: "马来西亚网红姐妹中国行",
    tag: "KOL 合作 / 项目全案",
    period: "2025.12 - 2026.01 / 北京 - 哈尔滨 - 亚布力",
    tone: "amber",
    cover: "/projects/kol-china-trip/cover.jpg",
    summary: "围绕马来西亚头部达人 Leng Yein 林云及姐妹中国行，完成冰雪文旅路线策划、供应商统筹、内容跟拍、社媒传播和私域转化闭环。",
    metrics: ["100万+ 全网曝光", "60万+ 内容访问", "500万+ KOL 全网粉丝", "100+ 咨询社群"],
    detail: ["独立设计京哈冰雪文旅行程，串联北京文化体验、哈尔滨冰雪大世界、亚布力滑雪与冰雪写真场景。", "统筹写真摄影、跟拍、无人机、地接、妆造、服装、保暖与交通住宿等供应方资源。", "围绕 Instagram、Facebook、TikTok 等平台完成内容节奏规划、素材沉淀、线上推广和客户跟进。", "项目沉淀 Jalan-Jalan Harbin 专题账号和马来西亚游客咨询社群，形成文旅出海 KOL 营销案例。"],
  },
  {
    id: "media-matrix",
    title: "国内新媒体矩阵运营",
    tag: "内容运营 / 品牌推广",
    period: "2022 - 2024",
    tone: "violet",
    summary: "负责公司官方公众号、视频号、抖音等平台运营，围绕品牌形象、内容栏目和活动传播持续输出内容，提升品牌曝光与用户认知。",
    metrics: ["12.8W 粉丝增长", "10+ 指标监测", "月度复盘报告"],
    detail: ["围绕品牌推广、产品宣传、用户裂变、活动策划和私域直播推进项目落地。", "拆解策划、内容生产、投放、复盘四大节点，确保项目按时交付。", "基于完播率、关注度、转化路径等数据调整内容策略，提升传播与业务转化。"],
  },
  {
    id: "event-campaigns",
    title: "大型活动策划与落地",
    tag: "活动策划 / 跨部门统筹",
    period: "省级及地方活动",
    tone: "green",
    summary: "主导策划和执行十余场大型活动，覆盖银行业务技能竞赛、金融培训直播、反假货币知识竞赛等类型。",
    metrics: ["10+ 大型活动", "直播 + 竞技", "跨区域协调"],
    detail: ["从需求调研、方案定制到资源协调全流程操盘，推动多部门、多区域协作。", "融合线上直播、线下竞技和融媒体传播，突破传统活动形式。", "通过执行复盘沉淀项目方法，提升后续活动的标准化与响应速度。"],
  },
];

const kolSocialScreens = [
  "/projects/kol-china-trip/social-01.jpg",
  "/projects/kol-china-trip/social-02.jpg",
  "/projects/kol-china-trip/social-03.jpg",
  "/projects/kol-china-trip/social-04.jpg",
  "/projects/kol-china-trip/social-05.jpg",
  "/projects/kol-china-trip/social-06.jpg",
];

const kolPhotos = [
  "/projects/kol-china-trip/photo-01.jpg",
  "/projects/kol-china-trip/photo-02.jpg",
  "/projects/kol-china-trip/photo-03.jpg",
  "/projects/kol-china-trip/photo-04.jpg",
  "/projects/kol-china-trip/photo-05.jpg",
];

const kolLinks = [
  { label: "@lengyein", type: "facebook", url: "https://www.facebook.com/lengyein" },
  { label: "@lengyein", type: "instagram", url: "https://www.instagram.com/lengyein/" },
  { label: "@lengsean", type: "facebook", url: "https://www.facebook.com/lengsean/" },
  { label: "@lengsean", type: "instagram", url: "https://www.instagram.com/lengsean/" },
];

const kolVideoCases = [
  { title: "行程介绍", desc: "释放达人同款中国冰雪旅行路线信息，提前呈现北京、哈尔滨、亚布力等核心目的地与行程卖点。", url: "https://www.instagram.com/reel/DTz4cCjjcKK/?igsh=MXY3ZXByMTF6MXQ0cw==", embed: "https://www.instagram.com/reel/DTz4cCjjcKK/embed", ratio: "landscape" },
  { title: "官宣合作", desc: "露出 Leng Yein 与 Leng Sean 的合作信息，建立项目关注入口，为后续连续内容发布做预热。", url: "https://www.instagram.com/reel/DTP3lkSD4aF/?igsh=eTVrdmdrYmcza2E4", embed: "https://www.instagram.com/reel/DTP3lkSD4aF/embed", ratio: "landscape" },
  { title: "冰雪初体验 & 美食打卡", desc: "以达人第一视角呈现冰雪体验和本地美食打卡，让用户同时感受到目的地氛围与旅行生活感。", url: "https://www.instagram.com/reel/DThkpd7kYDL/?igsh=MThwenpvMXB1djF3", embed: "https://www.instagram.com/reel/DThkpd7kYDL/embed", ratio: "portrait" },
  { title: "民族服饰打卡 & 冰雪深度体验", desc: "结合民族服饰造型与冰雪场景，强化地域文化辨识度，呈现更具沉浸感的深度体验内容。", url: "https://www.instagram.com/reel/DTmCQisDxVB/?igsh=MXBicnBzdHhmaHV3ag==", embed: "https://www.instagram.com/reel/DTmCQisDxVB/embed", ratio: "portrait" },
  { title: "时尚旅拍", desc: "突出达人造型、场景构图和旅行大片感，将行程体验转化为可传播的时尚旅拍内容。", url: "https://www.instagram.com/reel/DT46Lk7jSUf/?igsh=eXV5YnNwbzlwYWw5", embed: "https://www.instagram.com/reel/DT46Lk7jSUf/embed", ratio: "portrait" },
  { title: "泼水成冰打卡", desc: "围绕哈尔滨冬季代表性玩法完成网红拍照打卡，制造强记忆点和社交平台传播话题。", url: "https://www.instagram.com/reel/DT4Q2CljV7r/?igsh=MWRuam11bXVwaDlzNg==", embed: "https://www.instagram.com/reel/DT4Q2CljV7r/embed", ratio: "landscape" },
  { title: "美食体验", desc: "展示旅程中的特色餐食和现场体验，让目的地内容不只停留在景点，也能体现旅行烟火气。", url: "https://www.instagram.com/reel/DT7LKunjdcB/?igsh=OTJka2R6MzQyZW13", embed: "https://www.instagram.com/reel/DT7LKunjdcB/embed", ratio: "landscape" },
  { title: "颐和园古装体验", desc: "围绕北京颐和园古建场景与古装造型呈现文化体验感，强化中国传统美学和旅拍记忆点。", url: "https://www.instagram.com/reel/DTfgstfkbrG/?igsh=ZDVhM2ZxZmg2NWlx", embed: "https://www.instagram.com/reel/DTfgstfkbrG/embed", ratio: "portrait" },
  { title: "冰雪大世界", desc: "集中呈现哈尔滨冰雪大世界的视觉冲击力，通过冰雕、灯光和人物体验强化目的地吸引力。", url: "https://www.instagram.com/reel/DTpBIvWERa7/?igsh=MXd2Z2pybG8xMGN4aQ==", embed: "https://www.instagram.com/reel/DTpBIvWERa7/embed", ratio: "portrait" },
  { title: "雪骑写真", desc: "以雪地骑行和写真场景作为内容收束，沉淀兼具体验感与视觉传播力的旅拍素材。", url: "https://www.instagram.com/reel/DTjaomCj9qC/?igsh=dXJ4OGU0YnJwMWpm", embed: "https://www.instagram.com/reel/DTjaomCj9qC/embed", ratio: "portrait" },
];

const overseasRoles = [
  ["品牌视觉与社媒矩阵搭建", "完成品牌 Logo、VI 规范、社媒头像/封面、内容模板与 Facebook、Instagram、TikTok 等账号搭建及运营框架。"],
  ["内容策略规划", "建立内容栏目、月度选题、热点响应、本地化表达与跨平台发布节奏。"],
  ["短视频制作发布", "覆盖脚本、剪辑、字幕、封面标题、多平台适配与发布优化。"],
  ["数据监测复盘", "追踪播放、互动、粉丝、转化路径等指标，输出复盘并反向优化内容策略。"],
  ["产品设计开发", "入境游产品开发设计、路线规划、供应商对接、产品优化与后续转化承接。"],
  ["KOL 与项目落地", "与达人对接、撰写合作方案、推进商务沟通、跟进执行与效果复盘。"],
];

const overseasPlatforms = [
  ["Facebook", "品牌主阵地", "图文 / 长视频 / 社群互动", "品牌认知 + 社群沉淀"],
  ["Instagram", "视觉种草窗口", "美图 / Reels / Stories", "品牌调性 + 目的地种草"],
  ["TikTok", "流量增长引擎", "短视频 / 挑战内容", "破圈传播 + 拉新"],
];

const overseasSocialLinks = [
  { name: "Facebook", account: "Jalan-Jalan China", type: "facebook", url: "https://www.facebook.com/profile.php?id=61585891885831", desc: "品牌主阵地，用于图文、长视频、社群互动与用户咨询承接。" },
  { name: "Instagram", account: "@jalanjalan_china", type: "instagram", url: "https://www.instagram.com/jalanjalan_china/", desc: "视觉形象窗口，用于 Reels、Stories、精修图文和目的地种草。" },
  { name: "TikTok", account: "@jalanjalan_china", type: "tiktok", url: "https://www.tiktok.com/@jalanjalan_china", desc: "短视频增长引擎，用于破圈传播、热点内容和年轻用户拉新。" },
];

const overseasChannels = [
  { name: "WhatsApp", account: "+86 137 9824 2025", icon: "/projects/overseas-growth/whatsapp-logo.svg", desc: "承接海外用户咨询、行程沟通与私域转化。" },
  { name: "Telegram", account: "Jalan-Jalan China", icon: "/projects/overseas-growth/telegram-logo.svg", desc: "用于社群触达、活动通知和用户沉淀。" },
  { name: "VK", account: "WOW CHINA", url: "https://vk.ru/club236676296", icon: "/projects/overseas-growth/vk-logo.svg", avatar: "/projects/overseas-growth/vk-avatar.png", desc: "俄罗斯市场社媒渠道，补充俄语区传播阵地。", identity: "WOW CHINA 面向俄语区用户，突出中国目的地的视觉冲击、产品信息和旅行灵感，用更直接的内容承接俄罗斯市场咨询。", meaning: "WOW 代表第一眼的惊喜感，CHINA 直接强化目的地认知，让账号在 VK 平台中更容易被识别、搜索和记住。" },
  { name: "OK", account: "Jalan-Jalan China", icon: "/projects/overseas-growth/ok-logo.png", desc: "俄罗斯社媒平台 OK，拓展东欧及俄语区用户触达。" },
];

const overseasContentTypes = [
  ["爆款种草", "20-35s 强钩子开头，快速激发旅行欲望。"],
  ["行程介绍", "40-120s 线路攻略，承接咨询与转化。"],
  ["氛围视频", "20-30s 美学向内容，塑造品牌质感。"],
  ["互动引流", "15-30s 话题互动，引导评论和私域沉淀。"],
  ["深度介绍", "30-180s 实用攻略，建立专业信任。"],
];

const contentVideoCases = [
  { platform: "Instagram", title: "Reel 内容案例 01", copy: "第一眼看中国", desc: "用高识别度画面快速建立目的地印象，适合承担账号拉新和品牌认知入口。", url: "https://www.instagram.com/reel/DXbMzaEFXlF/?igsh=cm9pcWlvbDF0czlz", embed: "https://www.instagram.com/reel/DXbMzaEFXlF/embed" },
  { platform: "Instagram", title: "Reel 内容案例 02", copy: "路线亮点种草", desc: "围绕景点、交通和体验亮点做短节奏剪辑，引导用户从观看进入咨询。", url: "https://www.instagram.com/reel/DZB4eS6NRLZ/?igsh=bmk4ZXJ4aGRqMXl6", embed: "https://www.instagram.com/reel/DZB4eS6NRLZ/embed" },
  { platform: "Instagram", title: "Reel 内容案例 03", copy: "城市氛围表达", desc: "通过城市地标、街景和旅行情绪强化品牌质感，提升内容收藏和转发意愿。", url: "https://www.instagram.com/reel/DY6a1EwNMyf/?igsh=czFodzM0aDZuc3dp", embed: "https://www.instagram.com/reel/DY6a1EwNMyf/embed" },
  { platform: "Instagram", title: "Reel 内容案例 04", copy: "入境游产品展示", desc: "将产品卖点拆成可视化片段，突出线路、服务和体验差异，承接转化链路。", url: "https://www.instagram.com/reel/DXJgbCej9nC/?igsh=ZXl6am54NWhtaDBm", embed: "https://www.instagram.com/reel/DXJgbCej9nC/embed" },
  { platform: "Instagram", title: "Reel 内容案例 05", copy: "文化体验内容", desc: "把中国文化体验转译成海外用户容易理解的短视频语言，降低认知门槛。", url: "https://www.instagram.com/reel/DVx69H9iVm2/?igsh=dmduYnl3dnc5NDl2", embed: "https://www.instagram.com/reel/DVx69H9iVm2/embed" },
  { platform: "Instagram", title: "Reel 内容案例 06", copy: "互动引流内容", desc: "用轻量问题、旅行愿望和目的地场景引导评论互动，为私域咨询沉淀线索。", url: "https://www.instagram.com/reel/DVvbWkUDTi9/?igsh=NHR2dGttcTVwNWtq", embed: "https://www.instagram.com/reel/DVvbWkUDTi9/embed" },
];

const aiWebsites = [
  { title: "俄罗斯市场产品介绍网站", url: "https://wowchinatravel.pages.dev/ru/", desc: "面向俄语区用户展示中国旅游产品、目的地亮点和服务信息，用于承接俄罗斯市场的品牌认知与咨询转化。" },
  { title: "国内文旅品牌介绍网站", url: "https://lifan54.rth1.xyz/", desc: "用于呈现国内文旅品牌形象、项目介绍和服务能力，强化对外展示与项目沟通效率。" },
];

const works = [
  ["海外社媒账号视觉", "头像、背景、视频封面、宣传海报与账号主页视觉统一"],
  ["短视频内容资产", "文旅出海选题、脚本、剪辑、封面标题与发布优化"],
  ["活动传播物料", "产品手册、宣传折页、海报、直播活动视觉与融媒体传播素材"],
  ["投流复盘报告", "曝光、播放、互动、引流、转化数据监测与素材优化沉淀"],
];

const abilities = [
  ["品牌从 0 到 1", "定位、视觉、内容调性到渠道搭建，完成品牌初期体系建设。"],
  ["新媒体矩阵运营", "账号定位、内容规划、用户互动、私域沉淀与多平台节奏管理。"],
  ["短视频全流程", "选题、脚本、拍摄、剪辑、封面标题和发布优化全链路执行。"],
  ["数据化增长", "通过曝光、互动、完播、转化等指标追踪表现并持续优化。"],
  ["项目统筹落地", "拆解目标、整合资源、推进执行，在多方协作中把控节奏。"],
  ["AI 应用与创新", "将 AI 用于内容构思、素材生产、效率提升和方案迭代。"],
];

const software = [
  { name: "Adobe Photoshop", level: "精通掌握", src: "/icon/资源 8.png", desc: "可完成图片精修、海报排版、社媒封面、活动视觉与品牌物料设计。" },
  { name: "Adobe Illustrator", level: "精通掌握", src: "/icon/资源 9.png", desc: "可完成矢量绘制、品牌图形、Logo 延展、图标与宣传物料基础设计。" },
  { name: "Adobe Premiere Pro", level: "熟悉使用", src: "/icon/资源 7.png", desc: "可完成基础短视频剪辑、字幕音效、活动回顾与品牌视频成片输出。" },
  { name: "剪映 / CapCut", level: "精通掌握", src: "/icon/资源 6.png", desc: "可完成口播、探店、活动花絮、平台化短视频包装和高效批量剪辑。" },
  { name: "PDF 工具", level: "精通掌握", src: "/icon/资源 5.png", desc: "可完成 PDF 整理、压缩、批注、转档、合并拆分与对外资料交付优化。" },
  { name: "OpenAI", level: "精通掌握", src: "/icon/资源 3.png", whiteBg: true, desc: "可用于选题策划、脚本打磨、内容改写、方案推演与运营效率提升。" },
  { name: "Gemini", level: "精通掌握", src: "/icon/资源 10.png", desc: "可辅助资料分析、创意发散、图片理解、跨语言内容整理与生成视频制作。" },
  { name: "Claude", level: "中等掌握", src: "/icon/资源 2.png", whiteBg: true, desc: "可辅助长文梳理、资料总结、方案校对、文案优化与内容逻辑检查。" },
  { name: "OpenClaw", level: "中等掌握", src: "/icon/资源 1.png", whiteBg: true, desc: "可辅助内容管理、自动化执行、项目协同、素材整理与日常复盘沉淀。" },
];

const extendedSkills = [
  { title: "VPN 搭建", icon: "shield" },
  { title: "网页搭建", icon: "web" },
  { title: "AI Agent 搭建", icon: "agent" },
  { title: "独立站 SaaS 建站", icon: "saas" },
  { title: "海外支付", icon: "pay" },
  { title: "更多能力", icon: "more" },
];

function useRoute() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const getPath = () => {
    const currentPath = window.location.pathname;
    if (basePath && currentPath.startsWith(basePath)) {
      return currentPath.slice(basePath.length) || "/";
    }
    return currentPath;
  };
  const [path, setPath] = useState(getPath);
  useEffect(() => {
    const onPop = () => setPath(getPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (next) => {
    const nextUrl = basePath && next.startsWith("/") ? `${basePath}${next}` : next;
    window.history.pushState({}, "", nextUrl);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return [path, navigate];
}

function ContactButton({ className = "header-cta", children = "联系我", onClick }) {
  return <button className={className} type="button" onClick={onClick}>{children}</button>;
}

function ContactIcon({ type }) {
  if (type === "phone") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.6 9.8 3c.6-.1 1.2.2 1.4.8l1.1 2.8c.2.5.1 1.1-.4 1.5L10.5 9.4c.9 1.8 2.3 3.2 4.1 4.1l1.3-1.4c.4-.4 1-.6 1.5-.4l2.8 1.1c.6.2.9.8.8 1.4l-.6 2.6c-.2.8-.8 1.3-1.6 1.3C10.1 18.1 3.9 11.9 3.9 5.2c0-.8.5-1.5 1.3-1.6Z" /></svg>;
  }
  if (type === "wechat") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.7 5.1c-3.5 0-6.3 2.3-6.3 5.1 0 1.6.9 3 2.3 3.9l-.5 1.7 2-.9c.8.3 1.6.5 2.5.5h.5c-.1-.4-.2-.8-.2-1.2 0-2.7 2.6-4.8 5.8-4.8h.2c-.5-2.4-3.1-4.3-6.3-4.3Zm-2.1 3.3c.5 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.3-.8.8-.8Zm4.2 0c.5 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.3-.8.8-.8Zm4.3 2.3c-2.7 0-4.9 1.8-4.9 4s2.2 4 4.9 4c.7 0 1.3-.1 1.9-.3l1.6.7-.4-1.3c1.1-.8 1.8-1.9 1.8-3.1 0-2.2-2.2-4-4.9-4Zm-1.6 2.5c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7Zm3.3 0c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.8 5.8h14.4c.9 0 1.6.7 1.6 1.6v9.2c0 .9-.7 1.6-1.6 1.6H4.8c-.9 0-1.6-.7-1.6-1.6V7.4c0-.9.7-1.6 1.6-1.6Zm.8 2.2 6.4 4.7L18.4 8H5.6Zm13.1 2.1-5.8 4.2c-.5.4-1.2.4-1.8 0l-5.8-4.2v6h13.4v-6Z" /></svg>;
}

function MiniSkillIcon({ type }) {
  const paths = {
    shield: "M12 3 5 6v5c0 4.6 2.9 7.9 7 10 4.1-2.1 7-5.4 7-10V6l-7-3Zm-2.2 9 1.5 1.5 3.2-3.5",
    web: "M4 5h16v12H4V5Zm0 4h16M8 21h8M12 17v4",
    agent: "M7 11a5 5 0 0 1 10 0v5H7v-5Zm2-4V4m6 3V4M5 14H3m18 0h-2M10 13h.1M14 13h.1",
    saas: "M5 17h14M7 17V8h4v9m2 0V5h4v12M4 21h16",
    pay: "M4 7h16v10H4V7Zm0 3h16M7 14h4",
    more: "M6 12h.1M12 12h.1M18 12h.1",
  };
  return <svg className="mini-skill-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[type]} /></svg>;
}

function Header({ onContact }) {
  return (
    <header className="site-header">
      <a className="brand" href="#hero" aria-label="返回首页"><img src={avatarSrc} alt="栗帆头像" />栗帆</a>
      <nav aria-label="主导航"><a href="#experience">经历</a><a href="#projects">项目</a><a href="#works">作品</a><a href="#strengths">优势</a><a href="#contact">联系</a></nav>
      <ContactButton onClick={onContact} />
    </header>
  );
}

function ContactModal({ open, onClose }) {
  const [copied, setCopied] = useState("");
  if (!open) return null;
  const copyContact = async (item) => {
    try {
      await navigator.clipboard.writeText(item.value);
      setCopied(item.label);
    } catch {
      setCopied("复制失败");
    }
    window.setTimeout(() => setCopied(""), 1400);
  };
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="联系方式" onClick={onClose}>
      <div className="contact-modal" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose}>×</button>
        <div className="contact-signal" aria-hidden="true"><span/><span/><span/></div>
        <p className="eyebrow">Contact Card</p>
        <h2>联系方式</h2>
        <div className="contact-list">
          {contactInfo.map((item) => <button type="button" key={item.label} onClick={() => copyContact(item)}><ContactIcon type={item.icon} /><span>{item.label}</span><strong>{item.value}</strong></button>)}
        </div>
        <p className={`copy-hint ${copied ? "show" : ""}`}>{copied === "复制失败" ? "复制失败，请手动复制" : `${copied}已复制`}</p>
      </div>
    </div>
  );
}

function Home({ navigate }) {
  const [contactOpen, setContactOpen] = useState(false);
  const showContact = () => setContactOpen(true);
  return <><div className="noise" /><Header onContact={showContact} /><main>
    <section className="hero" id="hero"><video className="hero-video" autoPlay loop muted playsInline poster={assetPath("/visual-poster.svg")}><source src={assetPath("/hero-bg.mp4")} type="video/mp4" /></video><div className="motion"><span/><span/><span/></div><div className="hero-inner"><p className="eyebrow">New Media Operations / Brand Growth</p><h1>把品牌、内容与增长，做成可以持续运转的系统。</h1><p>我是栗帆，新媒体运营与海外增长运营。擅长从 0 到 1 搭建品牌传播体系，统筹社媒矩阵、短视频内容、投流优化、活动策划与项目落地。</p><div className="actions"><a className="primary" href="#projects">查看项目</a><ContactButton className="ghost" onClick={showContact}>获取联系</ContactButton></div></div><div className="hero-bottom"><span>Portfolio 2026</span><span>Shenzhen / Overseas Growth</span></div></section>

    <section className="section" id="experience"><div className="section-head wide"><p className="eyebrow">Profile</p><h2>个人经历</h2></div><div className="experience-layout"><div className="timeline">{timeline.map((job) => <article className="timeline-item" key={job.period}><time>{job.period}</time><div><h3>{job.company}{job.note ? <span className="company-note">{job.note}</span> : null}</h3><strong>{job.role}</strong><p>{job.intro}</p><ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul></div></article>)}</div><div className="stats">{stats.map(([v,l]) => <div className="stat" key={l}><strong>{v}</strong><span>{l}</span></div>)}</div></div></section>

    <section className="section" id="projects"><div className="section-head wide"><p className="eyebrow">Selected Projects</p><h2>精选项目</h2></div><div className="project-grid">{projects.map((p) => { const artSrc = p.cardCover || p.cover; return <button className={'project-card project-'+p.id+' tone-'+p.tone} key={p.id} onClick={() => navigate('/projects/'+p.id)}><div className="project-art">{artSrc ? <img src={assetPath(artSrc)} alt="" /> : <><span/><span/><span/></>}</div><div className="project-content"><span className="tag">{p.tag}</span><h3>{p.title}</h3><p>{p.summary}</p><div className="metrics">{p.metrics.map((m) => <span key={m}>{m}</span>)}</div></div></button>; })}</div></section>

    <section className="section works-section" id="works"><div className="section-head"><p className="eyebrow">Works</p><h2>作品展示</h2></div><div className="works-grid">{works.map(([title, text], index) => <article className="work-card" key={title}><div className="work-visual"><span>{String(index + 1).padStart(2, "0")}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="section" id="strengths"><div className="section-head wide"><p className="eyebrow">Strengths & Toolkit</p><h2>个人优势</h2></div><div className="strength-layout"><div className="strength-grid">{abilities.map(([t,txt],i) => <article className="strength" key={t}><span>{String(i+1).padStart(2,'0')}</span><h3>{t}</h3><p>{txt}</p></article>)}</div><aside className="software-panel"><div><p className="eyebrow">掌握技能</p><div className="software-grid">{software.map((item) => <span className={`software-icon ${item.whiteBg ? "white-logo" : ""}`} key={item.name} tabIndex="0" aria-label={`${item.name}：${item.level}，${item.desc}`}><span className="logo-plate"><img src={assetPath(item.src)} alt="" /></span><span className="skill-tooltip"><strong>{item.name}</strong><em>{item.level}</em><small>{item.desc}</small></span></span>)}</div></div><div className="extended-skill-panel"><p className="eyebrow">延展能力</p><div className="extended-skill-grid">{extendedSkills.map((item) => <article className={`extended-skill ${item.icon === "more" ? "is-more" : ""}`} key={item.title}><MiniSkillIcon type={item.icon} /><span>{item.icon === "more" ? "..." : item.title}</span></article>)}</div></div></aside></div></section>

    <section className="contact" id="contact"><div><p className="eyebrow">Contact</p><h2>期待和清晰、有执行力的团队一起，把增长做实。</h2><p>可围绕新媒体运营、品牌运营、海外增长、短视频内容、活动策划和项目统筹展开合作。</p><div className="actions"><ContactButton className="primary" onClick={showContact}>查看联系方式</ContactButton><a className="ghost" href="#hero">回到顶部</a></div></div></section>
  </main><ContactModal open={contactOpen} onClose={() => setContactOpen(false)} /></>;
}

function KolSocialCarousel() {
  const [active, setActive] = useState(0);
  const go = (direction) => {
    setActive((current) => (current + direction + kolSocialScreens.length) % kolSocialScreens.length);
  };

  return (
    <div className="kol-carousel">
      <button className="carousel-arrow prev" type="button" onClick={() => go(-1)} aria-label="上一张社媒截图">‹</button>
      <img src={assetPath(kolSocialScreens[active])} alt={`网红社媒主页及内容截图 ${active + 1}`} />
      <button className="carousel-arrow next" type="button" onClick={() => go(1)} aria-label="下一张社媒截图">›</button>
      <div className="carousel-dots" aria-label="社媒截图分页">
        {kolSocialScreens.map((_, index) => (
          <button className={index === active ? "active" : ""} type="button" key={index} onClick={() => setActive(index)} aria-label={`查看第 ${index + 1} 张`} />
        ))}
      </div>
    </div>
  );
}

function KolVideoCarousel() {
  const [active, setActive] = useState(0);
  const current = kolVideoCases[active];
  const go = (direction) => {
    setActive((value) => (value + direction + kolVideoCases.length) % kolVideoCases.length);
  };

  return (
    <div className="kol-video-carousel">
      <div className="kol-video-copy">
        <span>Instagram Reel</span>
        <h4>{current.title}</h4>
        <p>{current.desc}</p>
        <a href={current.url} target="_blank" rel="noreferrer">打开原视频</a>
      </div>
      <div className="kol-video-stage">
        <button className="carousel-arrow prev" type="button" onClick={() => go(-1)} aria-label="上一个视频">‹</button>
        <div className={`kol-video-frame ${current.ratio || "portrait"}`}>
          <iframe key={current.embed} src={current.embed} title={current.title} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen loading="lazy" />
        </div>
        <button className="carousel-arrow next" type="button" onClick={() => go(1)} aria-label="下一个视频">›</button>
        <div className="carousel-dots" aria-label="视频分页">
          {kolVideoCases.map((item, index) => <button className={index === active ? "active" : ""} type="button" key={item.url} onClick={() => setActive(index)} aria-label={`查看第 ${index + 1} 个视频`} />)}
        </div>
      </div>
    </div>
  );
}

function KolChinaTripCase() {
  const storyIcons = [
    <path d="M5 18 9 6l5 12 5-12" />,
    <path d="M7 8h10M7 12h10M7 16h10M4 8h.1M4 12h.1M4 16h.1" />,
    <path d="M4 12h5l3-6 3 12 3-6h2" />,
  ];

  return (
    <section className="kol-case">
      <div className="kol-overview">
        <div className="kol-case-head">
          <p className="eyebrow">Case Expansion</p>
          <h2>哈尔滨冰雪旅游马来西亚网红推广</h2>
          <p>依托马来西亚头部达人 Leng Yein 林云的本土影响力，以沉浸式冰雪文旅体验打破地域信息壁垒，将北京文化体验、哈尔滨冰雪奇观、亚布力滑雪和主题写真转化为面向东南亚市场的社媒内容资产。</p>
        </div>
        <div className="kol-cover-card">
          <img src={assetPath("/projects/kol-china-trip/cover.jpg")} alt="马来西亚网红姐妹中国行合影写真" />
        </div>
      </div>

      <div className="kol-result-grid">
        <article><strong>100万+</strong><span>全网曝光量</span></article>
        <article><strong>60万+</strong><span>内容访问量</span></article>
        <article><strong>500万+</strong><span>KOL 全网粉丝</span></article>
        <article><strong>100+</strong><span>马来西亚游客咨询社群</span></article>
      </div>

      <div className="kol-profile">
        <div className="kol-avatar-card">
          <img src={assetPath("/projects/kol-china-trip/leng-yein.jpg")} alt="Leng Yein 林云个人照片" />
          <strong>Leng Yein 林云</strong>
          <span>马来西亚头部达人 / 时尚旅游影响力人物</span>
        </div>
        <div className="kol-profile-main">
          <p className="eyebrow">Influencer Profile</p>
          <h3>Leng Yein 林云</h3>
          <p>Leng Yein 林云是马来西亚知名网红、模特及时尚达人，拥有拿督 D.P.W、博士等荣誉头衔，并曾获全球成就企业风云人物大奖及亚洲时尚旅游大使称号。她的个人风格鲜明，内容覆盖旅行、时尚、美食与生活方式，在马来西亚及东南亚华人圈具备较强号召力。</p>
          <p>本次中国行以 Leng Yein 与 Leng Sean 姐妹视角展开，通过“第一次深度体验中国冰雪旅行”的真实内容，降低马来西亚游客对哈尔滨冬季旅游的认知门槛，同时强化目的地的视觉吸引力和可信背书。</p>
          <div className="kol-links inline-links">
            {kolLinks.map((link) => (
              <a className={`kol-social-link ${link.type}`} key={link.url} href={link.url} target="_blank" rel="noreferrer">
                <span><BrandLogo type={link.type} /></span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="kol-profile-side">
          <article><strong>344万</strong><span>Facebook 粉丝</span></article>
          <article><strong>106.4万</strong><span>Instagram 粉丝</span></article>
          <article><strong>13.83万</strong><span>TikTok 粉丝</span></article>
          <article><strong>78%</strong><span>18-35 岁粉丝占比</span></article>
          <article><strong>68%</strong><span>女性粉丝占比</span></article>
          <article><strong>42%</strong><span>马来西亚粉丝占比</span></article>
        </div>
      </div>

      <div className="kol-story-grid">
        <article>
          <div className="story-kicker"><span>01</span><i><svg viewBox="0 0 24 24" aria-hidden="true">{storyIcons[0]}</svg></i></div>
          <h3>行程与内容策划</h3>
          <p>围绕“冰雪奇遇·北国风情之旅”搭建 8 天深度体验路线，覆盖北京环球影城、颐和园、哈尔滨市区、冰雪大世界、亚布力滑雪等高传播场景。</p>
        </article>
        <article>
          <div className="story-kicker"><span>02</span><i><svg viewBox="0 0 24 24" aria-hidden="true">{storyIcons[1]}</svg></i></div>
          <h3>供应商与执行统筹</h3>
          <p>对接写真摄影、无人机跟拍、地接向导、妆造团队、服装保暖、住宿交通等资源，确保达人体验、内容拍摄和跨城市执行节奏稳定落地。</p>
        </article>
        <article>
          <div className="story-kicker"><span>03</span><i><svg viewBox="0 0 24 24" aria-hidden="true">{storyIcons[2]}</svg></i></div>
          <h3>传播与私域转化</h3>
          <p>通过 Instagram、Facebook、TikTok 等平台进行内容分发，并沉淀 Jalan-Jalan Harbin 专题账号及咨询社群，完成从曝光到初步游客转化的闭环。</p>
        </article>
      </div>

      <div className="kol-media-section">
        <div className="kol-media-copy">
          <p className="eyebrow">Social Proof</p>
          <h3>视频内容与发布截图</h3>
          <p>这里展示我在项目中沉淀的传播作品与发布成果：上方为达人 Reels 视频案例，可看到内容选题、视觉呈现与发布形态；下方为主页、账号露出、发布内容和互动截图，用于呈现我对社媒传播链路与项目转化承接的整理能力。</p>
        </div>
        <div className="kol-proof-stack">
          <KolVideoCarousel />
          <div className="kol-screenshot-block">
            <div className="proof-subhead"><span>内容截图</span><small>达人主页 / 账号露出 / 发布反馈</small></div>
            <KolSocialCarousel />
          </div>
        </div>
      </div>

      <div className="kol-gallery-section">
        <div className="kol-media-copy">
          <p className="eyebrow">Visual Assets</p>
          <h3>写真与旅拍素材</h3>
          <p>项目通过宫廷写真、冰雪女皇主题、滑雪及民族服饰场景，形成可二次分发的高质感图片资产。</p>
        </div>
        <div className="kol-gallery">
          {kolPhotos.map((src, index) => <img key={src} src={assetPath(src)} alt={`马来网红姐妹中国行写真及旅拍素材 ${index + 1}`} />)}
        </div>
      </div>
    </section>
  );
}

function ImageSlot({ label, note }) {
  return (
    <div className="image-slot">
      <span>{label}</span>
      <small>{note}</small>
    </div>
  );
}

function BrandLogo({ type }) {
  if (type === "facebook") {
    return <img className="brand-logo-img" src={assetPath("/projects/overseas-growth/facebook-logo.svg")} alt="" />;
  }
  if (type === "instagram") {
    return <img className="brand-logo-img" src={assetPath("/projects/overseas-growth/instagram-logo.png")} alt="" />;
  }
  return <img className="brand-logo-img" src={assetPath("/projects/overseas-growth/tiktok-logo.svg")} alt="" />;
}

function SocialLinkCard({ item }) {
  return (
    <a
      className={`social-link-card social-${item.name.toLowerCase()}`}
      href={item.url}
      target="_blank"
      rel="noreferrer"
    >
      <span className="social-logo"><BrandLogo type={item.type} /></span>
      <strong>{item.name}</strong>
      <span className="account-tip">{item.account}</span>
      <small>{item.desc}</small>
    </a>
  );
}

function SocialChannelCard({ item }) {
  const content = (
    <>
      <span className={`social-logo muted ${item.icon ? "with-icon" : ""}`}>{item.icon ? <img src={assetPath(item.icon)} alt="" /> : item.logo}</span>
      <strong>{item.name}</strong>
      <span className="account-tip">{item.account}</span>
      <small>{item.desc}</small>
      {item.avatar ? (
        <span className="channel-story-card" aria-hidden="true">
          <span className="channel-avatar-frame"><img src={assetPath(item.avatar)} alt="" /></span>
          <span className="channel-copy-side">
            <span className="channel-account-name">{item.account}</span>
            <span><b>账号定位</b>{item.identity}</span>
            <span><b>名称释义</b>{item.meaning}</span>
          </span>
        </span>
      ) : null}
    </>
  );

  if (item.url) {
    return <a className="channel-card with-popover" href={item.url} target="_blank" rel="noreferrer">{content}</a>;
  }

  return <article className="channel-card">{content}</article>;
}

function ContentVideoCarousel() {
  const [active, setActive] = useState(0);
  const current = contentVideoCases[active];
  const go = (direction) => {
    setActive((value) => (value + direction + contentVideoCases.length) % contentVideoCases.length);
  };

  return (
    <div className="content-video-carousel">
      <div className="video-case-copy">
        <p className="eyebrow">Video Cases</p>
        <h4>短视频内容案例</h4>
        <p>精选 Instagram Reel 内容，作为内容策略体系下的可播放案例展示。左侧说明每条视频承担的传播任务，右侧保持竖屏视频比例。</p>
        <div className="video-case-meta">
          <span>{current.platform}</span>
          <strong>{current.title}</strong>
          <b>{current.copy}</b>
          <p>{current.desc}</p>
          <a href={current.url} target="_blank" rel="noreferrer">打开原链接</a>
        </div>
      </div>
      <div className="video-frame-wrap">
        <button className="carousel-arrow prev" type="button" onClick={() => go(-1)} aria-label="上一个视频">‹</button>
        {current.embed ? <iframe key={current.embed} src={current.embed} title={current.title} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen loading="lazy" /> : <div className="video-link-fallback"><span>{current.platform}</span><strong>{current.title}</strong><p>该分享链接不支持稳定内嵌播放，点击下方按钮打开原视频查看。</p><a href={current.url} target="_blank" rel="noreferrer">打开视频</a></div>}
        <button className="carousel-arrow next" type="button" onClick={() => go(1)} aria-label="下一个视频">›</button>
        <div className="carousel-dots" aria-label="视频分页">
          {contentVideoCases.map((item, index) => <button className={index === active ? "active" : ""} type="button" key={item.url} onClick={() => setActive(index)} aria-label={`查看第 ${index + 1} 个视频`} />)}
        </div>
      </div>
    </div>
  );
}

function OverseasSocialHub() {
  return (
    <div className="overseas-social-hub">
      <div className="case-headline">
        <div>
          <p className="eyebrow">Owned Media</p>
          <h3>从 0 到 1 搭建的海外社媒主页</h3>
        </div>
        <span>点击主平台卡片可跳转</span>
      </div>
      <div className="social-profile-card">
        <div className="social-avatar-wrap">
          <div className="social-avatar-frame">
            <img src={assetPath("/projects/overseas-growth/social-avatar.jpg")} alt="Jalan-Jalan China 社媒平台头像" />
          </div>
          <div className="avatar-story-card">
            <div className="avatar-preview-side">
              <div className="avatar-preview-frame">
                <img src={assetPath("/projects/overseas-growth/social-avatar.jpg")} alt="" />
              </div>
              <strong className="avatar-account-name">Jalan-Jalan China</strong>
            </div>
            <div className="avatar-copy-side">
              <article>
                <h4>品牌识别</h4>
                <p>以熊猫、中国地图、指南针和背包元素组合，传达亲和、可靠、探索中国的旅行品牌气质。</p>
              </article>
              <article>
                <h4>名称含义</h4>
                <p>Jalan-jalan 在马来语中有散步、闲逛、出门走走的语感，适合表达轻松发现中国的旅行体验。</p>
              </article>
            </div>
          </div>
        </div>
        <div>
          <strong>Jalan-Jalan China 统一社媒识别</strong>
          <p>用于 Facebook、Instagram、TikTok 等平台主页头像与品牌入口，让海外用户在不同渠道中快速识别品牌。</p>
        </div>
      </div>
      <div className="social-link-grid">
        {overseasSocialLinks.map((item) => <SocialLinkCard item={item} key={item.name} />)}
      </div>
      <div className="social-channel-grid">
        {overseasChannels.map((item) => <SocialChannelCard item={item} key={item.name} />)}
      </div>
    </div>
  );
}

function OverseasGrowthCase() {
  return (
    <section className="overseas-case">
      <OverseasSocialHub />

      <div className="overseas-hero-panel">
        <div>
          <p className="eyebrow">JalanJalan China</p>
          <h2>海外文旅品牌全案搭建</h2>
          <p>JalanJalan China 面向海外游客展示中国文化遗产、自然景观与现代生活。“JalanJalan”在马来语中意为散步、闲逛，品牌表达强调轻松、真实、有温度的中国旅行体验。</p>
          <div className="overseas-tags">
            {["品牌定位", "社媒运营", "内容策略", "视频制作", "数据增长", "KOL 营销"].map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
        <div className="brand-visual-card">
          <img src={assetPath("/projects/overseas-growth/brand-hero.png")} alt="Jalan-Jalan China 品牌主视觉海报" />
        </div>
      </div>

      <div className="overseas-stats">
        <article><strong>10+</strong><span>主流社媒平台</span></article>
        <article><strong>500+</strong><span>原创内容资产</span></article>
        <article><strong>2个</strong><span>AI 制作网站</span></article>
        <article><strong>全链路</strong><span>品牌 / 内容 / 投流 / 转化</span></article>
      </div>

      <div className="overseas-section split">
        <div>
          <p className="eyebrow">Overview</p>
          <h3>项目概述</h3>
          <p>作为品牌核心运营负责人，我主导品牌从 0 到 1 的搭建过程，覆盖品牌策略、视觉设计、社媒矩阵、内容生产、数据增长、商业化合作与跨境项目落地。</p>
          <p>项目目标不是单纯“发内容”，而是建立一套可持续运转的海外文旅传播系统：让海外用户认识中国、理解目的地、产生兴趣，并最终进入咨询和转化链路。</p>
        </div>
        <div className="overseas-points">
          <article><strong>品牌定位</strong><span>年轻、真实、有温度的中国文旅品牌形象</span></article>
          <article><strong>目标市场</strong><span>东南亚为重点，兼顾俄罗斯等入境旅游客源市场</span></article>
          <article><strong>核心目标</strong><span>提升中国文旅国际影响力，带动入境旅游关注量、咨询量与成交转化增长</span></article>
        </div>
      </div>

      <div className="overseas-section">
        <div className="case-headline">
          <p className="eyebrow">Responsibilities</p>
          <h3>我的职责</h3>
        </div>
        <div className="overseas-role-grid">
          {overseasRoles.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="overseas-section content-system">
        <div>
          <p className="eyebrow">Content System</p>
          <h3>内容策略体系</h3>
          <p>从“能被看见”到“愿意咨询”，内容分为种草、攻略、氛围、互动和深度介绍五类，分别承担拉新、建立信任、强化品牌调性和转化承接的作用。</p>
        </div>
        <div className="content-type-grid">
          {overseasContentTypes.map(([title, text]) => <article key={title}><strong>{title}</strong><span>{text}</span></article>)}
          </div>
          <ContentVideoCarousel />
        </div>

      <div className="overseas-ai-panel">
        <div>
          <p className="eyebrow">AI Application</p>
          <h3>企业飞书 AI 应用：OpenClaw</h3>
          <p>在企业飞书中搭建企业级 AI 应用 OpenClaw，用于内容运营、方案整理、素材管理、项目协同和日常复盘提效。同时结合 AI 完成两个官方网站的从 0 到 1 制作，用于不同市场的品牌展示、产品介绍和咨询承接。</p>
        </div>
        <div className="ai-capability-grid">
          <article><strong>内容提效</strong><span>辅助选题发散、脚本初稿、标题封面方向和多语言表达。</span></article>
          <article><strong>项目协同</strong><span>通过 AI Agent 协同办公，无缝嵌入飞书，辅助执行任务拆解、流程提醒、资料同步和跨团队协作。</span></article>
          <article><strong>数据统计</strong><span>利用 AI 定期自动化统计各社媒平台全方位数据，汇总至飞书表格并提供内容优化建议。</span></article>
        </div>
      </div>

      <div className="ai-website-section">
        <div className="case-headline">
          <div>
            <p className="eyebrow">AI-Built Websites</p>
            <h3>利用 AI 制作的网站</h3>
          </div>
          <span>点击访问</span>
        </div>
        <div className="ai-website-grid">
          {aiWebsites.map((site) => (
            <a href={site.url} target="_blank" rel="noreferrer" key={site.url}>
              <strong>{site.title}</strong>
              <p>{site.desc}</p>
              <span className="visit-icon" aria-label="访问网站">↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="overseas-visual-row">
        <ImageSlot label="社媒主页截图预留" note="可放 Facebook / Instagram / TikTok 主页截图" />
        <ImageSlot label="内容模板预留" note="可放 Reels 封面、图文模板、视频封面" />
        <ImageSlot label="投流复盘预留" note="可放数据看板、月度复盘或广告后台截图" />
      </div>

      <div className="overseas-section split">
        <div>
          <p className="eyebrow">Growth & KOL</p>
          <h3>数据增长与 KOL 合作</h3>
          <p>基于内容表现与投流反馈，持续优化素材、受众、发布时间和内容结构；同时整合海外达人资源，用头部 KOL 做品牌背书，用中腰部达人做垂类触达和真实体验扩散。</p>
        </div>
        <div className="growth-grid">
          <article><strong>投放优化</strong><span>粉丝获取成本、内容互动率、引流转化和品牌搜索量持续复盘。</span></article>
          <article><strong>KOL 合作</strong><span>达人筛选、创意 brief、执行跟进、效果复盘形成标准流程。</span></article>
          <article><strong>项目落地</strong><span>对接文旅客户、景区、服务商与达人团队，推进项目合作交付。</span></article>
        </div>
      </div>

      <div className="overseas-section challenge-section">
        <article>
          <p className="eyebrow">Highlights</p>
          <h3>项目亮点</h3>
          <ul>
            <li>从 0 到 1 完成品牌策略、视觉、账号、内容、增长与合作闭环。</li>
            <li>把中国文化转化为海外用户更容易理解的旅行叙事和内容语言。</li>
            <li>建立数据监测与复盘机制，用内容表现反向驱动策略优化。</li>
          </ul>
        </article>
        <article>
          <p className="eyebrow">Challenges</p>
          <h3>挑战与应对</h3>
          <ul>
            <li>文化差异：通过本地化表达和用户画像研究降低理解门槛。</li>
            <li>跨境协作：用标准化流程管理达人、服务商、客户与内部团队。</li>
            <li>流量波动：多平台分发降低风险，并持续创新内容形式。</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function ResultGlyph({ index }) {
  const paths = [
    "M4 13h4l2-6 4 12 2-6h4",
    "M5 17V7h14v10H5Zm3-7h8M8 13h5",
    "M12 4a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v5H4v-5a3 3 0 0 1 3-3h1V8a4 4 0 0 1 4-4Zm-2 5h4V8a2 2 0 0 0-4 0v1Z",
    "M7 8a5 5 0 0 1 10 0v4a5 5 0 0 1-10 0V8Zm5 11v-2M8 21h8",
  ];
  return <svg className="result-glyph" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[index % paths.length]} /></svg>;
}

function DetailPointIcon({ index }) {
  const paths = [
    "M5 12h14M12 5v14",
    "M4 7h16M7 12h10M9 17h6",
    "M6 17 12 5l6 12M8.5 13h7",
    "M5 8h14v10H5zM8 5h8",
    "M4 14h5l3-7 3 10 2-5h3",
  ];
  return <svg className="detail-point-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={paths[index % paths.length]} /></svg>;
}

function KolDetailPointIcon({ index }) {
  const icons = [
    [
      "M496 30.4L472 72v880l24 41.6 24-41.6V72z",
      "M496 240l-96-64v-48l96 64zM496 336L368 256v-48l128 80zM496 240l96-64v-48l-96 64zM496 336l128-80v-48L496 288zM496 784l-96 64v48l96-64zM496 688L368 768v48l128-80zM496 784l96 64v48l-96-64zM496 688l128 80v48L496 736z",
      "M79.2 752.8h48l761.6-440 24-41.6h-48l-761.6 440z",
      "M260 648l-7.2 115.2-41.6 24 7.2-115.2zM343.2 600l-5.6 151.2-41.6 24 5.6-151.2z",
      "M260 648l-103.2-51.2-41.6 24L218.4 672zM343.2 600l-133.6-70.4-41.6 24L301.6 624zM731.2 376l103.2 51.2 41.6-24L772.8 352zM648 424l133.6 71.2 41.6-24L689.6 400z",
      "M731.2 376l7.2-115.2 41.6-24-7.2 115.2zM648 424l5.6-150.4 41.6-24-5.6 150.4z",
      "M912.8 752.8h-48l-761.6-440-24-41.6h48l761.6 440z",
      "M732 648l7.2 115.2 41.6 24-7.2-115.2zM648.8 600l5.6 151.2 41.6 24-5.6-151.2z",
      "M732 648l103.2-51.2 41.6 24L773.6 672zM648.8 600l133.6-70.4 41.6 24L690.4 624zM260.8 376l-103.2 51.2-41.6-24L219.2 352zM344 424l-133.6 71.2-41.6-24L302.4 400zM260.8 376l-7.2-115.2-41.6-24 7.2 115.2z",
      "M344 424l-5.6-150.4-41.6-24 5.6 150.4z",
      "M496 663.2l-131.2-75.2V436.8L496 360.8l131.2 75.2v151.2L496 663.2zM404.8 564.8L496 616.8l91.2-52.8v-104L496 407.2l-91.2 52.8v104.8z",
    ],
    [
      "M556.924165 918.406057 92.431156 918.406057c-14.933107 0-27.013237-12.081153-27.013237-27.009144 0-135.902226 245.846244-241.865583 320.652997-258.033821 1.797949-5.03569 3.40454-13.926174 4.196579-22.817682-16.618493-18.938328-52.756551-65.364707-67.240427-125.21891-14.795984-7.80578-27.140127-23.159466-34.868135-44.183292-11.000542-29.963429-11.900028-71.113641 8.807596-98.78691-4.034896-37.721113-14.136975-135.687332 44.212968-200.660112 35.000142-38.957267 87.624686-58.71731 156.423609-58.71731 68.793806 0 121.41835 19.760043 156.423609 58.71731 58.344826 64.97278 48.242747 162.938999 44.207851 200.660112 20.706601 27.67327 19.808138 68.823482 8.80862 98.78691-7.729032 21.024849-20.073174 36.377512-34.869159 44.183292-14.483876 59.854203-50.621934 106.251929-67.264986 125.190257 0.315178 3.477194 0.74906 6.92676 1.26583 10.141988M606.173846 620.658745l-54.17383 3.906983c-1.220804-9.152451-1.586125-17.5804-1.641383-23.780613-0.054235-7.254218 2.847861-14.268982 7.962346-19.387559 0.528026-0.528026 52.810786-53.391001 63.943334-121.579009 2.134617-13.057387 13.424754-22.657023 26.666336-22.657023 1.133823-1.24127 9.286504-12.793374 11.372002-31.840172 1.606591-14.771425-1.348718-27.725458-7.571443-32.972972-6.384407-5.435803-9.892301-13.476943-9.496282-21.840424 0.132006-3.009544 0.605797-7.493671 1.211595-13.193487 3.590781-33.524534 12.032034-112.054075-30.598902-159.50683-24.346501-27.062356-63.439868-40.808428-116.245538-40.808428-52.810786 0-91.904153 13.746072-116.250654 40.808428-42.630936 47.456848-34.189683 125.982296-30.598902 159.510924 0.605797 5.695722 1.079588 10.17985 1.211595 13.189394 0.396019 8.363482-3.111874 16.408715-9.496282 21.840424-6.222725 5.251607-9.179057 18.201547-7.571443 32.972972 2.085498 19.045775 10.239202 30.598902 13.296841 32.210609 13.242606 0 22.606881 9.232269 24.741497 22.289656 11.239995 68.739571 63.362096 121.022331 63.86454 121.520681 5.192256 5.14416 8.069793 12.134365 8.015557 19.417235-0.185218 23.422456-4.7727 78.5541-43.230594 84.620259-59.69866 9.520841-241.757113 94.538143-276.420587 179.000813l403.043473 0 28.716019 54.022381M125.164674 864.383676",
      "M917.355121 938.552909 551.281655 938.552909c-23.317055 0-42.240033-19.399839-42.240033-43.307342L509.041622 664.167678c0-23.936155 18.922978-43.309388 42.240033-43.309388l70.399373 0 0-14.446014c0-23.935132 18.922978-43.338041 42.240033-43.338041l140.797723 0c23.313985 0 42.236963 19.402909 42.236963 43.338041l0 14.446014 70.399373 0c23.317055 0 42.240033 19.401886 42.240033 43.309388l0 231.048213C959.595154 919.15307 940.672176 938.552909 917.355121 938.552909zM920.42504 676.640758c0-11.177574-8.9263-20.218484-19.937075-20.218484l-86.393649 0 0-33.706683c0-11.180644-8.9263-20.218484-19.937075-20.218484L674.508187 602.497107c-11.010775 0-19.937075 9.06854-19.937075 20.218484l0 33.706683-86.422302 0c-11.010775 0-19.937075 9.06854-19.937075 20.218484l0 202.270796c0 11.180644 8.9263 20.218484 19.937075 20.218484l332.311525 0c11.010775 0 19.937075-9.066493 19.937075-20.218484L920.397411 676.640758zM734.319411 866.354564c-54.434773 0-98.56076-45.25367-98.56076-101.093443 0-55.840796 44.125987-101.093443 98.56076-101.093443 54.431703 0 98.55769 45.251623 98.55769 101.093443C832.878125 821.072241 788.751115 866.354564 734.319411 866.354564zM734.319411 693.059706c-38.888705 0-70.399373 32.327266-70.399373 72.201415 0 39.872103 31.510668 72.201415 70.399373 72.201415 38.888705 0 70.399373-32.329313 70.399373-72.201415C804.718785 725.385948 773.208117 693.059706 734.319411 693.059706zM726.741829 727.708853c-15.546068 0-29.244045 15.089673-29.244045 31.05632L683.419138 758.765173c0-23.935132 19.978007-45.474704 43.322691-45.474704l10.825556 0 0 14.418384z",
    ],
    [
      "M340.138667 782.08a389.376 389.376 0 0 1-25.045334-6.570667c0.512 0.128-28.117333 13.909333-67.413333 36.010667l-1.834667 1.066667c-32.085333 18.048-41.813333 23.381333-54.784 29.824-27.264 13.44-38.314667 17.066667-51.84 7.552-19.114667-13.482667-17.962667-20.821333 1.28-104.789334l0.213334-0.810666c6.442667-28.117333 8.874667-39.338667 10.752-51.072a114.346667 114.346667 0 0 0 1.706666-14.933334v-0.384c0.128 0.426667 0.597333 1.322667 2.304 3.2l0.938667 0.981334C85.12 612.522667 44.245333 518.4 44.245333 417.962667c0-206.72 172.074667-374.058667 384-374.058667a387.328 387.328 0 0 1 296.362667 136.106667l22.357333 7.68c138.837333 55.253333 232.96 195.029333 232.96 350.848 0 101.504-36.949333 194.56-103.424 265.514666 0.213333 2.901333 0.682667 6.826667 1.450667 11.776 1.578667 9.941333 1.578667 9.898667 8.96 46.250667l2.090667 10.453333c13.269333 66.986667 15.488 90.410667-4.266667 103.509334a22.570667 22.570667 0 0 1-19.114667 4.949333 41.216 41.216 0 0 1-9.984-2.986667 167.210667 167.210667 0 0 1-18.261333-9.386666 799.402667 799.402667 0 0 1-22.144-13.397334l-24.704-15.445333-4.010667-2.517333c-20.096-12.501333-33.621333-20.522667-44.416-26.154667a102.826667 102.826667 0 0 0-13.226666-5.973333l0.426666 0.085333c1.450667 0.213333 3.84-0.256 8.618667-3.712l-8.789333 3.712c-47.018667 8.192-75.946667 12.586667-103.594667 15.232-111.146667-2.858667-210.56-50.133333-280.149333-127.146667a21.248 21.248 0 0 1-5.248-11.178666z m63.744 9.173333a345.173333 345.173333 0 0 0 220.16 86.613334c22.954667-2.304 50.005333-6.4 93.610666-13.952 16-8.832 30.933333-0.554667 91.434667 37.12l4.053333 2.56 24.618667 15.36c6.869333 4.309333 12.501333 7.722667 17.28 10.538666a491.690667 491.690667 0 0 0-7.893333-48.64l-2.048-10.24c-7.637333-37.546667-7.552-37.290667-9.301334-48.170666-3.626667-23.253333-3.84-32.725333 4.821334-42.581334 62.336-64.298667 96.64-148.608 96.64-241.322666 0-123.904-66.986667-236.330667-168.234667-293.205334a364.714667 364.714667 0 0 1 43.221333 172.629334c0 206.72-172.032 374.058667-384 374.058666-8.106667 0-16.256-0.256-24.362666-0.768z m-221.781334-36.522666c-5.888 25.6-8.618667 38.4-10.453333 49.664l0.512-0.256c12.032-5.930667 21.504-11.136 52.778667-28.757334l1.834666-1.024c66.261333-37.290667 82.56-45.141333 100.565334-39.722666a350.72 350.72 0 0 0 100.906666 14.72c188.672 0 341.333333-148.48 341.333334-331.392 0-182.912-152.661333-331.392-341.333334-331.392-188.629333 0-341.333333 148.48-341.333333 331.392 0 89.130667 36.394667 172.629333 100.096 234.410666 14.848 14.378667 13.738667 21.248-4.693333 101.546667l-0.213334 0.810667z",
      "M256 426.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z",
      "M426.666667 426.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z",
      "M597.333333 426.666667m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z",
    ],
    [
      "M510.464 599.552c-82.944 0-153.6-59.392-167.936-140.8-1.536-8.704 1.024-17.408 6.656-24.064 5.632-7.168 14.336-11.264 23.04-11.264 14.848 0 26.624 10.24 29.184 24.576 9.728 52.736 55.296 91.136 109.056 91.136 53.248 0 99.328-38.4 109.056-91.136 2.56-14.336 14.848-24.576 29.184-24.576 9.216 0 17.408 4.096 23.04 10.752s7.68 15.36 6.656 24.064c-13.824 81.408-83.968 140.288-166.912 140.288 0 1.024-1.024 1.024-1.024 1.024z",
      "M674.816 979.968c-12.8 0-23.552-7.68-27.648-19.456l-11.264-33.28-72.704-209.92 5.632-1.024c144.384-28.672 248.832-156.16 248.832-303.104 0-169.984-138.752-308.736-308.736-308.736-2.56 0-4.608 0-7.168 0.512h-6.656c-74.752 3.072-146.944 34.304-201.728 88.576-54.272 53.76-87.04 124.928-91.648 200.704-9.216 154.112 97.28 292.352 248.32 322.048l6.144 1.024-72.704 209.92-11.264 33.28c-4.096 11.776-14.848 19.456-27.648 19.456-9.216 0-17.92-4.096-23.552-11.776-5.632-7.168-7.168-16.384-4.096-25.6l57.856-187.392-4.096-1.536c-115.712-47.616-198.144-148.992-221.696-271.36l-1.536-9.216-6.656 6.144c-35.328 31.744-54.272 75.776-54.272 122.88 0 92.672 75.776 168.448 168.448 168.448h10.752L217.6 926.72l-11.264 33.792c-4.096 11.776-14.848 19.456-27.648 19.456-9.216 0-17.92-4.096-23.552-11.776-5.632-7.168-7.168-16.384-4.096-25.6L189.44 819.2l-4.608-1.536c-94.72-30.208-158.72-117.248-158.72-215.552 0-80.384 43.52-155.648 113.664-196.096l2.56-1.536v-3.072c3.072-94.72 41.984-183.808 110.08-250.88C322.048 81.92 413.696 44.032 510.976 44.032s188.928 37.888 258.56 105.984c67.584 67.072 106.496 156.16 109.568 250.88v3.072l2.56 1.536c70.144 40.448 113.664 115.712 113.664 196.096 0 97.792-65.024 186.368-158.72 215.04l-5.12 1.536 38.4 123.904c2.56 9.216 1.024 18.432-4.096 25.6-5.632 7.168-14.336 11.776-23.552 11.776-13.312 0-24.064-7.68-28.16-19.456l-16.896-50.176h-1.024l-41.984-139.776 7.168 0.512c1.536 0.512 2.56 0.512 3.584 0.512 93.184 0 168.96-75.776 168.96-168.448 0-46.592-19.968-91.648-54.272-122.88l-6.656-6.144-1.536 9.216c-23.552 122.368-105.984 223.744-221.696 271.36l-4.096 1.536 56.32 181.76 1.536 5.12c2.56 9.216 1.024 18.432-4.096 25.6-6.656 7.168-15.36 11.776-24.576 11.776z",
    ],
  ];
  return <svg className="detail-point-icon filled" viewBox="0 0 1024 1024" aria-hidden="true">{icons[index % icons.length].map((d) => <path key={d} d={d} />)}</svg>;
}

function OverseasDetailPointIcon({ index }) {
  const icons = [
    [
      "M881.495914 620.85829l0-264.657682c0-39.812751-21.203928-77.257571-55.336306-97.734952L570.998207 105.385189c-36.163641-21.715581-81.093946-21.715581-117.27703 0L198.558753 258.465656c-34.131355 20.47738-55.336306 57.922201-55.336306 97.734952l0 312.474734c0 39.792285 21.203928 77.236082 55.336306 97.724719l255.162424 153.10298c18.108426 10.852162 38.378076 16.283872 58.670238 16.283872 20.236903 0 40.496319-5.409197 58.551534-16.239869L828.830437 766.097162l-0.183172-0.316202c6.181793-3.683902 10.513448-10.157337 10.513448-17.869996 0-11.710716-9.471722-21.184485-21.149693-21.184485-3.986801 0-7.483438 1.390673-10.654664 3.282766l-0.185218-0.292666-257.96526 153.493883c-22.735817 13.644765-50.969858 13.644765-73.704652 0L220.350059 730.107483c-21.464871-12.873192-34.794457-36.424584-34.794457-61.431118L185.555601 356.200608c0-25.028023 13.329587-48.557926 34.794457-61.430094l255.152191-153.092747c22.735817-13.643742 50.969858-13.643742 73.704652 0l255.18289 153.092747c21.443381 12.872169 34.760688 36.402071 34.760688 61.430094l0 264.667915 0 0.042979c0 11.689227 9.496282 21.161972 21.184485 21.161972 11.689227 0 21.171182-9.472745 21.171182-21.161972C881.50717 620.888989 881.495914 620.878756 881.495914 620.85829z",
      "M384.577401 749.4756l-11.08036-39.488363c-2.889817-10.329253-13.057387-16.870226-23.659863-15.208377l-42.485627 6.691399c-17.934464 2.825348-30.861892-16.760732-21.22644-32.142048l66.76459-106.577341c-41.757033-55.389518-53.06559-129.866766-24.321942-198.467167 27.288506-65.156976 89.249697-111.445208 159.403476-119.809713 121.003911-14.392802 224.149083 80.125899 224.149083 198.305485 0 43.399439-14.198374 85.394902-40.259936 119.971395l66.75231 106.577341c9.637498 15.381315-3.290953 34.967396-21.225417 32.142048l-42.48665-6.691399c-10.600429-1.661849-20.769023 4.880147-23.679305 15.208377l-11.059893 39.477107c-4.964058 17.695011-28.558429 21.106714-38.32384 5.528923L530.782274 641.551588c-12.687974 1.336438-24.13877 1.336438-36.82572 0l-71.064522 113.452935C413.136853 770.582313 389.531226 767.181867 384.577401 749.4756zM551.945269 595.610256l60.386322 96.379071 8.300037-29.67895c2.912329-10.320043 13.077853-16.859993 23.670096-15.186887l33.774221 5.291516-58.573023-93.488231 10.524704-11.862165c40.183188-45.266973 52.05661-110.552885 25.65838-169.59356-20.551058-45.972031-63.321164-79.875189-112.823602-89.216951-100.113115-18.934235-187.908694 57.758472-187.908694 154.526399 0 38.35761 14.111392 75.400271 39.769772 104.285135l10.515494 11.862165-58.574047 93.488231 33.761941-5.291516c10.602476-1.673106 20.771069 4.866844 23.659863 15.186887l8.332782 29.644157 60.364833-96.343255 13.904685 2.292206c17.001209 2.803859 34.348296 2.803859 51.351552 0L551.945269 595.610256z",
      "M433.884386 516.419659l7.234775-42.224684c1.184989-6.876618-1.096984-13.871939-6.082532-18.738783l-30.709419-29.927613c-12.56927-12.255115-5.627161-33.577746 11.731182-36.109406l42.421158-6.17156c6.90834-0.998747 12.862959-5.323239 15.934924-11.568477l18.968004-38.423101c7.777127-15.719007 30.199813-15.719007 37.966707 0l18.954701 38.423101c3.096525 6.245238 9.038864 10.56973 15.937994 11.568477l42.429345 6.17156c17.370623 2.530636 24.299429 23.854291 11.732206 36.109406l-30.697139 29.927613c-4.998851 4.866844-7.269567 11.861142-6.096858 18.738783l7.247054 42.224684c2.956332 17.292851-15.199167 30.470989-30.711466 22.312168l-37.923728-19.934005c-6.167466-3.246951-13.533224-3.246951-19.693528 0l-37.933961 19.934005C449.060017 546.891671 430.908612 533.713534 433.884386 516.419659zM502.527766 470.959282c6.161327-3.237741 13.526061-3.237741 19.693528 0l19.664875 10.352789-3.748371-21.932522c-1.172709-6.865361 1.108241-13.862729 6.083555-18.72855l15.912411-15.512299-21.985734-3.193739c-6.90834-0.99977-12.860912-5.332449-15.948227-11.580756l-9.828856-19.921725-9.830903 19.921725c-3.085268 6.248308-9.05933 10.582009-15.947204 11.580756l-21.998013 3.193739 15.904225 15.512299c5.008061 4.865821 7.277754 11.863189 6.104021 18.72855l-3.75758 21.932522L502.527766 470.959282z",
    ],
    [
      "M510.464 599.552c-82.944 0-153.6-59.392-167.936-140.8-1.536-8.704 1.024-17.408 6.656-24.064 5.632-7.168 14.336-11.264 23.04-11.264 14.848 0 26.624 10.24 29.184 24.576 9.728 52.736 55.296 91.136 109.056 91.136 53.248 0 99.328-38.4 109.056-91.136 2.56-14.336 14.848-24.576 29.184-24.576 9.216 0 17.408 4.096 23.04 10.752s7.68 15.36 6.656 24.064c-13.824 81.408-83.968 140.288-166.912 140.288 0 1.024-1.024 1.024-1.024 1.024z",
      "M674.816 979.968c-12.8 0-23.552-7.68-27.648-19.456l-11.264-33.28-72.704-209.92 5.632-1.024c144.384-28.672 248.832-156.16 248.832-303.104 0-169.984-138.752-308.736-308.736-308.736-2.56 0-4.608 0-7.168 0.512h-6.656c-74.752 3.072-146.944 34.304-201.728 88.576-54.272 53.76-87.04 124.928-91.648 200.704-9.216 154.112 97.28 292.352 248.32 322.048l6.144 1.024-72.704 209.92-11.264 33.28c-4.096 11.776-14.848 19.456-27.648 19.456-9.216 0-17.92-4.096-23.552-11.776-5.632-7.168-7.168-16.384-4.096-25.6l57.856-187.392-4.096-1.536c-115.712-47.616-198.144-148.992-221.696-271.36l-1.536-9.216-6.656 6.144c-35.328 31.744-54.272 75.776-54.272 122.88 0 92.672 75.776 168.448 168.448 168.448h10.752L217.6 926.72l-11.264 33.792c-4.096 11.776-14.848 19.456-27.648 19.456-9.216 0-17.92-4.096-23.552-11.776-5.632-7.168-7.168-16.384-4.096-25.6L189.44 819.2l-4.608-1.536c-94.72-30.208-158.72-117.248-158.72-215.552 0-80.384 43.52-155.648 113.664-196.096l2.56-1.536v-3.072c3.072-94.72 41.984-183.808 110.08-250.88C322.048 81.92 413.696 44.032 510.976 44.032s188.928 37.888 258.56 105.984c67.584 67.072 106.496 156.16 109.568 250.88v3.072l2.56 1.536c70.144 40.448 113.664 115.712 113.664 196.096 0 97.792-65.024 186.368-158.72 215.04l-5.12 1.536 38.4 123.904c2.56 9.216 1.024 18.432-4.096 25.6-5.632 7.168-14.336 11.776-23.552 11.776-13.312 0-24.064-7.68-28.16-19.456l-16.896-50.176h-1.024l-41.984-139.776 7.168 0.512c1.536 0.512 2.56 0.512 3.584 0.512 93.184 0 168.96-75.776 168.96-168.448 0-46.592-19.968-91.648-54.272-122.88l-6.656-6.144-1.536 9.216c-23.552 122.368-105.984 223.744-221.696 271.36l-4.096 1.536 56.32 181.76 1.536 5.12c2.56 9.216 1.024 18.432-4.096 25.6-6.656 7.168-15.36 11.776-24.576 11.776z",
    ],
    [
      "M312.32 522.24c-5.12 0-15.36 0-20.48-5.12L76.8 307.2c-30.72-30.72-30.72-81.92 0-112.64l122.88-117.76c30.72-30.72 81.92-30.72 112.64 0l215.04 209.92c10.24 10.24 10.24 25.6 0 35.84-15.36 5.12-30.72 5.12-40.96-5.12l-215.04-204.8c-10.24-10.24-25.6-10.24-35.84 0L112.64 230.4c-5.12 5.12-10.24 10.24-10.24 20.48 0 5.12 5.12 10.24 10.24 15.36l215.04 209.92c5.12 5.12 10.24 20.48 5.12 30.72 0 10.24-10.24 15.36-20.48 15.36z m455.68 424.96c-20.48 0-40.96-10.24-56.32-20.48l-220.16-215.04c-5.12-5.12-10.24-15.36-5.12-25.6 0-10.24 10.24-15.36 20.48-20.48 10.24 0 20.48 0 25.6 5.12l220.16 215.04c10.24 10.24 30.72 10.24 40.96 0l122.88-117.76c10.24-10.24 10.24-25.6 0-35.84l-220.16-215.04c-5.12-5.12-10.24-15.36-5.12-25.6 0-10.24 10.24-15.36 20.48-20.48 10.24 0 20.48 0 25.6 5.12l220.16 215.04c30.72 30.72 30.72 81.92 0 112.64L834.56 921.6c-25.6 20.48-46.08 30.72-66.56 25.6z",
      "M158.72 916.48c-20.48 0-40.96-10.24-56.32-25.6-15.36-15.36-20.48-35.84-15.36-56.32l25.6-153.6c0-15.36 10.24-30.72 20.48-40.96L716.8 71.68c10.24-15.36 30.72-20.48 51.2-20.48s35.84 5.12 51.2 20.48l133.12 128c15.36 15.36 20.48 30.72 20.48 51.2s-10.24 35.84-20.48 51.2L368.64 870.4c-10.24 10.24-25.6 15.36-40.96 20.48l-153.6 25.6h-15.36zM768 102.4c-5.12 0-10.24 0-15.36 5.12L168.96 675.84c-5.12 5.12-5.12 5.12-5.12 10.24l-25.6 153.6c0 10.24 0 15.36 5.12 15.36 5.12 5.12 10.24 10.24 20.48 5.12l153.6-25.6c5.12 0 10.24-5.12 10.24-5.12l583.68-563.2c5.12-5.12 10.24-10.24 10.24-15.36 0-5.12 0-10.24-5.12-15.36l-133.12-128c-5.12-5.12-10.24-5.12-15.36-5.12zM158.72 373.76c-10.24 0-20.48-5.12-20.48-15.36-5.12-10.24 0-20.48 5.12-25.6L256 220.16c5.12-5.12 15.36-10.24 25.6-5.12 10.24 0 15.36 10.24 20.48 20.48s0 20.48-5.12 25.6L179.2 368.64c-5.12 5.12-10.24 5.12-20.48 5.12z m71.68 71.68c-10.24 0-20.48-10.24-25.6-15.36s0-20.48 5.12-30.72l112.64-107.52c5.12-5.12 15.36-10.24 25.6-5.12 10.24 0 15.36 10.24 20.48 20.48 0 10.24 0 20.48-5.12 25.6l-112.64 102.4c-5.12 5.12-10.24 10.24-20.48 10.24z m368.64 358.4c-10.24 0-20.48-5.12-25.6-15.36-5.12-10.24 0-20.48 5.12-25.6l112.64-107.52c5.12-5.12 15.36-10.24 25.6-5.12 10.24 0 15.36 10.24 20.48 20.48 0 10.24 0 20.48-5.12 25.6l-112.64 107.52c-5.12-5.12-15.36 0-20.48 0z m71.68 66.56c-10.24 0-20.48-5.12-25.6-15.36-5.12-10.24 0-20.48 5.12-25.6l112.64-107.52c5.12-5.12 15.36-10.24 25.6-5.12 10.24 0 15.36 10.24 20.48 20.48s0 20.48-5.12 25.6L691.2 870.4c-10.24-5.12-15.36 0-20.48 0z",
      "M332.8 880.64c-5.12 0-15.36 0-20.48-5.12l-189.44-184.32c-5.12-5.12-10.24-15.36-5.12-25.6 0-10.24 10.24-15.36 20.48-20.48s20.48 0 25.6 5.12l189.44 184.32c5.12 5.12 10.24 20.48 5.12 30.72-5.12 10.24-15.36 15.36-25.6 15.36z m501.76-481.28c-5.12 0-15.36 0-20.48-5.12L614.4 199.68c-5.12-5.12-10.24-15.36-5.12-25.6s10.24-20.48 20.48-20.48 20.48 0 25.6 5.12l199.68 194.56c5.12 5.12 10.24 20.48 5.12 30.72s-15.36 15.36-25.6 15.36z",
    ],
    [
      "M884.4 130.6H140.6c-41.9 0-76 34.1-76 76V820c0 41.9 34.1 76 76 76h743.8c41.9 0 76-34.1 76-76V206.6c0-41.9-34.1-76-76-76z m4 689.3c0 2.2-1.8 4-4 4H140.6c-2.2 0-4-1.8-4-4v-59.7h751.8v59.7zM136.6 688.2V206.5c0-2.2 1.8-4 4-4h743.8c2.2 0 4 1.8 4 4v481.7H136.6z",
      "M673.7 400.9L461 266.1c-17.3-11-39.2-11.6-57.1-1.8-17.9 9.9-29.1 28.7-29.1 49.2v269.2c0 20.5 11.1 39.3 29.1 49.2 8.5 4.7 17.8 7 27.1 7 10.4 0 20.9-2.9 30-8.7l212.7-134.5c16.4-10.3 26.1-28.1 26.2-47.5-0.1-19.2-9.8-37-26.2-47.3zM446.8 554V342.3l167.3 106L446.8 554z",
    ],
    [
      "M788.316 592.412l57.926-57.926 35.405 35.405-57.926 57.926z",
      "M581.48 859.67a25 25 0 0 1-17.7-7.33L323.45 612a25 25 0 0 1 35.4-35.41l240.33 240.34a25 25 0 0 1-17.7 42.74zM656.82 784.32a25 25 0 0 1-17.7-7.33l-193-193a25 25 0 1 1 35.4-35.4l193 193a25 25 0 0 1-17.71 42.73zM735.46 705.68a25 25 0 0 1-17.7-7.33l-149.49-149.5a25 25 0 0 1 35.4-35.4l149.5 149.49a25 25 0 0 1-17.71 42.74z",
      "M503.94 903a107.16 107.16 0 0 1-76-31.43L78.17 521.82a107.49 107.49 0 0 1 0-152l185.48-185.48a107.48 107.48 0 0 1 152 0l90.19 90.19a25 25 0 1 1-35.41 35.4l-90.19-90.19a57.42 57.42 0 0 0-81.19 0L113.58 405.22a57.4 57.4 0 0 0 0 81.19l349.77 349.77a57.4 57.4 0 0 0 81.19 0l226.07-226.07L587 426.53a25 25 0 0 1 35.4-35.41l201.32 201.29a25 25 0 0 1 0 35.4L579.94 871.59a107.16 107.16 0 0 1-76 31.41z",
      "M881.64 569.89l-35.41-35.41 64.19-64.19a57.4 57.4 0 0 0 0-81.19L709.14 187.82a57.4 57.4 0 0 0-81.19 0l-152 152A57.41 57.41 0 1 0 557.19 421l47.66-47.81 35.46 35.35-47.69 47.84a107.48 107.48 0 1 1-152-152l152-152a107.48 107.48 0 0 1 152 0L945.83 353.7a107.48 107.48 0 0 1 0 152z",
    ],
  ];
  return <svg className="detail-point-icon filled" viewBox="0 0 1024 1024" aria-hidden="true">{icons[index % icons.length].map((d) => <path key={d} d={d} />)}</svg>;
}

function KeyResultGrid({ metrics }) {
  return (
    <div className="key-result-grid">
      {metrics.map((metric, index) => {
        const [value, ...labelParts] = metric.split(" ");
        return <article key={metric}><ResultGlyph index={index} /><strong>{value}</strong><span>{labelParts.join(" ")}</span></article>;
      })}
    </div>
  );
}

function KolPeriodCard() {
  return (
    <div className="period-calendar-card">
      <span>项目周期</span>
      <div className="calendar-range">
        <div className="calendar-block">
          <div className="calendar-top">2025</div>
          <strong>12</strong>
          <small>Dec</small>
        </div>
        <i aria-hidden="true" />
        <div className="calendar-block">
          <div className="calendar-top">2026</div>
          <strong>01</strong>
          <small>Jan</small>
        </div>
      </div>
      <div className="route-line">
        <span>北京</span>
        <i />
        <span>哈尔滨</span>
        <i />
        <span>亚布力</span>
      </div>
    </div>
  );
}

function ProjectPeriodCard({ startYear, startMonth, startLabel, endYear, endMonth, endLabel, route }) {
  return (
    <div className="period-calendar-card">
      <span>项目周期</span>
      <div className="calendar-range">
        <div className="calendar-block">
          <div className="calendar-top">{startYear}</div>
          <strong>{startMonth}</strong>
          <small>{startLabel}</small>
        </div>
        <i aria-hidden="true" />
        <div className="calendar-block">
          <div className="calendar-top">{endYear}</div>
          <strong>{endMonth}</strong>
          <small>{endLabel}</small>
        </div>
      </div>
      {route ? <div className="route-line">{route.map((item, index) => <React.Fragment key={item}>{index > 0 ? <i /> : null}<span>{item}</span></React.Fragment>)}</div> : null}
    </div>
  );
}

function ProjectPage({ project, navigate }) {
  const [contactOpen, setContactOpen] = useState(false);
  const detailClass = project.id === "kol-china-trip" || project.id === "overseas-growth" ? "wide-detail" : "";
  const hasCustomHero = project.id === "kol-china-trip" || project.id === "overseas-growth";

  const pageStyle = project.id === "overseas-growth" ? { "--project-bg": `url("${assetPath("/projects/overseas-growth/cover-social.png")}")` } : undefined;
  return <><div className="noise"/><header className="detail-header"><button className="ghost" type="button" onClick={() => navigate('/')}>返回首页</button><ContactButton onClick={() => setContactOpen(true)} /></header><main className={`detail-page tone-${project.tone} project-detail-${project.id}`} style={pageStyle}><section className={`detail-hero ${hasCustomHero ? "compact" : ""}`}><div><p className="eyebrow">{project.tag}</p>{project.id === "overseas-growth" ? <h1 className="balanced-title"><span>JalanJalan China</span><span>海外文旅品牌从 0 到 1</span></h1> : <h1>{project.title}</h1>}<p>{project.summary}</p></div>{hasCustomHero ? null : <div className={`detail-visual ${project.cover ? "with-cover" : ""}`}>{project.cover ? <img src={assetPath(project.cover)} alt={`${project.title}封面`} /> : <><span/><span/><span/></>}</div>}</section><section className={`detail-body ${detailClass}`}>{project.id === "kol-china-trip" ? <KolPeriodCard /> : project.id === "overseas-growth" ? <ProjectPeriodCard startYear="2025" startMonth="11" startLabel="Nov" endYear="2026" endMonth="05" endLabel="May" /> : <div className="detail-meta"><span>项目周期</span><strong>{project.period}</strong></div>}<div className={`detail-meta ${project.id === "kol-china-trip" || project.id === "overseas-growth" ? "visual-results" : ""}`}><span>关键结果</span>{project.id === "kol-china-trip" || project.id === "overseas-growth" ? <KeyResultGrid metrics={project.metrics} /> : <strong>{project.metrics.join(' / ')}</strong>}</div><div className="detail-list"><h2>项目职责与亮点</h2><div className="detail-point-list">{project.detail.map((x, index) => <p key={x}>{project.id === "kol-china-trip" ? <KolDetailPointIcon index={index} /> : project.id === "overseas-growth" ? <OverseasDetailPointIcon index={index} /> : <DetailPointIcon index={index} />}<span>{x}</span></p>)}</div></div></section>{project.id === "overseas-growth" ? <OverseasGrowthCase /> : null}{project.id === "kol-china-trip" ? <KolChinaTripCase /> : null}</main><ContactModal open={contactOpen} onClose={() => setContactOpen(false)} /></>;
}

function App() {
  const [path, navigate] = useRoute();
  const project = useMemo(() => {
    const match = path.match(/^\/projects\/(.+)/);
    return match ? projects.find((item) => item.id === match[1]) : null;
  }, [path]);
  return project ? <ProjectPage project={project} navigate={navigate} /> : <Home navigate={navigate} />;
}

createRoot(document.getElementById("root")).render(<App />);
