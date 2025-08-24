package com.example.todoapp.service.impl;

import com.example.todoapp.entity.Todo;
import com.example.todoapp.repository.TodoRepository;
import com.example.todoapp.service.TodoService;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {

	private final TodoRepository todoRepository;

	public TodoServiceImpl(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}

	@Override
	public List<Todo> getAllTodos() {
		return todoRepository.findAll();
	}

	@Override
	public Todo getTodoById(Long id) {
		return todoRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));
	}

	@Override
	public Todo createTodo(String title, boolean completed) {
		Todo todo = new Todo();
		todo.setTitle(title);
		todo.setCompleted(completed);
		return todoRepository.save(todo);
	}

	@Override
	public Todo updateTodo(Long id, String title, boolean completed) {
		Todo existing = getTodoById(id);
		existing.setTitle(title);
		existing.setCompleted(completed);
		return todoRepository.save(existing);
	}

	@Override
	public void deleteTodo(Long id) {
		if (!todoRepository.existsById(id)) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found");
		}
		todoRepository.deleteById(id);
	}
}