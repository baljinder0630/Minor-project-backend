import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
<<<<<<< HEAD
=======
import 'package:minor_project/Pages/nav.dart';
>>>>>>> cea49b5c005ac4a00473655a34d6fad04cd87101
import 'package:minor_project/Pages/welcome_screen.dart';
import 'package:minor_project/constants.dart';
import 'package:minor_project/location/location_home.dart';
import 'package:minor_project/to_do/app/app.dart';
import 'package:timezone/data/latest_10y.dart';

FlutterLocalNotificationsPlugin notificationsPlugin =
    FlutterLocalNotificationsPlugin();
void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  initializeTimeZones();

  AndroidInitializationSettings androidSettings =
      const AndroidInitializationSettings("@mipmap/ic_launcher");

  DarwinInitializationSettings iosSettings = const DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestCriticalPermission: true,
      requestSoundPermission: true);

  InitializationSettings initializationSettings =
      InitializationSettings(android: androidSettings, iOS: iosSettings);

  bool? initialized = await notificationsPlugin.initialize(
      initializationSettings,
      onDidReceiveNotificationResponse: (details) =>
          {log(details.payload.toString())});

  log("Notification initialized $initialized");

  // runApp(const MyApp());
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Flutter Auth',
        theme: ThemeData(
            primaryColor: kPrimaryColor,
            scaffoldBackgroundColor: Colors.white,
            elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(
                elevation: 0,
                primary: kPrimaryColor,
                shape: const StadiumBorder(),
                maximumSize: const Size(double.infinity, 56),
                minimumSize: const Size(double.infinity, 56),
              ),
            ),
<<<<<<< HEAD
            inputDecorationTheme: const InputDecorationTheme(
              filled: true,
              fillColor: kPrimaryLightColor,
              iconColor: kPrimaryColor,
              prefixIconColor: kPrimaryColor,
              contentPadding: EdgeInsets.symmetric(
                  horizontal: defaultPadding, vertical: defaultPadding),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.all(Radius.circular(30)),
                borderSide: BorderSide.none,
              ),
            )),
        // home: const LocationHomePage(),
        home: const WelcomeScreen());
=======
          ),
          inputDecorationTheme: const InputDecorationTheme(
            filled: true,
            fillColor: kPrimaryLightColor,
            iconColor: kPrimaryColor,
            prefixIconColor: kPrimaryColor,
            contentPadding: EdgeInsets.symmetric(
                horizontal: defaultPadding, vertical: defaultPadding),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.all(Radius.circular(30)),
              borderSide: BorderSide.none,
            ),
          )),
      home: const WelcomeScreen(),
    );
>>>>>>> cea49b5c005ac4a00473655a34d6fad04cd87101
  }
}
