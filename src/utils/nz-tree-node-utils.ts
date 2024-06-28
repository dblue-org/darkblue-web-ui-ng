import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

export function toNzTreeNodeOptions(nodes: any[], mappingFn: ((node: any) => NzTreeNodeOptions)): NzTreeNodeOptions[] {
  return nodes.map(node => {
    if (node.children && node.children.length > 0) {
      return {
        ...mappingFn(node),
        isLeaf: false,
        children: toNzTreeNodeOptions(node.children, mappingFn)
      }
    }
    return {
      ...mappingFn(node),
      isLeaf: true
    }
  })
}
