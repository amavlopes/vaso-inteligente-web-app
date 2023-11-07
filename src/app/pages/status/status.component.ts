import { Component, OnInit } from '@angular/core';
import { RegistroLuminosidade } from 'src/app/models/registro-luminosidade';
import { Status } from 'src/app/models/status';

import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  private readonly incidenciaSolarMinima = 7000;
  private readonly incidenciaSolarMaxima = 25000;
  private readonly tempoDaLeitura = 1;

  public status!: Status;
  public horasExposicaoIdeal!: number;
  public horasExposicaoNaoPermitida!: number;

  constructor(private statusService: StatusService) {
    this.status = new Status({});
  }

  ngOnInit(): void {
    this.statusService.observarLeituraDosSensores();
    this.observarRegistrosLuminosidade();
    this.observarTemperatura();
    this.observarUmidadeAr();
    this.observarUmidadeSolo();
  }

  observarRegistrosLuminosidade(): void {
    this.statusService.registrosLuminosidade.subscribe(registroLuminosidade => {
      this.status.registrosLuminosidade = registroLuminosidade;
      this.horasExposicaoIdeal = this.calcularHorasDeExposicaoSolarIdeal(registroLuminosidade);
      this.horasExposicaoNaoPermitida = this.calcularHorasDeExposicaoSolarNaoPermitida(registroLuminosidade);
    });
  }

  calcularHorasDeExposicaoSolarIdeal(registros: RegistroLuminosidade[]): number {
    const registrosExposicaoSolar = registros.filter(
      (registro: RegistroLuminosidade) =>
        registro.valorLeitura && (registro.valorLeitura > this.incidenciaSolarMinima && registro.valorLeitura < this.incidenciaSolarMaxima)
    );
    return ((registrosExposicaoSolar.length * this.tempoDaLeitura/3600));
  }

  calcularHorasDeExposicaoSolarNaoPermitida(registros: RegistroLuminosidade[]): number {
    const registrosExposicaoSolar = registros.filter(
      (registro: RegistroLuminosidade) =>
        registro.valorLeitura && registro.valorLeitura >= this.incidenciaSolarMaxima
    );
    return ((registrosExposicaoSolar.length * this.tempoDaLeitura/3600));
  }


  observarTemperatura(): void {
    this.statusService.temperatura.subscribe(temperatura => this.status.temperatura = temperatura);
  }

  observarUmidadeAr(): void {
    this.statusService.umidadeAr.subscribe(umidadeAr => this.status.umidadeAr = umidadeAr);
  }

  observarUmidadeSolo(): void {
    this.statusService.umidadeSolo.subscribe(umidadeSolo => this.status.umidadeSolo = umidadeSolo);
  }

  mostrarMensagemHorasExposicao(): string {
    let mensagem = '';
    if (this.horasExposicaoIdeal && this.horasExposicaoIdeal < 2) {
      mensagem = 'Ainda não recebi a dose diária mínima de luz solar (2h a 4h por dia).';
    } else if (this.horasExposicaoNaoPermitida && this.horasExposicaoNaoPermitida >= 2) {
      mensagem = `Cuidado! Não posso receber luz solar direta fora dos horários permitidos, antes das 10h e após às 16h.`;
    }
    return mensagem;
  }

  mostrarMensagemTemperatura(): string {
    let mensagem = '';
    if (this.status.temperatura && this.status.temperatura > 26) {
      mensagem = 'Está fazendo calor, não está?';
    } else if (this.status.temperatura && this.status.temperatura < 20) {
      mensagem = 'Que friozinho gostoso!';
    }
    return mensagem;
  }

  mostrarMensagemUmidadeSolo(): string {
    return (this.status.umidadeSolo && this.status.umidadeSolo < 30) ? 'Estou com sede!' : '';
  }

  statusMensagemUmidadeSolo(): string {
    let mensagem;
    if (this.status.umidadeSolo! > 65) {
      mensagem = 'Umidade alta';
    } else if (this.status.umidadeSolo! <= 65 && this.status.umidadeSolo! >= 30) {
      mensagem = 'Umidade média';
    } else {
      mensagem = 'Umidade baixa';
    }
    return mensagem;
  }

}
