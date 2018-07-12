import BinarySearchTreeNode from '../BinarySearchTreeNode'

describe('BinarySearchTreeNode', () => {
  it('should create binary search tree', () => {
    const bstNode = new BinarySearchTreeNode(2)
    expect(bstNode.value).toBe(2)
    expect(bstNode.left).toBeNull()
    expect(bstNode.right).toBeNull()
  })
  it('should insert in itself if it is empty', () => {
    const bstNode = new BinarySearchTreeNode()
    bstNode.insert(1)
    expect(bstNode.value).toBe(1)
    expect(bstNode.left).toBeNull()
    expect(bstNode.right).toBeNull()
  })
})
