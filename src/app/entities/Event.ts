export interface Event {
  event_type: string;
  subsession_id: number;
  start_time: string;
  event_id: number;
  event_name: string;
  simsession_type: number;
  starting_position: number;
  finish_position: number;
  best_lap_time: number;
  percent_rank: number;
  car_id: number;
  car_name: string;
  logo_url: string | null;
  track: Track;
}
