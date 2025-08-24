package com.example.todoapp.service;

import com.example.todoapp.entity.Todo;

import java.util.List;

public interface TodoService {
	List<Todo> getAllTodos();
	Todo getTodoById(Long id);
	Todo createTodo(String title, boolean completed);
	Todo updateTodo(Long id, String title, boolean completed);
	void deleteTodo(Long id);
}