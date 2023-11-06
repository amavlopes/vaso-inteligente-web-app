import { RegistroLuminosidade } from "./registro-luminosidade";

export class Status {
  temperatura: number | null;
  umidadeAr: number | null;
  umidadeSolo: number | null;
  registrosLuminosidade: RegistroLuminosidade[];

  constructor(dados: {
    temperatura?: number;
    umidadeAr?: number;
    umidadeSolo?: number;
    registrosLuminosidade?: RegistroLuminosidade[];
  }) {
    this.temperatura = dados.temperatura ?? null;
    this.umidadeAr = dados.umidadeAr ?? null;
    this.umidadeSolo = dados.umidadeSolo ?? null;
    this.registrosLuminosidade = dados.registrosLuminosidade ?? [];
  }
}
