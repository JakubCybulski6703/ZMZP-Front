export class PoiDetails {
  id?: number;
  name?: string;
  address?: string;
  description?: string;
  conveniences?: [{id: number, name: string}] ;
  images?: [File];
  latitude?: number;
  longitude?: number;
  number_of_opinions?: number;
  opinions?: [{
    date: number,
    id: number,
    opinion: string,
    user_id: number,
    user_login: string,
    user_name: string
  }];
  place_type?: {id: number, name: string} ;
  rating?: number;
}
