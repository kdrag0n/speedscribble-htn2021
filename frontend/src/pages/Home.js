import { Link } from 'react-router-dom'

import Layout from '../components/Layout'
import Button from '../components/Button'

const Home = () => {
  return (
    <Layout title='HTN Draw' subtitle='Draw and compete with your friends in 2 minutes!'>
      <Button el={Link} to='/play/1'>Play</Button>
    </Layout>
  )
}

export default Home
