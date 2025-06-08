export interface MemberCareer {
  stats: StatCarrer[];
  cust_id: number;
}

export interface StatCarrer {
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
