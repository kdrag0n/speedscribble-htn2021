import Canvas from 'react-canvas-draw'

const Game = () => {
  const url = 'https://i.guim.co.uk/img/media/7a0ccba31578833efe0de8db130e57015109d067/183_0_3840_2304/master/3840.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3b95b4d4869e595a2cebff6be1c24eac'

  return (
    <div className='py-4 flex flex-wrap -mx-4 overflow-hidden'>
      <div className='my-4 px-4 w-full lg:w-1/2'>
        <div className='w-full bg-white shadow-md rounded-md'>
          <div className='p-4 text-center'>
            <h2 className='font-semibold text-2xl'>Reference Image</h2>
          </div>
          <hr className='border-0 bg-gray-200 text-gray-200 h-px max-w-full' />
          <div className='p-4 flex items-center justify-center'>
            <img src={url} alt='ref' />
          </div>
        </div>
      </div>
      <div className='my-4 px-4 w-full lg:w-1/2'>
        <div className='w-full bg-gray-100 shadow-md rounded-md'>
          <div className='p-4 text-center bg-white'>
            <h2 className='font-semibold text-2xl'>Drawing Pad</h2>
          </div>
          <div className='p-4 flex items-center justify-center'>
            <Canvas canvasWidth={500} canvasHeight={500} brushRadius={5} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game