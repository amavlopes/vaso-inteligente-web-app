export class RegistroLuminosidade {
  dataHoraLeitura: string | null;
  valorLeitura: number | null;

  constructor(dados: {
    dataHoraLeitura?: string;
    valorLeitura?: number;
  }) {
    this.dataHoraLeitura = dados.dataHoraLeitura ?? null;
    this.valorLeitura = dados.valorLeitura ?? null;
  }
}
