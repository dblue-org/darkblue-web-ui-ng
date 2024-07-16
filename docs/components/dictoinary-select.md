### 基本用法

```html

<app-dictionary-select dkDictionaryCode="TEST" [(ngModel)]="listDictValue"/>
```

- 支持多选
- 支持 `ngModel`
- 在 `FormGroup` 中使用可以直接使用 `formControlName`

### 多选

```html
<app-dictionary-select dkDictionaryCode="TEST" [dkMultiple]="true" [(ngModel)]="listDictValue"/>
```

### API

| 参数                  | 说明   |    类型    | 默认值 |
|:--------------------|:-----|:--------:|:---:|
| `[dkDictonaryCode]` | 字典编码 | `string` | `-` | 
