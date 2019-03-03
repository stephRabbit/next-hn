import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'

const Layout = ({ backButton, children, description, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
    <div className="container">
      <nav>
        {backButton && <span onClick={() => Router.back()} className="back-button">&#x2b05;</span>}
        <Link href="/">
          <a>
            <span className="main-title">Hacker Next</span>
          </a>
        </Link>
      </nav>
      {children}
    </div>
    <style jsx>{`
      .container {
        max-width: 800px;
        margin: 0 auto;
        background: #f6f6ef;
      }
      nav {
        background: #f60;
        padding: 1rem;
      }
      nav > * {
        display: inline-block;
        color: black;
      }
      nav a {
        text-decoration: none;
      }
      nav .main-title {
        font-wieght: bold;
      }
      nav .back-button {
        cursor: pointer;
        font-size: 0.9rem;
        padding-right: 1rem;
      }
    `}</style>
    <style global jsx>{`
      body {
        background: white;
        font-family: Verdana, Geneva, sans-serif;
      }
    `}</style>
  </div>
)


export default Layout
