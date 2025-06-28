import {AllowedLicense} from "../common";

export interface Series {
  allowed_licenses: AllowedLicense[];
  category: string;
  category_id: number;
  eligible: boolean;
  first_season: {
    season_year: number;
    season_quarter: number;
  }
  forum_url: string;
  max_starters: number;
  min_starters: number;
  oval_caution_type: number;
  road_caution_type: number;
  series_id: number;
  series_name: string;
  series_short_name: string;
}