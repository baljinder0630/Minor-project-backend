// ignore_for_file: prefer_interpolation_to_compose_strings, prefer_const_constructors

import 'dart:convert';
import 'dart:math';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:minor_project/Pages/nav.dart';

import '../../../components/already_have_an_account_acheck.dart';
import '../../../constants.dart';
import '../../../Pages/login_screen.dart';

class SignUpForm extends StatefulWidget {
  const SignUpForm({super.key});

  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final _formkey = GlobalKey<FormState>();
  bool passToggle = true;
  final emailController = TextEditingController();
  final firstnameController = TextEditingController();
  bool isPatient = false;
  String role = "careTaker";

  final passController = TextEditingController();
  final phoneController = TextEditingController();

  Future<bool> signup() async {
    var url = Uri.https(
        'assistalzheimer.onrender.com', '/api/auth/signup', {'role': role});

    var response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
      body: jsonEncode(<String, String>{
        'email': emailController.text.trim(),
        'password': passController.text.trim(),
        'firstName': firstnameController.text.trim(),
        'phoneNumber': phoneController.text.trim(),
      }),
    );
    print(role +
        ' email :' +
        emailController.text.trim() +
        ' password : ' +
        passController.text.trim() +
        ' firstName ' +
        firstnameController.text.trim() +
        ' phoneNumber : ' +
        phoneController.text.trim());
    print(response.body);
    final data = jsonDecode(response.body);
    if (data["status"] == true) {
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
      child: Padding(
        padding:
            EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
        // padding: const EdgeInsets.all(8.0),
        child: SingleChildScrollView(
          child: Column(
            children: [
              TextFormField(
                textInputAction: TextInputAction.next,
                controller: firstnameController,
                cursorColor: kPrimaryColor,
                onSaved: (firstname) {},
                decoration: InputDecoration(
                  hintText: "Name",
                  prefixIcon: Padding(
                    padding: const EdgeInsets.all(defaultPadding),
                    child: Icon(Icons.person),
                  ),
                ),
                validator: (value) {
                  if (value!.isEmpty) {
                    return "Name can't be empty";
                  }
                  return null;
                },
              ),
              SizedBox(
                height: 10,
              ),
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
                    child: Icon(Icons.email),
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
              SizedBox(
                height: 10,
              ),
              TextFormField(
                textInputAction: TextInputAction.done,
                obscureText: passToggle,
                controller: passController,
                cursorColor: kPrimaryColor,
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
              SizedBox(
                height: 10,
              ),
              TextFormField(
                keyboardType: TextInputType.phone,
                textInputAction: TextInputAction.next,
                controller: phoneController,
                cursorColor: kPrimaryColor,
                onSaved: (firstname) {},
                decoration: InputDecoration(
                  hintText: "Phonenumber",
                  prefixIcon: Padding(
                    padding: const EdgeInsets.all(defaultPadding),
                    child: Icon(Icons.phone),
                  ),
                ),
                validator: (value) {
                  if (value!.length != 10) {
                    return "Invalid Phone number";
                  }
                  return null;
                },
              ),
              // const SizedBox(height: defaultPadding / 2),
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
              // const SizedBox(height: defaultPadding / 2),
              ElevatedButton(
                onPressed: () async {
                  if (_formkey.currentState!.validate()) {
                    if (await signup()) {
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
                child: Text("Sign Up".toUpperCase()),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
