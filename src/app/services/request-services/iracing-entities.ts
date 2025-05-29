export interface Driver {
  cust_id: number,
  display_name: string,
  helmet: Helmet,
}

export interface Member extends Driver {
  cust_id: number,
  display_name: string,
  helmet: Helmet,
  last_login: Date,
  member_since: Date,
  club_id: number,
  club_name: string,
  ai?: boolean,
  licenses?: License[],
}

export interface License {
  category_id: number,
  category: string,
  category_name: string,
  license_level: number,
  safety_rating: number,
  cpi: number,
  irating: number,
  tt_rating: number,
  mpr_num_races: number,
  color: string,
  group_name: string,
  group_id: number,
  pro_promotable: boolean,
  seq: number,
  mpr_num_tts: number
}

export interface Helmet {
  pattern: number,
  color1: string,
  color2: string,
  color3: string,
  face_type: number,
  helmet_type: number
}

