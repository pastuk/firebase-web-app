import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.scss' ]
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.db.object('123').valueChanges()
      .subscribe(value => {
        console.log(value);
      });
  }

}
