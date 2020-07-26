/** @jsx jsx */
import { jsx, Divider, Grid, Styled, Text } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import { Link } from "gatsby";
import RoleList from "../role-list";

import styles from "./sidebar.module.css";
import ArticlePreview from "./article-preview";

// Creates a sidebar with all available props
function ArticleSidebar(props) {
  const {
    categories,
    subjects,
    authors,
    members,
    publishedAt,
    relatedProjects,
  } = props;
  const numLabels = (subjects ? subjects.length : 0) + (categories ? categories.length : 0)
  console.log(relatedProjects)

  return (
    <aside>
      {publishedAt && (
        <Text variant="small">
          {differenceInDays(new Date(publishedAt), new Date()) > 3
            ? distanceInWords(new Date(publishedAt), new Date())
            : format(new Date(publishedAt), "MM-DD-YYYY")}
        </Text>
      )}
      {members && <RoleList items={members} title="Contributors" />}
      {authors && <RoleList items={authors} title="Authors" />}
      {(categories || subjects) && (
        <div>
          <Styled.h4>Filed Under</Styled.h4>
          {[...categories, ...subjects].map((item, i) => (
            i < numLabels - 1
              ? <span key={item._id}>{item.title}{`, `}</span>
              : <span key={item._id}>{item.title}</span>
          ))}
        </div>
      )}
      {relatedProjects && (
        <div className={styles.relatedProjects}>
          <Styled.h4>Related projects</Styled.h4>
          {relatedProjects.map((project) => (
            <ArticlePreview
              key={`related_${project._id}`}
              title={project.title}
              mainImage={project._rawMainImage}
              image={project._rawMainImage}
              link={`/project/${project.slug.current}`}
            />
          ))}
        </div>
      )}
    </aside>
  );
}

export default ArticleSidebar;
