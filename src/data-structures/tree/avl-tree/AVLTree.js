import BinarySearchTree from '../binary-search-tree/BinarySearchTree'

export default class AVLTree extends BinarySearchTree {
  /**
   * 插入节点
   * @param {*} value
   */
  insert(value) {
    // 正常插入到二叉排序树中
    super.insert(value)

    // 从被插入的节点开始向上遍历检查每棵树，对不平衡的树进行调整
    let currentNode = this.root.find(value)
    while (currentNode) {
      this.balance(currentNode)
      currentNode = currentNode.parent
    }
  }
  /**
   * 使树平衡
   * @param {BinarySearchTreeNode} node
   */
  balance(node) {
    //平衡因子不在[-1.0,1]这个范围内，需要重新调整使树平衡
    //左树不平衡
    if (node.balanceFactor > 1) {
      //LL型
      if (node.left.balanceFactor > 0) {
        this.rotateLeftLeft(node)
      } else if (node.left.balanceFactor < 0) {
        //LR型
        this.rotateLeftRight(node)
      }
    } else if (node.balanceFactor < -1) {
      // 右树不平衡
      if (node.right.balanceFactor < 0) {
        // RR型
        this.rotateRightRight(node)
      } else if (node.right.balanceFactor > 0) {
        // RL型
        this.rotateRightLeft(node)
      }
    }
  }
  /**
   * LL型
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateLeftLeft(rootNode) {
    // 将rootNode节点与leftNode节点的的链接断开
    const leftNode = rootNode.left
    rootNode.setLeft(null)

    //使leftNode节点成为rootNode节点父节点的左节点
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode)
    } else if (rootNode === this.root) {
      //如果传入的rootNode节点就是树的根节点，使leftNode节点作为新的根
      this.root = leftNode
    }

    //将leftNode节点的右子节点设为rootNode节点的左子节点
    //因为leftNode的右节点将被rootNode节点代替
    if (leftNode.right) {
      rootNode.setLeft(leftNode.right)
    }
    //将根节点设为leftNode节点的右子节点
    leftNode.setRight(rootNode)
  }
  /**
   * LR型
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateLeftRight(rootNode) {
    // 将rootNode节点与leftNode节点的的链接断开
    const leftNode = rootNode.left
    rootNode.setLeft(null)

    // 将leftNode节点与其右子节点（leftRightNode）的的链接断开
    const leftRightNode = leftNode.right
    leftNode.setRight(null)

    // 将leftRightNode的左子节点链接到leftNode的右子节点
    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left)
      leftRightNode.setLeft(null)
    }
    // 将rootNode的左节点设为leftRightNode
    rootNode.setLeft(leftRightNode)
    // 将leftRightNode的左节点设为leftNode
    leftRightNode.setLeft(leftNode)
    // 形成LL型结构
    this.rotateLeftLeft(rootNode)
  }
  /**
   * RL型
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateRightLeft(rootNode) {
    //将rootNode节点与其右节点的链接断开
    const rightNode = rootNode.right
    rootNode.setRight(null)

    //将rightNode节点与其左节点的链接断开
    const rightLeftNode = rightNode.left
    rightNode.setLeft(null)

    //将rightLeftNode节点的右子节点设为rightNode节点的右子节点
    //因为rightLeftNode的右节点将被rightNode节点代替
    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right)
      rightLeftNode.setRight(null)
    }
    //将rootNode的右节点设为rightLeftNode
    rootNode.setRight(rightLeftNode)
    //将rightLeftNode节点的右节点设为rightNode
    rightLeftNode.setRight(rightNode)
    //构成RR型
    this.rotateRightRight(rootNode)
  }

  /**
   * RR型
   * @param {BinarySearchTreeNode} rootNode
   */
  rotateRightRight(rootNode) {
    // 将rootNode节点与rightNode节点的的链接断开
    const rightNode = rootNode.right
    rootNode.setRight(null)

    //使rightNode节点成为rootNode节点父节点的右节点
    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode)
    } else if (rootNode === this.root) {
      this.root = rightNode
    }
    //将rightNode节点的左子节点设为rootNode节点的右子节点
    //因为rightNode的左节点将被rootNode节点代替
    if (rightNode.left) {
      rootNode.setRight(rightNode.left)
    }
    //将rootNode设为rightNode的左节点
    rightNode.setLeft(rootNode)
  }
}
