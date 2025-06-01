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

export interface Race {
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
  track: Track;
  drop_race: boolean;
  season_year: number;
  season_quarter: number;
  race_week_num: number;
}

export interface Track {
  track_id: number;
  track_name: string;
}

export interface Livery {
  car_id: number;
  pattern: number;
  color1: string;
  color2: string;
  color3: string;
}

export interface CareerStats {
  category_id: number;
  category: string;
  starts: number;
  wins: number;
  top5: number;
  poles: number;
  avg_start_position: number;
  avg_finish_position: number;
  laps: number;
  laps_led: number;
  avg_incidents: number;
  avg_points: number;
  win_percentage: number;
  top5_percentage: number;
  laps_led_percentage: number;
  total_club_points: number;
  poles_percentage: number;
}

export interface YearStats extends CareerStats {
  year: number;
}

export interface Car {
  ai_enabled: boolean;
  allow_number_colors: boolean;
  allow_number_font: boolean;
  allow_sponsor1: boolean;
  allow_sponsor2: boolean;
  allow_wheel_color: boolean;
  award_exempt: boolean;
  car_dirpath: string;
  car_id: number;
  car_make: string;
  car_model: string;
  car_name: string;
  car_name_abbreviated: string;
  car_types: CarType[];
  car_weight: number;
  categories: string[];
  created: string; // ISO 8601 date string
  first_sale: string; // ISO 8601 date string
  forum_url: string;
  free_with_subscription: boolean;
  has_headlights: boolean;
  has_multiple_dry_tire_types: boolean;
  has_rain_capable_tire_types: boolean;
  hp: number;
  is_ps_purchasable: boolean;
  max_power_adjust_pct: number;
  max_weight_penalty_kg: number;
  min_power_adjust_pct: number;
  package_id: number;
  patterns: number;
  price: number;
  price_display: string;
  rain_enabled: boolean;
  retired: boolean;
  search_filters: string;
  site_url: string;
  sku: number;
}

export interface CarType {
  car_type: string;
}
