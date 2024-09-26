import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Timer() {
  const [tempo, setTempo] = useState(0); 
  const [ativo, setAtivo] = useState(false);
  const rotation = useRef(new Animated.Value(6)).current; 

  const startRotation = () => {
    Animated.timing(rotation, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(6);
    });
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  useEffect(() => {
    let intervalo = null;

    if (ativo) {
      intervalo = setInterval(() => {
        setTempo((tempo) => tempo + 1); // Incrementa a cada 10ms
      }, 1000); // Atualiza a cada 10ms
    } else if (!ativo && tempo !== 0) {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [ativo, tempo]);

  const iniciar = () => {
    setAtivo(true);
  };

  const pausar = () => {
    setAtivo(false);
  };

  const resetar = () => {
    setAtivo(false);
    setTempo(0);
  };

  const formatarTempo = (tempo) => {
    const minutos = Math.floor(tempo / 60); 
    const segundos = tempo % 60; 

    return `${minutos.toString().padStart(2, '0')}.${segundos.toString().padStart(2, '0')}`;
  };

  
  return (
    <View style={styles.container}>

    <View style={styles.circle}>
      <Text style={styles.title}>{formatarTempo(tempo)}</Text>
     </View>
     

     <View style={styles.buttons}> 

      <Pressable style={styles.button} onPress={iniciar}>
      <Ionicons name={ativo ? "play" : "play-outline"} size={45} color={"black"}/>
      </Pressable>

      <Pressable style={styles.button} onPress={pausar}> 
      <Ionicons name={ativo ? "pause-outline" : "pause"} size={45} color={"black"}/>
      </Pressable>

      <Pressable style={styles.button}  onPress={() => {
          resetar(); 
          startRotation();
        }}>
        <Animated.View style={animatedStyle}>
          <Ionicons name="sync" size={44} color={"black"} />
        </Animated.View>
      </Pressable>

     </View>

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
    fontSize: 30, 
    fontWeight: 'bold',
  
  },
  circle: { 
    borderRadius: 200,
    borderColor: "black", 
    borderWidth: 5,
    height: 250,
    width: 250,
    alignItems: "center", 
    justifyContent: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 35,
    elevation: 3,
    backgroundColor: 'white',
    borderColor:"black",
  },
  buttons: {
    flexDirection: "row", 
    margin: 40,
    gap: 25,
    position: "absolute",
    bottom: 0,
  }
});
