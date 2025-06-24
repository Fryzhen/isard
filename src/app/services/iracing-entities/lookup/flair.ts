export interface RequestFlairs {
  success: boolean;
  flairs: Flair[];
}

export interface Flair {
  flair_id: number;
  flair_name: string;
  flair_shortname: string;
  country_code: string;
  seq: number;
}