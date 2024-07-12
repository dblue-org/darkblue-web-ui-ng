import { Component } from '@angular/core';
import { MenuItem } from '@site/app/define/sys/menu';

export interface BasicTreeTableItem {
  [key: string]: any
  level?: number
  parent?: any
  children?: any[]
  expand?: boolean
}

@Component({
  template: ''
})
export abstract class BasicTreeTable<T extends BasicTreeTableItem> {
  mapOfExpandedData: { [key: string]: T[] } = {};

  abstract getKeyName(): string;

  collapse(array: T[], data: T, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a[this.getKeyName()] === d[this.getKeyName()])!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: T): T[] {
    const stack: T[] = [];
    const array: T[] = [];
    const hashMap = {};
    stack.push({...root, level: 0, expand: false});

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({...node.children[i], level: node.level! + 1, expand: false, parent: node});
        }
      }
    }

    return array;
  }

  visitNode(node: T, hashMap: { [key: string]: boolean }, array: T[]): void {
    if (!hashMap[node[this.getKeyName()]]) {
      hashMap[node[this.getKeyName()]] = true;
      array.push(node);
    }
  }

  clearExpandedData() {
    this.mapOfExpandedData = {};
  }
}
