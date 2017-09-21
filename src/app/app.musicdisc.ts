import { Component, Input, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'music-disc',
  templateUrl: './app.musicdisc.html',
  styleUrls: ['./app.musicdisc.styl']
})
export class MusicDisc {
  private _defaultImg:string = 'http://node.dengtongyu.com/res/images/default/default_img_600.png';
  private _songImg:string = this._defaultImg;//歌曲图片
  private _isPlay:boolean = false;//是否在播放;
  private _lyrics:string;
  private _currentTime:number = 0;
  lyricsList:Array<any> = [];
  lightRowIndex:number = 0;//高亮行数
  scollIndex:number = 0;//滚动隐藏的行数
  ph:number = 0;//每行的高度
  rowDom:any;
  rotateString:string = 'stop';
  
  @Input() 
  get songImg():string {
    return this._songImg;
  }
  set songImg(url:string) {
    if(url == this._songImg) return;
    if(url == '') {
      this._songImg = this._defaultImg;
    }else{
      this._songImg = url;
    }
  }

  @Input() 
  get isPlay():boolean {
    return this._isPlay;
  }
  set isPlay(status:boolean) {
    if(status == undefined) return;
    this._isPlay = status;
  }

  @Input() 
  get lyrics():string {
    return this._lyrics;
  }
  set lyrics(text:string) {
    if(!text) {
      this._lyrics = '';
      return;
    }
    this._lyrics = text;
  }

  @Input() 
  get currentTime():number {
    return this._currentTime;
  }
  set currentTime(time:number) {
    this._currentTime = time;

    if(this._currentTime == 0) {
      this.initView();
    }else{
      if(this.rotateString == 'stop') {
        this.rotateString = 'rotate';
      }
    }
  }
  
  bgImgStr():string{
    return 'url('+this.songImg+')';
  }


  ngOnChanges(changes: SimpleChange) {
    //console.log(changes);
    if(changes['lyrics']) {
      if(!this.lyrics) {
        this.lyricsList = [];
        return;
      }
      this.lyricsList = this.parseLyric(this.lyrics);
    }
    
    if(changes['currentTime']) {
      this.positionLyric();
    }
  }

  ngOnInit() {
    this.rowDom = document.querySelector('#lyrics-scroll');
    //console.log(this.rowDom);
    this.ph = this.getRowheight();
  }

  initView() {
    this.lightRowIndex = 0;
    this.scollIndex = 0;
    this.ph = 0;
    this.rotateString = 'stop';
  }

  positionLyric() {
    //遍历所有歌词，看哪句歌词的时间与当然时间吻合
    let indexArr:Array<number> = [];
    for (let i = 0; i < this.lyricsList.length; i++) {
        /*是否匹配当前播放的时间*/
        if (this.currentTime  > this.lyricsList[i][0]) {
          indexArr.push(i);
        };
    };
    //设置高亮行数
    if(indexArr.length > this.lightRowIndex) {
      this.lightRowIndex = indexArr[indexArr.length-1];
      this.scollIndex =  (this.lightRowIndex - 2 > 0) ? this.lightRowIndex - 2 : 0;
      if(this.ph != this.getRowheight()) {
        this.ph = this.getRowheight();
      }
    }
  }

  scollUpSize():string {
    return 'translateY('+(- this.scollIndex * this.ph)+'px)';
  }

  getRowheight():number {
    if(this.rowDom.querySelector('p')) {
      return this.rowDom.querySelector('p').clientHeight;
    }
    return 0;
  }

  parseLyric(text):Array<any> {
    //将文本分隔成一行一行，存入数组
    let lines = text.split('\n'),
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
        pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        //保存最终结果的数组
        result = [];
    //去掉不含时间的行
    while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
    };
    //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop();
    lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
        //提取出时间[xx:xx.xx]
        var time = v.match(pattern),
            //提取歌词
            value = v.replace(pattern, '');
        //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
        time.forEach(function(v1, i1, a1) {
            //去掉时间里的中括号得到xx:xx.xx
            var t = v1.slice(1, -1).split(':');
            //将结果压入最终数组
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
    });
    //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function(a, b) {
        return a[0] - b[0];
    });
    return result;
  }

}
