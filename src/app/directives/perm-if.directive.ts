import {Directive, EmbeddedViewRef, inject, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {ACLService, ACLType} from "@delon/acl";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription, filter } from 'rxjs';

@Directive({
  selector: '[permIf]',
  exportAs: 'permIf',
  standalone: true
})
export class PermIfDirective implements OnDestroy {
  private readonly srv = inject(ACLService);
  private readonly _viewContainer = inject(ViewContainerRef);
  static ngAcceptInputType_except: boolean | string | undefined | null;

  private _value!: string | string[];
  private _change$: Subscription;
  private _thenTemplateRef: TemplateRef<void> | null = inject(TemplateRef<void>);
  private _elseTemplateRef: TemplateRef<void> | null = null;
  private _thenViewRef: EmbeddedViewRef<void> | null = null;
  private _elseViewRef: EmbeddedViewRef<void> | null = null;

  constructor() {
    this._change$ = this.srv.change
      .pipe(
        takeUntilDestroyed(),
        filter(r => r != null)
      )
      .subscribe(() => this._updateView());
  }


  @Input()
  set permIf(value: string | string[]) {
    this._value = value;
    this._updateView();
  }

  @Input()
  set permIfThen(templateRef: TemplateRef<void> | null) {
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null;
    this._updateView();
  }

  @Input()
  set permIfElse(templateRef: TemplateRef<void> | null) {
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;
    this._updateView();
  }

  protected _updateView(): void {
    if (!this._value) {
      return;
    }
    const res = this.srv.canAbility(this._value);
    if (res) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._change$.unsubscribe();
  }
}
