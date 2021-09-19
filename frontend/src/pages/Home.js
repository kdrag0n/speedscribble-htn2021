import { Link } from 'react-router-dom'

import Layout from '../components/Layout'
import Button from '../components/Button'

const Home = () => {
  return (
    <Layout title='HTN Game' subtitle='A cool game'>
      <Button el={Link} to='/play/1'>New Game</Button>
    </Layout>
  )
}

export default Home