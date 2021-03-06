import Graph from '../Graph'
import GraphEdge from '../GraphEdge'
import GraphVertex from '../GraphVertex'

describe('Graph', () => {
  it('should add vertices to graph', () => {
    const graph = new Graph()
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    graph.addVertex(vertexA).addVertex(vertexB)

    expect(graph.toString()).toBe('A,B')
    expect(graph.getVertexByKey(vertexA.getKey())).toEqual(vertexA)
    expect(graph.getVertexByKey(vertexB.getKey())).toEqual(vertexB)
  })
  it('should add edges to undirected graph', () => {
    const graph = new Graph()
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const edgeAB = new GraphEdge(vertexA, vertexB)
    graph.addEdge(edgeAB)

    expect(graph.getAllVertices().length).toBe(2)
    expect(graph.getAllVertices()[0]).toEqual(vertexA)
    expect(graph.getAllVertices()[1]).toEqual(vertexB)

    const grahpVetexA = graph.findVertexByKey(vertexA.getKey())
    const grahpVetexB = graph.findVertexByKey(vertexB.getKey())

    expect(graph.toString()).toBe('A,B')
    expect(grahpVetexA).toBeDefined()
    expect(grahpVetexB).toBeDefined()

    expect(graph.findVertexByKey('not existiong')).toBeNull()

    expect(grahpVetexA.getNeighbors().length).toBe(1)
    expect(grahpVetexA.getNeighbors()[0]).toEqual(vertexB)
    expect(grahpVetexA.getNeighbors()[0]).toEqual(grahpVetexB)

    expect(grahpVetexB.getNeighbors().length).toBe(1)
    expect(grahpVetexB.getNeighbors()[0]).toEqual(vertexA)
    expect(grahpVetexB.getNeighbors()[0]).toEqual(grahpVetexA)
  })
  it('should add edges to directed graph', () => {
    const graph = new Graph(true)
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const edgeAB = new GraphEdge(vertexA, vertexB)
    graph.addEdge(edgeAB)

    expect(graph.getAllVertices().length).toBe(2)
    expect(graph.getAllVertices()[0]).toEqual(vertexA)
    expect(graph.getAllVertices()[1]).toEqual(vertexB)

    const grahpVetexA = graph.findVertexByKey(vertexA.getKey())
    const grahpVetexB = graph.findVertexByKey(vertexB.getKey())

    expect(graph.toString()).toBe('A,B')
    expect(grahpVetexA).toBeDefined()
    expect(grahpVetexB).toBeDefined()

    expect(grahpVetexA.getNeighbors().length).toBe(1)
    expect(grahpVetexA.getNeighbors()[0]).toEqual(vertexB)
    expect(grahpVetexA.getNeighbors()[0]).toEqual(grahpVetexB)

    expect(grahpVetexB.getNeighbors().length).toBe(0)
  })
  it('should find edge by vertices in undirected graph', () => {
    const graph = new Graph()
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')

    const edgeAB = new GraphEdge(vertexA, vertexB, 2)
    graph.addEdge(edgeAB)

    const graphEdgeAB = graph.findEdge(vertexA, vertexB)
    const graphEdgeBA = graph.findEdge(vertexB, vertexA)
    const graphEdgeAC = graph.findEdge(vertexA, vertexC)
    const graphEdgeCA = graph.findEdge(vertexC, vertexA)

    expect(graphEdgeAC).toBeNull()
    expect(graphEdgeCA).toBeNull()
    expect(graphEdgeAB).toEqual(edgeAB)
    expect(graphEdgeBA).toEqual(edgeAB)
    expect(graphEdgeAB.weight).toBe(2)
  })
  it('should find edge by vertices in directed graph', () => {
    const graph = new Graph(true)
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')

    const edgeAB = new GraphEdge(vertexA, vertexB, 2)
    graph.addEdge(edgeAB)

    const graphEdgeAB = graph.findEdge(vertexA, vertexB)
    const graphEdgeBA = graph.findEdge(vertexB, vertexA)
    const graphEdgeAC = graph.findEdge(vertexA, vertexC)
    const graphEdgeCA = graph.findEdge(vertexC, vertexA)

    expect(graphEdgeAC).toBeNull()
    expect(graphEdgeCA).toBeNull()
    expect(graphEdgeAB).toEqual(edgeAB)
    expect(graphEdgeBA).toBeNull()
    expect(graphEdgeAB.weight).toBe(2)
  })
  it('should return vertex neighbors', () => {
    const graph = new Graph(true)
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')

    const edgeAB = new GraphEdge(vertexA, vertexB)
    const edgeAC = new GraphEdge(vertexA, vertexC)
    graph.addEdge(edgeAB).addEdge(edgeAC)

    const neighbors = graph.getNeighbors(vertexA)
    expect(neighbors.length).toBe(2)
    expect(neighbors[0]).toEqual(vertexB)
    expect(neighbors[1]).toEqual(vertexC)
  })
  it('should throw an error when trying to add edge twice', () => {
    function addSameEdgeTwice() {
      const graph = new Graph(true)
      const vertexA = new GraphVertex('A')
      const vertexB = new GraphVertex('B')
      const edgeAB = new GraphEdge(vertexA, vertexB)
      graph.addEdge(edgeAB).addEdge(edgeAB)
    }
    expect(addSameEdgeTwice).toThrow()
  })
  it('should return the list of all added edges', () => {
    const graph = new Graph(true)
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')

    const edgeAB = new GraphEdge(vertexA, vertexB)
    const edgeBC = new GraphEdge(vertexB, vertexC)
    graph.addEdge(edgeAB).addEdge(edgeBC)

    const edges = graph.getAllEdges()
    expect(edges.length).toBe(2)
    expect(edges[0]).toEqual(edgeAB)
    expect(edges[1]).toEqual(edgeBC)
  })
  it('should calculate total graph weight for default graph', () => {
    const graph = new Graph(true)
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const edgeAB = new GraphEdge(vertexA, vertexB)
    const edgeBC = new GraphEdge(vertexB, vertexC)
    const edgeCD = new GraphEdge(vertexC, vertexD)
    const edgeAD = new GraphEdge(vertexA, vertexD)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeAD)

    expect(graph.getWeight()).toBe(0)
  })
  it('hould calculate total graph weight for wieghted graph', () => {
    const graph = new Graph(true)
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const edgeAB = new GraphEdge(vertexA, vertexB, 2)
    const edgeBC = new GraphEdge(vertexB, vertexC, 4)
    const edgeCD = new GraphEdge(vertexC, vertexD, 6)
    const edgeAD = new GraphEdge(vertexA, vertexD, 8)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeAD)

    expect(graph.getWeight()).toBe(20)
  })
  it('should be possible to delete edges from graph', () => {
    const graph = new Graph()
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const edgeAB = new GraphEdge(vertexA, vertexB)
    const edgeBC = new GraphEdge(vertexB, vertexC)
    const edgeAC = new GraphEdge(vertexA, vertexC)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeAC)

    expect(graph.getAllEdges().length).toBe(3)
    graph.deleteEdge(edgeAB)

    expect(graph.getAllEdges().length).toBe(2)
    expect(graph.getAllEdges()[0].getKey()).toBe(edgeBC.getKey())
    expect(graph.getAllEdges()[1].getKey()).toBe(edgeAC.getKey())
  })
  it('should throw an error when trying to delete not existing edge', () => {
    function deleteNotExistingEdge() {
      const graph = new Graph()
      const vertexA = new GraphVertex('A')
      const vertexB = new GraphVertex('B')
      const vertexC = new GraphVertex('C')
      const edgeAB = new GraphEdge(vertexA, vertexB)
      const edgeBC = new GraphEdge(vertexB, vertexC)
      graph.addEdge(edgeAB)
      graph.deleteEdge(edgeBC)
    }
    expect(deleteNotExistingEdge).toThrowError()
  })
  it('should be possible to reverse graph', () => {
    const graph = new Graph(true)
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const edgeAB = new GraphEdge(vertexA, vertexB, 2)
    const edgeAC = new GraphEdge(vertexA, vertexC, 4)
    const edgeCD = new GraphEdge(vertexC, vertexD, 6)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeAC)
      .addEdge(edgeCD)

    expect(graph.toString()).toBe('A,B,C,D')
    expect(graph.getAllEdges().length).toBe(3)
    expect(graph.getNeighbors(vertexA).length).toBe(2)
    expect(graph.getNeighbors(vertexA)[0].getKey()).toBe(vertexB.getKey())
    expect(graph.getNeighbors(vertexA)[1].getKey()).toBe(vertexC.getKey())
    expect(graph.getNeighbors(vertexB).length).toBe(0)
    expect(graph.getNeighbors(vertexC).length).toBe(1)
    expect(graph.getNeighbors(vertexC)[0].getKey()).toBe(vertexD.getKey())

    graph.reverse()

    expect(graph.toString()).toBe('A,B,C,D')
    expect(graph.getAllEdges().length).toBe(3)
    expect(graph.getNeighbors(vertexA).length).toBe(0)
    expect(graph.getNeighbors(vertexB).length).toBe(1)
    expect(graph.getNeighbors(vertexB)[0].getKey()).toBe(vertexA.getKey())

    expect(graph.getNeighbors(vertexC).length).toBe(1)
    expect(graph.getNeighbors(vertexC)[0].getKey()).toBe(vertexA.getKey())
    expect(graph.getNeighbors(vertexD).length).toBe(1)
    expect(graph.getNeighbors(vertexD)[0].getKey()).toBe(vertexC.getKey())
  })
  it('should return vertices indices', () => {
    const graph = new Graph(true)
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const edgeAB = new GraphEdge(vertexA, vertexB, 2)
    const edgeBC = new GraphEdge(vertexB, vertexC, 4)
    const edgeCD = new GraphEdge(vertexC, vertexD, 6)
    const edgeBD = new GraphEdge(vertexB, vertexD, 6)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD)

    const verticesIndices = graph.getVerticesIndices()
    expect(verticesIndices).toEqual({
      A: 0,
      B: 1,
      C: 2,
      D: 3
    })
  })
  it('should generate adjacency matrix for undirected graph', () => {
    const graph = new Graph()
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const edgeAB = new GraphEdge(vertexA, vertexB)
    const edgeBC = new GraphEdge(vertexB, vertexC)
    const edgeCD = new GraphEdge(vertexC, vertexD)
    const edgeBD = new GraphEdge(vertexB, vertexD)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD)
    const adjacencyMatrix = graph.getAdjacencyMatrix()
    expect(adjacencyMatrix).toEqual([
      [0, 1, 0, 0],
      [1, 0, 1, 1],
      [0, 1, 0, 1],
      [0, 1, 1, 0]
    ])
  })

  it('should generate adjacency matrix for directed graph', () => {
    const graph = new Graph(true)
    const vertexA = new GraphVertex('A')
    const vertexB = new GraphVertex('B')
    const vertexC = new GraphVertex('C')
    const vertexD = new GraphVertex('D')
    const edgeAB = new GraphEdge(vertexA, vertexB, 2)
    const edgeBC = new GraphEdge(vertexB, vertexC, 1)
    const edgeCD = new GraphEdge(vertexC, vertexD, 5)
    const edgeBD = new GraphEdge(vertexB, vertexD, 7)
    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCD)
      .addEdge(edgeBD)
    const adjacencyMatrix = graph.getAdjacencyMatrix()
    expect(adjacencyMatrix).toEqual([
      [Infinity, 2, Infinity, Infinity],
      [Infinity, Infinity, 1, 7],
      [Infinity, Infinity, Infinity, 5],
      [Infinity, Infinity, Infinity, Infinity]
    ])
  })
})
