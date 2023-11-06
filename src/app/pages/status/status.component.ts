import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/models/status';

import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  public status!: Status;

  constructor(private statusService: StatusService) {
    this.status = new Status({});
  }

  ngOnInit(): void {
    this.statusService.observarLeituraDosSensores();

    this.statusService.registrosLuminosidade.subscribe(registroLuminosidade => this.status.registrosLuminosidade = registroLuminosidade);
    this.statusService.temperatura.subscribe(temperatura => this.status.temperatura = temperatura);
    this.statusService.umidadeAr.subscribe(umidadeAr => this.status.umidadeAr = umidadeAr);
    this.statusService.umidadeSolo.subscribe(umidadeSolo => this.status.umidadeSolo = umidadeSolo);
  }


}
