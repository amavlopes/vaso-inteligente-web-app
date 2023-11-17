import { Component, OnInit } from '@angular/core';
import { Registro } from 'src/app/models/registro';
import { Status } from 'src/app/models/status';
import { Constants } from 'src/app/constants';

import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  private readonly incidenciaSolarMinima = 7000;
  private readonly incidenciaSolarMaxima = 25000;
  private readonly tempoDaLeitura = 30;

  public dataAtual!: Date;
  public registrosDoDia!: Registro[];
  public status!: Status;
  public horasExposicaoIdeal!: number;
  public horasExposicaoNaoPermitida!: number;

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.statusService.observarLeituraDosSensores();
    this.observarRegistros();
  }

  observarRegistros(): void {
    this.statusService.registros.subscribe((registros: Registro[]) => {
      this.dataAtual = new Date();
      const dataDepara = `${new Date().getFullYear()}-${(new Date().getMonth()) + 1}-${new Date().getDate()}`;
      this.registrosDoDia = registros.filter((registro: Registro) => registro.dataLeitura === dataDepara);

      if(this.registrosDoDia.length) {
        this.status = new Status();
        this.status.temperatura = this.registrosDoDia[this.registrosDoDia.length - 1].temperatura;
        this.status.umidadeAr = this.registrosDoDia[this.registrosDoDia.length - 1].umidadeAr;
        this.status.umidadeSolo = this.registrosDoDia[this.registrosDoDia.length - 1].umidadeSolo;
        this.status.registrosLuminosidade = this.registrosDoDia.map((registro: Registro) => registro.luminosidade);

        this.horasExposicaoIdeal = this.calcularHorasDeExposicaoSolarIdeal(this.status.registrosLuminosidade);
        this.horasExposicaoNaoPermitida = this.calcularHorasDeExposicaoSolarNaoPermitida(this.status.registrosLuminosidade);
      }
    });
  }

  calcularHorasDeExposicaoSolarIdeal(registrosLuminosidade: number[]): number {
    const registrosExposicaoSolar = registrosLuminosidade.filter(
      (luminosidade: number) =>
        luminosidade && (luminosidade > this.incidenciaSolarMinima && luminosidade < this.incidenciaSolarMaxima)
    );
    return ((registrosExposicaoSolar.length * this.tempoDaLeitura/3600));
  }

  calcularHorasDeExposicaoSolarNaoPermitida(registrosLuminosidade: number[]): number {
    const registrosExposicaoSolar = registrosLuminosidade.filter(
      (luminosidade: number) =>
        luminosidade && luminosidade >= this.incidenciaSolarMaxima
    );
    return ((registrosExposicaoSolar.length * this.tempoDaLeitura/3600));
  }

  mostrarMensagemHorasExposicao(): string {
    let mensagem = '';
    if (this.horasExposicaoIdeal && this.horasExposicaoIdeal < 2) {
      mensagem = Constants.mensagens.doseDiariaMinimaNaoRecebida;
    } else if (this.horasExposicaoNaoPermitida && this.horasExposicaoNaoPermitida >= 2) {
      mensagem = Constants.mensagens.luzSolarDiretaNaoPermitido;
    }
    return mensagem;
  }

  mostrarMensagemTemperatura(): string {
    if(!this.status) return '';

    let mensagem = '';
    if (this.status && this.status.temperatura && this.status.temperatura > 26) {
      mensagem = Constants.mensagens.estaFazendoCalor;
    } else if (this.status && this.status.temperatura && this.status.temperatura < 20) {
      mensagem = Constants.mensagens.estaFazendoFrio;
    }
    return mensagem;
  }

  mostrarMensagemUmidadeSolo(): string {
    return (this.status && this.status.umidadeSolo && this.status.umidadeSolo < 30) ? Constants.mensagens.estouComSede : Constants.campoVazio;
  }

  statusMensagemUmidadeSolo(): string {
    if(!this.status) return '';

    let mensagem;
    if (this.status.umidadeSolo! > 65) {
      mensagem = Constants.mensagens.umidadeAlta;
    } else if (this.status.umidadeSolo! <= 65 && this.status.umidadeSolo! >= 30) {
      mensagem = Constants.mensagens.umidadeMedia;
    } else {
      mensagem = Constants.mensagens.umidadeBaixa;
    }
    return mensagem;
  }

}
