import { Component, Input, Output, EventEmitter, SimpleChange } from '@angular/core';

import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

@Component({
    selector: 'search-panel',
    templateUrl: './app.searchpanel.html',
    styleUrls: ['./app.searchpanel.styl'],
    animations: [
        trigger('flyInOut', [
            state('in', style({transform: 'translateX(0)', opacity: 1})),
            state('out', style({transform: 'translateX(-100%)', opacity: 0})),
            transition('out => in', animate('300ms ease-in')),
            transition('in => out', animate('300ms ease-out'))
        ])
    ]
})
export class SearchPanel {
    private _searchSongList:Array<object> = [];

    private _isShowSearchPanel:boolean = false;

    @Input() 
    get searchSongList():Array<object> {
      return this._searchSongList;
    }
    set searchSongList(list:Array<object>) {
      if(!list) return;
      this._searchSongList = list;
    }

    @Input() 
    get isShowSearchPanel():boolean {
      return this._isShowSearchPanel;
    }
    set isShowSearchPanel(state:boolean) {
      if(state == undefined) return;
      this._isShowSearchPanel = state;
    }

    @Output() playSongHash = new EventEmitter<string>();
    @Output() closeSearchPanel = new EventEmitter<boolean>();
    @Output() sendKeyWord = new EventEmitter<string>();

    //数据发生改变时
    ngOnChanges(changes: SimpleChange) {
        
        //console.log(changes);
        if(changes['isShowSearchPanel']) {
            //console.log(this.isShowSearchPanel);
        }
    }

    getPlaySongHash(hash:string) {
        this.playSongHash.emit(hash);
        this.closePopList();
    }

    closePopList() {
        this.isShowSearchPanel = false;
        this.closeSearchPanel.emit(this.isShowSearchPanel);
    }

    searchSong(keyWord:string) {
        this.sendKeyWord.emit(keyWord);
    }
}