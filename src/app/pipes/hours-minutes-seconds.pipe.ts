import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'hoursMinutesSeconds'})
export class HoursMinutesSecondsPipe implements PipeTransform {
    /**
     *
     * @param horasExposicao - some number
     * @returns {string} formatted number with a fixed number of digits after the decimal point
     */
    transform(horasExposicao: number): string {
      const n = new Date(0,0);
      n.setSeconds(Math.floor(horasExposicao * 60 * 60));
      const horas = Number(n.toTimeString().slice(0, 2));
      const minutos = Number(n.toTimeString().slice(3, 5));
      const segundos = Number(n.toTimeString().slice(6, 8));
      return `${horas}h${minutos}m${segundos}s`;
    }

}
