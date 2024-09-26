import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated, Pressable } from 'react-native';

export default Cookie = () => {
  const [open, setOpen] = useState(false); 
  const [fraseAtual, setFraseAtual] = useState(''); 
  const leftCirclePosition = useRef(new Animated.Value(0)).current; 
  const rightCirclePosition = useRef(new Animated.Value(0)).current; 
  const textOpacity = useRef(new Animated.Value(0)).current;
  const frases = [
    'Siga os bons e aprenda com eles.', 
    'O bom-senso vale mais do que muito conhecimento.', 
    'O riso é a menor distância entre duas pessoas.', 
    'Deixe de lado as preocupações e seja feliz.',
    'Realize o óbvio, pense no improvável e conquiste o impossível.',
    'Acredite em milagres, mas não dependa deles.',
    'A maior barreira para o sucesso é o medo do fracasso.'
  ];

  function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * frases.length);
  }

  const handlePress = () => {
    if (!open) {
      const novaFrase = frases[gerarNumeroAleatorio()];
      setFraseAtual(novaFrase);
    }

    setOpen(!open);

    Animated.timing(leftCirclePosition, {
      toValue: open ? 0 : -150, 
      duration: 100,
      useNativeDriver: false,
    }).start();

    Animated.timing(rightCirclePosition, {
      toValue: open ? 0 : 150, 
      duration: 100,
      useNativeDriver: false,
    }).start();

    
    Animated.timing(textOpacity, {
      toValue: open ? 0 : 1, 
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress} style={styles.touchableArea}>
        <Animated.View
          style={[
            styles.circle,
            styles.leftCircle,
            { transform: [{ translateX: leftCirclePosition }] },
          ]}
        />

        <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
          {fraseAtual}
        </Animated.Text>

        <Animated.View
          style={[
            styles.circle,
            styles.rightCircle,
            { transform: [{ translateX: rightCirclePosition }] },
          ]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: "white"
  },
  circle: {
    height: 250,
    width: 125, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftCircle: {
    borderTopLeftRadius: 125,
    borderBottomLeftRadius: 125,
    borderColor: 'black',
    borderWidth: 4,
    borderRightWidth: 2,
    backgroundColor: "white"
  },
  rightCircle: {
    borderTopRightRadius: 125,
    borderBottomRightRadius: 125,
    borderColor: 'black',
    borderWidth: 4,
    borderLeftWidth: 2,
    backgroundColor: "white"
  },
  touchableArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  text: {
    position: 'absolute', 
    fontSize: 20,
    color: 'black',
    width: 250,
    textAlign: 'center',
    zIndex: -1
  },
});
