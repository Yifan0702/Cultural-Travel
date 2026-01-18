export interface Museum {
  name: string;
  city: string;
  description: string;
  highlight: string;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  image?: string;
}

export interface ProvinceData {
  province: string;
  museums: Museum[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}