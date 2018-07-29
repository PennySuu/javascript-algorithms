import BinarySearchTree from '../binary-search-tree/BinarySearchTree'

const RED_BLACK_TREE_COLORS = {
  red: 'red',
  black: 'black'
}

const COLOR_PROP_NAME = 'color'

export default class RedBlackTree extends BinarySearchTree {
  insert(value) {
    const insertedNode = super.insert(value)

    if (this.nodeComparator.equal(insertedNode, this.root)) {
      this.makeNodeBlack(insertedNode)
    } else {
      this.makeNodeRed(insertedNode)
    }

    this.balance(insertedNode)
    return insertedNode
  }
  balance(node) {
    if (this.nodeComparator.equal(node, this.root)) {
      return
    }
    if (this.isNodeBlack(node.parent)) {
      return
    }
    const grandParent = node.parent.parent
    if (node.uncle && this.isNodeRed(node.uncle)) {
      this.makeNodeBlack(node.uncle)
      this.makeNodeBlack(node.parent)

      if (!this.nodeComparator.equal(grandParent, this.root)) {
        this.makeNodeRed(grandParent)
      } else {
        return
      }
      this.balance(grandParent)
    } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
      if (grandParent) {
        let newGrandParent
        if (this.nodeComparator.equal(grandParent.left, node.parent)) {
          if (this.nodeComparator.equal(node.parent.left, node)) {
            newGrandParent = this.leftLeftRotation(grandParent)
          } else {
            newGrandParent = this.leftRightRotation(grandParent)
          }
        } else {
          if (this.nodeComparator.equal(node.parent.right, node)) {
            newGrandParent = this.rightRightRotation(grandParent)
          } else {
            newGrandParent = this.rightLeftRotation(grandParent)
          }
        }
        if (newGrandParent && newGrandParent.parent === null) {
          this.root = newGrandParent
          this.makeNodeBlack(this.root)
        }
        this.balance(newGrandParent)
      }
    }
  }
  leftLeftRotation(grandParentNode) {
    const grandGrandParent = grandParentNode.parent
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator(
        grandGrandParent.left,
        grandParentNode
      )
    }
    const parentNode = grandParentNode.left
    const parentRightNode = parentNode.right
    grandParentNode.setLeft(parentRightNode)
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else {
      parentNode.parent = null
    }
    this.swapNodeColors(parentNode, grandParentNode)
    return parentNode
  }
  leftRightRotation(grandParentNode) {
    const parentNode = grandParentNode.left
    const childNode = parentNode.right
    const childLeftNode = childNode.left
    childNode.setLeft(parentNode)
    parentNode.setRight(childLeftNode)
    grandParentNode.setLeft(childNode)

    return this.leftLeftRotation(grandParentNode)
  }
  rightRightRotation(grandParentNode) {
    const grandGrandParent = grandParentNode.parent
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode
      )
    }
    const parentNode = grandParentNode.right
    const parentLeftNode = parent.left
    parentNode.setLeft(grandParentNode)
    grandParentNode.setRight(parentLeftNode)

    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else {
      parentNode.parent = null
    }
    this.swapNodeColors(parentNode, grandParentNode)
    return parentNode
  }
  rightLeftRotation(grandParentNode) {
    const parentNode = grandParentNode.right
    const childNode = parentNode.left
    const childRightNode = childNode.right
    childNode.setRight(parentNode)
    parentNode.setLeft(childRightNode)
    grandParentNode.setRight(childNode)
    return this.rightRightRotation(grandParentNode)
  }
  makeNodeRed(node) {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.red)

    return node
  }
  makeNodeBlack(node) {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.black)
    return node
  }
  isNodeRed(node) {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.red
  }
  isNodeBlack(node) {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.black
  }
  isNodeColored(node) {
    return this.isNodeRed(node) || this.isNodeBlack(node)
  }
  swapNodeColors(firstNode, secondNode) {
    const firstColor = firstNode.meta.get(COLOR_PROP_NAME)
    const secondColor = secondNode.meta.get(COLOR_PROP_NAME)
    firstNode.meta.set(COLOR_PROP_NAME, secondColor)
    secondNode.meta.set(COLOR_PROP_NAME, firstColor)
  }
}
