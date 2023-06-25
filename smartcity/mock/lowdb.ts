import low  from 'lowdb';  // 引入lowdb核心库
import lodashId from 'lodash-id'; // 引入lodash辅助函数库
import LocalStorage from 'lowdb/adapters/LocalStorage' // 从lowdb引入存储引擎，浏览器环境使用Localstorage
const adapter = new LocalStorage('db'); // 创建一个新的数据库
const db = low(adapter); // 初始化数据库

db._.mixin(lodashId);  // 使用lodashId的扩展数据库API, 因为有些数据库操作无法使用 lodash提供的函数完成

export default db;  // 导出数据库模块
