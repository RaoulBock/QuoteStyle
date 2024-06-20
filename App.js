import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import * as Font from 'expo-font'; // Import Font from expo-font

export default function App() {
  const [quote, setQuote] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [randomColor, setRandomColor] = React.useState('#3498db'); // Initial color
  const [fontLoaded, setFontLoaded] = React.useState(false); // State to track font loading
  const [selectedFont, setSelectedFont] = React.useState('custom-font'); // Initial selected font

  React.useEffect(() => {
    // Load custom font when component mounts
    Font.loadAsync({
      'custom-font': require('./assets/Fonts/Nunito/Nunito-VariableFont_wght.ttf'), // Replace with your default font file
      'playwrite-font': require('./assets/Fonts/PlaywriteMX/PlaywriteMX-VariableFont_wght.ttf'), // Replace with your Playwrite font file
      'FjallaOne-font': require('./assets/Fonts/FjallaOne/FjallaOne-Regular.ttf'), // Replace with your FjallaOne font file
      'Tiny-font': require('./assets/Fonts/Tiny5/Tiny5-Regular.ttf'), // Replace with your Tiny font file
      // Add more fonts here as needed
    }).then(() => setFontLoaded(true));

    fetchData();
  }, []);

  const fetchData = async () => {
    const url = 'https://thought-of-the-day.p.rapidapi.com/thought';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'af913674e8mshd049bcd448bbeabp18f138jsn2ddff479839c',
        'x-rapidapi-host': 'thought-of-the-day.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setQuote(result);
      setLoading(false);
      console.log(result);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleNext = () => {
    setLoading(true);
    fetchData();
    setRandomColor(generateRandomColor());
  };

  const generateRandomColor = () => {
    // Generate random RGB values
    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    return color;
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
  };

  const handleChangeBackgroundColor = () => {
    setRandomColor(generateRandomColor());
  };

  const handleCopyToClipboard = () => {
    Clipboard.setString(quote?.data);
    alert('Copied to clipboard!');
  };

  if (!fontLoaded) {
    return <ActivityIndicator animating={true} color={'black'} />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: randomColor }]}>
      {loading ? (
        <ActivityIndicator animating={true} color={'black'} />
      ) : (
        <View style={styles.quoteContainer}>
          <Text
            style={[styles.text, { fontFamily: selectedFont, color: 'white' }]}>
            {quote?.data}
          </Text>
          <Button style={styles.button} onPress={handleNext}>
            Next 👉
          </Button>
          <TouchableOpacity
            style={styles.clipboard}
            activeOpacity={0.8}
            onPress={handleCopyToClipboard}>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: '500' }}>
              📋 Copy to clipboard
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Button style={styles.button} onPress={handleChangeBackgroundColor}>
        Change Background Color
      </Button>

      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.fontBtn}
          activeOpacity={0.8}
          onPress={() => handleFontChange('custom-font')}>
          <Text style={[styles.previewText, { fontFamily: 'custom-font' }]}>
            N
          </Text>
          <Text style={styles.fonts}>Nunito</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fontBtn}
          activeOpacity={0.8}
          onPress={() => handleFontChange('playwrite-font')}>
          <Text style={[styles.previewText, { fontFamily: 'playwrite-font' }]}>
            N
          </Text>
          <Text style={styles.fonts}>Playwrite</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fontBtn}
          activeOpacity={0.8}
          onPress={() => handleFontChange('FjallaOne-font')}>
          <Text style={[styles.previewText, { fontFamily: 'FjallaOne-font' }]}>
            N
          </Text>
          <Text style={styles.fonts}>FjallaOne</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fontBtn}
          activeOpacity={0.8}
          onPress={() => handleFontChange('Tiny-font')}>
          <Text style={[styles.previewText, { fontFamily: 'Tiny-font' }]}>
            N
          </Text>
          <Text style={styles.fonts}>Tiney</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '500',
    fontSize: 30,
    marginHorizontal: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  button: {
    width: 250,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'white',
  },
  grid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  fonts: {
    marginHorizontal: 20,
    color: 'white',
    fontSize: 18,
  },
  previewText: {
    fontSize: 20,
    color: 'white',
    marginTop: 5,
  },
  fontBtn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  clipboard: {
    marginTop: 50,
  },
});
