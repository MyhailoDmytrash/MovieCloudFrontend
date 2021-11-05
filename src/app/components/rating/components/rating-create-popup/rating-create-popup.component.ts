import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Rating} from "../../../../models/entities/Rating";
import {ReviewerService} from "../../../../services/reviewer.service";
import {Reviewer} from "../../../../models/entities/Reviewer";

@Component({
  selector: 'app-rating-create-popup',
  templateUrl: './rating-create-popup.component.html',
  styleUrls: ['./rating-create-popup.component.css']
})
export class RatingCreatePopupComponent implements OnInit {

  form: FormGroup;
  reviewers = new Array<Reviewer>();

  constructor(protected dialogRef: MatDialogRef<RatingCreatePopupComponent>,
              protected reviewerService: ReviewerService) { }

  ngOnInit(): void
  {
    this.reviewerService.getAll().subscribe(data => data.forEach(reviewer => this.reviewers.push(reviewer)));

    this.form = new FormGroup({
      reviewerId: new FormControl('', [Validators.required]),
      star: new FormControl('', [Validators.required]),
    });
  }

  submit()
  {
    if(this.form.valid)
    {
      let rating = new Rating(this.form.getRawValue());

      let id = this.reviewers.find(reviewer => reviewer.name === this.form.getRawValue().reviewerId)?.id;
      if(id)
        rating.reviewerId = id;

      this.dialogRef.close({'rating': rating});
    }
  }
}
