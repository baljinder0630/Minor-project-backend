import 'package:flutter/material.dart';
import 'package:minor_project/Screens/ToDo/ui/todo_screen.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('ToDo List'),
        centerTitle: true,
        backgroundColor: Colors.black54,
      ),
      body: new ToDoScreen(),
    );
  }
}
