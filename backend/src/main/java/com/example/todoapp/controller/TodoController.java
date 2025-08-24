package com.example.todoapp.controller;

import com.example.todoapp.dto.TodoRequest;
import com.example.todoapp.entity.Todo;
import com.example.todoapp.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

	private final TodoService todoService;

	public TodoController(TodoService todoService) {
		this.todoService = todoService;
	}

	@GetMapping
	public List<Todo> getAll() {
		return todoService.getAllTodos();
	}

	@GetMapping("/{id}")
	public Todo getById(@PathVariable Long id) {
		return todoService.getTodoById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Todo create(@Valid @RequestBody TodoRequest request) {
		return todoService.createTodo(request.getTitle(), request.isCompleted());
	}

	@PutMapping("/{id}")
	public Todo update(@PathVariable Long id, @Valid @RequestBody TodoRequest request) {
		return todoService.updateTodo(id, request.getTitle(), request.isCompleted());
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void delete(@PathVariable Long id) {
		todoService.deleteTodo(id);
	}
}