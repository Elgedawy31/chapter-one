import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Snackbar,
  Text,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  EmptyTasks,
  TaskInput,
  TaskItem,
  TaskStats,
  useTasks,
} from '../../features/tasks';

export function HomeScreen() {
  const {
    tasks,
    isLoading,
    errorMessage,
    clearError,
    addTask,
    toggleTask,
    deleteTask,
    stats,
  } = useTasks();
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const confirmDelete = async () => {
    if (!taskToDelete) {
      return;
    }
    await deleteTask(taskToDelete);
    setTaskToDelete(null);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <Text variant="headlineMedium" style={styles.heading}>
            Task Manager
          </Text>

          <TaskInput onAddTask={addTask} />
          <TaskStats
            total={stats.total}
            completed={stats.completed}
            active={stats.active}
          />

          {isLoading ? (
            <ActivityIndicator style={styles.loader} />
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TaskItem task={item} onToggle={toggleTask} onDelete={setTaskToDelete} />
              )}
              ListEmptyComponent={<EmptyTasks />}
            />
          )}
        </View>
      </KeyboardAvoidingView>

      <Portal>
        <Dialog visible={taskToDelete !== null} onDismiss={() => setTaskToDelete(null)}>
          <Dialog.Title>Delete task?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              This action removes the task permanently from local storage.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setTaskToDelete(null)}>Cancel</Button>
            <Button onPress={() => void confirmDelete()}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar visible={Boolean(errorMessage)} onDismiss={clearError} duration={2500}>
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  heading: {
    marginBottom: 16,
  },
  loader: {
    marginTop: 36,
  },
});
