/** @jsx jsx */
import { jsx, Grid, Styled, Text } from 'theme-ui'
import { format, distanceInWords, differenceInDays } from 'date-fns'
import { Link } from 'gatsby'
import RoleList from '../role-list'

import styles from './sidebar.module.css'

// Creates a sidebar with all available props
function ArticleSidebar(props) {
  const { categories, subjects, authors, members, publishedAt, relatedProjects } = props
  return (
    <aside>
      {publishedAt && (
        <Text variant="small">
          {differenceInDays(new Date(publishedAt), new Date()) > 3
            ? distanceInWords(new Date(publishedAt), new Date())
            : format(new Date(publishedAt), 'MMMM Do YYYY')}
        </Text>
      )}
      {members && <RoleList items={members} title="Members" />}
      {authors && <RoleList items={authors} title="Authors" />}
      {categories && (
        <div className={styles.categories}>
          <Styled.h4>Category</Styled.h4>
          <ul>
            {categories.map(category => (
              <li key={category._id}>{category.title}</li>
            ))}
          </ul>
        </div>
      )}
      {subjects && (
        <div className={styles.categories}>
          <Styled.h4>Subjects</Styled.h4>
          <ul>
            {subjects.map(subject => (
              <li key={subject._id}>{subject.title}</li>
            ))}
          </ul>
        </div>
      )}
      {relatedProjects && (
        <div className={styles.relatedProjects}>
          <Styled.h4>Related projects</Styled.h4>
          <ul>
            {relatedProjects.map(project => (
              <li key={`related_${project._id}`}>
                <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}

export default ArticleSidebar
