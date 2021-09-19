import Layout from '../Layout'
import Countdown from '../Countdown'

const Memorize = () => {
  const image = 'https://i.guim.co.uk/img/media/7a0ccba31578833efe0de8db130e57015109d067/183_0_3840_2304/master/3840.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=3b95b4d4869e595a2cebff6be1c24eac'

  return (
    <Layout title='Memorize the picture' subtitle='You will have to draw this!'>
      <div className='p-4 bg-gray-100 rounded-md'>
        <img className='max-w-sm rounded-lg' src={image} alt='reference' />
      </div>

      <Countdown totalTime={10} />
    </Layout>
  )
}

export default Memorize
