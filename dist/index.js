"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(router_1.router);
app.use((0, cors_1.default)({
    origin: "*"
}));
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
