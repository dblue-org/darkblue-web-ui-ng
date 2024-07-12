import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

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

declare type TreeNode = NzTreeNodeOptions | NzTreeNode;

export function bfs(nodes: TreeNode[], visit: (node: TreeNode) => void) {
  const stack = [...nodes]
  while (stack.length > 0) {
    const node = stack.shift();
    if (node) {
      visit(node);
      if (node.children && node.children.length > 0) {
        stack.push(...node.children);
      }
    }
  }
}

export function dfs(nodes: TreeNode[], visit: (node: TreeNode) => void) {
  if (nodes && nodes.length > 0) {
    nodes.forEach(node => {
      visit(node);
      if (node.children && node.children.length > 0) {
        dfs(node.children, visit);
      }
    })
  }
}
