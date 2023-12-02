import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router } from './router';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

// app.get('/api/data', async (req: Request, res: Response): Promise<void> => {
//   try {
//     const snapshot = await firestore.collection('example').get();
//     const data: any[] = [];
//     snapshot.forEach((doc) => {
//       data.push({
//         id: doc.id,
//         ...doc.data(),
//       });
//     });
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });


// app.post('/api/data', async (req: Request, res: Response): Promise<void> => {
//   try {
//     console.log(req.body)
//     const { name, umur } = req.body as { name: string; umur: number }; // Ganti dengan nama field sesuai kebutuhan
//     const docRef = await firestore.collection('example').add({
//       nama: name,
//       umur,
//       // ...Tambahkan field lain sesuai kebutuhan
//     });
//     res.json({ id: docRef.id });
//   } catch (error) {
//     
//   }
// });


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});