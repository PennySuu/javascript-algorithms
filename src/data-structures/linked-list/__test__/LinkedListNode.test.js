import LinkedListNode from '../LinkedListNode'

describe('LinkedListNode', () => {
  it('should create list node with value', () => {
    const node = new LinkedListNode('a')
    expect(node.value).toBe('a')
    expect(node.next).toBeNull()
  })

  it('should create list node with object as a value', () => {
    const nodeValue = { value: 1, key: 'test' }
    const node = new LinkedListNode(nodeValue)
    expect(node.value.value).toBe(1)
    expect(node.value.key).toBe('test')
    expect(node.next).toBeNull()
  })

  it('should link nodes together', () => {
    const node1 = new LinkedListNode(2)
    const node2 = new LinkedListNode(1, node1)
    expect(node1.next).toBeNull()
    expect(node2.next).toBeDefined()
    expect(node1.value).toBe(2)
    expect(node2.next.value).toBe(2)
  })

  it('should convert node to string', () => {
    const nodeValue = { value: 1, key: 'test' }
    const node = new LinkedListNode(nodeValue)
    const toStringCallback = value => `value: ${value.value}, key: ${value.key}`
    expect(node.toString(toStringCallback)).toBe('value: 1, key: test')
  })
})
