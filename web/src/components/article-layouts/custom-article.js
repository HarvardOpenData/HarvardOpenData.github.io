/** @jsx jsx */
import { jsx, Divider, Grid, Styled } from "theme-ui";
import ArticleHeader from "./article-header";
import ArticleSidebar from "./article-sidebar";
import ArticlePreview from "./article-preview";
import BlockContent from "../block-content";
import Container from "../core/container"

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
      <Container>
        <div sx={{ pt: [4], margin: ["0 auto"], maxWidth: "640px" }}>
          {<ArticleHeader {...props} />}
          <br />
        </div>
      </Container>
      {_rawBody && <BlockContent blocks={_rawBody || []} />}
      <Container>
        <br />
        <div sx={{ margin: ["0 auto"], maxWidth: "640px" }}>
          {<ArticleSidebar {...defaultSidebarProps} />}
          {relatedProjects && relatedProjects.length > 0 && (
            <div>
              <Divider mt={4} color="text" />
              <Styled.h4>Related projects</Styled.h4>
              <Grid columns={1}>
                {relatedProjects.map((project) => (
                  <ArticlePreview
                    key={`related_${project._id}`}
                    title={project.title}
                    mainImage={project._rawMainImage}
                    image={project._rawMainImage}
                    link={`/project/${project.slug.current}`}
                    horizontal={[false, true, true]}
                    headerAs={"medium"}
                  />
                ))}
              </Grid>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default CustomArticle;
