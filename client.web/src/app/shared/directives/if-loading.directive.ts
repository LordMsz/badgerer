import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ILoadable, LoadingStatus } from '../operators/ILoadable';

@Directive({
  selector: '[bgIfLoading]'
})
export class IfLoadingDirective {
  private hasView: boolean;

  public constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
  }

  @Input() public set bgIfLoading(loadable: ILoadable<any>) {
    if (!this.hasView && loadable.status === LoadingStatus.Loading) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (this.hasView && loadable.status !== LoadingStatus.Loading) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

}
