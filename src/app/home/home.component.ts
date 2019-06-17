import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import {MapService} from '../shared/map.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {AddOpinionComponent} from '../add-opinion/add-opinion.component';
import {PoiDetails} from '../models/PoiDetails.model';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  UserName: {};
  showDetails =  false;
  showPoiList =  false;
  currentOpen: number = 0;
  poiList: any;
  openPoi: PoiDetails = {};
  imageSrcs = [];
  cords: { lat: number, long: number} = {lat: 51.7687323, long: 19.4569911};
  public constructor(private sanitizer: DomSanitizer, private router: Router, private userService: UserService, private mapService: MapService, public dialog: MatDialog) {
  }
  ngOnInit() {
    this.UserName = localStorage.getItem('userName');
    this.mapService.getPoiList().subscribe((data: any) => {
      this.poiList = data.response;
    });
  }

  ShowHideProfileDetails() {
    this.showDetails = !this.showDetails;
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
  addOpinion() {
    this.openModal();
  }
  saveOpinion(result) {
    console.log('save');
    const opinion = {placeId: this.currentOpen, rating: result.mark, comment: result.description};
    this.mapService.addOpinion(opinion).subscribe((data: any) => {
      console.log(data);
      this.mapService.getPoiDetails(this.currentOpen).subscribe((res: any) => {
        this.openPoi = res.response;
      });
    });
  }

  openModal() {
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
        this.saveOpinion(result);
      }
    });
  }

  getPoiDetails(placeId) {
    if(this.currentOpen !== placeId){
      this.openPoi = {};
      this.imageSrcs = [];
      this.currentOpen = placeId;
      this.mapService.getPoiDetails(placeId).subscribe((data: any) => {
        this.openPoi = data.response;
        this.openPoi.opinions.forEach(opinion => {
          opinion.commentScore = 0;
        })
        this.cords = {lat: this.openPoi.latitude, long: this.openPoi.longitude};
        data.response.images.forEach(image => {
          this.mapService.getImage(image).subscribe((im: any) => {
          this.createImageFromBlob(im);
          });
        });
      });

    }
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageSrcs.push(reader.result);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  sort(type) {
    this.mapService.getPoiList().subscribe((data: any) => {
      if (type === 'name') {
      this.poiList = data.response.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (type === 'rating') {
      this.poiList = data.response.sort((a, b) => b.rating - a.rating);
      }
      if (type === 'category') {
        this.poiList = data.response.sort((a, b) => a.place_type.name.localeCompare(b.place_type.name));
      }
    });
  }

  myCommentAnswer(comment) {
    if (comment.commentMyAnswer === undefined) {
      comment.commentMyAnswer = 0;
    }

    return comment.commentMyAnswer;
  }

  scoreComment(comment, value) {
    if (this.myCommentAnswer(comment) === 0) {
      comment.commentScore += value;
    } else if (this.myCommentAnswer(comment) === -value) {
      comment.commentScore += 2 * value;
    }
    comment.commentMyAnswer = value;
  }
}
