import { Injectable } from '@angular/core';
var SockJs = require("sockjs-client");
var Stomp = require("stompjs");


@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {
  public notifications = 0;
  constructor() { }
  // Open connection with the back-end socket
  public connect() {
    let socket = new SockJs(`http://localhost:8080/socket`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }

  public getNotification() {
    // Open connection with server socket
    let stompClient = this.connect();
    stompClient.connect({}, frame => {
      // Subscribe to notification topic
      stompClient.subscribe('/topic/notification', notifications => {
        // Update notifications attribute with the recent messsage sent from the server
        this.notifications = JSON.parse(notifications.body).count;
      })
    });
  }
}
