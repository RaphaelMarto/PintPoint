import { Component, Input } from '@angular/core';
import { IUser } from '../../../../interface/iUser';
import { RatingService } from '../../../service/rating.service';

@Component({
  selector: 'app-users-rating',
  templateUrl: './users-rating.component.html',
  styleUrl: './users-rating.component.scss',
})
export class UsersRatingComponent {
  @Input() liked: boolean = false;
  @Input() nbLikes: number = 666;
  @Input() comment: string = '';
  @Input() idUser: number = 0;
  @Input() rating: number = 0;
  @Input() dateComment: string = "";
  @Input() id: number = 0;
  @Input() nickName: string = "";
  @Input() pictureUrl: string = "";
  @Input() index: number = 0;

  constructor(private ratingService: RatingService) {}

  counterArray(n: number): any[] {
    return Array(n);
  }

  LikeDislike(): void {
    this.ratingService.postLikeDislike(1, !this.liked, this.id).subscribe({
      next: (data: boolean) => (this.liked = !this.liked),
      error: (err: any) => console.log(err),
    });
  }
}
