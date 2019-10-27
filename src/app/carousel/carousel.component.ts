import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent implements OnInit {
  @Input() data: {}[];
  
  constructor(private router: Router) { }
  @ViewChild('imgCarousel') imgCarousel: NgbCarousel;
  ngOnInit() {
    console.log("Carousel films data", this.data);
  }


  previous(){
    this.imgCarousel.prev();
  }

  next(){
    this.imgCarousel.next();
  }

  goToCharacters(id){
    this.router.navigate(['/characters/', { id: id}]);
  }
}
