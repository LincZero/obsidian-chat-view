## 说明

==该插件只是为了方便记录聊天记录和设置对话框样式，请勿用作伪造聊天记录以及犯罪用途==

Obsidian插件，魔改于 [obsidian-chat-view](https://github.com/adifyr/obsidian-chat-view)
保存了原插件的功能，不需要同时使用两个插件
version-by 是版本是魔改基于的原版版本
version 是魔改版本

```json
{
	"id": "obsidian-chat-view-qq",
	"name": "Chat View QQ",
	"version-by": "1.2.1",
	"version": "0.4.0",
	"minAppVersion": "0.15.0",
	"description": "魔改于QQ Chat View，可以直接复制QQ聊天记录中的信息，实现自动渲染",
	"author": "LincZero",
	"isDesktopOnly": false
}
```

## 使用示例

==保留了原插件的功能，原插件功能详见`README 原版.md`，这里仅演示魔改后新增的功能==

使用：（复制代码块里的内容，不要复制代码块）

````
```chat-qq
{self=自己的昵称 例如群友1 可选, width=要渲染的宽度 可选, max-height=最大渲染高度 超出会边滚动框 可选}
[群友1=群友1的QQ, 群友2=群友2的QQ, 群友3=群友3的QQ 可选 不选就就默认分配头像]

群友1 10:38:43  
语雀？  

群友2 10:39:06  
是 啊

群友2 10:39:24  
ob  有没有 输  划线   联想  
  
群友2撤回了一条消息  
  
群友2撤回了一条消息  
  
群友2 10:39:34  
的插件  
  
群友3加入本群。  
  
群友3 10:51:31  
大家好，我是群友3。水瓶座男一枚~

...
  
群友4 11:10:52  
谢谢，已经把需求提交到群相册
```
````

效果：（V0.3.3新增的样式）

![img](README.assets/665IOT2Z[GG{QFY$0M2A}G.png)

旧版样式的效果

<img src="./README.assets/效果展示.png" alt="效果展示"  />

## 插件特点

- 复制即记录，无需过多的人工修改
- 相较于传统的长截图，有着占用内存低、方便修改内容、方便修改显示的比例的优点

## 更新日志

### v0.4.1

修改了 项目结构，拆分出多个文件，更模块化，更利于后期维护

### v0.4.0（20221109）

新增了 全局设置，可以设置自己的昵称和常用的聊天对象的QQ头像。<br>支持全局设置和局部独立设置

修复了 聊天记录中数字和英文长度过场时换行失败的bug

修复了 多行信息不换行而是用空格间隔开的bug

### v0.3.6（20221107）

修复了 聊天记录中emoji的向左浮动的bug

新增了 指令：`{max-height:400}`（不要加px），默认值1000，当信息长度超出后会滚动显示，99999为不设置

### v0.3.5（20221105）

新增了 图片显示的支持

修复了 预览模式下不显示的问题，但仍未解决所有bug（`&nbsp;`字符）

样式有细微改良

### v0.3.3（20221105）

新增了 根据主题切换样式

新增了 指令：`{width:800}`（不要加px），能设置渲染的聊天记录的宽度

新增了 不指定QQ时使用默认头像

修复了 消息过短或过长时，样式会出现bug

### v0.3（20221104）

新增了 仿QQ样式。但为了适配样式，修改了html元素结构，不兼容旧版

### v0.2（20221104）

新增了 指令：`{slef:自己的名字}`，头像指定QQ，指定自己的功能

### v0.1（20221104）

修复了 发送的消息不能换行（原插件不支持多行信息）

初始版本，只有最基础的功能，能识别QQ复制过来的聊天记录

### 当前版本已知bug和待新增功能

待新增功能：

- 导出为图片的功能
- 微信的支持
- 图片本地化（插入本地图片）
- 代码着色，区分人和对话（不知道能不能做到）
- 根据头像选区主题色，对对话框进行着色
- 引用块的渲染

已知bug：

- 会影响正则判断的问题
  - 不能取一些奇奇怪怪的群昵称
  - 不要发送奇奇怪怪的内容，比如发送日期（复制的记录有歧义，无解）
  - 不要和其他群友起一样的名字，分辨不出来（复制的记录有歧义，无解）
- 腾讯字体加载错误，所以目前的字体会有点奇怪
- 有日期的聊天记录、有群头衔的聊天记录（正则应该改进一下）





