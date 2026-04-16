# MongoDB 连接字符串配置指南

## 你的连接字符串
```
mongodb+srv://WANSHIWU:<db_password>@cluster0.blq6x9m.mongodb.net/?appName=Cluster0
```

## 需要修改的内容

### 1. 替换数据库密码
将 `<db_password>` 替换为你的 MongoDB Atlas 数据库用户密码。

### 2. 添加数据库名称
在连接字符串中添加数据库名称。

### 3. 最终的连接字符串格式
```
mongodb+srv://WANSHIWU:你的密码@cluster0.blq6x9m.mongodb.net/ddnet-personality?retryWrites=true&w=majority&appName=Cluster0
```

## 步骤说明

### 第一步：获取数据库密码
1. 登录 MongoDB Atlas 控制台
2. 进入 "Database Access"
3. 找到 `WANSHIWU` 用户
4. 如果忘记密码，点击 "Edit" → "Edit Password" 重置密码
5. 记住或设置一个新密码

### 第二步：修改连接字符串
1. 复制上面的最终连接字符串格式
2. 将 `你的密码` 替换为实际的数据库用户密码
3. 确保数据库名称是 `ddnet-personality`

### 第三步：配置到 Railway
1. 登录 Railway 控制台
2. 进入 AYIN 项目
3. 点击 "Variables" 标签
4. 找到 `MONGO_URI` 环境变量
5. 将修改后的连接字符串粘贴进去
6. 保存变更

### 第四步：重新部署
1. 在 Railway 控制台，点击 "Deploy" 按钮
2. 等待部署完成
3. 查看 "Logs" 标签，确认是否显示 "MongoDB连接成功"

## 连接字符串组成说明
- `WANSHIWU` - 数据库用户名
- `你的密码` - 数据库用户密码（需要替换）
- `cluster0.blq6x9m.mongodb.net` - MongoDB 集群地址
- `ddnet-personality` - 数据库名称
- `retryWrites=true&w=majority` - MongoDB 连接参数

## 验证步骤
1. 配置完成后，打开 `test-data-flow.html`
2. 点击 "检查服务器状态" - 应该正常
3. 点击 "提交测试数据" - 应该成功
4. 点击 "获取所有用户数据" - 应该返回数据
5. 打开 `admin.html` - 应该显示真实数据而不是模拟数据

## 常见问题
**Q: 如果还是连接失败怎么办？**
A: 检查：
1. 密码是否正确
2. MongoDB Atlas 网络访问列表是否包含 0.0.0.0/0
3. Railway 日志中的错误信息

**Q: 数据库密码忘记了怎么办？**
A: 在 MongoDB Atlas 的 "Database Access" 中重置密码

**Q: 为什么需要 ddnet-personality 数据库？**
A: 这是你的应用使用的数据库名称，如果不存在会自动创建