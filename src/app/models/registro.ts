export class Registro {
  dataLeitura: string;
  horaLeitura: string;
  luminosidade: number;
  temperatura: number;
  umidadeAr: number;
  umidadeSolo: number;

  constructor(dados: {
    dataLeitura: string;
    horaLeitura: string;
    luminosidade: number;
    temperatura: number;
    umidadeAr: number;
    umidadeSolo: number;
  }) {
    this.dataLeitura = dados.dataLeitura;
    this.horaLeitura = dados.horaLeitura;
    this.luminosidade = dados.luminosidade;
    this.temperatura = dados.temperatura;
    this.umidadeAr = dados.umidadeAr;
    this.umidadeSolo = dados.umidadeSolo;
  }
}
