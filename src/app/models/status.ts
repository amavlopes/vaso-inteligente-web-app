export class Status {
  temperatura: number | null;
  umidadeAr: number | null;
  umidadeSolo: number | null;
  registrosLuminosidade: number[] | null;

  constructor(dados?: {
    temperatura: number;
    umidadeAr: number;
    umidadeSolo: number;
    registrosLuminosidade: number[];
  }) {
    this.temperatura = dados?.temperatura ?? null;
    this.umidadeAr = dados?.umidadeAr ?? null;
    this.umidadeSolo = dados?.umidadeSolo ?? null;
    this.registrosLuminosidade = dados?.registrosLuminosidade ?? null;
  }
}
