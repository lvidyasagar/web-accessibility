import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent implements OnInit {
  @Input() header: string;
  @Input() display: boolean;
  @Input() sHeading: boolean;
  @Output() closeDialog = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.display) {
      setTimeout(() => {
        this.elementRef.nativeElement.querySelector('input').focus();
      });
    }
  }

  closeDialogCall(): void {
    this.closeDialog.emit(false);
  }

  handleTabKey(e, modelId: string, nativeElement, tagsList: string): void {
    if (e.keyCode === 9) {
      const focusable = nativeElement
        .querySelector(modelId)
        .querySelectorAll(tagsList);
      if (focusable.length) {
        const first = focusable[0];
        let last = focusable[focusable.length - 1];
        if (last.hasAttribute('disabled')) {
          last = focusable[focusable.length - 2];
        }
        const shift = e.shiftKey;
        if (shift) {
          if (e.target === first) {
            // shift-tab pressed on first input in dialog
            last.focus();
            e.preventDefault();
          }
        } else {
          if (e.target === last) {
            // tab pressed on last input in dialog
            first.focus();
            e.preventDefault();
          }
        }
      }
    } else if (e.keyCode === 27) {
      this.closeDialogCall();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleTabKeyWInModel(event: any): void {
    this.handleTabKey(
      event,
      '#guest_dialog',
      this.elementRef.nativeElement,
      'input,button,select,textarea,a,[tabindex]:not([tabindex="-1"])'
    );
  }
}
