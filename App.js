import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView
} from "react-native";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";
import ToDo from "./ToDo";

const { width, hight } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newTodo: "",
    loadedTodos: false,
    toDos: {}
  };

  componentDidMount() {
    this._loadedTodos();
  }

  render() {
    const { newTodo, loadedTodos, toDos } = this.state;
    if (!loadedTodos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Kawai To DO</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="New To DO"
            value={newTodo}
            onChangeText={this._controllNewtodo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addTodo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text={"오늘 할일 이다할일 이다"} />
          </ScrollView>
        </View>
      </View>
    );
  }

  _controllNewtodo = text => {
    this.setState({
      newTodo: text
    });
  };

  _loadedTodos = () => {
    this.setState({
      loadedTodos: true
    });
  };

  _addTodo = () => {
    const { newTodo } = this.state;
    if (newTodo !== "") {
      this.setState(prevState => {
        const ID = uuidv1();
        const newTodoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newTodo,
            createdAt: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newTodo: "",
          toDos: {
            ...prevState.toDos,
            ...newTodoObject
          }
        };
        return { ...newState };
      });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
});
