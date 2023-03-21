import { StyleSheet, View, Text } from "react-native";

import Colors from "../../constants/colors";

function NumberContainer({children}) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
};

export default NumberContainer;

const styles  = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.primary700,
    borderRadius: 8,
    margin: 24,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: Colors.primary700,
    fontSize: 36, fontWeight: 'bold',
  },
});