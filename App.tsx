import React, {useState} from 'react';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Button from './src/components/Button';

type Task = {
  id: number;
  title: string;
  status: boolean;
};

function App(): React.JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([
    {id: 1, title: 'Create todo list', status: true},
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        status: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? {...task, status: !task.status} : task,
      ),
    );
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>
              {index + 1}. {item.title}
            </Text>
            <Text style={styles.taskStatus}>
              {item.status ? 'Done' : 'Not Done'}
            </Text>
            <View style={styles.actions}>
              <Button
                title={item.status ? 'Undo' : 'Done'}
                onPress={() => toggleTaskStatus(item.id)}
              />
              <Button title={'Delete'} onPress={() => deleteTask(item.id)} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  taskTitle: {
    fontSize: 18,
  },
  taskStatus: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
  },
});

export default App;
