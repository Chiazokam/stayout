import express from 'express';

const router = express.Router();

router.use('*', (req, res) => {
  res.status(200).json({ message: 'Welcome to Stayout.com' });
});

export default router;
