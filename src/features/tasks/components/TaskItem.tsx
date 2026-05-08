import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Checkbox, IconButton, Surface, Text } from 'react-native-paper';
import Animated, {
  FadeInDown,
  Layout,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

function TaskItemComponent({ task, onToggle, onDelete }: TaskItemProps) {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(pressed.value ? 0.98 : 1, { duration: 120 }) }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.duration(220)}
      layout={Layout.springify()}
      style={animatedStyle}
    >
      <Pressable
        onPressIn={() => {
          pressed.value = 1;
        }}
        onPressOut={() => {
          pressed.value = 0;
        }}
      >
        <Surface
          style={[styles.card, task.completed && styles.cardCompleted]}
          elevation={1}
        >
          <View style={styles.leftContent}>
            <Checkbox
              status={task.completed ? 'checked' : 'unchecked'}
              onPress={() => onToggle(task.id)}
            />
            <Text style={[styles.title, task.completed && styles.titleCompleted]}>
              {task.title}
            </Text>
          </View>
          <IconButton
            icon="delete-outline"
            onPress={() => onDelete(task.id)}
            accessibilityLabel="Delete task"
          />
        </Surface>
      </Pressable>
    </Animated.View>
  );
}

export const TaskItem = memo(TaskItemComponent);

const styles = StyleSheet.create({
  card: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginBottom: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardCompleted: {
    opacity: 0.65,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
  },
});
