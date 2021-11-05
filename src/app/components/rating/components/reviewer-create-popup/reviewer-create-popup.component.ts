import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {SnackBarService} from "../../../../services/snack-bar.service";
import {Reviewer} from "../../../../models/entities/Reviewer";

@Component({
  selector: 'app-reviewer-create-popup',
  templateUrl: './reviewer-create-popup.component.html',
  styleUrls: ['./reviewer-create-popup.component.scss']
})
export class ReviewerCreatePopupComponent implements OnInit {

  form: FormGroup;

  constructor(protected dialogRef: MatDialogRef<ReviewerCreatePopupComponent>) { }

  ngOnInit(): void
  {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void
  {
    if(this.form.valid)
      this.dialogRef.close({'reviewer': new Reviewer(this.form.getRawValue())});
  }
}
