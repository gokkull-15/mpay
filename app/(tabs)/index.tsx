import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useApp } from "@/contexts/AppContext";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { balance, history, logout } = useApp();
  const router = useRouter();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const bg = isDark ? "#0B0D10" : "#FFFFFF";
  const headerBg = isDark ? "#5D3BEE" : "#5D3BEE";
  const borderColor = isDark ? "#2A2F36" : "#E2E6EA";
  const textPrimary = isDark ? "#FFFFFF" : "#11181C";
  const textSecondary = isDark ? "#B5BCC6" : "#5A6470";

  return (
    <FlatList
      style={{ backgroundColor: bg }}
      ListHeaderComponent={
        <>
          <View style={[styles.headerCard, { backgroundColor: headerBg }]}>
            <ThemedText type="title" style={{ color: "#fff" }}>
              mPay Wallet
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 14,
              }}
            >
              {Object.entries(balance).map(([sym, val]) => (
                <View
                  key={sym}
                  style={[
                    styles.tokenPill,
                    { backgroundColor: "rgba(255,255,255,0.18)" },
                  ]}
                >
                  <Text style={[styles.tokenPillText]}>
                    {sym}: {val.toFixed(4)}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.actionsRow}>
              <Action
                icon="arrow.up.circle.fill"
                label="Send"
                onPress={() => router.push("/send")}
              />
              <Action
                icon="arrow.down.circle.fill"
                label="Receive"
                onPress={() => router.push("/receive")}
              />
              <Action
                icon="qrcode.viewfinder"
                label="Scan"
                onPress={() => router.push("/scan")}
              />
              <Action
                icon="clock.fill"
                label="History"
                onPress={() => router.push("/history")}
              />
            </View>
          </View>
          <View
            style={[
              styles.sectionHeader,
              {
                borderBottomWidth: 1,
                borderColor: borderColor,
                paddingBottom: 8,
                marginBottom: 4,
              },
            ]}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "700", color: textPrimary }}
            >
              Recent Activity
            </Text>
            <TouchableOpacity onPress={logout}>
              <Text style={{ color: "#FF3B30", fontWeight: "600" }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      }
      data={history}
      keyExtractor={(i) => i.id}
      renderItem={({ item }) => (
        <HistoryRow
          item={item}
          isDark={isDark}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
          borderColor={borderColor}
        />
      )}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 60,
        backgroundColor: bg,
      }}
      ListEmptyComponent={
        <Text
          style={{ textAlign: "center", marginTop: 40, color: textSecondary }}
        >
          No transactions yet
        </Text>
      }
    />
  );
}

function Action({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress}>
      <IconSymbol name={icon as any} size={30} color="#fff" />
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function HistoryRow({
  item,
  isDark,
  textPrimary,
  textSecondary,
  borderColor,
}: any) {
  const color = item.type === "send" ? "#FF9500" : "#32D74B";
  const icon =
    item.type === "send" ? "paperplane.fill" : "tray.and.arrow.down.fill";
  return (
    <View style={[styles.historyRow, { borderColor: borderColor }]}>
      <View style={[styles.historyIcon, { backgroundColor: color }]}>
        <IconSymbol name={icon as any} size={20} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.historyTitle, { color: textPrimary }]}>
          {item.type === "send" ? "Sent" : "Received"} {item.amount}{" "}
          {item.symbol}
        </Text>
        <Text
          style={[styles.historySub, { color: textSecondary }]}
          numberOfLines={1}
        >
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
        <Text style={[styles.time, { color: textSecondary }]}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    padding: 20,
    borderRadius: 28,
    gap: 4,
    shadowColor: "#5D3BEE",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 25,
    elevation: 5,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  actionBtn: {
    width: 72,
    height: 72,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  actionLabel: { color: "#fff", fontSize: 12, fontWeight: "600" },
  tokenPill: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 30 },
  tokenPillText: { color: "#fff", fontWeight: "600", fontSize: 13 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 14,
  },
  historyIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  historyTitle: { fontWeight: "600", fontSize: 15 },
  historySub: { fontSize: 12, maxWidth: 160 },
  status: {
    fontSize: 12,
    textTransform: "capitalize",
    color: "#FFA500",
    fontWeight: "600",
  },
  time: { fontSize: 10 },
});
