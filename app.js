const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mentalhealth', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));

const ResponseSchema = new mongoose.Schema({
  name: String,
  ageGroup: String,
  gender: String,
  occupation: String,
  st5: [Number],
  st5_total: Number,
  createdAt: { type: Date, default: Date.now }
});

const Response = mongoose.model('Response', ResponseSchema);

app.post('/api/submit', async (req, res) => {
  try {
    const data = new Response(req.body);
    await data.save();
    res.json({ message: 'บันทึกข้อมูลเรียบร้อยแล้ว 💙' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log('🚀 Server running at http://localhost:5000');
});
