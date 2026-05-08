import { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface TaskInputProps {
  onAddTask: (title: string) => Promise<void>;
}

export function TaskInput({ onAddTask }: TaskInputProps) {
  const [value, setValue] = useState('');

  const submit = async () => {
    await onAddTask(value);
    if (value.trim()) {
      setValue('');
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="New Task"
        placeholder="What do you need to get done?"
        value={value}
        onChangeText={setValue}
        returnKeyType="done"
        onSubmitEditing={() => void submit()}
        style={styles.input}
      />
      <Button mode="contained" onPress={() => void submit()}>
        Add
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
});
