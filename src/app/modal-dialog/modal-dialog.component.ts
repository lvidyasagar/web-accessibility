import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit {
  @Input() header: string;
  @Input() display: boolean;
  @Output() closeDialog = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}

  closeDialogCall(): void {
    this.closeDialog.emit(false);
  }
}
