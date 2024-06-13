package com.domdom.taskbe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TaskbeApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskbeApplication.class, args);
	}

}
