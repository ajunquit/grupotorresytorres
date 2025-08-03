import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  onClose() {
    this.modalAction.emit(ModalAction.Cancel);
  }

  onSave() {
    this.modalAction.emit(ModalAction.Save);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.modalAction.emit(ModalAction.BackDropClick);
    }
  }
}
