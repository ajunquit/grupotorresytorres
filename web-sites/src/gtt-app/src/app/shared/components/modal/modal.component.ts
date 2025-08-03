import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalAction } from '../../enums/modal-action.enum';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  @Input() show: boolean = false;
  @Input() title: string = '';

  @Output() modalAction = new EventEmitter<ModalAction>();

  public onClose(): void {
    this.modalAction.emit(ModalAction.Cancel);
  }

  public onSave(): void {
    this.modalAction.emit(ModalAction.Save);
  }

  public onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.modalAction.emit(ModalAction.BackDropClick);
    }
  }
}
