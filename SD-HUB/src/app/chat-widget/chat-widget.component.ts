import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

interface Message {
  content: string;
  role: 'user' | 'bot';
}

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrl: './chat-widget.component.css'
})
export class ChatWidgetComponent implements OnInit {
  isOpen = false;
  messages: Message[] = [];
  newMessage = '';
  isLoading = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.messages = [{
      content: 'Hello there! 👋 It\'s nice to meet you!',
      role: 'bot'
    }];
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (!this.newMessage.trim()) return;

    // Add user message
    this.messages.push({
      content: this.newMessage,
      role: 'user'
    });

    const userMessage = this.newMessage;
    this.newMessage = '';
    this.isLoading = true;

    try {
      const response = await this.chatService.sendMessage(userMessage).toPromise();
      
      // Add bot response
      this.messages.push({
        content: response.response,
        role: 'bot'
      });
    } catch (error) {
      console.error('Error:', error);
      this.messages.push({
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'bot'
      });
    } finally {
      this.isLoading = false;
    }
  }
}
