import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { Icons } from "../../../shared/enums/icons.enum";

@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    ReactiveFormsModule,
    MatIcon
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent {
  constructor(public dialogRef: MatDialogRef<FileUploadDialogComponent>, private _fb: FormBuilder) {
  }

  isFocused = false;
  documentForm = this._fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    content: ['', Validators.required],
    createdDate: [new Date()],
    fileType: ['', Validators.required]
  });

  // TODO refactor event type
  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        this.documentForm.patchValue({
          name: file.name,
          fileType: file.type,
          content: fileContent
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onBlur(): void {
    this.isFocused = false;
  }

  onFocus(): void {
    this.isFocused = true;
  }


  onClose(): void {
    this.dialogRef.close();
  }

  protected readonly Icons = Icons;
}
