import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

interface TaskStatsProps {
  total: number;
  completed: number;
  active: number;
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Surface style={styles.statCard} elevation={1}>
      <Text variant="titleLarge">{value}</Text>
      <Text variant="labelMedium">{label}</Text>
    </Surface>
  );
}

export function TaskStats({ total, completed, active }: TaskStatsProps) {
  return (
    <View style={styles.row}>
      <StatCard label="Total" value={total} />
      <StatCard label="Completed" value={completed} />
      <StatCard label="Active" value={active} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
});
