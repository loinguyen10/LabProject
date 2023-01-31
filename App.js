import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, FlatList, TextInput, Image } from 'react-native';

export default function App() {

  let nameSV = "Lai";
  let msSV = "PH25590";

  const show = (a, b) => (a + ": " + b);

  const [showResult, setShowResult] = useState(false);

  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const [file, setFile] = useState('');

  // function handleChange(e) {
  //   console.log(e.target.files);
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  function hien() {
    <div>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Nhập tên"
      />

      <TextInput
        value={desc}
        onChangeText={text => setDesc(text)}
        placeholder="Nhập mô tả"
      />
    </div>
  }

  const addItem = () => {
    // if (name != '' && desc != '') {
    //   setItems([...items, { name, desc }]);
    // }

    setItems([...items, { name, desc, file }]);
    setName('');
    setDesc('');
    setFile('.../assets/icon.png');
  };

  return (
    <View style={styles.container}>
      <Text>{show("Tên", nameSV)}</Text>
      <Text>{show("Mã Sinh Viên", msSV)}</Text>

      <Button
        title='Thêm mới'
        onPress={() => setShowResult(true)} />

      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Nhập tên"
      />

      <TextInput
        value={desc}
        onChangeText={text => setDesc(text)}
        placeholder="Nhập mô tả"
      />

      {/* <div>
        <input type="file" onChange={handleChange}/>
        <img src={file}/>
      </div> */}

      <Button title="Thêm" onPress={addItem}/>
      <Button title="Hủy"/>

      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View>
            <Image source={item.file}
            style={{
              width: 100,
              height: 100,
              borderWidth: 2,
              borderColor: '#d35647',
              margin: 8
            }}
          />
          <Text>Tên: {item.name}, Mô tả: {item.desc}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
});