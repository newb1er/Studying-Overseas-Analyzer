import { Component, OnInit } from '@angular/core';
import { CollegeDataService, outbound_college, outbound_college_detail, apiResponse, others, otherNames } from '../college-data.service';

enum detailNames{
  "Quota: ",
  "Eligibility: ",
  "Language Requirement: ",
  "Grade Requirement: ",
  "Number of Students: ",
  "Number of Students per Staff: ",
  "Internaional Students Percentage: ",
  "Percentage of Males: ",
  "Percentage of Females: ",
  "Teaching Score: ",
  "Research Score: ",
  "Citations Score: ",
  "Industry Income Score: ",
  "International Outlook Score: ",
  "Resulting Score: ",
  "Overall Rank: "
}

@Component({
  selector: 'app-college-panel',
  templateUrl: './college-panel.component.html',
  styleUrls: ['./college-panel.component.css']
})
export class CollegePanelComponent implements OnInit {
  loaded: boolean = false;
  colleges: outbound_college[] = [];
  college_details: outbound_college_detail[] = [];
  others: others[] = [];
  detailNames = detailNames;
  otherNames = otherNames;
  constructor(private collegeDataService: CollegeDataService) { }

  ngOnInit(): void {
    this.collegeDataService.getColleges()
      .subscribe((data: any) => {
        this.colleges = data.data;
        console.log(data.data);
        this.loaded = true;
      });

    this.collegeDataService.getCollegeDetails()
      .subscribe((data: apiResponse) => {
        this.college_details = data.data;
        console.log(`CollegePanelComponent: API("${data.mes}")`);
      });

    this.collegeDataService.getCollegeOthers()
      .subscribe((data: apiResponse) => {
        this.others = data.data;
        console.log(`CollegePanelComponent: API("${data.mes})`);
      });

    console.log(this.colleges);
  }

  asIfOrder(a: any, b: any) { return 0; }

}
