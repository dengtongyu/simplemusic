import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'htmlencode'})
export class HtmlEncode implements PipeTransform {
  transform(text: string): string {
    let temp = document.createElement("div"); 
    temp.innerHTML = text; 
    let output = temp.innerText || temp.textContent; 
    temp = null; 
    return output;
    
  }
}