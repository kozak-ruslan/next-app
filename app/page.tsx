import Image from "next/image";
import course from './course.json';

export default function Home() {
  return (
    <div>
      <h1>{course.title}</h1>
    <ul>
        {course.lessons.map(({ title, name, points}) => {
          return (
            <li key={name}>
              <h3>{title}</h3>
              <p>{points?.join(', ')}</p>
            </li>
          )
        })}
    </ul>

    </div>
     );
}
