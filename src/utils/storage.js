// 封装本地存储操作模块

/* 一个本地存储的数据应该拥有那些特性： 增删改查 */

/*
  储存数据 （新增， 修改）
*/
export const setItem = (key, value) => {
  // 将数组，对象等引用数据类型转化为JSON字符串进行存储
  // 将简单数据类型直接存储
  // 需要外界使用该方法时传入对一个的 键名
  if (typeof value === 'object') {
    // 将数组，对象等引用数据类型转化为JSON字符串进行存储
    value = JSON.stringify(value)
  }

  window.localStorage.setItem(key, value)
}

/*
  获取数据
*/
export const getItem = key => {
  // 如果该键存储的是引用数据类型的JSON字符串，那么需要进行JSON.parse的转化
  const data = window.localStorage.getItem(key)
  // 使用JSON.parse()做JSON数据转化时可能会出现报错
  // 1. 做条件判断(要去找到所有满足、不满足的条件) 2. 做错误判断
  try {
    // 先尝试做JSON.parse()的转化，如果报错了，在把他当成原始数据进行返回
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

/*
  删除缓存数据
*/
export const removeItem = key => {
  window.localStorage.removeItem(key)
}

