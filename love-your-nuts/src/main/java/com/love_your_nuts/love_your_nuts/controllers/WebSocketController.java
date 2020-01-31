package com.love_your_nuts.love_your_nuts.controllers;

import java.util.Date;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;


@Controller
public class WebSocketController {

	private final SimpMessagingTemplate template;
	
	WebSocketController(SimpMessagingTemplate template){
		this.template = template;
	}
	
	
	@MessageMapping("/send/message")
	public void onReceivedMessages(String message) {
		System.out.println("INCOMING...");
		this.template.convertAndSend("/chat", generateMessage());
	}
	
     private String generateMessage() {
    	 return "KASHIEFA:"+  "\n" + new Date() +"\n" + "I AM IN TROUBLE HELP!!!!" + "\n"+ "Location: ";
     }
}
