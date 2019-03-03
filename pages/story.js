import { Component } from 'react'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'
import Error from 'next/error'

import Layout from '../components/Layout'
import CommentList from '../components/CommentList'

export class Story extends Component {
  static async getInitialProps({ req, res, query }) {
    let story

    try {
      const storyId = query.id
      const res = await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`)
      story = await res.json()
    }
    catch (err) {
      console.log(err)
      story = null
    }

    return { story }
  }

  render() {
    const { story } = this.props

    if (!story) {
      return <Error statusCode={503} />
    }

    return (
      <Layout
        backButton={true}
        description="A Hacker news clone using Next.js for server side rendering"
        title={story.title}
      >
        <main>
          <h1 className="story-title">
            <a href={story.url}>
              {story.title}
            </a>
          </h1>
          <div className="story-details">
            <strong>{story.points} points</strong>
            <strong>{story.comments_count || 0} comments</strong>
            <strong>{story.time_ago}</strong>
          </div>
          {story.comments.length > 0 ? (
            <CommentList comments={story.comments} />
          ) : (
            <div>No comments for this story</div>
          )}
        </main>
        <style jsx>{`
          main {
            padding: 1rem;
          }
          .story-title {
            font-size: 1.2rem;
            font-weight: 300;
            margin: 0;
            padding-bottom: 0.5rem;
          }
          .story-title a {
            color: #333;
            text-decoration: none;
          }
          .story-title a:hover {
            text-decoration: initial;
          }
          .story-details {
            font-size: 0.8rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            margin-bottom: 1rem;
          }
          .story-details strong {
            margin-right: 1rem;
          }
          .story-details a {
            color: #f60;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Story
