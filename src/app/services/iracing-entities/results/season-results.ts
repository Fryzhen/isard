import {CarClass} from "../carclass";
import {Helmet} from "../common";
import {Track} from "../common";

type ResultCarClass = Pick<CarClass, "car_class_id" | "short_name" | "name"> & {
  num_entries: number;
  strength_of_field: number
};

export interface SeasonResults {
  success: boolean;
  season_id: number;
  race_week_num: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  event_type: number;
  results_list: ResultsList[];
}

interface ResultsList {
  session_id: number;
  subsession_id: number;
  race_week_num: number;
  car_classes: ResultCarClass[];
  driver_changes: boolean;
  event_best_lap_time: number;
  event_strength_of_field: number;
  event_type: number;
  event_type_name: string;
  num_caution_laps: number;
  num_cautions: number;
  num_drivers: number;
  num_lead_changes: number;
  official_session: boolean;
  start_time: string;
  track: Pick<Track, "config_name" | "track_id" | "track_name">;
  winner_id: number;
  farm?: Farm;
  winner_helmet?: Helmet;
  winner_license_level?: number;
  winner_name?: string;
}

interface Farm {
  farm_id: number;
  display_name: string;
  image_path: string;
  displayed: boolean;
}
