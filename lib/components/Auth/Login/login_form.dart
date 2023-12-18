// ignore_for_file: prefer_const_constructors, use_build_context_synchronously

import 'dart:convert';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';
import 'package:minor_project/Pages/nav.dart';
import 'package:minor_project/services/Todo/notification.dart';
import 'package:minor_project/to_do/app/app.dart';

import '../../already_have_an_account_acheck.dart';
import '../../../constants.dart';
import '../../../Pages/signup_screen.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formkey = GlobalKey<FormState>();
  bool passToggle = true;
  bool isPatient = false;
  String role = "careTaker";
  final emailController = TextEditingController();
  final passController = TextEditingController();

  Future<bool> signin() async {
    var url = Uri.https(
        'assistalzheimer.onrender.com', '/api/auth/signin', {'role': role});

    var response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'email': emailController.text.trim(),
        'password': passController.text.trim(),
      }),
    );

    print(response.body);
    final data = jsonDecode(response.body);
    if (data["success"] == true) {
      // Successful response, you may want to parse response.body for further information
      return true;
    } else {
      // Unsuccessful response, handle accordingly
      final snackBar = SnackBar(content: Text(data["message"]));
      ScaffoldMessenger.of(context).showSnackBar(snackBar);
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formkey,
      child: Column(
        children: [
          TextFormField(
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.next,
            controller: emailController,
            cursorColor: kPrimaryColor,
            onSaved: (email) {},
            decoration: InputDecoration(
              hintText: "Your email",
              prefixIcon: Padding(
                padding: const EdgeInsets.all(defaultPadding),
                child: Icon(Icons.person),
              ),
            ),
            validator: (value) {
              bool validEmail = RegExp(
                      r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                  .hasMatch(value!);
              if (value.isEmpty) {
                return "Email can't be empty";
              } else if (!validEmail) {
                return "Enter valid email";
              }
              return null;
            },
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: defaultPadding),
            child: TextFormField(
              textInputAction: TextInputAction.done,
              obscureText: passToggle,
              cursorColor: kPrimaryColor,
              controller: passController,
              decoration: InputDecoration(
                  hintText: "Your password",
                  prefixIcon: Padding(
                    padding: const EdgeInsets.all(defaultPadding),
                    child: Icon(Icons.lock),
                  ),
                  suffixIcon: InkWell(
                    onTap: () {
                      setState(() {
                        passToggle = !passToggle;
                      });
                    },
                    child: Icon(
                        passToggle ? Icons.visibility : Icons.visibility_off),
                  )),
              validator: (value) {
                if (value!.isEmpty) {
                  return "Password can't be empty";
                } else if (value.length < 8) {
                  return "Password must contain at least 8 characters";
                }
                return null;
              },
            ),
          ),
          SwitchListTile(
            title: Text(isPatient ? 'Patient' : 'Care Taker'),
            value: isPatient,
            onChanged: (bool value) {
              setState(() {
                isPatient = value;
                role = isPatient ? 'patient' : 'careTaker';
              });
            },
          ),
          Hero(
            tag: "login_btn",
            child: ElevatedButton(
              onPressed: () async {
                if (_formkey.currentState!.validate()) {
                  if (await signin()) {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) {
                          return Nav();
                        },
                      ),
                    );
                    emailController.clear();
                    passController.clear();
                  }
                }
              },
              child: Text(
                "Login".toUpperCase(),
              ),
            ),
          ),
          const SizedBox(height: defaultPadding),
          AlreadyHaveAnAccountCheck(
            press: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) {
                    return SignUpScreen();
                  },
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
