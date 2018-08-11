import GraphVertex from './GraphVertex'
import GraphEdge from './GraphEdge'

export default class Graph {
  /**
   * 图
   * @param {boolean} isDirected
   */
  constructor(isDirected = false) {
    // 顶点
    this.vertices = {}
    // 边
    this.edges = {}
    // 有向还是无向图
    this.isDirected = isDirected
  }
  /**
   * 添加顶点
   * @param {GraphVertex} newVertex
   * @returns {Graph}
   */
  addVertex(newVertex) {
    this.vertices[newVertex.getKey()] = newVertex
    return this
  }
  /**
   * 通过顶点的key值获取该顶点
   * @param {string} vertexKey
   * @returns {GraphVertex}
   */
  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey]
  }
  /**
   * 获取图所有的顶点
   * @returns {GraphVertex[]}
   */
  getAllVertices() {
    return Object.values(this.vertices)
  }
  /**
   * 通过顶点的key值查找顶点
   * @param {GraphVertex} vertexKey
   * @returns {GraphVertex|null}
   */
  findVertexByKey(vertexKey) {
    if (this.vertices[vertexKey]) {
      return this.vertices[vertexKey]
    }
    return null
  }
  /**
   * 添加边
   * @param {GraphEdge} edge
   * @returns {Graph}
   */
  addEdge(edge) {
    // 判断之前是否已经有这条边的两个顶点
    let startVertex = this.getVertexByKey(edge.startVertex.getKey())
    let endVertex = this.getVertexByKey(edge.endVertex.getKey())
    // 如果之前没有，先添加新的顶点
    if (!startVertex) {
      this.addVertex(edge.startVertex)
      startVertex = this.getVertexByKey(edge.startVertex.getKey())
    }

    if (!endVertex) {
      this.addVertex(edge.endVertex)
      endVertex = this.getVertexByKey(edge.endVertex.getKey())
    }
    // 如果已经有这条边，不能重复添加
    if (this.edges[edge.getKey()]) {
      throw new Error('Edge has already been added before')
    } else {
      this.edges[edge.getKey()] = edge
    }
    // 如果是有向图，只需要为起点添加相邻边的记录
    if (this.isDirected) {
      startVertex.addEdge(edge)
    } else {
      // 如果是无向图，两个顶点都需要记录相邻边
      startVertex.addEdge(edge)
      endVertex.addEdge(edge)
    }
    return this
  }
  /**
   * 删除边
   * @param {GraphEdge} edge
   */
  deleteEdge(edge) {
    // 如果存在这条边，将其删除
    if (this.edges[edge.getKey()]) {
      delete this.edges[edge.getKey()]
    } else {
      // 不能删除不存在的边
      throw new Error('Edge not found in graph')
    }
    // 获取这条边的两个顶点
    const startVertex = this.getVertexByKey(edge.startVertex.getKey())
    const endVertex = this.getVertexByKey(edge.endVertex.getKey())
    // 将这条边的记录从两个顶点中删除
    startVertex.deleteEdge(edge)
    endVertex.deleteEdge(edge)
  }
  /**
   * 查找两个顶点是否相连
   * @param {GraphVertex} startVertex
   * @param {GraphVertex} endVertex
   * @returns {GraphEdge|null}
   */
  findEdge(startVertex, endVertex) {
    // 如果顶点不存在，返回null
    const vertex = this.getVertexByKey(startVertex.getKey())
    if (!vertex) {
      return null
    }
    return vertex.findEdge(endVertex)
  }
  /**
   * 获取图的所有边
   * @returns {GraphEdge[]}
   */
  getAllEdges() {
    return Object.values(this.edges)
  }
  /**
   * 获取图的权重
   * @returns {number}
   */
  getWeight() {
    return this.getAllEdges().reduce((weight, graphEdge) => {
      return weight + graphEdge.weight
    }, 0)
  }
  /**
   * 生成逆向图
   */
  reverse() {
    this.getAllEdges().forEach(edge => {
      this.deleteEdge(edge)
      edge.reverse()
      this.addEdge(edge)
    })
  }
  /**
   * 获取某个顶点的相连的点
   * @param {GraphVertex} vertex
   * @returns {GraphVertex[]}
   */
  getNeighbors(vertex) {
    return vertex.getNeighbors()
  }
  /**
   * 获取图中所有顶点的索引
   * @returns {object}
   */
  getVerticesIndices() {
    const verticesIndices = {}
    this.getAllVertices().forEach((vertex, index) => {
      verticesIndices[vertex.getKey()] = index
    })
    return verticesIndices
  }
  /**
   * 获取图的邻接矩阵
   * @returns {*[][]}
   */
  getAdjacencyMatrix() {
    // 图中所有的点
    const vertices = this.getAllVertices()
    // 点的索引
    const verticesIndices = this.getVerticesIndices()

    // 邻接矩阵中的其他值，有向图为Infinity，无向图为0
    const initalValue = this.isDirected ? Infinity : 0
    // 邻接矩阵是一个二维数组
    const adjacencyMatrix = Array(vertices.length)
      .fill(null)
      .map(() => {
        return Array(vertices.length).fill(initalValue)
      })

    // 填充行与列
    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach(neighbor => {
        const neighborIndex = verticesIndices[neighbor.getKey()]
        adjacencyMatrix[vertexIndex][neighborIndex] = this.isDirected
          ? this.findEdge(vertex, neighbor).weight
          : 1
      })
    })

    return adjacencyMatrix
  }
  toString() {
    return Object.keys(this.vertices).toString()
  }
}
