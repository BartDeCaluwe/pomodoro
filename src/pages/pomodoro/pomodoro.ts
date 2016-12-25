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

  startedPomodoro: boolean;
  pausedPomodoro: boolean;
  numberOfPomodoros: number = 0;
  numberOfPauses: number = 0;
  numberOfBreaks: number = 0;

  startedBreak: boolean;

  timer: any;
  timeForTimer: number;
  minutes: any = "00";
  seconds: any = "00";

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PomodoroPage');
  }

  startPomodoro(time) {
    this.startedPomodoro = true;
    this.pausedPomodoro = false;
    this.timeForTimer = time;
    this.timer = setInterval(() => {
      if (this.timeForTimer != 0) {
        this.timeForTimer -= 1;
        this.minutesSeconds(this.timeForTimer);
      } else {
        clearInterval(this.timer);
        this.numberOfPomodoros++;
        this.numberOfBreaks++;
        if (this.numberOfBreaks == 3) {
          this.numberOfBreaks = 0;
          this.startBreak(900);
        } else {
          this.startBreak(300);
        }
      }
    }, 1000);
  }

  startBreak(time) {
    this.startedBreak = true;
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
    this.pausedPomodoro = true;
    this.numberOfPauses++;
    this.timeForTimer = timeRemaining;
    clearInterval(this.timer);
  }

  resumePomodoro(time) {
    this.pausedPomodoro = false;
    this.timeForTimer = time;
    this.timer = setInterval(() => {
      if (this.timeForTimer != 0) {
        this.timeForTimer -= 1;
        this.minutesSeconds(this.timeForTimer);
      } else {
        clearInterval(this.timer);
        this.numberOfPomodoros++;
        this.numberOfBreaks++;
        if (this.numberOfBreaks == 3) {
          this.numberOfBreaks = 0;
          this.startBreak(900);
        } else {
          this.startBreak(300);
        }
      }
    }, 1000);
  }

  stopPomodoro() {
    this.startedPomodoro = false;
    this.pausedPomodoro = false;
    this.timeForTimer = 0;
    this.minutes = "00";
    this.seconds = "00";
    clearInterval(this.timer);
  }

  // Helper function: formats seconds into minutes and adds trailing 0's.
  minutesSeconds(seconds) {
    if (seconds >= 60) {
      this.minutes = Math.floor(seconds / 60);
      if(this.minutes < 10){
        this.minutes = "0" + this.minutes;
      }
    } else {
      this.minutes = "00";
    }
    this.seconds = seconds % 60;
    if (this.seconds < 10) {
      this.seconds = "0" + this.seconds;
    }
  }
}
