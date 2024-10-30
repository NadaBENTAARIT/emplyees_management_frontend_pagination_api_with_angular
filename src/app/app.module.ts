import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'; // Importer MatDialogModule

import { AppComponent } from './app.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EmployeeDialogComponent } from './components/employee-dialog/employee-dialog.component'; // Importer EmployeeDialogComponent

@NgModule({
  declarations: [
    AppComponent,
    EmployeeTableComponent,
    EmployeeDialogComponent // Déclarer EmployeeDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule  // Ajouter MatDialogModule ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
