import { Component, Input, OnInit } from '@angular/core';
import { Top3 } from '../../../../interface/itop3';

@Component({
  selector: 'app-top-3',
  templateUrl: './top-3.component.html',
  styleUrl: './top-3.component.scss',
})
export class Top3Component implements OnInit {
  @Input() top3: Top3[] = [];
  displayTop3: Top3[] = [];

  ngOnInit() {
    this.initializeTop3();
  }

  private initializeTop3() {
    this.displayTop3 = Array(3)
      .fill(null)
      .map((_, index) => {
        if (this.top3[index]) {
          return this.top3[index];
        }
        return {
          name: '???',
          pictureUrl: '',
        };
      });
  }
}
