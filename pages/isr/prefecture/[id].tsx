import React from 'react'

type Props = {
  cities: {
    status: string
    data: {
      id: string
      name: string
    }[]
  },
  dateTime: Date
}

const Prefecture: React.VFC<Props> = (props) => {
  const cities = props.cities.data
  return (
    <div>
      <h1>isr cities</h1>
      <div>Time: {props.dateTime}</div>
      {cities.map(c => <div key={c.id}>- {c.name}</div>)}
    </div>
  )
}

export default Prefecture

type Params = {
  params: { id: string }
}

export async function getStaticProps({ params }: Params) {
  const res = await fetch(`https://www.land.mlit.go.jp/webland/api/CitySearch?area=${params.id}`)
  const cities = await res.json()

  return {
    props: {
      cities,
      dateTime: new Date().toLocaleString('ja-JP')
    },
    revalidate: 30, // In seconds
  }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths: [], fallback: 'blocking' }
}