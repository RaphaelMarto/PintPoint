import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: string): string {
    const inputDate = new Date(value);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);

    if (hoursDifference < 24) {
      // Return in "hh:mm" format
      return formatDate(inputDate, 'HH:mm', 'fr-EU');
    } else {
      // Return in "dd MM yy" format
      return formatDate(inputDate, 'dd MMM yyyy', 'fr-EU');
    }
  }
}
