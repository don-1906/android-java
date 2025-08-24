import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE || 'http://localhost:8080';

type Todo = { id: number; title: string; completed: boolean };

export default function Index() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [title, setTitle] = useState('');

	async function fetchTodos() {
		try {
			const res = await fetch(`${API_BASE}/api/todos`);
			const data = await res.json();
			setTodos(data);
		} catch (e) {
			Alert.alert('Error', 'Failed to fetch todos');
		}
	}

	async function addTodo() {
		if (!title.trim()) return;
		try {
			await fetch(`${API_BASE}/api/todos`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, completed: false }),
			});
			setTitle('');
			fetchTodos();
		} catch {
			Alert.alert('Error', 'Failed to add todo');
		}
	}

	async function toggleTodo(id: number, completed: boolean) {
		try {
			await fetch(`${API_BASE}/api/todos/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: todos.find(t => t.id === id)?.title || '', completed: !completed }),
			});
			fetchTodos();
		} catch {
			Alert.alert('Error', 'Failed to update todo');
		}
	}

	async function deleteTodo(id: number) {
		try {
			await fetch(`${API_BASE}/api/todos/${id}`, { method: 'DELETE' });
			fetchTodos();
		} catch {
			Alert.alert('Error', 'Failed to delete todo');
		}
	}

	useEffect(() => {
		fetchTodos();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Todos</Text>
			<View style={styles.row}>
				<TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="New todo" />
				<Button title="Add" onPress={addTodo} />
			</View>
			<FlatList
				data={todos}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => (
					<View style={styles.todoRow}>
						<Text style={[styles.todoText, item.completed && styles.completed]} onPress={() => toggleTodo(item.id, item.completed)}>
							{item.title}
						</Text>
						<Button title="Delete" onPress={() => deleteTodo(item.id)} />
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingTop: 48 },
	title: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
	row: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 12 },
	input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 4 },
	todoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
	todoText: { fontSize: 16 },
	completed: { textDecorationLine: 'line-through', color: '#888' }
});