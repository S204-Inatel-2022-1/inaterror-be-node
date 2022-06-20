export type ResponseType = {
  result?: boolean;
  message?: any;
  data?: any;
  error?: any;
};

export type SightingType = {
  name: string;
  img: string;
  rarity: string;
  type: string;
  location: string;
};

export type UserType = {
  _id?: any;
  name: string;
  pass: string;
  sighting?: SightingType[];
};

export type OrbType = {
  nome: string;
  tipo: string;
  localização: string;
  raridade: string;
  id: number;
  invert: number;
};
