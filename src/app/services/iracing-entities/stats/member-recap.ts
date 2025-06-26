export interface MemberRecapRequest {
  year: number;
  stats: MemberRecap;
  cust_id: number;
  season?: number;
  success?: boolean;
}

export interface MemberRecap {
  starts: number;
  wins: number;
  top5: number;
  avg_start_position: number;
  avg_finish_position: number;
  laps: number;
  laps_led: number;
  favorite_car: {
    car_id: number;
    car_name: string;
    car_image: string;
  };
  favorite_track: {
    config_name: string;
    track_id: number;
    track_logo: string;
    track_name: string;
  };
}