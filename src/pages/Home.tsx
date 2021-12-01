import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const isRepeated = tasks.some(task => task.title === newTaskTitle);
    if(isRepeated) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
      return;
    }
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };
    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(
      task => {
        if(id === task.id) 
          task.done = !task.done;
        return task;
      }
    );
    setTasks(updatedTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item", 
      "Tem certeza que você deseja remover esse item?", 
      [
        {
          text: "Não",
          onPress: () => {}
        }, 
        {
          text: "Sim",
          onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))
        }
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTask = tasks.map(
      task => {
        if(taskId === task.id) 
          task.title = taskNewTitle;
        return task;
      }
    );
    setTasks(updatedTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})