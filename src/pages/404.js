import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <div style={{ marginTop: "50px" }}>
      <h1>NOT FOUND</h1>
      {/* <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>

      Hi <i class="nes-icon trophy is-large"></i>
      </div> */}
      <div style={{ marginTop: "20px" }} class="nes-container is-rounded">
        <p>Sorry you hit a page that doesn't exist</p>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
