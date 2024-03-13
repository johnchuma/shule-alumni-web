import React from 'react'
import Table from '../../general_widgets/datatable'
import DataTable from '../../general_widgets/datatable'
import GridView from '../../general_widgets/grid_view'
import { Stack } from 'react-bootstrap'
import Heading from '../../general_widgets/heading'
import CustomButton from '../../general_widgets/button'
import NewsView from '../../general_widgets/news_view'
const PostsPage= () => {
    return (
        <div>
           < Stack direction='horizontal' className='d-flex justify-content-between mt-4'>
          <Heading  text={`Posts`}/>
          <CustomButton text={"Create post"}/>
       </Stack>
       <br/>
           <NewsView />
        </div>
    )
}

export default PostsPage