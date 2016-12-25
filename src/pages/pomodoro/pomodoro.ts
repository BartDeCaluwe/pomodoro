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
  minutes: any = "25";
  seconds: any = "00";

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
        this.minutesSeconds(this.timeForTimer);
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

  resumePomodoro(time) {
    this.paused = false;
    this.timeForTimer = time;
    this.timer = setInterval(() => {
      if (this.timeForTimer != 0) {
        this.timeForTimer -= 1;
        this.minutesSeconds(this.timeForTimer);        
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  stopPomodoro() {
    this.started = false;
    this.paused = false;
    this.timeForTimer = 0;
    this.minutes = "25";
    this.seconds = "00";
    clearInterval(this.timer);
  }

  minutesSeconds(seconds) {
    if (seconds >= 60) {
      this.minutes = Math.floor(seconds / 60);
    } else {
      this.minutes = 0;
    }
    this.seconds = seconds % 60;
    if(this.seconds < 10){
      this.seconds = "0" + this.seconds;
    }
  }
}
