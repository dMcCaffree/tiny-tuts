import {Text, View} from "./Themed";
import {Dimensions, Image, StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

export default function NotificationsBadge({ count }: { count: number}) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{count > 99 ? '99' : count}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#F21C2F',
    height: 20,
    width: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -2,
    right: -6,
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 10,
  },
});
