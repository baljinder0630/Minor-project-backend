import 'package:minor_project/to_do/app/app.dart';
import 'package:persistent_bottom_nav_bar/persistent_tab_view.dart';
import 'package:flutter/material.dart';

class Nav extends StatefulWidget {
  const Nav({super.key});

  @override
  State<Nav> createState() => _NavState();
}

class _NavState extends State<Nav> {
  int index = 0;
  final screens = [
    TodoHome(),
    Center(child: Text("gallery", style: TextStyle(fontSize: 72))),
    Center(child: Text("map", style: TextStyle(fontSize: 72))),
  ];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: screens[index],
      bottomNavigationBar: NavigationBarTheme(
        data: NavigationBarThemeData(
          indicatorColor: Colors.purple,
        ),
        child: NavigationBar(
            selectedIndex: index,
            onDestinationSelected: (index) =>
                setState(() => this.index = index),
            destinations: [
              NavigationDestination(icon: Icon(Icons.list), label: "ToDo"),
              NavigationDestination(icon: Icon(Icons.camera), label: "Gallery"),
              NavigationDestination(icon: Icon(Icons.map), label: "Location"),
            ]),
      ),
    );
  }
}
