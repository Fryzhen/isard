import {Member} from './Member';

export interface Profile {
  cust_id: number,
  is_generic_image: boolean,
  disabled: boolean,
  success: boolean,
  member_info: Member,
  follow_counts: {
    followers: number,
    follows: number,
  }
  recent_events: Event[],
}
