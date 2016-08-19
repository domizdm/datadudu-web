/**
 * Created by gorebill on 7/25/16.
 */


window.lang = window.lang || {};
window.lang['zh-CN'] = {
  // ---- Login Page Begin ----
  'login.title': '管理平台需要进行身份验证',
  'login.username': '用户名',
  'login.password': '密码',
  // ---- Login Page End ----

  // ---- Sidebar Begin ----
  'sidebar.data_factory': '数据工厂',
  'sidebar.data_warehouse': '数据仓库',
  'sidebar.dudu_http': 'HTTP数据交互',
  'sidebar.data_rules': '数据规则',
  'sidebar.commands': '指令管理',
  'sidebar.data_analysis': '数据分析服务',
  'sidebar.triggers_log': '预警触发记录',
  'sidebar.product_management': '产品管理',
  'sidebar.my_products': '我发布的产品',
  'sidebar.product_library': '公共产品库',
  'sidebar.device_management': '设备管理',
  'sidebar.account': '账户管理',
  'sidebar.personal_data': '个人资料',
  'sidebar.my_account': '我的社区',
  'sidebar.edit_account': 'Edit Account',
  'sidebar.public_profile': 'Public Profile',
  'sidebar.security_settings': '安全设置',
  'sidebar.expense_center': '费用中心',
  'sidebar.account_inquiry': '账户查询',
  'sidebar.order_management': '订单管理',
  'sidebar.message_center': ' 消息中心',
  'sidebar.full_message': ' 全部消息',
  'sidebar.unread_message': ' 未读消息',
  'sidebar.read_message': ' 已读消息',
  'sidebar.welcome': '欢迎!',
  // ---- Sidebar End ----

  'myTable.previous': '上一页',
  'myTable.next': '下一页',

  // ---- duduhttp Begin ----
  'main-devices.Newduduhttp': '新建HTTP',
  'main-devices.name': '名称',
  'main-devices.method': '方法',
  'main-devices.AuthUsername': '授权用户',
  'main-devices.AuthPassword': '授权密码',
  'main-devices.Method': '方法',
  'main-devices.edit': '编辑',
  'main-devices.delete': '删除',
  // ---- duduhttp End ----


  // ---- rules Begin ----
  'rules-main.rules': '规则',
  'rules-main.newrules': '新增规则',
  'rules-main.name': '名称',
  'rules-main.field': '存储单元',
  'rules-main.criteria': ' 标准',
  'rules-main.condition': '状态 ',
  'rules-main.lastresult': '最近更新结果',
  'rules-main.lastresulttime': '最近更新时间',
  'rules-main.created': '创建时间',
  'rules-main.deleteall': '删除全部',
  'rules-main.delete': '删除 ',
  'rules-main.edit': '编辑 ',
  // ---- rules End ----

  // ---- data-  start ----
  'data-header.channel_view': '空间信息:',
  'data-header.show_hide': '显示/隐藏',
  'data-header.channel_id': '空间编号:',
  'data-header.channel_author': '账户名:',
  'data-header.channel_access': '权限:',
  'data-header.channel_tags': '标签:',
  'data-header.public': '对所有人开放:',
  'data-header.Private': '仅对自开放:',
  'data-header.ChannelStatus': '空间状态:',
  'data-header.Created': '创建时间:',
  'data-header.Updated': '更新时间 :',
  'data-header.UsedSpace': ' 已用空间 :',
  'data-header.LastEntry': '最近一次更新',
  'data-header.access.public': '对所有人开放',
  'data-header.access.private': '仅对自己开放',
  'data-header.upload': '更改/上传图片',

  'nav-data-header.PrivateView': '图形化显示',
  'nav-data-header.RealTime': '实时数据 ',
  'nav-data-header.seating': '设置 ',
  'nav-data-header.apikey': 'API秘钥 ',
  'nav-data-header.commands': '指令 ',
  'nav-data-header.rules': '规则 ',
  'nav-data-header.im_ex': '数据导入/导出 ',
  'nav-data-header.triggers': '触发记录 ',
  'nav-data-header.publicview': '数据共享设定 ',

  'data-graph.DataCharts': '数据图表',
  'data-graph.chart-title-prefix': '图表 ',
  'data-graph.AddDataPoint': '添加数据点 ',
  'data-graph.Type': '类型 ',
  'data-graph.From': '起始时间 ',
  'data-graph.Scale': '数据范围 ',
  'data-graph.Download': '下载 ',
  'data-graph.Refresh': '更新 ',
  'realtime.Frequency': '频率 ',
  'realtime.LiveData': '实时数据 ',
  'realtime.no_data': '没有数据 ',

  // ---- data- End ----


  // ---- Date Enum ----
  'data-graph.durations.all': '所有',
  'data-graph.durations.60': '1 小时',
  'data-graph.durations.120': '2 小时',
  'data-graph.durations.240': '4 小时',
  'data-graph.durations.480': '8 小时',
  'data-graph.durations.1440': '1 天',
  'data-graph.durations.4320': '3 天',
  'data-graph.durations.10080': '7 天',
  'data-graph.durations.43200': '30 天',

  'data-graph.queryTypes.sample': '采样',
  'data-graph.queryTypes.average': '平均',
  'data-graph.queryTypes.sum': '合计',

  'data-graph.queryParams.10': '10 分钟',
  'data-graph.queryParams.15': '15 分钟',
  'data-graph.queryParams.20': '20 分钟',
  'data-graph.queryParams.30': '30 分钟',
  'data-graph.queryParams.60': '1 小时',
  'data-graph.queryParams.240': '4 小时',
  'data-graph.queryParams.720': '12 小时',
  'data-graph.queryParams.1440': '1 天',
  'data-graph.queryParams.daily': '每日',
  // ---- Date Enum ----


  // ---- Commands- Start ----
  'commands.commands': '指令',
  'commands.position': '位置',
  'commands.command_id': '指令ID',
  'commands.command_string': '指令字符',
  'commands.Delete': '删除',
  'commands.Delete All': '删除全部',
  'commands.New Command': '新建指令',
  'commands.placeholder-position': '位置',
  'commands.placeholder-command_string': '指令字符串',
  'commands.Save': '保存',
  'commands.Cancel': '取消',
  'commands.Help': '帮助',
  // ---- Commands- End ----

  // ---- Triggers- start ----
  'triggers.triggers': '预警触发',
  'triggers.TriggerID': '预警触发 ID',
  'triggers.Field': '存储单元',
  'triggers.Log': '日志',
  'triggers.Status': '状态',
  'triggers.CreatedAt': '创建时间',
  'triggers.FinishedAt': '完成时间',
  'triggers.No Data': '没有数据',
  'triggers.Loading': '加载中 ...',
  'triggers.reminder': '本表单页可显示',
  'triggers.reminder2': '个条目，可按照“完成时间”和“创建时间”排序。',
  // ---- Triggers- End ----

  // ---- seating- start ----
  'setting.setting': '设置 ',
  'setting.Name': '空间名字 ',
  'setting.Description': '空间描述 ',
  'setting.Feild': '数据单元 ',
  'setting.Metadata': '元数据: ',
  'setting.Tags': '空间标签: ',
  'setting.latitude': '纬度: ',
  'setting.longitude': '经度: ',
  'setting.elevation': '海拔: ',
  'setting.makepublic': '是否将开放给所有人?: ',
  'setting.url': '网址: ',
  'setting.videoId': '视频ID: ',
  'setting.YouTube': ' YouTube: ',
  'setting.Vimeo': ' Vimeo: ',
  'setting.SaveChannel': ' 保存 ',
  'setting.ClearFeed': '清空所有数据',
  'setting.DeleteChannel': '彻底删除存储空间 ',
  'setting.Help': '帮助 ',
  // ---- seating- End ----

  // ---- API_KEY- START ----
  'apikeys.Apikeys': 'Api秘钥',
  'apikeys.WriteAPIKey': '写入 API 秘钥',
  'apikeys.Key': '秘钥',
  'apikeys.Generate New Write API Key': '创建新的写入API秘钥 ',
  'apikeys.Read API Key': '读取 API 秘钥 ',
  'apikeys.Note': '记录 ',
  'apikeys.Save Notes': '保存记录 ',
  'apikeys.Delete API Key': '删除 API 秘钥 ',
  'apikeys.Generate Read API Key': '创建 读取 API 秘钥 ',
  'apikeys.Help': ' 帮助 ',
  // ---- API_KEY- End ----


  // ---- import/export- start ----
  'importexport.Export': ' 输出 ',
  'importexport.tishi': ' Download all of this Channels feeds in CSV format. ',
  'importexport.From': ' 从 ',
  'importexport.To': ' 到 ',
  'importexport.Download': ' 下载 ',
  'importexport.Help': ' 帮助 ',

  // ----  import/export- End ----
  // ---- New Channel- start ----

  'channel-create.NewChannel': '空间单元 ',
  'channel-create.Name': '空间名字: ',
  'channel-create.Description': '空间描述: ',
  'channel-create.Feild': '数据单元: ',
  'channel-create.Metadata': '元数据: ',
  'channel-create.Tags': '空间标签: ',
  'channel-create.latitude': '维度: ',
  'channel-create.longitude': '经度: ',
  'channel-create.elevation': '海拔: ',
  'channel-create.makepublic': '是否开放给所有人?: ',
  'channel-create.url': '网址: ',
  'channel-create.videoId': '视频ID: ',
  'channel-create.YouTube': 'YouTube ',
  'channel-create.Vimeo': '  Vimeo ',
  'channel-create.SaveChannel': '保存 ',
  'channel-create.Help': '帮助 ',

  // ----  New Channel- End ----

  // ----  New/Edit Rules- start ----
  'NewEdit_Rules.New/Edit Rules': '新建/编辑规则 ',
  'NewEdit_Rules.Rules Name': '规则名字 ',
  'NewEdit_Rules.Selected Fields': 'Selected Fields: ',
  'NewEdit_Rules.Condition Type': '条件类型:',
  'NewEdit_Rules.Condition': '条件:',
  'NewEdit_Rules.ChooseCondition': '--选择条件-- ',
  'NewEdit_Rules.ConditionValue': '条件值:',
  'NewEdit_Rules.ActionFrequency': '动作频率: ',
  'NewEdit_Rules.Action Type': '动作类型 :',
  'NewEdit_Rules.Action Value': '动作值:',
  'NewEdit_Rules.Command String': '命令字符:',
  'NewEdit_Rules.Frequency': '频率:',
  'NewEdit_Rules.Help': '帮助:',
  'NewEdit_Rules.SaveRules': '保存',
  'NewEdit_Rules.Cancel': '取消',
  // ---- New/Edit Rules- End ----


  // ----  Add Data Point- start ----
  'AddDataPoint.AddDataPoint': '添加数据要点',
  'AddDataPoint.CreateAt': '创建于',
  'AddDataPoint.Latitude': '维度',
  'AddDataPoint.Longitude': '经度',
  'AddDataPoint.Elevation': '海拔',
  'AddDataPoint.Status': '状态',
  'AddDataPoint.OK': '确认',
  'AddDataPoint.Cancel': '取消',
  // ----  Add Data Point- end ----

  // ----新建关联设备- start ----
  'devices_con.AddProductBatch': '添加产品 Batch',
  'devices_con.EditProductBatch': '编辑产品 Batch',
  'devices_con.con': 'Loremss Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
  'devices_con.Name': '名字',
  'devices_con.Description': '描述',
  'devices_con.Field': '数据单元',
  'devices_con.Metadata': '元数据',
  'devices_con.Privacy': '隐私',
  'devices_con.Privacy_shuoming': 'Lorem Ipsum is simply dummy text of the printing',
  'devices_con.PrivateDevice': '私人 设备',
  'devices_con.PrivateDevice_shuoming': 'Lorem Ipsum is simply dummy text of the printing',
  'devices_con.PublicDevice': '公开设备',
  'devices_con.PublicDevice_shuoming': 'Lorem Ipsum is simply dummy text of the printing',
  'devices_con.AddBatch': '添加 Batch',
  'devices_con.Cancel': '取消',
  'devices_con.UpdateBatch': '更新 Batch',
  // ---- 新建关联设备- End ----

  // ----Edit DuduHTTP- start ----
  'channel-form.Name': '名字:',
  'channel-form.APIKey': 'API 秘钥:',
  'channel-form.URL': '网址:',
  'channel-form.HTTPAuthUsername': 'HTTP 授权用户名:',
  'channel-form.HTTPAuthPassword:': 'HTTP 授权密码:',
  'channel-form.Method': '方法:',
  'channel-form.ContentType': ' 内容类型:',
  'channel-form.HTTPVersion:': 'HTTP 版本:',
  'channel-form.Choose Edition': '--选择版本--',
  'channel-form.Host': '主机:',
  'channel-form.Headers': '标题:',
  'channel-form.Value': '值',
  'channel-form.Remove': '移除',
  'channel-form.addnewheader': '添加新标题',
  'channel-form.Body': '内容:',
  'channel-form.ParseString': '解析字符串:',
  'channel-form.SaveThingHTTP': '保存 ThingHTTP',
  'channel-form.Help': '帮助',

  // ---- Edit DuduHTTP- End ----

  // ---- 设备管理-start----
  'main-devices.development': '设备开发',
  'main-devices.search': '搜索',
  'main-devices.placeholder': '请输入查询的内容!',
  'main-devices.new_products': '新建一批产品',
  'main-devices.sort': '综合排序',
  'main-devices.popularity_sort': '人气排序',
  'main-devices.CreateDate': '创建时间',

  'main-devices.Remove': '移除',
  'main-devices.Activation_Time': '激活时间:',
  'main-devices.products_id': '产品ID:',
  'main-devices.Activation_Code': '激活码',
  // ---- 设备管理- End----

  // ---- 产品管理- start----
  'main-devices.add': '添加',
  'main-devices.Product key': '产品密钥:',
  'main-devices.Number': '编号',



  'main-devices.ActivedAt': '激活时间',
  'main-devices.AttachedAt': '附加在',
  'main-devices.CreatedAt': '创建时间',
  'main-devices.activated-state': '未激活',
  'main-devices.Devices': '设备',
  'main-devices.shuoming': '按回车键添加多个序列号',
  'main-devices.myDevices': '我的设备',
  'main-devices.context': '创建一个关联设备',
  'main-devices.Uploadlogo': '上传图标',
  'main-devices.Serial_number': '序列号管理',
  'main-devices.company': '大连云动力科技有限公司',
  // ---- 产品管理- end----

  // ---- 账户管理- start----
  'account.name': '名字:',
  'account.province': '省份:',
  'account.city': '城市:',
  'account.postcode': '邮编:',
  'account.Country': '国家:',
  'account.Email': '电子邮件:',
  'account.Phone': '联系电话:',
  'account.address': '联系地址:',
  'account.payment': '支付方式:',
  'account.membership': '会员身份:',
  'account.personage': '个人',
  'account.organizations': '企业/政府（含企业、政府、事业单位、团体、组织）',
  'account.save': '保存',
  'account.cancel': '取消 ',
  'account-main.EditAccount': '编辑账户',

  // ---- 账户管理- End----

  // ---- 在线咨询- start----
  'main-im.online': 'QQ在线咨询',
  'main-im.consultaion': '售前咨询',
  'main-im.Aftermarket': '售后咨询',
  'main-im.wechat': '微信扫一扫',
  // ---- 在线咨询- End----

  // ---- 弹出框- START----

  'modal-con.clean-data': '你确定要清空空间所有数据？',
  'modal-con.ok': '确定',
  'modal-con.cancel': '取消',
  'modal-con.channel-updated': '存储空间已更新',
  'modal-con.errors-happened': '发生错误',
  'modal-con.channel-cleared': '已清空存储空间数据',
  'modal-con.delete-channel': '你想要删除存储空间吗？',
  'modal-con.channel-removed': '存储空间已经移除',

  // ---- create channel- START----
  'create-channel.create-channel': '存储空间已经创建',
  'create-channel.errors-happened': '发生了错误',
  // ---- create channel- END----

  // ---- duduHttp- START----
  'duduHttp.duduHttp-updated': 'DuduHttp保存成功',
  'duduHttp.delete-duduhttp': '您想要删除此Dudu HTTP吗？',
  // ---- duduHttp - END----

  // ---- channel分享- START----
  'share.no-select-channels': '没选择存储空间！',
  'share.no-valid-user': '无效的用户',
  'share.shared-successfully': '存储空间分享成功.',
  'share.shared-warning': '你想分享存储空间',
  'share.shared-to': '到',
  'modal-share.choose-user': '选择用户',
  'modal-share.Username': '用户名',
  'modal-share.text-warning': '你应该从下拉列表中选择一个用户',
  'modal-share.results': '没有找到想要的结果',
  'modal-share.placeholder': '搜索用户至少输入3个有效字符串...',
  // ---- channel分享- END----

  // ---- private更新- START----
  'private.update': '数据量超过单次返回的最大限定值,数据可能显示不全.建议缩小时间范围来分段进行查看.',
  // ---- private更新- END----

  // ---- API秘钥- START----
  'api.generate-writekey': '你确定生成新的写入秘钥吗?',
  'api.generate-readkey': '你确定生成新的可读秘钥吗?',
  'api.new-readkey-generated': '新的可读秘钥已生成.',
  'api.new-writekey-generated': '新的写入秘钥已生成.',
  'api.note-updated': '笔记已更新',
  'api.key-removed': '秘钥已移除',
  'api.key-removed-Prompt': '你想删除这个秘钥',
  // ---- API秘钥- END----

  // ---- commands modal- START----
  'commands.delete-all-commands': '你确定删除所有的指令吗?',
  'commands.delete-commands': '你想删除这个指令码?',
  'commands.new-command-add': '新的指令已添加.',
  'commands.command-deleted': '指令已删除.',
  'commands.commands-deleted': '指令已全部删除',
  // ---- commands modal- END----

  // ---- rule modal- START----
  'rule.delete-all-rules': '你确定删除所有的规则吗？',
  'rule.delete-rules': '你确定删除这条规则吗？',
  'rule.rules-deleted': '规则已删除',


  // ---- rule modal- END----

  // ---- 上传图标 modal- START----
  'uploadicon.Upload-Icon': '上传图标',
  'uploadicon.Upload-prompt': '选择图像文件,点击“上传”保存图标.',
  'uploadicon.ClickChooseImage': '点击选择图片....',
  'uploadicon.NoImage': '没有图片',
  'uploadicon.MaxSize': '最大尺寸:',
  'uploadicon.Upload': '上传',
  'uploadicon.Cancel': '取消',
  'uploadicon.Uploading': '上传中...',
  'uploadicon.alert-warning': '上传中不要关闭此对话框!',
  'uploadicon.NoSelectedImage': '没有选择图片文件.',
  'uploadicon.IconUploaded': '新图片已上传.',
  // ---- 上传图标 modal- END----

  // ---- mydevice modal- START----
  'mydevice.RemoveReminder': '这个设备的所有收集的数据将被删除.你确定要删除此设备吗?',
  'productdetails.AttachDevice': '附加设备',
  'productdetails.ActivationCode': '激活码',
  'productdetails.MyActivationCode': '我的激活码',
  'productdetails.ProductBatches': '按产品批次',
  'productdetails.placeholderCode': '在这里输入激活码..',

  // ---- mydevice modal- END----
  // ---- 弹出框- END----
  null:null
};


