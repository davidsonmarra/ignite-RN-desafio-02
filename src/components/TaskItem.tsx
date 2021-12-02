import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View, Text, StyleSheet, FlatListProps, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { ItemWrapper } from './ItemWrapper';

import trashIcon from '../assets/icons/trash/trash.png'
import { Task, TasksListProps } from './TasksList';

interface TasksItemProps extends TasksListProps {
  item: Task;
  index: number;
}

export function TaskItem({ 
  item, 
  index,
  toggleTaskDone, 
  removeTask,
  editTask
}: TasksItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setNewTitle(item.title);
  }

  function handleSubmitEditing() {
    editTask(item.id, newTitle);
    setIsEditing(false);
  }

  useEffect(()=> {
    isEditing 
    ?  textInputRef.current?.focus()
    :  textInputRef.current?.blur();
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {
          isEditing ? 
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon 
              name="x"
              size={22}
              color="#B2B2B2"
            />
          </TouchableOpacity> :
          <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Icon 
              name="edit-3"
              size={22}
              color="#B2B2B2"
            />
          </TouchableOpacity>
        }
        <View style={ styles.divider }>

        </View>
        <TouchableOpacity
          disabled={isEditing}
          testID={`trash-${index}`}
          style={{ 
            paddingRight: 24,
            paddingLeft: 12,
            opacity: isEditing ? 0.2 : 1
          }}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  container: {
    flexDirection: 'row'
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginLeft: 12
  }
})