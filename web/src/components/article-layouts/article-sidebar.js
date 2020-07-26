/** @jsx jsx */
import { jsx, Divider, Grid, Styled, Text } from "theme-ui";
import { format, distanceInWords, differenceInDays } from "date-fns";
import RoleList from "./role-list";
import ArticlePreview from "./article-preview";

function StyledSidebarSection({children}){
  return (
    <div>
      <Divider mt={4} color="text"/>
      {children}
    </div>
  )
}

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
  const labels = [...(subjects ? subjects : []), ...(categories ? categories : [])];
  const numLabels = labels.length

  return (
    <aside>
      {publishedAt && (
        <StyledSidebarSection>
          <Text variant="small">
            {differenceInDays(new Date(publishedAt), new Date()) > 3
              ? distanceInWords(new Date(publishedAt), new Date())
              : format(new Date(publishedAt), "MM-DD-YYYY")}
          </Text>
        </StyledSidebarSection>
      )}
      {members && <StyledSidebarSection><RoleList items={members} title="Contributors" /></StyledSidebarSection>}
      {authors && <StyledSidebarSection><RoleList items={authors} title="Authors" /></StyledSidebarSection>}
      {labels && (
        <StyledSidebarSection>
          <Styled.h4>Filed Under</Styled.h4>
          {labels.map((item, i) => (
            i < numLabels - 1
              ? <span key={item._id}>{item.title}{`, `}</span>
              : <span key={item._id}>{item.title}</span>
          ))}
        </StyledSidebarSection>
      )}
      {relatedProjects && (
        <StyledSidebarSection>
          <Styled.h4>Related projects</Styled.h4>
          <Grid columns={[3, 1, 1]}>
            {relatedProjects.map((project) => (
              <ArticlePreview
                key={`related_${project._id}`}
                title={project.title}
                mainImage={project._rawMainImage}
                image={project._rawMainImage}
                link={`/project/${project.slug.current}`}
              />
            ))}
          </Grid>
        </StyledSidebarSection>
      )}
    </aside>
  );
}

export default ArticleSidebar;
