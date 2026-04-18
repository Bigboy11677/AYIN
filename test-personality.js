// 人格判定测试脚本
// 测试不同答题组合的人格判定结果

// 模拟answers对象结构
const testCases = [
  {
    name: '团队依赖户',
    answers: {
      1: 0, // 第1题A
      2: 0, // 第2题A (二话不说救他)
      5: 0, // 第5题A
      10: 0, // 第10题A
      13: 0, // 第13题A (帮他)
      18: 0, // 第18题A
      20: 0, // 第20题A (带飞者)
      26: 0, // 第26题A
      29: 1, // 第29题B (喜欢救人，照顾队友)
      30: 0 // 第30题A
    },
    expected: 'Team Supporter'
  },
  {
    name: '躺平咸鱼',
    answers: {
      1: 0, // 第1题A
      2: 1, // 第2题B
      4: 3, // 第4题D (觉得自己不可能) - 技术不行
      5: 1, // 第5题B (直接换图) - 回避困难
      10: 3, // 第10题D
      13: 2, // 第13题C
      18: 1, // 第18题B (不是C) - 无自信
      20: 1, // 第20题B (混图者)
      26: 1, // 第26题B (直接走简单的) - 回避挑战
      29: 0, // 第29题A
      30: 1 // 第30题B (稍有压力就迟迟不敢出手) - 抗压能力弱
    },
    expected: 'Lying Flat Fish'
  },
  {
    name: '摆烂仙人',
    answers: {
      1: 0, // 第1题A
      2: 1, // 第2题B
      4: 0, // 第4题A (尝试超越) - 技术行
      5: 1, // 第5题B (直接换图) - 摆烂行为
      10: 1, // 第10题B (Solo地图) - 技术行
      13: 2, // 第13题C
      18: 2, // 第18题C (我自己能跑别拖我) - 技术行
      20: 1, // 第20题B (混图者)
      26: 1, // 第26题B (直接走简单的) - 摆烂行为
      29: 0, // 第29题A
      30: 0 // 第30题A (迎难而上) - 技术行
    },
    expected: 'Challenge Avoider'
  },
  {
    name: '偷跑Tee',
    answers: {
      1: 1, // 第1题B (自己也偷跑)
      2: 1, // 第2题B
      5: 1, // 第5题B
      10: 1, // 第10题B
      13: 2, // 第13题C
      18: 2, // 第18题C
      20: 1, // 第20题B
      26: 1, // 第26题B
      29: 0, // 第29题A
      30: 0 // 第30题A
    },
    expected: 'Rusher'
  },
  {
    name: '整活艺术家',
    answers: {
      1: 3, // 第1题D
      2: 3, // 第2题D (扣问号)
      5: 3, // 第5题D (我已急哭)
      6: 3, // 第6题D (不信任并且k)
      7: 3, // 第7题D (诗人？)
      8: 3, // 第8题D (专注)
      12: 3, // 第12题D (那咋了)
      13: 3, // 第13题D (诗人我吃)
      20: 3, // 第20题D (燕子)
      26: 3, // 第26题D (不仅走难的还要拖拽tee)
      30: 3 // 第30题D (很难的地图part过了，但空间超大却没救起tee然后发一句卡了)
    },
    expected: 'Jokester'
  },
  {
    name: '带飞者',
    answers: {
      4: 0, // 第4题A (尝试超越)
      10: 1, // 第10题B (Solo地图)
      20: 0, // 第20题A (带飞者)
      26: 0, // 第26题A (直接走难的)
      30: 0 // 第30题A (迎难而上)
    },
    expected: 'Carry Goat'
  },
  {
    name: '独攀者',
    answers: {
      4: 0, // 第4题A (尝试超越)
      5: 0, // 第5题A (坚持不放弃)
      10: 1, // 第10题B (Solo地图)
      15: 2, // 第15题C (少语无言)
      16: 1 // 第16题B (Solo)
    },
    expected: 'Bald Grinder'
  },
  {
    name: '扩列狂魔',
    answers: {
      15: 0, // 第15题A (主动说话)
      16: 0, // 第16题A (与朋友一起跑图)
      24: 0, // 第24题A (主动聊天)
      25: 1 // 第25题B (ooop)
    },
    expected: 'Friend Collector'
  },
  {
    name: '装杯带师',
    answers: {
      4: 0, // 第4题A (尝试超越)
      21: 3, // 第21题D (到处艾特好友)
      22: 1, // 第22题B (技巧与成就)
      30: 0 // 第30题A (迎难而上)
    },
    expected: 'Confident Competitor'
  },
  {
    name: '小丑竟是我',
    answers: {
      12: 3, // 第12题D (那咋了)
      23: 3, // 第23题D (技术原因，偷跑or殿后都难以做到)
      28: 3, // 第28题D (卡了)
      30: 3 // 第30题D (很难的地图part过了，但空间超大却没救起tee然后发一句卡了)
    },
    expected: 'Self-Deprecating Humorist'
  },
  {
    name: '策略大师',
    answers: {
      3: 2, // 第3题C (默默等待并安慰)
      8: 0, // 第8题A (沟通)
      9: 1, // 第9题B (直接屏蔽)
      17: 0 // 第17题A (明确分工)
    },
    expected: 'Rational Thinker'
  },
  {
    name: '背锅侠',
    answers: {
      2: 0, // 第2题A (二话不说救他)
      13: 0, // 第13题A (帮他)
      23: 1, // 第23题B (神秘殿后)
      29: 1 // 第29题B (喜欢救人，照顾队友)
    },
    expected: 'Responsible Anchor'
  },
  {
    name: '键盘粉碎者',
    answers: {
      1: 2, // 第1题C (骂街)
      6: 2, // 第6题C (骂街)
      5: 3, // 第5题D (我已急哭)
      9: 0 // 第9题A (觉得很烦)
    },
    expected: 'Emotional Player'
  }
];

// 模拟calculateResult函数的核心逻辑
function testPersonality(answers) {
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
  
  // 检查具体题目选项 - 带飞者判定
  const isCarryGoat = 
    answers[20] === 0 && // 第20题A (带飞者)
    (answers[4] === 0 || answers[4] === 2) && // 第4题A (尝试超越)或C (想知道秘诀) - 追求技术
    (answers[26] === 0 || answers[26] === 3) && // 第26题A (直接走难的)或D (拖拽tee) - 技术自信
    (answers[10] === 1 || answers[10] === 2) && // 第10题B (Solo地图)或C (极难挑战地图) - 挑战型
    (answers[30] === 0); // 第30题A (迎难而上) - 抗压能力强
  
  if (isCarryGoat) return 'Carry Goat';
  
  // 检查具体题目选项 - 独攀者判定
  const isBaldGrinder = 
    (answers[10] === 1 || answers[16] === 1) && // 第10题B (Solo地图)或第16题B (Solo) - 喜欢独处
    (answers[4] === 0 || answers[4] === 2) && // 第4题A (尝试超越)或C (想知道秘诀) - 追求技术
    (answers[5] === 0) && // 第5题A (坚持不放弃) - 坚韧不拔
    (answers[15] === 2 || answers[15] === 3); // 第15题C (少语无言)或D (静默观察) - 社交少
  
  if (isBaldGrinder) return 'Bald Grinder';
  
  // 检查具体题目选项 - 扩列狂魔判定
  const isFriendCollector = 
    (answers[15] === 0) && // 第15题A (主动说话) - 社交活跃
    (answers[16] === 0 || answers[16] === 3) && // 第16题A (与朋友一起跑图)或D (只去人多的服务器) - 喜欢社交
    (answers[24] === 0 || answers[24] === 3) && // 第24题A (主动聊天)或D (发爱心表情) - 社交积极
    (answers[25] === 1 || answers[25] === 2 || answers[25] === 3); // 第25题B (ooop)或C (笑脸)或D (抱歉) - 喜欢发表情
  
  if (isFriendCollector) return 'Friend Collector';
  
  // 检查具体题目选项 - 装杯带师判定
  const isConfidentCompetitor = 
    (answers[4] === 0) && // 第4题A (尝试超越) - 竞争意识
    (answers[22] === 1 || answers[22] === 3) && // 第22题B (技巧与成就)或D (排名与挑战) - 追求成就
    (answers[30] === 0) && // 第30题A (迎难而上) - 自信
    (answers[21] === 3); // 第21题D (到处艾特好友) - 喜欢炫耀
  
  if (isConfidentCompetitor) return 'Confident Competitor';
  
  // 检查具体题目选项 - 小丑竟是我判定
  const isSelfDeprecatingHumorist = 
    (answers[12] === 3) && // 第12题D (那咋了) - 自嘲
    (answers[23] === 3) && // 第23题D (技术原因，偷跑or殿后都难以做到) - 自嘲
    (answers[28] === 3) && // 第28题D (卡了) - 找借口
    (answers[30] === 3); // 第30题D (很难的地图part过了，但空间超大却没救起tee然后发一句卡了) - 自嘲+找借口
  
  if (isSelfDeprecatingHumorist) return 'Self-Deprecating Humorist';
  
  // 检查具体题目选项 - 策略大师判定
  const isRationalThinker = 
    (answers[3] === 2 || answers[3] === 3) && // 第3题C (默默等待并安慰)或D (拖拽他) - 理性处理
    (answers[8] === 0 || answers[8] === 2) && // 第8题A (沟通)或C (合作) - 重视策略
    (answers[17] === 0 || answers[17] === 2 || answers[17] === 3) && // 第17题A (明确分工)或C (战术计划)或D (缺一不可) - 策略导向
    (answers[9] === 1 || answers[9] === 2); // 第9题B (直接屏蔽)或C (忽略) - 理性应对
  
  if (isRationalThinker) return 'Rational Thinker';
  
  // 检查具体题目选项 - 背锅侠判定
  const isResponsibleAnchor = 
    (answers[2] === 0) && // 第2题A (二话不说救他) - 责任感
    (answers[13] === 0 || answers[13] === 1) && // 第13题A (帮他)或B (指出错误) - 负责任
    (answers[23] === 1) && // 第23题B (神秘殿后) - 殿后角色
    (answers[29] === 1); // 第29题B (喜欢救人，照顾队友) - 照顾队友
  
  if (isResponsibleAnchor) return 'Responsible Anchor';
  
  return 'Balanced Player'; // 默认
}

// 运行测试
console.log('开始人格判定测试...');
console.log('=' .repeat(60));

testCases.forEach((testCase, index) => {
  const result = testPersonality(testCase.answers);
  const passed = result === testCase.expected;
  
  console.log(`测试 ${index + 1}: ${testCase.name}`);
  console.log(`预期: ${testCase.expected}`);
  console.log(`实际: ${result}`);
  console.log(`结果: ${passed ? '✅ 通过' : '❌ 失败'}`);
  console.log('-' .repeat(60));
});

console.log('测试完成！');
