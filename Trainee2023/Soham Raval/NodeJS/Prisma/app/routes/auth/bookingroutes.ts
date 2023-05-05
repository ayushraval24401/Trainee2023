import controller from '../../controller'
import {Router} from 'express';



const router=Router();
router.post('/postbooking', controller.bookingcontroller.postbooking);
router.get('/getbooking', controller.bookingcontroller.getbooking);
router.delete('/deletebooking/:id', controller.bookingcontroller.deletebooking);
router.put('/updatebooking/:id', controller.bookingcontroller.updatebooking);
router.get('/search/:key', controller.bookingcontroller.searchbooking);
router.get('/sortdata/:sortby',controller.bookingcontroller.sortdata);
router.get('/filterdata/:key',controller.bookingcontroller.filterdata);

// router.get('/getall/:key',controller.bookingcontroller.getalldata);



export default router;