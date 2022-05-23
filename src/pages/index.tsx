//SPA

/*

 useEffect(() => {
    fetch("http://localhost:3333/episodes")
      .then(response => response.json())
      .then(data => console.log(data))
  }, []);

*/

import { useEffect } from "react"

//SSR

/*

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3333/episodes")
  const data = await response.json()

  return {
    props: {
      episodes: data,
    }
  }
}

*/

//SSG

/* 

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes")
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8
  }
}

*/

export default function Home(props) {

  return (
    <div>
      <h1>index</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes")
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8
  }
}