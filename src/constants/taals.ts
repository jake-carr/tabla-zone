import { Bol, Dha, Dhin, Na, Ta, Tete, Tin } from "./bols";

export interface Taal {
  name: string;
  bols: Bol[];
  sequence: Bol[]; // Sequence will eventually be configurable or have multiple options
  sum: number; // 0-indexed position of the sum in the sequence
  kali: number; // 0-indexed position of the kali in the sequence
}

export const Teental: Taal = {
  name: "Teental",
  bols: [Dha, Dhin, Ta, Tin, Tete, Na],
  sequence: [
    Dha,
    Dhin,
    Dhin,
    Dha,
    Dha,
    Dhin,
    Dhin,
    Dha,
    Na,
    Tin,
    Tin,
    Ta,
    Tete,
    Dhin,
    Dhin,
    Dha,
  ],
  sum: 0,
  kali: 8,
};

export const Rupak: Taal = {
  name: "Rupak",
  bols: [Tin, Na, Dhin],
  sequence: [Tin, Tin, Na, Dhin, Na, Dhin, Na],
  sum: -1,
  kali: 0,
};

export const Jhaptaal: Taal = {
  name: "Jhaptaal",
  bols: [Dha, Dhin, Na, Dha, Dhin, Na, Dha, Dhin],
  sequence: [Dhin, Na, Dhin, Dhin, Na, Tin, Na, Dhin, Dhin, Na],
  sum: 0,
  kali: 5,
};

export const getTaalNameByNumberOfBeats = (beats: number): string => {
  switch (beats) {
    case 16:
      return Teental.name;
    case 7:
      return Rupak.name;
    case 10:
      return Jhaptaal.name;
    default:
      return "";
  }
}

export const taals: Taal[] = [Teental, Rupak, Jhaptaal];
