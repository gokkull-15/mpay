import { IconSymbol } from "@/components/ui/IconSymbol";
import { useApp } from "@/contexts/AppContext";
import { useRouter } from "expo-router";
import React, { memo, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface HistoryItem {
  id: string;
  type: "send" | "receive";
  amount: number | string;
  symbol: string;
  toOrFrom: string;
  status: "pending" | "success" | "failed" | string;
  timestamp: string | number | Date;
}

export default function HistoryScreen() {
  const { history } = useApp();
  const router = useRouter();

  const keyExtractor = useCallback((i: HistoryItem) => i.id, []);
  const renderItem = useCallback(
    ({ item }: { item: HistoryItem }) => <HistoryRow item={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <IconSymbol name="xmark.circle.fill" size={26} color="#555" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={history as HistoryItem[]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: "#eee" }} />
        )}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 40, opacity: 0.6 }}>
            No transactions yet
          </Text>
        }
      />
    </View>
  );
}

const HistoryRow = memo(function HistoryRow({ item }: { item: HistoryItem }) {
  const color = item.type === "send" ? "#FF9500" : "#32D74B";
  const icon =
    item.type === "send" ? "paperplane.fill" : "tray.and.arrow.down.fill";
  return (
    <View style={styles.row}>
      <View style={[styles.circle, { backgroundColor: color }]}>
        <IconSymbol name={icon as any} size={20} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>
          {item.type === "send" ? "Sent" : "Received"} {item.amount}{" "}
          {item.symbol}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {item.toOrFrom}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={[
            styles.status,
            item.status === "success" && { color: "#34C759" },
          ]}
        >
          {item.status}
        </Text>
        <Text style={styles.time}>
          {new Date(item.timestamp).toLocaleDateString()}{" "}
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontSize: 30, fontWeight: "800" },
  closeBtn: { padding: 4 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTitle: { fontWeight: "600", fontSize: 15 },
  sub: { fontSize: 12, opacity: 0.6, maxWidth: 160 },
  status: {
    fontSize: 12,
    textTransform: "capitalize",
    color: "#FFA500",
    fontWeight: "600",
  },
  time: { fontSize: 10, opacity: 0.5 },
});
