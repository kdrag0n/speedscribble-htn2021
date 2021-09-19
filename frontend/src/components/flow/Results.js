import Layout from '../Layout'
import Button from '../Button'

const Winner = ({ title, similarity, img }) => {
  return (
    <div className='flex flex-col col-span-3 items-center justify-center'>
      <h2 className='font-semibold text-2xl text-indigo-700 mb-2 mt-auto'>{title}</h2>
      <h3 className='font-semibold text-xl text-gray-700 mb-2'>{similarity}% similarity</h3>
      <div className='p-4 bg-green-400 rounded-3xl flex items-center justify-center shadow-2xl'>
        <img className='w-auto rounded-xl' src={img} alt='img' />
      </div>
    </div>
  )
}

const Loser = ({ title, similarity, img }) => {
  return (
    <div className='flex flex-col col-span-2 items-center justify-center'>
      <h2 className='font-semibold text-2xl text-indigo-700 mb-2'>{title}</h2>
      <h3 className='font-semibold text-xl text-gray-700 mb-2'>{similarity}% similarity</h3>
      <div className='p-2 bg-gray-100 rounded-lg flex items-center justify-center'>
        <img className='w-auto rounded-lg' src={img} alt='img' />
      </div>
    </div>
  )
}

const Results = () => {
  return (
    <Layout title={'You win!'}>
      <div className='space-y-4 lg:space-y-0 lg:grid grid-cols-7 gap-4'>
        <Winner title='Your drawing' similarity={86} img='https://via.placeholder.com/500' />

        <div className='flex flex-col col-span-2 items-center justify-center'>
          <h2 className='font-semibold text-2xl text-indigo-600 mb-2'>Reference</h2>
          <div className='p-4 rounded-md flex items-center justify-center'>
            <img className='w-auto rounded-lg' src={'https://via.placeholder.com/500'} alt='reference' />
          </div>
        </div>
      
        <Loser title={'Your friend\'s drawing'} similarity={86} img='https://via.placeholder.com/500' />
      </div>

      {/* <Button className='mt-4'>Next</Button> */}
    </Layout>
  )
}

export default Results
