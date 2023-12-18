import 'dart:math';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

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

  final passController = TextEditingController();
  final phoneController = TextEditingController();

  //var url = Uri.https('https://assistalzheimer.onrender.com', '/api/signup');

  // Future<bool> signup() async {
  //   var response = await http.post(url, body: {
  //     'email': emailController.text.trim(),
  //     "password": passController.text.trim(),
  //     "firstName": firstnameController.text.trim(),
  //     "lastName": "AA",
  //     "phoneNumber": phoneController.text.trim()
  //   }).then((value) {
  //     print(value.body);
  //     // if(value.body =)
  //   });

  //   return false;
  // }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formkey,
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
                if (value == null) {
                  return "Email can't be empty";
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
            const SizedBox(height: defaultPadding / 2),
            ElevatedButton(
              onPressed: () {
                if (_formkey.currentState!.validate()) {
                  //signup();

                  emailController.clear();
                  passController.clear();
                }
              },
              child: Text("Sign Up".toUpperCase()),
            ),
          ],
        ),
      ),
    );
  }
}
