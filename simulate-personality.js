// 人格概率模拟测试脚本
// 随机生成大量答题数据，统计每种人格的出现频率

const TOTAL_SIMULATIONS = 10000;
const RUN_TIMES = 5; // 运行5次取平均

// 问题数据（用于计算分数）
const questions = [
  { id: 1, options: [
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: -1, emotion: -1, humor: 0, responsibility: -1, challenge: 0, confidence: 1 } },
    { scores: { social: 1, decision: 1, emotion: 1, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 2, options: [
    { scores: { social: 1, decision: 0, emotion: 1, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: 0, emotion: -1, humor: 0, responsibility: -1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 3, options: [
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 1, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 1, responsibility: 1, challenge: 0, confidence: 0 } }
  ]},
  { id: 4, options: [
    { scores: { social: 0, decision: 1, emotion: 0, humor: 0, responsibility: 0, challenge: 1, confidence: 1 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 1, emotion: 0, humor: 0, responsibility: 0, challenge: 1, confidence: 0 } },
    { scores: { social: 0, decision: -1, emotion: -1, humor: 0, responsibility: 0, challenge: -1, confidence: -1 } }
  ]},
  { id: 5, options: [
    { scores: { social: 0, decision: 1, emotion: 1, humor: 0, responsibility: 1, challenge: 1, confidence: 1 } },
    { scores: { social: 0, decision: -1, emotion: -1, humor: 0, responsibility: -1, challenge: -1, confidence: -1 } },
    { scores: { social: 1, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: -1, emotion: -1, humor: 1, responsibility: -1, challenge: -1, confidence: -1 } }
  ]},
  { id: 6, options: [
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: -1, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: -1, challenge: 0, confidence: 0 } }
  ]},
  { id: 7, options: [
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: -1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 8, options: [
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 9, options: [
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 1, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 1, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 10, options: [
    { scores: { social: 1, decision: 0, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: 0, emotion: 0, humor: 0, responsibility: -1, challenge: 1, confidence: 1 } },
    { scores: { social: 0, decision: 1, emotion: 0, humor: 0, responsibility: 0, challenge: 1, confidence: 1 } },
    { scores: { social: 1, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 11, options: [
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 12, options: [
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 13, options: [
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: -1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 14, options: [
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 15, options: [
    { scores: { social: 1, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 16, options: [
    { scores: { social: 1, decision: 0, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: 0, emotion: 0, humor: 0, responsibility: -1, challenge: 1, confidence: 1 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 17, options: [
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } }
  ]},
  { id: 18, options: [
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: -1, challenge: 0, confidence: 1 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 19, options: [
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 20, options: [
    { scores: { social: 1, decision: 0, emotion: 0, humor: 0, responsibility: 1, challenge: 1, confidence: 1 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: -1, decision: 0, emotion: -1, humor: 0, responsibility: -1, challenge: 0, confidence: -1 } },
    { scores: { social: 1, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 21, options: [
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 22, options: [
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 1, confidence: 1 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 1, confidence: 1 } }
  ]},
  { id: 23, options: [
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: -1, challenge: 1, confidence: 1 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 24, options: [
    { scores: { social: 1, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 25, options: [
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 26, options: [
    { scores: { social: 0, decision: 1, emotion: 0, humor: 0, responsibility: 0, challenge: 1, confidence: 1 } },
    { scores: { social: 0, decision: -1, emotion: 0, humor: 0, responsibility: 0, challenge: -1, confidence: -1 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 1, responsibility: 1, challenge: 1, confidence: 1 } }
  ]},
  { id: 27, options: [
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } }
  ]},
  { id: 28, options: [
    { scores: { social: -1, decision: -1, emotion: -1, humor: 0, responsibility: -1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: 0, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: -1, challenge: 0, confidence: 0 } }
  ]},
  { id: 29, options: [
    { scores: { social: 0, decision: 0, emotion: 0, humor: 0, responsibility: -1, challenge: 1, confidence: 1 } },
    { scores: { social: 1, decision: 0, emotion: 1, humor: 0, responsibility: 1, challenge: 0, confidence: 0 } },
    { scores: { social: 1, decision: 1, emotion: 0, humor: 0, responsibility: 1, challenge: 1, confidence: 0 } },
    { scores: { social: 1, decision: 0, emotion: 0, humor: 1, responsibility: -1, challenge: 0, confidence: 0 } }
  ]},
  { id: 30, options: [
    { scores: { social: 0, decision: 1, emotion: 0, humor: 0, responsibility: 0, challenge: 1, confidence: 1 } },
    { scores: { social: 0, decision: -1, emotion: -1, humor: 0, responsibility: 0, challenge: -1, confidence: -1 } },
    { scores: { social: 0, decision: 0, emotion: -1, humor: 0, responsibility: 0, challenge: -1, confidence: -1 } },
    { scores: { social: 0, decision: 0, emotion: 0, humor: 1, responsibility: -1, challenge: 0, confidence: 0 } }
  ]}
];

// 模拟answers对象结构
function generateRandomAnswers() {
  const answers = {};
  for (let i = 1; i <= 30; i++) {
    answers[i] = Math.floor(Math.random() * 4); // 0-3 随机选项
  }
  return answers;
}

// 计算分数
function calculateScores(answers) {
  const scores = {
    social: 0,
    decision: 0,
    emotion: 0,
    humor: 0,
    responsibility: 0,
    challenge: 0,
    confidence: 0
  };
  
  Object.entries(answers).forEach(([questionId, index]) => {
    const question = questions.find(q => q.id == questionId);
    if (question) {
      const option = question.options[index];
      if (option && option.scores) {
        Object.entries(option.scores).forEach(([angle, score]) => {
          scores[angle] += score;
        });
      }
    }
  });
  
  const totalScore = Object.values(scores).reduce((sum, n) => sum + n, 0);
  return { scores, totalScore };
}

// 模拟calculateResult函数的核心逻辑
function testPersonality(answers) {
  const { scores, totalScore } = calculateScores(answers);
  
  // 整活艺术家覆盖规则：如果用户1、2、5、6、7、8、12、13题任意有五个或以上为D，直接列为整活艺术家
  const jokerQuestions = [1, 2, 5, 6, 7, 8, 12, 13];
  let dCount = 0;
  jokerQuestions.forEach(qId => {
    if (answers[qId] === 3) dCount++; // 选项D是索引3
  });
  
  if (dCount >= 5) return 'Jokester';
  
  // 检查偷跑Tee
  const isRusher = 
    answers[1] === 1; // 第1题B (自己也偷跑)
  
  if (isRusher) return 'Rusher';
  
  // 检查键盘粉碎者（Emotional Player）
  const isEmotionalPlayer = 
    (answers[1] === 0 && // 第1题A
     answers[3] === 0 && // 第3题A
     answers[5] === 3 && // 第5题D
     answers[9] === 0 && // 第9题A
     answers[19] === 3) || // 第19题D
    (totalScore <= -12 && scores.emotion <= -5); // 原有的分数判定
  
  if (isEmotionalPlayer) {
    return 'Emotional Player';
  }
  
  // 极端兜底：保证明显极端样本不会被中间人格误判
  if (scores.challenge <= -5 && scores.confidence <= -4) {
    return 'Challenge Avoider';
  }
  if (scores.responsibility <= -6 && scores.decision <= -3 && scores.challenge >= 2) {
    return 'Rusher';
  }
  
  // 检查团队依赖户
  const isTeamSupporter = 
    answers[20] === 0 && // 第20题A (带飞者)
    answers[2] === 0 && // 第2题A (二话不说救他)
    answers[29] === 1 && // 第29题B (喜欢救人，照顾队友)
    (answers[13] === 0 || answers[13] === 1); // 第13题A或B (帮他或指出错误)
  
  if (isTeamSupporter) return 'Team Supporter';
  
  // 检查躺平咸鱼
  const isLyingFlatFish = 
    answers[20] !== 0 && // 第20题B/C/D
    (answers[5] === 1 || answers[5] === 3) && // 第5题B或D (直接换图或我已急哭)
    answers[26] === 1 && // 第26题B (直接走简单的)
    (answers[30] === 1 || answers[30] === 2) && // 第30题B或C (稍有压力或压力大直接似掉)
    (answers[4] === 3 || // 第4题D (觉得自己不可能) - 技术不行
     (answers[18] !== 2)); // 第18题不是C (不是"我自己能跑别拖我") - 无自信
  
  if (isLyingFlatFish) return 'Lying Flat Fish';
  
  // 检查摆烂仙人
  const isChallengeAvoider = 
    answers[20] !== 0 && // 第20题B/C/D
    ((answers[5] === 1 || answers[5] === 3) || // 第5题B或D (直接换图或我已急哭)
     answers[26] === 1) && // 第26题B (直接走简单的)
    (answers[4] === 0 || answers[4] === 2 || // 第4题A或C (尝试超越或想知道秘诀) - 技术行
     answers[18] === 2 || // 第18题C (我自己能跑别拖我) - 技术行
     answers[26] === 0 || answers[26] === 3 || // 第26题A或D (走难的或拖拽tee) - 技术行
     answers[10] === 1 || answers[10] === 2 || // 第10题B或C (Solo或极难挑战) - 技术行
     answers[30] === 0); // 第30题A (迎难而上) - 技术行
  
  if (isChallengeAvoider) return 'Challenge Avoider';
  
  // 检查带飞者
  const isCarryGoat = 
    answers[20] === 0 && // 第20题A (带飞者)
    (answers[4] === 0 || answers[4] === 2) && // 第4题A (尝试超越)或C (想知道秘诀) - 追求技术
    (answers[26] === 0 || answers[26] === 3) && // 第26题A (直接走难的)或D (拖拽tee) - 技术自信
    (answers[10] === 1 || answers[10] === 2) && // 第10题B (Solo地图)或C (极难挑战地图) - 挑战型
    (answers[30] === 0); // 第30题A (迎难而上) - 抗压能力强
  
  if (isCarryGoat) return 'Carry Goat';
  
  // 检查独攀者
  const isBaldGrinder = 
    (answers[10] === 1 || answers[16] === 1) && // 第10题B (Solo地图)或第16题B (Solo) - 喜欢独处
    (answers[4] === 0 || answers[4] === 2) && // 第4题A (尝试超越)或C (想知道秘诀) - 追求技术
    (answers[5] === 0) && // 第5题A (坚持不放弃) - 坚韧不拔
    (answers[15] === 2 || answers[15] === 3); // 第15题C (少语无言)或D (静默观察) - 社交少
  
  if (isBaldGrinder) return 'Bald Grinder';
  
  // 检查扩列狂魔
  const isFriendCollector = 
    (answers[15] === 0) && // 第15题A (主动说话) - 社交活跃
    (answers[16] === 0 || answers[16] === 3) && // 第16题A (与朋友一起跑图)或D (只去人多的服务器) - 喜欢社交
    (answers[24] === 0 || answers[24] === 3) && // 第24题A (主动聊天)或D (发爱心表情) - 社交积极
    (answers[25] === 1 || answers[25] === 2 || answers[25] === 3); // 第25题B (ooop)或C (笑脸)或D (抱歉) - 喜欢发表情
  
  if (isFriendCollector) return 'Friend Collector';
  
  // 检查装杯带师
  const isConfidentCompetitor = 
    (answers[4] === 0) && // 第4题A (尝试超越) - 竞争意识
    (answers[22] === 1 || answers[22] === 3) && // 第22题B (技巧与成就)或D (排名与挑战) - 追求成就
    (answers[30] === 0) && // 第30题A (迎难而上) - 自信
    (answers[21] === 3); // 第21题D (到处艾特好友) - 喜欢炫耀
  
  if (isConfidentCompetitor) return 'Confident Competitor';
  
  // 检查小丑竟是我
  const isSelfDeprecatingHumorist = 
    (answers[12] === 3) && // 第12题D (那咋了) - 自嘲
    (answers[23] === 3) && // 第23题D (技术原因，偷跑or殿后都难以做到) - 自嘲
    (answers[28] === 3) && // 第28题D (卡了) - 找借口
    (answers[30] === 3); // 第30题D (很难的地图part过了，但空间超大却没救起tee然后发一句卡了) - 自嘲+找借口
  
  if (isSelfDeprecatingHumorist) return 'Self-Deprecating Humorist';
  
  // 检查策略大师
  const isRationalThinker = 
    (answers[3] === 2 || answers[3] === 3) && // 第3题C (默默等待并安慰)或D (拖拽他) - 理性处理
    (answers[8] === 0 || answers[8] === 2) && // 第8题A (沟通)或C (合作) - 重视策略
    (answers[17] === 0 || answers[17] === 2 || answers[17] === 3) && // 第17题A (明确分工)或C (战术计划)或D (缺一不可) - 策略导向
    (answers[9] === 1 || answers[9] === 2); // 第9题B (直接屏蔽)或C (忽略) - 理性应对
  
  if (isRationalThinker) return 'Rational Thinker';
  
  // 检查背锅侠
  const isResponsibleAnchor = 
    (answers[2] === 0) && // 第2题A (二话不说救他) - 责任感
    (answers[13] === 0 || answers[13] === 1) && // 第13题A (帮他)或B (指出错误) - 负责任
    (answers[23] === 1) && // 第23题B (神秘殿后) - 殿后角色
    (answers[29] === 1); // 第29题B (喜欢救人，照顾队友) - 照顾队友
  
  if (isResponsibleAnchor) return 'Responsible Anchor';
  
  return 'Balanced Player'; // 默认
}

// 人格名称映射
const personalityNames = {
  'Carry Goat': '带飞者',
  'Team Supporter': '团队依赖户',
  'Bald Grinder': '独攀者',
  'Jokester': '整活艺术家',
  'Rational Thinker': '策略大师',
  'Emotional Player': '键盘毁灭者',
  'Responsible Anchor': '背锅侠',
  'Friend Collector': '扩列狂魔',
  'Confident Competitor': '装杯带师',
  'Challenge Avoider': '摆烂仙人',
  'Self-Deprecating Humorist': '小丑竟是我',
  'Rusher': '偷跑Tee',
  'Lying Flat Fish': '躺平咸鱼',
  'Balanced Player': '中立者'
};

// 运行模拟测试
console.log('开始人格概率模拟测试...');
console.log(`模拟次数: ${TOTAL_SIMULATIONS} x ${RUN_TIMES} 次`);
console.log('=' .repeat(60));

const allResults = {};

for (let run = 0; run < RUN_TIMES; run++) {
  const results = {};
  
  for (let i = 0; i < TOTAL_SIMULATIONS; i++) {
    const answers = generateRandomAnswers();
    const personality = testPersonality(answers);
    
    if (!results[personality]) {
      results[personality] = 0;
    }
    results[personality]++;
  }
  
  // 累加结果
  Object.entries(results).forEach(([personality, count]) => {
    if (!allResults[personality]) {
      allResults[personality] = 0;
    }
    allResults[personality] += count;
  });
  
  console.log(`第 ${run + 1} 次运行完成...`);
}

console.log('\n人格获取概率统计 (平均):');
console.log('-' .repeat(60));

const sortedResults = Object.entries(allResults).sort((a, b) => b[1] - a[1]);
const totalSimulations = TOTAL_SIMULATIONS * RUN_TIMES;

sortedResults.forEach(([personality, count]) => {
  const percentage = ((count / totalSimulations) * 100).toFixed(2);
  const name = personalityNames[personality] || personality;
  const bar = '█'.repeat(Math.round(percentage / 2));
  console.log(`${name.padEnd(8, '　')} (${personality}): ${percentage.padStart(6, ' ')}% ${bar}`);
});

console.log('-' .repeat(60));
console.log(`总计: ${totalSimulations} 次模拟`);
console.log(`人格种类: ${sortedResults.length} 种`);

// 分析结果
console.log('\n' + '=' .repeat(60));
console.log('分析结果:');
console.log('-' .repeat(60));

const highProbability = sortedResults.filter(([_, count]) => (count / totalSimulations) > 0.1);
const mediumProbability = sortedResults.filter(([_, count]) => {
  const p = count / totalSimulations;
  return p >= 0.01 && p <= 0.1;
});
const lowProbability = sortedResults.filter(([_, count]) => (count / totalSimulations) < 0.01);

console.log('\n高概率人格 (>10%):');
highProbability.forEach(([personality, count]) => {
  const percentage = ((count / totalSimulations) * 100).toFixed(2);
  const name = personalityNames[personality] || personality;
  console.log(`  ${name}: ${percentage}%`);
});

console.log('\n中概率人格 (1%-10%):');
mediumProbability.forEach(([personality, count]) => {
  const percentage = ((count / totalSimulations) * 100).toFixed(2);
  const name = personalityNames[personality] || personality;
  console.log(`  ${name}: ${percentage}%`);
});

console.log('\n低概率人格 (<1%):');
lowProbability.forEach(([personality, count]) => {
  const percentage = ((count / totalSimulations) * 100).toFixed(2);
  const name = personalityNames[personality] || personality;
  console.log(`  ${name}: ${percentage}%`);
});
