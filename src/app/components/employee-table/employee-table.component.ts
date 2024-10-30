import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from '../../employee.model';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  encapsulation: ViewEncapsulation.None // Disable style encapsulation
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'email', 'salary', 'address', 'contactNumber', 'actions'];
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>([]);
  pageSize: number = 10;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService, public dialog: MatDialog, private elRef: ElementRef) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.applySortingStyles();
  }

  // Apply custom styles to sort headers
  applySortingStyles(): void {
    const sortHeaders = this.elRef.nativeElement.querySelectorAll('.mat-sort-header-arrow');

    sortHeaders.forEach((header: any) => {
      header.style.color = 'white'; // Default color
      header.addEventListener('click', () => {
        if (header.parentElement.classList.contains('mat-sort-header-sorted')) {
          header.style.color = 'green'; // Green when sorted
        } else {
          header.style.color = 'white'; // Revert to white
        }
      });
    });
  }

  // Apply filter to table
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Open dialog to add employee
  openDialog(): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '400px',
      data: this.createEmptyEmployee()
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addEmployee(result);
      }
    });
  }

  // Add new employee to table
  addEmployee(newEmployee: Employee): void {
    const newId = this.dataSource.data.length > 0 ? Math.max(...this.dataSource.data.map(e => e.id)) + 1 : 1;
    newEmployee.id = newId;
    this.dataSource.data = [...this.dataSource.data, newEmployee];
    if (this.dataSource.paginator) {
      this.dataSource.paginator.lastPage();
    }
  }

  // Delete employee from table
  deleteEmployee(id: number): void {
    this.dataSource.data = this.dataSource.data.filter(employee => employee.id !== id);
  }

  // Create an empty employee object
  private createEmptyEmployee(): Employee {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      age: 0,
      email: '',
      salary: '',
      address: '',
      contactNumber: '',
      dob: null,
      imageUrl: ''
    };
  }
}
