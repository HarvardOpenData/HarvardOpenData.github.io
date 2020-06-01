/** @jsx jsx */
import { jsx, Grid, Styled, Text } from 'theme-ui'
import { format, distanceInWords, differenceInDays } from 'date-fns'
import { Link } from 'gatsby'
import RoleList from '../role-list'

import styles from '../project.module.css'

function ArticleSidebar (props) {
  const { categories, subjects, members, publishedAt, relatedProjects } = props
  return (
    <aside className={styles.metaContent}>
      {publishedAt && (
        <div className={styles.publishedAt}>
          {differenceInDays(new Date(publishedAt), new Date()) > 3
            ? distanceInWords(new Date(publishedAt), new Date())
            : format(new Date(publishedAt), 'MMMM Do YYYY')}
        </div>
      )}
      {members && <RoleList items={members} title='Authors' />}
      {categories && (
        <div className={styles.categories}>
          <h3 className={styles.categoriesHeadline}>Category</h3>
          <ul>
            {categories.map(category => (
              <li key={category._id}>{category.title}</li>
            ))}
          </ul>
        </div>
      )}
      {subjects && (
        <div className={styles.categories}>
          <h3 className={styles.categoriesHeadline}>Subjects</h3>
          <ul>
            {subjects.map(subject => (
              <li key={subject._id}>{subject.title}</li>
            ))}
          </ul>
        </div>
      )}
      {relatedProjects && (
        <div className={styles.relatedProjects}>
          <h3 className={styles.relatedProjectsHeadline}>Related projects</h3>
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