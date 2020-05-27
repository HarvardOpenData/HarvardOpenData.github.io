/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  headComponents.sort((x, y) => {
    if (x.key === 'TypographyStyle') {
      return -1
    } else if (y.key === 'TypographyStyle') {
      return 1
    }
    return 0
  })
  replaceHeadComponents(headComponents)
}
