import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { apiToken, appName, baseUrl, mainPageTable, submissionTable } from '../constants/constants';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public innerWidth: any;
  public isMobile: boolean;
  public userId: string = ' ';

  constructor(private readonly router: Router, private readonly httpClient: HttpClient) { }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 992) {
      this.isMobile = true
    } else {
      this.isMobile = false
    }
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.onResize()
    this.getCountries();
  }

  public onSubmit = ($event: MouseEvent) => {
    $event.stopPropagation();
    $event.preventDefault();
    const form = this.isMobile ? document.getElementById('regFormMobile') : document.getElementById('regForm');
    const formType: string = this.isMobile ? 'mobile' : 'desktop';

    const artistName = (document.getElementById(`artist-name-${formType}`) as any)?.value;
    const firstName = (document.getElementById(`first-name-${formType}`) as any)?.value;
    const lastName = (document.getElementById(`last-name-${formType}`) as any)?.value;
    const whatAmI = (document.getElementById(`what-am-i-${formType}`) as any)?.value;
    const age = Number((document.getElementById(`age-${formType}`) as any)?.value);
    const termsCheckbox = (document.getElementById(`terms-check-box-${formType}`) as any)?.checked; //
    const gender = (document.getElementById(`gender-${formType}`) as any)?.value;
    const country = (document.getElementById(`country-${formType}`) as any)?.value;
    const city = (document.getElementById(`city-${formType}`) as any)?.value;
    const genre = (document.getElementById(`genre-${formType}`) as any)?.value;
    const tiktok = (document.getElementById(`tiktok-${formType}`) as any)?.value;
    const twitter = (document.getElementById(`twitter-${formType}`) as any)?.value;
    const discord = (document.getElementById(`discord-${formType}`) as any)?.value;
    const instagram = (document.getElementById(`instagram-${formType}`) as any)?.value;
    const email = (document.getElementById(`email-${formType}`) as any)?.value;
    const confirm_email = (document.getElementById(`confirm-email-${formType}`) as any)?.value;
    const phone = (document.getElementById(`phone-${formType}`) as any)?.value;
    const checkbox = (document.getElementById(`check-box-${formType}`) as any)?.checked;

    if (!this.isEmaildValid(email, confirm_email)) {
      return;
    }
    if (!termsCheckbox) {
      return;
    }

    const uri = `${baseUrl}/${appName}/tables/${mainPageTable}/data`;
    const body = {
      fields: {
        artist_name: artistName,
        first_name: firstName,
        last_name: lastName,
        age: age,
        check_box: checkbox,
        gender: gender,
        country,
        city: city,
        genre: genre,
        tiktok: tiktok,
        twitter: twitter,
        discord: discord,
        instagram: instagram,
        what_am_i: whatAmI,
        email: email,
        phone: phone
      }
    };

    this.httpClient.post(uri, body, {
      headers:
      {
        Authorization: `Bearer ${apiToken}`,
      }
    }).pipe(take(1)).subscribe((result: any) => {
      const userId = result?.data?.id;
      this.userId = userId;
      if (this.isMobile) {
        this.router.navigate(['/thankyou'], { queryParams: { id: userId } });
      }
    });
  }

  isEmaildValid = (email, confirmEmail) => {
    if (!email || !confirmEmail) {
      return false;
    }
    return email === confirmEmail;
  }

  createCountriesDropdown = (countries, id) => {
    const counrySelectDropdown = document.getElementById(id);
    for (const country of countries) {
      const opt = document.createElement('option');
      opt.value = country;
      opt.text = country.charAt(0).toUpperCase() + country.slice(1);
      counrySelectDropdown.appendChild(opt);
    }
  }

  getCountries = () => {
    this.httpClient.get('https://restcountries.com/v2/all').pipe(take(1)).subscribe((res: any[]) => {
      const countries = res?.map((ctry: any) => {
        return ctry.name;
      });
      const country: any = (document.getElementById('country-desktop') as any).value = countries;
      this.createCountriesDropdown(country, 'country-desktop');
      this.createCountriesDropdown(country, 'country-mobile');
    });
  }
}
