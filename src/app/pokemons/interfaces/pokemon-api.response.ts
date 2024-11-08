export interface PokeAPIResponse {
  count: number;
  next: number;
  previous: string;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
