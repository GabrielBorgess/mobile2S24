import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import { useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Counter() {

  const [count, setCount] = useState(0);
  const rotation = useRef(new Animated.Value(0.5)).current; 

  const startRotation = () => {
    Animated.timing(rotation, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0.5);
    });
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = { transform: [{ rotate: rotateInterpolate }],
  };

  const increment = () => {
    setCount(count + 1);
  }

  const decrement = () => {
    count == 0 ? '' : setCount(count - 1);
  }

  const reset = () => {
   setCount(0);
  }


  return (

    <View style={styles.container}>

      <Text style={styles.number}>{count}</Text>

     <View style={styles.invisibleButton}>
      <Pressable onPress={decrement} style={styles.screenBtn}><Text style={{paddingRight: 60, paddingTop: 300}}>Subtrair</Text></Pressable>
      <Pressable onPress={increment} style={styles.screenBtn}><Text style={{paddingLeft: 60, paddingTop: 300}}>Aumentar</Text></Pressable>
     </View>

     <Pressable style={styles.button}  onPress={() => {
          reset(); 
          startRotation();
        }}>
        <Animated.View style={animatedStyle}>
          <Ionicons name="sync" size={60} color={"black"} />
        </Animated.View>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    width: "40%",
    height: "40%"
  },
  counter: {
    flexDirection: "row",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 35,
  },
  number: { 
    fontSize: 300
  },
  invisibleButton: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  screenBtn: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  }
});
