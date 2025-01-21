import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];

const App = () => {
  const [mydata, setMydata] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    fetch("https://mysafeinfo.com/api/data?list=fifachamptionsmensoccer&format=json&case=default")
        .then((response) => response.json())
        .then((myJson) => {
          if (originalData.length < 1) {
            setMydata(myJson);
            originalData = myJson;
          }
        });
  }, []);

  // Filter data based on user input
  const FilterData = (text) => {
    if (text !== '') {
      const myFilteredData = originalData.filter(
          (item) =>
              item.Year.toString().includes(text) ||
              item.WinningTeam.toLowerCase().includes(text.toLowerCase()) ||
              item.LosingTeam.toLowerCase().includes(text.toLowerCase())
      );
      setMydata(myFilteredData);
    } else {
      setMydata(originalData);
    }
  };

  // Render each item in a styled flexbox
  const renderItem = ({ item }) => {
    return (
        <View style={styles.card}>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Year:</Text> {item.Year}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Winning Team:</Text> {item.WinningTeam}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Losing Team:</Text> {item.LosingTeam}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.label}>Score:</Text> {item.Score}
          </Text>
        </View>
    );
  };

  return (
      <View style={styles.container}>
        <StatusBar />
        <Text style={styles.title}>FIFA Champions Results  </Text>
        <TextInput
            style={styles.input}
            placeholder="Search by Year, Team..."
            onChangeText={(text) => FilterData(text)}
        />
        <FlatList
            data={mydata}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    marginVertical: 2,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default App;
