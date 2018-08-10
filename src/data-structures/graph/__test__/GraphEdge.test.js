import GraphEdge from '../GraphEdge'
import GraphVertex from '../GraphVertex'

describe('GraphEdge', () => {
  it('should create graph edge with default weight', () => {
    const startVertex = new GraphVertex('A')
    const endVertex = new GraphVertex('B')
    const edge = new GraphEdge(startVertex, endVertex)

    expect(edge.getKey()).toBe('A_B')
    expect(edge.toString()).toBe('A_B')
    expect(edge.startVertex).toEqual(startVertex)
    expect(edge.endVertex).toEqual(endVertex)
    expect(edge.weight).toEqual(0)
  })
  it('should create graph edge with predefined weight', () => {
    const startVertex = new GraphVertex('A')
    const endVertex = new GraphVertex('B')
    const edge = new GraphEdge(startVertex, endVertex, 1)

    expect(edge.startVertex).toEqual(startVertex)
    expect(edge.endVertex).toEqual(endVertex)
    expect(edge.weight).toEqual(1)
  })
  it('should be possible to do edge reverse', () => {
    const startVertex = new GraphVertex('A')
    const endVertex = new GraphVertex('B')
    const edge = new GraphEdge(startVertex, endVertex, 1)

    expect(edge.startVertex).toEqual(startVertex)
    expect(edge.endVertex).toEqual(endVertex)
    expect(edge.weight).toEqual(1)

    edge.reverse()
    expect(edge.startVertex).toEqual(endVertex)
    expect(edge.endVertex).toEqual(startVertex)
    expect(edge.weight).toEqual(1)
  })
})
