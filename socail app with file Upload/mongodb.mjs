// import mongodb  from './mongodb.mjs';
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://adilmalik:practice@cluster0.cpqk4lp.mongodb.net/?retryWrites=true&w=majority";

export const client = new MongoClient(uri);


async function run() {
  try {
      await client.connect();
      console.log("Successfully connected to Atlas............. DB CONNECT");
 
 
 
 
 
    } catch (err) {
      console.log(err.stack);
      await client.close();
      process.exit(1)
  }
}
run().catch(console.dir);
process.on('SIGINT',async function(){
  console.log('SIGINT signal received. Exiting gracefully...');
  await client.close();
})

export default './moongodb.mjs'
