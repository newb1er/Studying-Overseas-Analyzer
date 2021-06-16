import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ViewChild, ElementRef, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, count } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserPreferenceService } from '../user-preference.service';

export interface Country {
  name: string;
}

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent {
  loaded = false;
  visable = true;
  selectable = true;
  removable = true;
  _selected = false;
  separatorKeyCodes: number[] = [ENTER, COMMA];
  optionCtrl = new FormControl();
  filteredCountries: Observable<Country[]>;
  countries!: Country[];
  selectedCountries: Country[] = [];

  @ViewChild('countryInput') countryInput!: ElementRef<HTMLInputElement>; 
  @ViewChild('auto') matAutoComplete!: MatAutocomplete;

  constructor(private userPreferenceService: UserPreferenceService) {
    this.getCountries();
    this.getUserPreferences();
    this.filteredCountries = this.optionCtrl.valueChanges.pipe(
      startWith(null),
      map((input: String | null) => input ? this._filter(input) : this.countries)
    );
  }

  getCountries(): void {
    this.userPreferenceService.getCountries()
      .subscribe((data: any) => {
        this.countries = data.data;
        console.log(this.countries);
        this.loaded = true;
      });
  }

  getUserPreferences(): void {
    this.userPreferenceService.getUserPreferences()
      .subscribe((res: any) => {
        console.log(res);
        this.selectedCountries = res.data;
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // add selection
    if (value) {
      this.selectedCountries.push({name: value});
    }

    // clear input value
    event.chipInput!.clear();

    // reset FormControl to allow input next value
    this.optionCtrl.reset(null);
  }

  remove(country: Country): void {
    const index = this.selectedCountries.indexOf(country);

    if (index >= 0) {
      // add country back to list
      this.countries.push(this.selectedCountries[index]);
      // keep list in order
      this.countries.sort((a, b) => {
        var nameA = a.name.toLowerCase();
        var nameB = b. name.toLowerCase();
        if(nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      });
      this.selectedCountries.splice(index, 1);
    }

    // reset FormControl to allow input next value
    this.optionCtrl.reset(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // remove selected from countries list
    const index = this.countries.indexOf(event.option.value);
    this.countries.splice(index, 1);

    this.selectedCountries.push(event.option.value);
    this.countryInput.nativeElement.value = '';

    // reset FormControl to allow input next value
    this.optionCtrl.reset(null);
  }

  private _filter(input: String): Country[] {
    console.log(this.optionCtrl.enabled);
    if(this.optionCtrl.touched) {
      console.log(this.optionCtrl.touched);
      return [];
    }
    console.log(input);
    const filterValue = input.toLowerCase();

    return this.countries.filter(country => country.name.toLowerCase().indexOf(filterValue) === 0)
  }
}
