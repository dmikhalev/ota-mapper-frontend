import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {User} from "../entities/user";
import {timeout} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['username', 'role', 'name', 'email', 'phone'];
  users: User[] = [];
  clickedUser: User | undefined

  constructor(private userService: UserService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  openEditUserDialog(user: User): void {
    let editedUser: User = {
      "id": user.id,
      "username": user.username,
      "password": '',
      "role": user.role,
      "name": user.name,
      "email": user.email,
      "phone": user.phone
    }
    const dialogRef = this.dialog.open(EditUserDialog, {
      width: '250px',
      data: editedUser
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialog, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.users.push(result);
      this.loadUsers();
    });
  }

  private loadUsers(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    })
  }
}

@Component({
  selector: 'edit-user-dialog',
  templateUrl: 'edit-user-dialog.html',
})
export class EditUserDialog {
  constructor(
    public dialogRef: MatDialogRef<EditUserDialog>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.userService.deleteUser(this.user.id);
    this.dialogRef.close();
  }

  onOkClick(user: User): void {
    this.userService.createOrUpdateUser(JSON.stringify(user));
    this.dialogRef.close();
  }
}


@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user-dialog.html',
})
export class AddUserDialog {

  user: User = {
    "id": -1,
    "username": '',
    "password": '',
    "role": '',
    "name": '',
    "email": '',
    "phone": ''
  }

  constructor(
    public dialogRef: MatDialogRef<EditUserDialog>,
    private userService: UserService
  ) {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }


  onAddClick(user: User): void {
    this.userService.createOrUpdateUser(JSON.stringify(user));
    this.dialogRef.close();
  }
}
