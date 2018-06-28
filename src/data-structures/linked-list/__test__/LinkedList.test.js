import LinkedList from '../LinkedList'

describe('LinkedList', () => {
  it('should create empty linked list', () => {
    const linkedList = new LinkedList()

    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()

    linkedList.append(1)
    linkedList.append(2)

    expect(linkedList.toString()).toBe('1,2')
  })

  it('should prepend node to linked list', () => {
    const linkedList = new LinkedList()
    linkedList.prepend(2)
    expect(linkedList.head.toString()).toBe('2')
    expect(linkedList.tail.toString()).toBe('2')

    linkedList.prepend(1)
    linkedList.append(3)
    expect(linkedList.head.toString()).toBe('1')
    expect(linkedList.tail.toString()).toBe('3')
    expect(linkedList.toString()).toBe('1,2,3')
  })

  it('should delete node by value from linked list', () => {
    const linkedList = new LinkedList()

    expect(linkedList.delete(5)).toBeNull()

    linkedList.append(1)
    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3)
    linkedList.append(3)
    linkedList.append(3)
    linkedList.append(4)
    linkedList.append(5)

    expect(linkedList.head.toString()).toBe('1')
    expect(linkedList.tail.toString()).toBe('5')

    const deleteNode = linkedList.delete(3)
    expect(deleteNode.value).toBe(3)
    expect(linkedList.toString()).toBe('1,1,2,4,5')

    linkedList.delete(3)
    expect(linkedList.toString()).toBe('1,1,2,4,5')

    linkedList.delete(1)
    expect(linkedList.toString()).toBe('2,4,5')
    expect(linkedList.head.toString()).toBe('2')
    expect(linkedList.tail.toString()).toBe('5')

    linkedList.delete(2)
    expect(linkedList.head.toString()).toBe('4')
    expect(linkedList.tail.toString()).toBe('5')

    linkedList.delete(5)
    expect(linkedList.head.toString()).toBe('4')
    expect(linkedList.tail.toString()).toBe('4')

    linkedList.delete(4)
    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()
  })

  it('should delete linked list tail', () => {
    const linkedList = new LinkedList()

    const deleteNode = linkedList.deleteTail()
    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()

    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3)

    const deleteNode1 = linkedList.deleteTail()
    expect(deleteNode1.value).toBe(3)
    expect(linkedList.head.toString()).toBe('1')
    expect(linkedList.tail.toString()).toBe('2')

    const deleteNode2 = linkedList.deleteTail()
    expect(deleteNode2.value).toBe(2)
    expect(linkedList.head.toString()).toBe('1')
    expect(linkedList.tail.toString()).toBe('1')

    const deleteNode3 = linkedList.deleteTail()
    expect(deleteNode3.value).toBe(1)
    expect(linkedList.head).toBeNull()
    expect(linkedList.tail).toBeNull()
  })

  it('should delete linked list head', () => {
    const linkedList = new LinkedList()

    const deleteNode = linkedList.deleteHead()
    expect(deleteNode).toBeNull()

    linkedList.append(1)
    linkedList.append(2)
    linkedList.append(3)

    const deleteNode1 = linkedList.deleteHead()
    expect(deleteNode1.value).toBe(1)
    expect(linkedList.head.toString()).toBe('2')
    expect(linkedList.tail.toString()).toBe('3')

    const deleteNode2 = linkedList.deleteHead()
    expect(deleteNode2.value).toBe(2)
    expect(linkedList.head.toString()).toBe('3')
    expect(linkedList.tail.toString()).toBe('3')
  })

  it('should be possible to store object in the list and to print them out', () => {
    const linkedList = new LinkedList()
    const nodeValue1 = { value: 1, key: 'key1' }
    const nodeValue2 = { value: 2, key: 'key2' }

    linkedList.append(nodeValue1).append(nodeValue2)

    const nodeStringifier = value => `${value.key}:${value.value}`

    expect(linkedList.toString(nodeStringifier)).toBe('key2:2,key1:1')
  })

  it('should find node by value', () => {
    const linkedList = new LinkedList()

    expect(linkedList.find({ value: 5 })).toBeNull()

    linkedList.append(2).append(3)

    const node = linkedList.find({ value: 2 })
    expect(node.value).toBe(2)
    expect(linkedList.find({ value: 5 })).toBeNull()
  })

  it('should find node by callback', () => {
    const linkedList = new LinkedList()

    linkedList
      .append({ value: 1, key: 'test1' })
      .append({ value: 2, key: 'test2' })
      .append({ value: 3, key: 'test3' })

    const node = linkedList.find({ callback: value => value.key === 'test2' })
    expect(node).toBeDefined()
    expect(node.value.value).toBe(2)
    expect(nodel.value.key).toBe('test2')
    expect(
      linkedList.find({ callback: value => value.key === 'test5' })
    ).toBeNull()
  })

  it('should find node by means of custom compare function', () => {
    const comparatorFunction = (a, b) => {
      if (a.customValue === b.customValue) {
        return 0
      }
      return a.customValue < b.customValue ? -1 : 1
    }

    const linkedList = new LinkedList(comparatorFunction)

    linkedList
      .append({ value: 1, customValue: 3 })
      .append({ value: 2, customValue: 2 })
      .append({ value: 3, customValue: 1 })

    const node = linkedList.find({ value: { value: 1, customValue: 3 } })
    expect(node).toBeDefined()
    expect(node.value.value).toBe(1)
    expect(node.value.customValue).toBe(3)
  })
})
