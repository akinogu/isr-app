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
      <h1>ssg cities</h1>
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
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '01' }},
      { params: { id: '10' }}
    ],
    fallback: false
  }
}