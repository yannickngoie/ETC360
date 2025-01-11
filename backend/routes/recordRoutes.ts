
import express from 'express';
import { addRecord, fetchRecords, editRecord, removeRecord } from '../controllers/recordController';


const router = express.Router();

router.post('/add', addRecord);
router.get('/all', fetchRecords);
router.put('/edit', editRecord);
router.delete('/delete', removeRecord);

export default router;

module.exports = router;




