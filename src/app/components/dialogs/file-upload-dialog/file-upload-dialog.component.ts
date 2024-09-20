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
import { MatInput } from "@angular/material/input";
import { TitleCasePipe } from "@angular/common";
import { Option } from "../../../shared/interfaces/option.interface";

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
    MatIcon,
    MatInput,
    TitleCasePipe
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent {
  constructor(public dialogRef: MatDialogRef<FileUploadDialogComponent>, private _fb: FormBuilder) {
  }

  protected readonly Icons = Icons;

  isFocused = false;
  typeOptionList: Option[] = [
    { label: 'Boarding Pass', value: 'boardingPass' },
    { label: 'Picture', value: 'picture' },
    { label: 'Other', value: 'other' }
  ];
  documentForm = this._fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    content: [''],
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
          name: this.documentForm.get('name')?.value || file.name,
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

}
