import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { apiToken, appName, baseUrl, submissionTable } from '../constants/constants';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  constructor(private readonly router: Router, private readonly httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.getCountries();
  }

  onSubmit = ($event: MouseEvent) => {
    $event.stopPropagation();
    $event.preventDefault();
    const form = document.getElementById('form');
    const artistName = (document.getElementById('artist_name') as any).value;
    const firstName = (document.getElementById('first_name') as any).value;
    const lastName = (document.getElementById('last_name') as any).value;
    const whatAmI = (document.getElementById('what_am_i') as any).value;
    const age = Number((document.getElementById('age') as any).value);
    const termsCheckbox = (document.getElementById('terms_check_box') as any).checked;
    const gender = (document.getElementById('gender') as any).value;
    const country = (document.getElementById('country') as any).value;
    const genre = (document.getElementById('genre') as any).value;
    const tiktok = (document.getElementById('tiktok') as any).value;
    const twitter = (document.getElementById('twitter') as any).value;
    const discord = (document.getElementById('discord') as any).value;
    const instagram = (document.getElementById('instagram') as any).value;
    const email = (document.getElementById('email') as any).value;
    const confirm_email = (document.getElementById('confirm_email') as any).value;
    const phone = (document.getElementById('phone') as any).value;
    const checkbox = (document.getElementById('check_box') as any).checked;

    if (!this.isEmaildValid(email, confirm_email)) {
      return;
    }
    if (!termsCheckbox) {
      return;
    }

    const uri = `${baseUrl}/${appName}/tables/${submissionTable}/data`;
    const body = {
      fields: {
        artist_name: artistName,
        first_name: firstName,
        last_name: lastName,
        age,
        check_box: checkbox,
        gender,
        country,
        genre,
        tiktok,
        twitter,
        discord,
        instagram,
        what_am_i: whatAmI,
        email,
        phone
      }
    };

    this.httpClient.post(uri, body, {
      headers:
      {
        Authorization: `Bearer ${apiToken}`,
      }
    }).pipe(take(1)).subscribe((result: any) => {
      const userId = result?.data?.id;
      this.router.navigate(['/thankyou'], { queryParams: { id: userId } });
    });
  }

  isEmaildValid = (email, confirmEmail) => {
    return email === confirmEmail;
  }

  createCountriesDropdown = (countries) => {
    const counrySelectDropdown = document.getElementById('country');

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
      const country: any = (document.getElementById('country') as any).value = countries;
      this.createCountriesDropdown(country);
    });
  }
}
