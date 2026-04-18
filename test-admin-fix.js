// 测试admin.html的人格类型去重修复

// 模拟用户数据（包含中英文人格类型混用）
const mockUsers = [
  { id: 1, gameId: 'Player1', personality: 'Carry Goat' },
  { id: 2, gameId: 'Player2', personality: '带飞者' }, // 中文
  { id: 3, gameId: 'Player3', personality: 'Team Supporter' },
  { id: 4, gameId: 'Player4', personality: '团队依赖户' }, // 中文
  { id: 5, gameId: 'Player5', personality: 'Emotional Player' },
  { id: 6, gameId: 'Player6', personality: '键盘粉碎者' }, // 中文
  { id: 7, gameId: 'Player7', personality: 'Jokester' },
  { id: 8, gameId: 'Player8', personality: '整活艺术家' }, // 中文
  { id: 9, gameId: 'Player9', personality: 'Rusher' },
  { id: 10, gameId: 'Player10', personality: '偷跑Tee' }, // 中文
  { id: 11, gameId: 'Player11', personality: 'Challenge Avoider' },
  { id: 12, gameId: 'Player12', personality: '摆烂仙人' }, // 中文
  { id: 13, gameId: 'Player13', personality: 'Lying Flat Fish' },
  { id: 14, gameId: 'Player14', personality: '躺平咸鱼' }, // 中文
  { id: 15, gameId: 'Player15', personality: 'Bald Grinder' },
  { id: 16, gameId: 'Player16', personality: '独攀者' }, // 中文
  { id: 17, gameId: 'Player17', personality: 'Friend Collector' },
  { id: 18, gameId: 'Player18', personality: '扩列狂魔' }, // 中文
  { id: 19, gameId: 'Player19', personality: 'Confident Competitor' },
  { id: 20, gameId: 'Player20', personality: '装杯带师' }, // 中文
  { id: 21, gameId: 'Player21', personality: 'Self-Deprecating Humorist' },
  { id: 22, gameId: 'Player22', personality: '小丑竟是我' }, // 中文
  { id: 23, gameId: 'Player23', personality: 'Rational Thinker' },
  { id: 24, gameId: 'Player24', personality: '策略大师' }, // 中文
  { id: 25, gameId: 'Player25', personality: 'Responsible Anchor' },
  { id: 26, gameId: 'Player26', personality: '背锅侠' }, // 中文
  { id: 27, gameId: 'Player27', personality: 'Balanced Player' },
  { id: 28, gameId: 'Player28', personality: '中立者' }, // 中文
  { id: 29, gameId: 'Player29', personality: 'Hidden Personality' },
  { id: 30, gameId: 'Player30', personality: '收集狂' } // 中文
];

// 模拟admin.html中的人格类型映射
const personalityMap = {
  'Emotional Player': 'Emotional Player',
  'Hidden Personality': 'Hidden Personality',
  'Challenge Avoider': 'Challenge Avoider',
  'Lying Flat Fish': 'Lying Flat Fish',
  'Rusher': 'Rusher',
  'Bald Grinder': 'Bald Grinder',
  'Balanced Player': 'Balanced Player',
  'Rational Thinker': 'Rational Thinker',
  'Responsible Anchor': 'Responsible Anchor',
  'Self-Deprecating Humorist': 'Self-Deprecating Humorist',
  'Confident Competitor': 'Confident Competitor',
  'Carry Goat': 'Carry Goat',
  'Friend Collector': 'Friend Collector',
  'Team Supporter': 'Team Supporter',
  'Jokester': 'Jokester',
  // 中文对应
  '键盘粉碎者': 'Emotional Player',
  '收集狂': 'Hidden Personality',
  '摆烂仙人': 'Challenge Avoider',
  '躺平咸鱼': 'Lying Flat Fish',
  '偷跑Tee': 'Rusher',
  '独攀者': 'Bald Grinder',
  '中立者': 'Balanced Player',
  '策略大师': 'Rational Thinker',
  '背锅侠': 'Responsible Anchor',
  '小丑竟是我': 'Self-Deprecating Humorist',
  '装杯带师': 'Confident Competitor',
  '带飞者': 'Carry Goat',
  '扩列狂魔': 'Friend Collector',
  '团队依赖户': 'Team Supporter',
  '整活艺术家': 'Jokester'
};

// 模拟updatePersonalityTypes函数的逻辑
function testPersonalityTypeStandardization() {
  console.log('=== 测试人格类型标准化 ===');
  console.log('原始用户数据数量:', mockUsers.length);
  
  // 提取原始人格类型
  const originalTypes = mockUsers.map(user => user.personality);
  console.log('\n原始人格类型:');
  console.log(originalTypes);
  
  // 去重并标准化
  const personalitySet = new Set(originalTypes);
  const personalityTypes = Array.from(personalitySet);
  
  // 标准化人格类型名称
  const standardizedTypes = new Set();
  personalityTypes.forEach(type => {
    const standardType = personalityMap[type] || type;
    standardizedTypes.add(standardType);
  });
  
  const finalTypes = Array.from(standardizedTypes).sort();
  
  console.log('\n标准化后的人格类型:');
  console.log(finalTypes);
  
  console.log('\n=== 测试结果 ===');
  console.log('原始人格类型数量:', originalTypes.length);
  console.log('去重后人格类型数量:', personalityTypes.length);
  console.log('标准化后人格类型数量:', finalTypes.length);
  
  // 检查是否有重复的Carry Goat或Team Supporter
  const carryGoatCount = finalTypes.filter(type => type === 'Carry Goat').length;
  const teamSupporterCount = finalTypes.filter(type => type === 'Team Supporter').length;
  
  console.log('\nCarry Goat出现次数:', carryGoatCount);
  console.log('Team Supporter出现次数:', teamSupporterCount);
  
  // 检查是否包含Emotional Player（键盘粉碎者）
  const hasEmotionalPlayer = finalTypes.includes('Emotional Player');
  console.log('包含Emotional Player (键盘粉碎者):', hasEmotionalPlayer);
  
  // 检查所有人格类型
  const expectedTypes = [
    'Balanced Player',
    'Bald Grinder',
    'Carry Goat',
    'Challenge Avoider',
    'Confident Competitor',
    'Emotional Player',
    'Friend Collector',
    'Hidden Personality',
    'Jokester',
    'Lying Flat Fish',
    'Rational Thinker',
    'Responsible Anchor',
    'Rusher',
    'Self-Deprecating Humorist',
    'Team Supporter'
  ];
  
  console.log('\n=== 完整性检查 ===');
  console.log('期望的人格类型数量:', expectedTypes.length);
  console.log('实际的人格类型数量:', finalTypes.length);
  
  // 检查是否缺少任何人格类型
  const missingTypes = expectedTypes.filter(type => !finalTypes.includes(type));
  if (missingTypes.length > 0) {
    console.log('缺少的人格类型:', missingTypes);
  } else {
    console.log('所有人格类型都已包含');
  }
  
  // 检查是否有多余的人格类型
  const extraTypes = finalTypes.filter(type => !expectedTypes.includes(type));
  if (extraTypes.length > 0) {
    console.log('多余的人格类型:', extraTypes);
  } else {
    console.log('没有多余的人格类型');
  }
  
  // 总结
  const hasDuplicates = carryGoatCount > 1 || teamSupporterCount > 1;
  const hasAllTypes = missingTypes.length === 0;
  const hasNoExtraTypes = extraTypes.length === 0;
  
  console.log('\n=== 测试总结 ===');
  console.log('无重复人格类型:', !hasDuplicates);
  console.log('包含所有人格类型:', hasAllTypes);
  console.log('无多余人格类型:', hasNoExtraTypes);
  
  if (!hasDuplicates && hasAllTypes && hasNoExtraTypes) {
    console.log('✅ 测试通过：人格类型标准化成功！');
  } else {
    console.log('❌ 测试失败：人格类型标准化存在问题');
  }
}

// 运行测试
testPersonalityTypeStandardization();
