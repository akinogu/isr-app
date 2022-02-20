import Link from 'next/link'
import React from 'react'
import { prefectures } from '../../../data/prefecture'

type Props = {
  dateTime: string
}

const Index: React.VFC<Props> = (props) => {
  return (
    <div>
      <h1>ssg prefecture</h1>
      <div>Time: {props.dateTime}</div>
      {prefectures.map(p => <div key={p.id}><Link href={`prefecture/${p.id}`} prefetch={false}>{p.name}</Link></div>)}
    </div>
  )
}

export default Index

export async function getStaticProps() {
  return {
    props: {
      dateTime: new Date().toLocaleString('ja-JP')
    }
  }
}
