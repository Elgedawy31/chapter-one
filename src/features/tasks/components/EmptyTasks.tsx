import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

export function EmptyTasks() {
  return (
    <View style={styles.container}>
      <Icon source="clipboard-text-outline" size={48} />
      <Text variant="titleMedium">No tasks yet</Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Add your first task to get started.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 56,
    gap: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
});
