import 'dart:io';
import 'package:path/path.dart';
import 'dart:async';
import 'package:sqflite/sqflite.dart';
import 'package:path_provider/path_provider.dart';
import 'package:minor_project/Screens/ToDo/model/todo_item.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = new DatabaseHelper.internal();
  factory DatabaseHelper() => _instance;

  final String tableName = "nodoTbl";
  final String columId = "Id";
  final String columItemName = "itemName";
  final String columDateCreated = "dateCreated";

  static Database? _db;

  Future<Database?> get db async {
    if (_db != null) {
      return _db;
    }
    _db = await initDb();
    return _db;
  }

  DatabaseHelper.internal();

  initDb() async {
    Directory documentDirectory = await getApplicationDocumentsDirectory();
    String path = join(documentDirectory.path, "nodo_db.db");
    var ourDb = await openDatabase(path, version: 1, onCreate: _onCreate);
    return ourDb;
  }

  void _onCreate(Database db, int version) async {
    await db.execute(
        "CREATE TABLE $tableName(id INTEGER PRIMARY KEY, $columItemName TEXT, $columDateCreated TEXT)");
    print("Table is created");
  }

  // Insertion

  Future<int> saveItem(ToDoItem item) async {
    var dbClient = await db;
    int res = await dbClient!.insert("$tableName", item.toMap());
    print(res.toString());
    return res;
  }

  // Get

  Future<List> getItems() async {
    var dbClient = await db;
    var result = await dbClient!
        .rawQuery("SELECT * FROM $tableName ORDER BY $columItemName ASC");
    return result.toList();
  }

  Future<ToDoItem?> getItem(int id) async {
    try {
      var dbClient = await db;
      var result = await dbClient!
          .rawQuery("SELECT * FROM $tableName WHERE id = ?", [id]);
      if (result.isEmpty) {
        return null;
      }
      return ToDoItem.fromMap(result.first);
    } catch (e) {
      // Handle any exceptions that might occur during database operations.
      print("Error in getItem: $e");
      return null; // Return null in case of an error.
    }
  }

  Future<int> getCount() async {
    try {
      final dbClient = await db;
      final result =
          await dbClient!.rawQuery("SELECT COUNT(*) FROM $tableName");
      final count = Sqflite.firstIntValue(result) ??
          0; // Use 0 as the default value if result is null
      return count;
    } catch (e) {
      // Handle any exceptions that might occur during database operations.
      print("Error in getCount: $e");
      return 0;
    }
  }

  Future<int> deleteItem(int id) async {
    var dbClient = await db;
    return await dbClient!
        .delete(tableName, where: "$columId = ?", whereArgs: [id]);
  }

  Future<int> updateItem(ToDoItem item) async {
    var dbClient = await db;
    return await dbClient!.update("$tableName", item.toMap(),
        where: "$columId = ?", whereArgs: [item.id]);
  }

  Future close() async {
    var dbClient = await db;
    return dbClient!.close();
  }
}
