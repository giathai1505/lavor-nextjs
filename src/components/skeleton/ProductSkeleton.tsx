import React from 'react'
import { Skeleton} from 'antd';


const ProductSkeleton = () => {
  return (
    <div className='h-[300px] border border-solid border-gray'>
       <Skeleton />
    </div>
  )
}

export default ProductSkeleton