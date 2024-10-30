import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../employee.model';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,  // Reference to control the dialog
    @Inject(MAT_DIALOG_DATA) public data: Employee  // Injecting employee data into the dialog
  ) {}

  // Close the dialog without saving
  onCancel(): void {
    this.dialogRef.close();
  }

  // Handle form submission
  onSubmit(employeeForm: any): void {
    if (employeeForm.valid) {
      this.dialogRef.close(this.data);  // Close the dialog with the form data if valid
    } else {
      // Mark all fields as touched to trigger validation errors
      Object.keys(employeeForm.controls).forEach(field => {
        const control = employeeForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
