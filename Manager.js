import { useState } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, Pressable } from 'react-native';

export default function App() {

  let nameSV = "Lai";
  let msSV = "PH25590";

  const show = (a, b) => (a + ": " + b);

  const [showResult, setShowResult] = useState(false);

  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState('');

  const addItem = () => {
    // if (name != '' && desc != '') {
    //   setItems([...items, { name, desc }]);
    // }

    setItems([...items, { name, desc, file }]);
    setName('');
    setDesc('');
    setFile('.../assets/icon.png');
  };

  //////

  const [list, setList] = useState([
    { id: 1, name: 'ABC', desc: 'Mo ta ABC' }
  ]);
  const [nameInput, setNameInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [editingId, setEditingId] = useState(0);

  const onClose = () => {
    setShow(false);
    setNameInput(''); setDescInput(''); setEditingId(0);
  };
  const onSave = () => {
    // 0. Kiểm tra editingId để xem có phải đang sửa k
    if (editingId) {
      const newList = list.map(item => {
        if (item.id == editingId) {
          item.name = nameInput;
          item.desc = descInput;
        }
        return item;
      });
      setList(newList);
      // Đóng modal và cập nhật lại gt mặc định
      onClose();
      return;
    }
    // 1. Định nghĩa obj mới sẽ được lưu
    const newItem = {
      name: nameInput,
      desc: descInput,
      // mảng k có pt thì id = 1,
      // mảng có pt thì id cuối cùng  + 1
      id: list.length == 0
        ? 1
        : list[list.length - 1].id + 1
    };
    // 2. Thêm obj đó vào mảng mới và set state
    const newList = [...list, newItem];
    setList(newList);
    // 3. Ẩn modal sau khi đã lưu
    onClose();
  };

  const onDelete = (deleteId) => {
    const newList = list.filter((item) => {
      return item.id !== deleteId;
    });
    setList(newList);
  };

  const onEdit = (editId) => {
    // 1. Hiện modal lên
    setShow(true);
    // 2. Tìm phần tử đang được sửa để lấy thông tin
    const editItem = list.find(item => item.id == editId);
    // 3. Hiển thị dữ liệu sửa lên TextInput
    setNameInput(editItem.name);
    setDescInput(editItem.desc);
    setEditingId(editId);
  }



  return (
    <View style={styles.container}>
      <Text>{show("Tên", nameSV)}</Text>
      <Text>{show("Mã Sinh Viên", msSV)}</Text>

      {showResult ? null : <Button title='Thêm mới' onPress={() => setShowResult(true)} />}

      {/* Modal nhan gt bang visible de an hien giao dien */}

      <Modal visible={showResult} animationType="slide">
        <View>
          <Text>{nameInput} {descInput} {editingId}</Text>
          <TextInput placeholder='Ten'
            value={nameInput}
            onChangeText={(text) => setNameInput(text)}
          />
          <TextInput placeholder='Mo ta'
            value={descInput}
            onChangeText={(text) => setDescInput(text)}
          />
          <Button title='Close' onPress={() => onClose()} />
          <Button title='Save' onPress={() => onSave()} />
        </View>
      </Modal>

      {/* <FlatList
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
      /> */}

      <FlatList
        data={list}
        renderItem={({ item }) => <View>
          <Text>{item.id}</Text>
          <Text>{item.name}</Text>
          <Text>{item.desc}</Text>
          <Pressable onPress={() => onEdit(item.id)}>
            <Text>Suaaaaa</Text>
          </Pressable>
          <Pressable onPress={() => onDelete(item.id)}>
            <Text>Xoaaaaaaa</Text>
          </Pressable>
        </View>}
        keyExtractor={(item) => item.id}
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