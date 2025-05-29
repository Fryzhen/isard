import {Helmet} from './Helmet';
import {License} from './License';
import {Suit} from './Suit';
import {Account} from './Account';

export interface Driver {
  cust_id: number,
  display_name: string,
  helmet: Helmet,
}

export interface IMember extends Driver {
  last_login: Date,
  member_since: Date,
  club_id: number,
  club_name: string,
  ai?: boolean,
}

export interface Member extends IMember {
  licenses?: License[],
}

export interface PersonnalMember extends IMember {
  first_name: string,
  last_name: string,
  on_car_name: string,
  read_tc: string,
  read_pp: string,
  read_comp_rules: string,
  flags: number,
  connection_type: string,
  download_server: string,
  dev: boolean,
  alpha_tester: boolean,
  rain_tester: boolean,
  broadcaster: boolean,
  has_read_comp_rules: boolean
  has_read_nda: boolean
  flags_hex: string,
  hundred_pct_club: boolean,
  twenty_pct_discount: boolean,
  last_season: number,
  has_additional_content: boolean,
  has_read_tc: boolean,
  has_read_pp: boolean,
  licenses: {
    oval: License,
    sports_car: License,
    formula_car: License,
    dirt_oval: License,
    dirt_road: License,
  },
  account: Account,
  suit: Suit,
  country_code?: string,
  country?: string,
}
