import mongo from 'mongoose';
import 'dotenv/config';

async function connectDatabase() {
  const uri = process.env.URI;

  try {
    await mongo.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB connected`);
  } catch (e) {
    console.log(e);
  }
}

export default connectDatabase;
