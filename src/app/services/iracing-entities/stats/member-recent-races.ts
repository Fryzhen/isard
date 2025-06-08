import {Helmet, Livery, Track} from "../common";

export interface MemberRecentRaces {
  races: RecentRace[];
  cust_id: number;
}

export interface RecentRace {
  season_id: number;
  series_id: number;
  series_name: string;
  car_id: number;
  car_class_id: number;
  livery: Livery;
  license_level: number;
  session_start_time: Date;
  winner_group_id: number;
  winner_name: string;
  winner_helmet: Helmet;
  winner_license_level: number;
  start_position: number;
  finish_position: number;
  qualifying_time: number;
  laps: number;
  laps_led: number;
  incidents: number;
  club_points: number;
  points: number;
  strength_of_field: number;
  subsession_id: number;
  old_sub_level: number;
  new_sub_level: number;
  oldi_rating: number;
  newi_rating: number;
  track: Pick<Track, "track_id" | "track_name">;
  drop_race: boolean;
  season_year: number;
  season_quarter: number;
  race_week_num: number;
}
