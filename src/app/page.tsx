// import course from "./course.json";

import dynamic from 'next/dynamic';
import { query } from '../lib/apollo/rsc';
import { gql } from '@apollo/client';
// const DynamicTestClientComponent = dynamic(
//     () => import('./')
// );

export default async function Home() {
    const GET_SERVER_CONTINENT = gql`
    query GetContinent {
      continents {
        code
      countries {
            awsRegion
            capital
            code
        }
      }
    }
  `;

    const { data } = await query({ query: GET_SERVER_CONTINENT });
    console.log('>>> GET_SERVER_CONTINENT data', data);
    console.log('first');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {/* <h1>{course.title}</h1> */}
            <h1>Next App</h1>
            {/* <ul>
        {course.lessons.map(({ title, name, points }) => {
          return (
            <li key={name}>
              <h3>{title}</h3>
              <p>{points?.join(", ")}</p>
            </li>
          );
        })}
      </ul> */}
            {/* <DynamicTestClientComponent /> */}
        </main>
    );
}
