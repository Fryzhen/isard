import {StatCarrer} from "./member-career";

export interface MemberYearly {
  stats: StatYearly[];
  cust_id: number;
}

export interface StatYearly extends StatCarrer {
  year: number;
}
