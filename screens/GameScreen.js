import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, FlatList, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItems";

function generateRandomBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumberInput, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumberInput);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessesRounds, setGuessesRounds] = useState([initialGuess]);

  const {width, height} = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumberInput) {
      onGameOver(guessesRounds.length);
    }
  }, [currentGuess, userNumberInput, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumberInput) ||
      (direction === "greater" && currentGuess > userNumberInput)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRandomNumber);

    setGuessesRounds((prevGuessRound) => [newRandomNumber, ...prevGuessRound]);
  }

  const guessRoundListLength = guessesRounds.length;

  let cotent =( <>
    <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionObject}>
          Higher or Lower ?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttons}>
            <PrimaryButton onButtonPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttons}>
            <PrimaryButton
              onButtonPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
  </>);

  if (width > 500) {
    cotent = <>
         <View style={styles.buttonsContainerWide}>
        <View style={styles.buttons}>
            <PrimaryButton
              onButtonPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.buttons}>
            <PrimaryButton onButtonPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
      </View>
    </>
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {cotent}
      <View style={styles.guessList}>
        {/* {guessesRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessesRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundListLength - itemData.index}
              guess={itemData.item}
            />

          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    marginVertical: 20,
    alignItems: 'center',
  },
  Container: {
    alignItems: "center",
    marginVertical: 40,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttons: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  instructionObject: {
    padding: 10,
  },
  guessList: {
    flex: 1,
    paddingVertical: 10
  },
  buttonsContainerWide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
