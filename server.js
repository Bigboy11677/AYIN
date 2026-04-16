const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ddnet-personality';

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 连接MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB连接成功'))
  .catch(err => console.error('MongoDB连接失败:', err));

// 定义用户模型
const UserSchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  name: { type: String, required: true },
  personality: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  avatarImage: { type: String, default: '' }
});

// 创建索引优化查询性能
UserSchema.index({ personality: 1, timestamp: -1 });
UserSchema.index({ timestamp: -1 });

const User = mongoose.model('User', UserSchema);

// API路由

// 1. POST /api/users - 提交用户数据
app.post('/api/users', async (req, res) => {
  try {
    const { gameId, name, personality, avatarImage } = req.body;
    
    // 如果用户跳过了取名，不保存
    if (!gameId) {
      return res.json({ success: false, message: '用户未提供游戏ID，跳过存储' });
    }
    
    // 检查是否已存在相同数据，避免重复
    const existingUser = await User.findOne({
      gameId,
      personality
    });
    
    if (existingUser) {
      // 更新现有记录
      existingUser.name = name || gameId;
      existingUser.avatarImage = avatarImage || '';
      existingUser.timestamp = new Date();
      await existingUser.save();
      return res.json({ success: true, message: '数据更新成功', data: existingUser });
    }
    
    const user = new User({
      gameId,
      name: name || gameId,
      personality,
      avatarImage: avatarImage || '',
      timestamp: new Date()
    });
    
    await user.save();
    res.json({ success: true, message: '数据提交成功', data: user });
  } catch (error) {
    console.error('提交数据失败:', error);
    res.json({ success: false, message: '数据提交失败', error: error.message });
  }
});

// 2. GET /api/users/same-personality - 获取相同人格的用户数据
app.get('/api/users/same-personality', async (req, res) => {
  try {
    const { personality, limit = 50 } = req.query;
    
    let query = {};
    if (personality) {
      query.personality = personality;
    }
    
    // 优化查询：只选择需要的字段，使用索引
    const users = await User.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .select('gameId name personality timestamp avatarImage');
    
    res.json({ success: true, message: '获取成功', data: users });
  } catch (error) {
    console.error('获取数据失败:', error);
    res.json({ success: false, message: '获取失败', error: error.message });
  }
});

// 测试端点：查看数据库中的数据格式
app.get('/api/test/sample-data', async (req, res) => {
  try {
    const sampleData = await User.findOne().sort({ timestamp: -1 });
    const allData = await User.find().sort({ timestamp: -1 }).limit(5);
    
    res.json({ 
      success: true, 
      sample: sampleData,
      recent: allData,
      count: await User.countDocuments()
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// 3. GET /api/users - 获取所有用户数据（用于管理页面）
app.get('/api/users', async (req, res) => {
  try {
    // 优化查询：使用索引排序
    const users = await User.find()
      .sort({ timestamp: -1 })
      .select('gameId name personality timestamp avatarImage');
    
    res.json({ success: true, message: '获取成功', data: users });
  } catch (error) {
    console.error('获取数据失败:', error);
    res.json({ success: false, message: '获取失败', error: error.message });
  }
});

// 4. DELETE /api/users/:id - 删除用户数据
app.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: '删除成功' });
  } catch (error) {
    console.error('删除数据失败:', error);
    res.json({ success: false, message: '删除失败', error: error.message });
  }
});

// 5. DELETE /api/users/range - 删除指定日期范围的数据
app.delete('/api/users/range', async (req, res) => {
  try {
    const { beforeDate, afterDate } = req.query;
    
    console.log('=== 删除数据请求 ===');
    console.log('原始参数 - beforeDate:', beforeDate, 'afterDate:', afterDate);
    
    // 首先获取数据库中的一些样本数据来查看格式
    const sampleData = await User.findOne().sort({ timestamp: -1 });
    if (sampleData) {
      console.log('样本数据 - timestamp:', sampleData.timestamp);
      console.log('样本数据 - timestamp类型:', typeof sampleData.timestamp);
    }
    
    // 构建查询条件
    let query = {};
    
    if (beforeDate) {
      // 健壮的日期处理：支持多种格式
      const before = new Date(beforeDate);
      // 验证日期是否有效
      if (isNaN(before.getTime())) {
        return res.json({ 
          success: false, 
          message: '无效的日期格式: ' + beforeDate 
        });
      }
      // 设置为当天的结束时间（23:59:59.999）
      before.setHours(23, 59, 59, 999);
      console.log('处理后的 beforeDate:', before);
      query.timestamp = { ...query.timestamp, $lte: before };
    }
    
    if (afterDate) {
      // 健壮的日期处理：支持多种格式
      const after = new Date(afterDate);
      // 验证日期是否有效
      if (isNaN(after.getTime())) {
        return res.json({ 
          success: false, 
          message: '无效的日期格式: ' + afterDate 
        });
      }
      // 设置为当天的开始时间（00:00:00.000）
      after.setHours(0, 0, 0, 0);
      console.log('处理后的 afterDate:', after);
      query.timestamp = { ...query.timestamp, $gte: after };
    }
    
    // 验证日期范围的合理性
    if (beforeDate && afterDate) {
      const before = new Date(beforeDate);
      const after = new Date(afterDate);
      if (after > before) {
        return res.json({ 
          success: false, 
          message: '"删除日期后"不能晚于"删除日期前"' 
        });
      }
    }
    
    console.log('最终查询条件:', query);
    
    // 如果没有日期条件，不执行删除
    if (!beforeDate && !afterDate) {
      return res.json({ success: false, message: '请至少指定一个日期条件' });
    }
    
    // 先查询一下有多少条数据将要被删除
    const countToDelete = await User.countDocuments(query);
    console.log('将要删除的数据条数:', countToDelete);
    
    // 如果没有数据要删除，提前返回
    if (countToDelete === 0) {
      let message = '';
      if (beforeDate && afterDate) {
        message = `在 ${afterDate} 到 ${beforeDate} 之间没有找到数据`;
      } else if (beforeDate) {
        message = `在 ${beforeDate} 之前没有找到数据`;
      } else if (afterDate) {
        message = `在 ${afterDate} 之后没有找到数据`;
      }
      return res.json({ 
        success: true, 
        message: message,
        deletedCount: 0
      });
    }
    
    // 执行删除
    console.log('开始执行删除...');
    const result = await User.deleteMany(query);
    
    console.log('删除完成 - 结果:', result);
    console.log('删除的文档数:', result.deletedCount);
    console.log('确认:', result.acknowledged);
    
    let message = '';
    if (beforeDate && afterDate) {
      message = `成功删除 ${afterDate} 到 ${beforeDate} 之间的 ${result.deletedCount} 条数据`;
    } else if (beforeDate) {
      message = `成功删除 ${beforeDate} 之前的 ${result.deletedCount} 条数据`;
    } else if (afterDate) {
      message = `成功删除 ${afterDate} 之后的 ${result.deletedCount} 条数据`;
    }
    
    console.log('返回消息:', message);
    
    res.json({ 
      success: true, 
      message: message,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('=== 删除数据失败 ===');
    console.error('错误名称:', error.name);
    console.error('错误消息:', error.message);
    console.error('错误堆栈:', error.stack);
    res.json({ 
      success: false, 
      message: `删除失败: ${error.message}`, 
      error: error.message 
    });
  }
});

// 7. DELETE /api/users/all - 清除所有用户数据（需谨慎使用）
app.delete('/api/users/all', async (req, res) => {
  try {
    console.log('=== 清除所有数据请求 ===');
    
    // 先获取将要删除的记录数
    const countToDelete = await User.countDocuments();
    
    if (countToDelete === 0) {
      return res.json({ 
        success: true, 
        message: '数据库中没有数据需要删除',
        deletedCount: 0
      });
    }
    
    // 执行删除
    console.log('开始清除所有数据，共', countToDelete, '条记录');
    const result = await User.deleteMany({});
    
    console.log('清除完成 - 结果:', result);
    console.log('删除的文档数:', result.deletedCount);
    
    res.json({ 
      success: true, 
      message: `成功清除所有 ${result.deletedCount} 条数据`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('=== 清除所有数据失败 ===');
    console.error('错误名称:', error.name);
    console.error('错误消息:', error.message);
    res.json({ 
      success: false, 
      message: `清除失败: ' + error.message, 
      error: error.message 
    });
  }
});

// 6. GET /api/statistics - 获取统计数据
app.get('/api/statistics', async (req, res) => {
  try {
    // 使用countDocuments而不是find().length，性能更好
    const totalUsers = await User.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayUsers = await User.countDocuments({ timestamp: { $gte: today } });
    
    // 使用distinct而不是聚合，性能更好
    const personalities = await User.distinct('personality');
    
    res.json({
      success: true,
      message: '获取成功',
      data: {
        totalUsers,
        todayUsers,
        personalityTypes: personalities.length
      }
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    res.json({ success: false, message: '获取失败', error: error.message });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: '服务器运行正常' });
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在 http://0.0.0.0:${PORT}`);
});
