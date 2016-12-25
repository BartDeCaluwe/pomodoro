import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Pomodoro page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pomodoro',
  templateUrl: 'pomodoro.html'
})
export class PomodoroPage {

  started: boolean;
  paused: boolean;
  timer: any;
  timeForTimer: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PomodoroPage');
  }

  startPomodoro(time) {
    this.started = true;
    this.paused = false;
    this.timeForTimer = time;
    this.timer = setInterval(() => {
      if (this.timeForTimer != 0) {
        this.timeForTimer -= 1;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  pausePomodoro(timeRemaining) {
    this.paused = true;
    this.timeForTimer = timeRemaining;
    clearInterval(this.timer);
  }

  resumePomodoro(time){
    this.paused = false;
    this.timeForTimer = time;
    this.timer = setInterval(() => {
      if (this.timeForTimer != 0) {
        this.timeForTimer -= 1;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  stopPomodoro() {
    this.started = false;
    this.paused = false;
    this.timeForTimer = 0;
    clearInterval(this.timer);
  }

}
