import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment.prod';

export interface outbound_college {
  country: string;
  institution: string;
  ranking: string;
}

export interface outbound_college_detail extends rank_college_detail{
  quota: string;
  eligibility: string;
  language: string;
  grade_req: string;
}

export interface rank_college {
  rank: string;
  name: string;
  country: string;
}

export interface rank_college_detail {
  num_students: number;
  num_stu_per_staff: number;
  int_stu_perc: number;
  perc_male: number;
  perc_female: number;
  score_teaching: number;
  score_research: number;
  score_citations: number;
  score_indus_income: number;
  score_int_outlook: number;
  score_res: number;
  overall_rank: number;
}

export interface others {
  total_confirmed: number;
  total_death: number;
  total_recovered: number;
  expenditure_on_food: number;
}

export enum otherNames{
  "Total Confirmed Cases: ",
  "Total Deaths: ",
  "Total Recovered Cases: ",
  "Expenditure on Food (per year): "
}

export interface apiResponse {
  error: boolean;
  data: any;
  mes: string;
}

@Injectable({
  providedIn: 'root'
})
export class CollegeDataService {
  private apiUrl: string = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  getRankColleges(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'get_rank_college');
  }

  getRankCollegesDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'get_rank_college_detail');
  }
  
  getRankOthers(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'get_rank_others');
  }

  getColleges(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'get_outbound_college');
  }

  getCollegeDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'get_outbound_college_detail');
  }

  getCollegeOthers(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'get_Outbound_others');
  }
}
