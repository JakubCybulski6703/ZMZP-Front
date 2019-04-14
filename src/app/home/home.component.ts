import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import {MapService} from '../shared/map.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddOpinionComponent} from '../add-opinion/add-opinion.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userClaims: any;
  showDetails =  false;
  showPoiList =  false;
  poiList: any;
  public constructor(private router: Router, private userService: UserService, private mapService: MapService, public dialog: MatDialog) {
  }
  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
    });
    this.mapService.getPoiList().subscribe((data: any) => {
      this.poiList = data.poiList;
    });
  }

  ShowHideProfileDetails() {
    this.showDetails = !this.showDetails;
  }
  ShowHidePoiList() {
    this.showPoiList = !this.showPoiList;
    console.log(this.poiList);
  }
  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  addOpinion(index) {
    this.openModal(index);
  }
  saveOpinion(result, index) {
    console.log('save');
    this.poiList[index].comments.push({
      owner: 'user',
      creationDate: new Date(),
      mark: 0,
      description: result,
    });
  }

  openModal(index) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {top: '160px', left: '630px'};
    dialogConfig.data = {
      title: 'Dodaj Swoją opinię'
  };
    const dialogRef = this.dialog.open(AddOpinionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveOpinion(result, index);
      }
    });
  }
}
