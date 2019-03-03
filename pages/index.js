import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'
import Error from 'next/error'

import Layout from '../components/Layout'
import StoryList from '../components/StoryList'

export class Index extends Component {
  static async getInitialProps({ req, res, query }) {
    let stories
    let page

    try {
      page = Number(query.page) || 1
      const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`)
      stories = await res.json()
    }
    catch (err) {
      console.log(err)
      stories = []
    }

    return { page, stories }
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registation => {
          console.log('Service worker registration successful :)', registation)
        })
        .catch(err => {
          console.warn('Service worker registration failed :(', err.message)
        })
    }
  }

  render() {
    const { page, stories } = this.props

    if (stories.length === 0) {
      return <Error statusCode={503} />
    }

    return (
      <Layout description="A Hacker news clone using Next.js for server side rendering" title="Hacker Next">
        <StoryList stories={stories} />
        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>
        <style jsx>{`
          footer {
            padding: 1rem;
          }
          footer a {
            font-weight: bold;
            color: black;
            text-decoration: none;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index
