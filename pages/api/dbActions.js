import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

const connectionStr =
  "mongodb+srv://mehulsaini763:testdb@cluster0.rgbih6w.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionStr, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

await client.connect();

const database = client.db("todolist");

export default async function handler(req, res) {
  if (req.method == "GET") {
    const tasks = await database.collection("tasks").find({}).toArray();
    return res.status(200).json(tasks);
  } else if (req.method == "POST") {
    const body = req.body;
    const response = await database
      .collection("tasks")
      .insertOne(JSON.parse(body));
    if (response.acknowledged) {
      return res.status(200).json({ message: "success" });
    } else return res.status(200).json({ message: "failed" });
  } else if (req.method == "PUT") {
    const body = req.body;
    const data = JSON.parse(body);
    const response = await database
      .collection("tasks")
      .updateOne({ uid: data.id }, { $set: { completed: data.value } });
    if (response.acknowledged) {
      return res.status(200).json({ message: "success" });
    } else return res.status(200).json({ message: "failed" });
  } else if (req.method == "DELETE") {
    const body = req.body;
    const id = JSON.parse(body);
    const response = await database
      .collection("tasks")
      .deleteOne({ uid: id });
    if (response.acknowledged) {
      return res.status(200).json({ message: "success" });
    } else return res.status(200).json({ message: "failed" });
  } else if (req.method == "PATCH") {
    await database.collection("tasks").deleteMany({});
    const body = req.body;
    const data = JSON.parse(body);
    const response = await database.collection("tasks").insertMany(data);
    if (response.acknowledged) {
      return res.status(200).json({ message: "success" });
    } else return res.status(200).json({ message: "failed" });
  }
}
