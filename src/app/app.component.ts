import { Component, OnInit, Inject, ViewEncapsulation, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { chatSupportService } from './services/chat-support.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-support';
  

  public me = {};
  constructor(
    public dialog: MatDialog
  ){

  }
  ngOnInit(){
    
  }

  supportChart() {
    const dialogRef = this.dialog.open(ChatSupportComponent, {
      width: '700px',
      data: {},
      panelClass: 'supportChart'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}

  @Component({
    selector: 'app-chat-support',
    templateUrl: './chat-support/chat-support.component.html',
  
  })
  export class ChatSupportComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollDown') private myScrollContainer: ElementRef;
    commentsList: any;
    addComments = {
      comment: ''
    }
    constructor(
      public dialogRef: MatDialogRef<ChatSupportComponent>,
      private  chatservice : chatSupportService,
      @Inject(MAT_DIALOG_DATA) public data,
      ) { }

      ngOnInit(){
        this.getChartByUser();
    this.scrollToBottom();

      }
      ngAfterViewChecked() {
        this.scrollToBottom();
      }
      scrollToBottom(): void {
        try {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (err) { }
      }
      onNoClick(): void {
        this.dialogRef.close();
      }
      getChartByUser() {
        
        this.chatservice.getChartByUser().subscribe((res: any) => {
          console.log("response1",res)
          this.commentsList = res.data;
         
        }, error => {
         
         
        });
      }
      addComment() {
       
        this.chatservice.addComment(this.addComments).subscribe((res: any) => {
         console.log("response2",res)
          this.addComments.comment = '';
          this.getChartByUser();
        }, err => {
         
        })
      }
      timeDifference(previous) {
        var pre: Date = new Date(previous)
        var current: Date = new Date();
        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;
    
        var elapsed = current.getTime() - pre.getTime();
    
        if (elapsed < msPerMinute) {
          return Math.round(elapsed / 1000) + ' sec ago';
        }
    
        else if (elapsed < msPerHour) {
          return Math.round(elapsed / msPerMinute) + ' min ago';
        }
    
        else if (elapsed < msPerDay) {
          return Math.round(elapsed / msPerHour) + ' hours ago';
        }
    
        else if (elapsed < msPerMonth) {
          return Math.round(elapsed / msPerDay) + ' days ago';
        }
    
        else if (elapsed < msPerYear) {
          return Math.round(elapsed / msPerMonth) + ' months ago';
        }
    
        else {
          return Math.round(elapsed / msPerYear) + ' years ago';
        }
      }

 }
