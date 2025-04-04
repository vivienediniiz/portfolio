const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método não permitido" };
  }

  const data = JSON.parse(event.body);
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const db = client.db("meuBanco");
    const collection = db.collection("contatos");

    await collection.insertOne(data);

    return { statusCode: 200, body: "Dados salvos com sucesso!" };
  } catch (error) {
    return { statusCode: 500, body: "Erro ao salvar os dados" };
  } finally {
    await client.close();
  }
};
