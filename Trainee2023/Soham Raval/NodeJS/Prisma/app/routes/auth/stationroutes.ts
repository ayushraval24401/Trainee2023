import controller from '../../controller'
import {Router} from 'express';



const router=Router();
router.post('/poststation', controller.stationcontroller.poststation);
router.get('/getstation', controller.stationcontroller.getstation);
router.delete('/deletestation/:id', controller.stationcontroller.deletestation);
router.put('/updatestation/:id', controller.stationcontroller.updatestation);



export default router;