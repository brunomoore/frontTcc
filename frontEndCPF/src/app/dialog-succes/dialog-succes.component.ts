import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-succes',
  templateUrl: './dialog-succes.component.html',
  styleUrls: ['./dialog-succes.component.scss']
})
export class DialogSuccesComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<DialogSuccesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  onAcceptClick() {
    this.dialogRef.close(true);
  }
  onCloseClick(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy() {
    if (this.data.path !== 'NR') {
      this.router.navigate([this.data.path]);
    }
  }

}
