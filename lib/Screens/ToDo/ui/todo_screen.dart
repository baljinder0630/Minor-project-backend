// ignore_for_file: sort_child_properties_last, prefer_const_constructors, unnecessary_new

import 'dart:math';

import 'package:flutter/material.dart';
import 'package:minor_project/Screens/ToDo/model/todo_item.dart';
import 'package:minor_project/Screens/ToDo/util/database_client.dart';
import 'package:minor_project/Screens/ToDo/util/date_formatter.dart';

class ToDoScreen extends StatefulWidget {
  @override
  _ToDoScreenState createState() => _ToDoScreenState();
}

class _ToDoScreenState extends State<ToDoScreen> {
  final TextEditingController _textEditingController =
      new TextEditingController();
  var db = new DatabaseHelper();
  final List<ToDoItem> _itemList = <ToDoItem>[];

  @override
  void initState() {
    super.initState();
    _readToDoList();
  }

  void _handleSubmitted(String text) async {
    _textEditingController.clear();
    ToDoItem toDoItem = new ToDoItem(text, dateFormatted());
    int savedItemId = await db.saveItem(toDoItem);
    print("Item saved id: $savedItemId");

    ToDoItem? addedItem = await db.getItem(savedItemId);

    setState(() {
      _itemList.insert(0, addedItem!);
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        title: Text("Task todo"),
        centerTitle: true,
      ),
      backgroundColor: Colors.black87,
      body: Column(
        children: <Widget>[
          new Flexible(
              child: new ListView.builder(
                  itemCount: _itemList.length,
                  padding: new EdgeInsets.all(8.0),
                  reverse: false,
                  itemBuilder: (_, int index) {
                    log(index);
                    return new Card(
                      color: Colors.white10,
                      child: new ListTile(
                        title: _itemList[index],
                        onLongPress: () => _updateItem(_itemList[index], index),
                        trailing: new Listener(
                          key: new Key(_itemList[index].itemName),
                          child: new Icon(
                            Icons.remove_circle,
                            color: Colors.redAccent,
                          ),
                          onPointerDown: (pointerEvent) =>
                              _deleteToDo(_itemList[index].id, index),
                        ),
                      ),
                    );
                  }))
        ],
      ),
      floatingActionButton: new FloatingActionButton(
        tooltip: "Add item",
        backgroundColor: Colors.redAccent,
        child: new ListTile(
          title: new Icon(Icons.add),
        ),
        onPressed: _showFormDialog,
      ),
    );
  }

  void _showFormDialog() {
    var alert = new AlertDialog(
      content: new Row(
        children: <Widget>[
          new Expanded(
            child: new TextField(
              controller: _textEditingController,
              autofocus: true,
              decoration: new InputDecoration(
                  labelText: "Task",
                  hintText: "eg. Drink coffe",
                  icon: new Icon(Icons.note_add)),
            ),
          ),
        ],
      ),
      actions: <Widget>[
        new ElevatedButton(
            onPressed: () {
              _handleSubmitted(_textEditingController.text);
              _textEditingController.clear();
              Navigator.pop(context);
            },
            child: new Text("Save")),
        SizedBox(
          height: 5,
        ),
        new ElevatedButton(
            onPressed: () => Navigator.pop(context),
            child: new Text(
              "Cancel",
              style: new TextStyle(color: Colors.redAccent),
            ))
      ],
    );
    showDialog(
        context: context,
        builder: (_) {
          return alert;
        });
  }

  void _readToDoList() async {
    List items = await db.getItems();
    items.forEach((item) {
      // ToDoItem toDoItem = ToDoItem.map(item);
      setState(() {
        _itemList.add(ToDoItem.map(item));
      });
      // print("Db items: ${toDoItem.itemName}");
    });
  }

  void _deleteToDo(int id, int index) async {
    debugPrint("Deleted Item!");
    await db.deleteItem(id);
    setState(() {
      _itemList.removeAt(index);
    });
  }

  void _updateItem(ToDoItem item, int index) async {
    var alert = new AlertDialog(
      title: new Text("Update Task"),
      content: Row(
        children: <Widget>[
          new Expanded(
            child: new TextField(
              controller: _textEditingController,
              autofocus: true,
              decoration: new InputDecoration(
                  labelText: "Task",
                  hintText: "eg. Something",
                  icon: new Icon(Icons.update)),
            ),
          )
        ],
      ),
      actions: <Widget>[
        new ElevatedButton(
          onPressed: () async {
            ToDoItem newItemUpdated = ToDoItem.fromMap({
              "itemName": _textEditingController.text,
              "dateCreated": dateFormatted(),
              "id": item.id
            });

            _handleSubmittedUpdate(index, item); //Redrawing screen
            await db.updateItem(newItemUpdated); //Updating the task
            setState(() {
              _readToDoList(); //Redrawing the screen with all items saved in the db
            });
            _textEditingController.clear();
            Navigator.pop(context);
          },
          child: new Text("Update"),
        ),
        new ElevatedButton(
          onPressed: () => Navigator.pop(context),
          child: new Text(
            "Cancel",
            style: new TextStyle(color: Colors.redAccent),
          ),
        )
      ],
    );
    showDialog(
        context: context,
        builder: (_) {
          return alert;
        });
  }

  void _handleSubmittedUpdate(int index, ToDoItem item) async {
    setState(() {
      _itemList.removeWhere((element) {
        _itemList[index].itemName == item.itemName;
        return true;
      });
    });
  }
}
