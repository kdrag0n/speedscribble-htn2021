import Layout from '../Layout'
import Countdown from '../Countdown'

import { useGameContext } from '../../store'

const Memorize = () => {
  const { refImage, setFlowState } = useGameContext()

  return (
    <Layout title='Memorize the picture' subtitle='You will have to draw this!'>
      <div className='p-2 bg-gray-100 rounded-lg'>
        <img className='max-w-sm rounded-lg' src={refImage} alt='reference' />
      </div>

      <Countdown totalTime={10} onCompleted={() => setFlowState('draw')} />
    </Layout>
  )
}

export default Memorize
