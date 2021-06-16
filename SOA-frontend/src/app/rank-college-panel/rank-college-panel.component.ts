import { Component, OnInit } from '@angular/core';
import { CollegeDataService, rank_college, apiResponse, rank_college_detail, others, otherNames } from '../college-data.service';

enum detailNames{
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
  selector: 'app-rank-college-panel',
  templateUrl: './rank-college-panel.component.html',
  styleUrls: ['./rank-college-panel.component.css']
})
export class RankCollegePanelComponent implements OnInit {
  loaded: boolean = false;
  colleges: rank_college[] = [];
  college_details: rank_college_detail[] = [];
  others: others[] = [];
  detailNames = detailNames;
  otherNames = otherNames;

  constructor(private collegeDataService: CollegeDataService) { }

  ngOnInit(): void {
    this.collegeDataService.getRankColleges()
      .subscribe((data: apiResponse) => {
        this.colleges = data.data;
        console.log(`RankCollegePanelComponent: API("${data.mes}")`);
        this.loaded = true;
      });

    this.collegeDataService.getRankCollegesDetails()
      .subscribe((data: apiResponse) => {
        this.college_details = data.data;
        console.log(`RankCollegePanelComponent: API("${data.mes}")`);
      });

    this.collegeDataService.getRankOthers()
      .subscribe((data: apiResponse) => {
        this.others = data.data;
        console.log(`RankCollegePanelComponent: API("${data.mes}")`);
      });
  }

  asIfOrder(a: any, b: any) { return 0; }
}
