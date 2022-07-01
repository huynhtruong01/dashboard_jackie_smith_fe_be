import { Box } from '@mui/material'
import { green, red } from '@mui/material/colors'
import { useState } from 'react'

OptionShipping.propTypes = {}

function OptionShipping({ data, onShippingClick = null, onSuccessfulDeliveryClick = null }) {
    const [isCheckout, setIsCheckout] = useState(data.isCheckout)

    const handleCheckoutClick = async () => {
        if (!onShippingClick) return
        if (isCheckout === 'true') return

        try {
            console.log(data.id)
            await onShippingClick(data.id, true)
            setIsCheckout('true')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSuccessfulDeliveryClick = async () => {
        if (!onSuccessfulDeliveryClick) return

        try {
            await onSuccessfulDeliveryClick(data.id, 'successful delivery')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: isCheckout === 'true' ? red[50] : green[50],
                    borderRadius: '3px',
                    p: '5px',
                    mr: '5px',
                    cursor: 'pointer',
                    color: isCheckout === 'true' ? red[500] : green[500],

                    '&:hover': {
                        backgroundColor: isCheckout === 'true' ? red[50] : green[100],
                        cursor: isCheckout === 'true' ? 'text' : 'pointer',
                    },
                }}
                onClick={handleCheckoutClick}
            >
                {isCheckout === 'true' ? 'Payment' : 'Not payment'}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: green[50],
                    borderRadius: '3px',
                    p: '5px',
                    mr: '5px',
                    cursor: 'pointer',
                    color: green[500],

                    '&:hover': {
                        backgroundColor: green[100],
                    },
                }}
                onClick={handleSuccessfulDeliveryClick}
            >
                Successful delivery
            </Box>
        </Box>
    )
}

export default OptionShipping
