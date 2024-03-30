import React from 'react'
import { Card } from 'antd';

const DetailsCard = ({ title, content }) => {
    return (
        <Card 
        title={title}
         className='w-full h-full'
        >
            {content}
        </Card>
    )
}

export default DetailsCard;