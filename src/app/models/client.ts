export interface Album {
    id: number;
    name: string;
    year: number;
  }
  
  export interface Band {
    id: number;
    name: string;
    genre: string;
    formed: number;
    location: string;
    members: string[];
    albums: Album[];
  }
  
  export interface BandsResponse {
    bands: Band[];
  }