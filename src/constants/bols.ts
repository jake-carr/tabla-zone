export interface Bol {
  name: string;
  audioPath: string;
}

export const Dha = { name: "Dha", audioPath: "sounds/dha.mp3" };
export const Dhin = { name: "Dhin", audioPath: "sounds/dhin.mp3" };
export const Ta = { name: "Ta", audioPath: "sounds/ta.wav" };
export const Tin = { name: "Tin", audioPath: "sounds/tin.wav" };
export const Na = { name: "Na", audioPath: "sounds/na.wav" };
export const Te = { name: "Te", audioPath: "sounds/te.wav" };
export const Ke = { name: "Ke", audioPath: "sounds/ke.wav" };

export const bols: Bol[] = [Dha, Dhin, Ta, Tin, Na, Te, Ke];
