/** @jsx jsx */
import { jsx, Divider, Grid, Styled } from "theme-ui";
import ArticleHeader from './article-header';
import ArticleSidebar from './article-sidebar';
import ArticlePreview from './article-preview';
import BlockContent from "../block-content";

function CustomArticle(props) {
  const {
    _rawBody,
    authors,
    members,
    categories,
    subjects,
    relatedProjects,
  } = props;
  const defaultSidebarProps = {
    authors,
    members,
    categories,
    subjects,
  };

  return (
    <div>
      <div sx={{ pt: [4], margin: ['0 auto'], maxWidth: '640px' }}>
        {<ArticleHeader {...props} />}
        <br />
      </div>
      {_rawBody && <BlockContent blocks={_rawBody || []} />}
      <div sx={{ margin: ['0 auto'], maxWidth: '640px' }}>
        {<ArticleSidebar {...defaultSidebarProps} />}
        {relatedProjects && relatedProjects.length > 0 && (
        <div>
          <Divider mt={4} color="text"/>
          <Styled.h4>Related projects</Styled.h4>
          <Grid columns={3}>
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
        </div>
      )}
      </div>
    </div>
  );
}

export default CustomArticle;
