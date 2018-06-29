import Stack from '../Stack'

describe('Stack', () => {
  it('should create empty stack', () => {
    const stack = new Stack()
    expect(stack).not.toBeNull()
    expect(stack.linkedList).not.toBeNull()
  })
  it('should push data to stack', () => {
    const stack = new Stack()
    stack.push(1)
    stack.push(2)
    expect(stack.toString()).toBe('1,2')
  })
  it('should peek data from stack', () => {
    const stack = new Stack()

    expect(stack.peek()).toBeNull()
    stack.push(3)
    stack.push(4)

    expect(stack.peek()).toBe(4)
    expect(stack.peek()).toBe(4)
  })
  it('should check if stack is empty', () => {
    const stack = new Stack()
    expect(stack.isEmpty()).toBeTruthy()

    stack.push(5)
    expect(stack.isEmpty()).toBeFalsy()
  })
  it('should pop data from stack', () => {
    const stack = new Stack()
    stack.push(6)
    stack.push(7)
    expect(stack.pop()).toBe(7)
    expect(stack.pop()).toBe(6)
    expect(stack.pop()).toBeNull()
    expect(stack.isEmpty()).toBeTruthy()
  })
  it('should be possible to push/pop objects', () => {
    const stack = new Stack()
    stack.push({ value: 'test1', key: 'key1' })
    stack.push({ value: 'test2', key: 'key2' })

    const stringifier = value => `${value.key}:${value.value}`
    expect(stack.toString(stringifier)).toBe('key1:test1,key2:test2')
    expect(stack.pop().value).toBe('test2')
    expect(stack.pop().value).toBe('test1')
    expect(stack.pop()).toBeNull()
  })
  it('should be possible to convert stack to array', () => {
    const stack = new Stack()
    stack.push(8)
    stack.push(9)
    stack.push(10)
    expect(stack.toArray()).toEqual([10, 9, 8])
  })
})
