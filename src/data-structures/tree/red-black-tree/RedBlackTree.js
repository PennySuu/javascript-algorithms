import BinarySearchTree from '../binary-search-tree/BinarySearchTree'

// 红黑树的节点颜色
const RED_BLACK_TREE_COLORS = {
  red: 'red',
  black: 'black'
}

// 保存颜色的属性
const COLOR_PROP_NAME = 'color'

export default class RedBlackTree extends BinarySearchTree {
  /**
   *
   * @param {*} value
   * @return {BinarySearchTreeNode}
   */
  insert(value) {
    const insertedNode = super.insert(value)

    // 根节点设为黑色
    if (this.nodeComparator.equal(insertedNode, this.root)) {
      this.makeNodeBlack(insertedNode)
    } else {
      // 不是根节点设为红色
      this.makeNodeRed(insertedNode)
    }

    // 检查树是否平衡
    this.balance(insertedNode)
    return insertedNode
  }
  /**
   * 使树平衡
   * @param {BinarySearchTreeNode} node
   */
  balance(node) {
    // 如果是根节点，什么都不需要改变
    if (this.nodeComparator.equal(node, this.root)) {
      return
    }
    // 如果新节点的父节点是黑色，新节点是红色，树是平衡的
    if (this.isNodeBlack(node.parent)) {
      return
    }
    // 新节点的祖父节点
    const grandParent = node.parent.parent
    // 新节点有叔叔节点，且叔叔节点是红色，改变颜色即可
    if (node.uncle && this.isNodeRed(node.uncle)) {
      // 叔叔节点和父节点变为黑色
      this.makeNodeBlack(node.uncle)
      this.makeNodeBlack(node.parent)

      // 如果祖父节点不是根节点，祖父节点变为红色
      if (!this.nodeComparator.equal(grandParent, this.root)) {
        this.makeNodeRed(grandParent)
      } else {
        // 如果祖父节点是根节点，不需要改变颜色
        return
      }
      // 继续检查树的平衡性
      this.balance(grandParent)
    }
    // 如果叔叔节点是黑色，或者没有叔叔节点（外部节点也是黑色），需要先旋转后变色
    else if (!node.uncle || this.isNodeBlack(node.uncle)) {
      // 有祖父节点时才需要进行下列操作
      if (grandParent) {
        // 新的祖父节点
        let newGrandParent
        // 如果父节点是祖父节点的左孩子
        if (this.nodeComparator.equal(grandParent.left, node.parent)) {
          // 如果新节点是父节点的左孩子
          if (this.nodeComparator.equal(node.parent.left, node)) {
            // 进行LL型旋转
            newGrandParent = this.leftLeftRotation(grandParent)
          } else {
            // 否则进行LR型旋转
            newGrandParent = this.leftRightRotation(grandParent)
          }
        }
        // 如果父节点是祖父节点的右孩子
        else {
          // 如果新节点是父节点的右孩子
          if (this.nodeComparator.equal(node.parent.right, node)) {
            // 进行RR型旋转
            newGrandParent = this.rightRightRotation(grandParent)
          } else {
            // 进行RL型旋转
            newGrandParent = this.rightLeftRotation(grandParent)
          }
        }
        // 如果新的祖父节点是根节点，设为黑色
        if (newGrandParent && newGrandParent.parent === null) {
          this.root = newGrandParent
          this.makeNodeBlack(this.root)
        }
      }
    }
  }
  /**
   *LL型
   * @param {BinarySearchTreeNode|BinaryTreeNode} grandParentNode
   * @return {BinarySearchTreeNode}
   */
  leftLeftRotation(grandParentNode) {
    // 曾祖父节点
    const grandGrandParent = grandParentNode.parent
    // 祖父节点是否为其父亲的左孩子
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode
      )
    }
    // 父亲节点
    const parentNode = grandParentNode.left
    // 新节点的兄弟节点
    const parentRightNode = parentNode.right

    // 提升父节点，下降祖父节点为其右孩子
    parentNode.setRight(grandParentNode)

    // 父节点原来的右孩子设为祖父节点的左孩子
    grandParentNode.setLeft(parentRightNode)

    //如果有曾祖父
    if (grandGrandParent) {
      // 并且祖父是曾祖父的左孩子
      if (grandParentNodeIsLeft) {
        // 使父节点代替祖父节点的位子
        grandGrandParent.setLeft(parentNode)
      } else {
        // 祖父是曾祖父的右孩子，使父节点代替祖父节点的位子
        grandGrandParent.setRight(parentNode)
      }
    }
    // 没有曾祖父，设父节点的父节点为空
    else {
      parentNode.parent = null
    }
    // 旋转玩后，颜色互换，交互父节点和祖父节点的颜色
    this.swapNodeColors(parentNode, grandParentNode)
    return parentNode
  }
  /**
   * LR型
   * @param {BinarySearchTreeNode|BinaryTreeNode} grandParentNode
   * @return {BinarySearchTreeNode}
   */
  leftRightRotation(grandParentNode) {
    // 父节点
    const parentNode = grandParentNode.left
    // 新节点
    const childNode = parentNode.right
    // 新节点的左孩子
    const childLeftNode = childNode.left
    // 提升新节点，下降父节点为其左孩子
    childNode.setLeft(parentNode)
    // 将新节点原来的左孩子设为父节点的右孩子
    parentNode.setRight(childLeftNode)
    // 将新节点替换为祖父节点的左孩子
    grandParentNode.setLeft(childNode)
    // 构造LL型后进行LL型旋转
    return this.leftLeftRotation(grandParentNode)
  }
  /**
   * RR型
   * @param {BinarySearchTreeNode|BinaryTreeNode} grandParentNode
   * @return {BinarySearchTreeNode}
   */
  rightRightRotation(grandParentNode) {
    // 曾祖父节点
    const grandGrandParent = grandParentNode.parent
    // 祖父节点是否为曾祖父节点的左孩子
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode
      )
    }
    // 父节点
    const parentNode = grandParentNode.right
    // 父节点的左孩子
    const parentLeftNode = parentNode.left
    // 提升父节点，降低祖父节点为其左孩子
    parentNode.setLeft(grandParentNode)
    // 父节点原来的左孩子设为祖父节点的右孩子
    grandParentNode.setRight(parentLeftNode)

    //有曾祖父
    if (grandGrandParent) {
      // 曾祖父的左孩子
      if (grandParentNodeIsLeft) {
        // 父节点替换祖父节点
        grandGrandParent.setLeft(parentNode)
      } else {
        // 曾祖父的右孩子
        grandGrandParent.setRight(parentNode)
      }
    }
    // 没有曾祖父，设新根节点的父节点为空
    else {
      parentNode.parent = null
    }
    // 旋转玩后，颜色互换，交互父节点和祖父节点的颜色
    this.swapNodeColors(parentNode, grandParentNode)
    return parentNode
  }
  /**
   * RL型
   * @param {BinarySearchTreeNode|BinaryTreeNode} grandParentNode
   * @return {BinarySearchTreeNode}
   */
  rightLeftRotation(grandParentNode) {
    // 父节点
    const parentNode = grandParentNode.right
    // 新节点
    const childNode = parentNode.left
    // 新节点的右孩子
    const childRightNode = childNode.right
    // 提升新节点降低父节点为其右孩子
    childNode.setRight(parentNode)
    // 新节点原来的左孩子设为父节点的左孩子
    parentNode.setLeft(childRightNode)
    // 新节点替换为祖父节点的右孩子
    grandParentNode.setRight(childNode)
    // 构造RR型后进行RR旋转
    return this.rightRightRotation(grandParentNode)
  }
  /**
   * 设为红色
   * @param {BinarySearchTreeNode|BinaryTreeNode} node
   * @return{BinarySearchTreeNode}
   */
  makeNodeRed(node) {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.red)

    return node
  }
  /**
   * 设为黑色
   * @param {BinarySearchTreeNode|BinaryTreeNode} node
   * @return{BinarySearchTreeNode}
   */
  makeNodeBlack(node) {
    node.meta.set(COLOR_PROP_NAME, RED_BLACK_TREE_COLORS.black)
    return node
  }
  /**
   * 是否红色
   * @param {BinarySearchTreeNode|BinaryTreeNode} node
   * @return{boolean}
   */
  isNodeRed(node) {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.red
  }
  /**
   * 是否黑色
   * @param {BinarySearchTreeNode|BinaryTreeNode} node
   * @return{boolean}
   */
  isNodeBlack(node) {
    return node.meta.get(COLOR_PROP_NAME) === RED_BLACK_TREE_COLORS.black
  }
  /**
   * 是否有颜色
   * @param {BinarySearchTreeNode|BinaryTreeNode} node
   * @return{boolean}
   */
  isNodeColored(node) {
    return this.isNodeRed(node) || this.isNodeBlack(node)
  }
  /**
   * 颜色互换
   * @param {BinarySearchTreeNode|BinaryTreeNode} firstNode
   * @param {BinarySearchTreeNode|BinaryTreeNode} secondNode
   */
  swapNodeColors(firstNode, secondNode) {
    const firstColor = firstNode.meta.get(COLOR_PROP_NAME)
    const secondColor = secondNode.meta.get(COLOR_PROP_NAME)
    firstNode.meta.set(COLOR_PROP_NAME, secondColor)
    secondNode.meta.set(COLOR_PROP_NAME, firstColor)
  }
}
