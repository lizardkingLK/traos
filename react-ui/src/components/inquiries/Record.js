import React from 'react';
import Typography from '@material-ui/core/Typography';

import OrderDetails from './OrderDetails';
import UpdateOrder from './UpdateOrder';

export default function Record({
    order, updateColour, setUpdateColour, updateStyle, setUpdateStyle, updateSize, setUpdateSize, updateStation, setUpdateStation,
    updateStationedStatus, setUpdateStationedStatus, updateOrderStatus, setUpdateOrderStatus, handleClose,
    handleUpdate, updateSnackOpen, handleSnackUpdateClose, updateSuccess
}) {
    return (
        <div className='record'>
            <Typography variant="body2">
                Order {order.orderID} is available.
            </Typography>
            <div className='display'>
                <OrderDetails order={order} />

                <UpdateOrder
                    order={order}
                    updateColour={updateColour}
                    setUpdateColour={setUpdateColour}
                    updateStyle={updateStyle}
                    setUpdateStyle={setUpdateStyle}
                    updateSize={updateSize}
                    setUpdateSize={setUpdateSize}
                    updateStation={updateStation}
                    setUpdateStation={setUpdateStation}
                    updateStationedStatus={updateStationedStatus}
                    setUpdateStationedStatus={setUpdateStationedStatus}
                    updateOrderStatus={updateOrderStatus}
                    setUpdateOrderStatus={setUpdateOrderStatus}
                    handleClose={handleClose}
                    handleUpdate={handleUpdate}
                    updateSnackOpen={updateSnackOpen}
                    handleSnackUpdateClose={handleSnackUpdateClose}
                    updateSuccess={updateSuccess}
                />
            </div>
        </div>
    )
}