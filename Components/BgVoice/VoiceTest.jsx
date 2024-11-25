import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed
import Voice from '@react-native-voice/voice';

const VoiceInputApp = () => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechResults = (e) => {
    if (e.value && e.value.length > 0) {
      setText(e.value[0]); // Set the first result to the TextInput
    }
    setIsListening(false);
  };

  const onSpeechError = (e) => {
    console.error(e);
    Alert.alert('Error', 'Speech recognition error');
    setIsListening(false);
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMicPress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Speech to Text</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="Type or speak your message"
        />
        <TouchableOpacity onPress={handleMicPress} style={styles.micButton}>
          <Icon name={isListening ? 'mic' : 'mic-none'} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.infoText}>
        {isListening ? 'Listening...' : 'Tap the mic to start speaking'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  micButton: {
    backgroundColor: '#007BFF',
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
});

export default VoiceInputApp;
