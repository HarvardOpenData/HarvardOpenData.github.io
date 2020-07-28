import S from "@sanity/desk-tool/structure-builder";
import { MdInfo, MdSettings } from "react-icons/md";
import { FaFile } from "react-icons/fa";

const hiddenTypes = [
  "category",
  "companyInfo",
  "dataset",
  "page",
  "person",
  "position",
  "post",
  "project",
  "siteSettings",
  "subject",
];

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Projects")
        .schemaType("project")
        .child(S.documentTypeList("project")),
      S.listItem()
        .title("Blog posts")
        .schemaType("post")
        .child(S.documentTypeList("post").title("Blog posts")),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Projects")
                .child(
                  S.editor()
                    .id("projectsPage")
                    .schemaType("page")
                    .documentId("projects")
                )
                .icon(FaFile),
              S.listItem()
                .title("Data")
                .child(
                  S.editor()
                    .id("dataPage")
                    .schemaType("page")
                    .documentId("data")
                )
                .icon(FaFile),
              S.listItem()
                .title("Participate")
                .child(
                  S.editor()
                    .id("participatePage")
                    .schemaType("page")
                    .documentId("participate")
                )
                .icon(FaFile),
              S.listItem()
                .title("Predictions")
                .child(
                  S.editor()
                    .id("predictionsPage")
                    .schemaType("page")
                    .documentId("predictions")
                )
                .icon(FaFile),
              S.listItem()
                .title("Surveys")
                .child(
                  S.editor()
                    .id("surveysPage")
                    .schemaType("page")
                    .documentId("surveys")
                )
                .icon(FaFile),
              S.listItem()
                .title("Join")
                .child(
                  S.editor()
                    .id("joinPage")
                    .schemaType("page")
                    .documentId("join")
                )
                .icon(FaFile),
              S.listItem()
                .title("Sponsors")
                .child(
                  S.editor()
                    .id("sponsorsPage")
                    .schemaType("page")
                    .documentId("sponsors")
                )
                .icon(FaFile),
              S.listItem()
                .title("Blog")
                .child(
                  S.editor()
                    .id("blogPage")
                    .schemaType("page")
                    .documentId("blog")
                )
                .icon(FaFile),
              S.listItem()
                .title("About")
                .child(
                  S.editor()
                    .id("aboutPage")
                    .schemaType("page")
                    .documentId("about")
                )
                .icon(FaFile),
              S.listItem()
                .title("Contact")
                .child(
                  S.editor()
                    .id("contactPage")
                    .schemaType("page")
                    .documentId("contact")
                )
                .icon(FaFile),
            ])
        ),
      S.listItem()
        .title("People")
        .schemaType("person")
        .child(S.documentTypeList("person").title("People")),
      S.listItem()
        .title("Positions")
        .schemaType("position")
        .child(S.documentTypeList("position").title("Positions")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      S.listItem()
        .title("Subjects")
        .schemaType("subject")
        .child(S.documentTypeList("subject").title("Subjects")),
      S.listItem()
        .title("Datasets")
        .schemaType("dataset")
        .child(S.documentTypeList("dataset").title("Datasets")),
      S.listItem()
        .title("Sponsors")
        .schemaType("sponsor")
        .child(S.documentTypeList("sponsor").title("Sponsors")),
      S.listItem()
        .title("Organization Info")
        .child(
          S.editor()
            .id("companyInfo")
            .schemaType("companyInfo")
            .documentId("companyInfo")
        )
        .icon(MdInfo),
      S.listItem()
        .title("Site Settings")
        .child(
          S.editor()
            .id("siteSettings")
            .schemaType("siteSettings")
            .documentId("siteSettings")
        )
        .icon(MdSettings),
      ...S.documentTypeListItems().filter(
        (listItem) => !hiddenTypes.includes(listItem.getId())
      ),
    ]);
