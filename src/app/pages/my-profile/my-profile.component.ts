import { UserService } from './../service/user.service';
import { Component } from '@angular/core';
import { IRated } from '../../interface/iRated';
import { Top3 } from '../../interface/itop3';
import { ProfilePic } from '../../interface/iProfilePic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss',
})
export class MyProfileComponent {
  pictureUrl: string = '';
  ratesNewest: IRated[] = [];
  top3: Top3[] = [];
  nickname: string = '';

  constructor(
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.nickname = params['nickname'];
    });

    this.userService.getUserRecentRating(this.nickname).subscribe({
      next: (data: IRated[]) => (this.ratesNewest = data),
      error: (err: any) => console.log(err),
    });

    this.userService.getUserTop3(this.nickname).subscribe({
      next: (data: Top3[]) => (this.top3 = data),
      error: (err: any) => console.log(err),
    });

    this.userService.getProfilPic(this.nickname).subscribe({
      next: (data: ProfilePic) => {
        if (data == null) this.router.navigate(['/Error']);
        else this.pictureUrl = data.pictureUrl;
      },
      error: (err: any) => console.log(err),
    });
  }

  editProfile(){
    this.router.navigate([`/Pages/Profile/Update/${this.nickname}`]);
  }
}
