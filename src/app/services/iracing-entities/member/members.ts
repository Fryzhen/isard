import {Helmet} from "../common";

export interface Members {
  success: boolean;
  cust_ids: number[];
  members: Member[];
}

export interface Member {
  cust_id: number;
  display_name: string;
  helmet: Helmet;
  last_login: Date;
  member_since: Date;
  club_id: number;
  club_name: string;
  ai: boolean;
  licenses?: License[];
}

export interface License {
  category_id: number;
  category: string;
  category_name: string;
  license_level: number;
  safety_rating: number;
  cpi: number;
  irating: number;
  tt_rating: number;
  mpr_num_races: number;
  color: string;
  group_name: string;
  group_id: number;
  pro_promotable: boolean;
  seq: number;
  mpr_num_tts: number;
}
