import { Component, Input, SimpleChange, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'control-bar',
  templateUrl: './app.controlbar.html',
  styleUrls: ['./app.controlbar.styl']
})
export class ControlBar {
    private _currentTime:number = 0;
    private _totalTime:number = 0;
    private _songName:string = '未知';
    private _singer:string = '未知';
    private _isPlay:boolean = false;
    private _hash:string = '';
    proBarWidth:string = '0%';
    
    @Input() 
    get songName():string {
        return this._songName;
    }
    set songName(name:string) {
        if(!name) {
            this._songName = '未知';
            return;
        }
        this._songName = name;
    }

    @Input() 
    get singer():string {
        return this._singer;
    }
    set singer(name:string) {
        if(!name) {
            this._singer = '未知';
            return;
        }
        this._singer = name;
    }

    @Input() 
    get totalTime():number {
        return this._totalTime;
    }
    set totalTime(time:number) {
        if(!time) {
            this._totalTime = 0;
            return;
        }
        this._totalTime = time;
    }

    @Input() 
    get currentTime():number {
        return this._currentTime;
    }
    set currentTime(time:number) {
        if(!time) {
            this._currentTime = 0;
            return;
        }
        this._currentTime = time;
    }

    @Input() 
    get isPlay():boolean {
        return this._isPlay;
    }
    set isPlay(b:boolean) {
        this._isPlay = b;
    }

    @Input() 
    get hash():string {
        return this._hash;
    }
    set hash(h:string) {
        if(!h) {
            this._hash = '';
            return;
        }
        this._hash = h;
    }

    @Output() playStatus = new EventEmitter<boolean>();

    songAndSinger():string {
        return this.songName + '-' + this.singer;
    }

    clickPlayBtn() {
        //console.log(this.hash)
        if(this.hash == '') return;
        this.isPlay = !this.isPlay;
        this.playStatus.emit(this.isPlay);
    }

    //数据发生改变时
    ngOnChanges(changes: SimpleChange) {
        
        //console.log(changes);
        if(changes['hash']) {
            //this.proBarWidth = 0;
        }
        if(changes['currentTime']) {
            if(this.currentTime == 0) {
                this.proBarWidth = 0 + '%';
                return ;
            }
            this.proBarWidth = this.currentTime/this.totalTime*100 + '%';
        }
        if(changes['totalTime']) {
            
        }
    }
    
    //视图初始化时
    ngOnInit() {
        
        //this.updateMusicData();
        
    }

    //private updateMusicData() {
    //     if(this._songName) {
    //         if(this._musicData['song'] && this._musicData['song'] != '' && this.songName != this._musicData['song']) {
    //             this.songName = this._musicData['song'];
                
    //         }
    //         if(this._musicData['singer'] && this._musicData['singer'] != '' && this.singer != this._musicData['singer']) {
    //             this.singer = this._musicData['singer'];
    //         }
    //     }
    // }

}
