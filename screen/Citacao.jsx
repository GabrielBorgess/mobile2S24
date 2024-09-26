
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import ConsumirApi from '../service/ConsumirApi';
import { useEffect, useRef, useState } from 'react';

export default function Citacao() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const rotation = useRef(new Animated.Value(0)).current;

  const fetchQuote = async () => {
    try {
      const response = await ConsumirApi("https://stoic.tekloon.net/stoic-quote");
      const originalQuote = response.data.quote;

      if (!response.data.author) {
        setAuthor("Desconhecido");
      } else setAuthor(response.data.author);

      setQuote(originalQuote);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.citacao}>
        <Text style={styles.title}>"{quote}"</Text>
        <Text style={styles.title}> - {author}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => {
        fetchQuote();
      }}>
        <View>
          <Text>New Quote</Text>
        </View>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',

  },
  button: {
    fontWeight: 'bold',
    paddingVertical: 12,
    paddingHorizontal: 32,
    position: "absolute",
    bottom: 0,
    margin: 80
  },
  citacao: {
    position: "absolute",
    margin: 50,
    gap: 30,

  }
});
