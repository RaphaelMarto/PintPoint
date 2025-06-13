import { UserUpdate } from '../../../../interface/iUserUpdate';
import { CountryService } from '../../../service/country.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { City } from '../../../../interface/iCity';
import { UserService } from '../../../service/user.service';
import { fUpdateProfileForm } from '../../../../models/fUpdateProfil';
import { fUpdateAddressForm } from '../../../../models/fUpdateAddressForm';
import { UserProfile } from '../../../../interface/iUserProfile';
import { ActivatedRoute } from '@angular/router';
import { UserAdress } from '../../../../interface/iUserAddress';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  addressForm: FormGroup;
  cities: City[] = [];
  today = new Date();
  isUserInfoEditable = false;
  isAddressInfoEditable = false;
  nickname: string = '';
  userProfile! : UserProfile;

  constructor(
    private userService: UserService,
    private countryService: CountryService,
    private activeRoute: ActivatedRoute,
  ) {
    this.profileForm = fUpdateProfileForm();
    this.addressForm = fUpdateAddressForm();
    this.activeRoute.params.subscribe((params) => {
      this.nickname = params['nickname'];
    });

  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadCities();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile(this.nickname).subscribe({
      next: (data: UserProfile) => {
        this.profileForm.patchValue(data.userProfile); 
        this.addressForm.patchValue(data.userAddress);
        this.profileForm.get('dateOfBirth')?.setValue(new Date(data.userProfile.dateOfBirth));
        this.userProfile = data; // Store the user profile data
      },
      error: (err: any) => console.error(err),
    });
  }

  loadCities(): void {
    this.countryService.getCity().subscribe({
      next: (data: City[]) => (this.cities = data),
      error: (err: any) => console.error(err),
    });
  }

  toggleEdit(section: string): void {
    if (section === 'userInfo') {
      this.isUserInfoEditable = !this.isUserInfoEditable;
      if (this.isUserInfoEditable) {
        this.profileForm.enable();
      } else {
        this.cancelEdit(section);
      }
    } else if (section === 'addressInfo') {
      this.isAddressInfoEditable = !this.isAddressInfoEditable;
      if (this.isAddressInfoEditable) {
        this.addressForm.enable();
      } else {
        this.cancelEdit(section);
      }
    }
  }

  onSubmitUserUpdate(): void {
    if (this.profileForm.valid) {
      const selectedDateString: string | null = this.profileForm.get(
        'dateOfBirth'
      )?.value as string;

      if (selectedDateString) {
        const selectedDate: Date = new Date(selectedDateString);
        const formattedDate: string = selectedDate.toISOString();
        this.profileForm.get('dateOfBirth')?.setValue(formattedDate);
      }

      let data: UserUpdate = this.profileForm.value;

      this.userService.updateUserProfile(data, this.nickname).subscribe({
        next: () => this.loadUserProfile(),
        error: (err: any) => console.error('Error updating profile:', err),
      });
    }
  }

  onSubmitUserAddress(): void {
    if (this.addressForm.valid) {
      let data: UserAdress = this.addressForm.value;
      data.addressId = this.userProfile.userAddress.addressId;
      this.userService.updateUserAddress(data).subscribe({
        next: () => this.loadUserProfile(),
        error: (err: any) => console.error('Error updating address:', err),
      });
    }
  }

  confirmEdit(section: string): void {
    if (section === 'userInfo') {
      // Save user info changes
      if (this.profileForm.valid) {
        this.onSubmitUserUpdate();
        this.isUserInfoEditable = false;
        this.profileForm.disable();
      }
    } else if (section === 'addressInfo') {
      // Save address info changes
      if (this.addressForm.valid) {
        this.onSubmitUserAddress();
        this.isAddressInfoEditable = false;
        this.addressForm.disable();
      }
    }
  }
  
  cancelEdit(section: string): void {
    if (section === 'userInfo') {
      // Reset user info form and disable editing
      this.profileForm.reset();
      this.profileForm.patchValue(this.userProfile.userProfile);
      this.profileForm.get('dateOfBirth')?.setValue(new Date(this.userProfile.userProfile.dateOfBirth));
      this.isUserInfoEditable = false;
      this.profileForm.disable();
    } else if (section === 'addressInfo') {
      // Reset address info form and disable editing
      this.addressForm.reset();
      this.addressForm.patchValue(this.userProfile.userAddress);
      this.isAddressInfoEditable = false;
      this.addressForm.disable();
    }
  }
}