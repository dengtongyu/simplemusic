import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timeformat'})
export class TimeFormat implements PipeTransform {
  transform(time: number, type: string): string {
    let surplusMinite,
    surplusSecond,
    cTime;
    //将剩余秒数转化为分钟
    surplusMinite = Math.floor((time / 60) % 60);
    //将剩余秒数转化为秒钟
    surplusSecond = Math.floor(time % 60);
    if(surplusMinite < 10){
        surplusMinite = '0' + surplusMinite;
    }
    if(surplusSecond < 10){
        surplusSecond = '0' + surplusSecond;
    }
    cTime = surplusMinite + ':' + surplusSecond;

    if(type == 'cur') {
        return cTime;
    }

    if(type == 'total') {
        return ('/' + cTime);
    }
    
  }
}