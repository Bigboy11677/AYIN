const fetch = require('node-fetch');

const API_BASE = 'https://ayin-production.up.railway.app';

async function testHealth() {
  console.log('=== 测试1: 健康检查 ===');
  try {
    const response = await fetch(API_BASE + '/api/health');
    const data = await response.json();
    console.log('状态码:', response.status);
    console.log('响应:', data);
    console.log('健康检查:', data.success ? '✅ 正常' : '❌ 异常');
  } catch (error) {
    console.log('❌ 健康检查失败:', error.message);
  }
}

async function testSubmitData() {
  console.log('\n=== 测试2: 提交数据 ===');
  const testData = {
    gameId: 'test123',
    name: '万事屋',
    personality: 'Bald Grinder'
  };
  
  try {
    const response = await fetch(API_BASE + '/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testData)
    });
    
    const data = await response.json();
    console.log('状态码:', response.status);
    console.log('响应:', data);
    console.log('提交结果:', data.success ? '✅ 成功' : '❌ 失败');
  } catch (error) {
    console.log('❌ 提交数据失败:', error.message);
  }
}

async function testFetchData() {
  console.log('\n=== 测试3: 获取数据 ===');
  try {
    const response = await fetch(API_BASE + '/api/users');
    const data = await response.json();
    console.log('状态码:', response.status);
    console.log('响应:', data);
    if (data.success) {
      console.log('数据数量:', data.data.length);
      console.log('✅ 成功获取数据');
    } else {
      console.log('❌ 获取数据失败');
    }
  } catch (error) {
    console.log('❌ 获取数据失败:', error.message);
  }
}

// 运行所有测试
async function runAllTests() {
  await testHealth();
  await testSubmitData();
  await testFetchData();
}

runAllTests();