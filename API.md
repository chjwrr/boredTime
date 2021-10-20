[TOC]

# 功能一：天气（已完成）

| 文档地址 | https://www.free-api.com/doc/320                             |
| -------- | ------------------------------------------------------------ |
| 请求示例 | https://query.asilu.com/weather/baidu/?city=北京             |
| 接口描述 | 根据城市名，获取今天和未来三天的天气情况，来源于百度         |
| 返回信息 | 7天得天气情况                                                |
| 天气图标 | http://www.weather.com.cn/m2/i/icon_weather/29x20/n00.gif（d白天、n晚上） |

# 功能二：早、中、晚打开APP，开屏页面显示不同信息



### 早安心语 0：00-10：00

https://www.tianapi.com/apiview/143

### 英语一句话 10：00-20：00

| 文档     | https://www.tianapi.com/apiview/62                           |
| -------- | ------------------------------------------------------------ |
| 请求示例 | http://api.tianapi.com/txapi/ensentence/index?key=bee76a2202b7c21dd90c5163cb8b4506 |
| 接口描述 | 英语一句话（含中文）                                         |
| 返回信息 | 英语、中文                                                   |

### 晚安心语 20：00-24：00

https://www.tianapi.com/apiview/142

# 功能三：新闻（已完成）

### API1 新闻

| 文档地址  | https://www.free-api.com/doc/464（一天只能调用1000次）       |
| --------- | ------------------------------------------------------------ |
| 请求示例  | https://way.jd.com/jisuapi/get?channel=头条&num=10&start=0&appkey=7e9979a264855fff26bea74a253fee06 |
| 请求示例1 | https://www.kancloud.cn/lizhixuan/free_api/1165106    暂时不用 |
| 接口描述  | 根据频道获取相关新闻(头条，新闻，国内，国际，政治，财经，体育，娱乐，军事，教育，科技，NBA，股票，星座，女性，健康，育儿)   17个分类   每个分类最多只能获取 58条数据 |
| 返回信息  | 标题、内容、时间、来源、图片、网址(html)                     |

### API2 新闻列表（只有20条，暂时不用）

| 文档地址   |                                                              |
| ---------- | ------------------------------------------------------------ |
| 请求示例   | https://api.isoyu.com/api/News/new_list?type=1&page=20       |
| 接口描述   | 头条0 军事1 娱乐2 体育3 科技4 艺术5 教育6 要闻7              |
| 新闻详情页 | https://api.isoyu.com/api/News/new_detail?postid=GJ75DMGH000181KT |
| 返回信息   | 标题、时间、来源、图片、网址(html)                           |

# 功能四：短视频

### API1 精选短视频（接口有点慢） 一条

| 文档     |                                     |
| -------- | ----------------------------------- |
| 请求示例 | https://api.iyk0.com/dsp/?type=风景 |
| 接口描述 | 网红、明星、热舞、风景、游戏、动物  |
| 返回信息 | 一条、封面、标题、视频地址          |

### API2 获取微视短视频 暂时不用 一条  标题乱码

| 文档     |                              |
| -------- | ---------------------------- |
| 请求示例 | https://api.iyk0.com/weishi  |
| 接口描述 |                              |
| 返回信息 | 视频地址  标题 封面     一条 |

### API3 短视频  多条 不能播放视频

| 文档地址     | https://api.isoyu.com/api/Video/index    推荐                |
| ------------ | ------------------------------------------------------------ |
| 请求示例     | https://api.isoyu.com/api/Video/video_type?type=2&page=0  分类 |
| 视频详情     | https://api.isoyu.com/api/Video/video_detail?vid=VDB9N6RHE   |
| 接口描述     | 精品视频0 搞笑1 美女2 体育3 新闻4                            |
| 视频信息     |                                                              |
| 视频作者信息 |                                                              |

# 功能五：图片（已完成）

### API1 图片 

| 文档     |                              |
| -------- | ---------------------------- |
| 美女图   | https://api.iyk0.com/sjmn/   |
| 美腿     | https://api.iyk0.com/mtt/    |
| 美女图   |                              |
| 随机美图 | https://api.iyk0.com/mn/2/   |
|          |                              |
|          | https://api.iyk0.com/xjj/    |
|          | https://api.iyk0.com/mtyh/   |
|          | https://api.iyk0.com/mn/     |
| 接口描述 |                              |
| 返回信息 | 请求地址就是图片地址    一张 |

### API3 搞笑图片 横竖屏

| 文档地址 | https://www.free-api.com/doc/471                             |
| -------- | ------------------------------------------------------------ |
| 请求示例 | https://way.jd.com/showapi/tpxh?time=2015-07-10&page=10&maxResult=20&appkey=7e9979a264855fff26bea74a253fee06 |
| 接口描述 |                                                              |
| 返回信息 | 多张图片列表                                                 |

### API4 Bing 壁纸   电脑壁纸

| 文档地址 | https://www.free-api.com/doc/318 |
| -------- | -------------------------------- |
| 请求示例 | https://api.asilu.com/bg/        |
| 接口描述 | 获取最近的Bing 壁纸  8张壁纸     |
| 返回信息 | 壁纸地址、时间、描述             |

### API5 壁纸（手机壁纸）

| 文档地址 | http://api.wpbom.com/ipa/wallpa.php                          |
| -------- | ------------------------------------------------------------ |
| 请求示例 | http://api.wpbom.com/api/wallpa.php?msg=4                    |
| 接口描述 | [msg=(1-10，1～美女，2～动漫，3～风景，4～游戏，5～文字，6～视觉，7～情感，8～设计，9～明星，10～物语) |
| 返回信息 | 图片地址   一张图   返回字符串格式的数据                     |

### API6 随机p站萝莉图 竖屏   萝莉

| 文档     |                                |
| -------- | ------------------------------ |
| 请求示例 | https://api.iyk0.com/luoli     |
| 接口描述 | 有点色                         |
| 返回信息 | 请求地址就是图片地址    一张图 |

### API9 二次元图片（横屏大图）  二次元

| 文档      | http://api.wpbom.com/ipa/secon.php        |
| --------- | ----------------------------------------- |
| 请求示例  | http://api.wpbom.com/api/secon.php        |
| 请求示例1 | https://api.iyk0.com/ecy/api.php          |
| 请求示例2 | https://apis.jxcxin.cn/api/dmimg          |
| 接口描述  | 二次元图片                                |
| 返回信息  | 请求接口为图片地址（1920x1080）    一张图 |

# 功能六：音乐

### 随机一首音乐

| 文档     | https://www.free-api.com/doc/302                            |
| -------- | ----------------------------------------------------------- |
| 请求示例 | https://api.uomg.com/api/rand.music?sort=热歌榜&format=json |
| 接口描述 | 随机一首音乐（热歌榜，新歌榜，飙升榜，抖音榜，电音榜）      |
| 返回信息 | 音乐地址、名字、封面                                        |

# 功能七：文本



### 暖文语录 列表

| 文档     |                                                              |
| -------- | ------------------------------------------------------------ |
| 请求示例 | https://qianming.sinaapp.com/index.php/AndroidApi10/index/cid/qutu/lastId/111471 |
| 接口描述 | 暖文语录                                                     |
| 返回信息 | 文字、图片（图片尺寸）、时间、作者   多条                    |



### 美文  列表

https://www.alapi.cn/api/view/37

https://v2.alapi.cn/api/mryw/list?token=QAmJCzjq1B8v1eAh



### 英语励志语录 列表

http://route.showapi.com/1211-1?showapi_appid=49376&showapi_sign=9716aac181fa4252896941e392c9dbcb&count=10

###舔狗日记   一条

### https://v2.alapi.cn/api/dog?token=QAmJCzjq1B8v1eAh

### 一言 一条

https://v2.alapi.cn/api/hitokoto?token=QAmJCzjq1B8v1eAh<br />https://api.lyoi.cc/tangokoto   （内容、作者）

### 神回复 一条

http://api.tianapi.com/txapi/godreply/index?&num=10&key=bee76a2202b7c21dd90c5163cb8b4506

# 功能八：小游戏(已完成)

### 看图猜成语

| 文档     |                           |
| -------- | ------------------------- |
| 请求示例 | https://api.iyk0.com/ktc/ |
| 接口描述 |                           |
| 返回信息 | 图片地址、谜底            |













ACG图片（暂不可用）

| 文档地址 | https://www.free-api.com/doc/352               |
| -------- | ---------------------------------------------- |
| 请求示例 | https://v1.alapi.cn/api/acg                    |
| 接口描述 | 随机返回一张图片（动画、漫画、游戏之类的图片） |
| 返回信息 | 图片尺寸、图片地址、图片大小                   |

图片（横屏大图）暂不可用

| 文档     | http://api.wpbom.com/ipa/picture.php                         |
| -------- | ------------------------------------------------------------ |
| 请求示例 | http://api.wpbom.com/api/picture.php?msg=选择                |
| 接口描述 | 美女，爱情，风景，清新，动漫，明星，萌宠，游戏，汽车，时尚，日历，影视，军事，体育，萌娃，格言 |
| 返回信息 | 图片地址（text格式）                                         |
