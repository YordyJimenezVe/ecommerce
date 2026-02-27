import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessagingService } from '../service/messaging.service';
import { AuthService } from '../../auth';
import { UsersService } from '../../users/_services/users.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-messaging-inbox',
  templateUrl: './messaging-inbox.component.html',
  styleUrls: ['./messaging-inbox.component.scss']
})
export class MessagingInboxComponent implements OnInit, OnDestroy {

  conversations: any = [];
  selectedConversation: any = null;
  messages: any = [];
  newMessage = '';

  // New Chat
  allUsers: any = [];
  isSearchingUsers = false;
  showNewChatModal = false;

  isLoading = false;
  isSending = false;

  user: any;
  polling: any;

  constructor(
    private messagingService: MessagingService,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user;
    this.listConversations();

    // Simple polling for new messages every 10 seconds
    this.polling = setInterval(() => {
      this.listConversations();
      if (this.selectedConversation) {
        this.loadMessages(this.selectedConversation);
      }
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.polling) clearInterval(this.polling);
  }

  listConversations() {
    this.messagingService.getConversations().subscribe((resp: any) => {
      this.conversations = resp.conversations;
    });
  }

  selectConversation(conv: any) {
    this.selectedConversation = conv;
    this.loadMessages(conv);
  }

  loadMessages(conv: any) {
    this.messagingService.getMessages(conv.id).subscribe((resp: any) => {
      this.messages = resp.messages;
    });
  }

  send() {
    if (!this.newMessage || !this.selectedConversation) return;

    this.isSending = true;
    const data = {
      conversation_id: this.selectedConversation.id,
      message: this.newMessage
    };

    this.messagingService.sendMessage(data).subscribe((resp: any) => {
      this.messages.push(resp.message);
      this.newMessage = '';
      this.isSending = false;
    });
  }

  listUsers() {
    this.isSearchingUsers = true;
    this.usersService.allUsers(1, 'active').subscribe((resp: any) => {
      this.allUsers = resp.users;
      this.isSearchingUsers = false;
    });
  }

  startNewChat(otherUser: any) {
    const data = {
      to_user_id: otherUser.id
    };
    this.messagingService.startConversation(data).subscribe((resp: any) => {
      this.listConversations();
      this.showNewChatModal = false;
      this.selectConversation(resp.conversation);
    });
  }

  getUserToDisplay(conv: any) {
    return conv.user_a_id === this.user.id ? conv.user_b : conv.user_a;
  }

}
