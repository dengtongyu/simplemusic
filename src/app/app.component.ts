import { Component } from '@angular/core';

import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent {
  private _music:any;//audio实例
  
  private _resData:object;//歌曲数据

  private _defaultImg:string = 'http://node.dengtongyu.com/res/images/default/default_img_600.png';

  //_searchSongList:Array<object>;//搜索歌曲列表
  
  isPlay:boolean = false;//播放状态
  
  musicUrl:string = this._defaultImg;//歌曲媒体链接

  discImgUrl:string;//歌曲图片

  lyrics:string;//歌词

  songName:string;//歌曲名

  singer:string;//歌手

  currentTime:number;//歌曲当前播放时间

  totalTime:number;//歌曲总时间

  searchSongList:Array<object>;//搜索歌曲列表

  isShowSearchPanel:boolean = false;//是否显示搜索版面

  hash:string = '';//歌曲hash

  constructor(private http: HttpClient) {}

  //视图初始化时
  ngOnInit() {
    this.initView();
  }

  initView() {
    this.isPlay = false;
    //this.musicUrl = '';
    this.discImgUrl = '';
    this.lyrics = '';
    this.songName = '';
    this.singer = '';
    this.currentTime = 0;
    this.totalTime = 0;
    this.hash = '';
    // if(this._music) {
    //   this._music.
    // }
    this._music = document.querySelector('#music');
  }

  updateData() {
    this.discImgUrl = this._resData['img'];

    this.musicUrl = this._resData['play_url'];

    this.lyrics = this._resData['lyrics'];
    
    this._music.load();

    this.songName = this._resData['song_name'];
    this.singer = this._resData['author_name'];

    this.hash = this._resData['hash'];

    this.setMediaTime();

  }

  onCanPlay(event) {
    console.log('可以播放了');
    this.setPalayStatus(true);
  }

  onTimeUpdate(event) {
    if(this.isPlay) {
      this.setMediaTime();
    }
  }

  setPalayStatus(playStatus:boolean) {
    this.isPlay = playStatus;
    
    console.log('现在的播放状态：'+this.isPlay)
    if(this.isPlay) {
      this.audioPlay();
    }else {
      this.audioPause()
    }
  }

  setplaySongHash(hash:string) {
    if(this._music) this._music.pause();
    this.initView();
    this.getPlaySong(hash);
  }

  closeSearchPanel(state:boolean) {
    this.isShowSearchPanel = state;
  }

  getSearchKeyWord(keyWord:string) {
    this.getSongList(keyWord);
  }

  //设置当前播放时间
  setMediaTime() {
    if(this._music.currentTime > 0) {
      //播完
      if(this._music.currentTime == this._music.duration) {
        this.isPlay = false;
      }else {
        this.currentTime = this._music.currentTime,
        this.totalTime = this._music.currentTime != 0?this._music.duration:0
      }
    }
  }

  //搜索结果列表
   getSongList(keyword) {
    let url:string = 'http://songsearch.kugou.com/song_search_v2?keyword='+keyword+'&page=1&pagesize=30&userid=-1&clientver=&platform=WebFilter&tag=em&filter=2&iscorrection=1&privilege_filter=0&_='+Date.now();
    this.http.jsonp(url,'callback').subscribe(data => {
      //console.log(data);
      if(data['status'] == 1 && data['data'].lists.length > 0) {
        this.searchSongList = data['data'].lists;
      }
    });
    
  }

  //获取歌曲信息
  getPlaySong(hash) {
    let url:string = '/data/songMsg?hash=' + hash;
    this.http.get(url).subscribe(data => {
      if(data['result']) {
        this._resData = data['data'];

        this.updateData();
      }
    });
  }

  showPopList() {
    this.isShowSearchPanel = true;
  } 

  isWeixin(){ 
    let ua = navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i)) { 
      return true; 
    } else { 
      return false; 
    } 
  }

  audioPlay() {
    let audio = this._music;
    if(this.isWeixin()) {
      
      document.addEventListener("WeixinJSBridgeReady", function () {
        console.log('hhhh')
        audio.play();
      }, false);
    }else{
      audio.load();
      audio.play();
    }
  }

  audioPause() {
    let audio = this._music;
    if(this.isWeixin()) {
      document.addEventListener("WeixinJSBridgeReady", function () {
        audio.pause();
      }, false);
    }else{
      audio.pause();
    }
  }

}
