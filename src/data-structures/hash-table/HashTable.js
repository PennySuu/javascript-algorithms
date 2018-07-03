import LinkedList from '../linked-list/LinkedList'

// 哈希表的大小直接影响冲突的个数
// 哈希表越大冲突数越少
// 为了演示冲突是何如处理的，可以把哈希表的大小设置成一个很小的值
const defaultHashTableSize = 31

export default class HashTable {
  /**
   * @param {number} hashTableSize
   */
  constructor(hashTableSize = defaultHashTableSize) {
    // 创建一个特定大小的哈希表，每个桶填充一个空链表
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList())

    // 实际key与hashkey之间的映射
    this.keys = {}
  }
  /**
   * 将key转换为哈希值
   * @param {string} key
   * @returns {number}
   */
  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    )

    return hash % this.buckets.length
  }

  /**
   * 新增元素
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const keyHash = this.hash(key)
    this.keys[key] = keyHash
    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({
      callback: nodeValue => nodeValue.key === key
    })

    if (!node) {
      bucketLinkedList.append({ key, value })
    } else {
      node.value.value = value
    }
  }

  /**
   * 删除元素
   * @param {string} key
   * @return {*}
   */
  delete(key) {
    const keyHash = this.hash(key)
    delete this.keys[key]
    const bucketLinkedList = this.buckets[keyHash]
    const node = bucketLinkedList.find({
      callback: nodeValue => nodeValue.key === key
    })
    if (node) {
      return bucketLinkedList.delete(node.value)
    }
    return null
  }

  /**
   * 获取某个元素值
   * @param {string} key
   * @return {*}
   */
  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)]
    const node = bucketLinkedList.find({
      callback: nodeValue => nodeValue.key === key
    })
    return node ? node.value.value : undefined
  }

  /**
   * 判断是否存在某元素
   * @param {string} key
   * @return {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key)
  }

  /**
   * 获取hash表中已存在的所有的key
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys)
  }
}
