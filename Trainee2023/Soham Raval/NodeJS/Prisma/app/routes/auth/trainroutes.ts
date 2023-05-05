import controller from '../../controller'
import {Router} from 'express';



const router=Router();
router.post('/posttrain', controller.traincontroller.posttrain);
router.get('/gettrain', controller.traincontroller.gettrain);
router.delete('/deletetrain/:id', controller.traincontroller.deletetrain);
router.put('/updatetrain/:id', controller.traincontroller.updatetrain);
router.get('/sortdata/:sortby',controller.traincontroller.sortdata);
router.get('/search/:key', controller.traincontroller.searchtrain);

// router.get('/filterdata/:key',controller.traincontroller.filterdata);





export default router;